import { NextRequest, NextResponse } from 'next/server';
import { addConsultation, getConsultations } from '@/lib/questions';

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json(getConsultations());
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { contact, concern } = body;
        if (!contact || !concern)
            return NextResponse.json({ error: '연락처와 고민 내용은 필수입니다.' }, { status: 400 });
        const r = addConsultation(body);
        return NextResponse.json(r);
    } catch {
        return NextResponse.json({ error: 'server error' }, { status: 500 });
    }
}
