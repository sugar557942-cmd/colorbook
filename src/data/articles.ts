/**
 * 부모님방 — 교육 칼럼·활동 가이드·안전 수칙 콘텐츠
 *
 * 미술심리상담 이론(Naumburg, Kramer, Ulman, Wadeson, Malchiodi),
 * 색채심리, 매체별 특성, SEL 5역량 등을 기반으로 작성.
 */

export type ArticleBlock =
    | { type: 'lead'; text: string }
    | { type: 'heading'; emoji?: string; text: string; subtitle?: string }
    | { type: 'paragraph'; text: string }
    | { type: 'quote'; text: string; author?: string }
    | { type: 'callout'; tone: 'butter' | 'rose' | 'sage' | 'sky' | 'lav'; emoji?: string; title?: string; text: string }
    | { type: 'list'; ordered?: boolean; items: { title?: string; text: string; emoji?: string }[] }
    | { type: 'steps'; items: { step: string; title: string; text: string; emoji?: string }[] }
    | { type: 'colorTherapy'; intro?: string; colors: { name: string; hex: string; emotions: string; usage: string }[] }
    | { type: 'mediaTable'; rows: { medium: string; quality: string; effect: string; tip: string }[] }
    | { type: 'activity'; emoji: string; title: string; goal: string; steps: string[] }
    | { type: 'tipBox'; tone: 'butter' | 'rose' | 'sage' | 'sky' | 'lav'; emoji: string; title: string; lines: string[] }
    | { type: 'twoColumn'; left: { title: string; text: string }; right: { title: string; text: string } }
    | { type: 'divider' };

export interface Article {
    slug: string;
    category: '교육 칼럼' | '활동 가이드' | '안전 수칙';
    tone: string;          // 색상 hex
    title: string;
    subtitle: string;
    summary: string;
    readingTime: string;
    author: string;
    publishedAt: string;
    heroEmoji: string;
    introQuote?: { text: string; source?: string };
    blocks: ArticleBlock[];
    takeaways: string[];
    cta?: { title: string; description: string; href: string; buttonText: string };
}

