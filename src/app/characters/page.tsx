"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/shared/SectionTitle';
import CharacterCard from '@/components/shared/CharacterCard';
import FloatingElements from '@/components/shared/FloatingElements';
import { WisdomTree } from '@/components/illustrations/MapElements';
import { characters } from '@/data/characters';
import { fadeInUp, staggerContainer } from '@/styles/animations';

const CharactersPage = () => {
    return (
        <div className="relative min-h-screen py-24 px-4 md:px-8 bg-maeul-cream/20 overflow-hidden">
            <FloatingElements density="low" elements={['leaf', 'butterfly']} />

            <div className="max-w-[1440px] mx-auto">
                <SectionTitle
                    title="마음마을 친구들"
                    subtitle="일곱 친구를 클릭해서 더 자세히 알아보세요!"
                    decoration="stars"
                />

                {/* Circular Layout for Desktop / Grid for Mobile */}
                <div className="relative mt-20 flex flex-col items-center">
                    {/* Desktop Circular Layout (hidden on small screens) */}
                    <div className="hidden lg:block relative w-[800px] h-[800px]">
                        {/* Center Piece */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 z-10">
                            <WisdomTree className="w-full h-full drop-shadow-2xl" />
                        </div>

                        {/* Orbiting Characters */}
                        {characters.map((char, i) => {
                            const angle = (i * (360 / characters.length)) - 90;
                            const radius = 340;
                            const x = radius * Math.cos(angle * (Math.PI / 180));
                            const y = radius * Math.sin(angle * (Math.PI / 180));

                            return (
                                <motion.div
                                    key={char.slug}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1, type: "spring" }}
                                    className="absolute"
                                    style={{
                                        top: `calc(50% + ${y}px)`,
                                        left: `calc(50% + ${x}px)`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                >
                                    <CharacterCard character={char} className="w-[180px] !shadow-md hover:!shadow-xl hover:scale-110" />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Mobile/Tablet Grid Layout */}
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="lg:hidden grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl"
                    >
                        {characters.map((char) => (
                            <motion.div key={char.slug} variants={fadeInUp}>
                                <CharacterCard character={char} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom Decorative Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 text-center text-maeul-soft-gray font-body italic max-w-2xl mx-auto"
                >
                    마음마을 친구들은 서로 다르지만, 함께 있을 때 가장 행복해요.
                    친구들의 이야기를 읽으며 여러분의 마음도 함께 가꿔보세요!
                </motion.div>
            </div>
        </div>
    );
};

export default CharactersPage;
