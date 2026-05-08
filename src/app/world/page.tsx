"use client";

import React, { useState } from 'react';
import { characters } from '@/data/characters';
import Link from 'next/link';

/* ── CSS keyframe animations ────────────────────────────── */
const mapStyles = `
  @keyframes mm-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
  @keyframes mm-sway { 0%,100% { transform: rotate(-1.2deg); } 50% { transform: rotate(1.2deg); } }
  @keyframes mm-smoke { 0% { transform: translate(0,0) scale(1); opacity: 0.7; } 100% { transform: translate(8px,-50px) scale(1.8); opacity: 0; } }
  @keyframes mm-ripple { 0% { r: 0; opacity: 0.7; } 100% { r: 30; opacity: 0; } }
  @keyframes mm-ripple2 { 0% { r: 0; opacity: 0.6; } 100% { r: 22; opacity: 0; } }
  @keyframes mm-bird { 0% { transform: translate(-100px, 0); } 100% { transform: translate(1700px, -40px); } }
  @keyframes mm-bird2 { 0% { transform: translate(1700px, 30px); } 100% { transform: translate(-100px, -10px); } }
  @keyframes mm-cloud { 0% { transform: translateX(0); } 100% { transform: translateX(120px); } }
  @keyframes mm-butterfly1 { 0% { transform: translate(0,0); } 25% { transform: translate(40px,-30px); } 50% { transform: translate(80px,10px); } 75% { transform: translate(40px,40px); } 100% { transform: translate(0,0); } }
  @keyframes mm-butterfly2 { 0% { transform: translate(0,0); } 25% { transform: translate(-50px,30px); } 50% { transform: translate(-30px,60px); } 75% { transform: translate(20px,30px); } 100% { transform: translate(0,0); } }
  @keyframes mm-spray { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-14px); opacity: 0; } }
  @keyframes mm-fish { 0% { transform: translateX(0) scaleX(1); } 49% { transform: translateX(60px) scaleX(1); } 50% { transform: translateX(60px) scaleX(-1); } 99% { transform: translateX(0) scaleX(-1); } 100% { transform: translateX(0) scaleX(1); } }
  @keyframes mm-pop { 0% { transform: scale(0) translateY(10px); opacity: 0; } 60% { transform: scale(1.1) translateY(-2px); opacity: 1; } 100% { transform: scale(1) translateY(0); opacity: 1; } }

  .mm-pin {
    cursor: pointer;
    animation: mm-bob 3.6s ease-in-out infinite;
    transition: opacity 250ms ease, filter 250ms ease;
  }
  .mm-pin:hover { z-index: 20 !important; }
  .mm-pin:hover .mm-icon-wrap { transform: scale(1.15) translateY(-4px); }
  .mm-pin.is-active .mm-icon-wrap { transform: scale(1.2); }
  .mm-pin.is-dim { opacity: 0.45; filter: saturate(0.5); }
  .mm-icon-wrap { transition: transform 220ms cubic-bezier(.2,.8,.2,1.2); }
  .mm-peek { opacity: 0; transform: translateY(8px) scale(0.7); pointer-events: none; transition: all 280ms cubic-bezier(.2,.8,.2,1.4); }
  .mm-pin:hover .mm-peek, .mm-pin.is-active .mm-peek { opacity: 1; transform: translateY(0) scale(1); }
`;

/* ── Location data ───────────────────────────────────────── */
const locations = [
    { id: 'market',   name: '두근시장',       sub: '나리의 발명 작업실',  x: 18, y: 26, char: 'nari',  color: '#E69470', icon: 'shop'     },
    { id: 'school',   name: '배움터',          sub: '하루의 작은 학교',    x: 78, y: 22, char: 'haru',  color: '#B6CB95', icon: 'school'   },
    { id: 'tree',     name: '지혜의 큰 나무',  sub: '지우의 둥지',         x: 50, y: 30, char: 'jiu',   color: '#9CABCE', icon: 'tree'     },
    { id: 'workshop', name: '무지개공방',      sub: '소리의 다락방',       x: 14, y: 64, char: 'sori',  color: '#E29AA2', icon: 'workshop' },
    { id: 'plaza',    name: '어울림 광장',     sub: '모두가 모이는 곳',    x: 50, y: 56, char: null,    color: '#ECC472', icon: 'plaza'    },
    { id: 'farm',     name: '나눔 텃밭',       sub: '느루의 느린 정원',    x: 38, y: 80, char: 'neuru', color: '#9CC4B8', icon: 'farm'     },
    { id: 'pond',     name: '고요한 연못',     sub: '다온이의 통나무집',   x: 76, y: 76, char: 'daon',  color: '#C9A87E', icon: 'pond'     },
    { id: 'lookout',  name: '하늘 전망대',     sub: '라온이의 둥지',       x: 88, y: 48, char: 'raon',  color: '#ECC472', icon: 'lookout'  },
];

