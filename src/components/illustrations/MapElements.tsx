import React from 'react';

interface MapElementProps {
    className?: string;
    onClick?: () => void;
}

/* ── 지혜의 큰 나무 ── */
export const WisdomTree = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 120 120" className={className} onClick={onClick}>
        {/* Roots / ground */}
        <ellipse cx="60" cy="108" rx="26" ry="6" fill="#8BC48A" opacity="0.45" />
        {/* Trunk */}
        <rect x="52" y="74" width="16" height="36" rx="6" fill="#8B6914" />
        <rect x="56" y="76" width="6" height="30" rx="3" fill="#A0801A" opacity="0.35" />
        {/* Foliage — back layer */}
        <circle cx="42" cy="68" r="26" fill="#4CAF50" opacity="0.8" />
        <circle cx="78" cy="68" r="26" fill="#4CAF50" opacity="0.8" />
        {/* Foliage — main */}
        <circle cx="60" cy="56" r="34" fill="#66BB6A" />
        {/* Foliage — bright top */}
        <circle cx="60" cy="44" r="22" fill="#81C784" />
        {/* Highlight */}
        <circle cx="50" cy="40" r="10" fill="#A5D6A7" opacity="0.5" />
        {/* Apples */}
        <circle cx="44" cy="60" r="5" fill="#F44336" />
        <line x1="44" y1="55" x2="44" y2="52" stroke="#388E3C" strokeWidth="1.5" />
        <circle cx="74" cy="56" r="5" fill="#F44336" />
        <line x1="74" y1="51" x2="74" y2="48" stroke="#388E3C" strokeWidth="1.5" />
        <circle cx="60" cy="68" r="4" fill="#E53935" />
        {/* Owl on branch */}
        <rect x="36" y="58" width="14" height="5" rx="2.5" fill="#8B6914" opacity="0.6" />
        <ellipse cx="30" cy="52" rx="7" ry="9" fill="#C4A77D" />
        <circle cx="28" cy="48" r="2.5" fill="#2C2C2C" />
        <circle cx="32" cy="48" r="2.5" fill="#2C2C2C" />
        <circle cx="28.5" cy="47.5" r="1" fill="white" />
        <circle cx="32.5" cy="47.5" r="1" fill="white" />
        <polygon points="30,51 29,53 31,53" fill="#FF8B4A" />
        <polygon points="24,44 28,51 23,51" fill="#C4A77D" />
        <polygon points="36,44 32,51 37,51" fill="#C4A77D" />
    </svg>
);

/* ── 두근시장 ── */
export const Market = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 120 120" className={className} onClick={onClick}>
        {/* Shadow */}
        <ellipse cx="60" cy="112" rx="42" ry="5" fill="#C4A77D" opacity="0.25" />
        {/* Building body */}
        <rect x="16" y="54" width="88" height="54" rx="7" fill="#FFF8E7" stroke="#C4A77D" strokeWidth="2.5" />
        {/* Awning */}
        <rect x="10" y="42" width="100" height="18" rx="6" fill="#FF8B4A" />
        {[0,1,2,3,4,5].map(i => (
            <rect key={i} x={13 + i * 16} y="42" width="8" height="18" rx="2"
                fill="#D4621A" opacity="0.35" />
        ))}
        {/* Sign board */}
        <rect x="32" y="26" width="56" height="18" rx="5" fill="#FFD93D" />
        <text x="60" y="38" fontSize="9" textAnchor="middle" fill="#7A5000" fontWeight="bold">두근시장</text>
        {/* Windows */}
        <rect x="20" y="62" width="24" height="18" rx="4" fill="#87CEEB" stroke="#C4A77D" strokeWidth="1.5" />
        <line x1="32" y1="62" x2="32" y2="80" stroke="#C4A77D" strokeWidth="1" />
        <line x1="20" y1="71" x2="44" y2="71" stroke="#C4A77D" strokeWidth="1" />
        <rect x="76" y="62" width="24" height="18" rx="4" fill="#87CEEB" stroke="#C4A77D" strokeWidth="1.5" />
        <line x1="88" y1="62" x2="88" y2="80" stroke="#C4A77D" strokeWidth="1" />
        <line x1="76" y1="71" x2="100" y2="71" stroke="#C4A77D" strokeWidth="1" />
        {/* Door */}
        <rect x="48" y="80" width="24" height="28" rx="5" fill="#C4A77D" />
        <circle cx="68" cy="95" r="2.5" fill="#FFD93D" />
        <rect x="50" y="82" width="9" height="24" rx="2" fill="#A0845A" opacity="0.3" />
        {/* Produce on stall */}
        <circle cx="26" cy="94" r="5" fill="#F44336" opacity="0.9" />
        <circle cx="36" cy="92" r="4" fill="#FFD93D" opacity="0.9" />
        <circle cx="85" cy="93" r="5" fill="#66BB6A" opacity="0.9" />
        <circle cx="96" cy="91" r="4" fill="#FF8B4A" opacity="0.9" />
    </svg>
);

