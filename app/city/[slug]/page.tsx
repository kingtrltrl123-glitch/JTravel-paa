// app/city/[slug]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";

// City data
const cityData: Record<string, any> = {
    tokyo: {
        name: "Tokyo",
        description: "Japan's bustling capital, where ultramodern meets tradition",
        bestTime: "March-May (Cherry Blossoms) or September-November",
        topAttractions: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Skytree", "Shinjuku Gyoen", "TeamLab Planets"],
        localFood: ["Sushi", "Ramen", "Monjayaki", "Tempura", "Matcha"],
    },
    osaka: {
        name: "Osaka",
        description: "Japan's kitchen - famous for street food and entertainment",
        bestTime: "October-November (Autumn) or March-April",
        topAttractions: ["Dotonbori", "Osaka Castle", "Universal Studios", "Kaiyukan Aquarium", "Shinsekai"],
        localFood: ["Takoyaki", "Okonomiyaki", "Kushikatsu", "Niku Udon"],
    },
    kyoto: {
        name: "Kyoto",
        description: "Ancient capital with thousands of temples and shrines",
        bestTime: "March-April (Sakura) or November (Fall Colors)",
        topAttractions: ["Fushimi Inari", "Kinkaku-ji", "Arashiyama Bamboo", "Gion District", "Kiyomizu-dera"],
        localFood: ["Kaiseki", "Yudofu", "Matcha Sweets", "Yatsuhashi"],
    },
    hokkaido: {
        name: "Hokkaido",
        description: "Northern island known for snow festival and nature",
        bestTime: "December-February (Snow) or July-August (Summer)",
        topAttractions: ["Sapporo Snow Festival", "Shiroi Koibito Park", "Otaru Canal", "Lake Toya"],
        localFood: ["Soup Curry", "Crab", "Corn Butter Ramen", "Soft Cream"],
    },
    okinawa: {
        name: "Okinawa",
        description: "Tropical paradise with unique Ryukyu culture",
        bestTime: "April-October (Beach weather)",
        topAttractions: ["Shuri Castle", "Churaumi Aquarium", "Kokusai Street", "Cape Manza"],
        localFood: ["Goya Champuru", "Okinawa Soba", "Taco Rice", "Sata Andagi"],
    },
    hiroshima: {
        name: "Hiroshima",
        description: "City of peace and famous okonomiyaki",
        bestTime: "March-May or September-November",
        topAttractions: ["Peace Memorial Park", "Miyajima Island", "Itsukushima Shrine", "Hiroshima Castle"],
        localFood: ["Hiroshima Okonomiyaki", "Oysters", "Momiji Manju", "Anago Meshi"],
    },
};

// ✅ အဓိက အရေးကြီးတဲ့အပိုင်း - params ကို ဒီအတိုင်းသုံးပါ
interface PageProps {
    params: Promise<{ slug: string }> | { slug: string };
}

export default async function CityPage({ params }: PageProps) {
    // params က Promise ဖြစ်နေရင် await လုပ်ပါ
    const { slug } = await params;

    // slug ကို သေချာစစ်ပါ
    if (!slug) {
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                <h1>Loading...</h1>
            </div>
        );
    }

    const city = cityData[slug.toLowerCase()];

    if (!city) {
        notFound();
    }

    return (
        <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
            {/* Header */}
            <div style={{ background: "white", padding: "15px 20px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
                <Link href="/" style={{ textDecoration: "none", color: "#667eea", fontWeight: "bold" }}>
                    ← Back to Home
                </Link>
            </div>

            {/* Hero */}
            <div style={{ background: "linear-gradient(135deg, #667eea, #764ba2)", color: "white", padding: "60px 20px", textAlign: "center" }}>
                <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>{city.name}</h1>
                <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>{city.description}</p>
            </div>

            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
                [5/23/2026 6:55 PM] Zaw Linn Naing: {/* Best Time */}
                <div style={{ background: "white", borderRadius: "15px", padding: "20px", marginBottom: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                    <h2>📅 Best Time to Visit</h2>
                    <p>{city.bestTime}</p>
                </div>

                {/* Top Attractions */}
                <div style={{ background: "white", borderRadius: "15px", padding: "20px", marginBottom: "30px" }}>
                    <h2>🏯 Top Attractions</h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "15px" }}>
                        {city.topAttractions.map((attraction: string, i: number) => (
                            <span key={i} style={{ background: "#667eea", color: "white", padding: "8px 16px", borderRadius: "20px" }}>{attraction}</span>
                        ))}
                    </div>
                </div>

                {/* Local Food */}
                <div style={{ background: "white", borderRadius: "15px", padding: "20px" }}>
                    <h2>🍜 Local Food</h2>
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