/* ── Pin icon SVGs ───────────────────────────────────────── */
function PinIcon({ icon }: { icon: string }) {
    switch (icon) {
        case 'shop': return (
            <svg viewBox="0 0 64 64" width="60" height="60">
                <path d="M 8 22 Q 32 16 56 22 L 50 30 L 14 30 Z" fill="#F1AE8B" />
                <path d="M 14 22 L 14 30 M 22 22 L 22 30 M 30 22 L 30 30 M 38 22 L 38 30 M 46 22 L 46 30" stroke="#FFFCF3" strokeWidth="1.4" />
                <rect x="14" y="30" width="36" height="22" fill="#FBE6CB" rx="6" />
                <circle cx="22" cy="38" r="3" fill="#9CC4B8" />
                <circle cx="42" cy="38" r="3" fill="#9CC4B8" />
                <path d="M 26 46 Q 32 50 38 46" stroke="#8E6748" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <rect x="14" y="50" width="36" height="3" fill="#B07A55" rx="2" />
                <line x1="32" y1="22" x2="32" y2="14" stroke="#6E5942" strokeWidth="1" />
                <path d="M 32 14 L 38 17 L 32 20 Z" fill="#D87C7E" />
            </svg>
        );
        case 'school': return (
            <svg viewBox="0 0 64 64" width="60" height="60">
                <path d="M 10 30 Q 32 10 54 30 Z" fill="#B6CB95" />
                <rect x="14" y="28" width="36" height="24" fill="#FBE6CB" rx="6" />
                <rect x="28" y="38" width="8" height="14" fill="#8E6748" rx="4" />
                <circle cx="21" cy="36" r="4" fill="#9CABCE" />
                <circle cx="43" cy="36" r="4" fill="#9CABCE" />
                <circle cx="21" cy="36" r="1.4" fill="#FFFCF3" />
                <circle cx="43" cy="36" r="1.4" fill="#FFFCF3" />
                <rect x="14" y="50" width="36" height="3" fill="#B07A55" rx="2" />
                <circle cx="32" cy="20" r="4" fill="#ECC472" />
                <circle cx="32" cy="19" r="1" fill="#FFFCF3" />
            </svg>
        );
        case 'tree': return (
            <svg viewBox="0 0 64 64" width="60" height="60">
                <ellipse cx="32" cy="54" rx="20" ry="3" fill="#000" opacity="0.1" />
                <rect x="28" y="32" width="8" height="22" fill="#8E6748" rx="2" />
                <ellipse cx="22" cy="26" rx="14" ry="12" fill="#7B9D67" />
                <ellipse cx="42" cy="24" rx="14" ry="13" fill="#8AA67E" />
                <ellipse cx="32" cy="16" rx="16" ry="14" fill="#9DB389" />
                <ellipse cx="32" cy="22" rx="6" ry="7" fill="#9CABCE" />
                <circle cx="29" cy="20" r="1.5" fill="#FFFCF3" />
                <circle cx="35" cy="20" r="1.5" fill="#FFFCF3" />
                <circle cx="29" cy="20" r="0.6" fill="#4A3826" />
                <circle cx="35" cy="20" r="0.6" fill="#4A3826" />
                <path d="M 31 23 L 32 25 L 33 23 Z" fill="#E2A352" />
            </svg>
        );
        case 'workshop': return (
            <svg viewBox="0 0 64 64" width="60" height="60">
                <path d="M 14 30 Q 32 12 50 30 Z" fill="#E29AA2" />
                <rect x="18" y="28" width="28" height="22" fill="#FBE6CB" rx="6" />
                <rect x="14" y="50" width="36" height="3" fill="#B07A55" rx="2" />
                <circle cx="32" cy="22" r="3.5" fill="#FFFCF3" />
                <circle cx="32" cy="22" r="1.4" fill="#E29AA2" />
                <path d="M 20 52 Q 32 32 44 52" stroke="#E29AA2" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <path d="M 22 52 Q 32 35 42 52" stroke="#ECC472" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <path d="M 24 52 Q 32 38 40 52" stroke="#B6CB95" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <path d="M 26 52 Q 32 41 38 52" stroke="#9CABCE" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </svg>
        );
        case 'plaza': return (
            <svg viewBox="0 0 64 64" width="60" height="60">
                <ellipse cx="32" cy="52" rx="24" ry="7" fill="#F4D67C" opacity="0.5" />
                <circle cx="16" cy="22" r="4" fill="#E69470" />
                <circle cx="24" cy="20" r="4" fill="#F1C667" />
                <circle cx="32" cy="19" r="4" fill="#B6CB95" />
                <circle cx="40" cy="20" r="4" fill="#9CABCE" />
                <circle cx="48" cy="22" r="4" fill="#E29AA2" />
                <circle cx="32" cy="42" r="10" fill="#FBE6CB" />
                <circle cx="32" cy="42" r="6" fill="#9CC4B8" />
                <circle cx="30" cy="40" r="1.2" fill="#FFFCF3" />
                <circle cx="34" cy="40" r="1.2" fill="#FFFCF3" />
                <path d="M 28 44 q 4 3 8 0" stroke="#4A3826" strokeWidth="1" fill="none" strokeLinecap="round" />
            </svg>
        );
        case 'farm': return (
            <svg viewBox="0 0 64 64" width="60" height="60">
                <ellipse cx="32" cy="52" rx="26" ry="7" fill="#B07A55" opacity="0.4" />
                <path d="M 4 28 Q 14 16 24 28 Z" fill="#8E6748" />
                <rect x="8" y="28" width="12" height="14" fill="#B07A55" rx="3" />
                <rect x="11" y="34" width="6" height="8" fill="#6B4D2E" rx="2" />
                <circle cx="32" cy="46" r="4" fill="#7B9D67" />
                <circle cx="42" cy="48" r="4" fill="#9DB389" />
                <circle cx="52" cy="46" r="4" fill="#7B9D67" />
                <path d="M 32 42 L 32 38 M 42 44 L 42 40 M 52 42 L 52 38" stroke="#7B9D67" strokeWidth="1.6" strokeLinecap="round" />
                <g transform="translate(40, 32)">
                    <ellipse cx="0" cy="0" rx="8" ry="4.5" fill="#9CC4B8" />
                    <circle cx="7" cy="-1" r="3" fill="#9CC4B8" />
                    <circle cx="8" cy="-1.5" r="0.7" fill="#4A3826" />
                </g>
            </svg>
        );
        case 'pond': return (
            <svg viewBox="0 0 64 64" width="60" height="60">
                <path d="M 6 26 Q 24 8 42 26 Z" fill="#8E6748" />
                <rect x="10" y="24" width="28" height="22" fill="#B07A55" rx="5" />
                <path d="M 10 30 L 38 30 M 10 34 L 38 34 M 10 38 L 38 38" stroke="#6B4D2E" strokeWidth="0.7" />
                <rect x="20" y="34" width="8" height="12" fill="#6B4D2E" rx="4" />
                <ellipse cx="50" cy="50" rx="12" ry="5" fill="#9CC4B8" />
                <ellipse cx="50" cy="49" rx="9" ry="3" fill="#C5DAD6" />
                <g transform="translate(24, 50)">
                    <ellipse cx="-10" cy="0" rx="7" ry="5" fill="#C9A87E" />
                    <circle cx="-15" cy="-3" r="2.5" fill="#C9A87E" />
                    <circle cx="-5" cy="-3" r="2.5" fill="#C9A87E" />
                    <circle cx="-12" cy="-1" r="0.7" fill="#4A3826" />
                    <circle cx="-8" cy="-1" r="0.7" fill="#4A3826" />
                    <circle cx="-10" cy="1" r="0.6" fill="#4A3826" />
                </g>
            </svg>
        );
        case 'lookout': return (
            <svg viewBox="0 0 64 64" width="60" height="60">
                <path d="M 4 56 Q 14 38 28 44 Q 42 28 58 36 L 58 58 L 4 58 Z" fill="#B6CB95" />
                <rect x="42" y="22" width="3" height="20" fill="#8E6748" rx="1.5" />
                <rect x="34" y="18" width="19" height="6" fill="#ECC472" rx="3" />
                <path d="M 32 18 Q 44 8 55 18 Z" fill="#E69470" />
                <line x1="44" y1="18" x2="44" y2="6" stroke="#6E5942" strokeWidth="1" />
                <path d="M 44 6 L 52 9 L 44 12 Z" fill="#D87C7E" />
                <g transform="translate(20, 40)">
                    <ellipse cx="0" cy="0" rx="5" ry="4" fill="#ECC472" />
                    <circle cx="3" cy="-1" r="3" fill="#ECC472" />
                    <circle cx="4" cy="-1.4" r="0.8" fill="#4A3826" />
                    <path d="M 5.5 -0.6 l 1.5 0.6 l -1.5 0.6 Z" fill="#E2A352" />
                </g>
            </svg>
        );
        default: return null;
    }
}

