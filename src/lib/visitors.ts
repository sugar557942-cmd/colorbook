import fs from 'fs';
import path from 'path';
import { getAllStats } from './tracking';

const VISITORS_FILE = path.join(process.cwd(), 'src', 'data', 'visitors.json');

export interface VisitorData {
    total: number;
    daily: Record<string, number>;
}

export interface VisitorStats {
    total: number;
    today: number;
    downloads: number;
    prints: number;
}

function todayKST(): string {
    return new Date().toLocaleDateString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric', month: '2-digit', day: '2-digit',
    }).replace(/\. /g, '-').replace('.', '');
}

function readVisitors(): VisitorData {
    try {
        if (fs.existsSync(VISITORS_FILE)) {
            const raw = fs.readFileSync(VISITORS_FILE, 'utf-8');
            return JSON.parse(raw);
        }
    } catch { /* ignore */ }
    return { total: 0, daily: {} };
}

function writeVisitors(data: VisitorData): void {
    try {
        fs.writeFileSync(VISITORS_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch {
        console.log('[VISITORS]', JSON.stringify(data));
    }
}

function getActionTotals() {
    const stats = getAllStats();
    return Object.values(stats).reduce(
        (acc, v) => ({
            downloads: acc.downloads + (v.downloads ?? 0),
            prints: acc.prints + (v.prints ?? 0),
        }),
        { downloads: 0, prints: 0 },
    );
}

export function getVisitorStats(): VisitorStats {
    const data = readVisitors();
    const today = todayKST();
    const { downloads, prints } = getActionTotals();
    return {
        total: data.total,
        today: data.daily[today] ?? 0,
        downloads,
        prints,
    };
}

export function registerVisit(): VisitorStats {
    const data = readVisitors();
    const today = todayKST();
    data.total = (data.total ?? 0) + 1;
    data.daily[today] = (data.daily[today] ?? 0) + 1;
    writeVisitors(data);
    const { downloads, prints } = getActionTotals();
    return { total: data.total, today: data.daily[today], downloads, prints };
}
