"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, Palette } from 'lucide-react';

const navItems = [
    { name: "색칠공부", href: "/coloring", badge: "무료" },
    { name: "친구들",   href: "/characters" },
    { name: "동화책",   href: "/stories" },
    { name: "마을 구경", href: "/world" },
    { name: "부모님 공간", href: "/parents" },
];

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "sticky top-0 z-50 w-full transition-all duration-300",
                    scrolled
                        ? "bg-[#FBF1DC]/95 backdrop-blur-md shadow-[0_2px_18px_rgba(120,80,30,0.10)]"
                        : "bg-[#FBF1DC]/80 backdrop-blur-sm"
                )}
            >
                {/* wave bottom border */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-full pointer-events-none">
                    <svg viewBox="0 0 1200 16" preserveAspectRatio="none" className="block w-full h-[10px]">
                        <path d="M0 8 Q150 0 300 8 T600 8 T900 8 T1200 8 V16 H0Z" fill="rgba(176,122,85,0.08)" />
                    </svg>
                </div>

                <div className="max-w-[1440px] mx-auto h-[68px] px-4 md:px-8 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <motion.div
                            className="flex items-center gap-2.5"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            {/* 원형 로고 오브 */}
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center font-title font-bold text-lg text-white flex-shrink-0"
                                style={{
                                    background: "linear-gradient(145deg, #E89A82 0%, #D87C7E 55%, #C96A72 100%)",
                                    boxShadow: "inset 0 2px 6px rgba(255,255,255,0.30), 0 4px 12px rgba(216,124,126,0.45)"
                                }}
                            >
                                마
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-title font-bold text-[17px] text-[#4A3826]">마음마을</span>
                                <span className="font-body text-[10px] text-[#9A8569] tracking-widest uppercase mt-0.5">이야기</span>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => {
                            const active = pathname === item.href || pathname.startsWith(item.href + '/');
                            return (
                                <Link key={item.href} href={item.href}>
                                    <span
                                        className={cn(
                                            "relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-bold transition-all duration-200",
                                            active
                                                ? "text-[#4A3826] bg-[#E69282]/15"
                                                : "text-[#6E5942] hover:text-[#4A3826] hover:bg-[#F1C667]/15"
                                        )}
                                    >
                                        {item.name}
                                        {item.badge && (
                                            <span className="text-[9px] font-black bg-[#E69282] text-white px-1.5 py-0.5 rounded-full leading-none">
                                                {item.badge}
                                            </span>
                                        )}
                                        {active && (
                                            <motion.span
                                                layoutId="nav-active"
                                                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-[#E69282]"
                                            />
                                        )}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* CTA + Mobile toggle */}
                    <div className="flex items-center gap-2">
                        <Link
                            href="/coloring"
                            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-title font-bold text-sm text-white transition-all hover:-translate-y-[1px]"
                            style={{
                                background: "linear-gradient(180deg, #E89A82 0%, #D87C7E 100%)",
                                boxShadow: "inset 0 -2px 0 rgba(120,50,50,0.18), 0 3px 0 #B86560, 0 8px 16px -6px rgba(216,124,126,0.5)"
                            }}
                        >
                            <Palette size={14} />
                            무료 색칠하기
                        </Link>
                        <button
                            onClick={() => setOpen(v => !v)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-[#6E5942] hover:bg-[#F1C667]/20 transition-colors"
                            aria-label="메뉴"
                        >
                            {open ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.18 }}
                        className="fixed inset-x-0 top-[68px] z-40 sb-paper border-b border-[rgba(155,120,70,0.12)] shadow-[0_8px_32px_rgba(120,80,30,0.12)] lg:hidden"
                    >
                        <nav className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col gap-1">
                            {navItems.map((item) => {
                                const active = pathname === item.href || pathname.startsWith(item.href + '/');
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "flex items-center justify-between px-4 py-3 rounded-2xl font-body font-bold text-sm transition-all",
                                            active
                                                ? "bg-[#E69282]/15 text-[#4A3826]"
                                                : "text-[#6E5942] hover:bg-[#F9EBD0]"
                                        )}
                                    >
                                        {item.name}
                                        {item.badge && (
                                            <span className="text-[9px] font-black bg-[#E69282] text-white px-2 py-0.5 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
