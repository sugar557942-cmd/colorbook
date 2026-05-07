"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import ColorPalette from './ColorPalette';
import { Loader2, Download, Printer } from 'lucide-react';

interface HistoryEntry {
    id: string;
    prevColor: string;
}

interface ColoringCanvasProps {
    svgPath: string;
    slug: string;
    onDownload?: () => void;
    onPrint?: () => void;
}

export default function ColoringCanvas({ svgPath, slug, onDownload, onPrint }: ColoringCanvasProps) {
    const [svgContent, setSvgContent] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState('#FFD700');
    const [colorMap, setColorMap] = useState<Record<string, string>>({});
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Fetch SVG and make it responsive
    useEffect(() => {
        setLoading(true);
        setColorMap({});
        setHistory([]);
        fetch(svgPath)
            .then(r => r.text())
            .then(text => {
                const cleaned = text
                    .replace(/\s+width="\d+(\.\d+)?"/, ' width="100%"')
                    .replace(/\s+height="\d+(\.\d+)?"/, ' height="100%"')
                    .replace(/cursor:\s*pointer/g, '');
                setSvgContent(cleaned);
            })
            .finally(() => setLoading(false));
    }, [svgPath]);

    // Apply colorMap to DOM after every render
    useEffect(() => {
        if (!containerRef.current) return;
        Object.entries(colorMap).forEach(([id, color]) => {
            const el = containerRef.current!.querySelector(`#${id}`) as SVGElement | null;
            if (el) el.style.fill = color;
        });
    }, [svgContent, colorMap]);

    const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as SVGElement;
        if (!target.classList.contains('colorable') && !target.classList.contains('colorable-text')) return;
        const id = target.id;
        if (!id) return;

        const prevColor = colorMap[id] ?? 'white';
        setHistory(h => [...h.slice(-29), { id, prevColor }]);
        setColorMap(prev => ({ ...prev, [id]: selectedColor }));
    }, [selectedColor, colorMap]);

    const handleUndo = useCallback(() => {
        if (history.length === 0) return;
        const last = history[history.length - 1];
        setHistory(h => h.slice(0, -1));
        setColorMap(prev => ({ ...prev, [last.id]: last.prevColor }));
    }, [history]);

    const handleReset = useCallback(() => {
        setColorMap({});
        setHistory([]);
        // Reset all DOM fills
        if (!containerRef.current) return;
        containerRef.current.querySelectorAll('.colorable').forEach(el => {
            (el as SVGElement).style.fill = 'white';
        });
    }, []);

    const handleDownloadColored = useCallback(() => {
        const svgEl = containerRef.current?.querySelector('svg');
        if (!svgEl) return;
        const clone = svgEl.cloneNode(true) as SVGElement;
        // Bake current fills into clone attributes
        Object.entries(colorMap).forEach(([id, color]) => {
            const el = clone.querySelector(`#${id}`) as SVGElement | null;
            if (el) el.setAttribute('fill', color);
        });
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(clone);
        const blob = new Blob([svgStr], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `maeul-coloring-${slug}.svg`;
        a.click();
        URL.revokeObjectURL(url);
        onDownload?.();
    }, [colorMap, slug, onDownload]);

    const handlePrint = useCallback(() => {
        const svgEl = containerRef.current?.querySelector('svg');
        if (!svgEl) return;
        const clone = svgEl.cloneNode(true) as SVGElement;
        // 색칠한 색상 모두 반영
        Object.entries(colorMap).forEach(([id, color]) => {
            const el = clone.querySelector(`#${id}`) as SVGElement | null;
            if (el) el.setAttribute('fill', color);
        });
        // CSS가 크기를 제어하도록 고정 크기 속성 제거
        clone.removeAttribute('width');
        clone.removeAttribute('height');
        clone.setAttribute('preserveAspectRatio', 'xMidYMid meet');

        const svgStr = new XMLSerializer().serializeToString(clone);
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
    html, body { background: #fff; width: 100%; }
    svg { display: block; width: 190mm; height: auto; max-height: 277mm; }
  </style>
</head>
<body>
${svgStr}
<script>
  window.addEventListener('load', function () {
    setTimeout(function () { window.print(); window.close(); }, 300);
  });
<\/script>
</body>
</html>`);
        win.document.close();
        onPrint?.();
    }, [colorMap, onPrint]);

    if (loading) {
        return (
            <div className="flex items-center justify-center aspect-[4/5] bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <Loader2 className="animate-spin text-maeul-coral" size={32} />
            </div>
        );
    }

    const coloredCount = Object.values(colorMap).filter(c => c !== 'white' && c !== '#FFFFFF').length;

    return (
        <div className="space-y-4">
            {/* Canvas */}
            <div
                ref={containerRef}
                onClick={handleCanvasClick}
                className="bg-white rounded-3xl border-2 border-gray-100 overflow-hidden shadow-sm cursor-crosshair select-none"
                style={{ lineHeight: 0 }}
                dangerouslySetInnerHTML={{ __html: svgContent }}
            />

            {/* Progress hint */}
            {coloredCount > 0 && (
                <p className="text-center text-xs text-maeul-soft-gray">
                    {coloredCount}개 영역에 색칠했어요 🎨
                </p>
            )}

            {/* Palette */}
            <ColorPalette
                selectedColor={selectedColor}
                onColorSelect={setSelectedColor}
                onUndo={handleUndo}
                canUndo={history.length > 0}
                onReset={handleReset}
            />

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    onClick={handleDownloadColored}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-maeul-gold text-white font-bold text-sm hover:bg-maeul-gold/90 transition-colors shadow-sm"
                >
                    <Download size={16} />
                    색칠본 저장 (SVG)
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
