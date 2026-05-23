import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const destination = body.destination;
        const days = body.days;
        const budget = body.budget;

        const dailyPlans = [];
        for (let i = 1; i <= days; i++) {
            dailyPlans.push({
                day: i,
                title: i === 1 ? "Arrival and Exploration" : i === days ? "Departure Day" : "Culture and Sights",
                activities: i === 1
                    ? ["Check into hotel", "Visit city center", "Try local dinner"]
                    : i === days
                        ? ["Last sightseeing", "Shopping", "Head to airport"]
                        : ["Visit main attractions", "Local experience", "Enjoy evening"],
                trainTips: "Avoid 8-9am and 6-7pm rush hours",
                foodRecommendation: "Try local specialty restaurant"
            });
        }

        const responseData = {
            overview: "Your " + days + "-day trip to " + destination + " is ready.",
            dailyPlans: dailyPlans,
            budgetEstimate: budget === "budget" ? "15,000-20,000 yen/day" : budget === "luxury" ? "50,000+ yen/day" : "25,000-35,000 yen/day",
            bestTimeToTravel: "March-May or September-November"
        };

        return NextResponse.json(responseData);
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}