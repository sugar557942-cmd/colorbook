"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ColoringPage } from '@/types';
import { characters } from '@/data/characters';
import { Star as StarIcon, Download } from 'lucide-react';
import { getColoringImagePath } from '@/lib/coloringImage';

interface ColoringCardProps {
    page: ColoringPage;
    className?: string;
}

const TYPE_LABEL: Record<string, string> = {
    character: '캐릭터',
    scene: '장면',
    activity: '활동',
    emotion: '감정',
    mandala: '만다라',
    'color-therapy': '색채치료',
    pattern: '패턴',
};

const TYPE_COLOR: Record<string, string> = {
    character: 'bg-orange-50 text-orange-500',
    scene: 'bg-green-50 text-green-600',
    activity: 'bg-blue-50 text-blue-500',
    emotion: 'bg-pink-50 text-pink-500',
    mandala: 'bg-purple-50 text-purple-500',
    'color-therapy': 'bg-yellow-50 text-yellow-600',
    pattern: 'bg-gray-50 text-gray-500',
};

async function trackDownload(slug: string) {
    try {
        await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, type: 'download' }),
        });
    } catch { /* non-critical */ }
}

const ColoringCard = ({ page, className }: ColoringCardProps) => {
    const char = characters.find(c => c.slug === page.character);
    const typeLabel = TYPE_LABEL[page.type] ?? page.type;
    const typeColor = TYPE_COLOR[page.type] ?? 'bg-gray-50 text-gray-500';

    // PNG 우선, 없으면 SVG fallback
    const pngPath = getColoringImagePath(page);
    const [imgSrc, setImgSrc] = useState<string>(pngPath ?? page.svgPath);
    const [hasPng, setHasPng] = useState<boolean>(!!pngPath);

    return (
        <Link href={`/coloring/${page.slug}`}>
            <motion.div
                whileHover={{ y: -6 }}
                className={cn(
                    "group relative flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-300 shadow-storybook hover:shadow-float border border-gray-100",
                    className
                )}
            >
                {/* Thumbnail: AI PNG → SVG fallback */}
                <div className="relative aspect-[4/5] w-full bg-white overflow-hidden">
                    <img
                        src={imgSrc}
                        alt={page.title}
                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                        onError={() => {
                            if (hasPng) {
                                setHasPng(false);
                                setImgSrc(page.svgPath);
                            }
                        }}
                    />

                    {/* Type badge */}
                    <span className={cn(
                        'absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold rounded-full',
                        typeColor
                    )}>
                        {typeLabel}
                    </span>

                    {/* Difficulty stars */}
                    <div className="absolute top-3 right-3 flex gap-0.5 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <StarIcon
                                key={i}
                                size={11}
                                className={cn(i < page.difficulty ? "fill-maeul-gold text-maeul-gold" : "text-slate-200")}
                            />
                        ))}
                    </div>
                </div>

                {/* Info row */}
                <div className="p-3 flex items-center justify-between gap-2 border-t border-gray-50">
                    <div className="min-w-0">
                        <h3 className="font-title text-maeul-charcoal text-sm line-clamp-1">
                            {page.title}
                        </h3>
                        <p className="text-[10px] text-maeul-soft-gray mt-0.5">
                            {page.ageRange} {char ? `• ${char.name}` : ''}
                        </p>
                    </div>
                    <button
                        title="다운로드"
                        className="w-9 h-9 flex-shrink-0 rounded-full bg-maeul-gold/10 text-maeul-gold flex items-center justify-center hover:bg-maeul-gold hover:text-white transition-colors"
                        onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            await trackDownload(page.slug);
                            const a = document.createElement('a');
                            // PNG가 로드됐으면 PNG로, 아니면 SVG로 다운로드
                            a.href = hasPng ? imgSrc : page.downloadUrl;
                            a.download = hasPng
                                ? imgSrc.split('/').pop() ?? `maeul-${page.slug}.png`
                                : `maeul-${page.slug}.svg`;
                            a.click();
                        }}
                    >
                        <Download size={15} />
                    </button>
                </div>
            </motion.div>
        </Link>
    );
};

export default ColoringCard;
