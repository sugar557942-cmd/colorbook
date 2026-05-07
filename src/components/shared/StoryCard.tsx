"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Story } from '@/types';
import { characters } from '@/data/characters';

interface StoryCardProps {
    story: Story;
    className?: string;
}

const StoryCard = ({ story, className }: StoryCardProps) => {
    const mainChar = characters.find(c => c.slug === story.mainCharacter);

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className={cn(
                "group relative flex flex-col items-center bg-white rounded-3xl overflow-hidden transition-all duration-300 shadow-storybook hover:shadow-float",
                className
            )}
        >
            <Link href={`/stories/${story.slug}`} className="w-full flex flex-col">
                {/* Cover Image Placeholder */}
                <div className="relative aspect-[3/4] w-full bg-maeul-lavender/10 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Simple book-like representation */}
                        <div
                            className="w-1/2 h-2/3 shadow-2xl rounded-sm relative overflow-hidden"
                            style={{ backgroundColor: mainChar?.color || '#FFD93D' }}
                        >
                            <div className="absolute top-2 left-2 right-2 bottom-2 border border-white/30 rounded-sm flex items-center justify-center">
                                <span className="text-4xl">{mainChar?.animalEmoji || '📖'}</span>
                            </div>
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/10" />
                        </div>
                    </div>

                    {/* Episode Badge */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-maeul-gold flex items-center justify-center font-title text-maeul-charcoal text-sm shadow-sm ring-2 ring-white">
                        {story.episode}
                    </div>
                </div>

                {/* Info Area */}
                <div className="p-5 bg-maeul-cream/30">
                    <div className="flex flex-wrap gap-1 mb-2">
                        {story.educationTag.map(tag => (
                            <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-maeul-mint/20 text-maeul-charcoal/70">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-lg md:text-xl font-title text-maeul-charcoal line-clamp-1">
                        {story.title}
                    </h3>
                    <p className="text-xs text-maeul-soft-gray mt-2 flex items-center gap-1">
                        <span>{story.difficulty === '함께읽기' ? '👨‍👩‍👧‍👦' : '🧒'}</span>
                        {story.difficulty}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

export default StoryCard;
