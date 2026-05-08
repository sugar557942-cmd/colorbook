import { ColoringPage } from '@/types';
import { coloringPages } from '@/data/coloringPages';

/**
 * AI 생성 이미지 경로를 순번 기반으로 반환합니다.
 * 파일명 규칙: /coloring/{character}-{n}.png  (예: daon-1.png, nari-3.png)
 * 'all' 캐릭터(공통 도안)는 null 반환 → SVG fallback 사용.
 */
export function getColoringImagePath(page: ColoringPage): string | null {
    if (!page.character || page.character === 'all') return null;

    const charPages = coloringPages.filter(p => p.character === page.character);
    const index = charPages.findIndex(p => p.slug === page.slug);
    if (index < 0) return null;

    return `/coloring/${page.character}-${index + 1}.png`;
}

/**
 * 다운로드 파일명을 반환합니다.
 * PNG가 있으면 PNG 파일명, 없으면 SVG 파일명.
 */
export function getDownloadFilename(page: ColoringPage, usePng: boolean): string {
    return usePng
        ? `maeul-${page.character}-${getCharIndex(page)}.png`
        : `maeul-${page.slug}.svg`;
}

function getCharIndex(page: ColoringPage): number {
    const charPages = coloringPages.filter(p => p.character === page.character);
    return charPages.findIndex(p => p.slug === page.slug) + 1;
}
