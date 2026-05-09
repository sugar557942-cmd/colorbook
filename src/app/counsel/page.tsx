"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, MessageCircle, UserRound, ChevronDown } from 'lucide-react';
import Link from 'next/link';

/* ── 감정 목록 ── */
const EMOTIONS = [
    { value: '기쁨',        emoji: '😊' },
    { value: '슬픔',        emoji: '😢' },
    { value: '불안',        emoji: '😰' },
    { value: '평온',        emoji: '😌' },
    { value: '화남',        emoji: '😤' },
    { value: '복잡해요',    emoji: '🤔' },
    { value: '잘 모르겠어요', emoji: '🌫️' },
];

/* ── 전문가 플레이스홀더 ── */
const EXPERTS = [
    {
        emoji: '🌿', name: '마음마을 연구소',
        title: '아동심리·정서발달 전문가 그룹',
        tags: ['아동 정서', '미술치료', '부모 코칭'],
        color: '#B5C39A', ready: true,
    },
    {
        emoji: '🎨', name: '상담사 모집 중',
        title: '미술심리상담사 자격증 보유자',
        tags: ['미술심리상담', '색채치료', '아동·성인'],
        color: '#F1C667', ready: false,
    },
    {
        emoji: '🌸', name: '상담사 모집 중',
        title: '아동·청소년 상담 전문가',
        tags: ['학교 적응', '또래 관계', '진로'],
        color: '#E29AA2', ready: false,
    },
];

/* ── 타입 ── */
interface Question {
    id: string;
    nickname: string;
    emotion: string;
    coloringSlug?: string;
    coloringTitle?: string;
    content: string;
    createdAt: string;
    answer?: string;
    answeredAt?: string;
    expertName?: string;
}

