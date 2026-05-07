import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/tracking';

export async function POST(req: NextRequest) {
    try {
        const { slug, type } = await req.json();
        if (!slug || (type !== 'download' && type !== 'print')) {
            return NextResponse.json({ error: 'invalid params' }, { status: 400 });
        }
        trackEvent(slug as string, type as 'download' | 'print');
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: 'server error' }, { status: 500 });
    }
}
