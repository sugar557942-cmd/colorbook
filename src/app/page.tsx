"use client";

import React from 'react';
import FloatingElements from '@/components/shared/FloatingElements';
import HeroSection from '@/components/home/HeroSection';
import CharacterParade from '@/components/home/CharacterParade';
import StoryPreview from '@/components/home/StoryPreview';
import ColoringCTA from '@/components/home/ColoringCTA';
import ParentsSection from '@/components/home/ParentsSection';

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <FloatingElements density="low" />

      {/* 1. 첫인상 — Hero */}
      <HeroSection />

      {/* 2. 핵심 기능 — 색칠공부 바로 체험 */}
      <ColoringCTA />

      {/* 3. 캐릭터 탐색 */}
      <CharacterParade />

      {/* 4. 이야기 미리보기 */}
      <StoryPreview />

      {/* 5. 부모님 신뢰 */}
      <ParentsSection />

      <div className="h-20" />
    </div>
  );
}
