export interface Character {
    slug: string;
    name: string;
    nameEn: string;
    animal: string;
    animalEmoji: string;
    color: string;
    colorLight: string;
    quote: string;
    role: string;
    personality: string;
    strength: string;
    growthArea: string;
    likes: string[];
    space: string;
    description: string;
}

export interface Story {
    slug: string;
    title: string;
    episode: number;
    mainCharacter: string;
    educationTag: string[];
    difficulty: '함께읽기' | '혼자읽기';
    summary: string;
    coverImage: string;
}

export type ColoringDifficulty = 1 | 2 | 3;
export type ColoringType = 'character' | 'scene' | 'activity' | 'pattern' | 'mandala' | 'emotion' | 'color-therapy';
export type AgeRange = '3-5세' | '6-8세' | '9-12세' | '전연령';

export interface ColoringPage {
    slug: string;
    title: string;
    character: string;
    difficulty: ColoringDifficulty;
    svgPath: string;
    downloadUrl: string;
    thumbnailUrl?: string;
    type: ColoringType;
    relatedStory?: string;
    ageRange: AgeRange;
    // 미술심리 연계 정보
    artTherapyGoal: string;
    artTherapyTheme: string;
    therapeuticColor?: string;
    activityPrompt?: string;
}
