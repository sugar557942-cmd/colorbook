import fs from 'fs';
import path from 'path';

const STATS_FILE = path.join(process.cwd(), 'src', 'data', 'stats.json');

export interface PageStats {
    downloads: number;
    prints: number;
    lastDownload?: string;
    lastPrint?: string;
}

export interface StatsData {
    [slug: string]: PageStats;
}

function readStats(): StatsData {
    try {
        if (fs.existsSync(STATS_FILE)) {
            const raw = fs.readFileSync(STATS_FILE, 'utf-8');
            return JSON.parse(raw);
        }
    } catch {
        // file missing or corrupt — start fresh
    }
    return {};
}

function writeStats(data: StatsData): boolean {
    try {
        fs.writeFileSync(STATS_FILE, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch {
        // Vercel serverless or read-only FS — fall back to logging
        console.log('[STATS]', JSON.stringify(data));
        return false;
    }
}

export function trackEvent(slug: string, type: 'download' | 'print'): void {
    const stats = readStats();
    if (!stats[slug]) stats[slug] = { downloads: 0, prints: 0 };
    const now = new Date().toISOString();
    if (type === 'download') {
        stats[slug].downloads = (stats[slug].downloads ?? 0) + 1;
        stats[slug].lastDownload = now;
    } else {
        stats[slug].prints = (stats[slug].prints ?? 0) + 1;
        stats[slug].lastPrint = now;
    }
    writeStats(stats);
}

export function getAllStats(): StatsData {
    return readStats();
}
