"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/shared/SectionTitle';
import StoryCard from '@/components/shared/StoryCard';
import FloatingElements from '@/components/shared/FloatingElements';
import { stories } from '@/data/stories';
import { characters } from '@/data/characters';
import { staggerContainer, fadeInUp } from '@/styles/animations';
import { cn } from '@/lib/utils';
import { Book, Filter } from 'lucide-react';
import MagicButton from '@/components/shared/MagicButton';

const StoriesListPage = () => {
    const [activeChar, setActiveChar] = useState<string>('all');

    const filteredStories = stories.filter(story => {
        return activeChar === 'all' || story.mainCharacter === activeChar;
    });

    return (
        <div className="relative min-h-screen py-24 px-4 md:px-8 bg-maeul-lavender/5 overflow-hidden">
            <FloatingElements density="low" elements={['star', 'butterfly']} />

            <div className="max-w-[1440px] mx-auto">
                <SectionTitle
                    title="마음마을 동화책"
                    subtitle="친구들의 이야기를 통해 지혜와 용기를 배워요"
                    decoration="clouds"
                />

                {/* Filter Bar */}
                <div className="mt-12 sticky top-24 z-30 bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-maeul-lavender/10 flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex items-center gap-2 text-maeul-lavender font-bold px-2">
                        <Filter size={18} />
                        <span className="text-sm">친구별로 보기</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setActiveChar('all')}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-bold transition-all",
                                activeChar === 'all' ? "bg-maeul-lavender text-white" : "bg-white text-maeul-soft-gray hover:bg-maeul-lavender/10"
                            )}
                        >
                            전체보기
                        </button>
                        {characters.map(char => (
                            <button
                                key={char.slug}
                                onClick={() => setActiveChar(char.slug)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all",
                                    activeChar === char.slug ? "bg-maeul-lavender text-white" : "bg-white text-maeul-soft-gray hover:bg-maeul-lavender/10"
                                )}
                            >
                                <span>{char.animalEmoji}</span>
                                <span>{char.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Library Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeChar}
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {filteredStories.map((story) => (
                            <motion.div key={story.slug} variants={fadeInUp}>
                                <StoryCard story={story} />
                            </motion.div>
                        ))}

                        {filteredStories.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <div className="text-4xl mb-4">📖</div>
                                <div className="text-maeul-soft-gray font-body italic">이야기가 곧 도착할 예정이에요!</div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Call to Action for suggested reading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-12 bg-white rounded-[48px] shadow-storybook border-2 border-maeul-gold/10 flex flex-col items-center text-center"
                >
                    <div className="w-16 h-16 bg-maeul-gold/10 rounded-full flex items-center justify-center text-3xl mb-6">
                        ✨
                    </div>
                    <h3 className="text-2xl font-title text-maeul-charcoal mb-4">어떤 이야기를 먼저 읽을지 고민되나요?</h3>
                    <p className="text-maeul-soft-gray max-w-xl mb-8">
                        마음마을 친구들이 추천하는 이달의 동화를 확인해 보세요. <br />
                        처음 방문하셨다면 '다온이의 첫 번째 친구' 이야기를 추천드려요!
                    </p>
                    <MagicButton href="/stories/daon-weather" sparkle>
                        추천 이야기 바로 읽기
                    </MagicButton>
                </motion.div>
            </div>
        </div>
    );
};

export default StoriesListPage;
