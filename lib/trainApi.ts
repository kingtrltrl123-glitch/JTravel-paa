// lib/trainApi.ts - Working version (API key မရှိရင် mock data သုံးမယ်)

interface RouteResult {
    success: boolean;
    routeUrl: string;
    summary: {
        time: string;
        fare: string;
        transferCount: number;
    };
    from?: string;
    to?: string;
    provider?: string;
}

interface StationResult {
    success: boolean;
    stations: {
        name: string;
        line: string;
        lat: number;
        lon: number;
    }[];
    provider?: string;
}

// Mock data functions (API key မရသေးရင် ဒါကို သုံးပါ)
export async function searchMultiModalRoute(from: string, to: string): Promise<RouteResult> {
    // Real API အတွက် နောက်မှ ပြောင်းမယ်
    return {
        success: true,
        routeUrl: `https://www.google.com/maps/dir/${encodeURIComponent(from)}/${encodeURIComponent(to)}`,
        summary: {
            time: "~2-3 hours",
            fare: "~10,000-15,000 yen",
            transferCount: 1
        },
        from: from,
        to: to,
        provider: 'mock'
    };
}

export async function searchStations(keyword: string): Promise<StationResult> {
    return {
        success: true,
        stations: [
            { name: `${keyword} Station`, line: "JR Line", lat: 35.6895, lon: 139.6917 },
            { name: `${keyword} Central`, line: "Metro Line", lat: 35.6895, lon: 139.6917 }
        ],
        provider: 'mock'
    };
}