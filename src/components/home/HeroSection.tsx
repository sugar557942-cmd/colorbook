"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Palette, Sparkles } from 'lucide-react';

const characters = [
    { emoji: "🐻", name: "다온", href: "/characters/daon", color: "#C9A87E", quote: "괜찮아, 천천히 해도 돼." },
    { emoji: "🦊", name: "나리", href: "/characters/nari", color: "#E69470", quote: "이건 이렇게 하면 어떨까?" },
    { emoji: "🐰", name: "하루", href: "/characters/haru", color: "#B6CB95", quote: "같이 하자!" },
    { emoji: "🦉", name: "지우", href: "/characters/jiu", color: "#9CABCE", quote: "잠깐, 먼저 생각해 보자." },
    { emoji: "🐱", name: "소리", href: "/characters/sori", color: "#E29AA2", quote: "내 마음을 표현해야 해!" },
    { emoji: "🐢", name: "느루", href: "/characters/neuru", color: "#9CC4B8", quote: "느려도 괜찮아." },
    { emoji: "🐦", name: "라온", href: "/characters/raon", color: "#ECC472", quote: "저기 봐, 새로운 게 생겼어!" },
];

export default function HeroSection() {
    return (
        <section className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden sb-sky">
            {/* 수채 블러브 */}
            <div className="sb-bloom w-[500px] h-[500px] bg-[#F5D4C8] top-[-100px] left-[-100px]" />
            <div className="sb-bloom w-[400px] h-[400px] bg-[#F1E8A0] bottom-[80px] right-[-80px]" />
            <div className="sb-bloom w-[300px] h-[300px] bg-[#C8DFB8] bottom-[-60px] left-[20%]" />

            {/* 메인 콘텐츠 */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-16"
            >
                {/* 배지 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm mb-8 text-sm font-body font-bold text-[#6E5942]"
                    style={{ boxShadow: "0 2px 14px rgba(120,80,30,0.10), inset 0 0 0 1px rgba(155,120,70,0.15)" }}
                >
                    <span className="text-base">✨</span>
                    일곱 동물 친구들의 사회정서 동화
                </motion.div>

                <h1 className="font-title font-bold text-4xl sm:text-5xl md:text-6xl text-[#4A3826] mb-6 leading-tight">
                    <span className="inline-block" style={{ color: "#D87C7E" }}>마음마을</span>에<br />
                    오신 것을 환영해요! 🌳
                </h1>

                <p className="font-body text-lg md:text-xl text-[#6E5942] mb-10 leading-relaxed">
                    동화를 읽고, 색칠하고,<br className="sm:hidden" /> 마음을 키워요.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <Link
                        href="/coloring"
                        className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-title font-bold text-base text-white transition-all hover:-translate-y-1"
                        style={{
                            background: "linear-gradient(180deg, #E89A82 0%, #D87C7E 100%)",
                            boxShadow: "inset 0 -3px 0 rgba(120,50,50,0.18), 0 4px 0 #B86560, 0 12px 24px -8px rgba(216,124,126,0.6)"
                        }}
                    >
                        <Palette size={18} />
                        무료 색칠공부 시작하기
                    </Link>
                    <Link
                        href="/characters"
                        className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-title font-bold text-base text-[#4A3826] transition-all hover:-translate-y-1 bg-white/70 backdrop-blur-sm"
                        style={{
                            boxShadow: "inset 0 0 0 1.5px #4A3826, 0 4px 0 #4A3826, 0 10px 24px -10px rgba(74,56,38,0.35)"
                        }}
                    >
                        <Sparkles size={18} />
                        친구들 만나기
                    </Link>
                </div>
            </motion.div>

            {/* 캐릭터 퍼레이드 */}
            <div className="relative z-10 w-full mt-14 px-4 max-w-4xl mx-auto">
                <div className="flex justify-center items-end gap-4 sm:gap-6 flex-wrap">
                    {characters.map((c, i) => (
                        <motion.div
                            key={c.href}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                            className="group relative flex flex-col items-center gap-1 cursor-pointer"
                        >
                            {/* 말풍선 */}
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-max max-w-[130px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-[10px] font-body font-bold text-[#4A3826] relative"
                                    style={{ boxShadow: "0 4px 12px rgba(120,80,30,0.15)" }}>
                                    "{c.quote}"
                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/90 rotate-45" />
                                </div>
                            </div>

                            <Link href={c.href}>
                                <motion.div
                                    whileHover={{ y: -12, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 14 }}
                                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-3xl sm:text-4xl"
                                    style={{
                                        background: `radial-gradient(circle at 35% 30%, ${c.color}60 0%, ${c.color}CC 70%)`,
                                        boxShadow: `inset 0 -4px 12px rgba(0,0,0,0.08), inset 0 4px 10px rgba(255,255,255,0.4), 0 8px 20px -8px ${c.color}88`
                                    }}
                                >
                                    {c.emoji}
                                </motion.div>
                            </Link>
                            <span className="text-[11px] font-body font-bold text-[#6E5942]">{c.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 바닥 물결 */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none">
                <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="block w-full h-[40px]">
                    <path d="M0 40 Q150 10 300 40 T600 40 T900 40 T1200 40 V60 H0Z" fill="#FBF1DC" opacity="0.95" />
                </svg>
            </div>
        </section>
    );
}
