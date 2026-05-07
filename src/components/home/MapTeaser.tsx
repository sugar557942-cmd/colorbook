"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/shared/SectionTitle';
import CloudDivider from '@/components/shared/CloudDivider';
import MagicButton from '@/components/shared/MagicButton';
import * as MapElements from '@/components/illustrations/MapElements';

const locations = [
    { id: 'tree', name: '지혜의 큰 나무', description: '모두가 모여 이야기를 나누는 곳이에요.', component: MapElements.WisdomTree },
    { id: 'market', name: '두근시장', description: '물건을 나누고 교환하는 신나는 시장!', component: MapElements.Market },
    { id: 'school', name: '배움터', description: '궁금한 것을 탐구하는 배움의 공간', component: MapElements.School },
    { id: 'workshop', name: '무지개공방', description: '그림 그리고, 표현하는 곳', component: MapElements.Workshop },
    { id: 'farm', name: '나눔 텃밭', description: '함께 가꾸고 나누는 우리 텃밭', component: MapElements.Farm },
    { id: 'plaza', name: '어울림 광장', description: '축제도 하고, 이야기도 나누는 광장', component: MapElements.Plaza },
    { id: 'pond', name: '고요한 연못', description: '마음이 복잡할 때 쉬어가는 곳', component: MapElements.Pond },
    { id: 'bridge', name: '용기의 다리', description: '다리 너머에는 무엇이 있을까요?', component: MapElements.Bridge },
];

const MapTeaser = () => {
    const [activeLoc, setActiveLoc] = useState<typeof locations[0] | null>(null);

    return (
        <section className="relative py-24 bg-gradient-to-b from-maeul-leaf/5 to-maeul-cream overflow-hidden">
            {/* Top Divider */}
            <CloudDivider
                variant="grass"
                color="#8BC48A"
                className="absolute top-0 left-0 w-full -translate-y-[80%] opacity-20"
            />

            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <SectionTitle
                    title="마음마을을 둘러볼까요?"
                    subtitle="각 장소를 누르면 어떤 이야기가 있는지 알 수 있어요"
                    decoration="leaves"
                />

                <div className="relative mt-12 bg-white/50 backdrop-blur-sm rounded-[48px] p-8 md:p-12 border-4 border-white shadow-storybook overflow-hidden">
                    {/* Map Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
                        {locations.map((loc) => (
                            <motion.div
                                key={loc.id}
                                whileHover={{ scale: 1.1, rotate: 2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setActiveLoc(loc)}
                                className="cursor-pointer flex flex-col items-center gap-4 group"
                            >
                                <div className="w-24 h-24 md:w-32 md:h-32 relative">
                                    <loc.component className="w-full h-full drop-shadow-md group-hover:drop-shadow-xl transition-all" />
                                </div>
                                <span className="font-title text-maeul-charcoal text-sm md:text-base bg-white/80 px-3 py-1 rounded-full shadow-sm">
                                    {loc.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Location Pop-up */}
                    <AnimatePresence>
                        {activeLoc && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-maeul-charcoal/20 backdrop-blur-md"
                                onClick={() => setActiveLoc(null)}
                            >
                                <motion.div
                                    className="bg-white p-8 rounded-[32px] shadow-float max-w-sm text-center relative"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="w-20 h-20 mx-auto mb-4">
                                        <activeLoc.component className="w-full h-full" />
                                    </div>
                                    <h3 className="text-24px font-title text-maeul-charcoal mb-2">{activeLoc.name}</h3>
                                    <p className="text-maeul-soft-gray mb-6">{activeLoc.description}</p>
                                    <MagicButton href="/world" size="sm">
                                        이 장소 구경하기 →
                                    </MagicButton>

                                    <button
                                        onClick={() => setActiveLoc(null)}
                                        className="absolute top-4 right-4 text-maeul-soft-gray hover:text-maeul-charcoal"
                                    >
                                        ✕
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-12 text-center">
                    <MagicButton href="/world" variant="secondary">
                        마음마을 전체 지도 보러 가기 →
                    </MagicButton>
                </div>
            </div>
        </section>
    );
};

export default MapTeaser;
