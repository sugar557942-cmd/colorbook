"use client";

import React from 'react';
import Link from 'next/link';

const chars = [
    { emoji: "🐻", name: "다온", href: "/characters/daon" },
    { emoji: "🦊", name: "나리", href: "/characters/nari" },
    { emoji: "🐰", name: "하루", href: "/characters/haru" },
    { emoji: "🦉", name: "지우", href: "/characters/jiu" },
    { emoji: "🐱", name: "소리", href: "/characters/sori" },
    { emoji: "🐢", name: "느루", href: "/characters/neuru" },
    { emoji: "🐦", name: "라온", href: "/characters/raon" },
];

export default function Footer() {
    return (
        <footer className="relative w-full mt-24 sb-paper-soft">
            {/* 물결 구분선 */}
            <div className="sb-divider opacity-60" />

            <div className="max-w-[1200px] mx-auto px-6 py-14 flex flex-col items-center gap-10">
                {/* 캐릭터 퍼레이드 */}
                <div className="flex items-center gap-5 flex-wrap justify-center">
                    {chars.map(c => (
                        <Link
                            key={c.href}
                            href={c.href}
                            className="flex flex-col items-center gap-1 group"
                        >
                            <span className="text-3xl group-hover:scale-125 transition-transform duration-200">{c.emoji}</span>
                            <span className="text-[10px] font-body text-[#9A8569] group-hover:text-[#4A3826] transition-colors">{c.name}</span>
                        </Link>
                    ))}
                </div>

                {/* 로고 */}
                <div className="flex flex-col items-center gap-1">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-title font-bold text-xl text-white mb-2"
                        style={{
                            background: "linear-gradient(145deg, #E89A82 0%, #D87C7E 100%)",
                            boxShadow: "0 4px 12px rgba(216,124,126,0.35)"
                        }}
                    >
                        마
                    </div>
                    <span className="font-title font-bold text-xl text-[#4A3826]">마음마을 이야기</span>
                    <span className="font-body text-sm text-[#9A8569]">아이들의 마음에 색을 입히는 곳</span>
                </div>

                {/* 링크 */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                    {[
                        { name: "색칠공부", href: "/coloring" },
                        { name: "친구들", href: "/characters" },
                        { name: "동화책", href: "/stories" },
                        { name: "마을 구경", href: "/world" },
                        { name: "부모님 공간", href: "/parents" },
                    ].map(l => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="font-body font-bold text-sm text-[#9A8569] hover:text-[#4A3826] transition-colors"
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>

                {/* 법적 링크 + 저작권 */}
                <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-6 text-xs text-[#C2AC8E]">
                        <Link href="/parents#policy" className="hover:text-[#6E5942] transition-colors">이용약관</Link>
                        <Link href="/parents#policy" className="hover:text-[#6E5942] transition-colors">개인정보처리방침</Link>
                        <a href="mailto:hello@maeulstory.com" className="hover:text-[#6E5942] transition-colors">문의하기</a>
                    </div>
                    <p className="text-xs text-[#C2AC8E] text-center font-body">
                        © 2026 마음마을 이야기. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
