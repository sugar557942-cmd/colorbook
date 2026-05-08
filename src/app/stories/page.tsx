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
    const featured = stories[0];
    const featuredChar = characters.find(c => c.slug === featured?.mainCharacter);

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
                    className="text-center mb-10"
                >
                    <div style={{ fontFamily: 'var(--font-script)', fontSize: 22, color: '#9D7FA9', marginBottom: 4 }}>
                        once upon a time…
                    </div>
                    <h1 className="font-title font-bold text-4xl md:text-5xl text-[#4A3826] mb-4">
                        마음마을 동화책
                    </h1>
                    <p className="font-body text-[#6E5942] text-lg">
                        친구들의 작은 이야기 일곱 권. 같이 읽어도, 혼자 읽어도 좋아요.
                    </p>
                </motion.div>

                {/* 필터 바 */}
                <div
                    className="mb-8 rounded-full px-6 py-4 flex flex-wrap gap-2 items-center"
                    style={{
                        background: '#FFFCF3',
                        border: '1px solid rgba(155,120,70,0.16)',
                        boxShadow: '0 2px 14px rgba(120,80,30,0.08)',
                    }}
                >
                    <span style={{ fontFamily: 'var(--font-hand)', fontSize: 16, color: '#9A8569', marginRight: 8 }}>
                        친구로 골라보기 ✿
                    </span>
                    <FilterBtn active={activeChar === 'all'} onClick={() => setActiveChar('all')}>
                        전체
                    </FilterBtn>
                    {characters.map(c => (
                        <FilterBtn
                            key={c.slug}
                            active={activeChar === c.slug}
                            onClick={() => setActiveChar(c.slug)}
                            color={c.colorLight}
                        >
                            {c.name}
                        </FilterBtn>
                    ))}
                </div>

                {/* 추천 featured card */}
                {activeChar === 'all' && featured && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-12 rounded-[36px] overflow-hidden relative"
                        style={{
                            background: 'linear-gradient(135deg, #FFFCF3 0%, #F8E7B5 100%)',
                            border: '1px solid rgba(155, 120, 70, 0.14)',
                            boxShadow: '0 4px 0 rgba(180,130,70,0.10), 0 18px 36px -18px rgba(120,80,30,0.20)',
                            padding: '40px 48px',
                        }}
                    >
                        <div className="sb-bloom absolute w-[300px] h-[300px] top-[-80px] left-[-80px]"
                            style={{ background: '#D87C7E', opacity: 0.18 }} />

                        <div className="grid gap-10 items-center" style={{ gridTemplateColumns: '1fr 1.4fr', position: 'relative' }}>
                            {/* Book cover */}
                            <div className="flex justify-center">
                                <div style={{ transform: 'rotate(-3deg)' }}>
                                    <BookCover char={featured.mainCharacter} title={featured.title} tag="이달의 추천" wide />
                                </div>
                            </div>

                            {/* Info */}
                            <div>
                                <div style={{ fontFamily: 'var(--font-script)', fontSize: 22, color: '#D87C7E', marginBottom: 4 }}>
                                    episode 0{featured.episode}
                                </div>
                                <h2 className="font-title font-bold text-[#4A3826] mb-4" style={{ fontSize: 'clamp(28px,3.5vw,42px)', lineHeight: 1.15 }}>
                                    {featured.title}
                                </h2>
                                <p className="font-body text-[#6E5942] leading-relaxed mb-5" style={{ fontSize: 16 }}>
                                    {featured.summary}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {featured.educationTag.map(t => (
                                        <span key={t} className="sb-chip sb-chip-lav">{t}</span>
                                    ))}
                                    <span className="sb-chip sb-chip-butter">{featured.difficulty}</span>
                                </div>
                                <div className="flex gap-3 flex-wrap">
                                    <Link
                                        href={`/stories/${featured.slug}`}
                                        className="sb-btn sb-btn-primary"
                                        style={{ fontSize: 14, padding: '10px 20px' }}
                                    >
                                        📖 동화 읽기
                                    </Link>
                                    <Link
                                        href="/coloring"
                                        className="sb-btn sb-btn-secondary"
                                        style={{ fontSize: 14, padding: '10px 20px' }}
                                    >
                                        🎨 함께 색칠
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 이야기 그리드 */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeChar}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* 책장 (전체 보기) */}
                        {activeChar === 'all' ? (
                            <div>
                                <div style={{ fontFamily: 'var(--font-hand)', fontSize: 20, color: '#6E5942', marginBottom: 16 }}>
                                    ✿ 모든 이야기 {stories.length}권
                                </div>
                                <div
                                    className="rounded-3xl p-10 relative"
                                    style={{
                                        background: 'linear-gradient(180deg, #F4E0C5 0%, #EFD9B0 100%)',
                                        border: '1px solid rgba(155, 120, 70, 0.16)',
                                        boxShadow: '0 2px 14px rgba(120,80,30,0.08)',
                                    }}
                                >
                                    <div className="flex gap-6 justify-center items-end flex-wrap">
                                        {stories.map((s, i) => (
                                            <motion.div
                                                key={s.slug}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="text-center"
                                                style={{ transform: `translateY(${(i % 2) * -6}px) rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
                                            >
                                                <Link href={`/stories/${s.slug}`}>
                                                    <motion.div whileHover={{ y: -8, scale: 1.05 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                                                        <BookCover char={s.mainCharacter} title={s.title} tag={`ep ${s.episode}`} />
                                                        <div className="font-title text-sm text-[#4A3826] mt-3 max-w-[130px]" style={{ lineHeight: 1.3 }}>
                                                            {s.title}
                                                        </div>
                                                        <div style={{ fontFamily: 'var(--font-hand)', fontSize: 12, color: '#9A8569', marginTop: 2 }}>
                                                            {s.difficulty}
                                                        </div>
                                                    </motion.div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                    {/* 책장 받침 */}
                                    <div className="mt-6 h-3 rounded-full"
                                        style={{ background: 'linear-gradient(180deg, #B07A55, #8E6748)', boxShadow: '0 2px 0 #6B4D2E' }} />
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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
                                                <motion.div whileHover={{ y: -8 }} className="group flex flex-col cursor-pointer">
                                                    <div
                                                        className="sb-book w-full aspect-[3/4] flex flex-col items-center justify-center p-5 text-center"
                                                        style={{ backgroundColor: char?.color || '#E69282' }}
                                                    >
                                                        <span className="text-5xl mb-3 drop-shadow">{char?.animalEmoji}</span>
                                                        <p className="font-title text-white text-sm leading-snug drop-shadow">{story.title}</p>
                                                        <p className="text-white/70 text-[10px] mt-2 font-body">ep.{story.episode}</p>
                                                    </div>
                                                    <div className="mt-3 px-1">
                                                        <p className="font-title font-bold text-sm text-[#4A3826] line-clamp-2 leading-snug">{story.title}</p>
                                                        <div className="flex flex-wrap gap-1 mt-1.5">
                                                            {story.educationTag.slice(0, 2).map(t => (
                                                                <span key={t} className="text-[10px] font-body font-bold px-2 py-0.5 rounded-full bg-[#DFD5EA] text-[#5E4878]">{t}</span>
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
                        className="sb-btn sb-btn-primary"
                        style={{ fontSize: 14, padding: '12px 24px' }}
                    >
                        <BookOpen size={16} />
                        추천 이야기 바로 읽기
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

/* ── Book Cover component ── */
const charColorMap: Record<string, string> = {
    daon: '#C9A87E', nari: '#E69470', haru: '#B6CB95',
    jiu: '#9CABCE', sori: '#E29AA2', neuru: '#9CC4B8', raon: '#ECC472',
};

function BookCover({ char, title, tag, wide }: { char: string; title: string; tag?: string; wide?: boolean }) {
    const bg = charColorMap[char] || '#C9A87E';
    const w = wide ? 220 : 130;
    return (
        <div className="sb-book" style={{ width: w, background: bg, display: 'inline-block' }}>
            <div style={{
                position: 'absolute', inset: 12,
                border: '1.5px solid rgba(255,252,243,0.5)', borderRadius: 6,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 10,
            }}>
                <div style={{ fontFamily: 'var(--font-script)', color: '#FFFCF3', opacity: 0.8, fontSize: 11, letterSpacing: '0.08em' }}>
                    {tag || '마음마을 이야기'}
                </div>
                <div style={{
                    fontFamily: 'var(--font-title)', fontWeight: 700,
                    color: '#FFFCF3', fontSize: w * 0.1, lineHeight: 1.25,
                    textShadow: '0 2px 0 rgba(0,0,0,0.12)',
                }}>
                    {title}
                </div>
            </div>
            {/* ribbon */}
            <div style={{
                position: 'absolute', top: 0, right: 12, width: 18, height: 32,
                background: '#D87C7E',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)',
                opacity: 0.92,
            }} />
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
                active ? "text-[#4A3826]" : "text-[#6E5942] hover:bg-[#F7E8CC]"
            )}
            style={{
                background: active ? (color || 'rgba(244,214,124,0.5)') : 'var(--paper-soft)',
                border: `1px solid ${active ? 'rgba(155,120,70,0.25)' : 'transparent'}`,
            }}
        >
            {children}
        </button>
    );
}
