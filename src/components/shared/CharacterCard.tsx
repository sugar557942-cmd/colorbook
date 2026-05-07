"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Character } from '@/types';
import * as Silhouettes from '@/components/illustrations/CharacterSilhouettes';

interface CharacterCardProps {
    character: Character;
    className?: string;
}

const CharacterCard = ({ character, className }: CharacterCardProps) => {
    // Map slug to silhouette component
    const Silhouette = (Silhouettes as any)[`${character.slug.charAt(0).toUpperCase() + character.slug.slice(1)}Silhouette`] || Silhouettes.DaonSilhouette;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className={cn(
                "group relative flex flex-col items-center p-6 rounded-3xl transition-all duration-300",
                "bg-white shadow-storybook hover:shadow-float border-2 border-transparent hover:border-maeul-gold/20",
                className
            )}
        >
            <Link href={`/characters/${character.slug}`} className="cursor-pointer flex flex-col items-center w-full">
                {/* Character Image/Silhouette Container */}
                <div
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center mb-4 overflow-hidden relative"
                    style={{ backgroundColor: `${character.color}15` }}
                >
                    <motion.div
                        whileHover={{ rotate: [0, -5, 5, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                        className="w-3/4 h-3/4"
                    >
                        <Silhouette color={character.color} />
                    </motion.div>
                </div>

                {/* Info */}
                <span className="text-xs font-nunito font-semibold px-2 py-1 rounded-full bg-maeul-gold/10 text-maeul-charcoal/60 mb-2">
                    {character.animal}
                </span>
                <h3 className="text-xl md:text-2xl font-title mb-2" style={{ color: character.color }}>
                    {character.name}
                </h3>

                {/* Quote Bubble */}
                <div className="relative mt-2 p-3 bg-maeul-warm-white rounded-2xl border border-maeul-gold/10 text-center italic text-sm text-maeul-charcoal/80">
                    "{character.quote}"
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-maeul-warm-white border-t border-l border-maeul-gold/10 rotate-45" />
                </div>
            </Link>
        </motion.div>
    );
};

export default CharacterCard;
