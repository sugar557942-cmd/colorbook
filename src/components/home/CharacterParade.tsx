"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/shared/SectionTitle';
import CharacterCard from '@/components/shared/CharacterCard';
import CloudDivider from '@/components/shared/CloudDivider';
import MagicButton from '@/components/shared/MagicButton';
import { characters } from '@/data/characters';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CARD_W = 260; // px — md:w-[260px]
const GAP = 24;

const CharacterParade = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const totalScrollWidth = characters.length * (CARD_W + GAP) - GAP;

    const updateButtons = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 8);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('scroll', updateButtons, { passive: true });
        updateButtons();
        return () => el.removeEventListener('scroll', updateButtons);
    }, []);

    const scroll = (dir: 'left' | 'right') => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollBy({ left: dir === 'left' ? -(CARD_W + GAP) * 2 : (CARD_W + GAP) * 2, behavior: 'smooth' });
    };

    return (
        <section className="relative py-20 bg-white overflow-hidden">
            <CloudDivider
                variant="cloud"
                color="#FFFFFF"
                flip
                className="absolute top-0 left-0 w-full -translate-y-full opacity-60"
            />

            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <SectionTitle
                    title="마음마을 친구들을 만나 보세요!"
                    subtitle="저마다 다른 재능과 고민을 가진 일곱 친구들이에요"
                    decoration="stars"
                />

                {/* Carousel */}
                <div className="relative mt-12 pb-4">
                    {/* Prev button */}
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-100 disabled:opacity-0 transition-opacity hover:shadow-lg"
                    >
                        <ChevronLeft size={20} className="text-maeul-charcoal" />
                    </button>

                    {/* Next button */}
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-100 disabled:opacity-0 transition-opacity hover:shadow-lg"
                    >
                        <ChevronRight size={20} className="text-maeul-charcoal" />
                    </button>

                    {/* Side fades */}
                    <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                    <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

                    {/* Scroll container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-8 cursor-grab active:cursor-grabbing"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {characters.map((char, i) => (
                            <motion.div
                                key={char.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="flex-shrink-0 w-[220px] md:w-[260px]"
                            >
                                <CharacterCard character={char} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <MagicButton href="/characters" variant="secondary">
                        모든 친구들 만나러 가기 →
                    </MagicButton>
                </div>
            </div>

            <CloudDivider
                variant="hill"
                color="#FFF8E7"
                className="absolute bottom-0 left-0 w-full translate-y-full"
            />
        </section>
    );
};

export default CharacterParade;
