"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/shared/SectionTitle';
import CharacterCard from '@/components/shared/CharacterCard';
import FloatingElements from '@/components/shared/FloatingElements';
import { characters } from '@/data/characters';
import { fadeInUp, staggerContainer } from '@/styles/animations';

const CharactersPage = () => {
    return (
        <div className="relative min-h-screen py-24 px-4 md:px-8 overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #FFF9F0 0%, #F5EDE0 40%, #EEF8F6 100%)' }}
        >
            <FloatingElements density="low" elements={['leaf', 'butterfly']} />

            <div className="max-w-5xl mx-auto">
                <SectionTitle
                    title="마음마을 친구들"
                    subtitle="일곱 친구를 클릭해서 더 자세히 알아보세요!"
                    decoration="stars"
                />

                {/* Character grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
                >
                    {characters.map((char) => (
                        <motion.div key={char.slug} variants={fadeInUp}>
                            <CharacterCard character={char} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Color chip legend */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 flex flex-wrap justify-center gap-2"
                >
                    {characters.map((char) => (
                        <span
                            key={char.slug}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                            style={{ backgroundColor: char.color }}
                        >
                            {char.animalEmoji} {char.name}
                        </span>
                    ))}
                </motion.div>

                {/* Bottom tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-10 text-center text-maeul-soft-gray font-body italic max-w-2xl mx-auto leading-relaxed text-sm"
                >
                    마음마을 친구들은 서로 다르지만, 함께 있을 때 가장 행복해요.
                    친구들의 이야기를 읽으며 여러분의 마음도 함께 가꿔보세요!
                </motion.p>
            </div>
        </div>
    );
};

export default CharactersPage;
