"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { characters } from '@/data/characters';
import { stories } from '@/data/stories';
import { coloringPages } from '@/data/coloringPages';
import SectionTitle from '@/components/shared/SectionTitle';
import StoryCard from '@/components/shared/StoryCard';
import ColoringCard from '@/components/shared/ColoringCard';
import MagicButton from '@/components/shared/MagicButton';
import FloatingElements from '@/components/shared/FloatingElements';
import * as Silhouettes from '@/components/illustrations/CharacterSilhouettes';
import { ArrowLeft, Heart, Target, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const CharacterDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const character = characters.find(c => c.slug === slug);

    if (!character) {
        return <div className="p-20 text-center">친구를 찾을 수 없어요!</div>;
    }

    const relatedStories = stories.filter(s => s.mainCharacter === slug);
    const relatedColoring = coloringPages.filter(p => p.character === slug);
    const Silhouette = (Silhouettes as any)[`${character.slug.charAt(0).toUpperCase() + character.slug.slice(1)}Silhouette`] || Silhouettes.DaonSilhouette;

    return (
        <div className="relative min-h-screen pb-24 bg-maeul-cream/10">
            <FloatingElements density="low" elements={['leaf', 'star']} />

            {/* Hero Header */}
            <div
                className="w-full pt-32 pb-20 px-4 md:px-8 relative overflow-hidden"
                style={{ backgroundColor: character.colorLight }}
            >
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <button
                        onClick={() => router.back()}
                        className="absolute top-0 left-0 p-3 bg-white/50 rounded-full hover:bg-white transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-48 h-64 md:w-64 md:h-80 flex-shrink-0"
                    >
                        <Silhouette color={character.color} className="w-full h-full drop-shadow-2xl" />
                    </motion.div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-block px-4 py-1 rounded-full bg-white/50 text-maeul-charcoal/60 font-bold text-sm mb-4">
                            {character.animal} 친구
                        </div>
                        <h1 className="text-4xl md:text-6xl font-title text-maeul-charcoal mb-4">
                            {character.name}
                        </h1>
                        <div className="text-xl md:text-2xl font-body italic text-maeul-charcoal/80 mb-6 relative inline-block">
                            "{character.quote}"
                            <Sparkles className="absolute -top-4 -right-8 text-maeul-gold" size={20} />
                        </div>
                        <p className="text-lg leading-relaxed text-maeul-charcoal/70 max-w-2xl">
                            {character.description}
                        </p>
                    </div>
                </div>

                {/* Decorative clouds move across */}
                <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
                    <Sparkles className="w-full h-full text-white" />
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column - Profile Card */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-8 rounded-[40px] shadow-storybook border-2 border-maeul-warm-white">
                            <h3 className="text-xl font-title mb-6 flex items-center gap-2">
                                <Heart className="text-maeul-coral" size={24} />
                                프로필 카드
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-maeul-soft-gray uppercase tracking-wider block mb-1">담당 역할</label>
                                    <div className="font-bold text-maeul-charcoal">{character.role}</div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-maeul-soft-gray uppercase tracking-wider block mb-1">장점</label>
                                    <div className="text-maeul-charcoal">{character.strength}</div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-maeul-soft-gray uppercase tracking-wider block mb-1">성장 과제</label>
                                    <div className="text-maeul-charcoal">{character.growthArea}</div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-maeul-soft-gray uppercase tracking-wider block mb-1">성격</label>
                                    <div className="text-maeul-charcoal">{character.personality}</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[40px] shadow-storybook border-2 border-maeul-warm-white">
                            <h3 className="text-xl font-title mb-6 flex items-center gap-2">
                                <Target className="text-maeul-gold" size={24} />
                                좋아하는 것
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {character.likes.map(like => (
                                    <span key={like} className="px-3 py-1 bg-maeul-gold/10 text-maeul-charcoal text-sm font-bold rounded-lg border border-maeul-gold/20">
                                        {like}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[40px] shadow-storybook border-2 border-maeul-warm-white">
                            <h3 className="text-xl font-title mb-4 flex items-center gap-2">
                                <MapPin className="text-maeul-leaf" size={24} />
                                사는 곳
                            </h3>
                            <div className="text-maeul-charcoal font-bold mb-2">{character.space}</div>
                            <div className="aspect-square bg-maeul-leaf/5 rounded-2xl flex items-center justify-center border border-maeul-leaf/10">
                                <div className="text-4xl">🏡</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Related Content */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Related Stories */}
                        <div>
                            <SectionTitle title={`${character.name}의 이야기`} align="left" className="!mb-8" />
                            {relatedStories.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {relatedStories.map(story => (
                                        <StoryCard key={story.slug} story={story} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-maeul-soft-gray italic">곧 이야기가 공개될 예정이에요!</p>
                            )}
                        </div>

                        {/* Related Coloring */}
                        <div>
                            <SectionTitle title={`${character.name} 색칠하기`} align="left" className="!mb-8" />
                            {relatedColoring.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {relatedColoring.map(page => (
                                        <ColoringCard key={page.slug} page={page} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-maeul-soft-gray italic">도안이 준비 중이에요.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Nav */}
                <div className="mt-24 pt-12 border-t border-maeul-gold/10 flex justify-between items-center">
                    <MagicButton href="/characters" variant="secondary" size="sm">
                        ← 목록으로 돌아가기
                    </MagicButton>

                    <div className="flex gap-2">
                        {characters.map(c => (
                            <Link
                                key={c.slug}
                                href={`/characters/${c.slug}`}
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                    c.slug === slug ? "ring-2 ring-maeul-gold scale-125 z-10" : "opacity-30 hover:opacity-100"
                                )}
                                style={{ backgroundColor: c.colorLight }}
                            >
                                <span className="text-xl">{c.animalEmoji}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetailPage;
