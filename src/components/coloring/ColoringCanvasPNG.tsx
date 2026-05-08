"use client";

/**
 * ColoringCanvasPNG
 * ----------------------------------------------------------
 * PNG 색칠 도안 위에서 클릭 한 번으로 flood-fill (페인트 통)
 * 영역을 칠해주는 캔버스 컴포넌트.
 *
 *  - HTML Canvas + getImageData / putImageData
 *  - Scanline flood-fill 알고리즘 (빠름, ~0.5ms / click)
 *  - 검은 윤곽선은 넘어가지 않음
 *  - 30단계 undo 히스토리 (ImageData 스냅샷)
 *  - 색칠본 PNG 다운로드 / 인쇄 지원
 * ----------------------------------------------------------
 */

import React, {
    useRef, useEffect, useState, useCallback
} from 'react';
import ColorPalette from './ColorPalette';
import { Download, Printer, Loader2, Eraser } from 'lucide-react';

interface Props {
    imagePath: string;
    slug: string;
    onDownload?: () => void;
    onPrint?: () => void;
}

/* ── 색 변환 ── */
function hexToRgba(hex: string): [number, number, number, number] {
    const h = hex.replace('#', '');
    const parse = (s: string) => parseInt(s, 16);
    if (h.length === 3) {
        return [parse(h[0]+h[0]), parse(h[1]+h[1]), parse(h[2]+h[2]), 255];
    }
    return [parse(h.slice(0,2)), parse(h.slice(2,4)), parse(h.slice(4,6)), 255];
}

