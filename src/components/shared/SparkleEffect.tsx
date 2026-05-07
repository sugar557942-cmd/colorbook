"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Star from '@/components/icons/Star';

const SparkleEffect = () => {
    const sparkles = Array.from({ length: 6 });

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {sparkles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                        opacity: 0,
                        scale: 0,
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%"
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                    }}
                >
                    <Star size={Math.random() * 10 + 6} color="#FFD93D" />
                </motion.div>
            ))}
        </div>
    );
};

export default SparkleEffect;
