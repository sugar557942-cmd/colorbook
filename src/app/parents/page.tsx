"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { articles as allArticles } from '@/data/articles';

/* 메인 카드 데이터 — data/articles.ts에서 자동 매핑 */
const articles = allArticles.map(a => ({
    slug: a.slug,
    tag: a.category,
    title: a.title,
    tone: a.tone,
    summary: a.summary,
    time: a.readingTime,
}));

const faqs = [
    {
        q: '콘텐츠는 유료인가요?',
        a: '마음마을의 기본 동화와 색칠 도안은 모두 무료예요. 아이들의 정서 성장을 돕는 것이 가장 큰 목표이기 때문이에요.',
    },
    {
        q: '몇 살 아이들에게 적합한가요?',
        a: '만 3세부터 7세 사이의 유아·미취학 아동에게 가장 잘 맞도록 만들었어요. 부모님과 함께 읽으면 더 좋아요.',
    },
    {
        q: 'SEL(사회정서학습)이란 무엇인가요?',
        a: '자신의 감정을 이해·관리하고, 타인과 공감하며 건강한 관계를 맺는 법을 배우는 교육 과정이에요.',
    },
    {
        q: '색칠 도안을 프린트할 수 있나요?',
        a: '물론이에요! 색칠 도안 페이지에서 "바로 인쇄" 버튼을 누르면 A4 규격으로 바로 출력할 수 있어요.',
    },
];

