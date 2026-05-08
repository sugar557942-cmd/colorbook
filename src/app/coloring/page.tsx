"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ColoringCard from '@/components/shared/ColoringCard';
import { coloringPages } from '@/data/coloringPages';
import { characters } from '@/data/characters';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';

type TypeFilter = 'all' | 'character' | 'scene' | 'activity' | 'emotion' | 'mandala' | 'color-therapy' | 'pattern';
type AgeFilter = 'all' | '3-5세' | '6-8세' | '9-12세' | '전연령';

const TYPE_TABS: { value: TypeFilter; label: string; emoji: string }[] = [
    { value: 'all', label: '전체', emoji: '🎨' },
    { value: 'character', label: '캐릭터', emoji: '🐻' },
    { value: 'scene', label: '장면', emoji: '🌿' },
    { value: 'emotion', label: '감정', emoji: '😊' },
    { value: 'mandala', label: '만다라', emoji: '🌸' },
    { value: 'color-therapy', label: '색채치료', emoji: '🌈' },
    { value: 'activity', label: '활동', emoji: '🎯' },
];

const AGE_TABS: { value: AgeFilter; label: string }[] = [
    { value: 'all', label: '전 연령' },
    { value: '3-5세', label: '3–5세' },
    { value: '6-8세', label: '6–8세' },
    { value: '9-12세', label: '9–12세' },
];

export default function ColoringListPage() {
    const [activeChar, setActiveChar] = useState<string>('all');
    const [activeType, setActiveType] = useState<TypeFilter>('all');
    const [activeAge, setActiveAge] = useState<AgeFilter>('all');

    const filtered = coloringPages.filter(p => {
        const cm = activeChar === 'all' || p.character === activeChar;
        const tm = activeType === 'all' || p.type === activeType;
        const am = activeAge === 'all' || p.ageRange === activeAge || p.ageRange === '전연령';
        return cm && tm && am;
    });

    const hasFilter = activeChar !== 'all' || activeType !== 'all' || activeAge !== 'all';
    const reset = () => { setActiveChar('all'); setActiveType('all'); setActiveAge('all'); };

    return (
        <div className="relative min-h-screen sb-paper overflow-hidden">
            {/* 블러브 */}
            <div className="sb-bloom w-[400px] h-[400px] bg-[#F1AE8B] opacity-18 top-0 right-0" />
            <div className="sb-bloom w-[350px] h-[350px] bg-[#B5C39A] opacity-18 bottom-20 left-[-40px]" />

            <div className="max-w-[1440px] mx-auto px-6 pt-32 pb-24">
                {/* 헤더 */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div style={{ fontFamily: 'var(--font-script)', fontSize: 22, color: '#D87C7E', marginBottom: 4 }}>
                        color it your way
                    </div>
                    <h1 className="font-title font-bold text-4xl md:text-5xl text-[#4A3826] mb-4">
                        색칠도안
                    </h1>
                    <p className="font-body text-[#6E5942] text-lg">
                        인쇄해서 크레용으로, 또는 화면에서 바로 — 마음껏 칠해봐요.
                    </p>
                </motion.div>

                {/* 필터 패널 */}
                <div
                    className="mb-8 rounded-[28px] px-6 py-5 space-y-3"
                    style={{ background: '#FFFCF3', border: '1px solid rgba(155,120,70,0.16)', boxShadow: '0 2px 14px rgba(120,80,30,0.08)' }}
                >
                    {/* 캐릭터 필터 */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-body font-bold text-[#9A8569] w-10 flex-shrink-0">캐릭터</span>
                        <FilterChip active={activeChar === 'all'} onClick={() => setActiveChar('all')}>전체</FilterChip>
                        {characters.map(c => (
                            <FilterChip
                                key={c.slug}
                                active={activeChar === c.slug}
                                onClick={() => setActiveChar(c.slug)}
                                color={c.color}
                            >
                                {c.animalEmoji} <span className="hidden sm:inline">{c.name}</span>
                            </FilterChip>
                        ))}
                    </div>

                    <div className="h-px bg-[rgba(155,120,70,0.12)]" />

                    {/* 유형 + 연령 */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[11px] font-body font-bold text-[#9A8569] w-10 flex-shrink-0">유형</span>
                        <div className="flex flex-wrap gap-2">
                            {TYPE_TABS.map(t => (
                                <FilterChip
                                    key={t.value}
                                    active={activeType === t.value}
                                    onClick={() => setActiveType(t.value)}
                                    variant="coral"
                                >
                                    {t.emoji} {t.label}
                                </FilterChip>
                            ))}
                        </div>

                        <div className="hidden md:block h-4 w-px bg-[rgba(155,120,70,0.18)] mx-2" />

                        <span className="text-[11px] font-body font-bold text-[#9A8569] w-10 flex-shrink-0 md:hidden">연령</span>
                        <span className="text-[11px] font-body font-bold text-[#9A8569] hidden md:block flex-shrink-0">연령</span>
                        <div className="flex flex-wrap gap-2">
                            {AGE_TABS.map(a => (
                                <FilterChip
                                    key={a.value}
                                    active={activeAge === a.value}
                                    onClick={() => setActiveAge(a.value)}
                                    variant="sage"
                                >
                                    {a.label}
                                </FilterChip>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 카운트 & 리셋 */}
                <div className="flex items-center justify-between mb-6">
                    <span className="font-body text-sm text-[#9A8569]">
                        총 <b className="text-[#4A3826]">{filtered.length}</b>개의 도안
                    </span>
                    {hasFilter && (
                        <button
                            onClick={reset}
                            className="flex items-center gap-1.5 font-body font-bold text-xs text-[#E69282] hover:underline"
                        >
                            <RotateCcw size={12} /> 필터 초기화
                        </button>
                    )}
                </div>

                {/* 도안 그리드 */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeChar}-${activeType}-${activeAge}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                    >
                        {filtered.map((page, i) => (
                            <motion.div
                                key={page.slug}
                                initial={{ opacity: 0, scale: 0.93 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: Math.min(i * 0.04, 0.3) }}
                            >
                                <ColoringCard page={page} />
                            </motion.div>
                        ))}

                        {filtered.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <div className="text-5xl mb-4">🎨</div>
                                <p className="font-body text-[#9A8569]">찾으시는 도안이 없어요.</p>
                                <button onClick={reset} className="mt-4 font-body font-bold text-sm text-[#E69282] underline">
                                    필터 초기화하기
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function FilterChip({
    active, onClick, children, color, variant = 'default',
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    color?: string;
    variant?: 'default' | 'coral' | 'sage';
}) {
    const activeBg = color
        ? color
        : variant === 'coral'
            ? '#E69282'
            : variant === 'sage'
                ? '#B5C39A'
                : '#F1C667';

    const activeText = variant === 'default' ? '#4A3826' : '#FFFCF3';

    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-body font-bold transition-all",
                active ? "" : "bg-[#FBF1DC] text-[#6E5942] hover:bg-[#F7E8CC]"
            )}
            style={active ? { backgroundColor: activeBg, color: activeText } : undefined}
        >
            {children}
        </button>
    );
}
