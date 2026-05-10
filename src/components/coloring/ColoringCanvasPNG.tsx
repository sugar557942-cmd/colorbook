"use client";

/**
 * ColoringCanvasPNG  —  v3  (듀얼 레이어)
 * ──────────────────────────────────────────────────────────
 * 캔버스 두 장을 겹쳐 사용:
 *   colorCanvas   (하단) — 사용자 색칠 영역, 모든 그리기가 여기에
 *   outlineCanvas (상단) — 도안의 검은 윤곽선만 분리 저장, 항상 위에 표시
 *
 * 덕분에 붓으로 마음껏 그려도 윤곽선은 절대 가려지지 않습니다.
 *
 * 도구:
 *   🪣 페인트통 — 클릭으로 영역 flood-fill (윤곽선 경계 준수)
 *   🖌️ 붓       — 드래그로 자유롭게 그리기
 *   ⬜ 지우개   — 드래그로 색상만 지우기
 * ──────────────────────────────────────────────────────────
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import ColorPalette from './ColorPalette';
import { Download, Printer, Loader2, Eraser, Lock, Undo2 } from 'lucide-react';

interface Props {
    imagePath: string;
    slug: string;
    onDownload?: () => void;
    onPrint?: () => void;
}

type ToolMode = 'bucket' | 'brush' | 'eraser';

/* ─────────────── 색 유틸 ─────────────── */
function hexToRgba(hex: string): [number, number, number, number] {
    const h = hex.replace('#', '');
    const p = (s: string) => parseInt(s, 16);
    if (h.length === 3) return [p(h[0]+h[0]), p(h[1]+h[1]), p(h[2]+h[2]), 255];
    return [p(h.slice(0,2)), p(h.slice(2,4)), p(h.slice(4,6)), 255];
}

function colorDistance(
    a: [number,number,number,number],
    b: [number,number,number,number],
): number {
    return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2);
}

/* 해당 픽셀이 윤곽선인지 판별 */
const OUTLINE_THRESHOLD = 300;  // r+g+b < 이 값이면 윤곽선 (검정에 가까운 색)
function isDark(r: number, g: number, b: number) {
    return r + g + b < OUTLINE_THRESHOLD;
}

/* ─────────────── Scanline Flood-Fill ─────────────── */
function floodFill(
    imageData: ImageData,
    startX: number,
    startY: number,
    fillColor: [number,number,number,number],
    tolerance = 40,
): boolean {
    const { data, width, height } = imageData;
    const idx = (x: number, y: number) => (y * width + x) * 4;

    const getPixel = (x: number, y: number): [number,number,number,number] => {
        const i = idx(x, y);
        return [data[i], data[i+1], data[i+2], data[i+3]];
    };

    const startPx = getPixel(startX, startY);

    // 윤곽선 위 클릭 → 무시
    if (isDark(startPx[0], startPx[1], startPx[2])) return false;
    // 이미 같은 색 → 무시
    if (colorDistance(startPx, fillColor) < 8) return false;

    const matches = (x: number, y: number) => {
        if (x < 0 || x >= width || y < 0 || y >= height) return false;
        const [r,g,b] = getPixel(x, y);
        if (isDark(r, g, b)) return false;
        return colorDistance(getPixel(x, y), startPx) <= tolerance;
    };

    const setPixel = (x: number, y: number) => {
        const i = idx(x, y);
        data[i]=fillColor[0]; data[i+1]=fillColor[1]; data[i+2]=fillColor[2]; data[i+3]=fillColor[3];
    };

    const visited = new Uint8Array(width * height);
    const stack: number[] = [startX, startY];

    while (stack.length > 0) {
        const cy = stack.pop()!;
        const cx = stack.pop()!;
        if (cx < 0 || cx >= width || cy < 0 || cy >= height) continue;
        const vi = cy * width + cx;
        if (visited[vi]) continue;
        if (!matches(cx, cy)) continue;

        let left = cx;
        while (left > 0 && !visited[cy*width+(left-1)] && matches(left-1, cy)) left--;
        let right = cx;
        while (right < width-1 && !visited[cy*width+(right+1)] && matches(right+1, cy)) right++;

        for (let x = left; x <= right; x++) {
            const si = cy * width + x;
            if (visited[si]) continue;
            setPixel(x, cy);
            visited[si] = 1;
            if (cy > 0       && !visited[(cy-1)*width+x] && matches(x, cy-1)) stack.push(x, cy-1);
            if (cy < height-1 && !visited[(cy+1)*width+x] && matches(x, cy+1)) stack.push(x, cy+1);
        }
    }
    return true;
}