function colorDistance(
    a: [number,number,number,number],
    b: [number,number,number,number]
): number {
    return Math.sqrt(
        (a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2
    );
}

/* ── Scanline Flood-Fill ── */
function floodFill(
    imageData: ImageData,
    startX: number,
    startY: number,
    fillColor: [number,number,number,number],
    tolerance = 40,
    outlineDark = 100,   // 이 밝기 이하이면 윤곽선으로 간주
): boolean {
    const { data, width, height } = imageData;

    const idx  = (x: number, y: number) => (y * width + x) * 4;

    const getPixel = (x: number, y: number): [number,number,number,number] => {
        const i = idx(x, y);
        return [data[i], data[i+1], data[i+2], data[i+3]];
    };

    const isOutline = (x: number, y: number) => {
        const [r,g,b] = getPixel(x, y);
        // 어두운 픽셀 = 윤곽선
        return (r + g + b) < outlineDark * 3;
    };

    const targetColor = getPixel(startX, startY);

    // 윤곽선 위 클릭 → 무시
    if (isOutline(startX, startY)) return false;
    // 이미 같은 색 → 무시
    if (colorDistance(targetColor, fillColor) < 8) return false;

    const matches = (x: number, y: number) => {
        if (x < 0 || x >= width || y < 0 || y >= height) return false;
        if (isOutline(x, y)) return false;
        return colorDistance(getPixel(x, y), targetColor) <= tolerance;
    };

    const setPixel = (x: number, y: number) => {
        const i = idx(x, y);
        data[i]   = fillColor[0];
        data[i+1] = fillColor[1];
        data[i+2] = fillColor[2];
        data[i+3] = fillColor[3];
    };

    const visited = new Uint8Array(width * height);
    // [x, y] 쌍을 숫자로 interleave
    const stack: number[] = [startX, startY];

    while (stack.length > 0) {
        const cy = stack.pop()!;
        const cx = stack.pop()!;

        if (cx < 0 || cx >= width || cy < 0 || cy >= height) continue;
        const vi = cy * width + cx;
        if (visited[vi]) continue;
        if (!matches(cx, cy)) continue;

        // 좌로 확장
        let left = cx;
        while (left > 0 && !visited[cy * width + (left-1)] && matches(left-1, cy)) left--;

        // 우로 확장
        let right = cx;
        while (right < width-1 && !visited[cy * width + (right+1)] && matches(right+1, cy)) right++;

        // 스팬 칠하기
        for (let x = left; x <= right; x++) {
            const si = cy * width + x;
            if (visited[si]) continue;
            setPixel(x, cy);
            visited[si] = 1;
            // 위아래 큐에 추가
            if (cy > 0 && !visited[(cy-1)*width+x] && matches(x, cy-1)) {
                stack.push(x, cy-1);
            }
            if (cy < height-1 && !visited[(cy+1)*width+x] && matches(x, cy+1)) {
                stack.push(x, cy+1);
            }
        }
    }

    return true;
}

/* ── 컴포넌트 ── */
export default function ColoringCanvasPNG({
    imagePath, slug, onDownload, onPrint,
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState('#FFD700');
    const [history, setHistory] = useState<ImageData[]>([]);
    const [fillCount, setFillCount] = useState(0);
    const [erasing, setErasing] = useState(false);

    // 도안 이미지를 캔버스에 로드
    useEffect(() => {
        setLoading(true);
        setHistory([]);
        setFillCount(0);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width  = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (!ctx) return;
            // 흰 배경 먼저 채우기
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            setLoading(false);
        };
        img.onerror = () => setLoading(false);
        img.src = imagePath;
    }, [imagePath]);

    /* 캔버스 좌표로 변환 */
    const getCanvasCoords = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current!;
        const rect   = canvas.getBoundingClientRect();
        const scaleX = canvas.width  / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: Math.floor((e.clientX - rect.left) * scaleX),
            y: Math.floor((e.clientY - rect.top)  * scaleY),
        };
    }, []);

    /* 클릭 → flood-fill */
    const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        const ctx    = canvas?.getContext('2d', { willReadFrequently: true });
        if (!canvas || !ctx) return;

        const { x, y } = getCanvasCoords(e);

        // 히스토리 저장 (최대 30단계)
        const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHistory(h => [...h.slice(-29), snapshot]);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const color = erasing ? hexToRgba('#FFFFFF') : hexToRgba(selectedColor);
        const filled = floodFill(imageData, x, y, color);

        if (filled) {
            ctx.putImageData(imageData, 0, 0);
            setFillCount(c => c + 1);
        } else {
            // 채우지 못하면 히스토리에서 제거
            setHistory(h => h.slice(0, -1));
        }
    }, [selectedColor, erasing, getCanvasCoords]);

    /* 실행 취소 */
    const handleUndo = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx    = canvas?.getContext('2d', { willReadFrequently: true });
        if (!canvas || !ctx || history.length === 0) return;
        const prev = history[history.length - 1];
        ctx.putImageData(prev, 0, 0);
        setHistory(h => h.slice(0, -1));
        setFillCount(c => Math.max(0, c - 1));
    }, [history]);

    /* 초기화 */
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
            setFillCount(0);
        };
        img.src = imagePath;
    }, [imagePath]);

    /* 색칠본 PNG 다운로드 */
    const handleDownload = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const url = canvas.toDataURL('image/png');
        const a   = document.createElement('a');
        a.href     = url;
        a.download = `maeul-coloring-${slug}.png`;
        a.click();
        onDownload?.();
    }, [slug, onDownload]);

    /* 인쇄 */
    const handlePrint = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const url = canvas.toDataURL('image/png');
        const win = window.open('', '_blank');
        if (!win) { alert('팝업 차단을 해제해 주세요.'); return; }
        win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>마음마을 색칠공부</title>
  <style>
    @page { size: A4 portrait; margin: 10mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { background: #fff; }
    img { display: block; width: 190mm; height: auto; max-height: 277mm; }
  </style>
</head>
<body>
  <img src="${url}" />
  <script>
    window.addEventListener('load', function () {
      setTimeout(function () { window.print(); window.close(); }, 400);
    });
  <\/script>
</body>
</html>`);
        win.document.close();
        onPrint?.();
    }, [onPrint]);

    if (loading) {
        return (
            <div className="flex items-center justify-center aspect-[4/5] bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <Loader2 className="animate-spin text-maeul-coral" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* 모드 안내 */}
            <div className="flex items-center justify-between px-1">
                <p className="text-xs font-body text-[#9A8569]">
                    🪣 원하는 색을 선택하고 영역을 클릭하면 채워져요!
                </p>
                <button
                    onClick={() => setErasing(v => !v)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        erasing
                            ? 'bg-[#4A3826] text-white'
                            : 'bg-[#FBF1DC] text-[#6E5942] hover:bg-[#F7E8CC]'
                    }`}
                >
                    <Eraser size={12} />
                    지우개
                </button>
            </div>

            {/* 캔버스 */}
            <canvas
                ref={canvasRef}
                onClick={handleClick}
                className="w-full bg-white rounded-3xl border-2 border-gray-100 shadow-sm overflow-hidden block"
                style={{ cursor: erasing ? 'cell' : 'crosshair', imageRendering: 'pixelated' }}
                title="클릭해서 색칠하세요"
            />

            {/* 진행 힌트 */}
            {fillCount > 0 && (
                <p className="text-center text-xs text-[#9A8569] font-body">
                    {fillCount}번 색칠했어요 🎨
                </p>
            )}

            {/* 팔레트 */}
            <ColorPalette
                selectedColor={selectedColor}
                onColorSelect={(c) => { setSelectedColor(c); setErasing(false); }}
                onUndo={handleUndo}
                canUndo={history.length > 0}
                onReset={handleReset}
            />

            {/* 저장 / 인쇄 */}
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
        </div>
    );
}
