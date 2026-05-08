"use client";

/**
 * ColoringCanvasPNG  —  v2
 * ──────────────────────────────────────────────────────────
 * 두 가지 그리기 모드:
 *   🪣  페인트통 (Bucket) — 클릭 한 번으로 영역 flood-fill
 *   🖌️  붓 (Brush)       — 마우스 드래그로 자유롭게 그리기
 *
 * + 지우개, Undo(30단계), 초기화, PNG 저장, 인쇄
 * ──────────────────────────────────────────────────────────
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import ColorPalette from './ColorPalette';
import { Download, Printer, Loader2, Eraser, Pipette } from 'lucide-react';

interface Props {
    imagePath: string;
    slug: string;
    onDownload?: () => void;
    onPrint?: () => void;
}

type ToolMode = 'bucket' | 'brush' | 'eraser';

/* ── 색 변환 ── */
function hexToRgba(hex: string): [number, number, number, number] {
    const h = hex.replace('#', '');
    const p = (s: string) => parseInt(s, 16);
    if (h.length === 3) return [p(h[0]+h[0]), p(h[1]+h[1]), p(h[2]+h[2]), 255];
    return [p(h.slice(0,2)), p(h.slice(2,4)), p(h.slice(4,6)), 255];
}

function colorDistance(
    a: [number,number,number,number],
    b: [number,number,number,number]
): number {
    return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2);
}

/* ── Scanline Flood-Fill ── */
function floodFill(
    imageData: ImageData,
    startX: number,
    startY: number,
    fillColor: [number,number,number,number],
    tolerance = 40,
    outlineDark = 100,
): boolean {
    const { data, width, height } = imageData;
    const idx  = (x: number, y: number) => (y * width + x) * 4;
    const getPixel = (x: number, y: number): [number,number,number,number] => {
        const i = idx(x, y);
        return [data[i], data[i+1], data[i+2], data[i+3]];
    };
    const isOutline = (x: number, y: number) => {
        const [r,g,b] = getPixel(x, y);
        return (r + g + b) < outlineDark * 3;
    };
    const targetColor = getPixel(startX, startY);
    if (isOutline(startX, startY)) return false;
    if (colorDistance(targetColor, fillColor) < 8) return false;

    const matches = (x: number, y: number) => {
        if (x < 0 || x >= width || y < 0 || y >= height) return false;
        if (isOutline(x, y)) return false;
        return colorDistance(getPixel(x, y), targetColor) <= tolerance;
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
            if (cy > 0   && !visited[(cy-1)*width+x] && matches(x, cy-1)) stack.push(x, cy-1);
            if (cy < height-1 && !visited[(cy+1)*width+x] && matches(x, cy+1)) stack.push(x, cy+1);
        }
    }
    return true;
}

