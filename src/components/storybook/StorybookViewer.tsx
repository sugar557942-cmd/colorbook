"use client";

/**
 * StorybookViewer  —  진짜 책처럼 펼치고 넘기는 풀스크린 동화책 뷰어
 *
 * 단계 (state machine):
 *   cover    → 닫힌 책 + 펼치기 버튼
 *   opening  → 책 펼치는 인트로 애니메이션 (~1.4s)
 *   reading  → 본문 스프레드, 3D 페이지 플립
 *   ending   → 마지막 페이지 후 끝 화면
 *
 * 기능:
 *   - 좌(이미지) / 우(텍스트) 스프레드 레이아웃
 *   - 3D 페이지 플립 (CSS rotateY)
 *   - 키보드: ← → space esc
 *   - 클릭 영역: 좌/우 화면 끝 클릭으로 이전/다음
 *   - 합성 SFX (Web Audio API): 페이지 넘김 사운드
 *   - 합성 BGM (Web Audio API): 잔잔한 아르페지오
 *   - 책갈피: localStorage에 마지막 페이지 저장
 *   - 모바일: 단일 페이지 모드
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, ArrowRight, X, Volume2, VolumeX,
    Music, Music2, BookOpen, RotateCcw, Home,
} from 'lucide-react';
import type { Storybook } from '@/data/storybooks';

interface Props {
    storybook: Storybook;
}

type Phase = 'cover' | 'reading' | 'ending';

const FLIP_MS = 850;
const OPEN_MS = 1100;   // 표지 → 본문 인트로 애니메이션 길이

export default function StorybookViewer({ storybook }: Props) {
    const router = useRouter();
    const slug = storybook.characterSlug;
    const totalPages = storybook.pages.length;
    const BOOKMARK_KEY = `storybook:${slug}:lastSpread`;

    /* ── 상태 ── */
    const [phase, setPhase]       = useState<Phase>('cover');
    const [spread, setSpread]     = useState(0);
    const [flipping, setFlipping] = useState<'next' | 'prev' | null>(null);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const [bgmOn, setBgmOn]       = useState(true);
    const [sfxOn, setSfxOn]       = useState(true);
    const [showResume, setShowResume] = useState(false);
    const [resumeSpread, setResumeSpread] = useState(0);

    /* ── 오디오 ref ── */
    const audioCtxRef = useRef<AudioContext | null>(null);
    const bgmTimerRef = useRef<number | null>(null);

    /* ── 책갈피: 시작 시 확인 ── */
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const saved = window.localStorage.getItem(BOOKMARK_KEY);
        if (saved) {
            const n = parseInt(saved, 10);
            if (n > 0 && n < totalPages) {
                setResumeSpread(n);
                setShowResume(true);
            }
        }
    }, [BOOKMARK_KEY, totalPages]);

    /* ── 책갈피 저장 ── */
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (phase === 'reading') {
            window.localStorage.setItem(BOOKMARK_KEY, String(spread));
        }
    }, [spread, phase, BOOKMARK_KEY]);

    /* ── 오디오 초기화 (사용자 제스처 후) ── */
    const initAudio = useCallback(() => {
        if (!audioCtxRef.current) {
            const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            if (Ctor) audioCtxRef.current = new Ctor();
        }
    }, []);

    /* ── SFX: 종이 넘김 사운드 ── */
    const playFlipSfx = useCallback(() => {
        if (!sfxOn || !audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;

        // 짧은 노이즈 버스트 + 밴드패스 → 종이 sshhh~ 사운드
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.45, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            const t = i / data.length;
            data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 5) * 0.4;
        }
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2200;
        filter.Q.value = 0.6;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.55, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
        src.start(now); src.stop(now + 0.45);
    }, [sfxOn]);

    /* ── SFX: 표지 펼치기 사운드 (살짝 더 깊게) ── */
    const playOpenSfx = useCallback(() => {
        if (!sfxOn || !audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.9, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            const t = i / data.length;
            data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 3) * 0.35;
        }
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1400;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.85);
        src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
        src.start(now); src.stop(now + 0.9);
    }, [sfxOn]);

    /* ── BGM: 잔잔한 아르페지오 루프 ── */
    const startBgm = useCallback(() => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;

        const playPhrase = () => {
            const t = ctx.currentTime;
            // C major 7th 분산화음 (C-E-G-B-G-E)
            const notes = [261.63, 329.63, 392.00, 493.88, 392.00, 329.63];
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.frequency.value = freq;
                osc.type = 'sine';
                const start = t + i * 0.55;
                gain.gain.setValueAtTime(0, start);
                gain.gain.linearRampToValueAtTime(0.045, start + 0.1);
                gain.gain.exponentialRampToValueAtTime(0.001, start + 1.0);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(start); osc.stop(start + 1.0);
            });
        };
        playPhrase();
        const id = window.setInterval(playPhrase, 3300);
        bgmTimerRef.current = id as unknown as number;
    }, []);

    const stopBgm = useCallback(() => {
        if (bgmTimerRef.current !== null) {
            window.clearInterval(bgmTimerRef.current);
            bgmTimerRef.current = null;
        }
    }, []);

    /* ── BGM on/off 토글 ── */
    useEffect(() => {
        if (phase !== 'reading') return;
        if (bgmOn) startBgm();
        else stopBgm();
        return stopBgm;
    }, [bgmOn, phase, startBgm, stopBgm]);

    /* ── 표지 펼치기 — 직접 본문으로, 본문이 인트로 애니메이션 처리 ── */
    const handleOpen = useCallback((startSpread = 0) => {
        initAudio();
        setSpread(startSpread);
        setShowResume(false);
        playOpenSfx();
        setPhase('reading');
        // BGM은 책이 펼쳐진 후에 시작
        window.setTimeout(() => {
            if (audioCtxRef.current) startBgm();
        }, OPEN_MS - 200);
    }, [initAudio, playOpenSfx, startBgm]);

    /* ── 다음 페이지 ── */
    const goNext = useCallback(() => {
        if (flipping || phase !== 'reading') return;
        if (spread >= totalPages - 1) {
            stopBgm();
            setPhase('ending');
            return;
        }
        setDirection('next');
        playFlipSfx();

        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 720;
        if (isMobile) {
            // 모바일: 즉시 슬라이드, FLIP_MS 대기 X
            setSpread(s => s + 1);
            return;
        }
        // 데스크탑: 3D 플립
        setFlipping('next');
        window.setTimeout(() => {
            setSpread(s => s + 1);
            setFlipping(null);
        }, FLIP_MS);
    }, [flipping, phase, spread, totalPages, playFlipSfx, stopBgm]);

    /* ── 이전 페이지 ── */
    const goPrev = useCallback(() => {
        if (flipping || phase !== 'reading' || spread === 0) return;
        setDirection('prev');
        playFlipSfx();

        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 720;
        if (isMobile) {
            setSpread(s => s - 1);
            return;
        }
        setFlipping('prev');
        window.setTimeout(() => {
            setSpread(s => s - 1);
            setFlipping(null);
        }, FLIP_MS);
    }, [flipping, phase, spread, playFlipSfx]);

    /* ── 닫고 목록으로 ── */
    const handleClose = useCallback(() => {
        stopBgm();
        audioCtxRef.current?.close().catch(() => { /* ignore */ });
        router.push('/stories');
    }, [stopBgm, router]);

    /* ── 다시 읽기 ── */
    const handleRestart = useCallback(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(BOOKMARK_KEY);
        }
        setSpread(0);
        setPhase('cover');
        stopBgm();
    }, [BOOKMARK_KEY, stopBgm]);

    /* ── 키보드 ── */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (phase === 'reading') {
                if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
                else if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
                else if (e.key === 'Escape') { e.preventDefault(); handleClose(); }
            } else if (phase === 'cover') {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpen(0); }
                else if (e.key === 'Escape') { e.preventDefault(); handleClose(); }
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [phase, goNext, goPrev, handleClose, handleOpen]);

    /* ── 언마운트 시 정리 ── */
    useEffect(() => {
        return () => {
            stopBgm();
            audioCtxRef.current?.close().catch(() => { /* ignore */ });
        };
    }, [stopBgm]);

    /* ── 이미지 프리로드 ── */
    useEffect(() => {
        if (phase !== 'reading') return;
        // 다음 2장 프리로드
        for (let i = 1; i <= 2; i++) {
            const next = spread + i;
            if (next < totalPages) {
                const img = new Image();
                img.src = `/stories/${slug}/${storybook.pages[next].imageNumber}.webp`;
            }
        }
    }, [spread, phase, slug, storybook.pages, totalPages]);

    const cur = storybook.pages[spread];
    const next = spread + 1 < totalPages ? storybook.pages[spread + 1] : null;
    const prev = spread - 1 >= 0 ? storybook.pages[spread - 1] : null;

    return (
        <>
            {/* ── 스타일 ── */}
            <style>{`
                .sb-stage {
                    position: fixed;
                    inset: 0;
                    background:
                        radial-gradient(ellipse at center top, #5C3A1E 0%, #2A1A0E 40%, #0E0805 100%);
                    z-index: 9999;
                    overflow: hidden;
                    perspective: 2400px;
                    user-select: none;
                    -webkit-user-select: none;
                    /* flex 중앙 정렬 — framer-motion transform과 충돌 안 함 */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                /* 책 무대 — 따뜻한 조명 효과 */
                .sb-stage::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(ellipse 50% 30% at 50% 60%, rgba(255,220,170,0.18), transparent 60%);
                    pointer-events: none;
                }

                /* ── 펼친 책 컨테이너 ──
                   원본 이미지 1400×1045 (1.34:1 가로형)에 맞춰 스프레드 = 8:3.
                   각 페이지 = 4:3 → 이미지가 자르지 않고 정확히 채워짐. */
                .sb-book {
                    position: relative;
                    width: min(94vw, calc(82vh * 8 / 3), 1800px);
                    aspect-ratio: 8 / 3;
                    transform-style: preserve-3d;
                }
                /* 책의 그림자 */
                .sb-book::before {
                    content: '';
                    position: absolute;
                    bottom: -28px; left: 8%; right: 8%;
                    height: 30px;
                    background: radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%);
                    filter: blur(12px);
                    z-index: -1;
                }

                /* ── 스프레드 (좌/우 페이지 합본) ── */
                .sb-spread {
                    position: absolute; inset: 0;
                    display: flex;
                    background: #FFFCF3;
                    border-radius: 6px;
                    box-shadow:
                        0 30px 80px rgba(0,0,0,0.6),
                        0 12px 24px rgba(0,0,0,0.4),
                        inset 0 1px 0 rgba(255,255,255,0.6);
                    overflow: hidden;
                }
                /* 책등 (스프레드 가운데) */
                .sb-spread::after {
                    content: '';
                    position: absolute;
                    top: 0; bottom: 0; left: 50%;
                    width: 24px;
                    transform: translateX(-50%);
                    background: linear-gradient(90deg,
                        rgba(0,0,0,0.18) 0%,
                        rgba(0,0,0,0.06) 30%,
                        rgba(0,0,0,0.06) 70%,
                        rgba(0,0,0,0.18) 100%);
                    pointer-events: none;
                }

                .sb-page {
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                    background: #FFFCF3;
                }
                .sb-page-image {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #F4E4C7;
                }
                .sb-page-image img {
                    width: 100%; height: 100%;
                    object-fit: contain;   /* 자르지 않고 항상 전체 표시 */
                    display: block;
                }
                .sb-page-text {
                    padding: clamp(28px, 4vw, 56px) clamp(28px, 4vw, 60px);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    background:
                        repeating-linear-gradient(180deg,
                            transparent 0 39px,
                            rgba(180,140,90,0.04) 39px 40px);
                }

                /* ── 플리핑 페이지 (페이지 넘김 애니메이션) ── */
                .sb-flip {
                    position: absolute;
                    top: 0;
                    width: 50%;
                    height: 100%;
                    transform-style: preserve-3d;
                    z-index: 50;
                    will-change: transform;
                }
                .sb-flip-next {
                    right: 0;
                    transform-origin: left center;
                    animation: sb-flip-fwd ${FLIP_MS}ms cubic-bezier(0.45, 0.05, 0.35, 1) forwards;
                }
                .sb-flip-prev {
                    left: 0;
                    transform-origin: right center;
                    animation: sb-flip-bwd ${FLIP_MS}ms cubic-bezier(0.45, 0.05, 0.35, 1) forwards;
                }
                @keyframes sb-flip-fwd {
                    0%   { transform: rotateY(0deg);     box-shadow: 0 0 0 rgba(0,0,0,0); }
                    50%  { box-shadow: -30px 0 40px rgba(0,0,0,0.35); }
                    100% { transform: rotateY(-180deg); box-shadow: 0 0 0 rgba(0,0,0,0); }
                }
                @keyframes sb-flip-bwd {
                    0%   { transform: rotateY(0deg); }
                    50%  { box-shadow: 30px 0 40px rgba(0,0,0,0.35); }
                    100% { transform: rotateY(180deg); }
                }

                .sb-face {
                    position: absolute; inset: 0;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    overflow: hidden;
                }
                .sb-face-back {
                    transform: rotateY(180deg);
                }

                /* ── 표지 ── */
                .sb-cover-stage {
                    position: relative;
                    /* 3:4 비율 — 높이 제약도 함께 (height = width / 0.75) */
                    width: min(80vw, calc(78vh * 0.75), 380px);
                    aspect-ratio: 3 / 4;
                    transform-style: preserve-3d;
                }
                .sb-cover {
                    position: absolute;
                    inset: 0;
                    border-radius: 6px 18px 18px 6px;
                    box-shadow:
                        0 40px 80px rgba(0,0,0,0.6),
                        0 16px 32px rgba(0,0,0,0.4),
                        inset 0 1px 0 rgba(255,255,255,0.4);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 32px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                .sb-cover::before {
                    content: '';
                    position: absolute;
                    top: 0; bottom: 0; left: 8px;
                    width: 6px;
                    background: linear-gradient(90deg, rgba(0,0,0,0.35), transparent);
                    pointer-events: none;
                }
                .sb-cover::after {
                    content: '';
                    position: absolute;
                    inset: 16px;
                    border: 1.5px solid rgba(255,255,255,0.35);
                    border-radius: 4px 12px 12px 4px;
                    pointer-events: none;
                }

                /* ── 클릭 영역 ── */
                .sb-tap-zone {
                    position: absolute;
                    top: 0; bottom: 0;
                    width: 22%;
                    z-index: 30;
                    cursor: pointer;
                    transition: background 200ms;
                }
                .sb-tap-zone:hover {
                    background: linear-gradient(90deg,
                        rgba(255,220,170,0.06), transparent);
                }
                .sb-tap-zone.right {
                    right: 0;
                }
                .sb-tap-zone.right:hover {
                    background: linear-gradient(270deg,
                        rgba(255,220,170,0.06), transparent);
                }
                .sb-tap-zone.left {
                    left: 0;
                }

                /* ════════════════════════════════════════════════════
                   모바일 (≤720px) — 풀스크린 리더 모드
                   진짜 책 시뮬레이션을 버리고 콘텐츠 우선 레이아웃
                ════════════════════════════════════════════════════ */
                @media (max-width: 720px) {
                    /* 책이 화면 전체 차지 */
                    .sb-book {
                        position: relative;
                        width: 100vw;
                        height: 100vh;
                        height: 100dvh;     /* 모던 브라우저 dynamic viewport */
                        max-width: none;
                        max-height: none;
                        aspect-ratio: unset;
                        margin: 0;
                    }
                    /* 책 그림자 제거 (풀스크린이라 의미 없음) */
                    .sb-book::before { display: none; }

                    /* 스프레드 → 세로 stack */
                    .sb-spread {
                        position: absolute;
                        inset: 0;
                        flex-direction: column;
                        border-radius: 0;
                        box-shadow: none;
                    }
                    /* 책등 제거 */
                    .sb-spread::after { display: none; }

                    /* 이미지: 상단, 4:3 비율 정확히 유지 */
                    .sb-page-image {
                        flex: 0 0 auto;
                        width: 100%;
                        height: auto;
                        aspect-ratio: 4 / 3;
                        position: relative;
                    }
                    .sb-page-image img {
                        object-fit: cover;       /* 4:3 컨테이너 = 4:3 이미지 → 자르지 않고 채움 */
                    }
                    /* 이미지 → 텍스트 부드러운 경계 */
                    .sb-page-image::after {
                        content: '';
                        position: absolute;
                        bottom: 0; left: 0; right: 0;
                        height: 18px;
                        background: linear-gradient(180deg, transparent, rgba(120,80,30,0.12));
                        pointer-events: none;
                    }

                    /* 텍스트: 남은 공간 차지, 스크롤 가능 */
                    .sb-page-text {
                        flex: 1 1 auto;
                        padding: 28px 24px 96px;       /* 하단 여유 — 탭 영역 확보 */
                        overflow-y: auto;
                        -webkit-overflow-scrolling: touch;
                        background:
                            repeating-linear-gradient(180deg,
                                transparent 0 35px,
                                rgba(180,140,90,0.04) 35px 36px),
                            #FFFCF3;
                    }

                    /* 데스크탑 3D 플립 제거 */
                    .sb-flip { display: none; }

                    /* 탭 영역: 텍스트 영역 하단부에만 (스크롤 방해 X) */
                    .sb-tap-zone {
                        top: auto;
                        bottom: 0;
                        height: 35%;
                        width: 30%;
                    }

                    /* 표지 살짝 더 크게 — 모바일에서도 시각적 임팩트 */
                    .sb-cover-stage {
                        width: min(82vw, calc(72vh * 0.7));
                    }
                }
            `}</style>

            <div className="sb-stage">
                {/* ── 상단 컨트롤 바 ── */}
                <TopBar
                    storybook={storybook}
                    phase={phase}
                    spread={spread}
                    total={totalPages}
                    bgmOn={bgmOn} setBgmOn={setBgmOn}
                    sfxOn={sfxOn} setSfxOn={setSfxOn}
                    onClose={handleClose}
                />

                {/* ── 단계별 화면 ── */}
                <AnimatePresence mode="wait">
                    {phase === 'cover' && (
                        <CoverScreen key="cover"
                            storybook={storybook}
                            showResume={showResume}
                            resumeSpread={resumeSpread}
                            onOpen={handleOpen} />
                    )}

                    {phase === 'reading' && (
                        <ReadingScreen key="reading"
                            storybook={storybook}
                            cur={cur} next={next} prev={prev}
                            spread={spread}
                            flipping={flipping}
                            direction={direction}
                            slug={slug}
                            onNext={goNext} onPrev={goPrev}
                            isFirst={spread === 0}
                            isLast={spread === totalPages - 1} />
                    )}

                    {phase === 'ending' && (
                        <EndingScreen key="ending"
                            storybook={storybook}
                            onRestart={handleRestart}
                            onClose={handleClose} />
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

/* ════════════════════════════════════════════════════
   상단 컨트롤 바
════════════════════════════════════════════════════ */
function TopBar({
    storybook, phase, spread, total, bgmOn, setBgmOn, sfxOn, setSfxOn, onClose,
}: {
    storybook: Storybook;
    phase: Phase;
    spread: number; total: number;
    bgmOn: boolean; setBgmOn: (v: boolean) => void;
    sfxOn: boolean; setSfxOn: (v: boolean) => void;
    onClose: () => void;
}) {
    return (
        <div className="absolute top-0 left-0 right-0 px-5 py-4 flex items-center justify-between z-[60]">
            <button onClick={onClose}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white/85 hover:text-white hover:bg-white/10 transition-all">
                <Home size={14} /> 목록으로
            </button>

            {phase === 'reading' && (
                <div className="flex items-center gap-2 text-white/80 font-body text-xs">
                    <BookOpen size={13} />
                    <span><b className="text-white">{spread + 1}</b> / {total}</span>
                </div>
            )}

            <div className="flex items-center gap-2">
                <button onClick={() => setBgmOn(!bgmOn)}
                    title="배경음악"
                    className="p-2 rounded-full text-white/85 hover:text-white hover:bg-white/10 transition-all">
                    {bgmOn ? <Music size={14} /> : <Music2 size={14} className="opacity-40" />}
                </button>
                <button onClick={() => setSfxOn(!sfxOn)}
                    title="페이지 효과음"
                    className="p-2 rounded-full text-white/85 hover:text-white hover:bg-white/10 transition-all">
                    {sfxOn ? <Volume2 size={14} /> : <VolumeX size={14} className="opacity-40" />}
                </button>
                <button onClick={onClose}
                    className="p-2 rounded-full text-white/85 hover:text-white hover:bg-white/10 transition-all">
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}

/* ════════════════════════════════════════════════════
   표지 화면
════════════════════════════════════════════════════ */
function CoverScreen({
    storybook, showResume, resumeSpread, onOpen,
}: {
    storybook: Storybook;
    showResume: boolean;
    resumeSpread: number;
    onOpen: (startSpread?: number) => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.5 }}
            className="sb-cover-stage"
        >
            {/* 책 표지 */}
            <motion.div
                animate={{ rotateY: [0, -3, 0, 3, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="sb-cover"
                style={{
                    background: `linear-gradient(135deg, ${storybook.coverColor} 0%, ${shade(storybook.coverColor, -0.3)} 100%)`,
                }}
            >
                {/* 장식 별 */}
                <div className="absolute top-8 right-8 text-white/40 text-2xl">✦</div>
                <div className="absolute bottom-8 left-8 text-white/40 text-xl">✦</div>

                {/* 캐릭터 이모지 원 */}
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="rounded-full flex items-center justify-center mb-6"
                    style={{
                        width: 120, height: 120,
                        background: 'rgba(255,255,255,0.18)',
                        boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.15), inset 0 8px 16px rgba(255,255,255,0.4)',
                        fontSize: 64,
                    }}
                >
                    {storybook.coverEmoji}
                </motion.div>

                {/* 부제 */}
                <div style={{
                    fontFamily: 'var(--font-script)',
                    fontSize: 16,
                    color: 'rgba(255,252,243,0.85)',
                    marginBottom: 8,
                }}>
                    a maeul-maeul story
                </div>

                {/* 제목 */}
                <h1 className="font-title font-bold text-white mb-3 text-center"
                    style={{ fontSize: 'clamp(24px, 4vw, 32px)', lineHeight: 1.2, textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                    {storybook.title}
                </h1>

                {/* 부제 */}
                {storybook.subtitle && (
                    <p className="font-body text-white/85 text-xs mb-6 text-center"
                        style={{ fontFamily: 'var(--font-hand)', fontSize: 14 }}>
                        {storybook.subtitle}
                    </p>
                )}

                {/* 펼치기 버튼 */}
                <motion.button
                    onClick={() => onOpen(0)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 mt-4"
                    style={{
                        background: 'rgba(255,252,243,0.95)',
                        color: shade(storybook.coverColor, -0.4),
                    }}
                >
                    <BookOpen size={16} />
                    펼치기
                </motion.button>

                {/* 이어 읽기 */}
                {showResume && (
                    <motion.button
                        onClick={() => onOpen(resumeSpread)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.04 }}
                        className="mt-3 px-4 py-1.5 rounded-full text-xs font-bold text-white/90 bg-white/15 hover:bg-white/25 transition-all flex items-center gap-1.5"
                    >
                        📖 {resumeSpread + 1}페이지부터 이어 읽기
                    </motion.button>
                )}

                {/* 하단 작가 표시 */}
                <div className="absolute bottom-6 text-[10px] text-white/50 font-body tracking-widest">
                    마음마을 · MAEUL MAEUL
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ════════════════════════════════════════════════════
   본문 읽기 화면
════════════════════════════════════════════════════ */
function ReadingScreen({
    storybook, cur, next, prev, spread, flipping, direction, slug,
    onNext, onPrev, isFirst, isLast,
}: {
    storybook: Storybook;
    cur: Storybook['pages'][number];
    next: Storybook['pages'][number] | null;
    prev: Storybook['pages'][number] | null;
    spread: number;
    flipping: 'next' | 'prev' | null;
    direction: 'next' | 'prev';
    slug: string;
    onNext: () => void; onPrev: () => void;
    isFirst: boolean; isLast: boolean;
}) {
    const [isMobile, setIsMobile] = React.useState(() => {
        if (typeof window !== 'undefined') return window.innerWidth <= 720;
        return false;
    });

    React.useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 720);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <motion.div
            /* 처음 mount 될 때 책이 펼쳐지는 인트로 — 모바일은 차분하게, 데스크탑은 드라마틱하게 */
            initial={isMobile
                ? { opacity: 0, y: 24, scale: 0.96 }
                : { opacity: 0, scale: 0.35, rotateY: -25, y: 8 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
            exit={{ opacity: 0, scale: isMobile ? 0.96 : 0.5 }}
            transition={{ duration: isMobile ? 0.5 : 1.0, ease: [0.34, 1.32, 0.64, 1] }}
            className="sb-book"
            style={{ '--flip-ms': `${FLIP_MS}ms` } as React.CSSProperties}
        >
            {/* 좌/우 화살표 (큰 화면) */}
            {!isFirst && (
                <motion.button onClick={onPrev}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-[40] hidden md:flex">
                    <ArrowLeft size={20} />
                </motion.button>
            )}
            {!isLast && (
                <motion.button onClick={onNext}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-[40] hidden md:flex">
                    <ArrowRight size={20} />
                </motion.button>
            )}

            {/* 모바일: 좌우 슬라이드 transition */}
            {isMobile ? (
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={spread}
                        initial={{ opacity: 0, x: direction === 'next' ? 40 : -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction === 'next' ? -40 : 40 }}
                        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                        className="sb-spread">
                        <ImagePage page={cur} slug={slug} />
                        <TextPage page={cur} accent={storybook.coverColor} />
                    </motion.div>
                </AnimatePresence>
            ) : (
                <>
                    {/* 데스크탑: 3D flip */}
                    {/* 하단 (다음 스프레드 미리 노출) */}
                    {flipping === 'next' && next ? (
                        <div className="sb-spread">
                            <ImagePage page={next} slug={slug} />
                            <TextPage page={next} accent={storybook.coverColor} />
                        </div>
                    ) : flipping === 'prev' && prev ? (
                        <div className="sb-spread">
                            <ImagePage page={prev} slug={slug} />
                            <TextPage page={prev} accent={storybook.coverColor} />
                        </div>
                    ) : (
                        <div className="sb-spread">
                            <ImagePage page={cur} slug={slug} />
                            <TextPage page={cur} accent={storybook.coverColor} />
                        </div>
                    )}

                    {/* 플리핑 페이지 (전진): 현재 텍스트 → 다음 이미지 */}
                    {flipping === 'next' && next && (
                        <div className="sb-flip sb-flip-next">
                            <div className="sb-face">
                                <TextPage page={cur} accent={storybook.coverColor} />
                            </div>
                            <div className="sb-face sb-face-back">
                                <ImagePage page={next} slug={slug} />
                            </div>
                        </div>
                    )}
                    {/* 플리핑 페이지 (후진): 현재 이미지 → 이전 텍스트 */}
                    {flipping === 'prev' && prev && (
                        <div className="sb-flip sb-flip-prev">
                            <div className="sb-face">
                                <ImagePage page={cur} slug={slug} />
                            </div>
                            <div className="sb-face sb-face-back">
                                <TextPage page={prev} accent={storybook.coverColor} />
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* 클릭 영역 */}
            {!isFirst && <div className="sb-tap-zone left" onClick={onPrev} />}
            {!isLast && <div className="sb-tap-zone right" onClick={onNext} />}
        </motion.div>
    );
}

/* ── 좌측 페이지 (이미지) ── */
function ImagePage({ page, slug }: { page: Storybook['pages'][number]; slug: string }) {
    return (
        <div className="sb-page sb-page-image">
            <img src={`/stories/${slug}/${page.imageNumber}.webp`} alt={page.sceneTitle ?? ''} />
        </div>
    );
}

/* ── 우측 페이지 (텍스트) ── */
function TextPage({ page, accent }: { page: Storybook['pages'][number]; accent: string }) {
    return (
        <div className="sb-page sb-page-text">
            {/* 장면 번호 */}
            <div style={{
                fontFamily: 'var(--font-script)', fontSize: 18, color: accent,
                marginBottom: 6,
            }}>
                scene {String(page.pageNumber).padStart(2, '0')}
            </div>

            {/* 장면 제목 */}
            {page.sceneTitle && (
                <h2 className="font-title font-bold text-[#4A3826] mb-5"
                    style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', lineHeight: 1.3 }}>
                    {page.sceneTitle}
                </h2>
            )}

            {/* 본문 */}
            <p className="font-body text-[#4A3826] whitespace-pre-line leading-loose"
                style={{
                    fontSize: 'clamp(15px, 1.5vw, 17px)',
                    lineHeight: 2,
                    fontFamily: 'var(--font-body)',
                }}>
                {page.text}
            </p>

            {/* 페이지 번호 (하단 우측) */}
            <div className="absolute bottom-5 right-6"
                style={{
                    fontFamily: 'var(--font-hand)',
                    fontSize: 13, color: '#9A8569',
                }}>
                — {page.pageNumber} —
            </div>
        </div>
    );
}

/* ════════════════════════════════════════════════════
   끝 화면
════════════════════════════════════════════════════ */
function EndingScreen({
    storybook, onRestart, onClose,
}: {
    storybook: Storybook;
    onRestart: () => void;
    onClose: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, -10, 10, -5, 5, 0] }}
                transition={{ delay: 0.2, duration: 0.8, ease: 'backOut' }}
                style={{ fontSize: 80, marginBottom: 16 }}
            >
                🌟
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                    fontFamily: 'var(--font-script)', fontSize: 32, color: '#F1C667',
                    marginBottom: 8,
                }}
            >
                — 끝 —
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="font-title font-bold text-white mb-3"
                style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}
            >
                {storybook.title}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="font-body text-white/75 mb-10 max-w-md"
                style={{ fontFamily: 'var(--font-hand)', fontSize: 16 }}
            >
                {storybook.subtitle}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-wrap gap-3 justify-center"
            >
                <button onClick={onRestart}
                    className="px-5 py-2.5 rounded-full font-bold text-sm bg-white/15 hover:bg-white/25 text-white transition-all flex items-center gap-2">
                    <RotateCcw size={15} /> 다시 읽기
                </button>
                <button onClick={onClose}
                    className="px-5 py-2.5 rounded-full font-bold text-sm bg-[#F1C667] hover:bg-[#F1C667]/90 text-[#4A3826] transition-all flex items-center gap-2">
                    <Home size={15} /> 다른 이야기 보기
                </button>
            </motion.div>
        </motion.div>
    );
}

/* ════════════════════════════════════════════════════
   유틸: 색상을 어둡게 (음수) / 밝게 (양수)
════════════════════════════════════════════════════ */
function shade(hex: string, amount: number): string {
    const h = hex.replace('#', '');
    const num = parseInt(h.length === 3
        ? h.split('').map(c => c + c).join('')
        : h, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    r = clamp(r + Math.round(255 * amount));
    g = clamp(g + Math.round(255 * amount));
    b = clamp(b + Math.round(255 * amount));
    return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;
}
function clamp(n: number) { return Math.min(255, Math.max(0, n)); }