/* ── 배움터 ── */
export const School = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 120 120" className={className} onClick={onClick}>
        <ellipse cx="60" cy="112" rx="44" ry="5" fill="#6B7FBF" opacity="0.2" />
        {/* Main building */}
        <rect x="18" y="58" width="84" height="52" rx="5" fill="#EEF2FF" stroke="#6B7FBF" strokeWidth="2.5" />
        {/* Roof */}
        <polygon points="10,58 60,20 110,58" fill="#6B7FBF" />
        <rect x="8" y="54" width="104" height="8" rx="4" fill="#5A6BAF" />
        {/* Bell tower */}
        <rect x="49" y="8" width="22" height="16" rx="4" fill="#5A6BAF" />
        <ellipse cx="60" cy="10" rx="7" ry="6" fill="#7B8DCF" />
        {/* Bell */}
        <path d="M56 14 Q60 18 64 14" stroke="#FFD93D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <line x1="60" y1="18" x2="60" y2="22" stroke="#FFD93D" strokeWidth="2" />
        {/* Windows */}
        <rect x="24" y="70" width="24" height="20" rx="4" fill="#87CEEB" stroke="#6B7FBF" strokeWidth="1.5" />
        <line x1="36" y1="70" x2="36" y2="90" stroke="#6B7FBF" strokeWidth="1" />
        <line x1="24" y1="80" x2="48" y2="80" stroke="#6B7FBF" strokeWidth="1" />
        <rect x="72" y="70" width="24" height="20" rx="4" fill="#87CEEB" stroke="#6B7FBF" strokeWidth="1.5" />
        <line x1="84" y1="70" x2="84" y2="90" stroke="#6B7FBF" strokeWidth="1" />
        <line x1="72" y1="80" x2="96" y2="80" stroke="#6B7FBF" strokeWidth="1" />
        {/* Door */}
        <rect x="46" y="84" width="28" height="26" rx="6" fill="#6B7FBF" />
        <circle cx="71" cy="98" r="2.5" fill="#FFD93D" />
        {/* Star / decoration on roof */}
        <text x="60" y="46" fontSize="11" textAnchor="middle">⭐</text>
    </svg>
);

