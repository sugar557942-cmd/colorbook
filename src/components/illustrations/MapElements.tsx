import React from 'react';

interface MapElementProps {
    className?: string;
    onClick?: () => void;
}

export const WisdomTree = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 200 200" className={className} onClick={onClick}>
        <path d="M100 180 V150" stroke="#C4A77D" strokeWidth="15" strokeLinecap="round" />
        <circle cx="100" cy="100" r="70" fill="#8BC48A" />
        <circle cx="70" cy="80" r="40" fill="#78B377" />
        <circle cx="130" cy="80" r="40" fill="#78B377" />
        <circle cx="100" cy="60" r="40" fill="#9CD69B" />
    </svg>
);

export const Market = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 200 200" className={className} onClick={onClick}>
        <rect x="40" y="80" width="120" height="80" rx="10" fill="#F5EDE0" stroke="#C4A77D" strokeWidth="4" />
        <path d="M30 80 L100 40 L170 80 Z" fill="#FF8B8B" stroke="#C4A77D" strokeWidth="4" />
        <rect x="60" y="110" width="30" height="50" fill="#C4A77D" />
        <rect x="110" y="110" width="30" height="30" rx="5" fill="#87CEEB" />
    </svg>
);

export const School = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 200 200" className={className} onClick={onClick}>
        <rect x="50" y="70" width="100" height="90" rx="5" fill="#FFFDF5" stroke="#6B7FBF" strokeWidth="4" />
        <path d="M40 70 L100 30 L160 70 Z" fill="#6B7FBF" />
        <circle cx="100" cy="55" r="10" fill="white" />
        <rect x="85" y="120" width="30" height="40" fill="#6B7FBF" />
    </svg>
);

export const Workshop = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 200 200" className={className} onClick={onClick}>
        <rect x="50" y="90" width="100" height="70" rx="10" fill="#FFFDF5" stroke="#FFD93D" strokeWidth="4" />
        <path d="M40 90 L60 60 L140 60 L160 90 Z" fill="#FFD93D" />
        <circle cx="100" cy="120" r="15" fill="#FF8B8B" />
    </svg>
);

export const Farm = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 200 200" className={className} onClick={onClick}>
        <rect x="30" y="100" width="140" height="60" rx="10" fill="#D2B48C" />
        <path d="M50 110 H150 M50 130 H150 M50 150 H150" stroke="#C4A77D" strokeWidth="2" />
        <path d="M60 110 V150 M90 110 V150 M120 110 V150 M150 110 V150" stroke="#C4A77D" strokeWidth="2" />
        <circle cx="160" cy="90" r="10" fill="#FF8B4A" />
    </svg>
);

export const Plaza = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 200 200" className={className} onClick={onClick}>
        <circle cx="100" cy="130" r="60" fill="#ECEEF5" stroke="#C3AED6" strokeWidth="4" />
        <path d="M100 70 V130" stroke="#C3AED6" strokeWidth="3" />
        <path d="M100 70 L130 85 L100 100" fill="#FF8B8B" />
    </svg>
);

export const Pond = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 200 200" className={className} onClick={onClick}>
        <ellipse cx="100" cy="130" rx="80" ry="40" fill="#87CEEB" stroke="#7ECEC1" strokeWidth="4" />
        <path d="M60 120 Q 100 110 140 120" stroke="white" strokeWidth="3" opacity="0.5" fill="none" />
    </svg>
);

export const Bridge = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 200 200" className={className} onClick={onClick}>
        <path d="M30 140 Q 100 80 170 140" stroke="#C4A77D" strokeWidth="15" fill="none" />
        <path d="M30 140 L30 160 M60 112 L60 160 M100 95 L100 160 M140 112 L140 160 M170 140 L170 160" stroke="#C4A77D" strokeWidth="4" />
    </svg>
);
