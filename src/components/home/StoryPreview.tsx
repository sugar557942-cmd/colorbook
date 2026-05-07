"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/shared/SectionTitle';
import StoryCard from '@/components/shared/StoryCard';
import CloudDivider from '@/components/shared/CloudDivider';
import MagicButton from '@/components/shared/MagicButton';
import { stories } from '@/data/stories';
import { characters } from '@/data/characters';
import { fadeInUp } from '@/styles/animations';

const StoryPreview = () => {
    const featuredStory = stories[0];
    const otherStories = stories.slice(1, 4);
    const featuredChar = characters.find(c => c.slug === featuredStory.mainCharacter);

    return (
        <section className="relative py-24 bg-gradient-to-b from-white to-maeul-lavender/10 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-maeul-lavender/5 rounded-full blur-[100px] -z-10" />

            {/* Bottom transition into cream ParentsSection */}
            <CloudDivider
                variant="hill"
                color="#FFF8E7"
                className="absolute bottom-0 left-0 w-full translate-y-[60%] opacity-60"
            />

            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <SectionTitle
                    title="오늘은 어떤 이야기를 읽을까요?"
                    subtitle="마음마을 친구들의 이야기 속으로 들어가 보세요"
                    decoration="clouds"
                />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-16 items-center">
                    {/* Featured Story - Left (3 columns on lg) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3 bg-white p-8 md:p-12 rounded-[32px] shadow-storybook flex flex-col md:flex-row gap-8 items-center"
                    >
                        {/* 3D Book Preview */}
                        <div className="perspective-1000 w-48 h-64 md:w-64 md:h-80 flex-shrink-0">
                            <motion.div
                                whileHover={{ rotateY: -25, rotateX: 5 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                className="w-full h-full shadow-2xl rounded-sm relative preserve-3d"
                                style={{ backgroundColor: featuredChar?.color || '#FFD93D' }}
                            >
                                <div className="absolute inset-2 border border-white/30 rounded-sm flex flex-col items-center justify-center text-center p-4">
                                    <span className="text-6xl mb-4">{featuredChar?.animalEmoji}</span>
                                    <h4 className="font-title text-white text-lg leading-tight">{featuredStory.title}</h4>
                                </div>
                                {/* Book Spine Shadow */}
                                <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/20" />
                            </motion.div>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="inline-block px-3 py-1 bg-maeul-gold text-maeul-charcoal text-xs font-bold rounded-full mb-4">
                                ✨ 이달의 추천 이야기
                            </div>
                            <h3 className="text-3xl font-title text-maeul-charcoal mb-4">
                                {featuredStory.title}
                            </h3>
                            <p className="text-maeul-soft-gray mb-6 leading-relaxed">
                                {featuredStory.summary}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {featuredStory.educationTag.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-maeul-lavender/20 text-maeul-lavender font-bold text-xs rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <MagicButton href={`/stories/${featuredStory.slug}`} size="md" sparkle>
                                미리 읽어보기 📖
                            </MagicButton>
                        </div>
                    </motion.div>

                    {/* Other Stories - Right (2 columns on lg) */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <h4 className="text-xl font-title text-maeul-charcoal/60 mb-2">다른 이야기들도 있어요</h4>
                        {otherStories.map((story, i) => (
                            <motion.div
                                key={story.slug}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <StoryCard story={story} className="flex-row !items-start gap-4 p-4 !shadow-sm hover:!shadow-md" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <MagicButton href="/stories" variant="secondary">
                        모든 이야기 보러 가기 →
                    </MagicButton>
                </div>
            </div>
        </section>
    );
};

export default StoryPreview;
