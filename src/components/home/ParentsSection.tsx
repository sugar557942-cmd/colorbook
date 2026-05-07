"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/shared/SectionTitle';
import CloudDivider from '@/components/shared/CloudDivider';
import MagicButton from '@/components/shared/MagicButton';
import { Heart, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';

const valueCards = [
    {
        title: "사회정서학습(SEL) 기반",
        icon: Heart,
        description: "CASEL의 사회정서학습 5대 역량 — 자기 인식, 자기 관리, 사회적 인식, 관계 기술, 책임 있는 의사결정을 7명의 캐릭터 이야기에 체계적으로 녹여냈습니다.",
        color: "text-maeul-coral",
        bgColor: "bg-maeul-coral/10"
    },
    {
        title: "읽기→공감→표현의 선순환",
        icon: BookOpen,
        description: "동화를 읽으며 감정을 느끼고, 색칠 활동으로 표현하는 과정이 아이의 정서 발달과 소근육 발달을 동시에 돕습니다. 매 권마다 부모님용 대화 가이드가 포함되어 있어요.",
        color: "text-maeul-lavender",
        bgColor: "bg-maeul-lavender/10"
    },
    {
        title: "안전한 디지털 환경",
        icon: ShieldCheck,
        description: "외부 링크 최소화, 광고 없음, 아동 데이터 미수집. 색칠 도안은 PDF 다운로드 후 오프라인에서 활동할 수 있어 스크린 타임 걱정도 줄여드립니다.",
        color: "text-maeul-mint",
        bgColor: "bg-maeul-mint/10"
    }
];

const ParentsSection = () => {
    return (
        <section className="relative py-24 bg-maeul-cream overflow-hidden">
            {/* Top Divider */}
            <CloudDivider
                variant="wave"
                color="#FFF8E7"
                flip
                className="absolute top-0 left-0 w-full -translate-y-[80%] z-10"
            />

            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <SectionTitle
                    title="부모님, 안심하세요"
                    subtitle="마음마을은 아동 발달 전문가의 감수를 받은 교육 콘텐츠입니다"
                    decoration="hearts"
                    align="center"
                />

                {/* Value Cards */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {valueCards.map((card, i) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[32px] bg-white border border-gray-100 shadow-storybook hover:shadow-float transition-shadow"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${card.bgColor} ${card.color} flex items-center justify-center mb-6`}>
                                <card.icon size={32} />
                            </div>
                            <h3 className="text-xl font-title text-maeul-charcoal mb-4">{card.title}</h3>
                            <p className="text-maeul-soft-gray text-base leading-relaxed">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Info Graphic Area */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 md:p-12 bg-white rounded-[48px] border-2 border-dashed border-maeul-mint/30 shadow-storybook flex flex-col lg:flex-row items-center gap-12"
                >
                    <div className="flex-1">
                        <h3 className="text-2xl font-title text-maeul-charcoal mb-6">아이의 성장을 돕는 5가지 핵심 역량</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {["자기 인식", "자기 관리", "사회적 인식", "관계 기술", "책임 있는 의사결정"].map((text) => (
                                <div key={text} className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
                                    <Sparkles size={16} className="text-maeul-gold" />
                                    <span className="font-bold text-maeul-charcoal text-sm">{text}</span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-maeul-soft-gray text-sm italic">
                            마음마을의 모든 캐릭터와 동화책은 이 역량들을 자연스럽게 배울 수 있도록 설계되었습니다.
                        </p>
                    </div>

                    <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
                        <div className="absolute inset-0 bg-maeul-mint/10 rounded-full animate-pulse" />
                        <div className="text-6xl z-10">🛡️</div>
                        <div className="absolute top-0 right-0 p-3 bg-white rounded-full shadow-md text-maeul-gold">
                            <Sparkles size={24} />
                        </div>
                    </div>
                </motion.div>

                <div className="mt-16 text-center">
                    <MagicButton href="/parents" variant="secondary" size="lg">
                        부모님 공간에서 더 자세히 알아보기 →
                    </MagicButton>
                </div>

                {/* Trust Badges */}
                <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 opacity-40">
                    {["아동 콘텐츠 안전 인증", "SEL 기반 교육 콘텐츠", "전문가 감수 완료"].map(text => (
                        <div key={text} className="flex items-center gap-2 font-bold text-maeul-charcoal grayscale">
                            <span className="text-2xl">🏆</span>
                            <span className="text-sm uppercase tracking-wider">{text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ParentsSection;