/* ── 무지개공방 ── */
export const Workshop = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 120 120" className={className} onClick={onClick}>
        <ellipse cx="60" cy="112" rx="42" ry="5" fill="#FF8B4A" opacity="0.2" />
        {/* Building */}
        <rect x="16" y="56" width="88" height="54" rx="7" fill="#FFF9F0" stroke="#FF8B4A" strokeWidth="2.5" />
        {/* Roof */}
        <polygon points="10,56 60,22 110,56" fill="#FF8B4A" />
        <rect x="8" y="52" width="104" height="8" rx="4" fill="#E07A3A" />
        {/* Sign */}
        <rect x="28" y="22" width="64" height="14" rx="5" fill="#FFD93D" />
        <text x="60" y="32" fontSize="7.5" textAnchor="middle" fill="#7A5000" fontWeight="bold">🌈 무지개공방</text>
        {/* Windows */}
        <rect x="20" y="64" width="26" height="20" rx="4" fill="#FFF3D0" stroke="#FF8B4A" strokeWidth="1.5" />
        <rect x="74" y="64" width="26" height="20" rx="4" fill="#FFF3D0" stroke="#FF8B4A" strokeWidth="1.5" />
        {/* Paintbrush in left window */}
        <line x1="30" y1="65" x2="30" y2="82" stroke="#8B5E3C" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="30" cy="64" rx="3.5" ry="2.5" fill="#FF8B8B" />
        {/* Color palette in right window */}
        <ellipse cx="85" cy="74" rx="9" ry="7" fill="#EEE" stroke="#CCC" strokeWidth="1" />
        <circle cx="80" cy="72" r="2.5" fill="#FF6B6B" />
        <circle cx="87" cy="70" r="2.5" fill="#FFD93D" />
        <circle cx="90" cy="76" r="2.5" fill="#66BB6A" />
        {/* Door with rainbow arc */}
        <rect x="47" y="82" width="26" height="28" rx="5" fill="#FF8B4A" />
        {(['#FF6B6B','#FFD93D','#66BB6A','#64B5F6'] as string[]).map((c, i) => (
            <path key={i}
                d={`M ${50 + i * 1.5} 92 Q 60 ${82 - i * 3} ${70 - i * 1.5} 92`}
                stroke={c} strokeWidth="2.5" fill="none" opacity="0.8" strokeLinecap="round" />
        ))}
        <circle cx="69" cy="96" r="2.5" fill="#FFD93D" />
    </svg>
);

/* ── 나눔 텃밭 ── */
export const Farm = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 120 120" className={className} onClick={onClick}>
        {/* Sky */}
        <rect x="8" y="8" width="104" height="50" rx="8" fill="#E1F5FE" opacity="0.6" />
        <circle cx="92" cy="24" r="14" fill="#FFD93D" opacity="0.85" />
        {[0,60,120,180,240,300].map(a => (
            <line key={a}
                x1={92 + Math.cos(a * Math.PI / 180) * 18} y1={24 + Math.sin(a * Math.PI / 180) * 18}
                x2={92 + Math.cos(a * Math.PI / 180) * 24} y2={24 + Math.sin(a * Math.PI / 180) * 24}
                stroke="#FFD93D" strokeWidth="2" strokeLinecap="round" />
        ))}
        {/* Fence */}
        {[0,1,2,3,4].map(i => (
            <rect key={i} x={14 + i * 23} y="54" width="7" height="20" rx="2.5" fill="#C4A77D" />
        ))}
        <rect x="12" y="60" width="96" height="5" rx="2" fill="#C4A77D" />
        {/* Soil */}
        <rect x="12" y="66" width="96" height="46" rx="7" fill="#A0522D" opacity="0.6" />
        {/* Soil rows */}
        {[0,1,2].map(i => (
            <rect key={i} x="16" y={70 + i * 13} width="88" height="8" rx="4" fill="#8B4513" opacity="0.4" />
        ))}
        {/* Plants row 1 */}
        {[24,44,64,84,100].map((x, i) => (
            <g key={x}>
                <line x1={x} y1="70" x2={x} y2={56 - (i%2)*4} stroke="#388E3C" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx={x} cy={52 - (i%2)*4} r="7"
                    fill={(['#66BB6A','#F44336','#FFD93D','#66BB6A','#FF8B4A'] as string[])[i]} opacity="0.9" />
            </g>
        ))}
        {/* Watering can */}
        <rect x="88" y="88" width="20" height="14" rx="4" fill="#7EC8C1" />
        <path d="M88 92 Q78 88 76 92" stroke="#7EC8C1" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <rect x="94" y="83" width="10" height="6" rx="2" fill="#5AAAA0" />
        {/* Butterfly */}
        <path d="M26 38 Q20 30 14 36 Q20 42 26 38" fill="#FF8B8B" opacity="0.7" />
        <path d="M26 38 Q32 30 38 36 Q32 42 26 38" fill="#FF8B4A" opacity="0.7" />
    </svg>
);