/* ── Pin component ──────────────────────────────────────── */
interface PinProps {
    loc: typeof locations[0];
    active: string | null;
    onActivate: (id: string | null) => void;
}

function Pin({ loc, active, onActivate }: PinProps) {
    const char = characters.find(c => c.slug === loc.char);
    const isActive = active === loc.id;
    const isDim = active !== null && !isActive;

    return (
        <div
            className={`mm-pin absolute flex flex-col items-center gap-1 ${isActive ? 'is-active' : ''} ${isDim ? 'is-dim' : ''}`}
            style={{ top: `${loc.y}%`, left: `${loc.x}%`, transform: 'translate(-50%, -100%)', zIndex: isActive ? 20 : 10 }}
            onClick={(e) => { e.stopPropagation(); onActivate(isActive ? null : loc.id); }}
        >
            {/* character peek badge */}
            {char && (
                <div className="mm-peek mb-[-8px] relative z-10"
                    style={{
                        width: 34, height: 34, borderRadius: '50%',
                        background: `radial-gradient(circle at 35% 30%, #FFF8E5, ${loc.color})`,
                        border: '2px solid #FFFCF3',
                        display: 'grid', placeItems: 'center',
                        fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: 11, color: '#FFFCF3',
                        boxShadow: '0 4px 10px -4px rgba(74, 56, 38, 0.5)',
                        transform: 'rotate(-6deg)',
                    }}>
                    {char.name}
                </div>
            )}

            {/* icon */}
            <div className="mm-icon-wrap"
                style={{ filter: 'drop-shadow(0 6px 8px rgba(74, 56, 38, 0.18))' }}>
                <PinIcon icon={loc.icon} />
            </div>

            {/* label */}
            <div style={{
                padding: '3px 9px', background: '#FFFCF3', borderRadius: 6,
                fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: 11, color: '#4A3826',
                border: `1.5px solid ${loc.color}`, boxShadow: '0 3px 6px rgba(120, 80, 30, 0.18)',
                whiteSpace: 'nowrap', transform: 'rotate(-1deg)',
            }}>
                {loc.name}
            </div>
        </div>
    );
}

