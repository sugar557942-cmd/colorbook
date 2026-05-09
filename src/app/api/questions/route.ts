import { NextRequest, NextResponse } from 'next/server';
import { getQuestions, addQuestion } from '@/lib/questions';

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json(getQuestions());
}

export async function POST(req: NextRequest) {
    try {
        const { emotion, coloringSlug, coloringTitle, content } = await req.json();
        if (!content || content.trim().length < 5)
            return NextResponse.json({ error: '내용을 5자 이상 입력해주세요.' }, { status: 400 });
        const q = addQuestion({ emotion: emotion || '잘 모르겠어요', coloringSlug, coloringTitle, content: content.trim() });
        return NextResponse.json(q);
    } catch {
        return NextResponse.json({ error: 'server error' }, { status: 500 });
    }
}
