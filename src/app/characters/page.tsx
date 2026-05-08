"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { characters } from '@/data/characters';

export default function CharactersPage() {
    return (
        <div className="relative min-h-screen sb-paper overflow-hidden">
            {/* 배경 */}
            <div className="sb-bloom w-[500px] h-[500px] bg-[#FAD9D6] opacity-60 top-0 left-0 right-0"
                style={{ borderRadius: 0, filter: 'blur(0)', background: 'linear-gradient(180deg, #FAD9D6 0%, transparent 60%)', position: 'absolute', height: 320 }} />
            <div className="sb-bloom w-[500px] h-[500px] bg-[#F1C667] opacity-15 bottom-0 right-[-80px]" />

            <div className="max-w-[1200px] mx-auto px-6 pt-32 pb-24">

                {/* 헤더 */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14 relative z-10"
                >
                    <div style={{ fontFamily: 'var(--font-script)', fontSize: 22, color: '#D87C7E', marginBottom: 4 }}>
                        seven little friends
                    </div>
                    <h1 className="font-title font-bold text-4xl md:text-5xl text-[#4A3826] mb-4">
                        마음마을 친구들
                    </h1>
                    <p className="font-body text-[#6E5942] text-lg max-w-[560px] mx-auto">
                        친구를 한 명씩 눌러보면 그 아이의 작은 이야기와 좋아하는 것들을 더 알 수 있어요.
                    </p>
                </motion.div>

                {/* 4 + 3 그리드 */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
                    {characters.slice(0, 4).map((char, i) => (
                        <CharacterCard key={char.slug} char={char} tilt={i % 2 === 0 ? -1 : 1.5} delay={i * 0.07} />
                    ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-[870px] mx-auto">
                    {characters.slice(4).map((char, i) => (
                        <CharacterCard key={char.slug} char={char} tilt={i % 2 === 0 ? 1 : -1.2} delay={(i + 4) * 0.07} />
                    ))}
                </div>

                {/* 하단 태그라인 */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center font-body italic text-[#9A8569] max-w-2xl mx-auto leading-relaxed"
                    style={{ fontFamily: 'var(--font-hand)', fontSize: 18 }}
                >
                    마음마을 친구들은 서로 다르지만, 함께 있을 때 가장 행복해요. 🌳
                </motion.p>
            </div>
        </div>
    );
}

function CharacterCard({ char, tilt = 0, delay = 0 }: {
    char: typeof characters[0];
    tilt?: number;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.45 }}
        >
            <Link href={`/characters/${char.slug}`}>
                <div
                    style={{
                        background: '#FFFCF3', borderRadius: 24, padding: 22,
                        transform: `rotate(${tilt}deg)`,
                        border: '1px solid rgba(155, 120, 70, 0.14)',
                        boxShadow: '0 4px 0 rgba(180,130,70,0.10), 0 18px 36px -18px rgba(120,80,30,0.20)',
                        position: 'relative', cursor: 'pointer',
                        transition: 'transform 200ms ease, box-shadow 200ms ease',
                    }}
                    className="group hover:!scale-[1.03] hover:shadow-xl"
                >
                    {/* 종이 핀 */}
                    <div style={{
                        position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                        width: 14, height: 14, borderRadius: '50%',
                        background: 'radial-gradient(circle at 30% 30%, #F1AE8B, #B86560)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }} />

                    {/* 캐릭터 오브 */}
                    <div className="flex justify-center mb-4">
                        <div
                            className="rounded-full flex items-center justify-center text-4xl"
                            style={{
                                width: 100, height: 100,
                                background: `radial-gradient(circle at 35% 30%, ${char.colorLight || char.color + '44'} 0%, ${char.color}BB 70%)`,
                                boxShadow: `inset 0 -8px 20px rgba(0,0,0,0.07), inset 0 6px 14px rgba(255,255,255,0.45), 0 12px 24px -10px ${char.color}66`,
                            }}
                        >
                            {char.animalEmoji}
                        </div>
                    </div>

                    {/* 이름 */}
                    <div className="text-center">
                        <div className="font-title font-bold text-[#4A3826] mb-0.5" style={{ fontSize: 20 }}>
                            {char.name}
                        </div>
                        <div style={{ fontFamily: 'var(--font-hand)', fontSize: 13, color: '#9A8569', marginBottom: 10 }}>
                            {char.animal} · {char.nameEn}
                        </div>

                        {/* 역할 칩 */}
                        <div
                            className="inline-block px-3 py-1 rounded-full text-xs font-body font-bold mb-3"
                            style={{ background: char.colorLight || `${char.color}22`, color: '#4A3826' }}
                        >
                            {char.role}
                        </div>

                        {/* 명언 */}
                        <div
                            className="border-t border-dashed pt-3"
                            style={{
                                borderColor: 'rgba(110,89,66,0.25)',
                                fontFamily: 'var(--font-script)', fontSize: 16,
                                color: char.color, lineHeight: 1.4,
                            }}
                        >
                            "{char.quote}"
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
