"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import MagicButton from '@/components/shared/MagicButton';
import SparkleEffect from '@/components/shared/SparkleEffect';
import Cloud from '@/components/icons/Cloud';
import * as Silhouettes from '@/components/illustrations/CharacterSilhouettes';
import { characters } from '@/data/characters';
import { fadeInUp, staggerContainer } from '@/styles/animations';

const HeroSection = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-b from-maeul-sky/30 to-maeul-cream -z-10" />

            {/* Animated Clouds */}
            <div className="absolute inset-0 pointer-events-none -z-5">
                {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{ x: i % 2 === 0 ? "-20%" : "120%", y: `${i * 15}%` }}
                        animate={{ x: i % 2 === 0 ? "120%" : "-20%" }}
                        transition={{
                            duration: 30 + i * 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 2,
                        }}
                    >
                        <Cloud
                            className="text-white drop-shadow-sm"
                            opacity={0.4 + (i * 0.1)}
                            width={100 + i * 40}
                        />
                    </motion.div>
                ))}
            </div>

            <SparkleEffect />

            {/* Content */}
            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="relative z-10 text-center px-4 max-w-4xl"
            >
                <motion.h1
                    variants={fadeInUp}
                    className="text-4xl md:text-6xl lg:text-7xl font-title text-maeul-charcoal mb-6 leading-tight"
                >
                    <span className="text-maeul-gold inline-block hover:rotate-[-2deg] transition-transform duration-300">마음마을</span>에<br className="md:hidden" /> 오신 것을 환영해요!
                </motion.h1>

                <motion.p
                    variants={fadeInUp}
                    className="text-lg md:text-2xl text-maeul-charcoal/70 mb-10 font-body leading-relaxed"
                >
                    일곱 동물 친구들과 함께 이야기를 읽고,<br />
                    색칠하고, 마음을 키워요.
                </motion.p>

                <motion.div
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <MagicButton href="/coloring" size="lg" sparkle>
                        🎨 무료 색칠공부 시작하기
                    </MagicButton>
                    <MagicButton href="/world" variant="secondary" size="lg">
                        ✨ 마을 구경하기
                    </MagicButton>
                </motion.div>
            </motion.div>

            {/* Bottom Characters & Hills */}
            <div className="absolute bottom-0 left-0 w-full pointer-events-none h-40 md:h-60">
                {/* Layered Hills */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-maeul-leaf/20 rounded-t-[100%] translate-y-1/4 scale-x-110" />
                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-maeul-leaf/10 rounded-t-[100%] translate-y-1/3 scale-x-125 -rotate-2" />

                {/* Characters */}
                <div className="absolute bottom-4 left-0 w-full flex justify-center items-end gap-2 md:gap-6 px-4 pointer-events-auto">
                    {characters.map((char, i) => {
                        const Silhouette = (Silhouettes as any)[`${char.slug.charAt(0).toUpperCase() + char.slug.slice(1)}Silhouette`] || Silhouettes.DaonSilhouette;

                        return (
                            <motion.div
                                key={char.slug}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4 + i * 0.1 }}
                                className="relative group flex flex-col items-center"
                            >
                                {/* Speech Bubble on Hover */}
                                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-max max-w-[150px]">
                                    <div className="bg-white px-3 py-1 rounded-xl shadow-md text-[10px] md:text-xs font-bold text-maeul-charcoal relative">
                                        {char.quote}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                                    </div>
                                </div>

                                <Link href={`/characters/${char.slug}`}>
                                    <motion.div
                                        whileHover={{
                                            y: -20,
                                            scale: 1.1,
                                            transition: { type: "spring", stiffness: 300 }
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <Silhouette
                                            color={char.color}
                                            className={cn(
                                                "w-12 h-16 md:w-20 md:h-28 drop-shadow-lg",
                                                char.slug === 'daon' ? "w-16 h-20 md:w-28 md:h-36" : ""
                                            )}
                                        />
                                    </motion.div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
