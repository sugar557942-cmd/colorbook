"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Palette, Footprints, BookOpen, Map, Heart, Moon, Cloud, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { name: "색칠공부", href: "/coloring", icon: Palette, color: "text-maeul-coral", badge: "무료" },
    { name: "친구들", href: "/characters", icon: Footprints, color: "text-maeul-gold" },
    { name: "동화책", href: "/stories", icon: BookOpen, color: "text-maeul-lavender" },
    { name: "마을 구경", href: "/world", icon: Map, color: "text-maeul-leaf" },
    { name: "부모님 공간", href: "/parents", icon: Heart, color: "text-maeul-mint" },
];

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="text-maeul-charcoal p-2 focus:outline-none"
            >
                <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                        <motion.span
                            key={i}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                            className="text-xl"
                        >
                            ✦
                        </motion.span>
                    ))}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[100] bg-maeul-cream overflow-hidden flex flex-col p-8"
                    >
                        <div className="absolute inset-0 pointer-events-none opacity-20">
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="absolute top-20 left-10 text-maeul-sky"
                            >
                                <Cloud size={48} />
                            </motion.div>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="absolute bottom-40 right-10 text-maeul-gold"
                            >
                                <Star size={32} />
                            </motion.div>
                        </div>

                        <div className="flex justify-between items-center mb-12 relative z-10">
                            <div className="font-title text-2xl text-maeul-charcoal">마음마을 메뉴</div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 bg-white rounded-full shadow-sm text-maeul-lavender"
                            >
                                <Moon size={24} fill="currentColor" />
                            </button>
                        </div>

                        <div className="space-y-5 relative z-10">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-4 text-2xl font-bold text-maeul-charcoal hover:translate-x-2 transition-transform"
                                    >
                                        <span className={cn("relative p-3 rounded-2xl bg-white shadow-sm", item.color)}>
                                            <item.icon size={24} />
                                            {item.badge && (
                                                <span className="absolute -top-2 -right-2 text-[9px] font-black bg-maeul-coral text-white px-1.5 py-0.5 rounded-full leading-none">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </span>
                                        <span>{item.name}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto text-center text-maeul-soft-gray text-sm">
                            이야기가 시작되는 곳, 마음마을
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileNav;
