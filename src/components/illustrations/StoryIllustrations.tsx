"use client";
import React from 'react';

type P = { className?: string };
type Mood = 'happy' | 'sad' | 'thinking' | 'surprised';

// ═══════════════════════════════════════════════════════════════
//  Shared Character Components
//  Each character is centered at (0,0). Use transform to place.
// ═══════════════════════════════════════════════════════════════

const Bear = ({ cx = 0, cy = 0, s = 1, mood = 'happy' as Mood }:
  { cx?: number; cy?: number; s?: number; mood?: Mood }) => (
  <g transform={`translate(${cx},${cy}) scale(${s})`}>
    <ellipse cx="0" cy="55" rx="38" ry="46" fill="#C4A77D" />
    <ellipse cx="0" cy="65" rx="22" ry="28" fill="#D4B896" />
    <circle cx="0" cy="0" r="42" fill="#C4A77D" />
    <circle cx="-28" cy="-28" r="14" fill="#C4A77D" />
    <circle cx="-28" cy="-28" r="7" fill="#D4B896" />
    <circle cx="28" cy="-28" r="14" fill="#C4A77D" />
    <circle cx="28" cy="-28" r="7" fill="#D4B896" />
    <circle cx="-13" cy="-7" r="6" fill="#3D3D3D" />
    <circle cx="13" cy="-7" r="6" fill="#3D3D3D" />
    <circle cx="-11" cy="-9" r="2" fill="white" />
    <circle cx="15" cy="-9" r="2" fill="white" />
    <ellipse cx="0" cy="5" rx="8" ry="5" fill="#8B5E3C" />
    {mood === 'happy'    && <path d="M -8 16 Q 0 24 8 16" stroke="#8B5E3C" strokeWidth="2.5" fill="none" strokeLinecap="round" />}
    {mood === 'sad'      && <path d="M -8 21 Q 0 14 8 21" stroke="#8B5E3C" strokeWidth="2.5" fill="none" strokeLinecap="round" />}
    {mood === 'thinking' && <line x1="-5" y1="18" x2="5" y2="18" stroke="#8B5E3C" strokeWidth="2.5" strokeLinecap="round" />}
    {mood === 'surprised'&& <circle cx="0" cy="18" r="5" fill="none" stroke="#8B5E3C" strokeWidth="2" />}
    <ellipse cx="-48" cy="27" rx="11" ry="22" fill="#C4A77D" transform="rotate(-20,-48,27)" />
    <ellipse cx="48" cy="27" rx="11" ry="22" fill="#C4A77D" transform="rotate(20,48,27)" />
  </g>
);

const Fox = ({ cx = 0, cy = 0, s = 1, mood = 'happy' as Mood }:
  { cx?: number; cy?: number; s?: number; mood?: Mood }) => (
  <g transform={`translate(${cx},${cy}) scale(${s})`}>
    <ellipse cx="0" cy="58" rx="34" ry="44" fill="#FF8B4A" />
    <ellipse cx="0" cy="68" rx="18" ry="26" fill="#FFC299" />
    <ellipse cx="36" cy="75" rx="20" ry="10" fill="#FF8B4A" transform="rotate(35,36,75)" />
    <ellipse cx="42" cy="68" rx="12" ry="7" fill="white" transform="rotate(35,42,68)" />
    <circle cx="0" cy="0" r="36" fill="#FF8B4A" />
    <ellipse cx="0" cy="8" rx="20" ry="14" fill="#FFC299" />
    <polygon points="-28,-18 -18,-48 -8,-18" fill="#FF8B4A" />
    <polygon points="-25,-22 -18,-44 -11,-22" fill="#FF6060" />
    <polygon points="8,-18 18,-48 28,-18" fill="#FF8B4A" />
    <polygon points="11,-22 18,-44 25,-22" fill="#FF6060" />
    <circle cx="-12" cy="-8" r="5.5" fill="#3D3D3D" />
    <circle cx="12" cy="-8" r="5.5" fill="#3D3D3D" />
    <circle cx="-10" cy="-10" r="2" fill="white" />
    <circle cx="14" cy="-10" r="2" fill="white" />
    <ellipse cx="0" cy="3" rx="6" ry="4" fill="#CC5500" />
    {mood === 'happy'    && <path d="M -7 13 Q 0 20 7 13" stroke="#CC5500" strokeWidth="2.5" fill="none" strokeLinecap="round" />}
    {mood === 'sad'      && <path d="M -7 18 Q 0 11 7 18" stroke="#CC5500" strokeWidth="2.5" fill="none" strokeLinecap="round" />}
    {mood === 'thinking' && <path d="M -4 16 Q 0 18 4 16" stroke="#CC5500" strokeWidth="2" fill="none" strokeLinecap="round" />}
    {mood === 'surprised'&& <circle cx="0" cy="16" r="5" fill="none" stroke="#CC5500" strokeWidth="2" />}
    <ellipse cx="-44" cy="28" rx="10" ry="20" fill="#FF8B4A" transform="rotate(-20,-44,28)" />
    <ellipse cx="44" cy="28" rx="10" ry="20" fill="#FF8B4A" transform="rotate(20,44,28)" />
  </g>
);

const Rabbit = ({ cx = 0, cy = 0, s = 1, mood = 'happy' as Mood }:
  { cx?: number; cy?: number; s?: number; mood?: Mood }) => (
  <g transform={`translate(${cx},${cy}) scale(${s})`}>
    <ellipse cx="0" cy="55" rx="34" ry="44" fill="#F0F0F0" />
    <ellipse cx="0" cy="65" rx="18" ry="26" fill="#E8F5E9" />
    <circle cx="0" cy="0" r="36" fill="#F0F0F0" />
    <ellipse cx="-16" cy="-46" rx="10" ry="32" fill="#F0F0F0" />
    <ellipse cx="-16" cy="-46" rx="5" ry="24" fill="#FFD0D0" />
    <ellipse cx="16" cy="-46" rx="10" ry="32" fill="#F0F0F0" />
    <ellipse cx="16" cy="-46" rx="5" ry="24" fill="#FFD0D0" />
    <circle cx="-13" cy="-5" r="5.5" fill="#3D3D3D" />
    <circle cx="13" cy="-5" r="5.5" fill="#3D3D3D" />
    <circle cx="-11" cy="-7" r="2" fill="white" />
    <circle cx="15" cy="-7" r="2" fill="white" />
    <ellipse cx="0" cy="5" rx="6" ry="4" fill="#FF9999" />
    {mood === 'happy'    && <path d="M -7 14 Q 0 21 7 14" stroke="#AA5555" strokeWidth="2.5" fill="none" strokeLinecap="round" />}
    {mood === 'sad'      && <path d="M -7 19 Q 0 12 7 19" stroke="#AA5555" strokeWidth="2.5" fill="none" strokeLinecap="round" />}
    {mood === 'thinking' && <line x1="-4" y1="17" x2="4" y2="17" stroke="#AA5555" strokeWidth="2" strokeLinecap="round" />}
    {mood === 'surprised'&& <circle cx="0" cy="17" r="5" fill="none" stroke="#AA5555" strokeWidth="2" />}
    <ellipse cx="-44" cy="28" rx="10" ry="20" fill="#F0F0F0" transform="rotate(-15,-44,28)" />
    <ellipse cx="44" cy="28" rx="10" ry="20" fill="#F0F0F0" transform="rotate(15,44,28)" />
  </g>
);

const Owl = ({ cx = 0, cy = 0, s = 1, mood = 'happy' as Mood }:
  { cx?: number; cy?: number; s?: number; mood?: Mood }) => (
  <g transform={`translate(${cx},${cy}) scale(${s})`}>
    <ellipse cx="0" cy="55" rx="32" ry="44" fill="#6B7FBF" />
    <ellipse cx="0" cy="60" rx="18" ry="28" fill="#9AABDB" />
    <ellipse cx="-42" cy="40" rx="16" ry="30" fill="#5A6AAA" transform="rotate(-10,-42,40)" />
    <ellipse cx="42" cy="40" rx="16" ry="30" fill="#5A6AAA" transform="rotate(10,42,40)" />
    <circle cx="0" cy="0" r="38" fill="#6B7FBF" />
    <polygon points="-20,-32 -14,-52 -8,-32" fill="#4A5A9A" />
    <polygon points="8,-32 14,-52 20,-32" fill="#4A5A9A" />
    <ellipse cx="0" cy="2" rx="26" ry="24" fill="#9AABDB" opacity="0.6" />
    <circle cx="-12" cy="-5" r="11" fill="white" />
    <circle cx="12" cy="-5" r="11" fill="white" />
    <circle cx="-12" cy="-5" r="7" fill="#3D3D3D" />
    <circle cx="12" cy="-5" r="7" fill="#3D3D3D" />
    <circle cx="-9" cy="-8" r="2.5" fill="white" />
    <circle cx="15" cy="-8" r="2.5" fill="white" />
    <polygon points="0,5 -5,14 5,14" fill="#C4A77D" />
    {mood === 'happy'    && <path d="M -8 18 Q 0 23 8 18" stroke="#8B6A40" strokeWidth="2" fill="none" strokeLinecap="round" />}
    {mood === 'sad'      && <path d="M -8 22 Q 0 16 8 22" stroke="#8B6A40" strokeWidth="2" fill="none" strokeLinecap="round" />}
    {mood === 'thinking' && <line x1="-4" y1="20" x2="4" y2="20" stroke="#8B6A40" strokeWidth="2" strokeLinecap="round" />}
    {mood === 'surprised'&& <circle cx="0" cy="20" r="5" fill="none" stroke="#8B6A40" strokeWidth="2" />}
  </g>
);

const Sparrow = ({ cx = 0, cy = 0, s = 1 }:
  { cx?: number; cy?: number; s?: number }) => (
  <g transform={`translate(${cx},${cy}) scale(${s})`}>
    <ellipse cx="0" cy="10" rx="22" ry="18" fill="#FFD93D" />
    <ellipse cx="-24" cy="5" rx="14" ry="9" fill="#CC9900" transform="rotate(-20,-24,5)" />
    <ellipse cx="24" cy="5" rx="14" ry="9" fill="#CC9900" transform="rotate(20,24,5)" />
    <circle cx="0" cy="-16" r="18" fill="#FFD93D" />
    <polygon points="0,-16 -7,-10 0,-6" fill="#CC9900" />
    <circle cx="-7" cy="-18" r="4" fill="#3D3D3D" />
    <circle cx="-5.5" cy="-20" r="1.5" fill="white" />
    <polygon points="-10,25 0,18 10,25 5,32 -5,32" fill="#CC9900" />
    <path d="M -4 -8 Q 0 -4 4 -8" stroke="#8B6A00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </g>
);

const Turtle = ({ cx = 0, cy = 0, s = 1, mood = 'happy' as 'happy' | 'sad' }:
  { cx?: number; cy?: number; s?: number; mood?: 'happy' | 'sad' }) => (
  <g transform={`translate(${cx},${cy}) scale(${s})`}>
    <ellipse cx="0" cy="12" rx="38" ry="30" fill="#7ECEC1" />
    <ellipse cx="0" cy="10" rx="22" ry="18" fill="#5AAAA0" opacity="0.4" />
    <ellipse cx="-14" cy="18" rx="10" ry="8" fill="#5AAAA0" opacity="0.3" />
    <ellipse cx="14" cy="18" rx="10" ry="8" fill="#5AAAA0" opacity="0.3" />
    <circle cx="-28" cy="-4" r="16" fill="#7ECEC1" />
    <circle cx="-35" cy="-9" r="5" fill="#3D3D3D" />
    <circle cx="-33" cy="-11" r="2" fill="white" />
    {mood === 'happy' && <path d="M -34 6 Q -28 10 -22 6" stroke="#2D7A72" strokeWidth="2" fill="none" strokeLinecap="round" />}
    {mood === 'sad'   && <path d="M -34 10 Q -28 4 -22 10" stroke="#2D7A72" strokeWidth="2" fill="none" strokeLinecap="round" />}
    <ellipse cx="-30" cy="28" rx="8" ry="12" fill="#7ECEC1" transform="rotate(20,-30,28)" />
    <ellipse cx="30" cy="28" rx="8" ry="12" fill="#7ECEC1" transform="rotate(-20,30,28)" />
  </g>
);

// Cat (소리 – 고양이 🐱)
const Cat = ({ cx = 0, cy = 0, s = 1, mood = 'happy' as Mood }:
  { cx?: number; cy?: number; s?: number; mood?: Mood }) => (
  <g transform={`translate(${cx},${cy}) scale(${s})`}>
    <ellipse cx="0" cy="55" rx="36" ry="44" fill="#FF8B8B" />
    <ellipse cx="0" cy="65" rx="20" ry="26" fill="#FFB3C1" />
    <path d="M 28 78 Q 62 58 65 28 Q 66 6 48 0" stroke="#FF8B8B" strokeWidth="14" fill="none" strokeLinecap="round" />
    <path d="M 28 78 Q 62 58 65 28 Q 66 6 48 0" stroke="#FFB3C1" strokeWidth="6" fill="none" strokeLinecap="round" />
    <circle cx="0" cy="0" r="38" fill="#FF8B8B" />
    <polygon points="-28,-26 -18,-52 -8,-26" fill="#FF8B8B" />
    <polygon points="-24,-29 -18,-47 -12,-29" fill="#FFB3C1" />
    <polygon points="8,-26 18,-52 28,-26" fill="#FF8B8B" />
    <polygon points="12,-29 18,-47 24,-29" fill="#FFB3C1" />
    <circle cx="-13" cy="-6" r="6" fill="#3D3D3D" />
    <circle cx="13" cy="-6" r="6" fill="#3D3D3D" />
    <circle cx="-11" cy="-9" r="2" fill="white" />
    <circle cx="15" cy="-9" r="2" fill="white" />
    <polygon points="0,4 -4,9 4,9" fill="#CC5577" />
    <line x1="-5" y1="11" x2="-25" y2="7" stroke="#CC5577" strokeWidth="1.5" opacity="0.45" />
    <line x1="-5" y1="13" x2="-25" y2="13" stroke="#CC5577" strokeWidth="1.5" opacity="0.45" />
    <line x1="5" y1="11" x2="25" y2="7" stroke="#CC5577" strokeWidth="1.5" opacity="0.45" />
    <line x1="5" y1="13" x2="25" y2="13" stroke="#CC5577" strokeWidth="1.5" opacity="0.45" />
    {mood === 'happy'    && <path d="M -7 16 Q 0 23 7 16" stroke="#CC5577" strokeWidth="2.5" fill="none" strokeLinecap="round" />}
    {mood === 'sad'      && <path d="M -7 21 Q 0 14 7 21" stroke="#CC5577" strokeWidth="2.5" fill="none" strokeLinecap="round" />}
    {mood === 'thinking' && <line x1="-4" y1="18" x2="4" y2="18" stroke="#CC5577" strokeWidth="2" strokeLinecap="round" />}
    {mood === 'surprised'&& <circle cx="0" cy="18" r="5" fill="none" stroke="#CC5577" strokeWidth="2" />}
    <ellipse cx="-46" cy="26" rx="10" ry="20" fill="#FF8B8B" transform="rotate(-20,-46,26)" />
    <ellipse cx="46" cy="26" rx="10" ry="20" fill="#FF8B8B" transform="rotate(20,46,26)" />
  </g>
);