export const articles: Article[] = [
    /* ═══════════════════════════════════════════════════
       1. 교육 칼럼 — 정서 지능
    ═══════════════════════════════════════════════════ */
    {
        slug: 'emotional-intelligence',
        category: '교육 칼럼',
        tone: '#F1C667',
        title: '우리 아이 정서 지능, 어떻게 키울까요?',
        subtitle: '미술치료 이론에 기반한 5단계 감정 코칭',
        summary: '아이의 감정을 읽어주는 5단계 코칭 방법으로 정서 지능을 키워요.',
        readingTime: '5분 읽기',
        author: '마음마을 연구소',
        publishedAt: '2026-04-20',
        heroEmoji: '🌱',
        introQuote: {
            text: '아이의 감정을 부정하지 않고 있는 그대로 받아주는 순간, 아이는 자신의 마음을 안전하게 들여다볼 수 있게 됩니다.',
            source: '아동정서발달 연구',
        },
        blocks: [
            { type: 'lead', text: '"왜 그렇게 화를 내?" — 부모의 한 마디가 아이의 감정 표현을 닫게 만들 수도 있어요. 정서 지능(EQ)은 IQ만큼 중요한 평생의 자산입니다. 마음마을은 미술치료 이론을 바탕으로, 일상에서 부모님이 실천할 수 있는 5단계 감정 코칭법을 소개합니다.' },

            { type: 'heading', emoji: '🧠', text: '정서 지능이란 무엇일까요?', subtitle: 'EQ의 5가지 핵심 영역' },
            { type: 'paragraph', text: '정서 지능은 자신과 타인의 감정을 인식하고, 조절하며, 적절히 표현하는 능력을 말해요. 미국 심리학자 다니엘 골먼(Daniel Goleman)은 정서 지능이 IQ보다 인생의 성공을 더 잘 예측한다고 말했어요.' },
            { type: 'list', items: [
                { title: '자기 인식', text: '자신의 감정을 알아차리는 능력', emoji: '🪞' },
                { title: '자기 관리', text: '감정을 조절하고 충동을 다스리는 능력', emoji: '💪' },
                { title: '사회적 인식', text: '타인의 감정에 공감하는 능력', emoji: '👁️' },
                { title: '관계 기술', text: '건강한 관계를 만들고 유지하는 능력', emoji: '🤝' },
                { title: '책임 있는 결정', text: '결과를 고려해 좋은 선택을 하는 능력', emoji: '🎯' },
            ]},

            { type: 'callout', tone: 'butter', emoji: '✨', title: '왜 미술 활동일까요?',
                text: '미술치료의 선구자 마가렛 노움버그(Naumburg)는 "이미지는 무의식의 언어"라고 말했어요. 아이는 말로 표현하기 어려운 감정을 색과 선으로 자유롭게 풀어낼 수 있습니다. 색칠 한 장이 아이의 마음을 여는 열쇠가 되는 이유예요.' },

            { type: 'divider' },

            { type: 'heading', emoji: '🌿', text: '5단계 감정 코칭법', subtitle: '아이의 마음을 단단하게 키우는 일상 대화' },
            { type: 'steps', items: [
                {
                    step: '01', emoji: '👀',
                    title: '감정을 알아차리기 (Notice)',
                    text: '아이의 표정·목소리·몸짓에 주의를 기울여요. "지금 표정이 좀 어두워 보이네"처럼 작은 신호도 놓치지 마세요. 색칠하는 모습에서도 많은 것을 알 수 있어요. 빠르게 칠하나요? 어떤 색을 자주 고르나요?',
                },
                {
                    step: '02', emoji: '🤲',
                    title: '감정 그대로 받아주기 (Validate)',
                    text: '"그럴 수도 있지", "그게 뭐가 슬퍼"는 금물이에요. "속상했겠다", "많이 무서웠구나"처럼 감정을 그대로 인정해 주세요. 감정에 옳고 그름은 없습니다. 다만 표현 방식만 다듬으면 돼요.',
                },
                {
                    step: '03', emoji: '🏷️',
                    title: '감정에 이름 붙여주기 (Label)',
                    text: '아이가 느끼는 감정에 정확한 이름을 알려줘요. "지금 네 마음은 \'서운함\'이라는 감정이야". 어휘가 풍부할수록 감정을 다루는 능력도 자라요. 마음마을의 \'마음 날씨\' 도안처럼 시각화하면 더 쉽습니다.',
                },
                {
                    step: '04', emoji: '🌬️',
                    title: '함께 진정하기 (Soothe)',
                    text: '큰 감정 안에서는 이성적 사고가 어려워요. 깊게 숨쉬기, 안아주기, 색칠하기 등 차분히 가라앉힐 시간을 줘요. 색연필로 천천히 한 칸씩 채우는 행위 자체가 자기조절 훈련이 됩니다.',
                },
                {
                    step: '05', emoji: '🌟',
                    title: '함께 해결책 찾기 (Solve)',
                    text: '감정이 가라앉은 후에 비로소 "다음에는 어떻게 하면 좋을까?"를 함께 이야기해요. 부모가 일방적으로 답을 주기보다 아이가 스스로 답을 찾도록 질문해 주세요.',
                },
            ]},

            { type: 'divider' },

            { type: 'heading', emoji: '🎨', text: '미술치료가 알려주는 7가지 힘', subtitle: 'Wadeson(1980)의 미술치료 특성' },
            { type: 'paragraph', text: '미술치료 학자 Wadeson은 미술 활동이 가진 7가지 치료적 가치를 정리했어요. 이는 일반 가정에서도 충분히 활용할 수 있는 원리입니다.' },
            { type: 'list', ordered: true, items: [
                { text: '말로 표현하기 어려운 감정을 이미지로 풀어낼 수 있어요.' },
                { text: '방어가 줄어들어 진짜 마음이 자연스럽게 드러나요.' },
                { text: '아이가 만든 작품이 그대로 남아 자기 성장의 기록이 돼요.' },
                { text: '시간이 흐른 후 다시 보면서 자신을 객관적으로 만날 수 있어요.' },
                { text: '창조의 즐거움이 에너지를 회복시켜요.' },
                { text: '집중하는 동안 마음이 안정되는 효과가 있어요.' },
                { text: '완성한 작품에서 성취감과 자존감을 얻어요.' },
            ]},

            { type: 'tipBox', tone: 'sage', emoji: '🌳', title: '오늘 바로 해보기',
                lines: [
                    '오늘 아이와 마음마을 도안 한 장을 함께 색칠해 보세요.',
                    '"이 색을 고른 이유가 뭐야?"라고 한 번만 물어봐 주세요.',
                    '평가 없이 듣기만 해도 충분한 감정 코칭이 됩니다.',
                ]},
        ],
        takeaways: [
            '정서 지능은 IQ만큼 중요한 평생 자산이에요.',
            '5단계(알아차림→인정→이름붙이기→진정→해결)로 감정을 다뤄주세요.',
            '미술 활동은 무의식의 언어 — 색과 선이 아이의 마음을 풀어줍니다.',
            '평가하지 않고 들어주기만 해도 정서 지능은 자라요.',
        ],
        cta: {
            title: '오늘 우리 아이와 함께 색칠해 보세요',
            description: '마음마을의 다온이 도안으로 5단계 감정 코칭을 시작해보세요.',
            href: '/coloring',
            buttonText: '🎨 색칠도안 보러 가기',
        },
    },

    /* ═══════════════════════════════════════════════════
       2. 활동 가이드 — 색칠 대화
    ═══════════════════════════════════════════════════ */
    {
        slug: 'coloring-conversation',
        category: '활동 가이드',
        tone: '#E29AA2',
        title: '색칠 한 장으로 시작하는 부모-아이 대화',
        subtitle: '색채심리와 10가지 감정 놀이',
        summary: '도안을 활용한 10가지 감정 놀이 방법을 소개해요.',
        readingTime: '7분 읽기',
        author: '마음마을 연구소',
        publishedAt: '2026-04-15',
        heroEmoji: '🎨',
        introQuote: {
            text: '아이가 고른 색은 그날의 마음을 비추는 거울입니다. 평가하지 말고, 그저 함께 바라봐 주세요.',
            source: '미술심리상담사 안혜용',
        },
        blocks: [
            { type: 'lead', text: '"오늘 어땠어?"라고 물어도 "그냥"이라는 답만 돌아오는 날, 색칠 한 장이 대화의 문을 열어줍니다. 색은 감정의 또 다른 이름이고, 도안은 안전한 대화 공간이에요. 이 글에서는 색채심리의 기초부터 가정에서 바로 해볼 수 있는 10가지 감정 놀이까지 소개합니다.' },

            { type: 'heading', emoji: '🌈', text: '색이 말해주는 감정', subtitle: '색채심리의 기초' },
            { type: 'paragraph', text: '아이가 무의식적으로 고르는 색에는 그 순간의 마음이 담겨 있어요. 미술치료에서는 색 하나하나가 고유한 감정 언어를 가진다고 봅니다. 절대적 해석은 아니지만, 부모님이 아이의 마음을 들여다보는 작은 단서가 되어줍니다.' },
            { type: 'colorTherapy', intro: '색을 자주 사용하는 패턴을 관찰해 보세요. 단, 한 번의 선택으로 단정 짓지는 마세요.',
                colors: [
                    { name: '빨강', hex: '#E07A5F', emotions: '에너지·열정·분노·따뜻함', usage: '활기차고 자기주장이 강한 날 자주 등장. 강한 분노나 흥분 상태일 때도 사용.' },
                    { name: '파랑', hex: '#7BA7D9', emotions: '평온·차분함·슬픔·신뢰', usage: '마음을 가라앉히고 싶을 때, 또는 외로움을 느낄 때 자주 선택해요.' },
                    { name: '노랑', hex: '#F1C667', emotions: '기쁨·호기심·자신감·관심욕구', usage: '밝고 활동적인 기분일 때, 또는 관심을 받고 싶을 때 자주 사용해요.' },
                    { name: '초록', hex: '#7B9D67', emotions: '안정·성장·자연·균형', usage: '편안하고 안정된 상태. 회복하고 싶은 마음을 표현하기도 해요.' },
                    { name: '보라', hex: '#9D7FA9', emotions: '상상·신비·예민함·창의성', usage: '풍부한 상상력을 가진 아이가 자주 선택. 감수성이 예민한 시기에도 등장.' },
                    { name: '분홍', hex: '#E29AA2', emotions: '사랑·다정함·달콤함·보살핌', usage: '돌봄을 받고 싶거나 누군가에게 애정을 표현하고 싶을 때 사용해요.' },
                    { name: '검정', hex: '#4A3826', emotions: '강함·두려움·결단·보호', usage: '단호한 의지나 두려움을 표현. 너무 자주 단독 사용 시 관심 필요.' },
                ]},

            { type: 'callout', tone: 'rose', emoji: '⚠️', title: '주의할 점',
                text: '색의 의미를 단정해 진단하듯 말하지 마세요. "왜 검정만 칠해? 무슨 일 있어?"라는 질문은 아이를 위축시켜요. 대신 "이 색이 마음에 들었구나"처럼 호기심을 갖고 다가가세요.' },

            { type: 'divider' },

            { type: 'heading', emoji: '🖍️', text: '도구마다 다른 마음', subtitle: '매체별 특성과 활용 팁' },
            { type: 'paragraph', text: '같은 색이라도 어떤 도구로 칠하느냐에 따라 아이의 표현이 달라져요. 미술치료에서는 도구를 \'촉진 매체\'와 \'통제 매체\'로 나눠 적절히 활용합니다.' },
            { type: 'mediaTable', rows: [
                { medium: '크레용·크레파스', quality: '촉진 매체', effect: '감정 발산에 좋음. 손 힘에 따라 진하기가 달라져 표현이 자유로움.', tip: '에너지 넘치거나 답답한 날 좋아요.' },
                { medium: '색연필', quality: '통제 매체', effect: '섬세한 표현. 차분하게 집중하기 좋음.', tip: '진정이 필요한 날, 정밀한 도안에 추천.' },
                { medium: '사인펜·마커', quality: '중간', effect: '선명한 색감. 결과물이 또렷해 성취감을 줘요.', tip: '자존감 회복이 필요한 시기에 활용.' },
                { medium: '수채물감', quality: '촉진 매체', effect: '번지는 효과로 감정의 흐름 표현. 통제가 어려워 \'놓아주기\' 연습.', tip: '완벽주의 성향 아이에게 추천.' },
                { medium: '파스텔·분필', quality: '촉진 매체', effect: '부드러운 질감. 손가락으로 문지르며 촉각 자극.', tip: '감각 통합이 필요한 어린 아이에게.' },
            ]},

            { type: 'divider' },

            { type: 'heading', emoji: '💬', text: '10가지 감정 놀이', subtitle: '색칠을 마음 대화로 바꾸는 법' },
            { type: 'paragraph', text: '도안 한 장을 다 칠하기 전이나 후에, 아래 활동 중 하나만 골라 시도해 보세요. 모든 활동은 5분 안팎이면 충분합니다.' },
            { type: 'activity', emoji: '🌤️', title: '01. 마음 날씨 칠하기',
                goal: '오늘의 감정 인식', steps: [
                    '도안에 \'오늘 내 마음 날씨는?\'이라고 물어보세요.',
                    '맑음·흐림·비·천둥·무지개 등 자유롭게 표현하게 해요.',
                    '왜 그런 날씨인지 한 가지만 물어봐요.',
                ]},
            { type: 'activity', emoji: '🎭', title: '02. 캐릭터 감정 인터뷰',
                goal: '공감 능력 키우기', steps: [
                    '도안 속 캐릭터에게 "지금 기분이 어때?"라고 묻기.',
                    '아이가 캐릭터 입장에서 답하게 해요.',
                    '색을 칠하면서 그 감정을 표현해 보게 해요.',
                ]},
            { type: 'activity', emoji: '🌈', title: '03. 감정 색깔 사전 만들기',
                goal: '감정 어휘 확장', steps: [
                    '"행복이 색깔이라면 무슨 색일까?"라고 질문.',
                    '슬픔·화남·평온 등 감정마다 색을 정해요.',
                    '아이만의 \'감정 색깔 사전\'으로 정리해 두세요.',
                ]},
            { type: 'activity', emoji: '🪞', title: '04. 거울 색칠',
                goal: '서로의 감정 이해', steps: [
                    '같은 도안 두 장을 부모와 아이가 각자 칠해요.',
                    '서로의 색 선택을 비교해 보세요.',
                    '"왜 너는 이 색을 골랐어?" 묻기.',
                ]},
            { type: 'activity', emoji: '⏰', title: '05. 시간 여행 색칠',
                goal: '감정의 변화 인식', steps: [
                    '아침·점심·저녁의 마음을 한 도안에 나눠 표현.',
                    '시간마다 색이 어떻게 달라졌는지 관찰.',
                    '왜 그렇게 변했는지 이야기해 보세요.',
                ]},
            { type: 'activity', emoji: '🤐', title: '06. 침묵 색칠',
                goal: '집중과 자기조절', steps: [
                    '10분 동안 말없이 같이 색칠.',
                    '끝나고 서로의 작품을 바라봐요.',
                    '말 없는 시간이 주는 평화를 함께 느껴요.',
                ]},
            { type: 'activity', emoji: '🎁', title: '07. 마음 선물하기',
                goal: '관계 회복', steps: [
                    '\'누군가에게 주고 싶은 마음을 색으로\' 표현.',
                    '받는 사람을 떠올리며 칠해요.',
                    '완성 후 실제로 그 사람에게 보여주거나 선물하기.',
                ]},
            { type: 'activity', emoji: '🌪️', title: '08. 화 풀기 낙서',
                goal: '분노 발산', steps: [
                    '큰 종이에 마음껏 낙서하듯 색칠.',
                    '꾹꾹 눌러 칠해도 OK.',
                    '다 풀린 뒤 도안 위에 차분한 그림 그리기.',
                ]},
            { type: 'activity', emoji: '🌙', title: '09. 자기 전 마음 정리',
                goal: '하루 마무리·잠 잘 자기', steps: [
                    '잠들기 전 5분, 만다라 도안 한 장.',
                    '오늘 좋았던 일을 떠올리며 색칠.',
                    '하루를 따뜻하게 닫아주기.',
                ]},
            { type: 'activity', emoji: '🪴', title: '10. 우리 가족 색깔',
                goal: '가족 정체성·소속감', steps: [
                    '가족 구성원마다 어울리는 색 정하기.',
                    '한 도안에 모든 가족 색을 함께 칠해요.',
                    '\'우리 가족의 색깔\'을 함께 정의해 보세요.',
                ]},

            { type: 'divider' },

            { type: 'heading', emoji: '⚠️', text: '흔한 실수와 피하는 법' },
            { type: 'twoColumn',
                left: { title: '❌ 이렇게는 마세요', text: '"왜 그렇게 칠해?", "여기 밖으로 삐져나갔잖아", "이 색은 어울리지 않아." 평가하는 말은 표현의 자유를 닫아버려요.' },
                right: { title: '✅ 이렇게 해주세요', text: '"이 색을 골랐구나", "여기는 손이 많이 갔네", "재미있는 조합이네!" 관찰하고 호기심을 갖는 말이 안전한 표현 공간을 만들어요.' },
            },
        ],
        takeaways: [
            '색은 감정의 언어 — 아이가 고른 색을 평가 없이 바라봐 주세요.',
            '도구마다 효과가 달라요. 크레용은 발산, 색연필은 통제·집중에 좋아요.',
            '10가지 활동 중 하나만 5분만 시도해 보세요.',
            '"왜 그렇게 칠해?" 대신 "이 색을 골랐구나" 한마디면 충분해요.',
        ],
        cta: {
            title: '오늘 시도할 도안을 골라보세요',
            description: '7명의 캐릭터, 70여 종 도안 중 오늘의 마음에 맞는 한 장을.',
            href: '/coloring',
            buttonText: '🎨 도안 둘러보기',
        },
    },

    /* ═══════════════════════════════════════════════════
       3. 안전 수칙 — 미디어 약속
    ═══════════════════════════════════════════════════ */
    {
        slug: 'media-promise',
        category: '안전 수칙',
        tone: '#9CC4B8',
        title: '디지털 네이티브 세대를 위한 미디어 약속',
        subtitle: '가정에서 함께 지키는 3가지 미디어 원칙',
        summary: '가정에서 함께 지키는 3가지 미디어 원칙.',
        readingTime: '3분 읽기',
        author: '마음마을 연구소',
        publishedAt: '2026-04-08',
        heroEmoji: '🌿',
        introQuote: {
            text: '미디어를 끊는 것이 답이 아니에요. 함께 사용하는 약속이 답입니다.',
            source: '한국아동심리연구회',
        },
        blocks: [
            { type: 'lead', text: '태어날 때부터 스마트 기기를 손에 쥔 \'디지털 네이티브\' 세대. 무조건 막을 수도, 그렇다고 자유롭게 둘 수도 없어요. 핵심은 \'함께 지키는 약속\'입니다. 마음마을이 제안하는 가정 미디어 가이드를 소개합니다.' },

            { type: 'heading', emoji: '📱', text: '디지털 네이티브, 무엇이 다를까요?' },
            { type: 'paragraph', text: '2010년 이후 출생한 \'알파 세대\'는 영상 시청, 터치, 음성 명령이 자전거 타기처럼 자연스러운 첫 세대예요. 이들은 디지털과 아날로그를 분리해서 인식하지 않습니다. 그래서 부모 세대의 \'미디어 = 나쁜 것\'이라는 이분법은 더 이상 통하지 않아요.' },
            { type: 'callout', tone: 'sky', emoji: '💡', title: '관점 전환',
                text: '미디어를 \'얼마나 적게 보느냐\'에서 \'얼마나 잘 사용하느냐\'로 질문을 바꿔야 해요.' },

            { type: 'divider' },

            { type: 'heading', emoji: '🌳', text: '가정 미디어 약속 3원칙' },
            { type: 'steps', items: [
                {
                    step: '01', emoji: '⏰',
                    title: '함께 정하는 시간 약속',
                    text: '부모가 일방적으로 정하지 말고 아이와 같이 약속해요. "주중에는 30분, 주말에는 1시간." 시간을 정확히 알려주는 모래시계나 타이머를 활용하면 충돌이 줄어요. 약속한 시간이 끝나면 자연스럽게 색칠·산책 같은 오프라인 활동으로 전환합니다.',
                },
                {
                    step: '02', emoji: '👀',
                    title: '함께 보는 시청 약속',
                    text: '아이 혼자 보게 두지 말고 부모가 5분이라도 같이 봐요. "이 캐릭터는 왜 이렇게 행동했을까?" 한 가지만 물어보세요. 일방적 시청이 \'함께 생각하는 시간\'으로 바뀝니다. 폭력적·자극적 콘텐츠는 명확히 \'안 돼\'라고 알려주세요.',
                },
                {
                    step: '03', emoji: '🛏️',
                    title: '함께 멈추는 공간 약속',
                    text: '식탁과 침실은 미디어 프리 존으로 정해요. 잠들기 1시간 전에는 화면을 끕니다. 블루라이트는 멜라토닌 분비를 방해해 수면의 질을 떨어뜨려요. 자기 전 시간은 책 읽기, 색칠하기, 대화하기로 채워보세요.',
                },
            ]},

            { type: 'divider' },

            { type: 'heading', emoji: '📊', text: '연령별 권장 가이드', subtitle: 'WHO·미국소아과학회 기준' },
            { type: 'list', items: [
                { title: '18개월 이하', text: '영상 통화 외에는 화면 노출 금지', emoji: '👶' },
                { title: '18~24개월', text: '교육 콘텐츠 중심, 부모와 함께만 시청', emoji: '🧒' },
                { title: '2~5세', text: '하루 1시간 이내, 양질의 콘텐츠로 제한', emoji: '🎒' },
                { title: '6~12세', text: '하루 1~2시간, 일관된 시간 약속', emoji: '🎨' },
                { title: '13세 이상', text: '자기조절 연습, 수면·학업·운동 우선 원칙 유지', emoji: '🧑' },
            ]},

            { type: 'tipBox', tone: 'sage', emoji: '🌿', title: '부모의 자세',
                lines: [
                    '아이 앞에서 부모도 스마트폰 사용을 줄여요. 모범보다 강한 교육은 없어요.',
                    '미디어를 보상이나 처벌 도구로 쓰지 마세요. ("말 잘 들으면 영상 보여줄게" ❌)',
                    '대체 활동을 함께 즐겨주세요. 색칠, 산책, 보드게임처럼.',
                    '약속을 어기는 날도 있어요. 비난 대신 다시 약속을 세워보세요.',
                ]},

            { type: 'divider' },

            { type: 'heading', emoji: '📝', text: '우리 가족 약속 만들기', subtitle: '오늘 함께 적어보세요' },
            { type: 'paragraph', text: '아래 항목을 가족이 둘러앉아 함께 채워보세요. 종이에 적어 냉장고에 붙여두면 모두가 기억하기 좋아요.' },
            { type: 'callout', tone: 'lav', emoji: '✏️', title: '우리 가족의 미디어 약속',
                text: '① 평일 ___분 / 주말 ___분\n② 미디어 프리 존: ___ , ___\n③ 잠들기 ___분 전부터는 화면 끄기\n④ 함께 보는 콘텐츠: ___\n⑤ 약속을 어겼을 때 우리만의 신호: ___' },
        ],
        takeaways: [
            '디지털 네이티브 시대, \'얼마나 잘 쓰느냐\'가 핵심이에요.',
            '시간·시청·공간 3가지 약속만 지켜도 충분해요.',
            'WHO 기준 2~5세는 하루 1시간 이내가 적절해요.',
            '부모의 모범이 가장 강력한 교육입니다.',
        ],
        cta: {
            title: '미디어 시간을 색칠 시간으로',
            description: '화면을 끄고 마음마을 도안 한 장으로 마음의 시간을 가져보세요.',
            href: '/coloring',
            buttonText: '🎨 색칠로 마음 정리하기',
        },
    },
];

export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find(a => a.slug === slug);
}

export function getArticlesByCategory(category: Article['category']): Article[] {
    return articles.filter(a => a.category === category);
}
