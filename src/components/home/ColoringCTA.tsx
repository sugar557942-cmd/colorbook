"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ColoringCard from '@/components/shared/ColoringCard';
import { coloringPages } from '@/data/coloringPages';
import { ArrowRight, Palette, Download } from 'lucide-react';

const FEATURED_SLUGS = [
    'daon-basic', 'haru-friends', 'sori-rainbow', 'neuru-journey',
    'emotion-wheel', 'mandala-circle', 'color-red-courage', 'color-blue-calm',
];

const featuredPages = FEATURED_SLUGS
    .map(slug => coloringPages.find(p => p.slug === slug))
    .filter(Boolean) as typeof coloringPages;

const categories = [
    { label: '🐻 캐릭터', color: 'sb-chip-rose' },
    { label: '😊 감정 표현', color: 'sb-chip-sky' },
    { label: '🌸 만다라', color: 'sb-chip-lav' },
    { label: '🎨 색채치료', color: 'sb-chip-butter' },
];

export default function ColoringCTA() {
    return (
        <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(180deg, #F7E8CC 0%, #FBF1DC 100%)" }}>
            {/* 블러브 */}
            <div className="sb-bloom w-[400px] h-[400px] bg-[#F1AE8B] opacity-20 top-0 left-[10%]" />
            <div className="sb-bloom w-[300px] h-[300px] bg-[#B5C39A] opacity-20 bottom-20 right-[5%]" />

            <div className="max-w-[1200px] mx-auto px-6">
                {/* 헤더 */}
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <p className="font-body text-[#9A8569] text-sm font-bold tracking-wider uppercase mb-2">🎨 색칠공부</p>
                        <h2 className="font-title font-bold text-3xl md:text-4xl text-[#4A3826]">
                            지금 바로 색칠해 보세요!
                        </h2>
                        <p className="font-body text-[#6E5942] mt-2">웹에서 클릭 한 번으로 색칠하거나, 인쇄해서 크레용으로 즐겨요</p>
                    </div>
                    <Link
                        href="/coloring"
                        className="hidden sm:flex items-center gap-1.5 font-body font-bold text-sm text-[#E69282] hover:gap-2.5 transition-all"
                    >
                        전체 보기 <ArrowRight size={14} />
                    </Link>
                </div>

                {/* 카테고리 칩 */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {categories.map(c => (
                        <span key={c.label} className={`sb-chip ${c.color}`}>{c.label}</span>
                    ))}
                </div>

                {/* 도안 갤러리 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {featuredPages.map((page, i) => (
                        <motion.div
                            key={page.slug}
                            initial={{ opacity: 0, scale: 0.93 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                        >
                            <ColoringCard page={page} />
                        </motion.div>
                    ))}
                </div>

                {/* CTA 배너 */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-14 rounded-[36px] overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, #E89A82 0%, #D87C7E 50%, #C96A72 100%)",
                        boxShadow: "0 16px 48px -16px rgba(216,124,126,0.5), 0 4px 0 #B86560"
                    }}
                >
                    <div className="px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-white text-center md:text-left">
                            <h3 className="font-title font-bold text-2xl md:text-3xl mb-2">
                                무료 도안 — 지금 바로 다운로드!
                            </h3>
                            <p className="font-body opacity-90 text-base">
                                PDF로 출력하거나, 웹에서 색칠 후 저장하세요.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                            <Link
                                href="/coloring"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-title font-bold text-sm bg-white text-[#D87C7E] hover:-translate-y-0.5 transition-all"
                                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                            >
                                <Palette size={16} />
                                웹에서 색칠하기
                            </Link>
                            <Link
                                href="/coloring"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-title font-bold text-sm bg-white/20 text-white border border-white/40 hover:-translate-y-0.5 transition-all"
                            >
                                <Download size={16} />
                                도안 다운로드
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