// ═══════════════════════════════════════════════════════════════
//  1화  다온이의 마음 날씨  🐻
// ═══════════════════════════════════════════════════════════════

export function DaonWeatherP1({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(180deg,#BCE7F5 0%,#FFF8E7 65%)' }}>
      {/* Sun */}
      <circle cx="296" cy="56" r="36" fill="#FFD93D" />
      {[0,45,90,135,180,225,270,315].map(a => (
        <line key={a}
          x1={296 + Math.cos(a * Math.PI / 180) * 44}
          y1={56 + Math.sin(a * Math.PI / 180) * 44}
          x2={296 + Math.cos(a * Math.PI / 180) * 56}
          y2={56 + Math.sin(a * Math.PI / 180) * 56}
          stroke="#FFD93D" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      ))}
      {/* Cloud */}
      <ellipse cx="75" cy="70" rx="48" ry="20" fill="white" opacity="0.9" />
      <ellipse cx="98" cy="56" rx="30" ry="18" fill="white" opacity="0.9" />
      <ellipse cx="50" cy="62" rx="22" ry="14" fill="white" opacity="0.9" />
      {/* Window */}
      <rect x="192" y="36" width="148" height="120" rx="5" fill="#87CEEB" opacity="0.5" />
      <rect x="192" y="36" width="148" height="120" rx="5" fill="none" stroke="#C4A77D" strokeWidth="8" />
      <line x1="266" y1="36" x2="266" y2="156" stroke="#C4A77D" strokeWidth="6" />
      <line x1="192" y1="96" x2="340" y2="96" stroke="#C4A77D" strokeWidth="6" />
      <rect x="184" y="152" width="164" height="13" rx="4" fill="#C4A77D" />
      {/* Flower pot on sill */}
      <rect x="194" y="143" width="16" height="13" rx="2" fill="#FF8B4A" opacity="0.8" />
      <circle cx="202" cy="136" r="9" fill="#8BC48A" />
      <circle cx="202" cy="128" r="6" fill="#FF8B8B" opacity="0.9" />
      {/* Floor */}
      <rect x="0" y="237" width="360" height="63" fill="#F5EDE0" />
      <rect x="0" y="234" width="360" height="5" fill="#C4A77D" opacity="0.25" />
      {/* Bear */}
      <Bear cx={108} cy={163} s={0.95} mood="thinking" />
      {/* Right arm reaching toward window */}
      <ellipse cx="160" cy="200" rx="14" ry="30" fill="#C4A77D" transform="rotate(28,160,200)" />
    </svg>
  );
}

export function DaonWeatherP2({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#E8F4FB 0%,#FFF3E0 60%,#FFF8E7 100%)' }}>
      {/* Sky with clouds and peeking sun */}
      <circle cx="268" cy="52" r="30" fill="#FFD93D" opacity="0.7" />
      <ellipse cx="240" cy="58" rx="68" ry="26" fill="white" opacity="0.85" />
      <ellipse cx="208" cy="46" rx="38" ry="20" fill="white" opacity="0.85" />
      <ellipse cx="268" cy="44" rx="33" ry="18" fill="white" opacity="0.85" />
      {/* Ground */}
      <ellipse cx="180" cy="278" rx="220" ry="32" fill="#A8D5A2" />
      <ellipse cx="180" cy="268" rx="220" ry="22" fill="#BDE5B5" />
      {/* Bear (slightly surprised-happy) */}
      <Bear cx={238} cy={168} s={0.9} mood="surprised" />
      {/* Bear left arm reaching */}
      <ellipse cx="196" cy="198" rx="12" ry="26" fill="#C4A77D" transform="rotate(-20,196,198)" />
      {/* Rabbit with basket */}
      <Rabbit cx={96} cy={170} s={0.88} mood="happy" />
      {/* Right arm of rabbit - holding basket */}
      <ellipse cx="140" cy="200" rx="11" ry="22" fill="#F0F0F0" transform="rotate(18,140,200)" />
      {/* Basket */}
      <rect x="134" y="210" width="46" height="20" rx="3" fill="#C4A77D" />
      <ellipse cx="157" cy="210" rx="23" ry="8" fill="#D4B896" />
      <line x1="145" y1="210" x2="145" y2="230" stroke="#8B5E3C" strokeWidth="1.5" opacity="0.5" />
      <line x1="157" y1="210" x2="157" y2="230" stroke="#8B5E3C" strokeWidth="1.5" opacity="0.5" />
      <line x1="169" y1="210" x2="169" y2="230" stroke="#8B5E3C" strokeWidth="1.5" opacity="0.5" />
      {/* Strawberries */}
      <circle cx="147" cy="207" r="6" fill="#FF4444" />
      <path d="M 143 202 Q 147 197 151 202" stroke="#4CAF50" strokeWidth="2" fill="#4CAF50" opacity="0.8" />
      <circle cx="159" cy="205" r="6" fill="#FF6666" />
      <path d="M 155 200 Q 159 195 163 200" stroke="#4CAF50" strokeWidth="2" fill="#4CAF50" opacity="0.8" />
      <circle cx="153" cy="213" r="5" fill="#FF3333" />
      {/* Sun rays breaking through */}
      <line x1="238" y1="86" x2="222" y2="108" stroke="#FFD93D" strokeWidth="3" opacity="0.7" strokeLinecap="round" />
      <line x1="256" y1="84" x2="248" y2="112" stroke="#FFD93D" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
    </svg>
  );
}

export function DaonWeatherP3({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#E8F5E9 0%,#FFF8E7 70%)' }}>
      {/* Soft tree background */}
      <ellipse cx="30" cy="160" rx="28" ry="45" fill="#8BC48A" opacity="0.4" />
      <circle cx="30" cy="115" r="35" fill="#8BC48A" opacity="0.35" />
      <ellipse cx="320" cy="165" rx="25" ry="40" fill="#8BC48A" opacity="0.35" />
      <circle cx="322" cy="122" r="30" fill="#8BC48A" opacity="0.3" />
      {/* Soft ground */}
      <ellipse cx="180" cy="288" rx="220" ry="28" fill="#BDE5B5" />
      {/* Small sitting blanket */}
      <ellipse cx="180" cy="262" rx="80" ry="14" fill="#FFF3E0" opacity="0.9" />
      {/* Bear sitting */}
      <Bear cx={128} cy={178} s={0.82} mood="thinking" />
      {/* Rabbit sitting across */}
      <Rabbit cx={234} cy={178} s={0.82} mood="happy" />
      {/* Speech bubble from rabbit */}
      <rect x="252" y="80" width="90" height="42" rx="12" fill="white" opacity="0.92" stroke="#8BC48A" strokeWidth="2" />
      <polygon points="260,122 272,122 256,136" fill="white" stroke="#8BC48A" strokeWidth="1.5" />
      <text x="297" y="107" fontSize="20" textAnchor="middle">☁️🌤️</text>
      {/* Small flowers on ground */}
      <circle cx="70" cy="265" r="5" fill="#FFD93D" />
      <circle cx="280" cy="268" r="5" fill="#FF8B8B" />
      <circle cx="310" cy="262" r="4" fill="#C3AED6" />
    </svg>
  );
}

export function DaonWeatherP4({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(180deg,#FFF8E7 0%,#FFF3E0 100%)' }}>
      {/* Warm window light */}
      <rect x="270" y="20" width="80" height="100" rx="8" fill="#FFF9C4" opacity="0.6" />
      <rect x="270" y="20" width="80" height="100" rx="8" fill="none" stroke="#C4A77D" strokeWidth="6" />
      <line x1="310" y1="20" x2="310" y2="120" stroke="#C4A77D" strokeWidth="5" />
      <line x1="270" y1="70" x2="350" y2="70" stroke="#C4A77D" strokeWidth="5" />
      {/* Small table */}
      <rect x="60" y="210" width="200" height="16" rx="4" fill="#C4A77D" />
      <rect x="80" y="226" width="12" height="50" rx="4" fill="#C4A77D" />
      <rect x="228" y="226" width="12" height="50" rx="4" fill="#C4A77D" />
      {/* Paper on table */}
      <rect x="105" y="188" width="100" height="80" rx="5" fill="white" stroke="#E0D0C0" strokeWidth="2" />
      {/* Weather drawings on paper */}
      <circle cx="135" cy="212" r="12" fill="#FFD93D" />
      <ellipse cx="175" cy="212" rx="16" ry="10" fill="#CCCCCC" opacity="0.8" />
      <ellipse cx="185" cy="220" rx="14" ry="9" fill="#AAAAAA" opacity="0.7" />
      {/* Sun rays on paper */}
      {[0,60,120,180,240,300].map(a => (
        <line key={a}
          x1={135 + Math.cos(a * Math.PI / 180) * 16}
          y1={212 + Math.sin(a * Math.PI / 180) * 16}
          x2={135 + Math.cos(a * Math.PI / 180) * 22}
          y2={212 + Math.sin(a * Math.PI / 180) * 22}
          stroke="#FFD93D" strokeWidth="2" strokeLinecap="round" />
      ))}
      {/* Pencil */}
      <rect x="214" y="192" width="8" height="50" rx="2" fill="#FFD93D" transform="rotate(20,214,192)" />
      <polygon points="214,192 222,192 218,182" fill="#FFC299" transform="rotate(20,218,192)" />
      {/* Floor */}
      <rect x="0" y="252" width="360" height="48" fill="#F5EDE0" />
      {/* Bear sitting at table */}
      <Bear cx={156} cy={162} s={0.75} mood="thinking" />
    </svg>
  );
}

export function DaonWeatherP5({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(180deg,#FDE8C8 0%,#FFF8E7 60%)' }}>
      {/* Evening sun low */}
      <circle cx="50" cy="220" r="40" fill="#FFD93D" opacity="0.5" />
      {/* Ground */}
      <ellipse cx="180" cy="285" rx="220" ry="30" fill="#BDE5B5" />
      {/* 5 characters holding papers */}
      <Bear cx={72} cy={192} s={0.62} mood="happy" />
      <Rabbit cx={138} cy={195} s={0.60} mood="happy" />
      {/* Center character - bear silhouette (소리/cat as pink) */}
      <g transform="translate(200,192) scale(0.60)">
        <ellipse cx="0" cy="55" rx="34" ry="44" fill="#FF8B8B" />
        <ellipse cx="0" cy="65" rx="18" ry="26" fill="#FFC0C0" />
        <circle cx="0" cy="0" r="36" fill="#FF8B8B" />
        <polygon points="-22,-18 -14,-40 -6,-18" fill="#FF8B8B" />
        <polygon points="6,-18 14,-40 22,-18" fill="#FF8B8B" />
        <circle cx="-12" cy="-6" r="5" fill="#3D3D3D" /><circle cx="12" cy="-6" r="5" fill="#3D3D3D" />
        <circle cx="-10" cy="-8" r="1.8" fill="white" /><circle cx="14" cy="-8" r="1.8" fill="white" />
        <path d="M -7 13 Q 0 20 7 13" stroke="#CC5555" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="-44" cy="28" rx="10" ry="20" fill="#FF8B8B" transform="rotate(-15,-44,28)" />
        <ellipse cx="44" cy="28" rx="10" ry="20" fill="#FF8B8B" transform="rotate(15,44,28)" />
      </g>
      <Fox cx={265} cy={192} s={0.60} mood="happy" />
      <Owl cx={322} cy={195} s={0.58} mood="happy" />
      {/* Papers held up */}
      {[
        { x: 72, y: 130, icon: '☁️', },
        { x: 138, y: 128, icon: '🌈' },
        { x: 200, y: 126, icon: '⛈️' },
        { x: 265, y: 126, icon: '🌤️' },
        { x: 322, y: 128, icon: '🌫️' },
      ].map(({ x, y, icon }) => (
        <g key={x}>
          <rect x={x - 20} y={y} width="40" height="32" rx="4" fill="white" opacity="0.9" stroke="#E0D0C0" strokeWidth="1.5" />
          <text x={x} y={y + 22} fontSize="18" textAnchor="middle">{icon}</text>
        </g>
      ))}
      {/* Warm glow */}
      <ellipse cx="180" cy="230" rx="180" ry="20" fill="#FFD93D" opacity="0.08" />
    </svg>
  );
}

export function DaonWeatherP6({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#B8DCEF 0%,#FFF8E7 55%,#E8F5E9 100%)' }}>
      {/* Large sun */}
      <circle cx="75" cy="80" r="52" fill="#FFD93D" opacity="0.85" />
      {[0,40,80,120,160,200,240,280,320].map(a => (
        <line key={a}
          x1={75 + Math.cos(a * Math.PI / 180) * 60}
          y1={80 + Math.sin(a * Math.PI / 180) * 60}
          x2={75 + Math.cos(a * Math.PI / 180) * 74}
          y2={80 + Math.sin(a * Math.PI / 180) * 74}
          stroke="#FFD93D" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      ))}
      {/* Storm cloud */}
      <ellipse cx="230" cy="68" rx="60" ry="26" fill="#9E9E9E" opacity="0.75" />
      <ellipse cx="200" cy="56" rx="36" ry="22" fill="#BDBDBD" opacity="0.8" />
      <ellipse cx="258" cy="54" rx="30" ry="18" fill="#9E9E9E" opacity="0.7" />
      {/* Rain drops */}
      {[210,225,240,255,270].map(x => (
        <line key={x} x1={x} y1="90" x2={x - 5} y2="110" stroke="#5BC0EB" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      ))}
      {/* Rainbow */}
      <path d="M 10 190 Q 110 60 310 180" fill="none" stroke="#FF8B8B" strokeWidth="8" opacity="0.5" strokeLinecap="round" />
      <path d="M 20 196 Q 115 72 306 186" fill="none" stroke="#FFD93D" strokeWidth="7" opacity="0.5" strokeLinecap="round" />
      <path d="M 30 202 Q 120 84 302 192" fill="none" stroke="#8BC48A" strokeWidth="6" opacity="0.5" strokeLinecap="round" />
      <path d="M 38 208 Q 124 94 298 198" fill="none" stroke="#87CEEB" strokeWidth="5" opacity="0.5" strokeLinecap="round" />
      {/* Small fog wisps */}
      <ellipse cx="290" cy="170" rx="50" ry="12" fill="white" opacity="0.55" />
      <ellipse cx="310" cy="182" rx="40" ry="10" fill="white" opacity="0.45" />
      {/* Calm ground */}
      <ellipse cx="180" cy="280" rx="220" ry="28" fill="#BDE5B5" />
      {/* Bear silhouette looking up */}
      <g transform="translate(180,235) scale(0.55)">
        <ellipse cx="0" cy="55" rx="38" ry="46" fill="#C4A77D" opacity="0.9" />
        <circle cx="0" cy="0" r="42" fill="#C4A77D" opacity="0.9" />
        <circle cx="-28" cy="-28" r="14" fill="#C4A77D" opacity="0.9" />
        <circle cx="28" cy="-28" r="14" fill="#C4A77D" opacity="0.9" />
      </g>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
//  2화  나리의 뚝딱뚝딱 발명품  🦊
// ═══════════════════════════════════════════════════════════════

export function NariInventionP1({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#FFF3E0 0%,#FFF8E7 100%)' }}>
      {/* Workshop walls */}
      <rect x="0" y="0" width="360" height="300" fill="#FFF8F0" opacity="0.5" />
      {/* Shelves */}
      <rect x="10" y="60" width="120" height="8" rx="3" fill="#C4A77D" />
      <rect x="10" y="100" width="120" height="8" rx="3" fill="#C4A77D" />
      {/* Tools on shelf */}
      <rect x="20" y="48" width="10" height="16" rx="2" fill="#9E9E9E" />
      <polygon points="25,32 20,48 30,48" fill="#9E9E9E" />
      <rect x="40" y="50" width="14" height="12" rx="2" fill="#FF8B4A" opacity="0.8" />
      <circle cx="60" cy="52" r="7" fill="#FFD93D" />
      <circle cx="75" cy="50" r="9" fill="#6B7FBF" opacity="0.7" />
      {/* Gears on lower shelf */}
      <circle cx="25" cy="90" r="10" fill="#9E9E9E" opacity="0.8" />
      <circle cx="25" cy="90" r="5" fill="#FFF8F0" />
      <circle cx="50" cy="87" r="13" fill="#B0BEC5" opacity="0.8" />
      <circle cx="50" cy="87" r="6" fill="#FFF8F0" />
      <circle cx="78" cy="91" r="8" fill="#9E9E9E" opacity="0.8" />
      <circle cx="78" cy="91" r="4" fill="#FFF8F0" />
      {/* Floor */}
      <rect x="0" y="248" width="360" height="52" fill="#F5EDE0" />
      {/* Small workbench */}
      <rect x="180" y="220" width="160" height="12" rx="3" fill="#C4A77D" />
      <rect x="195" y="232" width="10" height="40" rx="3" fill="#C4A77D" />
      <rect x="320" y="232" width="10" height="40" rx="3" fill="#C4A77D" />
      {/* Invention on bench (gears + belts) */}
      <rect x="210" y="192" width="90" height="34" rx="5" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" />
      <circle cx="230" cy="209" r="14" fill="#B0BEC5" />
      <circle cx="230" cy="209" r="7" fill="#ECEFF1" />
      <circle cx="260" cy="209" r="10" fill="#9E9E9E" />
      <circle cx="260" cy="209" r="5" fill="#ECEFF1" />
      <line x1="244" y1="202" x2="250" y2="202" stroke="#9E9E9E" strokeWidth="3" />
      <line x1="244" y1="216" x2="250" y2="216" stroke="#9E9E9E" strokeWidth="3" />
      {/* Light bulb moment above Fox */}
      <circle cx="164" cy="50" r="22" fill="#FFF9C4" opacity="0.9" stroke="#FFD93D" strokeWidth="3" />
      <polygon points="164,38 158,56 170,56" fill="#FFD93D" opacity="0.8" />
      <rect x="160" y="56" width="8" height="6" rx="2" fill="#9E9E9E" />
      {/* Fox excited at bench */}
      <Fox cx={164} cy={172} s={0.85} mood="happy" />
    </svg>
  );
}

export function NariInventionP2({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#FFF8E7 0%,#FFF3E0 100%)' }}>
      {/* Machine explosion center */}
      {/* Explosion burst */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
        <line key={a}
          x1="180" y1="145"
          x2={180 + Math.cos(a * Math.PI / 180) * 55}
          y2={145 + Math.sin(a * Math.PI / 180) * 55}
          stroke="#FFD93D" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      ))}
      <circle cx="180" cy="145" r="38" fill="#FF8B4A" opacity="0.3" />
      <circle cx="180" cy="145" r="22" fill="#FFD93D" opacity="0.6" />
      {/* Broken machine */}
      <rect x="148" y="130" width="64" height="42" rx="4" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" transform="rotate(-5,180,151)" />
      <circle cx="170" cy="150" r="10" fill="#9E9E9E" transform="rotate(-5,180,151)" />
      <circle cx="192" cy="148" r="8" fill="#B0BEC5" transform="rotate(-5,180,151)" />
      {/* Flying fruits */}
      <circle cx="62" cy="68" r="16" fill="#FF4444" />
      <path d="M 57 53 Q 62 46 67 53" stroke="#4CAF50" strokeWidth="2.5" fill="#4CAF50" />
      <circle cx="290" cy="52" r="18" fill="#FF8B4A" />
      <path d="M 285 35 Q 290 28 295 35" stroke="#8B5E3C" strokeWidth="2.5" fill="#8B5E3C" />
      <ellipse cx="82" cy="195" rx="18" ry="14" fill="#8BC48A" />
      <path d="M 77 182 Q 82 175 87 182" stroke="#4CAF50" strokeWidth="2" fill="#4CAF50" />
      <circle cx="296" cy="178" r="14" fill="#FFD93D" />
      <circle cx="230" cy="46" r="12" fill="#FF6666" />
      <circle cx="116" cy="44" r="10" fill="#FF8B4A" />
      <ellipse cx="320" cy="120" rx="15" ry="12" fill="#7ECEC1" />
      {/* Speed lines */}
      <line x1="62" y1="68" x2="120" y2="120" stroke="#FFD93D" strokeWidth="2" opacity="0.4" strokeDasharray="5,5" />
      <line x1="290" y1="52" x2="230" y2="110" stroke="#FFD93D" strokeWidth="2" opacity="0.4" strokeDasharray="5,5" />
      {/* Floor */}
      <rect x="0" y="248" width="360" height="52" fill="#F5EDE0" />
      {/* Fox shocked */}
      <Fox cx={68} cy={192} s={0.78} mood="surprised" />
    </svg>
  );
}

export function NariInventionP3({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(180deg,#ECEFF1 0%,#E8EAF6 100%)' }}>
      {/* Dark storage room feel */}
      <rect x="0" y="0" width="360" height="300" fill="#263238" opacity="0.06" />
      {/* Wall corner - shadow */}
      <rect x="220" y="0" width="140" height="300" fill="#ECEFF1" />
      <rect x="0" y="210" width="360" height="90" fill="#F5F5F5" />
      <line x1="220" y1="0" x2="220" y2="300" stroke="#BDBDBD" strokeWidth="3" opacity="0.4" />
      <line x1="0" y1="210" x2="360" y2="210" stroke="#BDBDBD" strokeWidth="3" opacity="0.4" />
      {/* Old boxes stacked in corner */}
      <rect x="240" y="165" width="90" height="52" rx="3" fill="#C4A77D" opacity="0.5" />
      <rect x="252" y="130" width="70" height="40" rx="3" fill="#C4A77D" opacity="0.4" />
      <rect x="260" y="100" width="55" height="34" rx="3" fill="#C4A77D" opacity="0.35" />
      <line x1="240" y1="195" x2="330" y2="195" stroke="#8B5E3C" strokeWidth="1.5" opacity="0.3" />
      <line x1="252" y1="160" x2="322" y2="160" stroke="#8B5E3C" strokeWidth="1.5" opacity="0.3" />
      {/* Fox curled in corner */}
      <Fox cx={118} cy={185} s={0.88} mood="sad" />
      {/* Tear drops */}
      <ellipse cx="100" cy="148" rx="4" ry="6" fill="#87CEEB" opacity="0.8" />
      <ellipse cx="112" cy="152" rx="3" ry="5" fill="#87CEEB" opacity="0.7" />
      {/* Small tool lying broken on floor */}
      <rect x="178" y="218" width="28" height="8" rx="3" fill="#9E9E9E" transform="rotate(-30,190,222)" />
      <rect x="202" y="224" width="20" height="6" rx="2" fill="#9E9E9E" transform="rotate(15,212,227)" />
      {/* Tiny light from ceiling */}
      <path d="M 120 0 Q 118 80 115 148" stroke="#FFF9C4" strokeWidth="8" opacity="0.18" strokeLinecap="round" />
    </svg>
  );
}

export function NariInventionP4({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#FFF8E7 0%,#E8F5E9 100%)' }}>
      {/* Door with warm light */}
      <rect x="40" y="60" width="100" height="180" rx="6" fill="#D4B896" />
      <rect x="40" y="60" width="100" height="180" rx="6" fill="none" stroke="#C4A77D" strokeWidth="6" />
      {/* Door cracked open - light streaming */}
      <path d="M 140 60 L 150 58 L 150 240 L 140 240 Z" fill="#FFF9C4" opacity="0.9" />
      <path d="M 140 60 Q 180 80 185 150 Q 180 220 140 240 Z" fill="#FFF9C4" opacity="0.35" />
      {/* Doorknob */}
      <circle cx="132" cy="152" r="7" fill="#FFD93D" />
      <circle cx="132" cy="152" r="3" fill="#CC9900" />
      {/* Bear behind door (just head peeking) */}
      <g transform="translate(164,118) scale(0.62)">
        <circle cx="0" cy="0" r="42" fill="#C4A77D" />
        <circle cx="-28" cy="-28" r="14" fill="#C4A77D" />
        <circle cx="-28" cy="-28" r="7" fill="#D4B896" />
        <circle cx="28" cy="-28" r="14" fill="#C4A77D" />
        <circle cx="28" cy="-28" r="7" fill="#D4B896" />
        <circle cx="-13" cy="-7" r="6" fill="#3D3D3D" />
        <circle cx="13" cy="-7" r="6" fill="#3D3D3D" />
        <circle cx="-11" cy="-9" r="2" fill="white" />
        <circle cx="15" cy="-9" r="2" fill="white" />
        <ellipse cx="0" cy="5" rx="8" ry="5" fill="#8B5E3C" />
        <path d="M -8 16 Q 0 24 8 16" stroke="#8B5E3C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
      {/* Fox on floor looking up */}
      <Fox cx={272} cy={192} s={0.82} mood="sad" />
      {/* Fox tears fading (replacing with slight hope) */}
      <circle cx="258" cy="154" r="4" fill="#87CEEB" opacity="0.5" />
      {/* Floor */}
      <rect x="0" y="252" width="360" height="48" fill="#F5EDE0" />
      {/* Small ray of hope light */}
      <path d="M 152 130 Q 210 150 260 160" stroke="#FFD93D" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

export function NariInventionP5({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#E8F5E9 0%,#FFF8E7 100%)' }}>
      {/* Table */}
      <rect x="40" y="200" width="280" height="14" rx="4" fill="#C4A77D" />
      <rect x="55" y="214" width="12" height="46" rx="3" fill="#C4A77D" />
      <rect x="295" y="214" width="12" height="46" rx="3" fill="#C4A77D" />
      {/* Paper on table */}
      <rect x="120" y="170" width="120" height="36" rx="4" fill="white" stroke="#E0D0C0" strokeWidth="2" />
      <line x1="135" y1="182" x2="225" y2="182" stroke="#E0D0C0" strokeWidth="1.5" opacity="0.7" />
      <line x1="135" y1="192" x2="195" y2="192" stroke="#E0D0C0" strokeWidth="1.5" opacity="0.7" />
      {/* Characters around table */}
      <Bear cx={72} cy={158} s={0.70} mood="happy" />
      <Fox cx={180} cy={150} s={0.72} mood="thinking" />
      <Rabbit cx={290} cy={156} s={0.68} mood="happy" />
      <Turtle cx={128} cy={165} s={0.58} mood="happy" />
      <Owl cx={240} cy={162} s={0.60} mood="thinking" />
      {/* Speech bubbles with ideas */}
      <circle cx="80" cy="92" r="26" fill="white" opacity="0.92" stroke="#8BC48A" strokeWidth="2" />
      <polygon points="76,118 90,118 80,130" fill="white" stroke="#8BC48A" strokeWidth="1.5" />
      <circle cx="80" cy="86" r="10" fill="#FFD93D" opacity="0.9" />
      <polygon points="80,78 75,88 85,88" fill="white" />
      <circle cx="282" cy="88" r="26" fill="white" opacity="0.92" stroke="#8BC48A" strokeWidth="2" />
      <polygon points="272,114 286,114 278,126" fill="white" stroke="#8BC48A" strokeWidth="1.5" />
      <text x="282" y="97" fontSize="18" textAnchor="middle">💡</text>
      {/* Floor */}
      <rect x="0" y="250" width="360" height="50" fill="#F5EDE0" />
    </svg>
  );
}

export function NariInventionP6({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#FFF8E7 0%,#E8F5E9 100%)' }}>
      {/* Working machine */}
      <rect x="110" y="110" width="140" height="90" rx="8" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="3" />
      {/* Gears spinning */}
      <circle cx="148" cy="145" r="22" fill="#B0BEC5" />
      <circle cx="148" cy="145" r="10" fill="#ECEFF1" />
      <circle cx="215" cy="150" r="18" fill="#9E9E9E" />
      <circle cx="215" cy="150" r="8" fill="#ECEFF1" />
      {/* Conveyor belt */}
      <rect x="110" y="180" width="140" height="12" rx="4" fill="#795548" />
      {/* Fruits going in orderly */}
      <circle cx="132" cy="103" r="11" fill="#FF4444" />
      <path d="M 128 93 Q 132 87 136 93" stroke="#4CAF50" strokeWidth="2" fill="#4CAF50" />
      <circle cx="160" cy="104" r="10" fill="#FF8B4A" />
      <circle cx="186" cy="103" r="11" fill="#FFD93D" />
      {/* Arrow showing direction */}
      <path d="M 100 130 L 110 130" stroke="#8BC48A" strokeWidth="3" strokeLinecap="round" />
      <polygon points="110,125 122,130 110,135" fill="#8BC48A" />
      {/* Confetti */}
      {[40,80,290,310,60,320].map((x, i) => (
        <rect key={x} x={x} y={30 + i * 18} width="8" height="8" rx="2"
          fill={['#FFD93D','#FF8B8B','#8BC48A','#87CEEB','#C3AED6','#FF8B4A'][i]}
          transform={`rotate(${i * 30},${x + 4},${34 + i * 18})`} opacity="0.85" />
      ))}
      {/* Friends cheering */}
      <Bear cx={62} cy={218} s={0.65} mood="happy" />
      <Fox cx={178} cy={218} s={0.68} mood="happy" />
      <Rabbit cx={296} cy={218} s={0.63} mood="happy" />
      {/* Floor */}
      <rect x="0" y="256" width="360" height="44" fill="#F5EDE0" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
//  3화  하루와 어울림 축제  🐰
// ═══════════════════════════════════════════════════════════════

export function HaruFestivalP1({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#E8F5E9 0%,#FFF8E7 70%)' }}>
      {/* Festive banners */}
      <path d="M 0 50 Q 90 60 180 50 Q 270 40 360 55" fill="none" stroke="#C4A77D" strokeWidth="3" strokeDasharray="6,4" />
      {[30,90,150,210,270,330].map((x, i) => (
        <polygon key={x}
          points={`${x},52 ${x - 12},80 ${x + 12},80`}
          fill={['#FF8B8B','#FFD93D','#8BC48A','#87CEEB','#C3AED6','#FF8B4A'][i]}
          opacity="0.9" />
      ))}
      {/* Second banner */}
      <path d="M 20 80 Q 90 92 180 82 Q 270 72 340 86" fill="none" stroke="#C4A77D" strokeWidth="2" opacity="0.5" strokeDasharray="5,4" />
      {/* Ground */}
      <ellipse cx="180" cy="284" rx="220" ry="28" fill="#BDE5B5" />
      {/* Stalls / decorations */}
      <rect x="20" y="150" width="70" height="80" rx="4" fill="#FF8B8B" opacity="0.3" />
      <rect x="20" y="150" width="70" height="14" rx="2" fill="#FF8B8B" opacity="0.6" />
      <rect x="260" y="150" width="70" height="80" rx="4" fill="#87CEEB" opacity="0.3" />
      <rect x="260" y="150" width="70" height="14" rx="2" fill="#87CEEB" opacity="0.6" />
      {/* Rabbit running with arms out */}
      <Rabbit cx={178} cy={192} s={0.88} mood="happy" />
      {/* Motion lines */}
      <line x1="100" y1="185" x2="128" y2="185" stroke="#8BC48A" strokeWidth="3" opacity="0.5" strokeLinecap="round" />
      <line x1="108" y1="195" x2="128" y2="192" stroke="#8BC48A" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      {/* Stars and sparkles */}
      <text x="290" y="128" fontSize="18">✨</text>
      <text x="52" y="120" fontSize="16">🎉</text>
    </svg>
  );
}

export function HaruFestivalP2({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#FFF8E7 0%,#FFF3E0 100%)' }}>
      {/* Ground */}
      <ellipse cx="180" cy="282" rx="220" ry="28" fill="#BDE5B5" />
      {/* Characters arguing - Fox left, pointing right */}
      <Fox cx={72} cy={180} s={0.72} mood="surprised" />
      <ellipse cx="112" cy="150" rx="10" ry="7" fill="#FF8B4A" transform="rotate(30,112,150)" />
      <line x1="110" y1="148" x2="180" y2="140" stroke="#FF8B4A" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <polygon points="180,135 192,140 180,145" fill="#FF8B4A" opacity="0.7" />
      {/* Owl center, cross */}
      <Owl cx={180} cy={184} s={0.70} mood="sad" />
      {/* Bear right, pointing left */}
      <Bear cx={290} cy={180} s={0.70} mood="surprised" />
      <line x1="248" y1="150" x2="178" y2="142" stroke="#C4A77D" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <polygon points="178,137 166,142 178,147" fill="#C4A77D" opacity="0.7" />
      {/* Rabbit small, in middle looking worried */}
      <g transform="translate(180,215) scale(0.44)">
        <ellipse cx="0" cy="55" rx="34" ry="44" fill="#F0F0F0" />
        <ellipse cx="0" cy="65" rx="18" ry="26" fill="#E8F5E9" />
        <circle cx="0" cy="0" r="36" fill="#F0F0F0" />
        <ellipse cx="-16" cy="-46" rx="10" ry="32" fill="#F0F0F0" />
        <ellipse cx="-16" cy="-46" rx="5" ry="24" fill="#FFD0D0" />
        <ellipse cx="16" cy="-46" rx="10" ry="32" fill="#F0F0F0" />
        <ellipse cx="16" cy="-46" rx="5" ry="24" fill="#FFD0D0" />
        <circle cx="-13" cy="-5" r="5.5" fill="#3D3D3D" />
        <circle cx="13" cy="-5" r="5.5" fill="#3D3D3D" />
        <path d="M -7 19 Q 0 12 7 19" stroke="#AA5555" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
      {/* Sweat drops */}
      <ellipse cx="175" cy="188" rx="3.5" ry="5" fill="#87CEEB" opacity="0.7" transform="rotate(-10,175,188)" />
    </svg>
  );
}

export function HaruFestivalP3({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(180deg,#C8D8E8 0%,#E8F5E9 55%,#BDE5B5 100%)' }}>
      {/* Evening sky */}
      <circle cx="310" cy="50" r="28" fill="#FF8B4A" opacity="0.55" />
      {/* Clouds */}
      <ellipse cx="80" cy="62" rx="52" ry="20" fill="white" opacity="0.6" />
      <ellipse cx="108" cy="50" rx="30" ry="16" fill="white" opacity="0.6" />
      {/* Stars starting to appear */}
      {[200,260,290,160,240].map((x, i) => (
        <circle key={x} cx={x} cy={[30,48,22,38,55][i]} r="2.5" fill="white" opacity={0.5 + i * 0.1} />
      ))}
      {/* Hill */}
      <ellipse cx="180" cy="270" rx="240" ry="55" fill="#8BC48A" />
      <ellipse cx="180" cy="268" rx="220" ry="45" fill="#A8D5A2" />
      {/* Rabbit sitting alone on hill top */}
      <Rabbit cx={180} cy={195} s={0.80} mood="sad" />
      {/* Drooping ears expressed by transformation */}
      {/* Village lights in distance */}
      <circle cx="52" cy="198" r="5" fill="#FFD93D" opacity="0.6" />
      <circle cx="308" cy="196" r="5" fill="#FFD93D" opacity="0.6" />
      <circle cx="30" cy="210" r="4" fill="#FF8B8B" opacity="0.5" />
      <circle cx="330" cy="208" r="4" fill="#87CEEB" opacity="0.5" />
      {/* Single tear */}
      <ellipse cx="168" cy="162" rx="3" ry="4.5" fill="#87CEEB" opacity="0.8" />
    </svg>
  );
}

export function HaruFestivalP4({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#E0F4F1 0%,#FFF8E7 100%)' }}>
      {/* Ground */}
      <ellipse cx="180" cy="282" rx="220" ry="26" fill="#BDE5B5" />
      {/* Rabbit standing, addressing friends */}
      <Rabbit cx={178} cy={182} s={0.85} mood="thinking" />
      {/* Arm raised - confident pose */}
      <ellipse cx="224" cy="166" rx="11" ry="22" fill="#F0F0F0" transform="rotate(-35,224,166)" />
      {/* Friends listening */}
      <Bear cx={62} cy={196} s={0.58} mood="thinking" />
      <Fox cx={296} cy={194} s={0.58} mood="thinking" />
      <Owl cx={122} cy={200} s={0.52} mood="thinking" />
      <Turtle cx={244} cy={204} s={0.50} mood="happy" />
      {/* Speech bubble from rabbit */}
      <rect x="188" y="84" width="130" height="52" rx="12" fill="white" opacity="0.92" stroke="#7ECEC1" strokeWidth="2.5" />
      <polygon points="195,136 210,136 195,150" fill="white" stroke="#7ECEC1" strokeWidth="1.5" />
      <text x="253" y="108" fontSize="13" textAnchor="middle" fill="#3D3D3D">나 혼자선</text>
      <text x="253" y="124" fontSize="13" textAnchor="middle" fill="#3D3D3D">못 할 것 같아 🙏</text>
      {/* Warm light */}
      <ellipse cx="180" cy="236" rx="150" ry="16" fill="#7ECEC1" opacity="0.08" />
    </svg>
  );
}

export function HaruFestivalP5({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#E8F5E9 0%,#FFF8E7 100%)' }}>
      {/* Split scene: 5 characters doing different tasks */}
      {/* Dividers (subtle) */}
      <line x1="72" y1="80" x2="72" y2="260" stroke="#E0E0E0" strokeWidth="1.5" opacity="0.6" />
      <line x1="144" y1="80" x2="144" y2="260" stroke="#E0E0E0" strokeWidth="1.5" opacity="0.6" />
      <line x1="216" y1="80" x2="216" y2="260" stroke="#E0E0E0" strokeWidth="1.5" opacity="0.6" />
      <line x1="288" y1="80" x2="288" y2="260" stroke="#E0E0E0" strokeWidth="1.5" opacity="0.6" />
      {/* Fox - building stage (hammer) */}
      <Fox cx={36} cy={198} s={0.52} mood="happy" />
      <rect x="14" y="222" width="44" height="8" rx="3" fill="#C4A77D" opacity="0.8" />
      <text x="36" y="90" fontSize="16" textAnchor="middle">🔨</text>
      {/* Owl - writing schedule */}
      <Owl cx={108} cy={198} s={0.52} mood="thinking" />
      <rect x="88" y="224" width="36" height="28" rx="3" fill="white" stroke="#9E9E9E" strokeWidth="1.5" />
      <line x1="92" y1="232" x2="120" y2="232" stroke="#9E9E9E" strokeWidth="1.5" />
      <line x1="92" y1="240" x2="118" y2="240" stroke="#9E9E9E" strokeWidth="1.5" />
      <text x="108" y="90" fontSize="16" textAnchor="middle">📋</text>
      {/* Sori (cat) singing */}
      <g transform="translate(180,198) scale(0.52)">
        <ellipse cx="0" cy="55" rx="34" ry="44" fill="#FF8B8B" />
        <ellipse cx="0" cy="65" rx="18" ry="26" fill="#FFC0C0" />
        <circle cx="0" cy="0" r="36" fill="#FF8B8B" />
        <polygon points="-22,-18 -14,-40 -6,-18" fill="#FF8B8B" />
        <polygon points="6,-18 14,-40 22,-18" fill="#FF8B8B" />
        <circle cx="-12" cy="-6" r="5" fill="#3D3D3D" />
        <circle cx="12" cy="-6" r="5" fill="#3D3D3D" />
        <circle cx="-10" cy="-8" r="1.8" fill="white" />
        <circle cx="14" cy="-8" r="1.8" fill="white" />
        <circle cx="0" cy="15" r="5" fill="none" stroke="#CC5555" strokeWidth="2" />
        <ellipse cx="-44" cy="28" rx="10" ry="20" fill="#FF8B8B" transform="rotate(-30,-44,28)" />
        <ellipse cx="44" cy="28" rx="10" ry="20" fill="#FF8B8B" transform="rotate(30,44,28)" />
      </g>
      <text x="180" y="90" fontSize="16" textAnchor="middle">🎵</text>
      {/* Turtle with food */}
      <Turtle cx={252} cy={202} s={0.55} mood="happy" />
      <text x="252" y="90" fontSize="16" textAnchor="middle">🍱</text>
      {/* Sparrow welcoming */}
      <Sparrow cx={323} cy={196} s={0.90} />
      <text x="323" y="90" fontSize="16" textAnchor="middle">👋</text>
      {/* Floor */}
      <rect x="0" y="250" width="360" height="50" fill="#F5EDE0" />
    </svg>
  );
}

export function HaruFestivalP6({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(180deg,#1A1A3E 0%,#2E3F6F 40%,#1A3A2A 100%)' }}>
      {/* Night sky stars */}
      {[30,70,120,180,230,290,320,50,150,260,310,90,200,340].map((x, i) => (
        <circle key={x} cx={x} cy={[22,38,18,30,42,25,15,55,48,35,50,28,18,40][i]}
          r={[2,1.5,2.5,1.5,2,1.5,2,1.5,2,1.5,2,2.5,1.5,2][i]}
          fill="white" opacity={0.6 + Math.random() * 0.3} />
      ))}
      {/* Moon */}
      <circle cx="300" cy="45" r="28" fill="#FFF9C4" opacity="0.9" />
      <circle cx="312" cy="38" r="22" fill="#2E3F6F" opacity="0.9" />
      {/* Festival lanterns */}
      {[60,130,200,270,330].map((x, i) => (
        <g key={x} transform={`translate(${x},${75 + (i % 2) * 18})`}>
          <ellipse cx="0" cy="0" rx="18" ry="22" fill={['#FF8B8B','#FFD93D','#8BC48A','#87CEEB','#C3AED6'][i]} opacity="0.85" />
          <line x1="0" y1="-26" x2="0" y2="-38" stroke="#C4A77D" strokeWidth="2" />
          <line x1="-12" y1="22" x2="-6" y2="32" stroke={['#FF8B8B','#FFD93D','#8BC48A','#87CEEB','#C3AED6'][i]} strokeWidth="1.5" opacity="0.7" />
          <line x1="12" y1="22" x2="6" y2="32" stroke={['#FF8B8B','#FFD93D','#8BC48A','#87CEEB','#C3AED6'][i]} strokeWidth="1.5" opacity="0.7" />
        </g>
      ))}
      {/* Lantern string */}
      <path d="M 10 52 Q 90 62 180 50 Q 270 40 350 58" fill="none" stroke="#C4A77D" strokeWidth="2" opacity="0.6" />
      {/* Ground */}
      <ellipse cx="180" cy="288" rx="220" ry="28" fill="#1A3A2A" />
      <ellipse cx="180" cy="280" rx="220" ry="20" fill="#2A5A3A" />
      {/* Friends together */}
      <Bear cx={72} cy={218} s={0.60} mood="happy" />
      <Rabbit cx={136} cy={215} s={0.60} mood="happy" />
      <Fox cx={200} cy={213} s={0.60} mood="happy" />
      <Owl cx={262} cy={216} s={0.58} mood="happy" />
      <Turtle cx={316} cy={218} s={0.50} mood="happy" />
      {/* Sparkles */}
      <text x="107" y="170" fontSize="14">✨</text>
      <text x="168" y="166" fontSize="14">🌟</text>
      <text x="232" y="170" fontSize="14">✨</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
//  4화  지우의 완벽한 하루 계획  🦉
// ═══════════════════════════════════════════════════════════════

export function JiuPlanP1({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#E8EAF6 0%,#FFF8E7 80%)' }}>
      {/* Morning window light */}
      <rect x="250" y="18" width="96" height="88" rx="6" fill="#FFF9C4" opacity="0.55" />
      <rect x="250" y="18" width="96" height="88" rx="6" fill="none" stroke="#6B7FBF" strokeWidth="5" />
      <line x1="298" y1="18" x2="298" y2="106" stroke="#6B7FBF" strokeWidth="4" />
      <line x1="250" y1="62" x2="346" y2="62" stroke="#6B7FBF" strokeWidth="4" />
      {/* Books on shelf */}
      <rect x="8" y="68" width="120" height="10" rx="3" fill="#9AABDB" />
      <rect x="14" y="28" width="14" height="42" rx="2" fill="#6B7FBF" />
      <rect x="30" y="35" width="14" height="35" rx="2" fill="#C3AED6" />
      <rect x="46" y="32" width="16" height="38" rx="2" fill="#9AABDB" />
      <rect x="64" y="38" width="12" height="32" rx="2" fill="#4A5A9A" />
      <rect x="78" y="30" width="18" height="40" rx="2" fill="#7ECEC1" />
      {/* Desk */}
      <rect x="60" y="210" width="220" height="14" rx="4" fill="#6B7FBF" opacity="0.7" />
      <rect x="75" y="224" width="10" height="46" rx="3" fill="#6B7FBF" opacity="0.6" />
      <rect x="255" y="224" width="10" height="46" rx="3" fill="#6B7FBF" opacity="0.6" />
      {/* Notebook on desk */}
      <rect x="118" y="170" width="90" height="48" rx="4" fill="white" stroke="#9AABDB" strokeWidth="2" />
      <line x1="163" y1="170" x2="163" y2="218" stroke="#9AABDB" strokeWidth="1.5" />
      {/* Lines of text in notebook */}
      {[182,192,200,208].map(y => (
        <line key={y} x1="128" y1={y} x2="155" y2={y} stroke="#9AABDB" strokeWidth="1.5" opacity="0.7" />
      ))}
      {[182,192,200].map(y => (
        <line key={y} x1="170" y1={y} x2="200" y2={y} stroke="#9AABDB" strokeWidth="1.5" opacity="0.7" />
      ))}
      {/* Checkmarks */}
      <path d="M 130 185 L 133 188 L 138 182" stroke="#6B7FBF" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Pencil */}
      <rect x="212" y="175" width="7" height="44" rx="2" fill="#FFD93D" transform="rotate(15,215,197)" />
      <polygon points="212,175 219,175 215.5,165" fill="#FFC299" transform="rotate(15,215,197)" />
      {/* Owl at desk */}
      <Owl cx={165} cy={162} s={0.82} mood="happy" />
      {/* Floor */}
      <rect x="0" y="250" width="360" height="50" fill="#E8EAF6" />
    </svg>
  );
}

export function JiuPlanP2({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#E8EAF6 0%,#E3F2FD 100%)' }}>
      {/* Clock on wall */}
      <circle cx="302" cy="74" r="36" fill="white" stroke="#6B7FBF" strokeWidth="4" />
      <circle cx="302" cy="74" r="3" fill="#6B7FBF" />
      <line x1="302" y1="74" x2="302" y2="52" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round" />
      <line x1="302" y1="74" x2="320" y2="80" stroke="#3D3D3D" strokeWidth="2.5" strokeLinecap="round" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
        <line key={a}
          x1={302 + Math.cos(a * Math.PI / 180) * 28}
          y1={74 + Math.sin(a * Math.PI / 180) * 28}
          x2={302 + Math.cos(a * Math.PI / 180) * 32}
          y2={74 + Math.sin(a * Math.PI / 180) * 32}
          stroke="#9AABDB" strokeWidth="2" />
      ))}
      {/* Open book */}
      <rect x="90" y="175" width="110" height="78" rx="4" fill="white" stroke="#9AABDB" strokeWidth="2" />
      <line x1="145" y1="175" x2="145" y2="253" stroke="#9AABDB" strokeWidth="1.5" />
      {[190,202,214,226,238].map(y => (
        <line key={y} x1="100" y1={y} x2="138" y2={y} stroke="#9AABDB" strokeWidth="1.5" opacity="0.6" />
      ))}
      {[190,202,214,226].map(y => (
        <line key={y} x1="152" y1={y} x2="190" y2={y} stroke="#9AABDB" strokeWidth="1.5" opacity="0.6" />
      ))}
      {/* Checklist with ticks */}
      <rect x="218" y="168" width="86" height="96" rx="4" fill="#FFF9C4" opacity="0.9" stroke="#FFD93D" strokeWidth="1.5" />
      {['6:00 기상','7:00 독서','10:00 도서관','2:00 별 관측'].map((item, i) => (
        <g key={item}>
          <path d={`M ${226} ${184 + i * 22} L ${230} ${188 + i * 22} L ${236} ${180 + i * 22}`}
            stroke="#8BC48A" strokeWidth="2" fill="none" strokeLinecap="round" />
          <text x="241" y={188 + i * 22} fontSize="9" fill="#6B7FBF" fontFamily="sans-serif">{item}</text>
        </g>
      ))}
      {/* Owl reading */}
      <Owl cx={162} cy={162} s={0.80} mood="happy" />
      {/* Floor */}
      <rect x="0" y="250" width="360" height="50" fill="#E8EAF6" />
    </svg>
  );
}

export function JiuPlanP3({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#FFF8E7 0%,#E8EAF6 100%)' }}>
      {/* Background - library feel */}
      <rect x="240" y="0" width="120" height="260" fill="#E8EAF6" opacity="0.5" />
      {/* Bookshelf */}
      {[30, 65, 100].map(y => (
        <React.Fragment key={y}>
          <rect x="248" y={y} width="100" height="8" rx="2" fill="#9AABDB" opacity="0.6" />
          {[258, 274, 288, 300, 316].map((x, i) => (
            <rect key={x} x={x} y={y - 32 + (i % 2) * 5} width="12" height={y === 30 ? 28 : 30}
              rx="2" fill={['#6B7FBF','#C3AED6','#9AABDB','#7ECEC1','#FFD93D'][i]}
              opacity="0.8" />
          ))}
        </React.Fragment>
      ))}
      {/* Owl at desk with book open */}
      <rect x="55" y="200" width="170" height="12" rx="3" fill="#6B7FBF" opacity="0.5" />
      <rect x="78" y="175" width="100" height="32" rx="4" fill="white" stroke="#9AABDB" strokeWidth="2" />
      <line x1="128" y1="175" x2="128" y2="207" stroke="#9AABDB" strokeWidth="1.5" />
      <Owl cx={105} cy={152} s={0.78} mood="surprised" />
      {/* Sparrow flying in urgently */}
      <Sparrow cx={252} cy={120} s={1.1} />
      {/* Motion lines for sparrow */}
      <line x1="300" y1="112" x2="286" y2="116" stroke="#FFD93D" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" />
      <line x1="304" y1="122" x2="288" y2="123" stroke="#FFD93D" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <line x1="302" y1="132" x2="287" y2="130" stroke="#FFD93D" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      {/* Speech bubble from sparrow */}
      <rect x="148" y="62" width="120" height="44" rx="10" fill="#FFF9C4" stroke="#FFD93D" strokeWidth="2" />
      <polygon points="210,106 224,106 218,116" fill="#FFF9C4" stroke="#FFD93D" strokeWidth="1.5" />
      <text x="208" y="82" fontSize="12" textAnchor="middle" fill="#3D3D3D">도와줘!</text>
      <text x="208" y="98" fontSize="12" textAnchor="middle" fill="#3D3D3D">길을 잃었어 😢</text>
      {/* Floor */}
      <rect x="0" y="248" width="360" height="52" fill="#E8EAF6" />
    </svg>
  );
}

export function JiuPlanP4({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#E3F2FD 0%,#E8F5E9 100%)' }}>
      {/* Calm sky */}
      <ellipse cx="280" cy="60" rx="55" ry="22" fill="white" opacity="0.7" />
      <ellipse cx="310" cy="48" rx="35" ry="18" fill="white" opacity="0.7" />
      {/* Ground */}
      <ellipse cx="180" cy="280" rx="220" ry="28" fill="#BDE5B5" />
      {/* Notebook being closed */}
      <rect x="220" y="198" width="70" height="52" rx="4" fill="#FFF9C4" stroke="#FFD93D" strokeWidth="2" transform="rotate(-10,255,224)" />
      <line x1="224" y1="202" x2="284" y2="195" stroke="#9AABDB" strokeWidth="1.5" opacity="0.5" transform="rotate(-10,255,224)" />
      {/* Owl determined expression */}
      <Owl cx={155} cy={178} s={0.90} mood="thinking" />
      {/* "決心" visual - small glowing aura */}
      <circle cx="155" cy="110" r="28" fill="#FFD93D" opacity="0.15" />
      <circle cx="155" cy="110" r="20" fill="#FFD93D" opacity="0.12" />
      {/* Glasses glinting */}
      <circle cx="141" cy="172" r="13" fill="none" stroke="#9AABDB" strokeWidth="2.5" opacity="0.7" />
      <circle cx="169" cy="172" r="13" fill="none" stroke="#9AABDB" strokeWidth="2.5" opacity="0.7" />
      <line x1="154" y1="172" x2="156" y2="172" stroke="#9AABDB" strokeWidth="2" />
      {/* Small sparrow waiting */}
      <Sparrow cx={285} cy={215} s={0.75} />
      {/* Arrow direction (going to help) */}
      <path d="M 200 200 Q 240 185 270 200" fill="none" stroke="#7ECEC1" strokeWidth="2.5" strokeDasharray="6,4" strokeLinecap="round" />
      <polygon points="270,195 282,200 270,205" fill="#7ECEC1" />
    </svg>
  );
}

export function JiuPlanP5({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#E8EAF6 0%,#E8F5E9 60%,#FFF8E7 100%)' }}>
      {/* Path/road */}
      <path d="M 30 270 Q 180 230 330 268" fill="#D4B896" opacity="0.6" stroke="#C4A77D" strokeWidth="2" />
      {/* Bridge */}
      <rect x="130" y="210" width="100" height="18" rx="4" fill="#C4A77D" />
      <rect x="128" y="196" width="104" height="16" rx="3" fill="#A0896A" />
      <rect x="138" y="180" width="8" height="20" rx="2" fill="#8B7355" />
      <rect x="156" y="180" width="8" height="20" rx="2" fill="#8B7355" />
      <rect x="196" y="180" width="8" height="20" rx="2" fill="#8B7355" />
      <rect x="214" y="180" width="8" height="20" rx="2" fill="#8B7355" />
      {/* River under bridge */}
      <ellipse cx="180" cy="225" rx="65" ry="12" fill="#87CEEB" opacity="0.5" />
      {/* Trees along path */}
      <rect x="55" y="188" width="10" height="40" rx="3" fill="#8B5E3C" />
      <circle cx="60" cy="178" r="22" fill="#8BC48A" />
      <rect x="294" y="190" width="10" height="36" rx="3" fill="#8B5E3C" />
      <circle cx="299" cy="180" r="20" fill="#8BC48A" />
      {/* Warm setting sun */}
      <circle cx="310" cy="55" r="32" fill="#FF8B4A" opacity="0.55" />
      {/* Owl and Sparrow walking together */}
      <Owl cx={142} cy={190} s={0.72} mood="happy" />
      <Sparrow cx={200} cy={196} s={0.88} />
      {/* Connecting moment - Sparrow close to Owl */}
      <path d="M 176 186 Q 188 178 196 183" fill="none" stroke="#FFD93D" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
    </svg>
  );
}

export function JiuPlanP6({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#E8EAF6 0%,#FFF8E7 80%)' }}>
      {/* Night window with stars */}
      <rect x="254" y="16" width="94" height="86" rx="6" fill="#1A1A3E" opacity="0.7" />
      <rect x="254" y="16" width="94" height="86" rx="6" fill="none" stroke="#6B7FBF" strokeWidth="5" />
      <line x1="301" y1="16" x2="301" y2="102" stroke="#6B7FBF" strokeWidth="4" />
      <line x1="254" y1="59" x2="348" y2="59" stroke="#6B7FBF" strokeWidth="4" />
      {/* Stars in window */}
      {[270,293,316,278,308].map((x, i) => (
        <circle key={x} cx={x} cy={[30,24,32,50,44][i]} r="2" fill="white" opacity="0.8" />
      ))}
      <circle cx="285" cy="72" r="8" fill="#FFF9C4" opacity="0.8" />
      {/* Tea cup on desk */}
      <ellipse cx="280" cy="215" rx="16" ry="6" fill="#FFD93D" opacity="0.8" />
      <rect x="264" y="215" width="32" height="22" rx="4" fill="#FFD93D" opacity="0.7" />
      <path d="M 296 222 Q 308 222 308 230 Q 308 238 296 236" fill="none" stroke="#FFD93D" strokeWidth="2.5" />
      {/* Steam */}
      <path d="M 276 210 Q 280 202 276 196" fill="none" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M 284 210 Q 288 202 284 194" fill="none" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Open notebook with new note */}
      <rect x="86" y="168" width="120" height="78" rx="4" fill="white" stroke="#9AABDB" strokeWidth="2" />
      <line x1="146" y1="168" x2="146" y2="246" stroke="#9AABDB" strokeWidth="1.5" />
      {/* Old items with checkmarks */}
      {[182,194,206].map(y => (
        <React.Fragment key={y}>
          <path d={`M 97 ${y} L 101 ${y + 4} L 107 ${y - 2}`} stroke="#8BC48A" strokeWidth="2" fill="none" strokeLinecap="round" />
          <line x1="112" y1={y + 1} x2="140" y2={y + 1} stroke="#9AABDB" strokeWidth="1.2" opacity="0.5" />
        </React.Fragment>
      ))}
      {/* Special new note on right page */}
      <rect x="152" y="178" width="46" height="28" rx="3" fill="#FFF9C4" stroke="#FFD93D" strokeWidth="1.5" />
      <text x="175" y="192" fontSize="9" textAnchor="middle" fill="#6B7FBF" fontFamily="sans-serif">예상치 못한 일:</text>
      <text x="175" y="202" fontSize="9" textAnchor="middle" fill="#FF8B4A" fontFamily="sans-serif">제일 좋은 일 ✨</text>
      {/* Desk */}
      <rect x="54" y="246" width="250" height="12" rx="4" fill="#6B7FBF" opacity="0.5" />
      <rect x="70" y="258" width="10" height="36" rx="3" fill="#6B7FBF" opacity="0.4" />
      <rect x="278" y="258" width="10" height="36" rx="3" fill="#6B7FBF" opacity="0.4" />
      {/* Owl relaxed, smiling */}
      <Owl cx={170} cy={160} s={0.80} mood="happy" />
      {/* Floor */}
      <rect x="0" y="248" width="360" height="52" fill="#E8EAF6" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
//  5화  소리의 무지개 공방  🐱
// ═══════════════════════════════════════════════════════════════

export function SoriRainbowP1({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#FFF0F5 0%,#FFE4EC 80%,#FDDDE6 100%)' }}>
      {/* Wall paintings */}
      <rect x="16" y="18" width="56" height="46" rx="6" fill="#FFD93D" opacity="0.45" />
      <rect x="82" y="14" width="52" height="58" rx="6" fill="#7EC8C1" opacity="0.4" />
      <rect x="256" y="20" width="64" height="44" rx="6" fill="#FF8B4A" opacity="0.4" />
      <rect x="280" y="74" width="54" height="52" rx="6" fill="#8BC48A" opacity="0.4" />
      {/* Easel */}
      <line x1="148" y1="238" x2="156" y2="92" stroke="#8B7355" strokeWidth="5" strokeLinecap="round" />
      <line x1="212" y1="238" x2="204" y2="92" stroke="#8B7355" strokeWidth="5" strokeLinecap="round" />
      <line x1="160" y1="160" x2="200" y2="160" stroke="#8B7355" strokeWidth="3" />
      {/* Canvas */}
      <rect x="150" y="90" width="60" height="72" rx="4" fill="white" stroke="#DDD" strokeWidth="2" />
      <circle cx="170" cy="118" r="11" fill="#FF8B8B" opacity="0.7" />
      <path d="M156 138 Q170 148 184 133" stroke="#FFD93D" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="187" cy="108" r="7" fill="#8BC48A" opacity="0.7" />
      {/* Palette */}
      <ellipse cx="224" cy="162" rx="22" ry="15" fill="#EEE" stroke="#CCC" strokeWidth="1.5" />
      <circle cx="213" cy="157" r="5" fill="#FF8B8B" />
      <circle cx="224" cy="154" r="5" fill="#FFD93D" />
      <circle cx="233" cy="163" r="5" fill="#8BC48A" />
      <circle cx="227" cy="172" r="5" fill="#7EC8C1" />
      {/* Cat (소리) */}
      <Cat cx={175} cy={215} s={0.85} mood="happy" />
      {/* Paintbrush */}
      <line x1="198" y1="196" x2="228" y2="168" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="229" cy="167" rx="5" ry="3" fill="#FF8B8B" transform="rotate(-40,229,167)" />
      <rect x="0" y="252" width="360" height="48" fill="#F8D8E4" opacity="0.5" />
    </svg>
  );
}

export function SoriRainbowP2({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#FFECEC 0%,#FFDAD0 80%)' }}>
      <rect x="0" y="200" width="360" height="100" fill="#F0C4C4" opacity="0.4" />
      {/* Fallen canvas */}
      <rect x="88" y="165" width="60" height="72" rx="4" fill="white" stroke="#DDD" strokeWidth="2"
        transform="rotate(-30,88,165)" />
      {/* Paint splatters */}
      <circle cx="130" cy="222" r="18" fill="#FF8B4A" opacity="0.35" />
      <circle cx="165" cy="240" r="12" fill="#FFD93D" opacity="0.35" />
      <circle cx="202" cy="225" r="10" fill="#8BC48A" opacity="0.35" />
      <line x1="140" y1="234" x2="192" y2="218" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" />
      {/* Cat angry */}
      <Cat cx={155} cy={200} s={0.85} mood="surprised" />
      {/* Anger lines */}
      <line x1="113" y1="148" x2="93" y2="132" stroke="#FF4444" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
      <line x1="106" y1="156" x2="82" y2="148" stroke="#FF4444" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
      <line x1="116" y1="142" x2="102" y2="122" stroke="#FF4444" strokeWidth="2.5" opacity="0.5" strokeLinecap="round" />
      {/* Rabbit scared */}
      <Rabbit cx={266} cy={208} s={0.78} mood="surprised" />
      {/* Tear drop */}
      <ellipse cx="247" cy="186" rx="4" ry="6" fill="#87CEEB" opacity="0.8" />
      {/* Exclamation */}
      <ellipse cx="88" cy="130" rx="36" ry="22" fill="white" opacity="0.9" stroke="#FF8B8B" strokeWidth="1.5" />
      <text x="88" y="137" fontSize="22" textAnchor="middle">😤</text>
    </svg>
  );
}

export function SoriRainbowP3({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(180deg,#E8EAF0 0%,#D8D8E8 55%,#E8E0E8 100%)' }}>
      {/* Attic beams */}
      <line x1="60" y1="0" x2="0" y2="200" stroke="#8B7355" strokeWidth="10" opacity="0.15" strokeLinecap="round" />
      <line x1="180" y1="0" x2="60" y2="200" stroke="#8B7355" strokeWidth="10" opacity="0.15" strokeLinecap="round" />
      {/* Small rainy window */}
      <rect x="240" y="28" width="88" height="72" rx="6" fill="#B8CDE8" opacity="0.6" stroke="#8B7355" strokeWidth="5" />
      <line x1="284" y1="28" x2="284" y2="100" stroke="#8B7355" strokeWidth="4" />
      <line x1="240" y1="64" x2="328" y2="64" stroke="#8B7355" strokeWidth="4" />
      {[250,262,274,286,298,310,322].map(x => (
        <line key={x} x1={x} y1="34" x2={x - 4} y2="56"
          stroke="#87CEEB" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      ))}
      {/* Cat sad, alone */}
      <Cat cx={155} cy={218} s={0.80} mood="sad" />
      {/* Thought bubble */}
      <circle cx="206" cy="144" r="5" fill="white" opacity="0.7" />
      <circle cx="216" cy="133" r="7" fill="white" opacity="0.72" />
      <ellipse cx="234" cy="122" rx="26" ry="18" fill="white" opacity="0.88" />
      <text x="234" y="128" fontSize="18" textAnchor="middle">😔</text>
      <rect x="0" y="252" width="360" height="48" fill="#C8B8C8" opacity="0.3" />
    </svg>
  );
}

export function SoriRainbowP4({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#EDE7F6 0%,#E8EAF6 60%,#F3E5F5 100%)' }}>
      {/* Door ajar */}
      <rect x="288" y="132" width="58" height="118" rx="4" fill="#D4B896" opacity="0.5" />
      <rect x="296" y="140" width="42" height="102" rx="3" fill="#C4A77D" opacity="0.3" />
      <circle cx="296" cy="196" r="4" fill="#FFD93D" opacity="0.7" />
      {/* Book on floor */}
      <rect x="55" y="240" width="52" height="34" rx="3" fill="#6B7FBF" opacity="0.7" />
      <rect x="57" y="242" width="48" height="30" rx="2" fill="#8090CF" opacity="0.5" />
      {/* Owl (지우) */}
      <Owl cx={108} cy={210} s={0.80} mood="thinking" />
      {/* Cat */}
      <Cat cx={248} cy={210} s={0.80} mood="thinking" />
      {/* Speech bubble */}
      <rect x="128" y="118" width="116" height="50" rx="12" fill="white" opacity="0.92" stroke="#7B8CBF" strokeWidth="2" />
      <polygon points="148,168 160,168 144,182" fill="white" stroke="#7B8CBF" strokeWidth="1.5" />
      <text x="186" y="140" fontSize="11.5" textAnchor="middle" fill="#5A6096">지금 어떤 기분이야?</text>
      <text x="186" y="157" fontSize="11.5" textAnchor="middle" fill="#5A6096">화가 났어? 슬퍼? 💜</text>
      <rect x="0" y="254" width="360" height="46" fill="#D8D0E8" opacity="0.3" />
    </svg>
  );
}

export function SoriRainbowP5({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#FFF8E1 0%,#FFF3CD 60%,#FFF0C8 100%)' }}>
      {/* Easel with large canvas */}
      <line x1="100" y1="240" x2="108" y2="70" stroke="#8B7355" strokeWidth="6" strokeLinecap="round" />
      <line x1="200" y1="240" x2="192" y2="70" stroke="#8B7355" strokeWidth="6" strokeLinecap="round" />
      <line x1="112" y1="158" x2="188" y2="158" stroke="#8B7355" strokeWidth="3" />
      <rect x="103" y="68" width="94" height="94" rx="5" fill="white" stroke="#DDD" strokeWidth="2.5" />
      {/* Emotion painting — red spiral */}
      <path d="M 150 115 Q 165 98 168 115 Q 170 132 150 135 Q 130 137 128 115 Q 128 90 150 90"
        stroke="#FF4444" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 150 115 Q 158 107 160 115 Q 162 123 150 125"
        stroke="#FF8B8B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Blue teardrops */}
      <ellipse cx="132" cy="108" rx="5" ry="7" fill="#64B5F6" opacity="0.7" />
      <ellipse cx="170" cy="130" rx="4" ry="6" fill="#64B5F6" opacity="0.6" />
      {/* Cat painting */}
      <Cat cx={265} cy={205} s={0.82} mood="thinking" />
      {/* Paintbrush to canvas */}
      <line x1="245" y1="186" x2="208" y2="130" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="207" cy="129" rx="5" ry="3" fill="#FF4444" transform="rotate(-50,207,129)" />
      {/* Paint blobs */}
      <circle cx="290" cy="238" r="10" fill="#FF8B8B" opacity="0.5" />
      <circle cx="308" cy="232" r="8" fill="#FFD93D" opacity="0.5" />
      <circle cx="298" cy="248" r="7" fill="#7EC8C1" opacity="0.5" />
      <rect x="0" y="255" width="360" height="45" fill="#F5E8C0" opacity="0.5" />
    </svg>
  );
}

export function SoriRainbowP6({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#FFF0F5 0%,#FCE4EC 70%,#FFE0EB 100%)' }}>
      {/* Rainbow arcs */}
      {(['#FF8888','#FFAA44','#FFD93D','#88CC88','#64B5F6','#CC88FF'] as string[]).map((c, i) => (
        <path key={i}
          d={`M ${30 + i * 4} ${110 - i * 3} Q 180 ${20 - i * 5} ${330 - i * 4} ${110 - i * 3}`}
          stroke={c} strokeWidth="6" fill="none" opacity="0.45" strokeLinecap="round" />
      ))}
      {/* New painting on easel */}
      <line x1="145" y1="238" x2="152" y2="110" stroke="#8B7355" strokeWidth="5" strokeLinecap="round" />
      <line x1="215" y1="238" x2="208" y2="110" stroke="#8B7355" strokeWidth="5" strokeLinecap="round" />
      <rect x="148" y="108" width="64" height="58" rx="4" fill="white" stroke="#DDD" strokeWidth="2" />
      <circle cx="165" cy="130" r="8" fill="#FF8B8B" opacity="0.7" />
      <circle cx="191" cy="130" r="8" fill="#8BC48A" opacity="0.7" />
      <path d="M 162 145 Q 179 152 194 145" stroke="#FFD93D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Cat (소리) */}
      <Cat cx={120} cy={215} s={0.80} mood="happy" />
      {/* Rabbit (하루) */}
      <Rabbit cx={240} cy={215} s={0.80} mood="happy" />
      {/* Friendship arc */}
      <path d="M 152 208 Q 180 196 208 208" stroke="#FFB3C1" strokeWidth="4" fill="none"
        opacity="0.6" strokeLinecap="round" />
      <text x="178" y="182" fontSize="16" textAnchor="middle">✨</text>
      <text x="80" y="170" fontSize="14" opacity="0.6">🎨</text>
      <text x="278" y="165" fontSize="14" opacity="0.6">🎨</text>
      <rect x="0" y="253" width="360" height="47" fill="#F8D8E4" opacity="0.4" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
//  6화  느루의 느린 정원  🐢
// ═══════════════════════════════════════════════════════════════

export function NeuruGardenP1({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(180deg,#E8F5E9 0%,#F1F8E9 60%,#FFF8E7 100%)' }}>
      <circle cx="300" cy="55" r="32" fill="#FFD93D" opacity="0.85" />
      <ellipse cx="70" cy="55" rx="45" ry="19" fill="white" opacity="0.8" />
      <ellipse cx="92" cy="42" rx="28" ry="17" fill="white" opacity="0.8" />
      {/* Garden rows */}
      {[0,1,2].map(i => (
        <rect key={i} x={40 + i * 50} y={202} width="36" height="14" rx="6"
          fill="#8B5E3C" opacity="0.35" />
      ))}
      {/* Turtle carefully planting */}
      <Turtle cx={120} cy={215} s={0.88} mood="happy" />
      {/* Seeds in hand area */}
      <circle cx="152" cy="204" r="5" fill="#8B5E3C" opacity="0.8" />
      <circle cx="164" cy="220" r="4" fill="#8B5E3C" opacity="0.7" />
      {/* Fox rushing past */}
      <Fox cx={278} cy={210} s={0.78} mood="happy" />
      {/* Speed lines */}
      <line x1="238" y1="195" x2="218" y2="195" stroke="#FF8B4A" strokeWidth="2.5" opacity="0.5" strokeLinecap="round" />
      <line x1="236" y1="204" x2="214" y2="204" stroke="#FF8B4A" strokeWidth="2.5" opacity="0.5" strokeLinecap="round" />
      <line x1="234" y1="213" x2="216" y2="213" stroke="#FF8B4A" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      {/* Small sprout */}
      <line x1="58" y1="202" x2="58" y2="182" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="58" cy="178" rx="9" ry="6" fill="#66BB6A" opacity="0.8" />
      <rect x="0" y="240" width="360" height="60" fill="#A8D5A2" opacity="0.35" />
    </svg>
  );
}

export function NeuruGardenP2({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(180deg,#ECEFF1 0%,#EEF5F4 60%,#E8F5F0 100%)' }}>
      {/* Winding path */}
      <path d="M 40 280 Q 120 230 180 220 Q 240 210 320 260"
        stroke="#C8B8A2" strokeWidth="24" fill="none" opacity="0.5" strokeLinecap="round" />
      {/* Other characters far ahead (small) */}
      <Bear   cx={285} cy={218} s={0.52} mood="happy" />
      <Rabbit cx={248} cy={222} s={0.50} mood="happy" />
      <Fox    cx={310} cy={215} s={0.50} mood="happy" />
      {/* Dots showing they've moved */}
      <circle cx="232" cy="222" r="3" fill="#CCC" opacity="0.5" />
      <circle cx="226" cy="222" r="3" fill="#CCC" opacity="0.4" />
      <circle cx="220" cy="222" r="3" fill="#CCC" opacity="0.3" />
      {/* Turtle alone behind */}
      <Turtle cx={105} cy={234} s={0.80} mood="sad" />
      {/* Thought bubble */}
      <circle cx="144" cy="172" r="4" fill="white" opacity="0.7" />
      <circle cx="155" cy="160" r="6" fill="white" opacity="0.75" />
      <ellipse cx="174" cy="148" rx="26" ry="18" fill="white" opacity="0.88" />
      <text x="174" y="154" fontSize="18" textAnchor="middle">😔</text>
      <ellipse cx="90" cy="60" rx="48" ry="20" fill="white" opacity="0.6" />
      <ellipse cx="250" cy="48" rx="40" ry="16" fill="white" opacity="0.6" />
      <rect x="0" y="260" width="360" height="40" fill="#B2DFDB" opacity="0.25" />
    </svg>
  );
}

export function NeuruGardenP3({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(180deg,#546E7A 0%,#78909C 30%,#B0BEC5 60%,#CFD8DC 100%)' }}>
      {/* Storm clouds */}
      <ellipse cx="120" cy="48" rx="80" ry="30" fill="#455A64" opacity="0.8" />
      <ellipse cx="100" cy="34" rx="55" ry="22" fill="#546E7A" opacity="0.9" />
      <ellipse cx="240" cy="52" rx="70" ry="26" fill="#455A64" opacity="0.75" />
      <ellipse cx="258" cy="38" rx="50" ry="20" fill="#546E7A" opacity="0.85" />
      {/* Rain drops */}
      {[40,68,96,124,152,180,208,236,264,292,320,348].map(x => (
        <line key={x} x1={x} y1={(x % 40) + 70} x2={x - 5} y2={(x % 40) + 96}
          stroke="#90CAF9" strokeWidth="2" opacity="0.7" strokeLinecap="round" />
      ))}
      {[55,85,115,145,175,205,235,265,295,325].map(x => (
        <line key={x} x1={x} y1={(x % 35) + 105} x2={x - 4} y2={(x % 35) + 128}
          stroke="#90CAF9" strokeWidth="1.5" opacity="0.55" strokeLinecap="round" />
      ))}
      {/* Garden row */}
      <rect x="80" y="212" width="140" height="18" rx="5" fill="#5D4037" opacity="0.5" />
      {/* Seedlings */}
      {[100,120,140,160,180].map(x => (
        <g key={x}>
          <line x1={x} y1="212" x2={x} y2="193"
            stroke="#66BB6A" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx={x} cy={189} rx="8" ry="5" fill="#81C784" opacity="0.9" />
        </g>
      ))}
      {/* Turtle covering plants */}
      <Turtle cx={155} cy={218} s={0.95} mood="happy" />
      {/* Shell glow */}
      <ellipse cx="155" cy="196" rx="48" ry="22" fill="#7ECEC1" opacity="0.22" />
      <rect x="0" y="245" width="360" height="55" fill="#4E342E" opacity="0.2" />
    </svg>
  );
}

export function NeuruGardenP4({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(180deg,#E8F5E9 0%,#DCEDC8 50%,#F9FBE7 100%)' }}>
      {/* Sun with rays */}
      <circle cx="305" cy="52" r="34" fill="#FFD93D" opacity="0.9" />
      {[0,40,80,120,160,200,240,280,320].map(a => (
        <line key={a}
          x1={305 + Math.cos(a * Math.PI / 180) * 42}
          y1={52  + Math.sin(a * Math.PI / 180) * 42}
          x2={305 + Math.cos(a * Math.PI / 180) * 55}
          y2={52  + Math.sin(a * Math.PI / 180) * 55}
          stroke="#FFD93D" strokeWidth="4" opacity="0.6" strokeLinecap="round" />
      ))}
      {/* Thriving plants */}
      {[55,92,130,168,208].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="220" x2={x} y2={165 - i * 6}
            stroke="#388E3C" strokeWidth="3" strokeLinecap="round" />
          <circle cx={x} cy={158 - i * 6} r={14 + i * 2} fill="#66BB6A" opacity="0.85" />
          {i % 2 === 0
            ? <circle cx={x + 8} cy={148 - i * 6} r={9} fill="#FF8B8B" opacity="0.7" />
            : <circle cx={x - 7} cy={148 - i * 6} r={9} fill="#FFD93D" opacity="0.7" />}
        </g>
      ))}
      {/* Turtle happy */}
      <Turtle cx={130} cy={222} s={0.85} mood="happy" />
      {/* Bear surprised */}
      <Bear cx={245} cy={218} s={0.82} mood="surprised" />
      {/* Speech bubble */}
      <rect x="258" y="112" width="88" height="40" rx="10" fill="white"
        opacity="0.92" stroke="#C4A77D" strokeWidth="1.5" />
      <polygon points="270,152 282,152 266,166" fill="white" stroke="#C4A77D" strokeWidth="1.5" />
      <text x="302" y="130" fontSize="10.5" textAnchor="middle" fill="#5D4037">느루 텃밭이</text>
      <text x="302" y="145" fontSize="10.5" textAnchor="middle" fill="#5D4037">제일 튼튼해!</text>
      <rect x="0" y="242" width="360" height="58" fill="#A5D6A7" opacity="0.35" />
    </svg>
  );
}

export function NeuruGardenP5({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#FFFDE7 0%,#FFF8E1 60%,#FFF3E0 100%)' }}>
      {/* Festive banner */}
      {(['#FF8B8B','#FFD93D','#8BC48A','#7EC8C1','#FF8B4A','#6B7FBF'] as string[]).map((c, i) => (
        <rect key={i} x={30 + i * 52} y={22} width="36" height="22" rx="4" fill={c} opacity="0.6" />
      ))}
      <path d="M 20 33 Q 90 18 160 33 Q 230 48 300 33 Q 340 24 360 33"
        stroke="#8B5E3C" strokeWidth="2" fill="none" opacity="0.5" />
      {/* Flowers */}
      {([40,85,130,230,280,320] as number[]).map((x, i) => (
        <g key={x}>
          <line x1={x} y1="225" x2={x} y2={195 - (i % 3) * 10}
            stroke="#388E3C" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={x} cy={190 - (i % 3) * 10} r="12"
            fill={(['#FF8B8B','#FFD93D','#8BC48A','#7EC8C1','#FF8B4A','#FFB3C1'] as string[])[i]}
            opacity="0.8" />
        </g>
      ))}
      {/* Turtle (center) */}
      <Turtle cx={180} cy={218} s={0.90} mood="happy" />
      {/* Friends */}
      <Bear   cx={72}  cy={218} s={0.70} mood="happy" />
      <Rabbit cx={290} cy={218} s={0.68} mood="happy" />
      <Fox    cx={46}  cy={225} s={0.60} mood="happy" />
      <Owl    cx={310} cy={222} s={0.62} mood="happy" />
      {/* Trophy */}
      <circle cx="180" cy="140" r="22" fill="#FFD93D" opacity="0.9" />
      <circle cx="180" cy="140" r="16" fill="white" opacity="0.9" />
      <text x="180" y="146" fontSize="16" textAnchor="middle">🏆</text>
      <rect x="0" y="250" width="360" height="50" fill="#C8E6C9" opacity="0.4" />
    </svg>
  );
}

export function NeuruGardenP6({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(180deg,#1A237E 0%,#3949AB 35%,#5C6BC0 60%,#9FA8DA 100%)' }}>
      {/* Stars */}
      {([40,80,130,180,230,290,330,55,160,270] as number[]).map((x, i) => (
        <circle key={i} cx={x} cy={20 + (i % 4) * 18}
          r={i % 3 === 0 ? 3 : 2} fill="white" opacity={0.6 + (i % 4) * 0.1} />
      ))}
      {/* Moon */}
      <circle cx="290" cy="55" r="28" fill="#FFD93D" opacity="0.85" />
      <circle cx="300" cy="48" r="20" fill="#3949AB" />
      {/* Night garden silhouette */}
      {([45,85,130,178,222,265,305] as number[]).map((x, i) => (
        <g key={x}>
          <line x1={x} y1="218" x2={x} y2={178 - (i % 3) * 8}
            stroke="#1B5E20" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
          <circle cx={x} cy={172 - (i % 3) * 8} r="12"
            fill={(['#2E7D32','#388E3C','#1B5E20'] as string[])[i % 3]} opacity="0.9" />
        </g>
      ))}
      {/* Turtle peaceful */}
      <Turtle cx={180} cy={225} s={0.85} mood="happy" />
      <ellipse cx="180" cy="205" rx="32" ry="14" fill="#7ECEC1" opacity="0.2" />
      {/* Quote */}
      <rect x="35" y="55" width="218" height="55" rx="12" fill="white" opacity="0.12" />
      <text x="144" y="76" fontSize="11" textAnchor="middle" fill="white" opacity="0.9">느려도 괜찮아.</text>
      <text x="144" y="93" fontSize="11" textAnchor="middle" fill="white" opacity="0.9">나만의 속도로 꾸준히 하면 돼.</text>
      <rect x="0" y="247" width="360" height="53" fill="#1A237E" opacity="0.4" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
//  7화  라온이의 용기의 다리  🐦
// ═══════════════════════════════════════════════════════════════

export function RaonBridgeP1({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(180deg,#E1F5FE 0%,#B3E5FC 30%,#E8F5E9 70%,#F9FBE7 100%)' }}>
      <circle cx="265" cy="65" r="38" fill="#FFD93D" opacity="0.75" />
      <ellipse cx="70" cy="65" rx="52" ry="20" fill="white" opacity="0.75" />
      <ellipse cx="95" cy="50" rx="34" ry="17" fill="white" opacity="0.75" />
      {/* Observation tower */}
      <rect x="50" y="100" width="30" height="130" rx="4" fill="#8B7355" />
      <rect x="40" y="92" width="50" height="20" rx="5" fill="#C4A77D" />
      <rect x="36" y="85" width="58" height="12" rx="4" fill="#8B7355" />
      <line x1="40" y1="85" x2="94" y2="85" stroke="#8B7355" strokeWidth="3" />
      <line x1="40" y1="75" x2="40" y2="85" stroke="#8B7355" strokeWidth="2.5" />
      <line x1="94" y1="75" x2="94" y2="85" stroke="#8B7355" strokeWidth="2.5" />
      {/* Sparrow on tower */}
      <Sparrow cx={67} cy={68} s={0.72} />
      {/* Bridge in distance */}
      <path d="M 180 200 Q 250 175 320 200"
        stroke="#C4A77D" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 192 195 Q 250 170 308 195"
        stroke="#D4B896" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5" />
      <line x1="180" y1="200" x2="210" y2="170" stroke="#8B7355" strokeWidth="2" opacity="0.5" />
      <line x1="250" y1="180" x2="250" y2="155" stroke="#8B7355" strokeWidth="2" opacity="0.5" />
      <line x1="320" y1="200" x2="290" y2="170" stroke="#8B7355" strokeWidth="2" opacity="0.5" />
      {/* Far land */}
      <ellipse cx="290" cy="215" rx="60" ry="18" fill="#8BC48A" opacity="0.4" />
      {/* Thought bubble */}
      <circle cx="100" cy="62" r="5" fill="white" opacity="0.7" />
      <circle cx="110" cy="52" r="7" fill="white" opacity="0.75" />
      <ellipse cx="130" cy="44" rx="26" ry="18" fill="white" opacity="0.88" />
      <text x="130" y="50" fontSize="17" textAnchor="middle">🌉</text>
      <rect x="0" y="240" width="360" height="60" fill="#A5D6A7" opacity="0.3" />
    </svg>
  );
}

export function RaonBridgeP2({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#FFFDE7 0%,#FFF9C4 50%,#FFF3CD 100%)' }}>
      {/* Bridge */}
      <path d="M 40 205 Q 180 170 320 205"
        stroke="#C4A77D" strokeWidth="10" fill="none" opacity="0.7" strokeLinecap="round" />
      {[70,100,130,160,190,220,250,280].map(x => (
        <rect key={x} x={x} y={196 + Math.round((x - 180) * (x - 180) / 3000)}
          width="18" height="10" rx="2" fill="#8B7355" opacity="0.55" />
      ))}
      <path d="M 38 185 Q 180 148 322 185" stroke="#8B5E3C" strokeWidth="3" fill="none" opacity="0.5" />
      <path d="M 38 225 Q 180 190 322 225" stroke="#8B5E3C" strokeWidth="3" fill="none" opacity="0.5" />
      <rect x="170" y="152" width="20" height="50" rx="4" fill="#8B7355" opacity="0.6" />
      {/* Sparrow nervous at entrance */}
      <Sparrow cx={78} cy={195} s={0.80} />
      {/* Shaking lines */}
      <line x1="55" y1="175" x2="48" y2="165" stroke="#FFD93D" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <line x1="50" y1="180" x2="40" y2="174" stroke="#FFD93D" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <line x1="56" y1="185" x2="44" y2="182" stroke="#FFD93D" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      {/* Thought bubble */}
      <circle cx="115" cy="155" r="5" fill="white" opacity="0.75" />
      <circle cx="127" cy="143" r="8" fill="white" opacity="0.8" />
      <ellipse cx="153" cy="130" rx="30" ry="20" fill="white" opacity="0.9" />
      <text x="153" y="136" fontSize="18" textAnchor="middle">😰</text>
      {/* Far side */}
      <ellipse cx="305" cy="218" rx="48" ry="15" fill="#8BC48A" opacity="0.35" />
      <rect x="0" y="240" width="360" height="60" fill="#E0D8A0" opacity="0.3" />
    </svg>
  );
}

export function RaonBridgeP3({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#EDE7F6 0%,#E8EAF6 50%,#EEF2FF 100%)' }}>
      {/* Bookshelves */}
      <rect x="14" y="50" width="20" height="200" rx="3" fill="#8B7355" opacity="0.5" />
      <rect x="326" y="50" width="20" height="200" rx="3" fill="#8B7355" opacity="0.5" />
      {(['#FF8B8B','#FFD93D','#8BC48A','#7EC8C1','#6B7FBF','#FF8B4A'] as string[]).map((c, i) => (
        <rect key={i} x="18" y={55 + i * 32} width="12" height="28" rx="2" fill={c} opacity="0.7" />
      ))}
      {(['#6B7FBF','#8BC48A','#FF8B4A','#FF8B8B','#FFD93D','#7EC8C1'] as string[]).map((c, i) => (
        <rect key={i} x="330" y={55 + i * 32} width="12" height="28" rx="2" fill={c} opacity="0.7" />
      ))}
      {/* Table */}
      <rect x="88" y="195" width="186" height="12" rx="4" fill="#C4A77D" opacity="0.7" />
      <rect x="104" y="205" width="12" height="45" rx="3" fill="#8B7355" opacity="0.6" />
      <rect x="244" y="205" width="12" height="45" rx="3" fill="#8B7355" opacity="0.6" />
      {/* Open book */}
      <ellipse cx="180" cy="194" rx="58" ry="8" fill="#FFF8E7"
        stroke="#C4A77D" strokeWidth="1.5" opacity="0.95" />
      <line x1="180" y1="186" x2="180" y2="202" stroke="#C4A77D" strokeWidth="1.5" opacity="0.6" />
      {/* Book illustration */}
      <circle cx="158" cy="192" r="7" fill="#8BC48A" opacity="0.5" />
      <circle cx="202" cy="192" r="7" fill="#FFD93D" opacity="0.5" />
      {/* Sparrow reading */}
      <Sparrow cx={138} cy={178} s={0.75} />
      {/* Owl beside */}
      <Owl cx={222} cy={175} s={0.75} mood="thinking" />
      {/* Map page */}
      <rect x="100" y="148" width="76" height="44" rx="5" fill="white"
        opacity="0.85" stroke="#C4A77D" strokeWidth="1.5" />
      <path d="M 108 168 Q 138 155 168 168" stroke="#C4A77D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="168" cy="165" r="5" fill="#8BC48A" opacity="0.7" />
      <text x="138" y="185" fontSize="9" textAnchor="middle" fill="#8B7355">저 너머에 친구들이!</text>
      <rect x="0" y="252" width="360" height="48" fill="#D1C4E9" opacity="0.3" />
    </svg>
  );
}

export function RaonBridgeP4({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#E0F7FA 0%,#B2EBF2 40%,#E8F5E9 80%,#F1F8E9 100%)' }}>
      <circle cx="295" cy="55" r="36" fill="#FFD93D" opacity="0.8" />
      {/* Bridge */}
      <path d="M 20 210 Q 180 165 340 210"
        stroke="#C4A77D" strokeWidth="12" fill="none" opacity="0.7" strokeLinecap="round" />
      {[55,85,115,145,175,205,235,265,295,320].map(x => (
        <rect key={x} x={x} y={199 + Math.round(Math.abs((x - 180) * 0.06))}
          width="18" height="12" rx="2" fill="#8B7355" opacity="0.5" />
      ))}
      <path d="M 18 192 Q 180 145 342 192" stroke="#8B5E3C" strokeWidth="3" fill="none" opacity="0.5" />
      {/* Sparrow walking across, wings spread */}
      <Sparrow cx={175} cy={188} s={0.85} />
      {/* Wing spread */}
      <ellipse cx="148" cy="182" rx="20" ry="8" fill="#FFD93D" opacity="0.5" transform="rotate(-15,148,182)" />
      <ellipse cx="202" cy="182" rx="20" ry="8" fill="#FFD93D" opacity="0.5" transform="rotate(15,202,182)" />
      <text x="175" y="148" fontSize="14" textAnchor="middle">✨</text>
      <text x="148" y="162" fontSize="11" opacity="0.7">💪</text>
      {/* Cheer bubble */}
      <rect x="188" y="110" width="108" height="36" rx="10" fill="white"
        opacity="0.88" stroke="#7EC8C1" strokeWidth="1.5" />
      <text x="242" y="126" fontSize="11" textAnchor="middle" fill="#4E8098">할 수 있어!</text>
      <text x="242" y="140" fontSize="11" textAnchor="middle" fill="#4E8098">한 발씩 🐾</text>
      <ellipse cx="320" cy="225" rx="40" ry="14" fill="#8BC48A" opacity="0.5" />
      <rect x="0" y="248" width="360" height="52" fill="#A5D6A7" opacity="0.3" />
    </svg>
  );
}

export function RaonBridgeP5({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#E8F5E9 0%,#DCEDC8 50%,#F9FBE7 100%)' }}>
      {/* Lush greenery */}
      <circle cx="60"  cy="140" r="48" fill="#66BB6A" opacity="0.35" />
      <circle cx="300" cy="130" r="52" fill="#66BB6A" opacity="0.3" />
      <circle cx="180" cy="115" r="62" fill="#81C784" opacity="0.25" />
      {/* Flowers */}
      {([40,75,110,155,200,248,285,320] as number[]).map((x, i) => (
        <g key={x}>
          <line x1={x} y1="228" x2={x} y2={205 - (i % 3) * 8}
            stroke="#388E3C" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={x} cy={200 - (i % 3) * 8} r="10"
            fill={(['#FF8B8B','#FFD93D','#FF8B4A','#7EC8C1','#8BC48A','#FFB3C1','#6B7FBF','#FFD93D'] as string[])[i]}
            opacity="0.8" />
        </g>
      ))}
      {/* Sparrow happy */}
      <Sparrow cx={135} cy={210} s={0.85} />
      {/* Snail (달리) — simple inline */}
      <g transform="translate(250,215)">
        <ellipse cx="0" cy="-8" rx="28" ry="22" fill="#FFD93D" opacity="0.9" />
        <path d="M 0 -8 Q 12 -18 8 -4 Q 4 8 -8 4 Q -18 -2 -12 -14 Q -6 -22 0 -8"
          stroke="#FF8B4A" strokeWidth="2.5" fill="none" opacity="0.8" />
        <ellipse cx="0" cy="8" rx="22" ry="10" fill="#8BC48A" opacity="0.9" />
        <circle cx="18" cy="6" r="8" fill="#A5D6A7" />
        <circle cx="16" cy="5" r="2.5" fill="#3D3D3D" />
        <circle cx="17" cy="4" r="1" fill="white" />
        <path d="M 14 9 Q 18 12 22 9" stroke="#388E3C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <line x1="16" y1="-2" x2="12" y2="-14" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="-15" r="3" fill="#66BB6A" />
        <line x1="20" y1="-2" x2="22" y2="-14" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round" />
        <circle cx="22" cy="-15" r="3" fill="#66BB6A" />
      </g>
      {/* Snail speech bubble */}
      <rect x="255" y="142" width="90" height="40" rx="10" fill="white"
        opacity="0.9" stroke="#8BC48A" strokeWidth="1.5" />
      <polygon points="270,182 282,182 266,195" fill="white" stroke="#8BC48A" strokeWidth="1.5" />
      <text x="300" y="158" fontSize="10.5" textAnchor="middle" fill="#388E3C">안녕? 나는 달리야!</text>
      <text x="300" y="174" fontSize="10.5" textAnchor="middle" fill="#388E3C">같이 놀자! 🐌</text>
      <rect x="0" y="248" width="360" height="52" fill="#A5D6A7" opacity="0.35" />
    </svg>
  );
}

export function RaonBridgeP6({ className }: P) {
  return (
    <svg viewBox="0 0 360 300" className={className}
      style={{ background: 'linear-gradient(160deg,#FFF8E1 0%,#FFF3E0 60%,#FFE0B2 100%)' }}>
      <circle cx="285" cy="60" r="42" fill="#FFD93D" opacity="0.75" />
      {/* Sparrow center, excited */}
      <Sparrow cx={180} cy={200} s={0.88} />
      {/* Wing spread */}
      <ellipse cx="148" cy="194" rx="24" ry="9" fill="#FFD93D" opacity="0.55" transform="rotate(-20,148,194)" />
      <ellipse cx="212" cy="194" rx="24" ry="9" fill="#FFD93D" opacity="0.55" transform="rotate(20,212,194)" />
      {/* Friends listening */}
      <Bear   cx={62}  cy={218} s={0.68} mood="happy" />
      <Rabbit cx={298} cy={218} s={0.65} mood="happy" />
      <Turtle cx={42}  cy={228} s={0.58} mood="happy" />
      <Fox    cx={320} cy={225} s={0.58} mood="happy" />
      <Owl    cx={52}  cy={215} s={0.55} mood="surprised" />
      {/* Speech bubble */}
      <rect x="100" y="118" width="160" height="54" rx="12" fill="white"
        opacity="0.92" stroke="#FFD93D" strokeWidth="2" />
      <polygon points="168,172 180,172 172,185" fill="white" stroke="#FFD93D" strokeWidth="1.5" />
      <text x="180" y="138" fontSize="10.5" textAnchor="middle" fill="#5D4037">다르다는 건</text>
      <text x="180" y="153" fontSize="10.5" textAnchor="middle" fill="#5D4037">신기하고 멋진 거야! 🌟</text>
      <text x="180" y="165" fontSize="9.5" textAnchor="middle" fill="#8B6914">더 큰 세상이 있어!</text>
      <text x="80"  y="140" fontSize="14" opacity="0.7">✨</text>
      <text x="275" y="145" fontSize="14" opacity="0.7">✨</text>
      <text x="158" y="95" fontSize="16" opacity="0.8">🌉</text>
      <rect x="0" y="252" width="360" height="48" fill="#FFE0B2" opacity="0.35" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
//  Lookup table used by the story reader
// ═══════════════════════════════════════════════════════════════

export const STORY_ILLUSTRATIONS: Record<string, React.FC<P>[]> = {
  'daon-weather':  [DaonWeatherP1, DaonWeatherP2, DaonWeatherP3, DaonWeatherP4, DaonWeatherP5, DaonWeatherP6],
  'nari-invention':[NariInventionP1, NariInventionP2, NariInventionP3, NariInventionP4, NariInventionP5, NariInventionP6],
  'haru-festival': [HaruFestivalP1, HaruFestivalP2, HaruFestivalP3, HaruFestivalP4, HaruFestivalP5, HaruFestivalP6],
  'jiu-plan':      [JiuPlanP1, JiuPlanP2, JiuPlanP3, JiuPlanP4, JiuPlanP5, JiuPlanP6],
  'sori-rainbow':  [SoriRainbowP1, SoriRainbowP2, SoriRainbowP3, SoriRainbowP4, SoriRainbowP5, SoriRainbowP6],
  'neuru-garden':  [NeuruGardenP1, NeuruGardenP2, NeuruGardenP3, NeuruGardenP4, NeuruGardenP5, NeuruGardenP6],
  'raon-bridge':   [RaonBridgeP1, RaonBridgeP2, RaonBridgeP3, RaonBridgeP4, RaonBridgeP5, RaonBridgeP6],
};
