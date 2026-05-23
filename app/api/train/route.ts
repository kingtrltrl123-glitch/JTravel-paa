import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { from, to, time } = await request.json();

    const crowdedHours = [7, 8, 9, 17, 18, 19];
    const hour = parseInt(time.split(':')[0]);
    const isCrowded = crowdedHours.includes(hour);

    return NextResponse.json({
        from,
        to,
        duration: Math.floor(Math.random() * 30) + 10 + " minutes",
        crowdedness: isCrowded ? "VERY CROWDED - Avoid if possible" : "NORMAL - Good to go",
        tip: isCrowded ? "Try traveling at 10am or 2pm" : "Enjoy your ride",
        estimatedCost: Math.floor(Math.random() * 500) + 150 + " yen"
    });
}