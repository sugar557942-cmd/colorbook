"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface VisitorStats {
    total: number;
    today: number;
    downloads: number;
    prints: number;
}

/* 숫자가 0에서 목표값까지 올라가는 카운트업 훅 */
function useCountUp(target: number, duration = 1200) {
    const [value, setValue] = useState(0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        if (target === 0) return;
        const start = performance.now();
        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuart
            const eased = 1 - (1 - progress) ** 4;
            setValue(Math.round(eased * target));
            if (progress < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [target, duration]);

    return value;
}

function StatChip({
    emoji, label, target, color, delay,
}: {
    emoji: string; label: string; target: number; color: string; delay: number;
}) {
    const value = useCountUp(target, 1400);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.45 }}
            className="flex flex-col items-center gap-2"
        >
            <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-sm"
                style={{ background: `${color}22`, border: `1.5px solid ${color}44` }}
            >
                {emoji}
            </div>
            <div
                className="font-title font-bold tabular-nums"
                style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: '#4A3826', lineHeight: 1 }}
            >
                {value.toLocaleString()}
            </div>
            <div
                className="font-body text-sm text-[#9A8569]"
                style={{ fontFamily: 'var(--font-hand)', fontSize: 14 }}
            >
                {label}
            </div>
        </motion.div>
    );
}

export default function VisitorCounter() {
    const [stats, setStats] = useState<VisitorStats | null>(null);

    useEffect(() => {
        const SESSION_KEY = 'sb_visited';
        const alreadyCounted = sessionStorage.getItem(SESSION_KEY);

        fetch('/api/visitors', { method: alreadyCounted ? 'GET' : 'POST' })
            .then(r => r.json())
            .then((data: VisitorStats) => {
                setStats(data);
                if (!alreadyCounted) sessionStorage.setItem(SESSION_KEY, '1');
            })
            .catch(() => { /* non-critical */ });
    }, []);

    /* 데이터 오기 전엔 자리만 잡아 둠 */
    const s = stats ?? { total: 0, today: 0, downloads: 0, prints: 0 };

    return (
        <section className="relative overflow-hidden py-20 px-4">
            {/* 배경 블러브 */}
            <div
                className="sb-bloom w-[500px] h-[500px] opacity-20"
                style={{
                    background: '#F1C667',
                    position: 'absolute',
                    top: -100, left: '50%',
                    transform: 'translateX(-50%)',
                }}
            />

            <div className="max-w-[900px] mx-auto relative">
                {/* 타이틀 */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div
                        style={{
                            fontFamily: 'var(--font-script)',
                            fontSize: 20, color: '#D87C7E', marginBottom: 4,
                        }}
                    >
                        you are not alone ✨
                    </div>
                    <h2 className="font-title font-bold text-3xl text-[#4A3826]">
                        마음마을을 찾아온 친구들
                    </h2>
                </motion.div>

                {/* 스탯 카드 */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="rounded-[40px] px-8 py-10"
                    style={{
                        background: '#FFFCF3',
                        border: '1px solid rgba(155,120,70,0.16)',
                        boxShadow: '0 4px 0 rgba(180,130,70,0.10), 0 24px 48px -20px rgba(120,80,30,0.18)',
                    }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                        <StatChip
                            emoji="🏡"
                            label="총 방문자"
                            target={s.total}
                            color="#E69282"
                            delay={0.15}
                        />
                        <StatChip
                            emoji="🌱"
                            label="오늘 방문자"
                            target={s.today}
                            color="#B5C39A"
                            delay={0.25}
                        />
                        <StatChip
                            emoji="🎨"
                            label="도안 다운로드"
                            target={s.downloads}
                            color="#F1C667"
                            delay={0.35}
                        />
                        <StatChip
                            emoji="🖨️"
                            label="인쇄 횟수"
                            target={s.prints}
                            color="#9CC4B8"
                            delay={0.45}
                        />
                    </div>

                    {/* 구분선 */}
                    <div
                        className="mt-8 pt-6 text-center border-t border-dashed"
                        style={{ borderColor: 'rgba(110,89,66,0.18)' }}
                    >
                        <p
                            className="font-body text-[#9A8569] leading-relaxed"
                            style={{ fontFamily: 'var(--font-hand)', fontSize: 15 }}
                        >
                            마음마을에서 함께 감정을 배우고, 색을 입혀 주신 모든 분들께 감사해요 🌸
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
