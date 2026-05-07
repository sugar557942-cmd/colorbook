"use client";

import React from 'react';
import Link from 'next/link';
import CloudDivider from '@/components/shared/CloudDivider';
import * as Silhouettes from '@/components/illustrations/CharacterSilhouettes';

const Footer = () => {
    const characters = [
        { component: Silhouettes.DaonSilhouette, color: "#C4A77D" },
        { component: Silhouettes.NariSilhouette, color: "#FF8B4A" },
        { component: Silhouettes.HaruSilhouette, color: "#8BC48A" },
        { component: Silhouettes.JiuSilhouette, color: "#6B7FBF" },
        { component: Silhouettes.SoriSilhouette, color: "#FF8B8B" },
        { component: Silhouettes.NeuruSilhouette, color: "#7ECEC1" },
        { component: Silhouettes.RaonSilhouette, color: "#FFD93D" },
    ];

    return (
        <footer className="relative w-full mt-20 pt-20 pb-10 bg-maeul-earth/10">
            <CloudDivider
                variant="grass"
                color="#8BC48A"
                flip
                className="absolute top-0 left-0 w-full -translate-y-[90%] opacity-30"
            />
            <CloudDivider
                variant="hill"
                color="#F5EDE0"
                flip
                className="absolute top-0 left-0 w-full -translate-y-[95%]"
            />

            <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col items-center">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="text-4xl mb-2">🌳</div>
                    <div className="text-2xl font-title text-maeul-charcoal font-bold">마음마을</div>
                    <div className="text-sm text-maeul-soft-gray font-nunito">Storybook World</div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8 text-sm font-bold text-maeul-charcoal/60">
                    <Link href="/coloring" className="hover:text-maeul-coral transition-colors">색칠공부</Link>
                    <Link href="/characters" className="hover:text-maeul-gold transition-colors">친구들</Link>
                    <Link href="/stories" className="hover:text-maeul-lavender transition-colors">동화책</Link>
                    <Link href="/parents" className="hover:text-maeul-mint transition-colors">부모님 공간</Link>
                </div>

                {/* Legal Links */}
                <div className="flex gap-6 mb-12 text-xs text-maeul-soft-gray/80">
                    <Link href="/parents#policy" className="hover:text-maeul-charcoal">이용약관</Link>
                    <Link href="/parents#policy" className="hover:text-maeul-charcoal">개인정보처리방침</Link>
                    <a href="mailto:hello@maeulstory.com" className="hover:text-maeul-charcoal">문의하기</a>
                </div>

                {/* Character Parade */}
                <div className="w-full flex justify-center gap-4 md:gap-8 overflow-hidden opacity-40 hover:opacity-100 transition-opacity duration-500 py-4">
                    {characters.map((Char, i) => (
                        <div key={i} className="w-8 h-10 md:w-12 md:h-16 flex-shrink-0">
                            <Char.component color={Char.color} className="w-full h-full" />
                        </div>
                    ))}
                </div>

                <p className="mt-8 text-xs text-maeul-soft-gray text-center">
                    © 2026 마음마을 이야기. 아이들의 마음에 색을 입히는 곳.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
