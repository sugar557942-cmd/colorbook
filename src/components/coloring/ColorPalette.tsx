"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Eraser, RotateCcw, Lock, Unlock } from 'lucide-react';

export interface PaletteColor {
    hex: string;
    label: string;
}

export const ART_THERAPY_COLORS: PaletteColor[] = [
    { hex: '#FF4444', label: '빨강' },
    { hex: '#FF8C44', label: '주황' },
    { hex: '#FFD700', label: '노랑' },
    { hex: '#44BB44', label: '초록' },
    { hex: '#4488FF', label: '파랑' },
    { hex: '#9966CC', label: '보라' },
    { hex: '#FFB3B3', label: '연분홍' },
    { hex: '#FFDDB3', label: '복숭아' },
    { hex: '#FFFFA0', label: '연노랑' },
    { hex: '#B3FFB3', label: '연두' },
    { hex: '#B3D9FF', label: '하늘' },
    { hex: '#E0B3FF', label: '연보라' },
    { hex: '#8B6914', label: '갈색' },
    { hex: '#C4A77D', label: '베이지' },
    { hex: '#888888', label: '회색' },
    { hex: '#333333', label: '검정' },
];

interface ColorPaletteProps {
    selectedColor: string;
    onColorSelect: (hex: string) => void;
    onUndo?: () => void;
    canUndo?: boolean;
    onReset?: () => void;
    scrollLocked?: boolean;
    onToggleScrollLock?: () => void;
}

export default function ColorPalette({
    selectedColor,
    onColorSelect,
    onUndo,
    canUndo,
    onReset,
    scrollLocked,
    onToggleScrollLock,
}: ColorPaletteProps) {
    const isEraser = selectedColor === '#FFFFFF';

    return (
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 select-none">
            <p className="text-xs font-bold text-gray-400 mb-3 tracking-wide">색 선택</p>

            {/* Color swatches */}
            <div className="grid grid-cols-8 gap-2 mb-4">
                {ART_THERAPY_COLORS.map(({ hex, label }) => (
                    <button
                        key={hex}
                        title={label}
                        onClick={() => onColorSelect(hex)}
                        className={cn(
                            'w-8 h-8 rounded-full border-2 transition-all hover:scale-110 active:scale-95',
                            selectedColor === hex && !isEraser
                                ? 'border-gray-800 scale-110 shadow-md'
                                : 'border-white shadow-sm hover:border-gray-300'
                        )}
                        style={{ backgroundColor: hex }}
                    />
                ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 mb-3" />

            {/* Tools row */}
            <div className="flex items-center gap-2">
                {/* Eraser */}
                <button
                    title="지우개 (흰색)"
                    onClick={() => onColorSelect('#FFFFFF')}
                    className={cn(
                        'flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold transition-all',
                        isEraser
                            ? 'bg-gray-800 text-white shadow'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    )}
                >
                    <Eraser size={14} />
                    지우개
                </button>

                {/* Undo */}
                {onUndo && (
                    <button
                        title="실행 취소 · Ctrl+Z"
                        onClick={onUndo}
                        disabled={!canUndo}
                        className={cn(
                            'flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold transition-all',
                            canUndo
                                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                        )}
                    >
                        <RotateCcw size={14} />
                        되돌리기
                    </button>
                )}

                {/* Scroll lock — 모바일/태블릿에서 색칠 시 화면 흔들림 방지 */}
                {onToggleScrollLock && (
                    <button
                        title={scrollLocked
                            ? '스크롤 잠금 해제'
                            : '스크롤 잠금 — 색칠 중 페이지 흔들림 방지'}
                        onClick={onToggleScrollLock}
                        className={cn(
                            'flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold transition-all',
                            scrollLocked
                                ? 'bg-[#D87C7E] text-white shadow ring-2 ring-[#D87C7E]/30'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        )}
                    >
                        {scrollLocked ? <Lock size={14} /> : <Unlock size={14} />}
                        스크롤
                    </button>
                )}
            </div>

            {/* Reset */}
            {onReset && (
                <button
                    onClick={onReset}
                    className="w-full mt-3 py-2 rounded-2xl text-xs font-bold text-red-400 hover:bg-red-50 transition-colors border border-red-100"
                >
                    전체 초기화
                </button>
            )}
        </div>
    );
}