/* ── 어울림 광장 ── */
export const Plaza = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 120 120" className={className} onClick={onClick}>
        {/* Outer green ring */}
        <circle cx="60" cy="66" r="48" fill="#C8E6C9" stroke="#8BC48A" strokeWidth="2" />
        {/* Paving area */}
        <circle cx="60" cy="66" r="36" fill="#F5EDE0" stroke="#C4A77D" strokeWidth="2" />
        {/* Inner circle */}
        <circle cx="60" cy="66" r="18" fill="#FFF8E7" stroke="#C4A77D" strokeWidth="1.5" />
        {/* Diagonal paths */}
        {[45, 135, 225, 315].map(a => (
            <line key={a}
                x1={60 + Math.cos(a * Math.PI / 180) * 18}
                y1={66 + Math.sin(a * Math.PI / 180) * 18}
                x2={60 + Math.cos(a * Math.PI / 180) * 36}
                y2={66 + Math.sin(a * Math.PI / 180) * 36}
                stroke="#C4A77D" strokeWidth="6" opacity="0.3" strokeLinecap="round" />
        ))}
        {/* Cardinal paths */}
        {[0, 90, 180, 270].map(a => (
            <line key={a}
                x1={60 + Math.cos(a * Math.PI / 180) * 18}
                y1={66 + Math.sin(a * Math.PI / 180) * 18}
                x2={60 + Math.cos(a * Math.PI / 180) * 36}
                y2={66 + Math.sin(a * Math.PI / 180) * 36}
                stroke="#C4A77D" strokeWidth="5" opacity="0.25" strokeLinecap="round" />
        ))}
        {/* Fountain basin */}
        <ellipse cx="60" cy="66" rx="12" ry="9" fill="#90CAF9" stroke="#64B5F6" strokeWidth="2" />
        {/* Water arc */}
        <path d="M54 62 Q60 52 66 62" stroke="#42A5F5" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="60" cy="52" r="2.5" fill="#90CAF9" opacity="0.7" />
        {/* Benches */}
        <rect x="34" y="55" width="14" height="5" rx="2.5" fill="#A0845A" />
        <rect x="72" y="55" width="14" height="5" rx="2.5" fill="#A0845A" />
        {/* Flowers on outer ring */}
        {[0,60,120,180,240,300].map((a, i) => (
            <circle key={a}
                cx={60 + Math.cos(a * Math.PI / 180) * 42}
                cy={66 + Math.sin(a * Math.PI / 180) * 38}
                r="5.5"
                fill={(['#FF8B8B','#FFD93D','#8BC48A','#64B5F6','#FF8B4A','#CE93D8'] as string[])[i]}
                opacity="0.9" />
        ))}
        {/* Flag pole */}
        <line x1="60" y1="22" x2="60" y2="48" stroke="#C4A77D" strokeWidth="2.5" />
        <polygon points="60,22 76,28 60,34" fill="#FF8B8B" />
    </svg>
);

