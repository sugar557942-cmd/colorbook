"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { characters } from '@/data/characters';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const CARD_W = 200;
const GAP = 16;

export default function CharacterParade() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canL, setCanL] = useState(false);
    const [canR, setCanR] = useState(true);

    const update = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanL(el.scrollLeft > 8);
        setCanR(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('scroll', update, { passive: true });
        update();
        return () => el.removeEventListener('scroll', update);
    }, []);

    const scroll = (dir: 'left' | 'right') => {
        scrollRef.current?.scrollBy({ left: dir === 'left' ? -(CARD_W + GAP) * 2 : (CARD_W + GAP) * 2, behavior: 'smooth' });
    };

    return (
        <section className="relative py-24 sb-paper overflow-hidden">
            {/* 배경 블러브 */}
            <div className="sb-bloom w-[400px] h-[400px] bg-[#F1C667] opacity-25 top-10 right-[-80px]" />
            <div className="sb-bloom w-[300px] h-[300px] bg-[#E29AA2] opacity-20 bottom-10 left-[-60px]" />

            <div className="max-w-[1200px] mx-auto px-6">
                {/* 헤더 */}
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <p className="font-body text-[#9A8569] text-sm font-bold tracking-wider uppercase mb-2">👥 친구들</p>
                        <h2 className="font-title font-bold text-3xl md:text-4xl text-[#4A3826]">
                            마음마을 친구들을 만나 보세요!
                        </h2>
                        <p className="font-body text-[#6E5942] mt-2">저마다 다른 재능과 고민을 가진 일곱 친구들이에요</p>
                    </div>
                    <Link
                        href="/characters"
                        className="hidden sm:flex items-center gap-1.5 font-body font-bold text-sm text-[#E69282] hover:gap-2.5 transition-all"
                    >
                        전체 보기 <ArrowRight size={14} />
                    </Link>
                </div>

                {/* 캐러셀 */}
                <div className="relative">
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canL}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center bg-[#FFFCF3] rounded-full disabled:opacity-0 transition-opacity"
                        style={{ boxShadow: "0 2px 12px rgba(120,80,30,0.15), inset 0 0 0 1px rgba(155,120,70,0.15)" }}
                    >
                        <ChevronLeft size={16} className="text-[#4A3826]" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canR}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center bg-[#FFFCF3] rounded-full disabled:opacity-0 transition-opacity"
                        style={{ boxShadow: "0 2px 12px rgba(120,80,30,0.15), inset 0 0 0 1px rgba(155,120,70,0.15)" }}
                    >
                        <ChevronRight size={16} className="text-[#4A3826]" />
                    </button>

                    <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-[#FBF1DC] to-transparent pointer-events-none z-10" />
                    <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#FBF1DC] to-transparent pointer-events-none z-10" />

                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto px-6 pb-4 cursor-grab active:cursor-grabbing"
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {characters.map((char, i) => (
                            <motion.div
                                key={char.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className="flex-shrink-0 w-[180px] md:w-[200px]"
                            >
                                <Link href={`/characters/${char.slug}`}>
                                    <motion.div
                                        whileHover={{ y: -6 }}
                                        className="sb-card flex flex-col items-center text-center gap-3 py-6 cursor-pointer"
                                    >
                                        {/* 오브 */}
                                        <div
                                            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                                            style={{
                                                background: `radial-gradient(circle at 35% 30%, ${char.colorLight || char.color+'50'} 0%, ${char.color}BB 70%)`,
                                                boxShadow: `inset 0 -4px 12px rgba(0,0,0,0.07), inset 0 4px 10px rgba(255,255,255,0.4), 0 8px 16px -6px ${char.color}66`
                                            }}
                                        >
                                            {char.animalEmoji}
                                        </div>
                                        <div>
                                            <p className="font-title font-bold text-base text-[#4A3826]">{char.name}</p>
                                            <p className="font-body text-xs text-[#9A8569] mt-0.5">{char.animal} • {char.role}</p>
                                        </div>
                                        <p className="font-body text-xs text-[#6E5942] leading-relaxed px-2 italic">
                                            "{char.quote}"
                                        </p>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 text-center sm:hidden">
                    <Link
                        href="/characters"
                        className="inline-flex items-center gap-1.5 font-body font-bold text-sm text-[#E69282]"
                    >
                        전체 보기 <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            {/* 구분선 */}
            <div className="sb-divider mt-16 opacity-50" />
        </section>
    );
}
