import { getAllStats } from '@/lib/tracking';
import { getVisitorStats } from '@/lib/visitors';
import { coloringPages } from '@/data/coloringPages';
import { Download, Printer, BarChart2, TrendingUp, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
    const stats = getAllStats();
    const visitors = getVisitorStats();
    const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    const totalDownloads = Object.values(stats).reduce((s, v) => s + (v.downloads ?? 0), 0);
    const totalPrints = Object.values(stats).reduce((s, v) => s + (v.prints ?? 0), 0);

    const rows = coloringPages.map(p => ({
        slug: p.slug,
        title: p.title,
        type: p.type,
        downloads: stats[p.slug]?.downloads ?? 0,
        prints: stats[p.slug]?.prints ?? 0,
        lastDownload: stats[p.slug]?.lastDownload,
        lastPrint: stats[p.slug]?.lastPrint,
    })).sort((a, b) => (b.downloads + b.prints) - (a.downloads + a.prints));

    const typeLabel: Record<string, string> = {
        character: '캐릭터', scene: '장면', activity: '활동',
        emotion: '감정', mandala: '만다라', 'color-therapy': '색채치료', pattern: '패턴',
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <BarChart2 size={24} className="text-indigo-500" />
                        관리자 — 다운로드 / 인쇄 통계
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">기준 시각: {now}</p>
                </div>

                {/* Visitor cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <StatCard label="총 방문자" value={visitors.total} icon="🏡" color="violet" />
                    <StatCard label="오늘 방문자" value={visitors.today} icon="🌱" color="violet" />
                    <StatCard label="전체 도안" value={coloringPages.length} icon="🎨" />
                    <StatCard label="총 이용 (다운+인쇄)" value={totalDownloads + totalPrints} icon="📊" />
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard label="총 다운로드" value={totalDownloads} icon="⬇️" highlight />
                    <StatCard label="총 인쇄" value={totalPrints} icon="🖨️" highlight />
                    <StatCard label="다운 + 인쇄 합계" value={totalDownloads + totalPrints} icon="📊" />
                    <StatCard label="방문자 대비 이용률" value={visitors.total > 0 ? Math.round((totalDownloads + totalPrints) / visitors.total * 100) : 0} icon="%" />
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-gray-500 font-semibold">도안</th>
                                <th className="px-4 py-3 text-left text-gray-500 font-semibold">유형</th>
                                <th className="px-4 py-3 text-center text-gray-500 font-semibold">
                                    <span className="flex items-center justify-center gap-1">
                                        <Download size={13} /> 다운
                                    </span>
                                </th>
                                <th className="px-4 py-3 text-center text-gray-500 font-semibold">
                                    <span className="flex items-center justify-center gap-1">
                                        <Printer size={13} /> 인쇄
                                    </span>
                                </th>
                                <th className="px-4 py-3 text-center text-gray-500 font-semibold">
                                    <span className="flex items-center justify-center gap-1">
                                        <TrendingUp size={13} /> 합계
                                    </span>
                                </th>
                                <th className="px-4 py-3 text-left text-gray-500 font-semibold hidden md:table-cell">마지막 활동</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {rows.map((row, i) => {
                                const total = row.downloads + row.prints;
                                const lastActivity = [row.lastDownload, row.lastPrint]
                                    .filter(Boolean)
                                    .sort()
                                    .at(-1);
                                return (
                                    <tr key={row.slug} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                        <td className="px-4 py-3 font-medium text-gray-700">
                                            <span className="text-xs text-gray-400 block">{row.slug}</span>
                                            {row.title}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-full font-medium">
                                                {typeLabel[row.type] ?? row.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center font-bold text-blue-600">{row.downloads}</td>
                                        <td className="px-4 py-3 text-center font-bold text-emerald-600">{row.prints}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`font-bold ${total > 0 ? 'text-orange-500' : 'text-gray-300'}`}>{total}</span>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-gray-400 hidden md:table-cell">
                                            {lastActivity
                                                ? new Date(lastActivity).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
                                                : '—'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <p className="mt-6 text-xs text-gray-400 text-center">
                    통계는 <code className="bg-gray-100 px-1 rounded">src/data/stats.json</code> 에 저장됩니다.
                    Vercel 배포 시 Supabase 연동이 필요합니다.
                </p>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, highlight, color }: {
    label: string; value: number; icon: string; highlight?: boolean; color?: 'violet';
}) {
    const isViolet = color === 'violet';
    return (
        <div className={`rounded-2xl p-4 border ${
            isViolet ? 'bg-violet-50 border-violet-100' :
            highlight ? 'bg-indigo-50 border-indigo-100' :
            'bg-white border-gray-100'
        }`}>
            <div className="text-2xl mb-1">{icon}</div>
            <div className={`text-2xl font-bold ${
                isViolet ? 'text-violet-600' :
                highlight ? 'text-indigo-600' :
                'text-gray-700'
            }`}>{value.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
        </div>
    );
}