/* ── 고요한 연못 ── */
export const Pond = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 120 120" className={className} onClick={onClick}>
        {/* Grass surround */}
        <ellipse cx="60" cy="74" rx="52" ry="38" fill="#A5D6A7" opacity="0.6" />
        {/* Water */}
        <ellipse cx="60" cy="76" rx="40" ry="26" fill="#4FC3F7" />
        <ellipse cx="60" cy="76" rx="40" ry="26" fill="#29B6F6" opacity="0.3" />
        {/* Water shimmer */}
        <ellipse cx="46" cy="70" rx="13" ry="4" fill="white" opacity="0.22" transform="rotate(-12,46,70)" />
        <ellipse cx="72" cy="80" rx="9" ry="3" fill="white" opacity="0.18" transform="rotate(8,72,80)" />
        {/* Lily pads */}
        <ellipse cx="36" cy="82" rx="9" ry="6" fill="#43A047" opacity="0.85" />
        <circle cx="34" cy="78" r="3.5" fill="#FF8B8B" opacity="0.9" />
        <ellipse cx="80" cy="77" rx="8" ry="5" fill="#43A047" opacity="0.85" />
        <circle cx="82" cy="73" r="3" fill="#FFD93D" opacity="0.9" />
        {/* Reeds left */}
        <line x1="18" y1="74" x2="18" y2="46" stroke="#558B2F" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="18" cy="45" rx="4" ry="8" fill="#5D4037" opacity="0.75" />
        <line x1="26" y1="76" x2="26" y2="54" stroke="#558B2F" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="26" cy="53" rx="3" ry="6" fill="#5D4037" opacity="0.7" />
        {/* Reeds right */}
        <line x1="102" y1="72" x2="102" y2="48" stroke="#558B2F" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="102" cy="47" rx="4" ry="8" fill="#5D4037" opacity="0.75" />
        {/* Duck */}
        <ellipse cx="58" cy="70" rx="9" ry="6" fill="white" />
        <circle cx="64" cy="66" r="6" fill="white" />
        <ellipse cx="68" cy="65" rx="5" ry="3" fill="#FFB300" />
        <circle cx="67" cy="64" r="1.5" fill="#2C2C2C" />
        {/* Ripples */}
        <ellipse cx="58" cy="75" rx="11" ry="2.5" fill="white" opacity="0.18" />
        {/* Sky */}
        <circle cx="90" cy="20" r="16" fill="#FFD93D" opacity="0.75" />
        <ellipse cx="28" cy="22" rx="22" ry="10" fill="white" opacity="0.75" />
        <ellipse cx="40" cy="15" rx="14" ry="8" fill="white" opacity="0.7" />
    </svg>
);

/* ── 용기의 다리 ── */
export const Bridge = ({ className, onClick }: MapElementProps) => (
    <svg viewBox="0 0 120 120" className={className} onClick={onClick}>
        {/* River */}
        <ellipse cx="60" cy="96" rx="52" ry="16" fill="#64B5F6" opacity="0.65" />
        <path d="M8 92 Q34 84 60 92 Q86 100 112 92"
            stroke="#90CAF9" strokeWidth="2" fill="none" opacity="0.5" />
        {/* Stone pillars */}
        <rect x="16" y="74" width="10" height="26" rx="4" fill="#A0845A" />
        <rect x="94" y="74" width="10" height="26" rx="4" fill="#A0845A" />
        {/* Bridge arch */}
        <path d="M14 78 Q60 32 106 78" fill="none" stroke="#C4A77D" strokeWidth="14" strokeLinecap="round" />
        <path d="M14 78 Q60 32 106 78" fill="none" stroke="#D4B896" strokeWidth="7" strokeLinecap="round" opacity="0.5" />
        {/* Bridge deck */}
        <rect x="10" y="74" width="100" height="14" rx="5" fill="#C4A77D" />
        <rect x="10" y="74" width="100" height="5" rx="2.5" fill="#D4B896" opacity="0.45" />
        {/* Plank lines */}
        {[0,1,2,3,4,5,6,7,8].map(i => (
            <rect key={i} x={14 + i * 11} y="74" width="7" height="14" rx="1.5"
                fill="#8B6914" opacity="0.3" />
        ))}
        {/* Rope rail */}
        <path d="M16 72 Q60 56 104 72" stroke="#8B6914" strokeWidth="2.5" fill="none" opacity="0.55" />
        {/* Rail posts */}
        {[22,40,60,80,98].map(x => (
            <line key={x} x1={x} y1={70 + Math.round(Math.abs((x-60)*0.06))} x2={x} y2="78"
                stroke="#8B6914" strokeWidth="2" strokeLinecap="round" />
        ))}
        {/* Sky */}
        <circle cx="90" cy="24" r="14" fill="#FFD93D" opacity="0.78" />
        <ellipse cx="28" cy="26" rx="20" ry="10" fill="white" opacity="0.72" />
        {/* Sparrow flying */}
        <path d="M50 46 Q53 42 56 46 Q59 42 62 46"
            stroke="#FFD93D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
);
