"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/shared/SectionTitle';
import ColoringCard from '@/components/shared/ColoringCard';
import FloatingElements from '@/components/shared/FloatingElements';
import { coloringPages } from '@/data/coloringPages';
import { characters } from '@/data/characters';
import { staggerContainer, fadeInUp } from '@/styles/animations';
import { cn } from '@/lib/utils';

type TypeFilter = 'all' | 'character' | 'scene' | 'activity' | 'emotion' | 'mandala' | 'color-therapy';
type AgeFilter = 'all' | '3-5세' | '6-8세' | '9-12세' | '전연령';

const TYPE_TABS: { value: TypeFilter; label: string }[] = [
    { value: 'all', label: '전체' },
    { value: 'character', label: '캐릭터' },
    { value: 'scene', label: '장면' },
    { value: 'activity', label: '활동' },
    { value: 'emotion', label: '감정' },
    { value: 'mandala', label: '만다라' },
    { value: 'color-therapy', label: '색채치료' },
];

const AGE_TABS: { value: AgeFilter; label: string }[] = [
    { value: 'all', label: '전 연령' },
    { value: '3-5세', label: '3–5세' },
    { value: '6-8세', label: '6–8세' },
    { value: '9-12세', label: '9–12세' },
];

const ColoringListPage = () => {
    const [activeChar, setActiveChar] = useState<string>('all');
    const [activeType, setActiveType] = useState<TypeFilter>('all');
    const [activeAge, setActiveAge] = useState<AgeFilter>('all');

    const filteredPages = coloringPages.filter(page => {
        const charMatch = activeChar === 'all' || page.character === activeChar;
        const typeMatch = activeType === 'all' || page.type === activeType;
        const ageMatch =
            activeAge === 'all' ||
            page.ageRange === activeAge ||
            page.ageRange === '전연령';
        return charMatch && typeMatch && ageMatch;
    });

    return (
        <div className="relative min-h-screen py-24 px-4 md:px-8 bg-maeul-coral/5 overflow-hidden">
            <FloatingElements density="low" elements={['star', 'butterfly']} />

            <div className="max-w-[1440px] mx-auto">
                <SectionTitle
                    title="색칠공부"
                    subtitle="마음마을 친구들과 함께 마음껏 색칠해 보세요!"
                    decoration="hearts"
                />

                {/* Filter Bar */}
                <div className="mt-12 sticky top-20 z-30 bg-white/85 backdrop-blur-md rounded-3xl shadow-sm border border-gray-100 px-5 py-4 space-y-3">
                    {/* Character filter */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-gray-400 w-12 flex-shrink-0">캐릭터</span>
                        <FilterChip active={activeChar === 'all'} onClick={() => setActiveChar('all')}>
                            전체
                        </FilterChip>
                        {characters.map(char => (
                            <FilterChip
                                key={char.slug}
                                active={activeChar === char.slug}
                                onClick={() => setActiveChar(char.slug)}
                            >
                                <span>{char.animalEmoji}</span>
                                <span className="hidden sm:inline">{char.name}</span>
                            </FilterChip>
                        ))}
                        <FilterChip active={activeChar === 'all'} onClick={() => setActiveChar('all')} hidden>
                            전체
                        </FilterChip>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Type + Age filters */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-gray-400 w-12 flex-shrink-0">유형</span>
                            {TYPE_TABS.map(t => (
                                <FilterChip
                                    key={t.value}
                                    active={activeType === t.value}
                                    onClick={() => setActiveType(t.value)}
                                    variant="coral"
                                >
                                    {t.label}
                                </FilterChip>
                            ))}
                        </div>

                        <div className="hidden md:block h-4 w-px bg-gray-200" />

                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-gray-400 w-12 flex-shrink-0">연령</span>
                            {AGE_TABS.map(a => (
                                <FilterChip
                                    key={a.value}
                                    active={activeAge === a.value}
                                    onClick={() => setActiveAge(a.value)}
                                    variant="mint"
                                >
                                    {a.label}
                                </FilterChip>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Count + Reset */}
                <div className="mt-6 mb-4 flex items-center justify-between">
                    <span className="text-maeul-soft-gray text-sm font-body">
                        총 <b className="text-maeul-charcoal">{filteredPages.length}</b>개의 도안
                    </span>
                    {(activeChar !== 'all' || activeType !== 'all' || activeAge !== 'all') && (
                        <button
                            onClick={() => { setActiveChar('all'); setActiveType('all'); setActiveAge('all'); }}
                            className="text-xs text-maeul-coral hover:underline font-bold"
                        >
                            필터 초기화
                        </button>
                    )}
                </div>

                {/* Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeChar}-${activeType}-${activeAge}`}
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
                    >
                        {filteredPages.map((page) => (
                            <motion.div key={page.slug} variants={fadeInUp}>
                                <ColoringCard page={page} />
                            </motion.div>
                        ))}

                        {filteredPages.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <div className="text-5xl mb-4">🎨</div>
                                <div className="text-maeul-soft-gray font-body">찾으시는 도안이 없어요.</div>
                                <button
                                    onClick={() => { setActiveChar('all'); setActiveType('all'); setActiveAge('all'); }}
                                    className="mt-4 text-maeul-coral underline font-bold text-sm"
                                >
                                    필터 초기화하기
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

function FilterChip({
    active, onClick, children, variant = 'gold', hidden,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    variant?: 'gold' | 'coral' | 'mint';
    hidden?: boolean;
}) {
    const activeClass = {
        gold: 'bg-maeul-gold text-maeul-charcoal',
        coral: 'bg-maeul-coral text-white',
        mint: 'bg-maeul-mint text-white',
    }[variant];

    if (hidden) return null;

    return (
        <button
            onClick={onClick}
            className={cn(
                'flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all',
                active
                    ? activeClass
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            )}
        >
            {children}
        </button>
    );
}

export default ColoringListPage;
