"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react';
import { articles, getArticleBySlug, type ArticleBlock } from '@/data/articles';

const TONE_BG: Record<string, string> = {
    butter: '#F1C66718',
    rose:   '#E29AA218',
    sage:   '#B5C39A18',
    sky:    '#9CC4B818',
    lav:    '#9D7FA918',
};
const TONE_BORDER: Record<string, string> = {
    butter: '#F1C66744',
    rose:   '#E29AA244',
    sage:   '#B5C39A44',
    sky:    '#9CC4B844',
    lav:    '#9D7FA944',
};
const TONE_TEXT: Record<string, string> = {
    butter: '#9C7F2F',
    rose:   '#A85C66',
    sage:   '#5C7E45',
    sky:    '#3F8377',
    lav:    '#6F4F84',
};

export default function ArticleDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const article = getArticleBySlug(slug);

    if (!article) {
        return (
            <div className="min-h-screen sb-paper flex flex-col items-center justify-center">
                <div className="text-5xl mb-4">📭</div>
                <p className="font-body text-[#9A8569] mb-4">글을 찾을 수 없어요.</p>
                <Link href="/parents" className="sb-btn sb-btn-primary">부모님방으로 돌아가기</Link>
            </div>
        );
    }

    /* 추천 글 — 같은 카테고리 우선, 본인 제외 */
    const recommended = articles
        .filter(a => a.slug !== article.slug)
        .sort((a, b) => (a.category === article.category ? -1 : 1))
        .slice(0, 2);

    return (
        <div className="relative min-h-screen sb-paper overflow-hidden">
            {/* 배경 블러브 */}
            <div className="sb-bloom w-[450px] h-[450px] opacity-15 top-[-60px] right-[-100px]" style={{ background: article.tone }} />
            <div className="sb-bloom w-[350px] h-[350px] bg-[#F1C667] opacity-10 bottom-20 left-[-80px]" />

            <div className="max-w-[820px] mx-auto px-4 md:px-8 pt-28 pb-24 relative">

                {/* 뒤로가기 */}
                <button onClick={() => router.back()}
                    className="flex items-center gap-2 text-[#9A8569] hover:text-[#4A3826] font-bold mb-6 transition-colors text-sm">
                    <ArrowLeft size={16} /> 부모님방으로
                </button>

                {/* ── 히어로 ── */}
                <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold font-body"
                            style={{ background: `${article.tone}28`, color: '#4A3826', border: `1px solid ${article.tone}55` }}>
                            {article.category}
                        </span>
                        <span className="flex items-center gap-1 font-body text-xs text-[#9A8569]">
                            <Clock size={12} /> {article.readingTime}
                        </span>
                        <span className="font-body text-xs text-[#C4A77D]">·</span>
                        <span className="font-body text-xs text-[#9A8569]">{article.publishedAt}</span>
                    </div>

                    <div style={{ fontFamily: 'var(--font-script)', fontSize: 22, color: article.tone, marginBottom: 6 }}>
                        {article.subtitle}
                    </div>

                    <h1 className="font-title font-bold text-[#4A3826] mb-6"
                        style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.2 }}>
                        {article.title}
                    </h1>

                    <div className="flex items-center gap-3 pb-6 border-b border-dashed"
                        style={{ borderColor: 'rgba(110,89,66,0.2)' }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                            style={{ background: `radial-gradient(circle at 30% 30%, ${article.tone}AA, ${article.tone})` }}>
                            {article.heroEmoji}
                        </div>
                        <div>
                            <div className="font-title font-bold text-[#4A3826] text-sm">{article.author}</div>
                            <div style={{ fontFamily: 'var(--font-hand)', fontSize: 13, color: '#9A8569' }}>
                                아동심리·정서발달 전문가 그룹
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* ── 본문 ── */}
                <article className="space-y-7">
                    {article.introQuote && (
                        <motion.blockquote initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="rounded-[28px] p-7 relative"
                            style={{ background: `${article.tone}15`, border: `1px solid ${article.tone}40` }}>
                            <div style={{ fontFamily: 'var(--font-script)', fontSize: 64, color: article.tone, lineHeight: 0.4, marginBottom: 8, opacity: 0.6 }}>
                                "
                            </div>
                            <p className="font-title text-[#4A3826] mb-3" style={{ fontSize: 18, lineHeight: 1.6 }}>
                                {article.introQuote.text}
                            </p>
                            {article.introQuote.source && (
                                <p style={{ fontFamily: 'var(--font-hand)', fontSize: 14, color: '#9A8569' }}>
                                    — {article.introQuote.source}
                                </p>
                            )}
                        </motion.blockquote>
                    )}

                    {article.blocks.map((block, i) => (
                        <BlockRenderer key={i} block={block} index={i} accent={article.tone} />
                    ))}
                </article>

                {/* ── 핵심 정리 ── */}
                {article.takeaways.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="mt-12 rounded-[36px] p-8"
                        style={{ background: '#FFFCF3', border: '1px solid rgba(155,120,70,0.16)',
                            boxShadow: '0 2px 14px rgba(120,80,30,0.08)' }}>
                        <div className="flex items-center gap-2 mb-5">
                            <span className="text-2xl">📌</span>
                            <h3 className="font-title font-bold text-[#4A3826] text-lg">오늘의 핵심</h3>
                        </div>
                        <ul className="space-y-3">
                            {article.takeaways.map((t, i) => (
                                <li key={i} className="flex gap-3 items-start">
                                    <span className="font-title font-bold text-sm rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0"
                                        style={{ background: `${article.tone}33`, color: '#4A3826' }}>
                                        {i + 1}
                                    </span>
                                    <span className="font-body text-[#4A3826] text-sm leading-relaxed pt-0.5">{t}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {/* ── CTA ── */}
                {article.cta && (
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="mt-12 rounded-[36px] py-12 px-8 text-center"
                        style={{ background: `linear-gradient(135deg, ${article.tone}33 0%, ${article.tone}77 100%)` }}>
                        <h3 className="font-title font-bold text-2xl text-[#4A3826] mb-2">{article.cta.title}</h3>
                        <p className="font-body text-[#6E5942] mb-6">{article.cta.description}</p>
                        <Link href={article.cta.href} className="sb-btn sb-btn-primary">
                            {article.cta.buttonText} →
                        </Link>
                    </motion.div>
                )}

                {/* ── 추천 글 ── */}
                {recommended.length > 0 && (
                    <div className="mt-16 pt-10 border-t border-dashed" style={{ borderColor: 'rgba(110,89,66,0.2)' }}>
                        <h3 className="font-title font-bold text-[#4A3826] text-lg mb-5">✿ 함께 읽으면 좋은 글</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {recommended.map(r => (
                                <Link key={r.slug} href={`/parents/${r.slug}`}
                                    className="block rounded-3xl p-6 group transition-all hover:-translate-y-1"
                                    style={{ background: '#FFFCF3', border: '1px solid rgba(155,120,70,0.16)',
                                        boxShadow: '0 2px 12px rgba(120,80,30,0.06)' }}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span style={{ fontFamily: 'var(--font-hand)', fontSize: 13, color: r.tone, fontWeight: 700 }}>
                                            {r.category} · {r.readingTime}
                                        </span>
                                    </div>
                                    <div className="font-title font-bold text-[#4A3826] mb-1.5 group-hover:text-[#D87C7E] transition-colors"
                                        style={{ fontSize: 16, lineHeight: 1.4 }}>
                                        {r.title}
                                    </div>
                                    <p className="font-body text-[#9A8569] text-sm leading-relaxed">{r.summary}</p>
                                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#D87C7E]">
                                        읽으러 가기 <ChevronRight size={13} />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ════════════════════════════════════════════
   블록 렌더러
════════════════════════════════════════════ */
function BlockRenderer({ block, index, accent }: { block: ArticleBlock; index: number; accent: string }) {
    const fadeProps = {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-50px' },
        transition: { duration: 0.4, delay: Math.min(index * 0.02, 0.1) },
    };

    switch (block.type) {
        case 'lead':
            return (
                <motion.p {...fadeProps}
                    className="font-body text-[#4A3826] leading-relaxed"
                    style={{ fontSize: 17, lineHeight: 1.8 }}>
                    {block.text}
                </motion.p>
            );

        case 'heading':
            return (
                <motion.div {...fadeProps} className="pt-4">
                    <h2 className="flex items-center gap-2 font-title font-bold text-[#4A3826]"
                        style={{ fontSize: 'clamp(22px, 3vw, 28px)', lineHeight: 1.3 }}>
                        {block.emoji && <span>{block.emoji}</span>}
                        {block.text}
                    </h2>
                    {block.subtitle && (
                        <p className="mt-1.5 font-body text-[#9A8569] text-sm" style={{ fontFamily: 'var(--font-hand)', fontSize: 15 }}>
                            {block.subtitle}
                        </p>
                    )}
                </motion.div>
            );

        case 'paragraph':
            return (
                <motion.p {...fadeProps}
                    className="font-body text-[#4A3826] leading-loose"
                    style={{ fontSize: 16, lineHeight: 1.85 }}>
                    {block.text}
                </motion.p>
            );

        case 'quote':
            return (
                <motion.blockquote {...fadeProps}
                    className="border-l-4 pl-5 py-2 italic"
                    style={{ borderColor: accent, fontFamily: 'var(--font-hand)', fontSize: 18, color: '#6E5942' }}>
                    "{block.text}"
                    {block.author && <div className="mt-2 not-italic font-body text-xs text-[#9A8569]">— {block.author}</div>}
                </motion.blockquote>
            );

        case 'callout': {
            const bg = TONE_BG[block.tone];
            const bd = TONE_BORDER[block.tone];
            const tx = TONE_TEXT[block.tone];
            return (
                <motion.div {...fadeProps}
                    className="rounded-3xl p-6"
                    style={{ background: bg, border: `1px solid ${bd}` }}>
                    {block.title && (
                        <div className="flex items-center gap-2 mb-2">
                            {block.emoji && <span className="text-xl">{block.emoji}</span>}
                            <h4 className="font-title font-bold" style={{ color: tx, fontSize: 16 }}>{block.title}</h4>
                        </div>
                    )}
                    <p className="font-body text-[#4A3826] leading-relaxed whitespace-pre-line" style={{ fontSize: 15, lineHeight: 1.75 }}>
                        {block.text}
                    </p>
                </motion.div>
            );
        }

        case 'list':
            return (
                <motion.div {...fadeProps} className="space-y-3">
                    {block.items.map((it, i) => (
                        <div key={i} className="flex gap-3 items-start">
                            <span className="flex-shrink-0 mt-0.5">
                                {it.emoji ? <span className="text-lg">{it.emoji}</span>
                                    : (
                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full font-title font-bold text-xs"
                                            style={{ background: `${accent}33`, color: '#4A3826' }}>
                                            {block.ordered ? i + 1 : '•'}
                                        </span>
                                    )}
                            </span>
                            <div className="flex-1 pt-0.5">
                                {it.title && <div className="font-title font-bold text-[#4A3826] mb-0.5" style={{ fontSize: 15 }}>{it.title}</div>}
                                <p className="font-body text-[#4A3826] leading-relaxed" style={{ fontSize: 15, lineHeight: 1.7 }}>{it.text}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            );

        case 'steps':
            return (
                <motion.div {...fadeProps} className="space-y-4">
                    {block.items.map((s, i) => (
                        <div key={i} className="rounded-3xl p-6 relative overflow-hidden"
                            style={{ background: '#FFFCF3', border: '1px solid rgba(155,120,70,0.16)',
                                boxShadow: '0 2px 12px rgba(120,80,30,0.06)' }}>
                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center"
                                        style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}>
                                        {s.emoji && <span className="text-xl mb-0.5">{s.emoji}</span>}
                                        <span className="font-title font-bold text-[10px]" style={{ color: '#4A3826' }}>STEP {s.step}</span>
                                    </div>
                                </div>
                                <div className="flex-1 pt-1">
                                    <h4 className="font-title font-bold text-[#4A3826] mb-2" style={{ fontSize: 17 }}>
                                        {s.title}
                                    </h4>
                                    <p className="font-body text-[#4A3826] leading-relaxed" style={{ fontSize: 15, lineHeight: 1.75 }}>
                                        {s.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            );

        case 'colorTherapy':
            return (
                <motion.div {...fadeProps} className="space-y-4">
                    {block.intro && (
                        <p className="font-body text-[#6E5942] text-sm italic">{block.intro}</p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {block.colors.map((c, i) => (
                            <div key={i} className="rounded-2xl p-4 flex gap-3 items-start"
                                style={{ background: '#FFFCF3', border: '1px solid rgba(155,120,70,0.14)' }}>
                                <div className="w-12 h-12 rounded-2xl flex-shrink-0 shadow-inner"
                                    style={{ background: c.hex, boxShadow: `inset 0 -4px 8px rgba(0,0,0,0.1), 0 2px 6px ${c.hex}66` }} />
                                <div className="flex-1 min-w-0">
                                    <div className="font-title font-bold text-[#4A3826] text-sm mb-0.5">
                                        {c.name} · <span className="font-body font-normal text-[#9A8569] text-xs">{c.emotions}</span>
                                    </div>
                                    <p className="font-body text-[#6E5942] text-xs leading-relaxed">{c.usage}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            );

        case 'mediaTable':
            return (
                <motion.div {...fadeProps} className="overflow-x-auto rounded-3xl"
                    style={{ background: '#FFFCF3', border: '1px solid rgba(155,120,70,0.16)' }}>
                    <table className="w-full text-left">
                        <thead>
                            <tr style={{ background: 'rgba(155,120,70,0.06)' }}>
                                <th className="font-title font-bold text-xs text-[#4A3826] p-3">도구</th>
                                <th className="font-title font-bold text-xs text-[#4A3826] p-3">특성</th>
                                <th className="font-title font-bold text-xs text-[#4A3826] p-3">효과</th>
                                <th className="font-title font-bold text-xs text-[#4A3826] p-3">추천 상황</th>
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((r, i) => (
                                <tr key={i} className="border-t" style={{ borderColor: 'rgba(155,120,70,0.1)' }}>
                                    <td className="p-3 font-title font-bold text-[#4A3826] text-sm">{r.medium}</td>
                                    <td className="p-3 font-body text-[#9A8569] text-xs">
                                        <span className="px-2 py-0.5 rounded-full"
                                            style={{ background: r.quality.includes('촉진') ? '#E29AA222' : r.quality.includes('통제') ? '#9CC4B822' : '#F1C66722' }}>
                                            {r.quality}
                                        </span>
                                    </td>
                                    <td className="p-3 font-body text-[#4A3826] text-xs leading-relaxed">{r.effect}</td>
                                    <td className="p-3 font-body text-[#6E5942] text-xs leading-relaxed">{r.tip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            );

        case 'activity':
            return (
                <motion.div {...fadeProps}
                    className="rounded-3xl p-5 relative"
                    style={{ background: '#FFFCF3', border: '1.5px dashed rgba(216,124,126,0.35)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                            style={{ background: '#FAD9D6', border: '1px solid rgba(216,124,126,0.3)' }}>
                            {block.emoji}
                        </div>
                        <div>
                            <h4 className="font-title font-bold text-[#4A3826]" style={{ fontSize: 16 }}>
                                {block.title}
                            </h4>
                            <p className="font-body text-[#9A8569] text-xs">목표: {block.goal}</p>
                        </div>
                    </div>
                    <ol className="space-y-1.5 pl-1">
                        {block.steps.map((s, i) => (
                            <li key={i} className="flex gap-2 items-start font-body text-[#4A3826] text-sm leading-relaxed">
                                <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold"
                                    style={{ background: '#D87C7E', color: 'white' }}>
                                    {i + 1}
                                </span>
                                <span className="pt-0.5">{s}</span>
                            </li>
                        ))}
                    </ol>
                </motion.div>
            );

        case 'tipBox': {
            const bg = TONE_BG[block.tone];
            const bd = TONE_BORDER[block.tone];
            const tx = TONE_TEXT[block.tone];
            return (
                <motion.div {...fadeProps}
                    className="rounded-3xl p-6"
                    style={{ background: bg, border: `1.5px solid ${bd}` }}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{block.emoji}</span>
                        <h4 className="font-title font-bold" style={{ color: tx, fontSize: 16 }}>{block.title}</h4>
                    </div>
                    <ul className="space-y-2">
                        {block.lines.map((l, i) => (
                            <li key={i} className="flex gap-2 items-start font-body text-[#4A3826] text-sm leading-relaxed">
                                <span style={{ color: tx }}>✓</span>
                                <span>{l}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            );
        }

        case 'twoColumn':
            return (
                <motion.div {...fadeProps} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-3xl p-5"
                        style={{ background: '#FAD9D622', border: '1px solid #FAD9D688' }}>
                        <h5 className="font-title font-bold text-[#A85C66] mb-2 text-sm">{block.left.title}</h5>
                        <p className="font-body text-[#4A3826] text-sm leading-relaxed">{block.left.text}</p>
                    </div>
                    <div className="rounded-3xl p-5"
                        style={{ background: '#DBE5C422', border: '1px solid #DBE5C488' }}>
                        <h5 className="font-title font-bold text-[#5C7E45] mb-2 text-sm">{block.right.title}</h5>
                        <p className="font-body text-[#4A3826] text-sm leading-relaxed">{block.right.text}</p>
                    </div>
                </motion.div>
            );

        case 'divider':
            return (
                <motion.div {...fadeProps} className="flex items-center justify-center py-2">
                    <span className="text-[#C4A77D] text-xl tracking-widest">✿ ✿ ✿</span>
                </motion.div>
            );

        default:
            return null;
    }
}
