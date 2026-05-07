"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/shared/SectionTitle';
import FloatingElements from '@/components/shared/FloatingElements';
import MagicButton from '@/components/shared/MagicButton';
import { Heart, ShieldCheck, BookOpen, Lightbulb, MessageCircle, HelpCircle } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/styles/animations';
import { cn } from '@/lib/utils';

const articles = [
    {
        title: "우리 아이 정서 지능(EQ), 어떻게 키울까요?",
        category: "교육 가이드",
        description: "아이의 감정을 읽어주는 '감정 코칭'의 5단계 방법을 마음마을 캐릭터들과 함께 배워봅니다.",
        icon: Lightbulb,
        color: "text-maeul-gold"
    },
    {
        title: "스크린 타임을 활용한 오프라인 활동 팁",
        category: "활동 제안",
        description: "색칠공부 도안을 활용해 아이와 함께 즐길 수 있는 10가지 놀이 방법을 소개합니다.",
        icon: BookOpen,
        color: "text-maeul-mint"
    },
    {
        title: "디지털 네이티브 세대를 위한 미디어 안전 교육",
        category: "안전 수칙",
        description: "마음마을이 약속하는 3가지 디지털 안전 원칙과 가정에서 지켜야 할 가이드라인입니다.",
        icon: ShieldCheck,
        color: "text-maeul-sky"
    }
];

const faqs = [
    { q: "콘텐츠는 유료인가요?", a: "마음마을의 기본 동화와 색칠 도안은 모두 무료로 제공됩니다. 아이들의 정서 성장을 돕는 것이 우리의 가장 큰 목표이기 때문입니다." },
    { q: "몇 살 아이들에게 적합한가요?", a: "만 3세부터 7세 사이의 유아 및 미취학 아동에게 가장 적합하도록 설계되었습니다." },
    { q: "SEL(사회정서학습)이 무엇인가요?", a: "자신의 감정을 이해하고 관리하며, 타인과 공감하고 건강한 관계를 맺는 법을 배우는 교육 과정입니다." }
];

const ParentsPage = () => {
    return (
        <div className="relative min-h-screen py-24 px-4 md:px-8 bg-white overflow-hidden">
            <FloatingElements density="low" elements={['leaf', 'star']} />

            <div className="max-w-[1440px] mx-auto">
                <SectionTitle
                    title="부모님을 위한 대화 가이드"
                    subtitle="아이와 함께 성장하는 마음마을의 교육 철학을 공유합니다"
                    decoration="hearts"
                />

                {/* Hero Banner for Parents */}
                <div className="mt-16 p-8 md:p-16 bg-maeul-mint/5 rounded-[48px] border-2 border-dashed border-maeul-mint/20 flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-maeul-mint font-bold mb-4">
                            <Heart size={20} fill="currentColor" />
                            <span>Expert's Message</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-title text-maeul-charcoal mb-6 leading-tight">
                            "정서적 공감은 아이의 <br />가장 큰 자산이 됩니다"
                        </h2>
                        <p className="text-maeul-soft-gray text-lg leading-relaxed mb-8">
                            마음마을 이야기는 단순한 동화가 아닙니다. <br />
                            아이들이 일상에서 마주하는 감정들을 캐릭터들의 눈높이에서 경험하고,
                            부모님과의 대화를 통해 그 감정을 단단하게 다지는 정서 학습 플랫폼입니다.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-maeul-mint/20" />
                            <div>
                                <div className="font-bold text-maeul-charcoal">마음마을 연구소</div>
                                <div className="text-xs text-maeul-soft-gray">아동 심리 및 정서 발달 전문가 그룹</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full max-w-[400px] aspect-video bg-white rounded-3xl shadow-float flex items-center justify-center">
                        <span className="text-6xl">📽️</span>
                        <p className="absolute bottom-4 text-xs text-maeul-soft-gray font-bold">INTRO VIDEO</p>
                    </div>
                </div>

                {/* Articles Section */}
                <div className="mt-24">
                    <h3 className="text-2xl font-title text-maeul-charcoal mb-12 flex items-center gap-2">
                        <BookOpen size={24} className="text-maeul-lavender" />
                        최신 교육 칼럼
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {articles.map((article, i) => (
                            <motion.div
                                key={article.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-video bg-maeul-warm-white rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center">
                                    <article.icon size={48} className={cn("opacity-40 group-hover:scale-110 transition-transform", article.color)} />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/80 rounded-lg text-[10px] font-bold text-maeul-charcoal uppercase tracking-widest">
                                        {article.category}
                                    </div>
                                </div>
                                <h4 className="text-xl font-title text-maeul-charcoal mb-3 group-hover:text-maeul-mint transition-colors">
                                    {article.title}
                                </h4>
                                <p className="text-sm text-maeul-soft-gray leading-relaxed mb-4">
                                    {article.description}
                                </p>
                                <button className="text-xs font-bold text-maeul-mint underline underline-offset-4">자세히 읽기</button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-24 bg-maeul-warm-white rounded-[48px] p-8 md:p-16">
                    <SectionTitle title="자주 묻는 질문" align="left" decoration="stars" />
                    <div className="mt-12 space-y-6 max-w-3xl">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-maeul-mint/20 cursor-pointer">
                                <summary className="list-none flex justify-between items-center font-bold text-maeul-charcoal">
                                    <span className="flex items-center gap-3">
                                        <HelpCircle size={20} className="text-maeul-mint" />
                                        {faq.q}
                                    </span>
                                    <span className="group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 pt-4 border-t border-slate-100 text-sm text-maeul-soft-gray leading-relaxed">
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="mt-24 text-center pb-12">
                    <div className="inline-flex items-center gap-2 text-maeul-coral font-bold mb-4">
                        <MessageCircle size={24} />
                        <span>궁금한 점이 있으신가요?</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-title text-maeul-charcoal mb-8">
                        전문가와 직접 대화해 보세요
                    </h3>
                    <MagicButton href="mailto:contact@maeulstory.com" size="lg" className="!bg-maeul-charcoal !text-white">
                        문의 메일 보내기
                    </MagicButton>
                </div>
            </div>
        </div>
    );
};

export default ParentsPage;
