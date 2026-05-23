// data/cities.ts

export interface City {
    slug: string;
    name: string;
    title: string;
    description: string;
    image: string;
    bestTime: string;
    topAttractions: string[];
    localFood: string[];
    tips: string[];
}

export const cities: City[] = [
    {
        slug: "tokyo",
        name: "Tokyo",
        title: "Modern Metropolis with Ancient Temples",
        description: "Tokyo is Japan's bustling capital, where futuristic skyscrapers meet traditional temples. From Shibuya Crossing to Senso-ji Temple, this city never sleeps and always surprises.",
        image: "🏙️",
        bestTime: "March-May (Cherry blossoms) & September-November (Cool weather)",
        topAttractions: ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Tower", "Shinjuku Gyoen", "Akihabara", "Tsukiji Market"],
        localFood: ["Sushi", "Ramen", "Monjayaki", "Tempura", "Unagi"],
        tips: ["Get a Suica card", "Avoid rush hour 7:30-9:30 AM", "Learn basic Japanese phrases"]
    },
    {
        slug: "osaka",
        name: "Osaka",
        title: "Street Food and Entertainment Capital",
        description: "Osaka is known for its friendly locals, amazing street food, and vibrant nightlife. Don't miss Dotonbori's neon lights and Osaka Castle.",
        image: "🏯",
        bestTime: "October-November (Autumn foliage) & March-April (Cherry blossoms)",
        topAttractions: ["Dotonbori", "Osaka Castle", "Universal Studios Japan", "Shinsekai", "Kaiyukan Aquarium"],
        localFood: ["Takoyaki", "Okonomiyaki", "Kushikatsu", "Kitsune Udon"],
        tips: ["Buy Osaka Amazing Pass", "Street food is safe and delicious", "Visit Dotonbori at night"]
    },
    {
        slug: "kyoto",
        name: "Kyoto",
        title: "Traditional Culture and Temples",
        description: "Kyoto is Japan's cultural heart with thousands of temples, shrines, and traditional tea houses. Experience geisha culture and stunning bamboo groves.",
        image: "⛩️",
        bestTime: "March-April (Cherry blossoms) & October-November (Fall colors)",
        topAttractions: ["Fushimi Inari", "Kinkaku-ji", "Arashiyama Bamboo Grove", "Gion District", "Kiyomizu-dera"],
        localFood: ["Kaiseki", "Yudofu", "Matcha Sweets", "Yatsuhashi"],
        tips: ["Book temples in advance", "Wear comfortable shoes", "Use bus pass for temples"]
    },
    {
        slug: "sapporo",
        name: "Sapporo",
        title: "Snow Festival and Nature",
        description: "Sapporo is famous for its annual Snow Festival, delicious ramen, and beautiful nature. A perfect destination for winter lovers.",
        image: "❄️",
        bestTime: "February (Snow Festival) & July-August (Summer festivals)",
        topAttractions: ["Odori Park", "Sapporo Beer Museum", "Mt. Moiwa", "Shiroi Koibito Park"],
        localFood: ["Sapporo Ramen", "Soup Curry", "Genghis Khan (grilled lamb)", "Crab"],
        tips: ["Dress warm in winter", "Try miso ramen", "Snow Festival books early"]
    },
    {
        slug: "fukuoka",
        name: "Fukuoka",
        title: "Tropical Beaches and Unique Culture",
        description: "Fukuoka offers beautiful beaches, unique yatai street stalls, and ancient temples. A hidden gem in southern Japan.",
        image: "🏖️",
        bestTime: "May-June (Wisteria blooms) & September-October (Mild weather)",
        topAttractions: ["Ohori Park", "Fukuoka Tower", "Tocho-ji Temple", "Yatai Stalls", "Canal City"],
        localFood: ["Tonkotsu Ramen", "Mentaiko", "Motsunabe", "Hakata Gyoza"],
        tips: ["Try yatai street food at night", "Visit during Dontaku festival", "Day trip to Nokonoshima Island"]
    }
];

export default cities;