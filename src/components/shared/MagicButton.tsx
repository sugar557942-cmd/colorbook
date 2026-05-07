"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import SparkleEffect from './SparkleEffect';

interface MagicButtonProps {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    sparkle?: boolean;
    className?: string;
}

const MagicButton = ({
    variant = 'primary',
    size = 'md',
    children,
    onClick,
    href,
    sparkle = false,
    className
}: MagicButtonProps) => {
    const baseStyles = "relative inline-flex items-center justify-center font-title rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-maeul-gold/50";

    const variants = {
        primary: "bg-maeul-gold text-maeul-charcoal shadow-storybook hover:shadow-float",
        secondary: "bg-white text-maeul-charcoal border-2 border-maeul-gold hover:bg-maeul-warm-white shadow-sm",
        ghost: "bg-transparent text-maeul-charcoal border-b-2 border-maeul-gold border-dashed hover:opacity-80 rounded-none px-1"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-10 py-4 text-lg md:text-xl"
    };

    const content = (
        <motion.button
            onClick={onClick}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
        >
            {sparkle && <SparkleEffect />}
            <span className="relative z-10">{children}</span>
        </motion.button>
    );

    if (href) {
        return (
            <Link href={href} className="inline-block">
                {content}
            </Link>
        );
    }

    return content;
};

export default MagicButton;
