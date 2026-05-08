"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, BookOpen, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

const cards = [
    {
        icon: Heart, color: "#D87C7E", bg: "#F8DCD7",
        title: "사회정서학습(SEL) 기반",
        body: "CASEL의 5대 역량 — 자기 인식, 자기 관리, 사회적 인식, 관계 기술, 책임 있는 의사결정을 7명의 캐릭터 이야기에 녹여냈습니다."
    },
    {
        icon: BookOpen, color: "#9D7FA9", bg: "#DFD5EA",
        title: "읽기 → 공감 → 표현의 선순환",
        body: "동화를 읽으며 감정을 느끼고, 색칠 활동으로 표현하는 과정이 정서 발달과 소근육 발달을 동시에 돕습니다. 매 권 부모님용 대화 가이드 포함."
    },
    {
        icon: ShieldCheck, color: "#8FB7AE", bg: "#D8EDE9",
        title: "안전한 디지털 환경",
        body: "광고 없음, 아동 데이터 미수집. 색칠 도안은 PDF로 다운로드 후 오프라인에서 활동할 수 있어 스크린 타임 걱정도 줄여드립니다."
    },
];

export default function ParentsSection() {
    return (
        <section className="relative py-24 sb-paper overflow-hidden">
            {/* 블러브 */}
            <div className="sb-bloom w-[400px] h-[400px] bg-[#9CC4B8] opacity-15 top-0 right-0" />
            <div className="sb-bloom w-[350px] h-[350px] bg-[#D87C7E] opacity-10 bottom-0 left-0" />

            <div className="max-w-[1200px] mx-auto px-6">
                {/* 헤더 */}
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <p className="font-body text-[#9A8569] text-sm font-bold tracking-wider uppercase mb-2">💛 부모님 공간</p>
                        <h2 className="font-title font-bold text-3xl md:text-4xl text-[#4A3826]">
                            부모님, 안심하세요
                        </h2>
                        <p className="font-body text-[#6E5942] mt-2">아동 발달 전문가의 감수를 받은 교육 콘텐츠입니다</p>
                    </div>
                    <Link
                        href="/parents"
                        className="hidden sm:flex items-center gap-1.5 font-body font-bold text-sm text-[#E69282] hover:gap-2.5 transition-all"
                    >
                        자세히 알아보기 <ArrowRight size={14} />
                    </Link>
                </div>

                {/* 카드 3개 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {cards.map((c, i) => (
                        <motion.div
                            key={c.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="sb-card"
                        >
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                                style={{ background: c.bg }}
                            >
                                <c.icon size={24} style={{ color: c.color }} />
                            </div>
                            <h3 className="font-title font-bold text-base text-[#4A3826] mb-3">{c.title}</h3>
                            <p className="font-body text-sm text-[#6E5942] leading-relaxed">{c.body}</p>
                        </motion.div>
                    ))}
                </div>

                {/* SEL 역량 배너 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-[36px] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8"
                    style={{
                        background: "#FFFCF3",
                        border: "2px dashed rgba(155,120,70,0.22)",
                        boxShadow: "0 4px 24px rgba(120,80,30,0.08)"
                    }}
                >
                    <div className="flex-1">
                        <h3 className="font-title font-bold text-xl text-[#4A3826] mb-5">아이의 성장을 돕는 5가지 핵심 역량</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {["자기 인식", "자기 관리", "사회적 인식", "관계 기술", "책임 있는 의사결정"].map(t => (
                                <div
                                    key={t}
                                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#FBF1DC]"
                                    style={{ boxShadow: "0 1px 6px rgba(120,80,30,0.07)" }}
                                >
                                    <Sparkles size={14} style={{ color: "#F1C667" }} />
                                    <span className="font-body font-bold text-sm text-[#4A3826]">{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 flex-shrink-0">
                        <div className="text-6xl">🛡️</div>
                        <Link
                            href="/parents"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-title font-bold text-sm text-white"
                            style={{
                                background: "linear-gradient(180deg, #E89A82 0%, #D87C7E 100%)",
                                boxShadow: "0 3px 0 #B86560, 0 8px 16px -6px rgba(216,124,126,0.45)"
                            }}
                        >
                            부모님 공간 바로가기 <ArrowRight size={14} />
                        </Link>
                    </div>
                </motion.div>
            </div>

            <div className="sb-divider mt-20 opacity-40" />
        </section>
    );
}
