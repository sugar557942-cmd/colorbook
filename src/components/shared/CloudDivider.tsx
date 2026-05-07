import React from 'react';
import { cn } from '@/lib/utils';

interface CloudDividerProps {
    variant: 'cloud' | 'hill' | 'wave' | 'grass';
    color?: string;
    flip?: boolean;
    className?: string;
}

const CloudDivider = ({
    variant,
    color = "white",
    flip = false,
    className
}: CloudDividerProps) => {
    const getPath = () => {
        switch (variant) {
            case 'cloud':
                return "M0 60 C 20 20, 50 20, 70 50 C 90 10, 130 10, 150 40 C 170 10, 210 10, 230 40 C 250 10, 280 10, 300 40 L 300 100 L 0 100 Z";
            case 'hill':
                return "M0 100 Q 150 0 300 100 Z";
            case 'wave':
                return "M0 50 Q 75 100 150 50 T 300 50 L 300 100 L 0 100 Z";
            case 'grass':
                return "M0 100 L 10 80 L 20 100 L 30 70 L 40 100 L 50 85 L 60 100 L 70 75 L 80 100 L 90 80 L 100 100 L 110 70 L 120 100 L 130 85 L 140 100 L 150 75 L 160 100 L 170 80 L 180 100 L 190 70 L 200 100 L 210 85 L 220 100 L 230 75 L 240 100 L 250 80 L 260 100 L 270 70 L 280 100 L 290 85 L 300 100 Z";
            default:
                return "";
        }
    };

    return (
        <div className={cn("w-full overflow-hidden leading-[0]", className, flip && "scale-y-[-1]")}>
            <svg
                viewBox="0 0 300 100"
                preserveAspectRatio="none"
                className="w-full h-16 md:h-24"
                fill={color}
            >
                <path d={getPath()} />
            </svg>
        </div>
    );
};

export default CloudDivider;
