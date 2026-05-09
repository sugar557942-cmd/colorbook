/**
 * 캐릭터별 동화책 데이터
 * — 진짜 책처럼 12장(=24페이지) 구조, 좌측 그림 / 우측 텍스트
 */

export interface StorybookPage {
    pageNumber: number;
    imageNumber: number;        // /public/stories/{slug}/{n}.webp
    sceneTitle?: string;        // 장면 부제 (목차용)
    text: string;
}

export interface Storybook {
    characterSlug: string;
    title: string;
    subtitle?: string;
    theme: string;              // 핵심 가치 (인내·공감·용기 등)
    description: string;
    coverEmoji: string;
    coverColor: string;
    pages: StorybookPage[];
}

/* ═══════════════════════════════════════════════════
   느루 — 인내 · 자기 속도 존중
═══════════════════════════════════════════════════ */
export const neuruStory: Storybook = {
    characterSlug: 'neuru',
    title: '느루의 특별한 선물',
    subtitle: '천천히 가도 괜찮아',
    theme: '인내 · 자기 속도 존중',
    description: '마음마을 축제에서 느루가 자신만의 속도로 만든 가장 다정한 선물 이야기. 빠르지 않아도, 정성껏 만든 것이 가장 빛난다는 것을 알려줍니다.',
    coverEmoji: '🐢',
    coverColor: '#9CC4B8',
    pages: [
        {
            pageNumber: 1,
            imageNumber: 1,
            sceneTitle: '빛나는 축제 날',
            text: `내일은 마음마을 빛나는 축제 날이에요.
다온이는 꿀단지를, 나리는 꽃다발을 준비했어요.
모두 자기만의 멋진 재능을 보여주려고 두근두근.
"나는… 무얼 할 수 있을까?"
한 켠에서 느루가 조용히 생각했어요.`,
        },
        {
            pageNumber: 2,
            imageNumber: 2,
            sceneTitle: '작은 한숨',
            text: `느루는 등껍질을 톡톡 두드리며 한숨을 쉬었어요.
"난 너무 느려.
다른 친구들처럼 빠르게 만들 수 없는데…."
연못 위 작은 그림자가 가만히 흔들렸어요.`,
        },
        {
            pageNumber: 3,
            imageNumber: 3,
            sceneTitle: '다온이의 손길',
            text: `그때 다온이가 살며시 다가왔어요.
"느루야, 천천히 가도 괜찮아.
너만의 속도가 있는 거야."
다온이의 따뜻한 손이 느루의 등을 토닥였어요.`,
        },
        {
            pageNumber: 4,
            imageNumber: 4,
            sceneTitle: '일곱 마음이 모인 자리',
            text: `하루도, 지우도, 소리도, 라온이도 함께 달려왔어요.
"우리는 너를 믿어, 느루야!"
"네가 만든 건 분명 특별할 거야!"
일곱 마음이 한 자리에 모였답니다.`,
        },
        {
            pageNumber: 5,
            imageNumber: 5,
            sceneTitle: '마음속 작은 별',
            text: `집으로 돌아온 느루는 가만히 눈을 감았어요.
"빠르게는 못 해도… 정성껏은 할 수 있어."
마음속에 작은 별 하나가 반짝였어요.`,
        },
        {
            pageNumber: 6,
            imageNumber: 6,
            sceneTitle: '한 걸음에 하나씩',
            text: `느루는 들길을 천천히 걸으며
예쁜 돌멩이와 들꽃을 하나씩 주웠어요.
한 걸음에 하나, 또 한 걸음에 하나.
서두르지 않고, 멈추지도 않고.`,
        },
        {
            pageNumber: 7,
            imageNumber: 7,
            sceneTitle: '별빛 아래 정성',
            text: `별이 뜨고, 달이 두둥실 떠도
느루는 멈추지 않았어요.
작은 돌에 색을 입히고
꽃잎을 곱게 다듬고, 또 다듬었어요.
"조금만 더…, 조금만 더…."`,
        },
        {
            pageNumber: 8,
            imageNumber: 8,
            sceneTitle: '드디어 축제 날',
            text: `드디어 축제 날이 밝았어요!
나리는 무지갯빛 노래를, 소리는 신나는 춤을,
지우는 빛나는 마술을 보여주었어요.
박수 소리가 마음마을을 가득 채웠지요.`,
        },
        {
            pageNumber: 9,
            imageNumber: 9,
            sceneTitle: '끼익— 끼익—',
            text: `그때, 끼익— 끼익—
멀리서 작은 수레 소리가 들렸어요.
하얀 천에 덮인 무언가를 끌고
느루가 천천히, 천천히 다가왔답니다.`,
        },
        {
            pageNumber: 10,
            imageNumber: 10,
            sceneTitle: '가장 다정한 정원길',
            text: `"친구들… 내 선물을 봐줄래?"
느루가 살며시 천을 걷자
모두가 입을 떡 벌렸어요.
색깔 돌과 꽃이 어우러진 작은 길—
세상에서 가장 다정한 정원길이었어요.`,
        },
        {
            pageNumber: 11,
            imageNumber: 11,
            sceneTitle: '꽃잎으로 새긴 약속',
            text: `길 한가운데 꽃잎으로 새긴 글자.
F · R · I · E · N · D · S · H · I · P
"우정이 가장 아름다운 선물이라고 생각했어."
느루가 수줍게 웃었어요.`,
        },
        {
            pageNumber: 12,
            imageNumber: 12,
            sceneTitle: '가장 따뜻한 별',
            text: `친구들은 느루가 만든 길 위에 모였어요.
일곱 마음이 한 동그라미가 되어
서로를 꼭 안아주었지요.
"느려도 괜찮아. 너는 정말 특별해, 느루야."
그날 밤, 마음마을 위로 가장 따뜻한 별이 떴답니다.`,
        },
    ],
};

/* ═══════════════════════════════════════════════════
   전체 동화책 모음 — 캐릭터별 추가 시 여기에 등록
═══════════════════════════════════════════════════ */
export const storybooks: Storybook[] = [
    neuruStory,
    // daonStory, nariStory, haruStory, jiuStory, soriStory, raonStory  (작성 예정)
];

export function getStorybookBySlug(slug: string): Storybook | undefined {
    return storybooks.find(s => s.characterSlug === slug);
}
