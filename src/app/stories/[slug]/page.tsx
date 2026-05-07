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
import { STORY_ILLUSTRATIONS } from '@/components/illustrations/StoryIllustrations';

// 이야기별 실제 페이지 데이터
const STORY_PAGES: Record<string, { text: string; bg: string }[]> = {
    /* ── 1화: 다온이의 마음 날씨 ── */
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
            text: "저녁이 되자 친구들이 다온이 집 앞에 모였어요. 저마다 오늘의 마음 날씨를 그린 종이를 들고서요. 맑음, 비, 무지개, 안개… 모두 달랐지만 모두 소중했어요.",
            bg: "from-yellow-50 to-amber-50",
        },
        {
            text: "마음의 날씨는 매일 달라도 괜찮아요. 흐린 날이 있어야 맑은 날이 더 빛나니까요. 오늘 여러분의 마음 날씨는 어떤가요?",
            bg: "from-sky-100 to-yellow-50",
        },
    ],

    /* ── 2화: 나리의 뚝딱뚝딱 발명품 ── */
    'nari-invention': [
        {
            text: "마음마을 배움터 옆 나리의 작업실엔 온갖 부품이 가득했어요. 오늘 나리는 특별한 발명품을 만들기로 결심했어요. '두근두근 축제에서 모두를 깜짝 놀라게 해줄 거야!'",
            bg: "from-orange-50 to-amber-50",
        },
        {
            text: "나리는 밤새 '마음마을 과일 분류 기계'를 만들었어요. 두근거리는 마음으로 시범을 보이는 순간, 기어가 빠르게 돌다가… 쾅! 과일이 사방팔방으로 날아갔어요.",
            bg: "from-red-50 to-orange-50",
        },
        {
            text: "나리는 창고 구석에 숨어 버렸어요. '이렇게 실패하다니. 나는 정말 못난 발명가야.' 귀가 축 처지고, 뜨거운 눈물이 주르르 흘렀어요.",
            bg: "from-slate-50 to-blue-50",
        },
        {
            text: "다온이가 창고 문을 조용히 두드렸어요. '나리야, 실패는 발명의 절반이래. 혹시 친구들한테 도움을 구해볼까?' 나리는 고개를 들었어요. '그래도 될까…?'",
            bg: "from-yellow-50 to-green-50",
        },
        {
            text: "친구들이 하나씩 아이디어를 냈어요. 느루는 '여기 기어가 너무 빠른 것 같아'라고, 하루는 '과일 사이에 쿠션을 넣으면 어떨까?'라고 했어요. 나리는 메모지에 바쁘게 적었어요.",
            bg: "from-emerald-50 to-teal-50",
        },
        {
            text: "새 기계가 완성됐어요. 이번엔 과일들이 사이좋게 줄을 서서 통 속으로 쏙쏙 들어갔어요! '혼자 만든 것보다 훨씬 멋진 발명이야.' 나리는 활짝 웃으며 친구들과 손을 맞잡았어요.",
            bg: "from-amber-50 to-yellow-50",
        },
    ],

    /* ── 3화: 하루와 어울림 축제 ── */
    'haru-festival': [
        {
            text: "마음마을에 1년 중 가장 신나는 날이 왔어요! 어울림 축제예요. 하루는 모두가 즐거운 축제를 만들기 위해 이리저리 바쁘게 뛰어다녔어요.",
            bg: "from-green-50 to-emerald-50",
        },
        {
            text: "그런데 친구들이 서로 자기 의견만 주장했어요. '음악 공연이 최고야!' '아니야, 음식 잔치가 먼저지!' 하루는 모두를 달래느라 진땀을 뺐어요. '나는… 어떻게 하면 좋지?'",
            bg: "from-yellow-50 to-orange-50",
        },
        {
            text: "저녁이 되자 하루는 텃밭 언덕에 혼자 앉았어요. '모두를 기쁘게 하려다 나도, 친구들도 지쳐버렸어.' 하루의 귀가 시무룩하게 내려앉았어요.",
            bg: "from-slate-50 to-green-50",
        },
        {
            text: "다음 날 아침, 하루는 용기를 내어 솔직하게 말했어요. '나 혼자선 못 할 것 같아. 다 같이 역할을 나눠 보자.' 친구들은 잠시 조용해졌다가, 천천히 고개를 끄덕였어요.",
            bg: "from-teal-50 to-cyan-50",
        },
        {
            text: "나리는 무대를 꾸미고, 지우는 진행표를 썼어요. 소리는 노래를 부르고, 느루는 음식을 준비하고, 라온은 마을 친구들을 반갑게 맞았어요. 다온이는 지친 친구 곁에서 조용히 응원했어요.",
            bg: "from-lime-50 to-green-50",
        },
        {
            text: "축제는 마음마을 역사상 가장 반짝이는 밤이 됐어요. 하루는 일기에 꾹꾹 눌러 썼어요. '혼자 다 하려 하면 지치지만, 함께 나누면 모두가 빛난다.'",
            bg: "from-emerald-50 to-yellow-50",
        },
    ],

    /* ── 4화: 지우의 완벽한 하루 계획 ── */
    'jiu-plan': [
        {
            text: "지우는 오늘의 계획을 메모장에 빼곡히 적었어요. '6시 기상, 7시 독서, 10시 도서관 정리, 2시 별 관측 준비…' 완벽한 계획을 보며 지우는 흐뭇하게 웃었어요.",
            bg: "from-indigo-50 to-blue-50",
        },
        {
            text: "오전은 완벽했어요. 7시 정각에 책을 펼치고, 10시에 도서관 먼지를 닦았어요. '역시 계획대로 되는 게 제일 좋아.' 지우는 메모에 체크를 하나씩 해나갔어요.",
            bg: "from-sky-50 to-indigo-50",
        },
        {
            text: "그런데 갑자기 라온이 숨차게 날아왔어요. '지우야, 나 용기의 다리에서 길을 잃었어! 도와줘!' 지우는 메모장을 내려다보며 잠시 망설였어요. '지금 계획이 어긋나는데…'",
            bg: "from-yellow-50 to-amber-50",
        },
        {
            text: "'잠깐만.' 지우는 깊게 숨을 들이쉬었어요. '라온을 먼저 돕자. 계획은 내가 만든 거니까, 내가 바꿀 수도 있어.' 지우는 안경을 고쳐 쓰고 힘차게 날았어요.",
            bg: "from-teal-50 to-sky-50",
        },
        {
            text: "지우는 라온을 무사히 집까지 데려다줬어요. 라온이 '고마워 지우야, 최고야!'라며 꼭 안아줬어요. 지우는 낯설지만 아주 따뜻한 기분을 느꼈어요.",
            bg: "from-purple-50 to-indigo-50",
        },
        {
            text: "지우는 메모장 맨 뒷장에 새 메모를 추가했어요. '예상치 못한 일: 제일 좋은 일이 되기도 함.' 계획은 삶을 돕는 도구이지만, 삶은 계획보다 훨씬 넓다는 걸 지우는 그날 알았어요.",
            bg: "from-blue-50 to-violet-50",
        },
    ],

    /* ── 5화: 소리의 무지개 공방 ── */
    'sori-rainbow': [
        {
            text: "마음마을 무지개 공방 2층 다락방에는 소리의 보물 같은 그림들이 가득했어요. 소리는 오늘도 열심히 붓을 들었어요. '이 색이야! 딱 이 색이 내 기분이야!'",
            bg: "from-pink-50 to-rose-50",
        },
        {
            text: "그때였어요. 하루가 신나게 뛰어 들어오다가 — 쾅! 소리의 그림판이 바닥에 떨어졌어요. 애써 그린 그림이 엉망이 되어버렸어요. 소리의 눈이 활활 타오르는 것 같았어요.",
            bg: "from-red-50 to-orange-50",
        },
        {
            text: "소리는 붓을 탁 내려놓고 큰 소리로 외쳤어요. 하루는 놀라서 울음을 터트렸어요. 그제야 소리도 자기가 한 행동에 마음이 무거워졌어요. '나는 왜 이럴까…'",
            bg: "from-slate-50 to-pink-50",
        },
        {
            text: "한참 뒤, 지우가 조용히 다락방 문을 두드렸어요. '소리야, 지금 어떤 기분이야? 화가 났어? 슬퍼?' 지우의 목소리가 다락방을 따뜻하게 채웠어요.",
            bg: "from-purple-50 to-indigo-50",
        },
        {
            text: "지우가 책에서 읽은 이야기를 들려줬어요. '감정을 그림으로 표현해봐. 화는 붉은 소용돌이처럼, 슬픔은 파란 빗방울처럼.' 소리는 새 종이를 꺼내 붓을 들었어요.",
            bg: "from-amber-50 to-yellow-50",
        },
        {
            text: "소리는 하루에게 달려가 꼭 안아줬어요. '미안해. 화가 나도 너를 다치게 하면 안 됐는데.' 둘은 함께 새 그림을 그렸어요. 소리는 오늘 새로운 붓질을 배웠어요. 감정을 건강하게 표현하는 붓질이요.",
            bg: "from-rose-50 to-pink-50",
        },
    ],

    /* ── 6화: 느루의 느린 정원 ── */
    'neuru-garden': [
        {
            text: "따스한 봄날 아침, 느루는 텃밭에 씨앗을 심었어요. 하나하나 구멍을 파고, 씨앗을 넣고, 흙을 살살 덮고. 그때 나리가 쏜살같이 달려왔어요. '느루야, 벌써 씨앗을 심고 있었어? 나는 다 심었는데!'",
            bg: "from-green-50 to-emerald-50",
        },
        {
            text: "친구들이 놀이터에서 뛰어노는 동안, 느루는 혼자 길을 터벅터벅 걷고 있었어요. '나는 왜 이렇게 느릴까. 나도 빠르면 좋겠는데…' 등껍질이 오늘따라 조금 더 무겁게 느껴졌어요.",
            bg: "from-slate-50 to-teal-50",
        },
        {
            text: "어느 날 오후, 갑자기 먹구름이 몰려오며 큰 비가 쏟아졌어요. 친구들은 모두 안으로 뛰어 들어갔어요. 하지만 느루는 텃밭으로 달려가 등껍질로 어린 모종들을 꼭 감싸 안아줬어요.",
            bg: "from-sky-100 to-blue-100",
        },
        {
            text: "며칠이 지났어요. 다온이가 텃밭에 나와 눈이 동그래졌어요. 느루의 텃밭에만 잎이 반짝반짝 빛나고 있었거든요. 다른 친구들 텃밭의 모종은 비에 쓰러져 있었어요. '느루야, 네 식물이 제일 튼튼해!'",
            bg: "from-lime-50 to-green-50",
        },
        {
            text: "마음마을 텃밭 자랑 잔치 날, 느루의 정원은 알록달록한 꽃과 채소로 가득했어요. 마을 어른이 말씀하셨어요. '마음마을에서 가장 예쁜 정원을 가꾼 건 느루야!' 친구들이 박수를 쳤어요.",
            bg: "from-yellow-50 to-amber-50",
        },
        {
            text: "저녁, 느루는 돌집 앞에 앉아 정원을 바라봤어요. 별들이 하나둘 떠올랐어요. '빠르지 않아도 괜찮아. 나는 나만의 속도로, 꾸준히 하면 돼.' 느루의 등껍질 위 꽃무늬가 달빛에 조용히 빛났어요.",
            bg: "from-teal-50 to-cyan-50",
        },
    ],

    /* ── 7화: 라온이의 용기의 다리 ── */
    'raon-bridge': [
        {
            text: "라온이는 오늘도 하늘 전망대에 올라 멀리 바라봤어요. 저 멀리 용기의 다리가 아스라이 보였어요. '저 너머엔 뭐가 있을까? 언제쯤 가볼 수 있을까?'",
            bg: "from-sky-50 to-blue-50",
        },
        {
            text: "다리 앞에 서면 발이 멈춰버렸어요. 두근두근, 다리가 후들후들 떨렸어요. '나는 왜 높이 날지도 못하고, 용기도 없을까.' 라온이는 풀 죽어 전망대로 돌아왔어요.",
            bg: "from-yellow-50 to-amber-50",
        },
        {
            text: "지우의 도서관에서 라온이는 두꺼운 책을 발견했어요. 용기의 다리 너머에 다양한 친구들이 산다는 이야기였어요. '느리게 걷는 친구, 멀리 볼 수 없는 친구… 모두 다 달라도 사이좋게 산다고?'",
            bg: "from-indigo-50 to-violet-50",
        },
        {
            text: "다음 날 새벽, 라온이는 혼자 다리 앞에 섰어요. 발이 떨렸지만 한 발을 내딛었어요. '할 수 있어!' 한 발, 두 발, 세 발… 눈을 꼭 감고 걷다 보니 어느새 다리 끝에 서 있었어요.",
            bg: "from-teal-50 to-green-50",
        },
        {
            text: "다리 너머 풀숲에서 작은 달팽이가 나왔어요. '안녕? 나는 달리야!' 달리는 라온이보다 훨씬 느렸지만, 이야기는 누구보다 재미있었어요. 둘은 해가 질 때까지 함께 놀았어요.",
            bg: "from-emerald-50 to-teal-50",
        },
        {
            text: "라온이는 친구들에게 달려가 신나게 말했어요. '다리 너머에 달리라는 친구가 있어! 나랑 완전 달랐는데, 그래서 더 재밌었어!' 라온이의 눈이 별처럼 반짝였어요. '다르다는 건 신기하고 멋진 거야!'",
            bg: "from-yellow-50 to-orange-50",
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

    // 이야기 일러스트 컴포넌트 (현재 페이지)
    const IllustComp = STORY_ILLUSTRATIONS[slug]?.[currentPage];

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
                            <div className="flex-1 flex items-center justify-center p-6 md:p-10 border-b md:border-b-0 md:border-r border-white/50">
                                {IllustComp ? (
                                    <div className="w-full flex flex-col items-center gap-2">
                                        <IllustComp className="w-full h-auto rounded-2xl drop-shadow-sm" />
                                        {currentPage === 0 && (
                                            <p className="font-title text-maeul-charcoal/50 text-xs">글·그림 마음마을</p>
                                        )}
                                        {isLastPage && (
                                            <p className="font-title text-maeul-charcoal/50 text-xs">— 끝 —</p>
                                        )}
                                    </div>
                                ) : currentPage === 0 ? (
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
