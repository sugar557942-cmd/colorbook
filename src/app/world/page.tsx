"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingElements from '@/components/shared/FloatingElements';
import MagicButton from '@/components/shared/MagicButton';
import * as MapElements from '@/components/illustrations/MapElements';
import { characters } from '@/data/characters';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const locations = [
    { id: 'tree',     name: '지혜의 큰 나무', x: '50%', y: '38%', component: MapElements.WisdomTree, char: 'daon',  color: '#C4A77D' },
    { id: 'market',   name: '두근시장',       x: '22%', y: '28%', component: MapElements.Market,     char: 'nari',  color: '#FF8B4A' },
    { id: 'school',   name: '배움터',         x: '78%', y: '24%', component: MapElements.School,     char: 'haru',  color: '#8BC48A' },
    { id: 'workshop', name: '무지개공방',     x: '16%', y: '68%', component: MapElements.Workshop,   char: 'jiu',   color: '#6B7FBF' },
    { id: 'farm',     name: '나눔 텃밭',      x: '46%', y: '78%', component: MapElements.Farm,       char: 'sori',  color: '#FF8B8B' },
    { id: 'plaza',    name: '어울림 광장',    x: '50%', y: '56%', component: MapElements.Plaza,      char: undefined, color: '#FFD93D' },
    { id: 'pond',     name: '고요한 연못',    x: '80%', y: '73%', component: MapElements.Pond,       char: 'neuru', color: '#7ECEC1' },
    { id: 'bridge',   name: '용기의 다리',    x: '84%', y: '48%', component: MapElements.Bridge,     char: 'raon',  color: '#FFD93D' },
];

/* ── Compass rose drawn with pure SVG ── */
const CompassRose = () => (
    <svg viewBox="0 0 80 80" width="72" height="72" aria-hidden="true">
        {/* outer / inner guide rings */}
        <circle cx="40" cy="40" r="36" fill="rgba(255,255,255,0.55)" stroke="#C4A77D" strokeWidth="1.2" />
        <circle cx="40" cy="40" r="26" fill="none" stroke="#C4A77D" strokeWidth="0.6" opacity="0.4" />
        {/* N (dark gold) */}
        <polygon points="40,5 37,35 40,30 43,35" fill="#8B6914" />
        {/* S / E / W (muted) */}
        <polygon points="40,75 37,45 40,50 43,45" fill="#C4A77D" opacity="0.55" />
        <polygon points="75,40 45,37 50,40 45,43" fill="#C4A77D" opacity="0.55" />
        <polygon points="5,40 35,37 30,40 35,43"  fill="#C4A77D" opacity="0.55" />
        {/* hub */}
        <circle cx="40" cy="40" r="5.5" fill="white" stroke="#C4A77D" strokeWidth="1.4" />
        <circle cx="40" cy="40" r="2.5" fill="#8B6914" />
        {/* labels */}
        <text x="40" y="3.5" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#8B6914" fontFamily="Georgia,serif">N</text>
        <text x="40" y="79" textAnchor="middle" fontSize="7"              fill="#C4A77D" fontFamily="Georgia,serif">S</text>
        <text x="79" y="44" textAnchor="middle" fontSize="7"              fill="#C4A77D" fontFamily="Georgia,serif">E</text>
        <text x="1"  y="44" textAnchor="middle" fontSize="7"              fill="#C4A77D" fontFamily="Georgia,serif">W</text>
    </svg>
);

