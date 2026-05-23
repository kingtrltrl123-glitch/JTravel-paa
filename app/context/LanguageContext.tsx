"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'my' | 'jp' | 'ko' | 'zh';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
    // Navbar
    'app.title': { en: 'JTravel', my: 'JTravel', jp: 'JTravel', ko: 'JTravel', zh: 'JTravel' },
    'nav.home': { en: 'Home', my: 'ပင်မ', jp: 'ホーム', ko: '홈', zh: '首页' },
    'nav.train': { en: 'Train', my: 'ရထား', jp: '電車', ko: '기차', zh: '火车' },
    'nav.food': { en: 'Food', my: 'အစားအစာ', jp: '食べ物', ko: '음식', zh: '食物' },

    // Home Page
    'home.search_placeholder': { en: 'Search a city...', my: 'မြို့ရှာရန်...', jp: '都市を検索...', ko: '도시 검색...', zh: '搜索城市...' },
    'home.search_btn': { en: 'Search', my: 'ရှာမည်', jp: '検索', ko: '검색', zh: '搜索' },
    'home.popular': { en: 'Popular Destinations', my: 'လူကြိုက်များသော နေရာများ', jp: '人気の観光地', ko: '인기 여행지', zh: '热门目的地' },
    'home.train': { en: 'Train Crowdedness', my: 'ရထားလူပြည့်မှု', jp: '電車の混雑状況', ko: '기차 혼잡도', zh: '火车拥挤度' },
    'home.train_desc': { en: 'Know before you ride', my: 'မစီးခင် သိထားပါ', jp: '乗る前に確認', ko: '타기 전에 확인', zh: '乘车前了解' },
    'home.food': { en: 'Food Recommendations', my: 'အစားအသောက် အကြံပြုချက်များ', jp: '食べ物のおすすめ', ko: '음식 추천', zh: '美食推荐' },
    'home.food_desc': { en: 'Must-eat local dishes', my: 'စားရမယ့် ဒေသအစားအစာများ', jp: '地元の必須グルメ', ko: '먹어봐야 할 현지 음식', zh: '必吃的当地美食' },

    // Train Page
    'train.title': { en: 'Train Route Finder', my: 'ရထားလမ်းရှာရန်', jp: '電車ルート検索', ko: '기차 노선 찾기', zh: '火车路线查找' },
    'train.subtitle': { en: 'Find routes across Japan', my: 'ဂျပန်တစ်နိုင်ငံလုံး လမ်းကြောင်းရှာရန်', jp: '日本全国のルートを検索', ko: '일본 전역 노선 찾기', zh: '查找日本全境的路线' },
    'train.from': { en: 'From Station', my: 'မှ', jp: '出発駅', ko: '출발역', zh: '出发站' },
    'train.to': { en: 'To Station', my: 'သို့', jp: '到着駅', ko: '도착역', zh: '到达站' },
    'train.search': { en: 'Search', my: 'ရှာမည်', jp: '検索', ko: '검색', zh: '搜索' },
    'train.loading': { en: 'Loading...', my: 'ဖွင့်နေသည်...', jp: '読み込み中...', ko: '불러오는 중...', zh: '加载中...' },
    'train.duration': { en: 'Duration', my: 'ကြာချိန်', jp: '所要時間', ko: '소요 시간', zh: '所需时间' },
    'train.fare': { en: 'Fare', my: 'ခရီးစရိတ်', jp: '運賃', ko: '요금', zh: '票价' },
    'train.transfers': { en: 'Transfers', my: 'အကြိမ်ရေ', jp: '乗り換え', ko: '환승', zh: '换乘次数' },

    // Food Page
    'food.title': { en: 'Food Recommendations', my: 'အစားအသောက် အကြံပြုချက်များ', jp: '食べ物のおすすめ', ko: '음식 추천', zh: '美食推荐' },
    'food.filter': { en: 'Filter by city', my: 'မြို့အလိုက် စစ်ရန်', jp: '都市でフィルター', ko: '도시별 필터', zh: '按城市筛选' },
    'food.price': { en: 'Price', my: 'စျေးနှုန်း', jp: '価格', ko: '가격', zh: '价格' },
    'food.restaurant': { en: 'Restaurant', my: 'စားသောက်ဆိုင်', jp: 'レストラン', ko: '레스토랑', zh: '餐厅' },

    // City Page
    'city.bestTime': { en: 'Best Time to Visit', my: 'လည်လည်ရန် အကောင်းဆုံးအချိန်', jp: 'ベストシーズン', ko: '최적의 방문 시기', zh: '最佳旅游时间' },
    'city.attractions': { en: 'Top Attractions', my: 'ထင်ရှားသော နေရာများ', jp: '主な観光スポット', ko: '주요 명소', zh: '主要景点' },
    'city.food': { en: 'Local Food', my: 'ဒေသအစားအစာ', jp: '地元の食べ物', ko: '현지 음식', zh: '当地美食' },
    'city.itinerary': { en: 'AI Itinerary', my: 'AI ခရီးစဉ်', jp: 'AI旅程', ko: 'AI 일정', zh: 'AI行程' },
    'city.back': { en: 'Back to Home', my: 'နောက်သို့', jp: '戻る', ko: '뒤로', zh: '返回' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        if (translations[key] && translations[key][language]) {
            return translations[key][language];
        }
        return key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}