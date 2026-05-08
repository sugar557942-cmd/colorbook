"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { stories } from '@/data/stories';
import { characters } from '@/data/characters';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function StoryPreview() {
    const featured = stories[0];
    const others = stories.slice(1, 4);
    const featChar = characters.find(c => c.slug === featured.mainCharacter);

    return (
        <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(180deg, #FBF1DC 0%, #F7E8CC 100%)" }}>
            {/* 블러브 */}
            <div className="sb-bloom w-[350px] h-[350px] bg-[#B7A5CE] opacity-20 top-20 left-[-60px]" />
            <div className="sb-bloom w-[300px] h-[300px] bg-[#F1C667] opacity-25 bottom-10 right-[-40px]" />

            <div className="max-w-[1200px] mx-auto px-6">
                {/* 헤더 */}
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <p className="font-body text-[#9A8569] text-sm font-bold tracking-wider uppercase mb-2">📖 동화책</p>
                        <h2 className="font-title font-bold text-3xl md:text-4xl text-[#4A3826]">
                            오늘은 어떤 이야기를 읽을까요?
                        </h2>
                        <p className="font-body text-[#6E5942] mt-2">마음마을 친구들의 이야기 속으로 들어가 보세요</p>
                    </div>
                    <Link
                        href="/stories"
                        className="hidden sm:flex items-center gap-1.5 font-body font-bold text-sm text-[#E69282] hover:gap-2.5 transition-all"
                    >
                        전체 보기 <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
                    {/* 피처드 스토리 */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="sb-card flex flex-col md:flex-row gap-8 items-center p-8"
                    >
                        {/* 책 표지 */}
                        <Link href={`/stories/${featured.slug}`} className="flex-shrink-0">
                            <motion.div
                                whileHover={{ rotateY: -12, rotateX: 3 }}
                                transition={{ type: "spring", stiffness: 120 }}
                                className="sb-book w-40 h-[213px] md:w-48 md:h-[256px] flex flex-col items-center justify-center p-5 text-center"
                                style={{ backgroundColor: featChar?.color || '#E69282' }}
                            >
                                <span className="text-5xl mb-3 drop-shadow-sm">{featChar?.animalEmoji}</span>
                                <p className="font-title text-white text-sm leading-snug drop-shadow-sm">{featured.title}</p>
                            </motion.div>
                        </Link>

                        {/* 정보 */}
                        <div className="flex-1">
                            <span className="sb-chip sb-chip-butter inline-flex mb-4">✨ 이달의 추천 이야기</span>
                            <h3 className="font-title font-bold text-2xl text-[#4A3826] mb-3">{featured.title}</h3>
                            <p className="font-body text-[#6E5942] leading-relaxed mb-5">{featured.summary}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {featured.educationTag.map(t => (
                                    <span key={t} className="sb-chip sb-chip-lav">{t}</span>
                                ))}
                            </div>
                            <Link
                                href={`/stories/${featured.slug}`}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-title font-bold text-sm text-white"
                                style={{
                                    background: "linear-gradient(180deg, #E89A82 0%, #D87C7E 100%)",
                                    boxShadow: "inset 0 -2px 0 rgba(120,50,50,0.18), 0 3px 0 #B86560, 0 8px 16px -6px rgba(216,124,126,0.5)"
                                }}
                            >
                                <BookOpen size={15} />
                                미리 읽어보기
                            </Link>
                        </div>
                    </motion.div>

                    {/* 다른 이야기들 */}
                    <div className="flex flex-col gap-4">
                        <p className="font-title font-bold text-base text-[#9A8569]">다른 이야기들도 있어요</p>
                        {others.map((s, i) => {
                            const c = characters.find(ch => ch.slug === s.mainCharacter);
                            return (
                                <motion.div
                                    key={s.slug}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link href={`/stories/${s.slug}`}>
                                        <motion.div
                                            whileHover={{ x: 4 }}
                                            className="flex items-center gap-4 p-4 rounded-2xl bg-[#FFFCF3] hover:bg-white transition-colors"
                                            style={{ boxShadow: "0 2px 10px rgba(120,80,30,0.07), inset 0 0 0 1px rgba(155,120,70,0.10)" }}
                                        >
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                                                style={{ background: c?.color || '#E69282', opacity: 0.9 }}
                                            >
                                                {c?.animalEmoji}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-title font-bold text-sm text-[#4A3826] line-clamp-1">{s.title}</p>
                                                <p className="font-body text-xs text-[#9A8569] mt-0.5 line-clamp-1">{s.educationTag.join(' · ')}</p>
                                            </div>
                                            <ArrowRight size={14} className="text-[#C2AC8E] flex-shrink-0 ml-auto" />
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="sb-divider mt-20 opacity-40" />
        </section>
    );
}
