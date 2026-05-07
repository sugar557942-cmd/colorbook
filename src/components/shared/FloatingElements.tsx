"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Cloud from '@/components/icons/Cloud';
import Star from '@/components/icons/Star';
import Heart from '@/components/icons/Heart';
import Leaf from '@/components/icons/Leaf';
import Butterfly from '@/components/icons/Butterfly';

interface FloatingElementsProps {
    density?: 'low' | 'medium' | 'high';
    elements?: ('cloud' | 'star' | 'heart' | 'leaf' | 'butterfly')[];
}

const FloatingElements = ({
    density = 'medium',
    elements = ['cloud', 'star', 'heart', 'leaf', 'butterfly']
}: FloatingElementsProps) => {
    const [items, setItems] = useState<any[]>([]);

    const Icons = {
        cloud: Cloud,
        star: Star,
        heart: Heart,
        leaf: Leaf,
        butterfly: Butterfly
    };

    useEffect(() => {
        // Generate random items ONLY on the client to avoid hydration mismatch
        // And only run ONCE on mount to avoid infinite re-renders if props are literals
        const count = density === 'low' ? 5 : density === 'medium' ? 12 : 25;

        const newItems = Array.from({ length: count }).map((_, i) => ({
            id: i,
            type: elements[Math.floor(Math.random() * elements.length)],
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 20 + Math.random() * 40,
            duration: 15 + Math.random() * 20,
            delay: Math.random() * 10,
            opacity: 0.1 + Math.random() * 0.15
        }));
        setItems(newItems);
    }, []); // Run only once on mount

    if (items.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            {items.map((item) => {
                const Icon = Icons[item.type as keyof typeof Icons];
                return (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: item.opacity,
                            scale: 1,
                            y: [0, -60, 0],
                            x: [0, 30, 0],
                            rotate: [0, 20, -20, 0]
                        }}
                        transition={{
                            duration: item.duration,
                            repeat: Infinity,
                            delay: item.delay,
                            ease: "easeInOut"
                        }}
                        className="absolute"
                        style={{
                            top: `${item.y}%`,
                            left: `${item.x}%`,
                            width: item.size,
                            height: item.size
                        }}
                    >
                        <Icon className="w-full h-full text-maeul-gold/30" />
                    </motion.div>
                );
            })}
        </div>
    );
};

export default FloatingElements;
