"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import StorybookViewer from '@/components/storybook/StorybookViewer';
import { getStorybookBySlug } from '@/data/storybooks';
import { Home } from 'lucide-react';

export default function StorybookPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const storybook = getStorybookBySlug(slug);

    if (!storybook) {
        return (
            <div className="min-h-screen sb-paper flex flex-col items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-md"
                >
                    <div className="text-6xl mb-4">📖</div>
                    <h1 className="font-title font-bold text-[#4A3826] text-2xl mb-3">
                        아직 준비 중인 이야기예요
                    </h1>
                    <p className="font-body text-[#9A8569] mb-6">
                        곧 새로운 동화를 만나실 수 있어요. 조금만 기다려 주세요!
                    </p>
                    <button onClick={() => router.push('/stories')}
                        className="sb-btn sb-btn-primary inline-flex items-center gap-2">
                        <Home size={16} /> 이야기 목록으로
                    </button>
                </motion.div>
            </div>
        );
    }

    return <StorybookViewer storybook={storybook} />;
}