/* ── 유틸 ── */
function fmtDate(iso: string) {
    return new Date(iso).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
function emotionEmoji(v: string) { return EMOTIONS.find(e => e.value === v)?.emoji ?? '🌫️'; }

/* ── 루트 ── */
export default function CounselPage() {
    return (
        <Suspense fallback={<div className="min-h-screen sb-paper" />}>
            <CounselContent />
        </Suspense>
    );
}

/* ── 본문 ── */
function CounselContent() {
    const sp = useSearchParams();
    const initTab    = sp.get('tab') === 'consult' ? 'consult' : 'qna';
    const initSlug   = sp.get('slug')    ?? '';
    const initTitle  = sp.get('title')   ?? '';
    const initEmotion = sp.get('emotion') ?? '';

    const [tab, setTab]   = useState<'qna' | 'consult'>(initTab as 'qna' | 'consult');
    const [filter, setFilter] = useState('전체');

    return (
        <div className="relative min-h-screen sb-paper overflow-hidden">
            {/* 배경 블러브 */}
            <div className="sb-bloom w-[450px] h-[450px] bg-[#B5C39A] opacity-20 top-[-60px] right-[-80px]" />
            <div className="sb-bloom w-[350px] h-[350px] bg-[#E29AA2] opacity-15 bottom-20 left-[-60px]" />

            <div className="max-w-[960px] mx-auto px-4 md:px-8 pt-28 pb-24">

                {/* ── 헤더 ── */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12">
                    <div style={{ fontFamily: 'var(--font-script)', fontSize: 20, color: '#7B9D67', marginBottom: 4 }}>
                        art · emotion · healing
                    </div>
                    <h1 className="font-title font-bold text-4xl md:text-5xl text-[#4A3826] mb-4">
                        마음 상담실
                    </h1>
                    <p className="font-body text-[#6E5942] text-lg max-w-lg mx-auto">
                        색칠하며 떠오른 감정을 나눠 보세요.<br />
                        혼자가 아니에요. 전문가가 함께 들어요.
                    </p>
                </motion.div>

                {/* ── 3단계 흐름 ── */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="grid grid-cols-3 gap-3 mb-10">
                    {[
                        { step: '01', icon: '🎨', label: '색칠', desc: '도안에 색을 입혀요' },
                        { step: '02', icon: '🌊', label: '정화', desc: '떠오른 감정을 적어요' },
                        { step: '03', icon: '💬', label: '상담', desc: '전문가가 함께 해요' },
                    ].map((s, i) => (
                        <div key={i} className="rounded-3xl p-4 text-center"
                            style={{ background: '#FFFCF3', border: '1px solid rgba(155,120,70,0.16)' }}>
                            <div className="text-2xl mb-1">{s.icon}</div>
                            <div style={{ fontFamily: 'var(--font-script)', fontSize: 11, color: '#D87C7E' }}>STEP {s.step}</div>
                            <div className="font-title font-bold text-[#4A3826] text-sm">{s.label}</div>
                            <div className="font-body text-[#9A8569] text-xs mt-0.5">{s.desc}</div>
                        </div>
                    ))}
                </motion.div>

                {/* ── 탭 ── */}
                <div className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 mb-8 w-fit mx-auto gap-1">
                    {([['qna','💬 Q&A 게시판'], ['consult','🌿 전문가 상담 신청']] as const).map(([v, label]) => (
                        <button key={v} onClick={() => setTab(v)}
                            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                tab === v ? 'bg-[#D87C7E] text-white shadow-sm' : 'text-[#9A8569] hover:text-[#4A3826]'
                            }`}>
                            {label}
                        </button>
                    ))}
                </div>

                {/* ── 탭 콘텐츠 ── */}
                <AnimatePresence mode="wait">
                    {tab === 'qna' ? (
                        <motion.div key="qna"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <QnaTab filter={filter} setFilter={setFilter}
                                initSlug={initSlug} initTitle={initTitle} initEmotion={initEmotion} />
                        </motion.div>
                    ) : (
                        <motion.div key="consult"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <ConsultTab initSlug={initSlug} initEmotion={initEmotion} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ════════════════════════════════════════
   Q&A 탭
════════════════════════════════════════ */
function QnaTab({ filter, setFilter, initSlug, initTitle, initEmotion }: {
    filter: string; setFilter: (v: string) => void;
    initSlug: string; initTitle: string; initEmotion: string;
}) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading]     = useState(true);
    const [showForm, setShowForm]   = useState(false);

    const load = () => {
        fetch('/api/questions').then(r => r.json())
            .then(setQuestions).catch(() => {}).finally(() => setLoading(false));
    };
    useEffect(() => { load(); }, []);

    const filtered = filter === '전체'
        ? questions
        : questions.filter(q => q.emotion === filter);

    return (
        <div className="space-y-6">
            {/* 감정 필터 */}
            <div className="flex flex-wrap gap-2 items-center">
                <span className="font-body text-xs font-bold text-[#9A8569]">감정으로 보기</span>
                {['전체', ...EMOTIONS.map(e => e.value)].map(v => (
                    <button key={v} onClick={() => setFilter(v)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold font-body transition-all ${
                            filter === v
                                ? 'bg-[#D87C7E] text-white'
                                : 'bg-[#FBF1DC] text-[#6E5942] hover:bg-[#F7E8CC]'
                        }`}>
                        {v === '전체' ? '🌈 전체' : `${emotionEmoji(v)} ${v}`}
                    </button>
                ))}
            </div>

            {/* 질문 목록 */}
            {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="animate-spin text-[#D87C7E]" size={28} /></div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-4xl mb-3">🌱</div>
                    <p className="font-body text-[#9A8569]">
                        {questions.length === 0 ? '첫 번째 마음을 남겨보세요.' : '해당 감정의 질문이 없어요.'}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((q, i) => (
                        <motion.div key={q.id}
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className="rounded-3xl overflow-hidden"
                            style={{ background: '#FFFCF3', border: '1px solid rgba(155,120,70,0.16)',
                                boxShadow: '0 2px 12px rgba(120,80,30,0.07)' }}>
                            {/* 질문 */}
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-lg">{emotionEmoji(q.emotion)}</span>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-body"
                                        style={{ background: '#F1C66733', color: '#4A3826' }}>
                                        {q.emotion}
                                    </span>
                                    {q.coloringTitle && (
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-body text-[#9A8569]"
                                            style={{ background: 'rgba(155,120,70,0.08)' }}>
                                            🎨 {q.coloringTitle}
                                        </span>
                                    )}
                                    <span className="ml-auto font-body text-[11px] text-[#C4A77D]">{fmtDate(q.createdAt)}</span>
                                </div>
                                <p className="font-body text-[#4A3826] leading-relaxed text-sm mb-2">{q.content}</p>
                                <p style={{ fontFamily: 'var(--font-hand)', fontSize: 12, color: '#9A8569' }}>
                                    — {q.nickname}
                                </p>
                            </div>
                            {/* 전문가 답변 */}
                            {q.answer && (
                                <div className="px-5 pb-5 pt-4 border-t border-dashed"
                                    style={{ borderColor: 'rgba(110,89,66,0.15)', background: '#F7F3E9' }}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm">🌿</span>
                                        <span className="font-title font-bold text-[#7B9D67] text-xs">
                                            {q.expertName ?? '마음마을 연구소'}
                                        </span>
                                        {q.answeredAt && (
                                            <span className="font-body text-[10px] text-[#C4A77D] ml-auto">{fmtDate(q.answeredAt)}</span>
                                        )}
                                    </div>
                                    <p className="font-body text-[#6E5942] text-sm leading-relaxed">{q.answer}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* 질문 작성 폼 토글 */}
            <button onClick={() => setShowForm(v => !v)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-3xl font-bold text-sm transition-all"
                style={{ background: '#FFFCF3', border: '1.5px dashed rgba(155,120,70,0.35)', color: '#D87C7E' }}>
                <MessageCircle size={16} />
                {showForm ? '접기' : '마음 남기기 ✏️'}
                <ChevronDown size={14} className={`transition-transform ${showForm ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <QuestionForm initSlug={initSlug} initTitle={initTitle} initEmotion={initEmotion}
                            onPosted={(q) => { setQuestions(prev => [q, ...prev]); setShowForm(false); }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ── 질문 작성 폼 ── */
function QuestionForm({ initSlug, initTitle, initEmotion, onPosted }: {
    initSlug: string; initTitle: string; initEmotion: string;
    onPosted: (q: Question) => void;
}) {
    const [emotion,  setEmotion]  = useState(initEmotion || '');
    const [content,  setContent]  = useState('');
    const [loading,  setLoading]  = useState(false);
    const [done,     setDone]     = useState(false);
    const [err,      setErr]      = useState('');

    const submit = async () => {
        if (!emotion) { setErr('감정을 선택해 주세요.'); return; }
        if (content.trim().length < 5) { setErr('5자 이상 입력해 주세요.'); return; }
        setLoading(true); setErr('');
        try {
            const res = await fetch('/api/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emotion, content, coloringSlug: initSlug || undefined, coloringTitle: initTitle || undefined }),
            });
            if (!res.ok) { const j = await res.json(); setErr(j.error ?? '오류'); return; }
            const q = await res.json();
            setDone(true);
            setTimeout(() => { setContent(''); setEmotion(''); setDone(false); onPosted(q); }, 1800);
        } finally { setLoading(false); }
    };

    if (done) return (
        <div className="rounded-3xl p-8 text-center" style={{ background: '#FFFCF3', border: '1px solid rgba(155,120,70,0.16)' }}>
            <CheckCircle2 className="mx-auto mb-3 text-[#7B9D67]" size={36} />
            <p className="font-title font-bold text-[#4A3826]">마음을 남겨주셨어요 🌿</p>
            <p className="font-body text-[#9A8569] text-sm mt-1">전문가가 곧 답변드릴게요.</p>
        </div>
    );

    return (
        <div className="rounded-3xl p-6 space-y-4"
            style={{ background: '#FFFCF3', border: '1px solid rgba(155,120,70,0.16)', boxShadow: '0 2px 12px rgba(120,80,30,0.07)' }}>
            <div>
                <p className="font-body text-xs font-bold text-[#9A8569] mb-2">지금 느끼는 감정은?</p>
                <div className="flex flex-wrap gap-2">
                    {EMOTIONS.map(e => (
                        <button key={e.value} onClick={() => setEmotion(e.value)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold font-body transition-all ${
                                emotion === e.value ? 'bg-[#D87C7E] text-white' : 'bg-[#FBF1DC] text-[#6E5942] hover:bg-[#F7E8CC]'
                            }`}>
                            {e.emoji} {e.value}
                        </button>
                    ))}
                </div>
            </div>

            {initTitle && (
                <div className="px-3 py-2 rounded-2xl text-xs font-body text-[#9A8569]"
                    style={{ background: 'rgba(155,120,70,0.07)' }}>
                    🎨 <b className="text-[#4A3826]">{initTitle}</b> 색칠 후 남기는 마음
                </div>
            )}

            <textarea
                value={content} onChange={e => setContent(e.target.value)}
                placeholder="색칠하면서 떠오른 감정이나 궁금한 점을 자유롭게 적어주세요. (익명으로 올라가요)"
                className="w-full rounded-2xl p-4 text-sm font-body text-[#4A3826] resize-none outline-none"
                style={{ background: '#FBF1DC', border: '1px solid rgba(155,120,70,0.2)', minHeight: 100 }}
                rows={4}
            />

            {err && <p className="text-xs text-red-400 font-body">{err}</p>}

            <button onClick={submit} disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white transition-all"
                style={{ background: loading ? '#C4A77D' : '#D87C7E' }}>
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Send size={15} />}
                {loading ? '전송 중...' : '익명으로 남기기'}
            </button>
            <p className="text-center font-body text-[10px] text-[#C4A77D]">
                닉네임은 자동 생성되며 개인정보는 수집하지 않아요.
            </p>
        </div>
    );
}

/* ════════════════════════════════════════
   전문가 상담 신청 탭
════════════════════════════════════════ */
function ConsultTab({ initSlug, initEmotion }: { initSlug: string; initEmotion: string }) {
    return (
        <div className="space-y-8">
            {/* 전문가 카드 */}
            <div>
                <h2 className="font-title font-bold text-xl text-[#4A3826] mb-5">
                    🌿 함께할 전문가
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    {EXPERTS.map((ex, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="rounded-3xl p-5 text-center relative overflow-hidden"
                            style={{ background: '#FFFCF3', border: '1px solid rgba(155,120,70,0.16)',
                                boxShadow: '0 2px 12px rgba(120,80,30,0.07)' }}>
                            {!ex.ready && (
                                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold font-body"
                                    style={{ background: '#F1C66744', color: '#4A3826' }}>준비 중</div>
                            )}
                            <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl"
                                style={{ background: `${ex.color}33`, border: `2px solid ${ex.color}66` }}>
                                {ex.emoji}
                            </div>
                            <div className="font-title font-bold text-[#4A3826] text-base mb-0.5">{ex.name}</div>
                            <div className="font-body text-[#9A8569] text-xs mb-3">{ex.title}</div>
                            <div className="flex flex-wrap justify-center gap-1">
                                {ex.tags.map(t => (
                                    <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-body font-bold"
                                        style={{ background: `${ex.color}22`, color: '#4A3826' }}>{t}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
                <p className="font-body text-xs text-center text-[#9A8569]">
                    미술심리상담사 자격증 보유 전문가를 모집 중이에요.
                    <Link href="mailto:hello@maeulmaeul.com" className="text-[#D87C7E] underline ml-1">전문가 지원하기 →</Link>
                </p>
            </div>

            {/* 상담 신청 폼 */}
            <ConsultForm initSlug={initSlug} initEmotion={initEmotion} />
        </div>
    );
}

/* ── 상담 신청 폼 ── */
function ConsultForm({ initSlug, initEmotion }: { initSlug: string; initEmotion: string }) {
    const [form, setForm] = useState({
        name: '', contact: '', subject: '본인', ageGroup: '',
        concern: '', method: 'any' as 'video' | 'chat' | 'any',
        availableTime: '', emotion: initEmotion,
    });
    const [loading, setLoading] = useState(false);
    const [done,    setDone]    = useState(false);
    const [err,     setErr]     = useState('');

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

    const submit = async () => {
        if (!form.contact || !form.concern) { setErr('연락처와 고민 내용은 필수예요.'); return; }
        setLoading(true); setErr('');
        try {
            const res = await fetch('/api/consultations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, coloringSlug: initSlug || undefined }),
            });
            if (!res.ok) { const j = await res.json(); setErr(j.error ?? '오류'); return; }
            setDone(true);
        } finally { setLoading(false); }
    };

    if (done) return (
        <div className="rounded-3xl p-10 text-center"
            style={{ background: 'linear-gradient(135deg, #DBE5C4 0%, #B5C39A 100%)', boxShadow: '0 8px 24px -8px rgba(123,157,103,0.4)' }}>
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="font-title font-bold text-2xl text-white mb-2">신청이 완료됐어요!</h3>
            <p className="font-body text-white/85 leading-relaxed">
                입력하신 연락처로 48시간 내에 연락드릴게요.<br />
                마음마을이 늘 함께할게요 🌸
            </p>
        </div>
    );

    const inputCls = "w-full rounded-2xl px-4 py-3 text-sm font-body text-[#4A3826] outline-none focus:ring-2 focus:ring-[#D87C7E]/30";
    const inputStyle = { background: '#FBF1DC', border: '1px solid rgba(155,120,70,0.2)' };

    return (
        <div className="rounded-3xl p-6 md:p-8 space-y-5"
            style={{ background: '#FFFCF3', border: '1px solid rgba(155,120,70,0.16)', boxShadow: '0 2px 14px rgba(120,80,30,0.08)' }}>
            <div>
                <div style={{ fontFamily: 'var(--font-script)', fontSize: 20, color: '#D87C7E', marginBottom: 2 }}>
                    let's talk
                </div>
                <h2 className="font-title font-bold text-xl text-[#4A3826]">상담 신청하기</h2>
                <p className="font-body text-[#9A8569] text-sm mt-1">정보는 상담 연결에만 사용되며 외부에 공유되지 않아요.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 이름 */}
                <div>
                    <label className="font-body text-xs font-bold text-[#9A8569] block mb-1.5">이름 (선택)</label>
                    <input className={inputCls} style={inputStyle} placeholder="홍길동"
                        value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
                {/* 연락처 */}
                <div>
                    <label className="font-body text-xs font-bold text-[#9A8569] block mb-1.5">연락처 <span className="text-red-400">*</span></label>
                    <input className={inputCls} style={inputStyle} placeholder="이메일 또는 전화번호"
                        value={form.contact} onChange={e => set('contact', e.target.value)} />
                </div>
            </div>

            {/* 상담 대상 */}
            <div>
                <label className="font-body text-xs font-bold text-[#9A8569] block mb-1.5">상담 대상</label>
                <div className="flex gap-2">
                    {[['본인', '👤'], ['자녀', '👶']].map(([v, emoji]) => (
                        <button key={v} onClick={() => set('subject', v)}
                            className={`flex-1 py-2.5 rounded-2xl text-sm font-bold font-body transition-all ${
                                form.subject === v ? 'bg-[#D87C7E] text-white' : 'text-[#6E5942] hover:bg-[#F7E8CC]'
                            }`}
                            style={form.subject !== v ? { background: '#FBF1DC' } : {}}>
                            {emoji} {v}
                        </button>
                    ))}
                </div>
                {form.subject === '자녀' && (
                    <input className={`${inputCls} mt-2`} style={inputStyle} placeholder="자녀 나이 (예: 7세)"
                        value={form.ageGroup} onChange={e => set('ageGroup', e.target.value)} />
                )}
            </div>

            {/* 감정 */}
            <div>
                <label className="font-body text-xs font-bold text-[#9A8569] block mb-1.5">색칠하면서 느낀 감정</label>
                <div className="flex flex-wrap gap-2">
                    {EMOTIONS.map(e => (
                        <button key={e.value} onClick={() => set('emotion', e.value)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold font-body transition-all ${
                                form.emotion === e.value ? 'bg-[#D87C7E] text-white' : 'bg-[#FBF1DC] text-[#6E5942] hover:bg-[#F7E8CC]'
                            }`}>
                            {e.emoji} {e.value}
                        </button>
                    ))}
                </div>
            </div>

            {/* 고민 내용 */}
            <div>
                <label className="font-body text-xs font-bold text-[#9A8569] block mb-1.5">
                    고민 내용 <span className="text-red-400">*</span>
                </label>
                <textarea className={`${inputCls} resize-none`} style={{ ...inputStyle, minHeight: 110 }} rows={4}
                    placeholder="어떤 부분이 힘드신가요? 어떤 도움이 필요하신가요? 편하게 적어주세요."
                    value={form.concern} onChange={e => set('concern', e.target.value)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 상담 방식 */}
                <div>
                    <label className="font-body text-xs font-bold text-[#9A8569] block mb-1.5">선호 상담 방식</label>
                    <div className="flex gap-2">
                        {([['video','📹 화상'],['chat','💬 채팅'],['any','🙆 상관없음']] as const).map(([v, label]) => (
                            <button key={v} onClick={() => set('method', v)}
                                className={`flex-1 py-2 rounded-2xl text-[11px] font-bold font-body transition-all ${
                                    form.method === v ? 'bg-[#9CC4B8] text-white' : 'text-[#6E5942]'
                                }`}
                                style={form.method !== v ? { background: '#FBF1DC' } : {}}>
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
                {/* 가능 시간 */}
                <div>
                    <label className="font-body text-xs font-bold text-[#9A8569] block mb-1.5">가능한 시간대</label>
                    <input className={inputCls} style={inputStyle} placeholder="예: 평일 저녁 7시 이후"
                        value={form.availableTime} onChange={e => set('availableTime', e.target.value)} />
                </div>
            </div>

            {err && <p className="text-xs text-red-400 font-body">{err}</p>}

            <button onClick={submit} disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm text-white transition-all shadow-md"
                style={{ background: loading ? '#C4A77D' : 'linear-gradient(135deg, #DBE5C4 0%, #7B9D67 100%)' }}>
                {loading ? <Loader2 className="animate-spin" size={16} /> : <UserRound size={16} />}
                {loading ? '신청 중...' : '상담 신청 보내기'}
            </button>
        </div>
    );
}
