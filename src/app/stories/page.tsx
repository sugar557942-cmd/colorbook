"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { stories } from '@/data/stories';
import { characters } from '@/data/characters';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';

export default function StoriesListPage() {
    const [activeChar, setActiveChar] = useState<string>('all');

    const filtered = stories.filter(s => activeChar === 'all' || s.mainCharacter === activeChar);

    return (
        <div className="relative min-h-screen sb-paper overflow-hidden">
            {/* 블러브 */}
            <div className="sb-bloom w-[450px] h-[450px] bg-[#B7A5CE] opacity-20 top-[-60px] left-[-60px]" />
            <div className="sb-bloom w-[350px] h-[350px] bg-[#F1C667] opacity-20 bottom-20 right-[-40px]" />

            <div className="max-w-[1200px] mx-auto px-6 pt-32 pb-24">
                {/* 헤더 */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <p className="font-body text-[#9A8569] text-sm font-bold tracking-wider uppercase mb-3">📖 동화책</p>
                    <h1 className="font-title font-bold text-4xl md:text-5xl text-[#4A3826] mb-4">
                        마음마을 동화책
                    </h1>
                    <p className="font-body text-[#6E5942] text-lg">
                        친구들의 이야기를 통해 지혜와 용기를 배워요
                    </p>
                </motion.div>

                {/* 필터 바 */}
                <div
                    className="sticky top-[68px] z-30 mb-8 rounded-2xl px-5 py-4 flex flex-wrap gap-2 items-center"
                    style={{ background: "rgba(251,241,220,0.92)", backdropFilter: "blur(12px)", boxShadow: "0 2px 16px rgba(120,80,30,0.10), inset 0 0 0 1px rgba(155,120,70,0.13)" }}
                >
                    <FilterBtn active={activeChar === 'all'} onClick={() => setActiveChar('all')}>
                        전체
                    </FilterBtn>
                    {characters.map(c => (
                        <FilterBtn
                            key={c.slug}
                            active={activeChar === c.slug}
                            onClick={() => setActiveChar(c.slug)}
                            color={c.color}
                        >
                            {c.animalEmoji} {c.name}
                        </FilterBtn>
                    ))}
                </div>

                {/* 이야기 그리드 — 책장 스타일 */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeChar}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
                    >
                        {filtered.map((story, i) => {
                            const char = characters.find(c => c.slug === story.mainCharacter);
                            return (
                                <motion.div
                                    key={story.slug}
                                    initial={{ opacity: 0, scale: 0.92 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.06 }}
                                >
                                    <Link href={`/stories/${story.slug}`}>
                                        <motion.div
                                            whileHover={{ y: -8 }}
                                            className="group flex flex-col cursor-pointer"
                                        >
                                            {/* 책 표지 */}
                                            <div
                                                className="sb-book w-full aspect-[3/4] flex flex-col items-center justify-center p-5 text-center"
                                                style={{ backgroundColor: char?.color || '#E69282' }}
                                            >
                                                <span className="text-5xl mb-3 drop-shadow">{char?.animalEmoji}</span>
                                                <p className="font-title text-white text-sm leading-snug drop-shadow">
                                                    {story.title}
                                                </p>
                                                <p className="text-white/70 text-[10px] mt-2 font-body">ep.{story.episode}</p>
                                            </div>

                                            {/* 책 정보 */}
                                            <div className="mt-3 px-1">
                                                <p className="font-title font-bold text-sm text-[#4A3826] line-clamp-2 leading-snug">
                                                    {story.title}
                                                </p>
                                                <div className="flex flex-wrap gap-1 mt-1.5">
                                                    {story.educationTag.slice(0, 2).map(t => (
                                                        <span key={t} className="text-[10px] font-body font-bold px-2 py-0.5 rounded-full bg-[#DFD5EA] text-[#5E4878]">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            );
                        })}

                        {filtered.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <div className="text-4xl mb-4">📖</div>
                                <p className="font-body text-[#9A8569]">이야기가 곧 도착할 예정이에요!</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 sb-card text-center py-12"
                >
                    <div className="text-4xl mb-4">✨</div>
                    <h3 className="font-title font-bold text-xl text-[#4A3826] mb-3">어떤 이야기를 먼저 읽을지 고민되나요?</h3>
                    <p className="font-body text-[#6E5942] text-sm mb-6 max-w-md mx-auto">
                        처음 방문하셨다면 '다온이의 마음 날씨' 이야기를 추천드려요!
                    </p>
                    <Link
                        href="/stories/daon-weather"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-title font-bold text-sm text-white"
                        style={{
                            background: "linear-gradient(180deg, #E89A82 0%, #D87C7E 100%)",
                            boxShadow: "inset 0 -2px 0 rgba(120,50,50,0.18), 0 3px 0 #B86560, 0 8px 16px -6px rgba(216,124,126,0.5)"
                        }}
                    >
                        <BookOpen size={16} />
                        추천 이야기 바로 읽기
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

function FilterBtn({
    active, onClick, children, color,
}: { active: boolean; onClick: () => void; children: React.ReactNode; color?: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-body font-bold transition-all",
                active
                    ? "text-white"
                    : "text-[#6E5942] bg-[#FBF1DC] hover:bg-[#F7E8CC]"
            )}
            style={active ? { backgroundColor: color || '#E69282' } : undefined}
        >
            {children}
        </button>
    );
}
