import React from 'react';

interface SilhouetteProps {
    className?: string;
    color?: string;
}

export const DaonSilhouette = ({ className, color = "#C4A77D" }: SilhouetteProps) => (
    <svg viewBox="0 0 120 160" fill={color} className={className}>
        <path d="M60 150c-25 0-45-20-45-45 0-15 8-28 20-35-10-15-5-35 10-45 15-10 35-10 50 0 15 10 20 30 10 45 12 7 20 20 20 35 0 25-20 45-45 45z" />
        <circle cx="45" cy="50" r="12" />
        <circle cx="75" cy="50" r="12" />
    </svg>
);

export const NariSilhouette = ({ className, color = "#FF8B4A" }: SilhouetteProps) => (
    <svg viewBox="0 0 120 160" fill={color} className={className}>
        <path d="M60 150c-30 0-50-20-50-50 0-30 20-40 20-60 0-20 20-35 30-35s30 15 30 35c0 20 20 30 20 60 0 30-20 50-50 50z" />
        <path d="M40 20 L30 5 L50 15 Z M80 20 L90 5 L70 15 Z" />
    </svg>
);

export const HaruSilhouette = ({ className, color = "#8BC48A" }: SilhouetteProps) => (
    <svg viewBox="0 0 120 160" fill={color} className={className}>
        <path d="M60 150c-20 0-35-15-35-35 0-25 10-35 10-50 0-20 10-15 25-15s25-5 25 15c0 15 10 25 10 50 0 20-15 35-35 35z" />
        <path d="M45 40 Q 30 10 40 5 Q 50 0 55 35 Z" />
        <path d="M75 40 Q 90 10 80 5 Q 70 0 65 35 Z" />
    </svg>
);

export const JiuSilhouette = ({ className, color = "#6B7FBF" }: SilhouetteProps) => (
    <svg viewBox="0 0 120 160" fill={color} className={className}>
        <circle cx="60" cy="100" r="45" />
        <circle cx="42" cy="85" r="18" fill="white" fillOpacity="0.2" />
        <circle cx="78" cy="85" r="18" fill="white" fillOpacity="0.2" />
        <path d="M40 65 L60 55 L80 65" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none" />
    </svg>
);

export const SoriSilhouette = ({ className, color = "#FF8B8B" }: SilhouetteProps) => (
    <svg viewBox="0 0 120 160" fill={color} className={className}>
        <circle cx="60" cy="105" r="40" />
        <path d="M35 80 L25 55 L50 75 Z M85 80 L95 55 L70 75 Z" />
        <path d="M100 110 Q 130 90 120 140" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none" />
    </svg>
);

export const NeuruSilhouette = ({ className, color = "#7ECEC1" }: SilhouetteProps) => (
    <svg viewBox="0 0 120 160" fill={color} className={className}>
        <path d="M20 120 Q 60 70 100 120 L 90 140 H 30 Z" />
        <circle cx="105" cy="110" r="15" />
    </svg>
);

export const RaonSilhouette = ({ className, color = "#FFD93D" }: SilhouetteProps) => (
    <svg viewBox="0 0 120 160" fill={color} className={className}>
        <circle cx="60" cy="110" r="35" />
        <path d="M30 110 Q 10 100 20 130 Z M90 110 Q 110 100 100 130 Z" />
        <path d="M50 85 L70 85 L60 70 Z" />
    </svg>
);
