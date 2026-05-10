"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { storybooks } from '@/data/storybooks';
import { characters } from '@/data/characters';
import { cn } from '@/lib/utils';
import { BookOpen, Sparkles } from 'lucide-react';

export default function StoriesListPage() {
    const [activeChar, setActiveChar] = useState<string>('all');

    const filtered = activeChar === 'all'
        ? storybooks
        : storybooks.filter(s => s.characterSlug === activeChar);

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
                        진짜 책처럼 펼쳐 읽는 일곱 친구의 이야기
                    </p>
                    <p className="font-body text-[#9A8569] text-sm mt-2"
                        style={{ fontFamily: 'var(--font-hand)' }}>
                        12장면 × 7권 = 84개의 따뜻한 장면이 기다리고 있어요 🌸
                    </p>
                </motion.div>

                {/* 필터 바 */}
                <div
                    className="mb-12 rounded-full px-6 py-4 flex flex-wrap gap-2 items-center mx-auto w-fit max-w-full"
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
                    {characters.map(c => {
                        const hasStory = storybooks.some(s => s.characterSlug === c.slug);
                        if (!hasStory) return null;
                        return (
                            <FilterBtn
                                key={c.slug}
                                active={activeChar === c.slug}
                                onClick={() => setActiveChar(c.slug)}
                                color={c.colorLight}
                            >
                                {c.animalEmoji} {c.name}
                            </FilterBtn>
                        );
                    })}
                </div>

                {/* ── 책장 — 스토리북 카드 그리드 ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeChar}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {activeChar === 'all' ? (
                            <BookshelfView storybooks={filtered} />
                        ) : (
                            <SingleStoryView storybooks={filtered} />
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
                    <h3 className="font-title font-bold text-xl text-[#4A3826] mb-3">
                        어떤 이야기를 먼저 읽을지 고민되나요?
                    </h3>
                    <p className="font-body text-[#6E5942] text-sm mb-6 max-w-md mx-auto">
                        처음 방문하셨다면 '다온이의 마음 날씨'를 추천드려요!
                    </p>
                    <Link
                        href="/stories/daon"
                        className="sb-btn sb-btn-primary inline-flex items-center gap-2"
                        style={{ fontSize: 14, padding: '12px 24px' }}
                    >
                        <BookOpen size={16} />
                        추천 이야기 펼쳐보기
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

/* ════════════════════════════════════════════════════
   책장 뷰 — 7권 일렬 진열
════════════════════════════════════════════════════ */
function BookshelfView({ storybooks: books }: { storybooks: typeof storybooks }) {
    return (
        <div>
            <div style={{ fontFamily: 'var(--font-hand)', fontSize: 20, color: '#6E5942', marginBottom: 16, textAlign: 'center' }}>
                ✿ 마음마을 도서관에 오신 걸 환영해요
            </div>
            <div
                className="rounded-3xl p-10 relative"
                style={{
                    background: 'linear-gradient(180deg, #F4E0C5 0%, #EFD9B0 100%)',
                    border: '1px solid rgba(155, 120, 70, 0.16)',
                    boxShadow: '0 2px 14px rgba(120,80,30,0.08)',
                }}
            >
                <div className="flex gap-5 justify-center items-end flex-wrap">
                    {books.map((s, i) => (
                        <motion.div
                            key={s.characterSlug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="text-center"
                            style={{ transform: `translateY(${(i % 2) * -8}px) rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}
                        >
                            <Link href={`/stories/${s.characterSlug}`}>
                                <motion.div whileHover={{ y: -10, scale: 1.05, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                                    <SpineBook storybook={s} />
                                    <div className="font-title font-bold text-sm text-[#4A3826] mt-3 max-w-[140px] mx-auto" style={{ lineHeight: 1.35 }}>
                                        {s.title}
                                    </div>
                                    <div style={{ fontFamily: 'var(--font-hand)', fontSize: 12, color: '#9A8569', marginTop: 4 }}>
                                        {s.theme.split(' · ')[0]}
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
                {/* 책장 받침 */}
                <div className="mt-8 h-4 rounded-full"
                    style={{ background: 'linear-gradient(180deg, #B07A55, #8E6748)', boxShadow: '0 3px 0 #6B4D2E' }} />
            </div>
        </div>
    );
}

/* ════════════════════════════════════════════════════
   단일 캐릭터 뷰 — 큰 카드
════════════════════════════════════════════════════ */
function SingleStoryView({ storybooks: books }: { storybooks: typeof storybooks }) {
    if (books.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="text-4xl mb-4">📖</div>
                <p className="font-body text-[#9A8569]">이 친구의 이야기는 곧 도착할 예정이에요!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[920px] mx-auto">
            {books.map((s, i) => (
                <motion.div
                    key={s.characterSlug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                >
                    <Link href={`/stories/${s.characterSlug}`}>
                        <motion.div
                            whileHover={{ y: -8 }}
                            className="rounded-[28px] overflow-hidden cursor-pointer"
                            style={{
                                background: '#FFFCF3',
                                border: '1px solid rgba(155,120,70,0.14)',
                                boxShadow: '0 4px 0 rgba(180,130,70,0.10), 0 18px 36px -18px rgba(120,80,30,0.20)',
                            }}
                        >
                            {/* 표지 */}
                            <div
                                className="relative aspect-[3/4] flex flex-col items-center justify-center p-6 text-center"
                                style={{
                                    background: `linear-gradient(135deg, ${s.coverColor} 0%, ${shade(s.coverColor, -0.25)} 100%)`,
                                }}
                            >
                                <div className="absolute top-4 right-4 text-white/40 text-xl">✦</div>
                                <div className="absolute bottom-4 left-4 text-white/40 text-base">✦</div>

                                <div className="rounded-full flex items-center justify-center mb-4"
                                    style={{
                                        width: 96, height: 96,
                                        background: 'rgba(255,255,255,0.18)',
                                        boxShadow: 'inset 0 -6px 14px rgba(0,0,0,0.15), inset 0 4px 12px rgba(255,255,255,0.4)',
                                        fontSize: 52,
                                    }}>
                                    {s.coverEmoji}
                                </div>
                                <p style={{ fontFamily: 'var(--font-script)', fontSize: 14, color: 'rgba(255,252,243,0.85)', marginBottom: 6 }}>
                                    a maeul-maeul story
                                </p>
                                <h3 className="font-title font-bold text-white drop-shadow"
                                    style={{ fontSize: 22, lineHeight: 1.25, textShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                                    {s.title}
                                </h3>
                                {s.subtitle && (
                                    <p className="text-white/85 text-xs mt-2"
                                        style={{ fontFamily: 'var(--font-hand)' }}>
                                        {s.subtitle}
                                    </p>
                                )}
                            </div>
                            {/* 정보 */}
                            <div className="p-5">
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {s.theme.split(' · ').map(t => (
                                        <span key={t}
                                            className="text-[10px] font-body font-bold px-2 py-0.5 rounded-full"
                                            style={{ background: `${s.coverColor}22`, color: shade(s.coverColor, -0.4) }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <p className="font-body text-[#6E5942] text-sm leading-relaxed line-clamp-3">
                                    {s.description}
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="font-body text-[10px] text-[#9A8569]">
                                        {s.pages.length}장면 · 약 5분
                                    </span>
                                    <span className="font-body text-xs font-bold flex items-center gap-1" style={{ color: s.coverColor }}>
                                        펼쳐보기 <Sparkles size={11} />
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}

/* ════════════════════════════════════════════════════
   책 등 (책장에 꽂힌 모습)
════════════════════════════════════════════════════ */
function SpineBook({ storybook }: { storybook: typeof storybooks[number] }) {
    const w = 120;
    return (
        <div className="relative inline-block"
            style={{
                width: w,
                aspectRatio: '3/4',
                background: `linear-gradient(135deg, ${storybook.coverColor} 0%, ${shade(storybook.coverColor, -0.3)} 100%)`,
                borderRadius: '4px 12px 12px 4px',
                boxShadow:
                    '0 6px 14px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.3)',
                overflow: 'hidden',
            }}>
            {/* 책등 라인 */}
            <div style={{
                position: 'absolute', top: 0, bottom: 0, left: 6,
                width: 4,
                background: 'linear-gradient(90deg, rgba(0,0,0,0.4), transparent)',
            }} />
            {/* 안쪽 테두리 */}
            <div style={{
                position: 'absolute', inset: 12,
                border: '1.5px solid rgba(255,255,255,0.4)',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 8px',
            }}>
                <div style={{
                    fontFamily: 'var(--font-script)',
                    fontSize: 10, color: 'rgba(255,252,243,0.85)',
                    letterSpacing: '0.05em',
                }}>
                    maeul story
                </div>
                <div style={{ fontSize: 36 }}>{storybook.coverEmoji}</div>
                <div style={{
                    fontFamily: 'var(--font-title)', fontWeight: 700,
                    color: '#FFFCF3', fontSize: 11,
                    textShadow: '0 1px 0 rgba(0,0,0,0.18)',
                    textAlign: 'center', lineHeight: 1.2,
                    padding: '0 4px',
                }}>
                    {storybook.title.split(' ')[0]}
                </div>
            </div>
            {/* 책갈피 리본 */}
            <div style={{
                position: 'absolute', top: 0, right: 16, width: 12, height: 24,
                background: '#D87C7E',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)',
                opacity: 0.92,
            }} />
        </div>
    );
}

/* ════════════════════════════════════════════════════
   필터 버튼
════════════════════════════════════════════════════ */
function FilterBtn({
    active, onClick, children, color,
}: {
    active: boolean; onClick: () => void; children: React.ReactNode; color?: string;
}) {
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

/* ── 색상 어둡게/밝게 유틸 ── */
function shade(hex: string, amount: number): string {
    const h = hex.replace('#', '');
    const num = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    r = Math.min(255, Math.max(0, r + Math.round(255 * amount)));
    g = Math.min(255, Math.max(0, g + Math.round(255 * amount)));
    b = Math.min(255, Math.max(0, b + Math.round(255 * amount)));
    return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;
}