export default function ParentsPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <div className="relative min-h-screen sb-paper overflow-hidden">
            {/* 배경 블러브 */}
            <div className="sb-bloom w-[450px] h-[450px] bg-[#B5C39A] opacity-20 top-[-60px] right-[-60px]" />
            <div className="sb-bloom w-[350px] h-[350px] bg-[#F1C667] opacity-15 bottom-20 left-[-40px]" />

            <div className="max-w-[1200px] mx-auto px-6 pt-32 pb-24">

                {/* ── 헤더 ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <div style={{ fontFamily: 'var(--font-script)', fontSize: 22, color: '#7B9D67', marginBottom: 4 }}>
                        for parents · 부모님께
                    </div>
                    <h1 className="font-title font-bold text-4xl md:text-5xl text-[#4A3826] mb-4">
                        부모님방
                    </h1>
                    <p className="font-body text-[#6E5942] text-lg max-w-xl mx-auto">
                        아이의 작은 마음을 더 깊이 들여다볼 수 있는 길잡이
                    </p>
                </motion.div>

                {/* ── 인용 카드 ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-14 rounded-[36px] relative overflow-hidden"
                    style={{
                        background: '#FFFCF3',
                        border: '1px solid rgba(155, 120, 70, 0.14)',
                        boxShadow: '0 4px 0 rgba(180,130,70,0.10), 0 18px 36px -18px rgba(120,80,30,0.20)',
                        padding: '48px',
                    }}
                >
                    <div className="sb-bloom absolute w-[400px] h-[400px] top-[-100px] right-[-100px]"
                        style={{ background: '#B5C39A', opacity: 0.22 }} />

                    <div className="grid gap-12 items-center relative" style={{ gridTemplateColumns: '1.3fr 1fr' }}>
                        {/* 텍스트 */}
                        <div>
                            <div style={{ fontFamily: 'var(--font-script)', fontSize: 88, color: '#7B9D67', lineHeight: 0.5, marginBottom: 14 }}>
                                "
                            </div>
                            <h2 className="font-title font-bold text-[#4A3826] mb-5"
                                style={{ fontSize: 'clamp(24px,3vw,38px)', lineHeight: 1.25 }}>
                                정서적 공감은 아이의<br />
                                가장 큰 자산이 됩니다.
                            </h2>
                            <p className="font-body text-[#6E5942] leading-relaxed mb-6" style={{ fontSize: 16 }}>
                                마음마을은 단순한 동화가 아닙니다. 일상에서 마주하는 감정들을
                                캐릭터의 눈높이에서 경험하고, 부모님과의 대화로 단단하게 다지는
                                작은 정서 학습의 길잡이예요.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full flex-shrink-0"
                                    style={{ background: 'radial-gradient(circle at 30% 30%, #DBE5C4, #7B9D67)' }} />
                                <div>
                                    <div className="font-title font-bold text-[#4A3826] text-sm">마음마을 연구소</div>
                                    <div style={{ fontFamily: 'var(--font-hand)', fontSize: 13, color: '#9A8569' }}>
                                        아동심리·정서발달 전문가 그룹
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 영상 자리 */}
                        <div className="relative">
                            <div
                                className="rounded-3xl relative overflow-hidden"
                                style={{
                                    aspectRatio: '4/3',
                                    background: 'repeating-linear-gradient(45deg, rgba(110,89,66,0.06) 0 8px, rgba(110,89,66,0) 8px 16px), #F9EBD0',
                                    border: '1.5px dashed rgba(110,89,66,0.35)',
                                    display: 'grid', placeItems: 'center',
                                    color: '#9A8569',
                                    fontSize: 13,
                                    fontFamily: 'monospace',
                                }}
                            >
                                ◌ 부모님 메시지 영상 자리
                            </div>
                            <div style={{
                                position: 'absolute', top: -10, right: -8,
                                fontFamily: 'var(--font-script)', fontSize: 14, color: '#E29AA2',
                                border: '1.5px solid #E29AA2', padding: '4px 10px', borderRadius: 4,
                                transform: 'rotate(-8deg)', opacity: 0.75,
                            }}>
                                play me
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── 교육 칼럼 ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <div className="flex justify-between items-baseline mb-7">
                        <h3 className="font-title font-bold text-2xl text-[#4A3826]">✿ 최근 교육 칼럼</h3>
                        <span style={{ fontFamily: 'var(--font-hand)', fontSize: 16, color: '#9A8569', cursor: 'pointer' }}>
                            모두 보기 →
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {articles.map((a, i) => (
                            <motion.div
                                key={a.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <Link href={`/parents/${a.slug}`} className="block sb-card overflow-hidden group transition-all hover:-translate-y-1"
                                    style={{ padding: 0 }}>
                                    <div
                                        className="relative overflow-hidden flex items-center justify-center"
                                        style={{
                                            aspectRatio: '16/9', borderRadius: '22px 22px 0 0',
                                            background: `linear-gradient(135deg, ${a.tone}33, ${a.tone}88)`,
                                        }}
                                    >
                                        <div style={{ fontFamily: 'var(--font-script)', fontSize: 32, color: a.tone, opacity: 0.9 }}>
                                            {a.tag}
                                        </div>
                                    </div>
                                    <div style={{ padding: 22 }}>
                                        <div style={{ fontFamily: 'var(--font-hand)', fontSize: 13, color: a.tone, fontWeight: 700, marginBottom: 8 }}>
                                            {a.tag} · {a.time}
                                        </div>
                                        <div className="font-title font-bold text-[#4A3826] leading-snug mb-2 group-hover:text-[#D87C7E] transition-colors" style={{ fontSize: 16 }}>
                                            {a.title}
                                        </div>
                                        <div className="font-body text-[#6E5942] leading-relaxed" style={{ fontSize: 14 }}>
                                            {a.summary}
                                        </div>
                                        <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold" style={{ color: a.tone }}>
                                            읽으러 가기 →
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── SEL 역량 그리드 ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14 rounded-[36px] p-10"
                    style={{
                        background: '#FFFCF3',
                        border: '1px solid rgba(155, 120, 70, 0.14)',
                        boxShadow: '0 2px 14px rgba(120,80,30,0.08)',
                    }}
                >
                    <div className="text-center mb-8">
                        <div style={{ fontFamily: 'var(--font-script)', fontSize: 20, color: '#7B9D67' }}>
                            Social Emotional Learning
                        </div>
                        <h3 className="font-title font-bold text-2xl text-[#4A3826] mt-1">
                            5가지 사회정서 역량
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {[
                            { icon: '🧠', label: '자기 인식', desc: '나의 감정을 알아요', color: '#C9A87E' },
                            { icon: '💪', label: '자기 관리', desc: '감정을 조절해요', color: '#E29AA2' },
                            { icon: '👁️', label: '사회적 인식', desc: '타인을 이해해요', color: '#B6CB95' },
                            { icon: '🤝', label: '관계 기술', desc: '함께 잘 지내요', color: '#9CC4B8' },
                            { icon: '🎯', label: '책임 있는 결정', desc: '좋은 선택을 해요', color: '#9CABCE' },
                        ].map((item, i) => (
                            <div key={i}
                                className="rounded-3xl p-5 text-center"
                                style={{ background: `${item.color}18`, border: `1px solid ${item.color}44` }}
                            >
                                <div className="text-3xl mb-2">{item.icon}</div>
                                <div className="font-title font-bold text-[#4A3826] text-sm mb-1">{item.label}</div>
                                <div className="font-body text-[#9A8569] text-xs">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── FAQ ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-[880px] mx-auto"
                >
                    <div className="text-center mb-8">
                        <div style={{ fontFamily: 'var(--font-script)', fontSize: 20, color: '#D87C7E' }}>frequently asked</div>
                        <h3 className="font-title font-bold text-2xl text-[#4A3826] mt-1">자주 묻는 질문</h3>
                    </div>

                    <div className="flex flex-col gap-3">
                        {faqs.map((f, i) => (
                            <div key={i}
                                className="rounded-3xl cursor-pointer"
                                style={{
                                    background: '#FFFCF3',
                                    border: '1px solid rgba(155, 120, 70, 0.16)',
                                    overflow: 'hidden',
                                    boxShadow: '0 2px 14px rgba(120,80,30,0.06)',
                                }}
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <div className="flex justify-between items-center px-6 py-5">
                                    <div className="flex gap-3 items-center">
                                        <span style={{ fontFamily: 'var(--font-script)', fontSize: 24, color: '#D87C7E' }}>Q.</span>
                                        <span className="font-title font-bold text-[#4A3826]" style={{ fontSize: 16 }}>{f.q}</span>
                                    </div>
                                    <span style={{
                                        fontFamily: 'var(--font-hand)', fontSize: 20, color: '#9A8569',
                                        transition: 'transform 200ms',
                                        display: 'inline-block',
                                        transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                                    }}>+</span>
                                </div>
                                {openFaq === i && (
                                    <div className="px-6 pb-5 pt-0 border-t border-dashed"
                                        style={{
                                            borderColor: 'rgba(110,89,66,0.2)',
                                            fontFamily: 'var(--font-body)', fontSize: 15, color: '#6E5942', lineHeight: 1.75,
                                        }}>
                                        {f.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── 문의 CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center rounded-[36px] py-14 px-8"
                    style={{
                        background: 'linear-gradient(135deg, #DBE5C4 0%, #B5C39A 100%)',
                        boxShadow: '0 14px 38px -14px rgba(123,157,103,0.5)',
                    }}
                >
                    <h3 className="font-title font-bold text-2xl text-white mb-3">더 궁금한 점이 있으신가요?</h3>
                    <p className="font-body text-white/85 mb-6">언제든 편하게 연락 주세요. 빠르게 답변드릴게요.</p>
                    <button className="sb-btn sb-btn-secondary" style={{ fontSize: 14 }}>
                        문의하기 →
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
