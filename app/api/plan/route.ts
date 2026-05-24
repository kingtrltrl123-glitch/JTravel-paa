import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { destination, days, budget, travelStyle, language } = body;

        const apiKey = process.env.GROQ_API_KEY;

        const langInstruction = language === 'my' ? 'Respond in Burmese language.' :
            language === 'ja' ? 'Respond in Japanese language.' :
                language === 'zh' ? 'Respond in Chinese language.' :
                    language === 'ko' ? 'Respond in Korean language.' :
                        'Respond in English language.';

        const prompt = "You are a Japan travel expert. Create a detailed " + days + "-day travel itinerary for " + destination + ", Japan. Budget level: " + budget + ". Travel style: " + travelStyle + ". " + langInstruction + " Return ONLY a valid JSON object with NO markdown, NO backticks, NO extra text. Use this exact structure: {\"overview\": \"2-3 sentence trip overview\", \"dailyPlans\": [{\"day\": 1, \"title\": \"Day theme title\", \"activities\": [\"Morning: activity\", \"Afternoon: activity\", \"Evening: activity\"], \"trainTips\": \"train tip\", \"foodRecommendation\": \"food tip\", \"estimatedCost\": \"cost\"}], \"budgetEstimate\": \"total budget\", \"bestTimeToTravel\": \"best season\", \"packingTips\": \"packing tips\", \"emergencyInfo\": \"emergency info\"}";

        const res = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apiKey,
                },
                body: JSON.stringify({
                    model: "llama3-8b-8192",
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7,
                    max_tokens: 2048,
                })
            }
        );

        const data = await res.json();
        console.log("Groq response:", JSON.stringify(data).substring(0, 200));

        if (!data.choices || data.choices.length === 0) {
            throw new Error("No response from Groq");
        }

        const text = data.choices[0].message.content || "";
        const clean = text.replace(/`json|```/g, "").trim();
        const parsed = JSON.parse(clean);

        return NextResponse.json(parsed);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Failed to generate plan. Please try again." }, { status: 500 });
    }
}