/* ─────────────── 컴포넌트 ─────────────── */
export default function ColoringCanvasPNG({ imagePath, slug, onDownload, onPrint }: Props) {
    const colorRef   = useRef<HTMLCanvasElement>(null);   // 색칠 레이어
    const outlineRef = useRef<HTMLCanvasElement>(null);   // 윤곽선 레이어 (읽기 전용)
    const wrapRef    = useRef<HTMLDivElement>(null);

    const [loading, setLoading]             = useState(true);
    const [selectedColor, setSelectedColor] = useState('#FFD700');
    const [history, setHistory]             = useState<ImageData[]>([]);
    const [strokeCount, setStrokeCount]     = useState(0);
    const [tool, setTool]                   = useState<ToolMode>('bucket');
    const [brushSize, setBrushSize]         = useState(18);
    const [scrollLocked, setScrollLocked]   = useState(false);

    const isDrawing   = useRef(false);
    const lastPos     = useRef<{ x: number; y: number } | null>(null);
    const strokeSaved = useRef(false);

    /* ─── 스크롤 잠금: body·html에 overflow hidden + iOS용 position fixed ─── */
    useEffect(() => {
        if (!scrollLocked) return;

        const scrollY = window.scrollY;
        const html = document.documentElement;
        const body = document.body;

        const prev = {
            htmlOverflow:    html.style.overflow,
            bodyOverflow:    body.style.overflow,
            bodyTouchAction: body.style.touchAction,
            bodyPosition:    body.style.position,
            bodyTop:         body.style.top,
            bodyWidth:       body.style.width,
        };

        html.style.overflow    = 'hidden';
        body.style.overflow    = 'hidden';
        body.style.touchAction = 'none';
        body.style.position    = 'fixed';        // iOS Safari 바운스 제거
        body.style.top         = `-${scrollY}px`;
        body.style.width       = '100%';

        return () => {
            html.style.overflow    = prev.htmlOverflow;
            body.style.overflow    = prev.bodyOverflow;
            body.style.touchAction = prev.bodyTouchAction;
            body.style.position    = prev.bodyPosition;
            body.style.top         = prev.bodyTop;
            body.style.width       = prev.bodyWidth;
            window.scrollTo(0, scrollY);
        };
    }, [scrollLocked]);

    /* ─── 이미지 로드 → 두 레이어 초기화 ─── */
    useEffect(() => {
        setLoading(true);
        setHistory([]);
        setStrokeCount(0);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const colorCanvas   = colorRef.current;
            const outlineCanvas = outlineRef.current;
            if (!colorCanvas || !outlineCanvas) return;

            const w = img.naturalWidth;
            const h = img.naturalHeight;

            // 두 캔버스 크기 맞추기
            colorCanvas.width   = w;
            colorCanvas.height  = h;
            outlineCanvas.width = w;
            outlineCanvas.height = h;

            /* 1. 임시 캔버스에서 원본 픽셀 추출 */
            const tmp = document.createElement('canvas');
            tmp.width = w; tmp.height = h;
            const tctx = tmp.getContext('2d')!;
            tctx.fillStyle = '#FFFFFF';
            tctx.fillRect(0, 0, w, h);
            tctx.drawImage(img, 0, 0);
            const srcData = tctx.getImageData(0, 0, w, h);

            /* 2. 색칠 레이어 = 흰 배경 + 도안 (flood-fill 참조용) */
            const colorCtx = colorCanvas.getContext('2d', { willReadFrequently: true })!;
            colorCtx.fillStyle = '#FFFFFF';
            colorCtx.fillRect(0, 0, w, h);
            colorCtx.drawImage(img, 0, 0);

            /* 3. 윤곽선 레이어 = 검은 픽셀만, 나머지는 투명 */
            const outCtx   = outlineCanvas.getContext('2d')!;
            const outData  = new ImageData(w, h);
            const src      = srcData.data;
            const dst      = outData.data;

            for (let i = 0; i < src.length; i += 4) {
                if (src[i+3] > 0 && isDark(src[i], src[i+1], src[i+2])) {
                    dst[i]   = src[i];
                    dst[i+1] = src[i+1];
                    dst[i+2] = src[i+2];
                    dst[i+3] = src[i+3];
                }
                // else: 투명 (0,0,0,0) — 기본값
            }
            outCtx.putImageData(outData, 0, 0);

            setLoading(false);
        };
        img.onerror = () => setLoading(false);
        img.src = imagePath;
    }, [imagePath]);

    /* ─── 좌표 변환 (마우스/터치 통합 처리) ─── */
    const getXY = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = colorRef.current!;
        const rect   = canvas.getBoundingClientRect();
        const scaleX = canvas.width  / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: Math.floor((e.clientX - rect.left) * scaleX),
            y: Math.floor((e.clientY - rect.top)  * scaleY),
        };
    }, []);

    /* ─── 히스토리 스냅샷 (색칠 레이어만) ─── */
    const saveSnapshot = useCallback(() => {
        const canvas = colorRef.current;
        const ctx    = canvas?.getContext('2d', { willReadFrequently: true });
        if (!canvas || !ctx) return;
        const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHistory(h => [...h.slice(-29), snap]);
    }, []);

    /* ─── 붓 획 그리기 ─── */
    const paintBrush = useCallback((
        ctx: CanvasRenderingContext2D,
        from: { x: number; y: number },
        to:   { x: number; y: number },
        color: string,
        size: number,
        erase: boolean,
    ) => {
        ctx.save();
        ctx.globalCompositeOperation = erase ? 'destination-out' : 'source-over';
        ctx.strokeStyle = erase ? 'rgba(0,0,0,1)' : color;
        ctx.fillStyle   = erase ? 'rgba(0,0,0,1)' : color;
        ctx.lineWidth   = size;
        ctx.lineCap     = 'round';
        ctx.lineJoin    = 'round';
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        // 시작점 원형 마감
        ctx.beginPath();
        ctx.arc(from.x, from.y, size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }, []);

    /* ─── 포인터 이벤트 (마우스 + 터치 통합) ─── */
    const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = colorRef.current;
        const ctx    = canvas?.getContext('2d', { willReadFrequently: true });
        if (!canvas || !ctx) return;

        // 터치/펜으로 그릴 때 페이지 스크롤·확대 차단
        e.preventDefault();
        // 손가락이 캔버스 밖으로 나가도 계속 추적
        try { canvas.setPointerCapture(e.pointerId); } catch { /* ignore */ }

        const { x, y } = getXY(e);

        if (tool === 'bucket') {
            saveSnapshot();
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const filled = floodFill(imageData, x, y, hexToRgba(selectedColor));
            if (filled) {
                ctx.putImageData(imageData, 0, 0);
                setStrokeCount(c => c + 1);
            } else {
                setHistory(h => h.slice(0, -1));
            }
            return;
        }

        isDrawing.current   = true;
        strokeSaved.current = false;
        lastPos.current     = { x, y };
    }, [tool, selectedColor, getXY, saveSnapshot]);

    const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isDrawing.current) return;
        if (tool !== 'brush' && tool !== 'eraser') return;
        const canvas = colorRef.current;
        const ctx    = canvas?.getContext('2d', { willReadFrequently: true });
        if (!canvas || !ctx || !lastPos.current) return;

        // 그리기 중 페이지 스크롤 방지
        e.preventDefault();

        if (!strokeSaved.current) {
            saveSnapshot();
            strokeSaved.current = true;
        }

        const { x, y } = getXY(e);
        paintBrush(ctx, lastPos.current, { x, y }, selectedColor, brushSize, tool === 'eraser');
        lastPos.current = { x, y };
    }, [tool, selectedColor, brushSize, getXY, paintBrush, saveSnapshot]);

    const handlePointerUp = useCallback((e?: React.PointerEvent<HTMLCanvasElement>) => {
        if (isDrawing.current && strokeSaved.current) {
            setStrokeCount(c => c + 1);
        }
        isDrawing.current   = false;
        strokeSaved.current = false;
        lastPos.current     = null;
        if (e && colorRef.current) {
            try { colorRef.current.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
        }
    }, []);

    /* ─── Undo ─── */
    const handleUndo = useCallback(() => {
        const canvas = colorRef.current;
        const ctx    = canvas?.getContext('2d', { willReadFrequently: true });
        if (!canvas || !ctx || history.length === 0) return;
        ctx.putImageData(history[history.length - 1], 0, 0);
        setHistory(h => h.slice(0, -1));
        setStrokeCount(c => Math.max(0, c - 1));
    }, [history]);

    /* ─── 키보드 단축키: Ctrl/Cmd+Z = 되돌리기 ─── */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                // 다른 input/textarea 포커스 중이면 무시
                const target = e.target as HTMLElement;
                if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return;
                e.preventDefault();
                handleUndo();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [handleUndo]);

    /* ─── 초기화 ─── */
    const handleReset = useCallback(() => {
        const canvas = colorRef.current;
        const ctx    = canvas?.getContext('2d', { willReadFrequently: true });
        if (!canvas || !ctx) return;
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            setHistory([]);
            setStrokeCount(0);
        };
        img.src = imagePath;
    }, [imagePath]);

    /* ─── 두 레이어 합성 → 단일 캔버스 ─── */
    const getComposited = useCallback((): HTMLCanvasElement | null => {
        const color   = colorRef.current;
        const outline = outlineRef.current;
        if (!color || !outline) return null;
        const tmp = document.createElement('canvas');
        tmp.width  = color.width;
        tmp.height = color.height;
        const ctx  = tmp.getContext('2d')!;
        ctx.drawImage(color,   0, 0);   // 색칠 레이어
        ctx.drawImage(outline, 0, 0);   // 윤곽선 레이어 (항상 위)
        return tmp;
    }, []);

    /* ─── 다운로드 ─── */
    const handleDownload = useCallback(() => {
        const tmp = getComposited();
        if (!tmp) return;
        const a   = document.createElement('a');
        a.href     = tmp.toDataURL('image/png');
        a.download = `maeul-coloring-${slug}.png`;
        a.click();
        onDownload?.();
    }, [slug, onDownload, getComposited]);

    /* ─── 인쇄 ─── */
    const handlePrint = useCallback(() => {
        const tmp = getComposited();
        if (!tmp) return;

        // 팝업은 동기적으로 먼저 열어야 팝업 차단 안 됨
        const win = window.open('', '_blank');
        if (!win) { alert('팝업 차단을 해제해 주세요.'); return; }

        // toBlob: toDataURL보다 메모리 효율적, 대용량 이미지에서도 안정적
        tmp.toBlob((blob) => {
            if (!blob) { win.close(); alert('인쇄 준비 중 오류가 발생했어요.'); return; }

            const blobUrl = URL.createObjectURL(blob);

            win.document.write(`<!DOCTYPE html>
<html><head>
<meta charset="utf-8"><title>마음마을 색칠공부</title>
<style>
  @page { size: A4 portrait; margin: 10mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { background: #fff; }
  img { display: block; width: 190mm; height: auto; max-height: 277mm; }
</style></head>
<body>
<img src="${blobUrl}" onload="setTimeout(function(){window.print();window.close();},300)" />
</body></html>`);
            win.document.close();

            // blob URL 자동 해제 (인쇄 완료 후 여유 있게)
            setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
            onPrint?.();
        }, 'image/png');
    }, [onPrint, getComposited]);

    /* ─── 툴 버튼 ─── */
    const ToolBtn = ({ t, label, icon }: { t: ToolMode; label: string; icon: React.ReactNode }) => (
        <button
            onClick={() => setTool(t)}
            title={label}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                tool === t
                    ? 'bg-[#4A3826] text-white shadow-sm'
                    : 'bg-[#FBF1DC] text-[#6E5942] hover:bg-[#F7E8CC]'
            }`}
        >
            {icon}{label}
        </button>
    );

    return (
        <div className="space-y-4">
            {/* 로딩 */}
            {loading && (
                <div className="flex items-center justify-center aspect-[4/5] bg-white rounded-3xl border-2 border-dashed border-gray-200">
                    <Loader2 className="animate-spin text-maeul-coral" size={32} />
                </div>
            )}

            {/* 툴바 */}
            {!loading && (
                <div className="flex items-center justify-between flex-wrap gap-2 px-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <ToolBtn t="bucket" label="페인트통" icon={<span className="text-sm">🪣</span>} />
                        <ToolBtn t="brush"  label="붓"       icon={<span className="text-sm">🖌️</span>} />
                        <ToolBtn t="eraser" label="지우개"   icon={<Eraser size={12} />} />

                        {/* 시각 구분선 */}
                        <div className="w-px h-5 bg-[#D5C9B6] mx-0.5" />

                        {/* 되돌리기 — 마지막 색칠 한 단계 취소 */}
                        <button
                            onClick={handleUndo}
                            disabled={history.length === 0}
                            title={history.length === 0
                                ? '되돌릴 작업이 없어요'
                                : `방금 칠한 것 되돌리기 (${history.length}단계 가능) · Ctrl+Z`}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                                history.length === 0
                                    ? 'bg-[#FBF1DC] text-[#C4A77D] cursor-not-allowed opacity-60'
                                    : 'bg-[#9CC4B8] text-white hover:bg-[#7BAA9E] shadow-sm'
                            }`}
                        >
                            <Undo2 size={12} /> 되돌리기
                            {history.length > 0 && (
                                <span className="ml-0.5 text-[10px] opacity-90">({history.length})</span>
                            )}
                        </button>
                    </div>

                    {/* 붓/지우개 크기 슬라이더 */}
                    {(tool === 'brush' || tool === 'eraser') && (
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#9A8569]">크기</span>
                            <input
                                type="range" min={4} max={60} step={2}
                                value={brushSize}
                                onChange={e => setBrushSize(Number(e.target.value))}
                                className="w-24 accent-[#D87C7E]"
                            />
                            <div
                                className="rounded-full bg-[#D87C7E] flex-shrink-0 opacity-60"
                                style={{
                                    width:  Math.max(6, brushSize / 3),
                                    height: Math.max(6, brushSize / 3),
                                }}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* 안내 문구 */}
            {!loading && (
                <p className="text-xs font-body text-[#9A8569] px-1">
                    {tool === 'bucket' && '🪣 원하는 색을 선택하고 영역을 클릭하면 채워져요!'}
                    {tool === 'brush'  && (
                        <>🖌️ 드래그해서 자유롭게 그려보세요! 윤곽선은 보호돼요.
                            {!scrollLocked && (
                                <span className="ml-1 text-[#D87C7E] font-bold">
                                    📱 화면이 흔들리면 아래 색 선택 영역의 <Lock size={10} className="inline mb-0.5" /> 스크롤 잠금을 켜보세요.
                                </span>
                            )}
                        </>
                    )}
                    {tool === 'eraser' && '지우개로 드래그해서 색상을 지워요. 윤곽선은 보호돼요.'}
                </p>
            )}

            {/* ── 듀얼 레이어 캔버스 ── */}
            <div
                ref={wrapRef}
                className="relative rounded-3xl border-2 border-gray-100 shadow-sm overflow-hidden bg-white"
                style={{ display: loading ? 'none' : 'block' }}
            >
                {/* 하단: 색칠 레이어 (이벤트 수신) */}
                <canvas
                    ref={colorRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    style={{
                        display: 'block',
                        width: '100%',
                        cursor: tool === 'bucket' ? 'crosshair' : 'cell',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        touchAction: 'none',          /* 모바일에서 페이지 스크롤·확대 방지 */
                        WebkitTouchCallout: 'none',   /* iOS 길게 누르기 메뉴 방지 */
                    }}
                    title={tool === 'bucket' ? '클릭해서 색칠하세요' : '드래그해서 그리세요'}
                />
                {/* 상단: 윤곽선 레이어 (터치/이벤트 무시, 항상 위에) */}
                <canvas
                    ref={outlineRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                    }}
                />
            </div>

            {/* 진행 힌트 */}
            {!loading && strokeCount > 0 && (
                <p className="text-center text-xs text-[#9A8569] font-body">
                    {strokeCount}번 색칠했어요 🎨
                </p>
            )}

            {/* 팔레트 */}
            {!loading && (
                <ColorPalette
                    selectedColor={selectedColor}
                    onColorSelect={(c) => {
                        setSelectedColor(c);
                        if (tool === 'eraser') setTool('brush');
                    }}
                    onUndo={handleUndo}
                    canUndo={history.length > 0}
                    onReset={handleReset}
                    scrollLocked={scrollLocked}
                    onToggleScrollLock={() => setScrollLocked(v => !v)}
                />
            )}

            {/* 저장 / 인쇄 */}
            {!loading && (
                <div className="flex gap-3">
                    <button
                        onClick={handleDownload}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-maeul-gold text-white font-bold text-sm hover:bg-maeul-gold/90 transition-colors shadow-sm"
                    >
                        <Download size={16} />
                        색칠본 저장 (PNG)
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white border-2 border-maeul-coral/20 text-maeul-coral font-bold text-sm hover:bg-maeul-coral/5 transition-colors"
                    >
                        <Printer size={16} />
                        바로 인쇄
                    </button>
                </div>
            )}
        </div>
    );
}