/* ── Main Page ──────────────────────────────────────────── */
export default function WorldPage() {
    const [active, setActive] = useState<string | null>(null);

    const activeLoc = active ? locations.find(l => l.id === active) : null;
    const activeChar = activeLoc?.char ? characters.find(c => c.slug === activeLoc.char) : null;

    return (
        <div className="sb-paper min-h-screen pt-6 pb-16 px-4 md:px-8 max-w-[1440px] mx-auto" onClick={() => setActive(null)}>
            <style>{mapStyles}</style>

            {/* Header */}
            <div className="text-center mb-6 pt-8">
                <div style={{ fontFamily: 'var(--font-script)', fontSize: 22, color: '#D87C7E' }}>welcome to maeul</div>
                <h1 className="sb-title" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: '#4A3826', margin: '6px 0 10px' }}>
                    마음마을 지도
                </h1>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: '#6E5942' }}>
                    여덟 개의 장소를 지나며 친구들의 일상을 만나봐요.
                </p>
            </div>

            {/* Map container */}
            <div
                style={{
                    position: 'relative', aspectRatio: '16 / 11',
                    borderRadius: 36, overflow: 'hidden',
                    border: '6px solid #FFFCF3',
                    boxShadow: '0 0 0 1px rgba(155, 120, 70, 0.2), 0 14px 40px -20px rgba(120,80,30,0.3)',
                    maxHeight: '68vh',
                }}
                onClick={() => setActive(null)}
            >
                {/* ── SVG background scene ── */}
                <svg viewBox="0 0 1600 1100" preserveAspectRatio="xMidYMid slice"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                    <defs>
                        <radialGradient id="mm-sky" cx="50%" cy="0%" r="100%">
                            <stop offset="0%" stopColor="#FCE5DA" />
                            <stop offset="40%" stopColor="#F8E2C5" />
                            <stop offset="100%" stopColor="#F4E0B5" />
                        </radialGradient>
                        <radialGradient id="mm-meadow" cx="50%" cy="100%" r="80%">
                            <stop offset="0%" stopColor="#C8DAA8" />
                            <stop offset="100%" stopColor="#DBE5C4" />
                        </radialGradient>
                        <radialGradient id="mm-water" cx="50%" cy="50%" r="60%">
                            <stop offset="0%" stopColor="#C5DAD6" />
                            <stop offset="100%" stopColor="#9CC4B8" />
                        </radialGradient>
                    </defs>

                    {/* Sky & meadow base */}
                    <rect x="0" y="0" width="1600" height="500" fill="url(#mm-sky)" />
                    <rect x="0" y="380" width="1600" height="720" fill="url(#mm-meadow)" />

                    {/* Distant mountains */}
                    <path d="M 0 420 Q 180 320 360 380 Q 540 280 720 360 Q 900 280 1080 360 Q 1260 290 1440 360 Q 1540 330 1600 380 L 1600 480 L 0 480 Z" fill="#B7A5CE" opacity="0.42" />
                    <path d="M 0 460 Q 200 380 400 430 Q 600 360 800 410 Q 1000 360 1200 410 Q 1400 360 1600 420 L 1600 520 L 0 520 Z" fill="#9CABCE" opacity="0.38" />

                    {/* River */}
                    <path d="M 0 540 C 200 520, 400 600, 600 580 C 800 560, 900 660, 1100 700 C 1300 740, 1450 760, 1600 800 L 1600 850 C 1450 810, 1300 790, 1100 750 C 900 710, 800 610, 600 630 C 400 650, 200 570, 0 590 Z" fill="url(#mm-water)" opacity="0.7" />
                    <path d="M 200 555 Q 400 565, 600 585 Q 800 605, 1100 685 Q 1300 720, 1500 770" stroke="#FFFCF3" strokeWidth="2" fill="none" opacity="0.5" strokeDasharray="6 14" />

                    {/* Pond (bottom right) */}
                    <ellipse cx="1220" cy="840" rx="180" ry="80" fill="#9CC4B8" opacity="0.7" />
                    <ellipse cx="1220" cy="836" rx="160" ry="68" fill="#C5DAD6" opacity="0.85" />
                    <circle cx="1200" cy="838" r="0" fill="none" stroke="#FFFCF3" strokeWidth="1.4" style={{ animation: 'mm-ripple 3.2s ease-out infinite' }} />
                    <circle cx="1240" cy="845" r="0" fill="none" stroke="#FFFCF3" strokeWidth="1.4" style={{ animation: 'mm-ripple2 4s ease-out infinite 1.2s' }} />
                    <g style={{ animation: 'mm-fish 8s ease-in-out infinite', transformOrigin: '1190px 838px' }}>
                        <ellipse cx="1190" cy="838" rx="6" ry="2.5" fill="#E69470" />
                        <path d="M 1184 838 L 1180 835 L 1180 841 Z" fill="#E69470" />
                        <circle cx="1192" cy="837" r="0.6" fill="#4A3826" />
                    </g>
                    <ellipse cx="1180" cy="820" rx="22" ry="14" fill="#7B9D67" opacity="0.7" />
                    <ellipse cx="1260" cy="850" rx="18" ry="12" fill="#7B9D67" opacity="0.7" />

                    {/* Forest (top-left) */}
                    {Array.from({ length: 14 }).map((_, i) => {
                        const x = 60 + i * 38 + (i % 3) * 8;
                        const y = 280 + (i % 3) * 18;
                        const c = ['#7B9D67', '#8AA67E', '#9DB389', '#7B9D67'][i % 4];
                        return (
                            <g key={i}>
                                <ellipse cx={x} cy={y + 30} rx="14" ry="6" fill="#000" opacity="0.06" />
                                <path d={`M ${x} ${y - 30} L ${x - 18} ${y + 18} L ${x + 18} ${y + 18} Z`} fill={c} />
                                <rect x={x - 2.5} y={y + 18} width="5" height="8" fill="#6B4D2E" />
                            </g>
                        );
                    })}

                    {/* Farm rows */}
                    <g transform="translate(540, 800)">
                        <ellipse cx="80" cy="60" rx="160" ry="70" fill="#B07A55" opacity="0.35" />
                        {[0,1,2,3].map(i => (
                            <path key={i} d={`M ${-50 + i*50} 30 Q ${-30 + i*50} 60 ${-50 + i*50} 90`} stroke="#8E6748" strokeWidth="3" fill="none" opacity="0.5" />
                        ))}
                        {[0,1,2,3,4,5,6].map(i => (
                            <circle key={i} cx={-60 + i * 28} cy={40 + (i%2)*30} r="6" fill="#7B9D67" opacity="0.85" />
                        ))}
                    </g>

                    {/* Big tree — whole group sways together */}
                    <g style={{ animation: 'mm-sway 5.2s ease-in-out infinite', transformOrigin: '800px 390px' }}>
                        <g transform="translate(800, 330)">
                            <ellipse cx="0" cy="60" rx="50" ry="14" fill="#000" opacity="0.08" />
                            <rect x="-12" y="-10" width="24" height="70" fill="#8E6748" rx="12" />
                            <ellipse cx="-26" cy="-26" rx="42" ry="36" fill="#9DB389" />
                            <ellipse cx="26" cy="-28" rx="44" ry="38" fill="#8AA67E" />
                            <ellipse cx="0" cy="-58" rx="50" ry="40" fill="#A8C49A" />
                            <circle cx="-30" cy="-50" r="3" fill="#E29AA2" />
                            <circle cx="20" cy="-72" r="3" fill="#F1AE8B" />
                            <circle cx="34" cy="-44" r="3" fill="#ECC472" />
                            {/* Owl face (지우) */}
                            <ellipse cx="0" cy="-30" rx="16" ry="13" fill="#9CABCE" />
                            <circle cx="-5" cy="-32" r="4.5" fill="#FFFCF3" />
                            <circle cx="5" cy="-32" r="4.5" fill="#FFFCF3" />
                            <circle cx="-5" cy="-31" r="2.4" fill="#4A3826" />
                            <circle cx="5" cy="-31" r="2.4" fill="#4A3826" />
                            <circle cx="-4" cy="-32" r="0.9" fill="#FFFCF3" />
                            <circle cx="6" cy="-32" r="0.9" fill="#FFFCF3" />
                            <path d="M -2 -27 L 0 -25 L 2 -27 Z" fill="#E2A352" />
                        </g>
                    </g>

                    {/* Paths from plaza (800, 616) */}
                    {[
                        "M 800 616 Q 700 470, 290 380",
                        "M 800 616 Q 950 470, 1240 350",
                        "M 800 616 L 800 460",
                        "M 800 616 Q 600 700, 220 1020",
                        "M 800 616 Q 700 800, 610 880",
                        "M 800 616 Q 1000 720, 1220 840",
                        "M 800 616 Q 1100 600, 1380 540",
                    ].map((d, i) => (
                        <path key={i} d={d} stroke="#B07A55" strokeWidth="6" strokeDasharray="2 14" fill="none" strokeLinecap="round" opacity="0.6" />
                    ))}

                    {/* Plaza */}
                    <g transform="translate(800, 616)">
                        <circle r="80" fill="#F4D67C" opacity="0.45" />
                        <circle r="64" fill="#F8E2C5" opacity="0.7" />
                        <circle r="48" fill="none" stroke="#E2A352" strokeWidth="2" strokeDasharray="3 6" opacity="0.6" />
                        <circle r="14" fill="#9CC4B8" opacity="0.8" />
                        <g style={{ animation: 'mm-spray 1.6s ease-out infinite' }}>
                            <circle cx="0" cy="-14" r="2" fill="#9CC4B8" />
                        </g>
                        <path d="M 0 -10 L 0 -20 M -8 -8 L -14 -16 M 8 -8 L 14 -16" stroke="#FFFCF3" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </g>

                    {/* Scattered flowers */}
                    {Array.from({ length: 30 }).map((_, i) => {
                        const x = 100 + (i * 53) % 1500;
                        const y = 540 + (i * 37) % 480;
                        const c = ['#E29AA2', '#F1AE8B', '#ECC472', '#B7A5CE'][i % 4];
                        return <circle key={i} cx={x} cy={y} r="3.5" fill={c} opacity="0.85" />;
                    })}

                    {/* Grass blades */}
                    {Array.from({ length: 60 }).map((_, i) => {
                        const x = 30 + (i * 27) % 1560;
                        const y = 580 + (i * 19) % 480;
                        return <path key={i} d={`M ${x} ${y+8} Q ${x+2} ${y+2} ${x+4} ${y+8}`} stroke="#7B9D67" strokeWidth="1.4" fill="none" opacity={0.4 + (i % 4) * 0.1} />;
                    })}

                    {/* Animated clouds */}
                    <g style={{ animation: 'mm-cloud 22s ease-in-out infinite alternate' }}>
                        <ellipse cx="260" cy="160" rx="60" ry="18" fill="#FFFCF3" opacity="0.7" />
                        <ellipse cx="290" cy="150" rx="32" ry="14" fill="#FFFCF3" opacity="0.7" />
                    </g>
                    <g style={{ animation: 'mm-cloud 30s ease-in-out infinite alternate-reverse' }}>
                        <ellipse cx="1180" cy="120" rx="70" ry="20" fill="#FFFCF3" opacity="0.65" />
                        <ellipse cx="1210" cy="110" rx="34" ry="15" fill="#FFFCF3" opacity="0.65" />
                    </g>

                    {/* Market chimney smoke */}
                    <g transform="translate(296, 270)">
                        <circle cx="0" cy="0" r="6" fill="#FFFCF3" opacity="0.75" style={{ animation: 'mm-smoke 3s ease-out infinite' }} />
                        <circle cx="0" cy="0" r="5" fill="#FFFCF3" opacity="0.7" style={{ animation: 'mm-smoke 3s ease-out infinite 1s' }} />
                        <circle cx="0" cy="0" r="5" fill="#FFFCF3" opacity="0.7" style={{ animation: 'mm-smoke 3s ease-out infinite 2s' }} />
                    </g>

                    {/* Flying birds */}
                    <g style={{ animation: 'mm-bird 18s linear infinite' }}>
                        <path d="M 0 200 q 8 -8 16 0 q 8 -8 16 0" stroke="#4A3826" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                    </g>
                    <g style={{ animation: 'mm-bird2 24s linear infinite 4s' }}>
                        <path d="M 0 240 q 6 -6 12 0 q 6 -6 12 0" stroke="#4A3826" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </g>

                    {/* Butterflies */}
                    <g transform="translate(420, 720)" style={{ animation: 'mm-butterfly1 9s ease-in-out infinite' }}>
                        <ellipse cx="-3" cy="-2" rx="4" ry="5" fill="#E29AA2" />
                        <ellipse cx="3" cy="-2" rx="4" ry="5" fill="#E29AA2" />
                        <ellipse cx="-3" cy="3" rx="3" ry="3" fill="#F1AE8B" />
                        <ellipse cx="3" cy="3" rx="3" ry="3" fill="#F1AE8B" />
                    </g>
                    <g transform="translate(1080, 880)" style={{ animation: 'mm-butterfly2 11s ease-in-out infinite 2s' }}>
                        <ellipse cx="-3" cy="-2" rx="4" ry="5" fill="#ECC472" />
                        <ellipse cx="3" cy="-2" rx="4" ry="5" fill="#ECC472" />
                        <ellipse cx="-3" cy="3" rx="3" ry="3" fill="#B6CB95" />
                        <ellipse cx="3" cy="3" rx="3" ry="3" fill="#B6CB95" />
                    </g>
                </svg>

                {/* ── Location Pins ── */}
                {locations.map(loc => (
                    <Pin key={loc.id} loc={loc} active={active} onActivate={setActive} />
                ))}

                {/* ── Compass ── */}
                <div style={{
                    position: 'absolute', bottom: 18, left: 20, zIndex: 20,
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'rgba(255, 252, 243, 0.92)', border: '2px solid #B07A55',
                    display: 'grid', placeItems: 'center',
                    fontFamily: 'var(--font-script)', color: '#8E6748',
                    boxShadow: '0 4px 14px rgba(120,80,30,0.15)',
                }}>
                    <div style={{ position: 'absolute', top: 6, fontSize: 11, fontWeight: 700 }}>N</div>
                    <div style={{ position: 'absolute', bottom: 6, fontSize: 10 }}>S</div>
                    <div style={{ position: 'absolute', left: 7, fontSize: 10 }}>W</div>
                    <div style={{ position: 'absolute', right: 7, fontSize: 10 }}>E</div>
                    <div style={{ width: 4, height: 32, background: 'linear-gradient(180deg, #D87C7E 50%, #B07A55 50%)', borderRadius: 2 }} />
                </div>

                {/* Map title badge */}
                <div style={{
                    position: 'absolute', top: 16, left: '50%',
                    transform: 'translateX(-50%) rotate(-1.2deg)',
                    padding: '7px 20px', background: '#FFFCF3',
                    border: '1.5px solid #B07A55', borderRadius: 4,
                    fontFamily: 'var(--font-script)', fontSize: 18, fontWeight: 700, color: '#8E6748',
                    boxShadow: '0 4px 10px rgba(120, 80, 30, 0.15)', whiteSpace: 'nowrap', zIndex: 20,
                }}>
                    maeul village · 마음마을
                </div>

                {/* Scale */}
                <div style={{
                    position: 'absolute', bottom: 22, right: 22, zIndex: 20,
                    fontFamily: 'var(--font-script)', color: '#8E6748', fontSize: 12,
                    opacity: 0.75, textAlign: 'right',
                }}>
                    ──── 100m ────<br />
                    <em>"마음껏 거닐어 보세요"</em>
                </div>

                {/* Active location detail panel */}
                {activeLoc && (
                    <div
                        style={{
                            position: 'absolute', bottom: 18, left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#FFFCF3', borderRadius: 20, padding: '14px 22px',
                            border: `2px solid ${activeLoc.color}`,
                            boxShadow: '0 8px 28px rgba(120,80,30,0.2)',
                            display: 'flex', alignItems: 'center', gap: 14,
                            zIndex: 30, minWidth: 280,
                            animation: 'mm-pop 350ms ease-out forwards',
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{
                            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                            background: `${activeLoc.color}22`,
                            border: `1.5px solid ${activeLoc.color}`,
                            display: 'grid', placeItems: 'center',
                        }}>
                            <PinIcon icon={activeLoc.icon} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: 17, color: '#4A3826' }}>{activeLoc.name}</div>
                            <div style={{ fontFamily: 'var(--font-hand)', fontSize: 13, color: '#9A8569' }}>{activeLoc.sub}</div>
                            {activeChar && (
                                <Link href={`/characters/${activeChar.slug}`}
                                    style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: activeLoc.color, fontWeight: 700, textDecoration: 'none' }}>
                                    {activeChar.animalEmoji} {activeChar.name}의 공간 →
                                </Link>
                            )}
                        </div>
                        <button onClick={() => setActive(null)}
                            style={{ fontFamily: 'var(--font-hand)', fontSize: 18, color: '#9A8569', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                            ×
                        </button>
                    </div>
                )}
            </div>

            {/* Legend grid */}
            <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                {locations.map(loc => {
                    const ch = characters.find(c => c.slug === loc.char);
                    return (
                        <div key={loc.id} style={{
                            background: '#FFFCF3', borderRadius: 18, padding: '13px 15px',
                            display: 'flex', gap: 12, alignItems: 'flex-start',
                            border: '1px solid rgba(155, 120, 70, 0.16)',
                            boxShadow: '0 2px 14px rgba(120, 80, 30, 0.08)',
                            cursor: 'pointer', transition: 'box-shadow 200ms',
                        }}
                            onClick={(e) => { e.stopPropagation(); setActive(active === loc.id ? null : loc.id); }}
                        >
                            <div style={{
                                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                                background: loc.color, display: 'grid', placeItems: 'center',
                                fontFamily: 'var(--font-title)', fontWeight: 700, color: '#FFFCF3', fontSize: 14,
                            }}>
                                {ch ? ch.name : '✦'}
                            </div>
                            <div>
                                <div className="sb-title" style={{ fontSize: 14, color: '#4A3826', lineHeight: 1.2 }}>{loc.name}</div>
                                <div style={{ fontFamily: 'var(--font-hand)', fontSize: 12, color: '#9A8569', marginTop: 2 }}>{loc.sub}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
