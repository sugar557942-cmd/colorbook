"use client";

import React, { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { coloringPages } from '@/data/coloringPages';
import { characters } from '@/data/characters';
import { stories } from '@/data/stories';
import MagicButton from '@/components/shared/MagicButton';
import FloatingElements from '@/components/shared/FloatingElements';
import ColoringCanvas from '@/components/coloring/ColoringCanvas';
import ColoringCanvasPNG from '@/components/coloring/ColoringCanvasPNG';
import { ArrowLeft, Download, Star, Printer, Palette, Info, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ColoringCard from '@/components/shared/ColoringCard';
import { getColoringImagePath } from '@/lib/coloringImage';

type Tab = 'color' | 'print';

const TYPE_LABEL: Record<string, string> = {
    character: '캐릭터', scene: '장면', activity: '활동',
    emotion: '감정', mandala: '만다라', 'color-therapy': '색채치료', pattern: '패턴',
};

async function trackAction(slug: string, type: 'download' | 'print') {
    try {
        await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, type }),
        });
    } catch { /* non-critical */ }
}

const ColoringDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const page = coloringPages.find(p => p.slug === slug);
    const [activeTab, setActiveTab] = useState<Tab>('color');

    // AI PNG 경로 계산 (없으면 null → SVG fallback)
    const pngPath = page ? getColoringImagePath(page) : null;
    const [previewSrc, setPreviewSrc] = useState<string>(pngPath ?? (page?.svgPath ?? ''));
    const [hasPng, setHasPng] = useState<boolean>(!!pngPath);

    const handleDownload = useCallback(() => {
        trackAction(slug, 'download');
    }, [slug]);

    const handlePrint = useCallback(() => {
        trackAction(slug, 'print');
    }, [slug]);

    const handleDirectDownload = useCallback(() => {
        trackAction(slug, 'download');
        const a = document.createElement('a');
        if (hasPng && pngPath) {
            a.href = pngPath;
            a.download = pngPath.split('/').pop() ?? `maeul-${slug}.png`;
        } else {
            a.href = page?.downloadUrl ?? '#';
            a.download = `maeul-${slug}.svg`;
        }
        a.click();
    }, [slug, page, hasPng, pngPath]);

    const handleDirectPrint = useCallback(async () => {
        if (!page) return;
        trackAction(slug, 'print');
        try {
            const res = await fetch(page.svgPath);
            const svgText = await res.text();
            // viewBox 보존을 위해 width/height 속성만 제거
            const cleaned = svgText
                .replace(/\s+width="[^"]*"/, '')
                .replace(/\s+height="[^"]*"/, '');
            const win = window.open('', '_blank');
            if (!win) { alert('팝업 차단을 해제해 주세요.'); return; }
            win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>마음마을 색칠공부 — ${page.title}</title>
  <style>
    @page { size: A4 portrait; margin: 10mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { background: #fff; width: 100%; }
    svg { display: block; width: 190mm; height: auto; max-height: 277mm; }
  </style>
</head>
<body>
${cleaned}
<script>
  window.addEventListener('load', function () {
    setTimeout(function () { window.print(); window.close(); }, 300);
  });
<\/script>
</body>
</html>`);
            win.document.close();
        } catch {
            window.print();
        }
    }, [slug, page]);

    if (!page) {
        return <div className="p-20 text-center text-maeul-soft-gray">도안을 찾을 수 없어요!</div>;
    }

    const char = characters.find(c => c.slug === page.character);
    const relatedStory = stories.find(s => s.slug === page.relatedStory);

    // 다음 추천 도안: 같은 타입 우선, 이미 보고 있는 것 제외, 최대 3개
    const recommendations = coloringPages
        .filter(p => p.slug !== slug)
        .sort((a, b) => {
            const aScore = (a.type === page.type ? 2 : 0) + (a.character === page.character ? 1 : 0);
            const bScore = (b.type === page.type ? 2 : 0) + (b.character === page.character ? 1 : 0);
            return bScore - aScore;
        })
        .slice(0, 3);
    const typeLabel = TYPE_LABEL[page.type] ?? page.type;

    return (
        <div className="relative min-h-screen pb-24 bg-maeul-warm-white">
            <FloatingElements density="low" elements={['star', 'leaf']} />

            <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-28">
                {/* Back */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-maeul-soft-gray hover:text-maeul-charcoal font-bold mb-6 transition-colors text-sm"
                >
                    <ArrowLeft size={16} />
                    목록으로
                </button>

                {/* Title row */}
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                            <span className="px-3 py-1 bg-maeul-coral/10 text-maeul-coral text-xs font-bold rounded-full">
                                {typeLabel}
                            </span>
                            {page.ageRange && (
                                <span className="px-3 py-1 bg-maeul-sky/20 text-maeul-charcoal text-xs font-bold rounded-full">
                                    {page.ageRange}
                                </span>
                            )}
                            <div className="flex gap-0.5">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <Star key={i} size={13} className={cn(i < page.difficulty ? "fill-maeul-gold text-maeul-gold" : "text-slate-200")} />
                                ))}
                            </div>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-title text-maeul-charcoal">{page.title}</h1>
                    </div>
                    {char && (
                        <span className="text-4xl flex-shrink-0">{char.animalEmoji}</span>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
                    {/* Left: Tabs + content */}
                    <div>
                        {/* Tab switcher */}
                        <div className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 mb-6 w-fit">
                            <TabButton active={activeTab === 'color'} onClick={() => setActiveTab('color')} icon={<Palette size={15} />}>
                                웹에서 색칠하기
                            </TabButton>
                            <TabButton active={activeTab === 'print'} onClick={() => setActiveTab('print')} icon={<Printer size={15} />}>
                                인쇄 / 다운로드
                            </TabButton>
                        </div>

                        {activeTab === 'color' && (
                            <motion.div
                                key="color-tab"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* PNG가 있으면 flood-fill 캔버스, 없으면 SVG 영역 클릭 방식 */}
                                {hasPng && pngPath ? (
                                    <ColoringCanvasPNG
                                        imagePath={pngPath}
                                        slug={slug}
                                        onDownload={handleDownload}
                                        onPrint={handlePrint}
                                    />
                                ) : (
                                    <ColoringCanvas
                                        svgPath={page.svgPath}
                                        slug={slug}
                                        onDownload={handleDownload}
                                        onPrint={handlePrint}
                                    />
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'print' && (
                            <motion.div
                                key="print-tab"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Preview: AI PNG → SVG fallback */}
                                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
                                    <img
                                        src={previewSrc}
                                        alt={page.title}
                                        className="w-full max-w-sm mx-auto block"
                                        onError={() => {
                                            if (hasPng) {
                                                setHasPng(false);
                                                setPreviewSrc(page.svgPath);
                                            }
                                        }}
                                    />
                                </div>

                                {/* Tips */}
                                <div className="bg-white p-6 rounded-3xl shadow-sm border border-maeul-coral/10 mb-6">
                                    <h3 className="font-title text-base mb-3 flex items-center gap-2 text-maeul-charcoal">
                                        <Download className="text-maeul-coral" size={18} />
                                        인쇄 팁
                                    </h3>
                                    <ul className="space-y-2 text-maeul-soft-gray text-sm">
                                        <li className="flex items-start gap-2">
                                            <span className="text-maeul-gold">•</span>
                                            A4 용지에 출력하면 딱 맞아요.
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-maeul-gold">•</span>
                                            인쇄 설정에서 <b>용지에 맞춤</b>을 선택해 주세요.
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-maeul-gold">•</span>
                                            배경은 흰색이라 잉크가 절약돼요!
                                        </li>
                                    </ul>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={handleDirectDownload}
                                        className="flex-1 flex items-center justify-center gap-2 py-4 rounded-3xl bg-maeul-gold text-white font-bold hover:bg-maeul-gold/90 transition-all shadow-sm"
                                    >
                                        <Download size={18} />
                                        도안 무료 다운로드 ({hasPng ? 'PNG' : 'SVG'})
                                    </button>
                                    <button
                                        onClick={handleDirectPrint}
                                        className="flex-1 flex items-center justify-center gap-2 py-4 rounded-3xl bg-white border-2 border-maeul-coral/20 text-maeul-coral font-bold hover:bg-maeul-coral/5 transition-all"
                                    >
                                        <Printer size={18} />
                                        바로 인쇄
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Right: Info panel */}
                    <div className="space-y-5">
                        {/* Art therapy info */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-maeul-lavender/20">
                            <h3 className="font-title text-base text-maeul-charcoal mb-4 flex items-center gap-2">
                                🎨 미술심리 정보
                            </h3>
                            <div className="space-y-3">
                                <InfoRow label="치료 목표" value={page.artTherapyGoal} />
                                <InfoRow label="테마" value={page.artTherapyTheme} />
                                {page.therapeuticColor && (
                                    <div>
                                        <span className="text-xs font-bold text-gray-400 block mb-1">치료 색상</span>
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="w-6 h-6 rounded-full border border-gray-200 shadow-sm inline-block"
                                                style={{ backgroundColor: page.therapeuticColor }}
                                            />
                                            <span className="text-sm text-gray-600">{page.therapeuticColor}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Activity prompt */}
                        {page.activityPrompt && (
                            <div className="bg-maeul-gold/10 rounded-3xl p-6 border border-maeul-gold/20">
                                <p className="text-xs font-bold text-maeul-gold mb-2">활동 질문 💬</p>
                                <p className="text-sm text-maeul-charcoal leading-relaxed font-body">
                                    {page.activityPrompt}
                                </p>
                            </div>
                        )}

                        {/* Related story */}
                        {relatedStory && (
                            <div className="bg-maeul-lavender/10 p-5 rounded-3xl border border-maeul-lavender/20 flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">📖</span>
                                    <div>
                                        <div className="text-xs font-bold text-maeul-lavender mb-0.5">연결된 이야기</div>
                                        <div className="font-title text-maeul-charcoal text-sm">{relatedStory.title}</div>
                                    </div>
                                </div>
                                <MagicButton href={`/stories/${relatedStory.slug}`} variant="secondary" size="sm">
                                    이야기 읽기
                                </MagicButton>
                            </div>
                        )}

                        {/* Legal */}
                        <div className="p-5 bg-maeul-charcoal/5 rounded-3xl flex items-start gap-3">
                            <Info className="text-maeul-soft-gray flex-shrink-0 mt-0.5" size={16} />
                            <p className="text-xs text-maeul-soft-gray leading-relaxed">
                                본 도안은 비상업적 목적의 개인 및 교육용으로만 사용 가능합니다. 무단 배포 및 상업적 이용은 금지되어 있어요.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── 다음 추천 도안 ── */}
                {recommendations.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-title text-maeul-charcoal">
                                이런 도안도 색칠해 보세요 🎨
                            </h2>
                            <a
                                href="/coloring"
                                className="flex items-center gap-1 text-sm font-bold text-maeul-coral hover:gap-2 transition-all"
                            >
                                전체 보기 <ChevronRight size={15} />
                            </a>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                            {recommendations.map(rec => (
                                <ColoringCard key={rec.slug} page={rec} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

function TabButton({
    active, onClick, icon, children,
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all',
                active
                    ? 'bg-maeul-coral text-white shadow-sm'
                    : 'text-maeul-soft-gray hover:text-maeul-charcoal'
            )}
        >
            {icon}
            {children}
        </button>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <span className="text-xs font-bold text-gray-400 block mb-0.5">{label}</span>
            <span className="text-sm text-gray-600 leading-relaxed">{value}</span>
        </div>
    );
}

export default ColoringDetailPage;
