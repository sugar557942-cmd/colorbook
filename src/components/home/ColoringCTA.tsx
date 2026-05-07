"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionTitle from '@/components/shared/SectionTitle';
import ColoringCard from '@/components/shared/ColoringCard';
import MagicButton from '@/components/shared/MagicButton';
import CloudDivider from '@/components/shared/CloudDivider';
import { coloringPages } from '@/data/coloringPages';
import { ArrowRight } from 'lucide-react';

// 홈에 노출할 큐레이션 8선 — 카테고리를 골고루
const FEATURED_SLUGS = [
    'daon-basic',        // 캐릭터 / 초급
    'haru-friends',      // 캐릭터 / 초급
    'sori-rainbow',      // 캐릭터 / 초급
    'neuru-journey',     // 캐릭터 / 초급
    'emotion-wheel',     // 감정 / 중급
    'mandala-circle',    // 만다라 / 중급
    'color-red-courage', // 색채치료
    'color-blue-calm',   // 색채치료
];

const featuredPages = FEATURED_SLUGS
    .map(slug => coloringPages.find(p => p.slug === slug))
    .filter(Boolean) as typeof coloringPages;

const ColoringCTA = () => {
    return (
        <section className="relative py-24 bg-maeul-coral/5 overflow-hidden">
            <CloudDivider
                variant="wave"
                color="#FEF2F2"
                flip
                className="absolute top-0 left-0 w-full -translate-y-full"
            />

            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <SectionTitle
                    title="지금 바로 색칠해 보세요!"
                    subtitle="웹에서 클릭 한 번으로 색칠하거나, 인쇄해서 크레용으로 즐겨요"
                    decoration="hearts"
                />

                {/* 카테고리 뱃지 */}
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {[
                        { label: '🐻 캐릭터', color: 'bg-orange-100 text-orange-600' },
                        { label: '😊 감정 표현', color: 'bg-pink-100 text-pink-600' },
                        { label: '🌸 만다라', color: 'bg-purple-100 text-purple-600' },
                        { label: '🎨 색채치료', color: 'bg-yellow-100 text-yellow-600' },
                    ].map(b => (
                        <span key={b.label} className={`px-4 py-1.5 rounded-full text-sm font-bold ${b.color}`}>
                            {b.label}
                        </span>
                    ))}
                </div>

                {/* 큐레이션 갤러리 */}
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                    {featuredPages.map((page, i) => (
                        <motion.div
                            key={page.slug}
                            initial={{ opacity: 0, scale: 0.92 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                        >
                            <ColoringCard page={page} />
                        </motion.div>
                    ))}
                </div>

                {/* 더 보기 링크 */}
                <div className="mt-8 text-center">
                    <Link
                        href="/coloring"
                        className="inline-flex items-center gap-2 text-maeul-coral font-bold hover:gap-3 transition-all text-sm"
                    >
                        도안 25개 전체 보기 <ArrowRight size={16} />
                    </Link>
                </div>

                {/* CTA 배너 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-gradient-to-r from-maeul-gold to-maeul-coral p-8 md:p-12 rounded-[40px] text-center text-white shadow-storybook"
                >
                    <h3 className="text-2xl md:text-3xl font-title mb-3">
                        무료 도안 25개 — 지금 바로 다운로드!
                    </h3>
                    <p className="text-base md:text-lg opacity-90 mb-8 font-body">
                        PDF로 출력하거나, 웹에서 색칠 후 저장할 수 있어요.
                    </p>
                    <MagicButton href="/coloring" variant="secondary" size="lg" className="!bg-white !text-maeul-coral">
                        🎨 전체 도안 보러 가기
                    </MagicButton>
                </motion.div>
            </div>
        </section>
    );
};

export default ColoringCTA;
