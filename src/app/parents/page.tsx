"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, BookOpen, Lightbulb, MessageCircle, HelpCircle, Sparkles } from 'lucide-react';

const articles = [
    {
        icon: Lightbulb, color: "#E2A352", bg: "#F8E7B5",
        category: "교육 가이드",
        title: "우리 아이 정서 지능(EQ), 어떻게 키울까요?",
        body: "아이의 감정을 읽어주는 '감정 코칭'의 5단계 방법을 마음마을 캐릭터들과 함께 배워봅니다."
    },
    {
        icon: BookOpen, color: "#8FB7AE", bg: "#D8EDE9",
        category: "활동 제안",
        title: "스크린 타임을 활용한 오프라인 활동 팁",
        body: "색칠공부 도안을 활용해 아이와 함께 즐길 수 있는 10가지 놀이 방법을 소개합니다."
    },
    {
        icon: ShieldCheck, color: "#9CABCE", bg: "#DCE3F0",
        category: "안전 수칙",
        title: "디지털 네이티브 세대를 위한 미디어 안전 교육",
        body: "마음마을이 약속하는 3가지 디지털 안전 원칙과 가정에서 지켜야 할 가이드라인입니다."
    },
];

const faqs = [
    { q: "콘텐츠는 유료인가요?", a: "마음마을의 기본 동화와 색칠 도안은 모두 무료로 제공됩니다. 아이들의 정서 성장을 돕는 것이 우리의 가장 큰 목표입니다." },
    { q: "몇 살 아이들에게 적합한가요?", a: "만 3세부터 7세 사이의 유아 및 미취학 아동에게 가장 적합하도록 설계되었습니다." },
    { q: "SEL(사회정서학습)이 무엇인가요?", a: "자신의 감정을 이해하고 관리하며, 타인과 공감하고 건강한 관계를 맺는 법을 배우는 교육 과정입니다." },
];

