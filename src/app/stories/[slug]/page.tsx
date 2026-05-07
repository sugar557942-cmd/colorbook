"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { stories } from '@/data/stories';
import { characters } from '@/data/characters';
import { coloringPages } from '@/data/coloringPages';
import MagicButton from '@/components/shared/MagicButton';
import ColoringCard from '@/components/shared/ColoringCard';
import FloatingElements from '@/components/shared/FloatingElements';
import { ArrowLeft, ArrowRight, BookOpen, Info, Heart, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// 이야기별 실제 페이지 데이터
const STORY_PAGES: Record<string, { text: string; bg: string }[]> = {
    'daon-weather': [
        {
            text: "마음마을에 해가 쨍쨍 내리쬐는 어느 날이었어요. 다온이는 창문 밖을 바라보며 생각했어요. '오늘 내 마음은 어떤 날씨일까?'",
            bg: "from-sky-50 to-blue-50",
        },
        {
            text: "어제는 친구와 싸워서 먹구름이 가득했어요. 그런데 오늘 아침, 하루가 텃밭에서 딴 딸기를 한 바구니 가져왔어요. 다온이 마음에 살짝 햇살이 비치기 시작했어요.",
            bg: "from-orange-50 to-yellow-50",
        },
        {
            text: "'다온아, 오늘 기분이 어때?' 하루가 물었어요. 다온이는 잠시 생각했어요. '음… 먹구름이 조금 있지만, 해도 보여.' 정직하게 말하는 게 왜인지 마음이 후련했어요.",
            bg: "from-green-50 to-emerald-50",
        },
        {
            text: "그날 오후, 다온이는 종이에 자신의 마음 날씨를 그렸어요. 반반 구름, 반반 햇살. '내 마음은 언제나 이렇게 복잡해도 괜찮아.' 다온이가 중얼거렸어요.",
            bg: "from-purple-50 to-pink-50",
        },
        {
            text: "저녁이 되자 친구들이 다온이 집 앞에 모였어요. 저마다 오늘의 마음 날씨를 그린 종이를 들고서요. 맑음, 비, 무지개, 안개…  모두 달랐지만 모두 소중했어요.",
            bg: "from-yellow-50 to-amber-50",
        },
        {
            text: "마음의 날씨는 매일 달라도 괜찮아요. 흐린 날이 있어야 맑은 날이 더 빛나니까요. 오늘 여러분의 마음 날씨는 어떤가요?",
            bg: "from-maeul-sky/10 to-maeul-gold/10",
        },
    ],
};

const DEFAULT_PAGES = [
    { text: "마음마을의 이야기가 이곳에 펼쳐져요. 친구들과 함께 웃고, 때로는 고민하면서 마음이 자라나는 이야기예요.", bg: "from-maeul-lavender/10 to-maeul-sky/10" },
    { text: "이야기 속 친구는 오늘도 마음마을을 걸어가고 있어요. 어떤 일이 생길까요? 두 눈 반짝이며 함께 떠나봐요!", bg: "from-maeul-gold/10 to-maeul-coral/10" },
    { text: "( 이 이야기는 곧 완성될 예정이에요! 기다려 주셔서 감사해요 🌱 )", bg: "from-gray-50 to-slate-50" },
];

const StoryReaderPage = () => {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const story = stories.find(s => s.slug === slug);
    const [currentPage, setCurrentPage] = useState(0);
    const [showGuide, setShowGuide] = useState(false);

    if (!story) {
        return <div className="p-20 text-center">동화를 찾을 수 없어요!</div>;
    }

    const char = characters.find(c => c.slug === story.mainCharacter);
    const pages = STORY_PAGES[slug] ?? DEFAULT_PAGES;
    const totalPages = pages.length;
    const isLastPage = currentPage === totalPages - 1;

    // 이 이야기 주인공의 색칠 도안 + 연결 도안
    const relatedColoring = coloringPages
        .filter(p => p.character === story.mainCharacter || p.slug === coloringPages.find(x => x.relatedStory === slug)?.slug)
        .slice(0, 3);

    return (
        <div className="relative min-h-screen bg-maeul-cream/30 overflow-hidden">
            <FloatingElements density="low" elements={['star']} />

            {/* Reader Header */}
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 pt-24 flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                >
                    <ArrowLeft size={22} />
                </button>

                <div className="flex flex-col items-center">
                    <h1 className="text-lg md:text-2xl font-title text-maeul-charcoal">{story.title}</h1>
                    <span className="text-xs text-maeul-soft-gray font-nunito mt-0.5">
                        {currentPage + 1} / {totalPages}
                    </span>
                </div>

                <button
                    onClick={() => setShowGuide(!showGuide)}
                    className={cn(
                        "p-3 rounded-full shadow-sm transition-all",
                        showGuide ? "bg-maeul-lavender text-white" : "bg-white hover:text-maeul-lavender"
                    )}
                >
                    <Info size={20} />
                </button>
            </div>

            {/* Book Viewport */}
            <div className="max-w-[1100px] mx-auto px-4 mt-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className={cn(
                            "relative w-full rounded-[40px] shadow-storybook border-4 border-white overflow-hidden",
                            "bg-gradient-to-br",
                            pages[currentPage]?.bg ?? "from-white to-slate-50"
                        )}
                    >
                        <div className="flex flex-col md:flex-row min-h-[320px] md:min-h-[400px]">
                            {/* Left: Illustration */}
                            <div className="flex-1 flex items-center justify-center p-10 md:p-16 border-b md:border-b-0 md:border-r border-white/50">
                                {currentPage === 0 ? (
                                    <div className="text-center">
                                        <motion.div
                                            animate={{ y: [0, -8, 0] }}
                                            transition={{ repeat: Infinity, duration: 3 }}
                                            className="text-[96px] md:text-[128px] leading-none mb-4"
                                        >
                                            {char?.animalEmoji}
                                        </motion.div>
                                        <p className="font-title text-maeul-charcoal/60 text-sm">글·그림 마음마을</p>
                                    </div>
                                ) : isLastPage ? (
                                    <div className="text-center">
                                        <div className="text-7xl mb-4">🌟</div>
                                        <p className="font-title text-maeul-charcoal/60 text-sm">— 끝 —</p>
                                    </div>
                                ) : (
                                    <div className="w-full h-48 md:h-64 bg-white/40 rounded-3xl border-2 border-dashed border-white/60 flex flex-col items-center justify-center gap-3">
                                        <span className="text-5xl opacity-30">{char?.animalEmoji}</span>
                                        <span className="text-xs text-maeul-soft-gray/50 font-bold uppercase tracking-widest">Illustration</span>
                                    </div>
                                )}
                            </div>

                            {/* Right: Text */}
                            <div className="flex-1 flex flex-col items-center justify-center p-10 md:p-16 relative">
                                <p className="text-lg md:text-xl font-body leading-relaxed text-maeul-charcoal/80 text-center max-w-sm">
                                    {pages[currentPage]?.text}
                                </p>

                                {/* Edu tags on last page */}
                                {isLastPage && (
                                    <div className="mt-8 flex flex-wrap gap-2 justify-center">
                                        {story.educationTag.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-maeul-lavender/20 text-maeul-lavender text-xs font-bold rounded-full">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Nav arrows (inside right panel) */}
                                <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                                    <button
                                        onClick={() => setCurrentPage(p => p - 1)}
                                        disabled={currentPage === 0}
                                        className="pointer-events-auto p-3 bg-white/70 rounded-full hover:bg-white disabled:opacity-0 transition-all shadow-sm"
                                    >
                                        <ArrowLeft size={18} />
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(p => p + 1)}
                                        disabled={currentPage === totalPages - 1}
                                        className="pointer-events-auto p-3 bg-white/70 rounded-full hover:bg-white disabled:opacity-0 transition-all shadow-sm"
                                    >
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Progress bar */}
                <div className="mt-8 max-w-sm mx-auto h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-maeul-gold rounded-full"
                        animate={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Dot indicators */}
                <div className="mt-4 flex justify-center gap-2">
                    {pages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={cn(
                                "rounded-full transition-all",
                                i === currentPage ? "w-5 h-2 bg-maeul-gold" : "w-2 h-2 bg-slate-200 hover:bg-maeul-gold/50"
                            )}
                        />
                    ))}
                </div>

                {/* ── 마지막 페이지: 색칠 CTA ── */}
                <AnimatePresence>
                    {isLastPage && relatedColoring.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-16 bg-gradient-to-r from-maeul-gold/20 to-maeul-coral/10 rounded-[40px] p-8 md:p-10 border border-maeul-gold/20"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-3xl">🎨</span>
                                <div>
                                    <h3 className="font-title text-xl text-maeul-charcoal">이야기를 다 읽었나요?</h3>
                                    <p className="text-sm text-maeul-soft-gray mt-0.5">
                                        {char?.name}와 함께하는 색칠 도안으로 이야기를 더 생생하게 만들어 보세요!
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                                {relatedColoring.map(p => (
                                    <ColoringCard key={p.slug} page={p} />
                                ))}
                            </div>
                            <div className="text-center">
                                <MagicButton href="/coloring" variant="secondary" size="sm">
                                    <Palette size={15} className="mr-1" />
                                    색칠 도안 전체 보기 →
                                </MagicButton>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Parents Guide Sidebar */}
            <AnimatePresence>
                {showGuide && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[380px] bg-white z-[100] shadow-2xl overflow-y-auto"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-title text-maeul-charcoal flex items-center gap-2">
                                    <Heart className="text-maeul-coral" fill="currentColor" size={20} />
                                    부모님 가이드
                                </h3>
                                <button
                                    onClick={() => setShowGuide(false)}
                                    className="p-2 hover:bg-slate-100 rounded-full text-maeul-soft-gray"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-4 bg-maeul-gold/10 rounded-2xl border border-maeul-gold/20 mb-6">
                                <h4 className="font-bold text-maeul-charcoal text-sm mb-3">이 이야기의 교육 포인트</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {story.educationTag.map(tag => (
                                        <span key={tag} className="px-2.5 py-1 bg-white rounded-lg text-xs font-bold text-maeul-gold border border-maeul-gold/20">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8">
                                <h4 className="font-bold text-maeul-charcoal mb-4 flex items-center gap-2">
                                    <BookOpen size={16} className="text-maeul-lavender" />
                                    아이와 나누는 대화
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        "이 친구는 지금 어떤 기분일 것 같아?",
                                        "네가 이 친구였다면 어떻게 했을까?",
                                        "오늘 우리 아이의 마음은 어떤 색깔인지 말해볼까?",
                                    ].map((q, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-maeul-soft-gray leading-relaxed p-3 bg-maeul-lavender/5 rounded-2xl">
                                            <span className="text-maeul-coral font-bold flex-shrink-0">{i + 1}.</span>
                                            {q}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {relatedColoring.length > 0 && (
                                <div className="pt-6 border-t border-slate-100">
                                    <h4 className="font-bold text-maeul-charcoal text-sm mb-3">연결 색칠 도안</h4>
                                    <div className="space-y-2">
                                        {relatedColoring.map(p => (
                                            <Link
                                                key={p.slug}
                                                href={`/coloring/${p.slug}`}
                                                className="flex items-center gap-3 p-3 bg-maeul-coral/5 rounded-2xl hover:bg-maeul-coral/10 transition-colors"
                                            >
                                                <img src={p.svgPath} alt={p.title} className="w-12 h-12 object-contain rounded-lg bg-white" />
                                                <span className="text-sm font-bold text-maeul-charcoal">{p.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-8">
                                <MagicButton href="/parents" variant="secondary" size="sm" className="w-full">
                                    발달 전문가 팁 더보기
                                </MagicButton>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StoryReaderPage;
