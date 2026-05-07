"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Palette, Footprints, BookOpen, Map, Heart } from 'lucide-react';

const navItems = [
    {
        name: "색칠공부",
        href: "/coloring",
        icon: Palette,
        color: "hover:bg-maeul-coral/20 hover:text-maeul-coral",
        activeColor: "bg-maeul-coral/20 text-maeul-coral",
        badge: "무료",
    },
    {
        name: "친구들",
        href: "/characters",
        icon: Footprints,
        color: "hover:bg-maeul-gold/20 hover:text-maeul-gold",
        activeColor: "bg-maeul-gold/20 text-maeul-gold",
    },
    {
        name: "동화책",
        href: "/stories",
        icon: BookOpen,
        color: "hover:bg-maeul-lavender/20 hover:text-maeul-lavender",
        activeColor: "bg-maeul-lavender/20 text-maeul-lavender",
    },
    {
        name: "마을 구경",
        href: "/world",
        icon: Map,
        color: "hover:bg-maeul-leaf/20 hover:text-maeul-leaf",
        activeColor: "bg-maeul-leaf/20 text-maeul-leaf",
    },
    {
        name: "부모님 공간",
        href: "/parents",
        icon: Heart,
        color: "hover:bg-maeul-mint/20 hover:text-maeul-mint",
        activeColor: "bg-maeul-mint/20 text-maeul-mint",
    },
];

const Navigation = () => {
    const pathname = usePathname();

    return (
        <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                    <Link key={item.href} href={item.href}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "relative flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300",
                                isActive ? item.activeColor : "text-maeul-charcoal/70 bg-transparent",
                                !isActive && item.color
                            )}
                        >
                            <item.icon size={16} />
                            <span>{item.name}</span>
                            {item.badge && !isActive && (
                                <span className="absolute -top-1.5 -right-1 text-[9px] font-black bg-maeul-coral text-white px-1.5 py-0.5 rounded-full leading-none">
                                    {item.badge}
                                </span>
                            )}
                        </motion.div>
                    </Link>
                );
            })}
        </nav>
    );
};

export default Navigation;