export default function ParentsPage() {
    return (
        <div className="relative min-h-screen sb-paper overflow-hidden">
            {/* 블러브 */}
            <div className="sb-bloom w-[450px] h-[450px] bg-[#9CC4B8] opacity-18 top-0 right-0" />
            <div className="sb-bloom w-[400px] h-[400px] bg-[#D87C7E] opacity-10 bottom-0 left-[-60px]" />

            <div className="max-w-[1200px] mx-auto px-6 pt-32 pb-24">
                {/* 헤더 */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="font-body text-[#9A8569] text-sm font-bold tracking-wider uppercase mb-3">💛 부모님 공간</p>
                    <h1 className="font-title font-bold text-4xl md:text-5xl text-[#4A3826] mb-4">
                        부모님을 위한 대화 가이드
                    </h1>
                    <p className="font-body text-[#6E5942] text-lg max-w-xl mx-auto">
                        아이와 함께 성장하는 마음마을의 교육 철학을 공유합니다
                    </p>
                </motion.div>

                {/* 히어로 배너 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="sb-card mb-16 flex flex-col lg:flex-row items-center gap-10 p-10"
                >
                    <div className="flex-1">
                        <div className="flex items-center gap-2 font-body font-bold text-[#8FB7AE] mb-4 text-sm">
                            <Heart size={16} fill="currentColor" />
                            Expert's Message
                        </div>
                        <h2 className="font-title font-bold text-2xl md:text-3xl text-[#4A3826] mb-5 leading-tight">
                            "정서적 공감은 아이의<br />가장 큰 자산이 됩니다"
                        </h2>
                        <p className="font-body text-[#6E5942] leading-relaxed mb-6">
                            마음마을 이야기는 단순한 동화가 아닙니다. 아이들이 일상에서 마주하는 감정들을
                            캐릭터들의 눈높이에서 경험하고, 부모님과의 대화를 통해 그 감정을 단단하게
                            다지는 정서 학습 플랫폼입니다.
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#D8EDE9] flex items-center justify-center">
                                <span className="text-xl">🌿</span>
                            </div>
                            <div>
                                <p className="font-body font-bold text-sm text-[#4A3826]">마음마을 연구소</p>
                                <p className="font-body text-xs text-[#9A8569]">아동 심리 및 정서 발달 전문가 그룹</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="relative w-full max-w-[380px] aspect-video rounded-3xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "#F9EBD0", border: "2px dashed rgba(155,120,70,0.20)" }}
                    >
                        <span className="text-6xl">📽️</span>
                        <p className="absolute bottom-4 font-body text-xs text-[#9A8569] font-bold">INTRO VIDEO</p>
                    </div>
                </motion.div>

                {/* SEL 5대 역량 */}
                <div className="mb-16">
                    <h2 className="font-title font-bold text-2xl text-[#4A3826] mb-6 flex items-center gap-2">
                        <Sparkles size={20} style={{ color: "#F1C667" }} />
                        아이의 성장을 돕는 5가지 핵심 역량
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {["자기 인식", "자기 관리", "사회적 인식", "관계 기술", "책임 있는 의사결정"].map((t, i) => (
                            <motion.div
                                key={t}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="flex flex-col items-center text-center gap-3 p-5 sb-card"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#F8E7B5] flex items-center justify-center">
                                    <Sparkles size={16} style={{ color: "#E2A352" }} />
                                </div>
                                <p className="font-body font-bold text-sm text-[#4A3826]">{t}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 칼럼 */}
                <div className="mb-16">
                    <h2 className="font-title font-bold text-2xl text-[#4A3826] mb-8 flex items-center gap-2">
                        <BookOpen size={20} style={{ color: "#B7A5CE" }} />
                        최신 교육 칼럼
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {articles.map((a, i) => (
                            <motion.div
                                key={a.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="sb-card group cursor-pointer"
                            >
                                <div
                                    className="aspect-video rounded-2xl mb-5 flex items-center justify-center"
                                    style={{ background: a.bg }}
                                >
                                    <a.icon size={44} style={{ color: a.color, opacity: 0.7 }} />
                                </div>
                                <span className="text-[10px] font-body font-bold uppercase tracking-wider text-[#9A8569]">{a.category}</span>
                                <h3 className="font-title font-bold text-base text-[#4A3826] mt-1.5 mb-3 group-hover:text-[#D87C7E] transition-colors leading-snug">
                                    {a.title}
                                </h3>
                                <p className="font-body text-sm text-[#6E5942] leading-relaxed mb-4">{a.body}</p>
                                <button className="font-body font-bold text-xs text-[#8FB7AE] underline underline-offset-4">
                                    자세히 읽기
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div className="mb-16">
                    <h2 className="font-title font-bold text-2xl text-[#4A3826] mb-8 flex items-center gap-2">
                        <HelpCircle size={20} style={{ color: "#9CC4B8" }} />
                        자주 묻는 질문
                    </h2>
                    <div className="space-y-4 max-w-3xl">
                        {faqs.map((f, i) => (
                            <details
                                key={i}
                                className="group sb-card cursor-pointer"
                            >
                                <summary className="list-none flex justify-between items-center font-body font-bold text-[#4A3826]">
                                    <span className="flex items-center gap-3">
                                        <HelpCircle size={16} style={{ color: "#9CC4B8" }} />
                                        {f.q}
                                    </span>
                                    <span className="text-[#9A8569] group-open:rotate-180 transition-transform text-xs">▼</span>
                                </summary>
                                <p className="mt-4 pt-4 border-t border-[rgba(155,120,70,0.12)] font-body text-sm text-[#6E5942] leading-relaxed">
                                    {f.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>

                {/* 문의 CTA */}
                <div className="text-center sb-card py-12">
                    <MessageCircle size={32} className="mx-auto mb-4" style={{ color: "#E69282" }} />
                    <h3 className="font-title font-bold text-2xl text-[#4A3826] mb-3">궁금한 점이 있으신가요?</h3>
                    <p className="font-body text-[#6E5942] mb-6">전문가와 직접 대화해 보세요</p>
                    <a
                        href="mailto:hello@maeulstory.com"
                        className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-title font-bold text-base text-white"
                        style={{
                            background: "linear-gradient(180deg, #E89A82 0%, #D87C7E 100%)",
                            boxShadow: "inset 0 -3px 0 rgba(120,50,50,0.18), 0 4px 0 #B86560, 0 12px 24px -8px rgba(216,124,126,0.6)"
                        }}
                    >
                        <MessageCircle size={16} />
                        문의 메일 보내기
                    </a>
                </div>
            </div>
        </div>
    );
}
