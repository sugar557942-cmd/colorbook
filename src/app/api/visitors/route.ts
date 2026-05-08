import { NextResponse } from 'next/server';
import { getVisitorStats, registerVisit } from '@/lib/visitors';

// GET — 현재 방문자 통계 조회 (카운트 증가 없음)
export async function GET() {
    const stats = getVisitorStats();
    return NextResponse.json(stats);
}

// POST — 방문 1회 등록 후 통계 반환
export async function POST() {
    const stats = registerVisit();
    return NextResponse.json(stats);
}
