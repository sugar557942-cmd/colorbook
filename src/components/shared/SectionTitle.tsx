import React from 'react';
import { cn } from '@/lib/utils';
import Star from '@/components/icons/Star';
import Leaf from '@/components/icons/Leaf';
import Cloud from '@/components/icons/Cloud';
import Heart from '@/components/icons/Heart';

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    decoration?: 'stars' | 'leaves' | 'clouds' | 'hearts' | 'none';
    className?: string;
}

const SectionTitle = ({
    title,
    subtitle,
    align = 'center',
    decoration = 'none',
    className
}: SectionTitleProps) => {
    const DecorationIcon = () => {
        switch (decoration) {
            case 'stars': return <Star className="inline-block mx-2 text-maeul-gold" />;
            case 'leaves': return <Leaf className="inline-block mx-2 text-maeul-leaf" />;
            case 'clouds': return <Cloud className="inline-block mx-2 w-8 h-8 text-maeul-sky" />;
            case 'hearts': return <Heart className="inline-block mx-2 text-maeul-coral" />;
            default: return null;
        }
    };

    return (
        <div className={cn(
            "mb-12",
            align === 'center' ? "text-center" : "text-left",
            className
        )}>
            <div className="flex items-center justify-center gap-2 mb-2">
                {decoration !== 'none' && <DecorationIcon />}
                <h2 className="text-3xl md:text-5xl font-title text-maeul-charcoal relative inline-block">
                    {title}
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-maeul-gold/30 rounded-full" />
                </h2>
                {decoration !== 'none' && <DecorationIcon />}
            </div>
            {subtitle && (
                <p className="text-maeul-soft-gray text-lg md:text-xl font-body mt-4">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionTitle;
