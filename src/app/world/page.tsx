"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingElements from '@/components/shared/FloatingElements';
import MagicButton from '@/components/shared/MagicButton';
import * as MapElements from '@/components/illustrations/MapElements';
import { characters } from '@/data/characters';
import { Search, Construction, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const locations = [
    { id: 'tree', name: '지혜의 큰 나무', x: '50%', y: '38%', component: MapElements.WisdomTree, char: 'daon', color: '#C4A77D' },
    { id: 'market', name: '두근시장', x: '22%', y: '28%', component: MapElements.Market, char: 'nari', color: '#FF8B4A' },
    { id: 'school', name: '배움터', x: '78%', y: '24%', component: MapElements.School, char: 'haru', color: '#8BC48A' },
    { id: 'workshop', name: '무지개공방', x: '16%', y: '68%', component: MapElements.Workshop, char: 'jiu', color: '#6B7FBF' },
    { id: 'farm', name: '나눔 텃밭', x: '46%', y: '78%', component: MapElements.Farm, char: 'sori', color: '#FF8B8B' },
    { id: 'plaza', name: '어울림 광장', x: '50%', y: '56%', component: MapElements.Plaza, char: undefined, color: '#FFD93D' },
    { id: 'pond', name: '고요한 연못', x: '80%', y: '73%', component: MapElements.Pond, char: 'neuru', color: '#7ECEC1' },
    { id: 'bridge', name: '용기의 다리', x: '84%', y: '48%', component: MapElements.Bridge, char: 'raon', color: '#FFD93D' },
];

const WorldPage = () => {
    const [selectedLoc, setSelectedLoc] = useState<typeof locations[0] | null>(null);
    const [showHint, setShowHint] = useState(false);

    return (
        <div className="relative min-h-screen overflow-hidden pt-20 pb-12">
            <FloatingElements density="low" elements={['cloud', 'leaf']} />

            {/* Sky background */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-b from-sky-100 via-blue-50 to-emerald-50" />

            <div className="max-w-[1440px] mx-auto px-4 md:px-8">

                {/* ── Construction Banner ── */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex items-center gap-3 bg-maeul-gold/15 border-2 border-maeul-gold/30 rounded-3xl px-6 py-4"
                >
                    <span className="text-2xl flex-shrink-0">🏗️</span>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-maeul-charcoal text-sm">
                            마음마을 지도는 현재 공사 중이에요!
                        </p>
                        <p className="text-maeul-soft-gray text-xs mt-0.5">
                            각 장소를 클릭해 미리 살짝 엿볼 수 있어요. 곧 이야기와 활동들이 가득 채워질 거예요 ✨
                        </p>
                    </div>
                    <div className="flex-shrink-0 hidden sm:flex gap-2">
                        <MagicButton href="/coloring" variant="secondary" size="sm">
                            색칠공부 하러 가기 🎨
                        </MagicButton>
                    </div>
                </motion.div>

                {/* Header row */}
                <div className="flex justify-between items-end mb-5">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-title text-maeul-charcoal mb-1">
                            마음마을 지도 🗺️
                        </h1>
                        <p className="text-maeul-soft-gray text-sm font-body italic">
                            친구들이 어디에 사는지 찾아보세요!
                        </p>
                    </div>
                    <button
                        onClick={() => setShowHint(!showHint)}
                        className={cn(
                            "flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm",
                            showHint
                                ? "bg-maeul-gold text-white"
                                : "bg-white text-maeul-gold border border-maeul-gold/30 hover:bg-maeul-gold/10"
                        )}
                    >
                        <Search size={16} />
                        친구들 찾기 {showHint ? '끄기' : '켜기'}
                    </button>
                </div>

                {/* Map Canvas */}
                <div className="relative rounded-[48px] border-4 border-white shadow-storybook overflow-hidden"
                    style={{ height: 'clamp(480px, 60vh, 700px)' }}
                >
                    {/* Map background layers */}
                    <div className="absolute inset-0 bg-gradient-to-b from-sky-200/60 via-emerald-100/40 to-green-200/60" />

                    {/* Ground texture bands */}
                    <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-emerald-200/50 to-transparent rounded-b-[44px]" />
                    <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-sky-300/30 to-transparent rounded-t-[44px]" />

                    {/* Decorative clouds */}
                    <div className="absolute top-[8%] left-[12%] w-20 h-8 bg-white/70 rounded-full blur-sm" />
                    <div className="absolute top-[6%] left-[14%] w-12 h-6 bg-white/80 rounded-full blur-sm" />
                    <div className="absolute top-[12%] right-[18%] w-24 h-8 bg-white/70 rounded-full blur-sm" />
                    <div className="absolute top-[10%] right-[20%] w-14 h-6 bg-white/80 rounded-full blur-sm" />

                    {/* Path lines (decorative) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 50% 56% Q 35% 47% 22% 28%" stroke="#C4A77D" strokeWidth="3" strokeDasharray="8,6" fill="none" />
                        <path d="M 50% 56% Q 64% 40% 78% 24%" stroke="#C4A77D" strokeWidth="3" strokeDasharray="8,6" fill="none" />
                        <path d="M 50% 56% Q 50% 47% 50% 38%" stroke="#C4A77D" strokeWidth="3" strokeDasharray="8,6" fill="none" />
                        <path d="M 50% 56% Q 33% 62% 16% 68%" stroke="#C4A77D" strokeWidth="3" strokeDasharray="8,6" fill="none" />
                        <path d="M 50% 56% Q 48% 67% 46% 78%" stroke="#C4A77D" strokeWidth="3" strokeDasharray="8,6" fill="none" />
                        <path d="M 50% 56% Q 65% 65% 80% 73%" stroke="#C4A77D" strokeWidth="3" strokeDasharray="8,6" fill="none" />
                        <path d="M 50% 56% Q 67% 52% 84% 48%" stroke="#C4A77D" strokeWidth="3" strokeDasharray="8,6" fill="none" />
                    </svg>

                    {/* Location Pins */}
                    {locations.map((loc, i) => (
                        <motion.div
                            key={loc.id}
                            initial={{ opacity: 0, scale: 0, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: i * 0.07, type: 'spring', stiffness: 260, damping: 20 }}
                            className="absolute"
                            style={{ top: loc.y, left: loc.x, transform: 'translate(-50%, -50%)', zIndex: 10 }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.15, zIndex: 50 }}
                                onClick={() => setSelectedLoc(loc)}
                                className="flex flex-col items-center gap-1.5 cursor-pointer group"
                            >
                                {/* Character hint tooltip */}
                                {showHint && loc.char && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="px-2.5 py-1 rounded-xl text-[10px] font-bold text-white shadow-md whitespace-nowrap"
                                        style={{ backgroundColor: loc.color }}
                                    >
                                        {characters.find(c => c.slug === loc.char)?.name} 여기 있어요!
                                        <div
                                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                                            style={{ backgroundColor: loc.color }}
                                        />
                                    </motion.div>
                                )}

                                {/* Icon container */}
                                <div
                                    className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-white/80 backdrop-blur-sm p-2 shadow-lg border-2 border-white group-hover:shadow-xl transition-shadow"
                                    style={{ borderColor: `${loc.color}40` }}
                                >
                                    <loc.component className="w-full h-full drop-shadow-sm" />
                                </div>

                                {/* Name label */}
                                <span
                                    className="px-2.5 py-0.5 bg-white/90 rounded-full text-[11px] font-bold text-maeul-charcoal shadow-sm border whitespace-nowrap"
                                    style={{ borderColor: `${loc.color}30` }}
                                >
                                    {loc.name}
                                </span>
                            </motion.div>
                        </motion.div>
                    ))}

                    {/* Location Detail Modal */}
                    <AnimatePresence>
                        {selectedLoc && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-maeul-charcoal/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
                                onClick={() => setSelectedLoc(null)}
                            >
                                <motion.div
                                    initial={{ scale: 0.92, y: 16 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0.92, y: 16 }}
                                    className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Header with color accent */}
                                    <div
                                        className="px-8 pt-8 pb-6 flex items-center gap-4"
                                        style={{ backgroundColor: `${selectedLoc.color}18` }}
                                    >
                                        <div
                                            className="w-20 h-20 rounded-2xl bg-white p-2 shadow-sm border-2 flex-shrink-0"
                                            style={{ borderColor: `${selectedLoc.color}40` }}
                                        >
                                            <selectedLoc.component className="w-full h-full" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-title text-maeul-charcoal">
                                                {selectedLoc.name}
                                            </h2>
                                            {selectedLoc.char && (
                                                <Link
                                                    href={`/characters/${selectedLoc.char}`}
                                                    className="flex items-center gap-1.5 mt-1 text-sm font-bold"
                                                    style={{ color: selectedLoc.color }}
                                                    onClick={() => setSelectedLoc(null)}
                                                >
                                                    {characters.find(c => c.slug === selectedLoc.char)?.animalEmoji}{' '}
                                                    {characters.find(c => c.slug === selectedLoc.char)?.name}의 공간
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="px-8 pb-8">
                                        <p className="text-maeul-soft-gray text-sm leading-relaxed mb-5 mt-4">
                                            {selectedLoc.char
                                                ? `${characters.find(c => c.slug === selectedLoc.char)?.name}이(가) 자주 찾는 곳이에요. `
                                                : ''}
                                            이곳에서 친구들이 함께 어울리며 다양한 이야기를 만들어간답니다.
                                        </p>

                                        {/* Coming soon notice */}
                                        <div className="flex items-start gap-3 bg-maeul-gold/10 rounded-2xl p-4 mb-5">
                                            <span className="text-xl flex-shrink-0">🏗️</span>
                                            <div>
                                                <p className="text-xs font-bold text-maeul-gold mb-0.5">준비 중</p>
                                                <p className="text-xs text-maeul-soft-gray">
                                                    이 장소의 이야기와 활동이 곧 추가될 예정이에요!
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <MagicButton href="/stories" size="sm" className="flex-1">
                                                동화책 읽기 📖
                                            </MagicButton>
                                            <button
                                                onClick={() => setSelectedLoc(null)}
                                                className="flex-1 py-3 rounded-2xl border-2 border-gray-100 text-maeul-soft-gray hover:text-maeul-charcoal font-bold text-sm transition-colors"
                                            >
                                                닫기
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Legend */}
                <div className="mt-5 flex flex-wrap justify-center gap-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-maeul-soft-gray">
                        <span className="w-3 h-3 rounded-full bg-maeul-gold" />
                        장소를 클릭해 보세요
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-maeul-soft-gray">
                        <span className="w-3 h-3 rounded-full bg-maeul-coral" />
                        친구 찾기 버튼으로 캐릭터 위치 확인
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-maeul-soft-gray">
                        <span className="w-3 h-3 rounded-full bg-maeul-leaf" />
                        총 {locations.length}개 장소 탐험 가능
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorldPage;