/* ── 컴포넌트 ── */
export default function ColoringCanvasPNG({ imagePath, slug, onDownload, onPrint }: Props) {
    const canvasRef     = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading]         = useState(true);
    const [selectedColor, setSelectedColor] = useState('#FFD700');
    const [history, setHistory]         = useState<ImageData[]>([]);
    const [strokeCount, setStrokeCount] = useState(0);
    const [tool, setTool]               = useState<ToolMode>('bucket');
    const [brushSize, setBrushSize]     = useState(18);

    // 드래그 상태 (ref — 리렌더 없이 유지)
    const isDrawing  = useRef(false);
    const lastPos    = useRef<{ x: number; y: number } | null>(null);
    const strokeSaved = useRef(false); // 한 획에 한 번만 히스토리 저장

    /* ── 이미지 로드 ── */
    useEffect(() => {
        setLoading(true);
        setHistory([]);
        setStrokeCount(0);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width  = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (!ctx) return;
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            setLoading(false);
        };
        img.onerror = () => setLoading(false);
        img.src = imagePath;
    }, [imagePath]);

    /* ── 캔버스 좌표 변환 ── */
    const getXY = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current!;
        const rect   = canvas.getBoundingClientRect();
        const scaleX = canvas.width  / rect.width;
        const scaleY = canvas.height / rect.height;
        let clientX: number, clientY: number;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        return {
            x: Math.floor((clientX - rect.left) * scaleX),
            y: Math.floor((clientY - rect.top)  * scaleY),
        };
    }, []);

    /* ── 붓 그리기 (두 점 사이 선) ── */
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
        // 시작점 원형 dot
        ctx.beginPath();
        ctx.arc(from.x, from.y, size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }, []);

    /* ── 히스토리 스냅샷 ── */
    const saveSnapshot = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx    = canvas?.getContext('2d', { willReadFrequently: true });
        if (!canvas || !ctx) return;
        const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHistory(h => [...h.slice(-29), snap]);
    }, []);

    /* ── 마우스 이벤트 ── */
    const handlePointerDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        const ctx    = canvas?.getContext('2d', { willReadFrequently: true });
        if (!canvas || !ctx) return;

        const { x, y } = getXY(e);

        if (tool === 'bucket') {
            // 페인트통 — 클릭 즉시 flood-fill
            saveSnapshot();
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const color = hexToRgba(selectedColor);
            const filled = floodFill(imageData, x, y, color);
            if (filled) {
                ctx.putImageData(imageData, 0, 0);
                setStrokeCount(c => c + 1);
            } else {
                setHistory(h => h.slice(0, -1));
            }
            return;
        }

        // 붓 / 지우개 — 드래그 시작
        isDrawing.current  = true;
        strokeSaved.current = false;
        lastPos.current    = { x, y };
    }, [tool, selectedColor, getXY, saveSnapshot]);

    const handlePointerMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing.current || (tool !== 'brush' && tool !== 'eraser')) return;
        const canvas = canvasRef.current;
        const ctx    = canvas?.getContext('2d', { willReadFrequently: true });
        if (!canvas || !ctx || !lastPos.current) return;

        // 첫 이동 시 히스토리 저장
        if (!strokeSaved.current) {
            saveSnapshot();
            strokeSaved.current = true;
        }

        const { x, y } = getXY(e);
        paintBrush(ctx, lastPos.current, { x, y }, selectedColor, brushSize, tool === 'eraser');
        lastPos.current = { x, y };
    }, [tool, selectedColor, brushSize, getXY, paintBrush, saveSnapshot]);

    const handlePointerUp = useCallback(() => {
        if (isDrawing.current && strokeSaved.current) {
            setStrokeCount(c => c + 1);
        }
        isDrawing.current   = false;
        strokeSaved.current = false;
        lastPos.current     = null;
    }, []);

    /* ── Undo ── */
    const handleUndo = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx    = canvas?.getContext('2d', { willReadFrequently: true });
        if (!canvas || !ctx || history.length === 0) return;
        ctx.putImageData(history[history.length - 1], 0, 0);
        setHistory(h => h.slice(0, -1));
        setStrokeCount(c => Math.max(0, c - 1));
    }, [history]);

    /* ── 초기화 ── */
    const handleReset = useCallback(() => {
        const canvas = canvasRef.current;
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

    /* ── 다운로드 ── */
    const handleDownload = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const url = canvas.toDataURL('image/png');
        const a   = document.createElement('a');
        a.href = url; a.download = `maeul-coloring-${slug}.png`; a.click();
        onDownload?.();
    }, [slug, onDownload]);

    /* ── 인쇄 ── */
    const handlePrint = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const url = canvas.toDataURL('image/png');
        const win = window.open('', '_blank');
        if (!win) { alert('팝업 차단을 해제해 주세요.'); return; }
        win.document.write(`<!DOCTYPE html>
<html><head>
<meta charset="utf-8"><title>마음마을 색칠공부</title>
<style>
  @page { size: A4 portrait; margin: 10mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { background: #fff; }
  img { display: block; width: 190mm; height: auto; max-height: 277mm; }
</style></head>
<body><img src="${url}" />
<script>window.addEventListener('load',()=>{setTimeout(()=>{window.print();window.close();},400);});<\/script>
</body></html>`);
        win.document.close();
        onPrint?.();
    }, [onPrint]);

    /* ── 툴 버튼 스타일 ── */
    const toolBtn = (t: ToolMode, label: string, icon: React.ReactNode) => (
        <button
            onClick={() => setTool(t)}
            title={label}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                tool === t
                    ? 'bg-[#4A3826] text-white shadow-sm'
                    : 'bg-[#FBF1DC] text-[#6E5942] hover:bg-[#F7E8CC]'
            }`}
        >
            {icon}
            {label}
        </button>
    );

    const canvasCursor = tool === 'eraser' ? 'cell' : tool === 'brush' ? 'crosshair' : 'crosshair';

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
                <div className="flex items-center justify-between px-1 flex-wrap gap-2">
                    {/* 도구 선택 */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {toolBtn('bucket', '페인트통', <span className="text-sm">🪣</span>)}
                        {toolBtn('brush',  '붓',      <span className="text-sm">🖌️</span>)}
                        {toolBtn('eraser', '지우개',  <Eraser size={12} />)}
                    </div>

                    {/* 붓 크기 슬라이더 — 붓/지우개 모드에서만 표시 */}
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
                                className="rounded-full bg-[#D87C7E] flex-shrink-0 opacity-70"
                                style={{
                                    width: Math.max(6, brushSize / 3),
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
                    {tool === 'brush'  && '🖌️ 드래그해서 자유롭게 그려보세요!'}
                    {tool === 'eraser' && '지우개로 드래그해서 지워요!'}
                </p>
            )}

            {/* 캔버스 */}
            <canvas
                ref={canvasRef}
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm block touch-none"
                style={{
                    display: loading ? 'none' : 'block',
                    width: '100%',
                    cursor: canvasCursor,
                    userSelect: 'none',
                }}
                title={tool === 'bucket' ? '클릭해서 색칠하세요' : '드래그해서 그리세요'}
            />

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
                        // 색 선택 시 지우개면 붓으로 자동 전환
                        if (tool === 'eraser') setTool('brush');
                    }}
                    onUndo={handleUndo}
                    canUndo={history.length > 0}
                    onReset={handleReset}
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
