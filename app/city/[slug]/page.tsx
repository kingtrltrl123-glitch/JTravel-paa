"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const cityData: Record<string, any> = {
    tokyo: {
        name: "Tokyo",
        description: {
            en: "Japan's bustling capital, where ultramodern meets tradition",
            ja: "超近代的な都市と伝統が交差する日本の首都",
            my: "ခေတ်မီနည်းပညာနှင့် ရိုးရာဓလေ့ ဆုံဆည်းရာ ဂျပန်နိုင်ငံ၏ မြို့တော်",
            zh: "日本繁华的首都，现代与传统交汇",
            ko: "초현대와 전통이 교차하는 일본의 수도"
        },
        bestTime: {
            en: "March-May (Cherry Blossoms) or September-November",
            ja: "3月〜5月（桜）または9月〜11月",
            my: "မတ်-မေ (ချယ်ရီပန်း) သို့မဟုတ် စက်တင်ဘာ-နိုဝင်ဘာ",
            zh: "3月至5月（樱花）或9月至11月",
            ko: "3월~5월 (벚꽃) 또는 9월~11월"
        },
        topAttractions: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Skytree", "Shinjuku Gyoen", "TeamLab Planets"],
        localFood: ["Sushi", "Ramen", "Monjayaki", "Tempura", "Matcha"],
    },
    osaka: {
        name: "Osaka",
        description: {
            en: "Japan's kitchen - famous for street food and entertainment",
            ja: "日本の台所 - 食と娯楽の街",
            my: "ဂျပန်၏ မီးဖိုချောင် - လမ်းဘေးအစားအစာနှင့် ဖျော်ဖြေရေးဌာန",
            zh: "日本的厨房 - 街头美食和娱乐之都",
            ko: "일본의 부엌 - 길거리 음식과 엔터테인먼트의 도시"
        },
        bestTime: {
            en: "October-November (Autumn) or March-April",
            ja: "10月〜11月（紅葉）または3月〜4月",
            my: "အောက်တိုဘာ-နိုဝင်ဘာ သို့မဟုတ် မတ်-ဧပြီ",
            zh: "10月至11月（秋天）或3月至4月",
            ko: "10월~11월 (가을) 또는 3월~4월"
        },
        topAttractions: ["Dotonbori", "Osaka Castle", "Universal Studios", "Kaiyukan Aquarium", "Shinsekai"],
        localFood: ["Takoyaki", "Okonomiyaki", "Kushikatsu", "Niku Udon"],
    },
    kyoto: {
        name: "Kyoto",
        description: {
            en: "Ancient capital with thousands of temples and shrines",
            ja: "数千の寺社がある古都",
            my: "ဘုရားကျောင်းပေါင်းထောင်ချီသော ရှေးဟောင်းမြို့တော်",
            zh: "拥有数千座寺庙和神社的古都",
            ko: "수천 개의 사원과 신사가 있는 고대 수도"
        },
        bestTime: {
            en: "March-April (Sakura) or November (Fall Colors)",
            ja: "3月〜4月（桜）または11月（紅葉）",
            my: "မတ်-ဧပြီ (ဆာကူရာ) သို့မဟုတ် နိုဝင်ဘာ (ဆောင်းရောင်)",
            zh: "3月至4月（樱花）或11月（红叶）",
            ko: "3월~4월 (벚꽃) 또는 11월 (단풍)"
        },
        topAttractions: ["Fushimi Inari", "Kinkaku-ji", "Arashiyama Bamboo", "Gion District", "Kiyomizu-dera"],
        localFood: ["Kaiseki", "Yudofu", "Matcha Sweets", "Yatsuhashi"],
    },
    hokkaido: {
        name: "Hokkaido",
        description: {
            en: "Northern island known for snow festival and nature",
            ja: "雪祭りと自然で有名な北の島",
            my: "နှင်းပွဲနှင့် သဘာဝတရားကြောင့် နာမည်ကြီးသော မြောက်ဘက်ကျွန်း",
            zh: "以雪节和自然风光著称的北方岛屿",
            ko: "눈 축제와 자연으로 유명한 북쪽 섬"
        },
        bestTime: {
            en: "December-February (Snow) or July-August (Summer)",
            ja: "12月〜2月（雪）または7月〜8月（夏）",
            my: "ဒီဇင်ဘာ-ဖေဖော်ဝါရီ (နှင်း) သို့မဟုတ် ဇူလိုင်-သြဂုတ် (နွေ)",
            zh: "12月至2月（雪）或7月至8月（夏季）",
            ko: "12월~2월 (눈) 또는 7월~8월 (여름)"
        },
        topAttractions: ["Sapporo Snow Festival", "Shiroi Koibito Park", "Otaru Canal", "Lake Toya"],
        localFood: ["Soup Curry", "Crab", "Corn Butter Ramen", "Soft Cream"],
    },
    okinawa: {
        name: "Okinawa",
        description: {
            en: "Tropical paradise with unique Ryukyu culture",
            ja: "琉球文化が息づく南国の楽園",
            my: "ထူးခြားသော Ryukyu ယဉ်ကျေးမှုနှင့် အပူပိုင်းဒေသ သဘာဝကောင်းကင်ဘုံ",
            zh: "拥有独特琉球文化的热带天堂",
            ko: "독특한 류큐 문화가 있는 열대 낙원"
        },
        bestTime: {
            en: "April-October (Beach weather)",
            ja: "4月〜10月（ビーチシーズン）",
            my: "ဧပြီ-အောက်တိုဘာ (ကမ်းခြေရာသီ)",
            zh: "4月至10月（海滩季节）",
            ko: "4월~10월 (해변 날씨)"
        },
        topAttractions: ["Shuri Castle", "Churaumi Aquarium", "Kokusai Street", "Cape Manza"],
        localFood: ["Goya Champuru", "Okinawa Soba", "Taco Rice", "Sata Andagi"],
    },
    hiroshima: {
        name: "Hiroshima",
        description: {
            en: "City of peace and famous okonomiyaki",
            ja: "平和の街と広島風お好み焼き",
            my: "ငြိမ်းချမ်းရေးမြို့တော်နှင့် နာမည်ကြီး okonomiyaki",
            zh: "和平之城与著名广岛风味煎饼",
            ko: "평화의 도시와 유명한 히로시마 오코노미야키"
        },
        bestTime: {
            en: "March-May or September-November",
            ja: "3月〜5月または9月〜11月",
            my: "မတ်-မေ သို့မဟုတ် စက်တင်ဘာ-နိုဝင်ဘာ",
            zh: "3月至5月或9月至11月",
            ko: "3월~5월 또는 9월~11월"
        },
        topAttractions: ["Peace Memorial Park", "Miyajima Island", "Itsukushima Shrine", "Hiroshima Castle"],
        localFood: ["Hiroshima Okonomiyaki", "Oysters", "Momiji Manju", "Anago Meshi"],
    },
};