const WorldPage = () => {
    const [selectedLoc, setSelectedLoc] = useState<typeof locations[0] | null>(null);
    const [showHint, setShowHint]       = useState(false);

    return (
        <div className="relative min-h-screen overflow-hidden pt-20 pb-12">
            <FloatingElements density="low" elements={['cloud', 'leaf']} />

            {/* Sky-to-meadow gradient background */}
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
                        <p className="font-bold text-maeul-charcoal text-sm">마음마을 지도는 현재 공사 중이에요!</p>
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

                {/* ── Map Canvas ── */}
                <div
                    className="relative rounded-[48px] border-4 border-white shadow-storybook overflow-hidden"
                    style={{ height: 'clamp(480px, 62vh, 720px)' }}
                >
                    {/* Multi-layer map background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-200/70 via-emerald-100/50 to-green-200/70" />

                    {/* Parchment texture overlay */}
                    <div className="absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(139,105,20,0.5) 24px, rgba(139,105,20,0.5) 25px),
                                             repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(139,105,20,0.5) 24px, rgba(139,105,20,0.5) 25px)`
                        }}
                    />

                    {/* Sky band */}
                    <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-sky-300/40 to-transparent" />
                    {/* Ground band */}
                    <div className="absolute bottom-0 left-0 right-0 h-[38%] bg-gradient-to-t from-green-300/35 to-transparent rounded-b-[44px]" />

                    {/* Decorative clouds */}
                    <div className="absolute top-[7%]  left-[10%] flex gap-0">
                        <div className="w-20 h-7 bg-white/75 rounded-full blur-[3px]" />
                        <div className="w-12 h-6 bg-white/80 rounded-full blur-[2px] -ml-4 -mt-1" />
                    </div>
                    <div className="absolute top-[5%] right-[15%] flex gap-0">
                        <div className="w-24 h-7 bg-white/75 rounded-full blur-[3px]" />
                        <div className="w-14 h-5 bg-white/80 rounded-full blur-[2px] -ml-5 -mt-0.5" />
                    </div>
                    <div className="absolute top-[15%] left-[38%]">
                        <div className="w-16 h-5 bg-white/60 rounded-full blur-[2px]" />
                    </div>

                    {/* ── Path lines ──
                        SVG uses viewBox="0 0 100 100" preserveAspectRatio="none" so numeric
                        coordinates map 1-to-1 with the location percentage values above.
                        (% is invalid inside SVG <path d="..."> — only numeric values work)      */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        {/* All roads radiate from 어울림 광장 (50, 56) */}
                        {/* → 두근시장 (22, 28) */}
                        <path d="M 50 56 Q 35 47 22 28" stroke="#C4A77D" strokeWidth="0.35" strokeDasharray="1.5 1"   fill="none" opacity="0.55" />
                        {/* → 배움터 (78, 24) */}
                        <path d="M 50 56 Q 64 40 78 24" stroke="#C4A77D" strokeWidth="0.35" strokeDasharray="1.5 1"   fill="none" opacity="0.55" />
                        {/* → 지혜의 큰 나무 (50, 38) */}
                        <path d="M 50 56 Q 50 47 50 38"  stroke="#C4A77D" strokeWidth="0.35" strokeDasharray="1.5 1"   fill="none" opacity="0.55" />
                        {/* → 무지개공방 (16, 68) */}
                        <path d="M 50 56 Q 33 62 16 68"  stroke="#C4A77D" strokeWidth="0.35" strokeDasharray="1.5 1"   fill="none" opacity="0.55" />
                        {/* → 나눔 텃밭 (46, 78) */}
                        <path d="M 50 56 Q 48 67 46 78"  stroke="#C4A77D" strokeWidth="0.35" strokeDasharray="1.5 1"   fill="none" opacity="0.55" />
                        {/* → 고요한 연못 (80, 73) */}
                        <path d="M 50 56 Q 65 65 80 73"  stroke="#C4A77D" strokeWidth="0.35" strokeDasharray="1.5 1"   fill="none" opacity="0.55" />
                        {/* → 용기의 다리 (84, 48) */}
                        <path d="M 50 56 Q 67 52 84 48"  stroke="#C4A77D" strokeWidth="0.35" strokeDasharray="1.5 1"   fill="none" opacity="0.55" />
                    </svg>

                    {/* ── Compass Rose (bottom-left corner) ── */}
                    <div className="absolute bottom-5 left-6 z-20 drop-shadow-md">
                        <CompassRose />
                    </div>

                    {/* ── Scale bar (bottom-right) ── */}
                    <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end gap-1 opacity-60">
                        <div className="flex items-center gap-1">
                            <div className="h-[2px] w-12 bg-maeul-charcoal/50" />
                            <span className="text-[9px] font-bold text-maeul-charcoal/60 tracking-wide">100m</span>
                        </div>
                        <span className="text-[8px] text-maeul-charcoal/40 italic">마음마을 지도</span>
                    </div>

                    {/* ── Location Pins ── */}
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
                                whileHover={{ scale: 1.18, zIndex: 50 }}
                                onClick={() => setSelectedLoc(loc)}
                                className="flex flex-col items-center gap-1.5 cursor-pointer group"
                            >
                                {/* Character hint tooltip */}
                                {showHint && loc.char && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="relative px-2.5 py-1 rounded-xl text-[10px] font-bold text-white shadow-md whitespace-nowrap"
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
                                    className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-white/85 backdrop-blur-sm p-2 shadow-lg border-2 border-white group-hover:shadow-xl transition-shadow"
                                    style={{ borderColor: `${loc.color}55` }}
                                >
                                    <loc.component className="w-full h-full drop-shadow-sm" />
                                </div>

                                {/* Name label */}
                                <span
                                    className="px-2.5 py-0.5 bg-white/92 rounded-full text-[10px] md:text-[11px] font-bold text-maeul-charcoal shadow-sm border whitespace-nowrap"
                                    style={{ borderColor: `${loc.color}40` }}
                                >
                                    {loc.name}
                                </span>
                            </motion.div>
                        </motion.div>
                    ))}

                    {/* ── Location Detail Modal ── */}
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
                                    {/* Header */}
                                    <div
                                        className="px-8 pt-8 pb-6 flex items-center gap-4"
                                        style={{ backgroundColor: `${selectedLoc.color}18` }}
                                    >
                                        <div
                                            className="w-20 h-20 rounded-2xl bg-white p-2 shadow-sm border-2 flex-shrink-0"
                                            style={{ borderColor: `${selectedLoc.color}50` }}
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
