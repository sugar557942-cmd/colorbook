"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { characters } from '@/data/characters';

export default function CharactersPage() {
    return (
        <div className="relative min-h-screen sb-paper overflow-hidden">
            {/* 배경 블러브 */}
            <div className="sb-bloom w-[500px] h-[500px] bg-[#F1C667] opacity-20 top-[-80px] right-[-100px]" />
            <div className="sb-bloom w-[400px] h-[400px] bg-[#E29AA2] opacity-15 bottom-0 left-[-60px]" />

            <div className="max-w-[1200px] mx-auto px-6 pt-32 pb-24">
                {/* 헤더 */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="font-body text-[#9A8569] text-sm font-bold tracking-wider uppercase mb-3">마음마을 친구들</p>
                    <h1 className="font-title font-bold text-4xl md:text-5xl text-[#4A3826] mb-4">
                        일곱 친구를 소개해요! 🌟
                    </h1>
                    <p className="font-body text-[#6E5942] text-lg max-w-xl mx-auto">
                        저마다 다른 재능과 고민을 가진 친구들이에요.<br />
                        친구를 클릭해서 더 자세히 알아보세요!
                    </p>
                </motion.div>

                {/* 캐릭터 그리드 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                    {characters.map((char, i) => (
                        <motion.div
                            key={char.slug}
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07, duration: 0.45 }}
                        >
                            <Link href={`/characters/${char.slug}`}>
                                <motion.div
                                    whileHover={{ y: -8, rotate: i % 2 === 0 ? 1.5 : -1.5 }}
                                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                                    className="sb-card flex flex-col items-center text-center gap-4 py-7 cursor-pointer"
                                >
                                    {/* 캐릭터 오브 */}
                                    <div
                                        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                                        style={{
                                            background: `radial-gradient(circle at 35% 30%, ${char.colorLight || char.color + '44'} 0%, ${char.color}BB 70%)`,
                                            boxShadow: `inset 0 -6px 16px rgba(0,0,0,0.07), inset 0 6px 14px rgba(255,255,255,0.45), 0 12px 24px -10px ${char.color}66`
                                        }}
                                    >
                                        {char.animalEmoji}
                                    </div>

                                    {/* 이름/동물 */}
                                    <div>
                                        <p className="font-title font-bold text-lg text-[#4A3826]">{char.name}</p>
                                        <p className="font-body text-xs text-[#9A8569] mt-0.5">{char.animal}</p>
                                    </div>

                                    {/* 역할 칩 */}
                                    <span
                                        className="text-[11px] font-body font-bold px-3 py-1 rounded-full text-white"
                                        style={{ backgroundColor: char.color }}
                                    >
                                        {char.role}
                                    </span>

                                    {/* 명언 */}
                                    <p className="font-body text-xs text-[#6E5942] italic leading-relaxed px-2 line-clamp-2">
                                        "{char.quote}"
                                    </p>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* 하단 태그라인 */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center font-body italic text-[#9A8569] max-w-2xl mx-auto leading-relaxed"
                >
                    마음마을 친구들은 서로 다르지만, 함께 있을 때 가장 행복해요. 🌳
                </motion.p>
            </div>
        </div>
    );
}
