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

/* ── Bunting garland SVG ── */
function Bunting({ count = 18 }: { count?: number }) {
    const palette = ['#E69282', '#F1C667', '#B5C39A', '#9CABCE', '#B7A5CE', '#F1AE8B'];
    const flags = Array.from({ length: count }).map((_, i) => ({
        x: (i + 0.5) * (100 / count),
        y: 8 + Math.sin(i * 0.9) * 4,
        color: palette[i % palette.length],
    }));
    return (
        <svg viewBox="0 0 100 28" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
            <path
                d={`M 0 6 ${flags.map(f => `Q ${f.x - (50/count)} ${f.y + 2}, ${f.x} ${f.y}`).join(' ')} T 100 6`}
                fill="none" stroke="#8E6748" strokeWidth="0.25" opacity="0.7"
            />
            {flags.map((f, i) => (
                <g key={i} transform={`translate(${f.x} ${f.y})`}>
                    <polygon
                        points="-1.4,0 1.4,0 0,4"
                        fill={f.color} opacity="0.92"
                        transform={`rotate(${i % 2 === 0 ? -3 : 3})`}
                    />
                </g>
            ))}
        </svg>
    );
}

export default function HeroSection() {
    return (
        <section className="relative flex flex-col items-center justify-center overflow-hidden sb-sky" style={{ minHeight: '92vh' }}>
            {/* 수채 블러브 */}
            <div className="sb-bloom w-[500px] h-[500px] bg-[#F5D4C8] top-[-100px] left-[-100px]" />
            <div className="sb-bloom w-[400px] h-[400px] bg-[#F1E8A0] bottom-[100px] right-[-80px]" />
            <div className="sb-bloom w-[300px] h-[300px] bg-[#C8DFB8] bottom-[-60px] left-[20%]" />

            {/* 가랜드 */}
            <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none px-8">
                <Bunting count={20} />
            </div>

            {/* 구름 장식 */}
            <div className="absolute top-[12%] left-[8%] pointer-events-none opacity-70">
                <svg width="130" height="72" viewBox="0 0 120 66">
                    <g fill="#FFFAF0"><ellipse cx="30" cy="42" rx="28" ry="18" /><ellipse cx="58" cy="32" rx="32" ry="22" /><ellipse cx="90" cy="40" rx="26" ry="18" /></g>
                    <g fill="#FFE9D2" opacity="0.6"><ellipse cx="36" cy="50" rx="22" ry="8" /><ellipse cx="78" cy="50" rx="22" ry="8" /></g>
                </svg>
            </div>
            <div className="absolute top-[18%] right-[10%] pointer-events-none opacity-55">
                <svg width="165" height="90" viewBox="0 0 120 66">
                    <g fill="#FFFAF0"><ellipse cx="30" cy="42" rx="28" ry="18" /><ellipse cx="58" cy="32" rx="32" ry="22" /><ellipse cx="90" cy="40" rx="26" ry="18" /></g>
                </svg>
            </div>

            {/* 메인 콘텐츠 */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-20"
            >
                {/* 배지 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm mb-7 border border-dashed"
                    style={{
                        boxShadow: "0 2px 14px rgba(120,80,30,0.10)",
                        borderColor: "rgba(110, 89, 66, 0.3)",
                        fontFamily: 'var(--font-script)', fontSize: 18, color: '#8E6748',
                    }}
                >
                    ✦ 어서 와요, 마음마을에 ✦
                </motion.div>

                <h1 className="font-title font-bold text-[#4A3826] mb-6 leading-tight"
                    style={{ fontSize: 'clamp(42px, 6.5vw, 76px)', letterSpacing: '-0.02em' }}>
                    오늘의{' '}
                    <span style={{ fontFamily: 'var(--font-script)', color: '#D87C7E', fontStyle: 'italic' }}>
                        마음 날씨
                    </span>
                    는<br />어떤가요?
                </h1>

                <p className="font-body text-lg text-[#6E5942] mb-10 leading-relaxed">
                    일곱 동물 친구들이 사는 작은 마을에서<br />
                    함께 동화를 읽고, 색칠하고, 마음을 가꿔요.
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
                        색칠 시작하기
                    </Link>
                    <Link
                        href="/characters"
                        className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-title font-bold text-base text-[#4A3826] transition-all hover:-translate-y-1 bg-white/70 backdrop-blur-sm"
                        style={{
                            boxShadow: "inset 0 0 0 1.5px #4A3826, 0 4px 0 #4A3826, 0 10px 24px -10px rgba(74,56,38,0.35)"
                        }}
                    >
                        <Sparkles size={18} />
                        마을 둘러보기
                    </Link>
                </div>
            </motion.div>

            {/* 캐릭터 퍼레이드 */}
            <div className="relative z-10 w-full mt-14 px-4 max-w-4xl mx-auto pb-[90px]">
                {/* 잔디 배경 glow */}
                <div className="absolute bottom-16 left-0 right-0 h-28 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at center bottom, rgba(181,195,154,0.65) 0%, transparent 70%)', filter: 'blur(8px)' }} />

                <div className="flex justify-center items-end gap-4 sm:gap-6 flex-wrap relative z-10">
                    {characters.map((c, i) => (
                        <motion.div
                            key={c.href}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                            className="group relative flex flex-col items-center gap-1 cursor-pointer"
                            style={{ transform: `translateY(${(i % 2) * -8}px)` }}
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
                                    className="w-14 h-14 sm:w-[70px] sm:h-[70px] rounded-full flex items-center justify-center text-3xl sm:text-4xl"
                                    style={{
                                        background: `radial-gradient(circle at 35% 30%, ${c.color}60 0%, ${c.color}CC 70%)`,
                                        boxShadow: `inset 0 -4px 12px rgba(0,0,0,0.08), inset 0 4px 10px rgba(255,255,255,0.4), 0 8px 20px -8px ${c.color}88`
                                    }}
                                >
                                    {c.emoji}
                                </motion.div>
                            </Link>
                            <span className="font-title text-xs font-bold text-[#4A3826]">{c.name}</span>
                            <span className="font-body text-[10px] text-[#9A8569]">{['곰','여우','토끼','부엉이','고양이','거북이','참새'][i]}</span>
                        </motion.div>
                    ))}
                </div>

                {/* 잔디 라인 SVG */}
                <svg viewBox="0 0 1200 60" preserveAspectRatio="none"
                    className="absolute bottom-8 left-0 w-full pointer-events-none"
                    style={{ height: 56 }}>
                    {Array.from({ length: 80 }).map((_, i) => (
                        <path key={i}
                            d={`M ${i * 15 + (i % 3) * 4} 56 Q ${i * 15 + 3} ${36 + (i % 5) * 4} ${i * 15 + 6} 56`}
                            fill="#7B9D67" opacity={0.35 + (i % 4) * 0.1}
                        />
                    ))}
                </svg>
            </div>

            {/* 바닥 물결 */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none">
                <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="block w-full" style={{ height: 40 }}>
                    <path d="M0 40 Q150 10 300 40 T600 40 T900 40 T1200 40 V60 H0Z" fill="#FBF1DC" opacity="0.97" />
                </svg>
            </div>
        </section>
    );
}
