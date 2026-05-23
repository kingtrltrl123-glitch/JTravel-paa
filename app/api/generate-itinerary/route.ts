import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { city, days } = await request.json();

        // ----- သတိထား -----
        // ဒီနေရာမှာ GEMINI_API_KEY က .env.local ထဲမှာ ရှိရမယ်
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('GEMINI_API_KEY not found in env');
            return NextResponse.json({ error: 'Server misconfigured: missing API key' }, { status: 500 });
        }

        // ----- မှန်ကန်တဲ့ model name (May 2026) -----
        const model = 'gemini-2.0-flash-exp';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        // ----- prompt ကို ရှင်းရှင်းထား (JSON သေချာထွက်အောင်)-----
        const prompt = `Create a ${days}-day travel itinerary for ${city}, Japan.
Return ONLY valid JSON. No extra text, no markdown.
Format:;
{
  "dailyPlans": [
    {
      "day": 1,
      "title": "string",
      "activities": ["string"],
      "trainTips": "string"
    }
  ]
}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    // responseMimeType ကို မထည့်တာ ပိုလုံခြုံတယ် (တစ်ခါတလေ error တတ်)
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error:', response.status, errorText);
            return NextResponse.json({ error: `Gemini API error: ${response.status}` }, { status: response.status });
        }

        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!textResponse) {
            console.error('Unexpected Gemini response:', JSON.stringify(data));
            throw new Error('Invalid response structure from Gemini');
        }

        // JSON ကို သေချာ clean လုပ်
        const cleanJson = textResponse
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .replace(/[\r\n]+/g, ' ')
            .trim();

        const itinerary = JSON.parse(cleanJson);

        return NextResponse.json(itinerary);
    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json({ error: 'Failed to generate itinerary' }, { status: 500 });
    }
}