interface PageProps {
    params: Promise<{ slug: string }> | { slug: string };
}

export default function CityPage({ params }: PageProps) {
    const { slug } = use(params as Promise<{ slug: string }>);
    const { language } = useLanguage();

    if (!slug) return <div style={{ padding: "40px", textAlign: "center" }}><h1>Loading...</h1></div>;

    const city = cityData[slug.toLowerCase()];
    if (!city) notFound();

    const labels: Record<string, any> = {
        back: { en: "Back to Home", ja: "戻る", my: "နောက်သို့", zh: "返回首页", ko: "홈으로" },
        bestTime: { en: "Best Time to Visit", ja: "ベストシーズン", my: "သွားရန် အကောင်းဆုံးအချိန်", zh: "最佳旅游时间", ko: "최적 방문 시기" },
        attractions: { en: "Top Attractions", ja: "観光スポット", my: "အကောင်းဆုံး နေရာများ", zh: "热门景点", ko: "주요 관광지" },
        food: { en: "Local Food", ja: "ご当地グルメ", my: "ဒေသထွက် အစားအစာများ", zh: "当地美食", ko: "현지 음식" },
    };

    const l = (key: string) => labels[key][language] || labels[key]["en"];

    return (
        <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
            <div style={{ background: "white", padding: "15px 20px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
                <Link href="/" style={{ textDecoration: "none", color: "#667eea", fontWeight: "bold" }}>
                    ← {l("back")}
                </Link>
            </div>

            <div style={{ background: "linear-gradient(135deg, #667eea, #764ba2)", color: "white", padding: "60px 20px", textAlign: "center" }}>
                <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>{city.name}</h1>
                <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>{city.description[language]}</p>
            </div>

            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
                <div style={{ background: "white", borderRadius: "15px", padding: "20px", marginBottom: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                    <h2>📅 {l("bestTime")}</h2>
                    <p>{city.bestTime[language]}</p>
                </div>

                <div style={{ background: "white", borderRadius: "15px", padding: "20px", marginBottom: "30px" }}>
                    <h2>🏯 {l("attractions")}</h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "15px" }}>
                        {city.topAttractions.map((attraction: string, i: number) => (
                            <span key={i} style={{ background: "#667eea", color: "white", padding: "8px 16px", borderRadius: "20px" }}>{attraction}</span>
                        ))}
                    </div>
                </div>
                <div style={{ background: "white", borderRadius: "15px", padding: "20px" }}>
                    <h2>🍜 {l("food")}</h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "15px" }}>
                        {city.localFood.map((food: string, i: number) => (
                            <span key={i} style={{ background: "#ff6b6b", color: "white", padding: "8px 16px", borderRadius: "20px" }}>{food}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}