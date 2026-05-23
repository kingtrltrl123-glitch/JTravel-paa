// lib/trainApi.ts

const EKISPERT_API_KEY = 'YOUR_RAPIDAPI_KEY_HERE';
const BASE_URL = 'https://ekispert.p.rapidapi.com/v1/json';

export async function searchMultiModalRoute(from: string, to: string) {
    const url = BASE_URL + '/search/course/light?from=' + encodeURIComponent(from) + '&to=' + encodeURIComponent(to);

    console.log('Calling URL:', url);

    try {
        const response = await fetch(url, {
            headers: {
                'X-RapidAPI-Key': EKISPERT_API_KEY,
                'X-RapidAPI-Host': 'ekispert.p.rapidapi.com'
            }
        });

        const data = await response.json();
        console.log('API Response:', data);

        return {
            success: true,
            routeUrl: data.ResultSet?.ResourceURI ?? null,
            summary: {
                time: data.ResultSet?.Course?.[0]?.Summary?.Time ?? 'N/A',
                fare: data.ResultSet?.Course?.[0]?.Summary?.Fare ?? 'N/A',
                transferCount: data.ResultSet?.Course?.[0]?.Summary?.TransferCount ?? 0
            },
            from: from,
            to: to,
            provider: 'ekispert'
        };
    } catch (error) {
        console.error('API Error:', error);
        return {
            success: false,
            error: error,
            from: from,
            to: to,
            provider: 'ekispert'
        };
    }
}

export async function searchStations(keyword: string) {
    const url = BASE_URL + '/station/light?name=' + encodeURIComponent(keyword);

    try {
        const response = await fetch(url, {
            headers: {
                'X-RapidAPI-Key': EKISPERT_API_KEY,
                'X-RapidAPI-Host': 'ekispert.p.rapidapi.com'
            }
        });

        const data = await response.json();

        return {
            success: true,
            stations: data.ResultSet?.Point ?? [],
            provider: 'ekispert'
        };
    } catch (error) {
        console.error('API Error:', error);
        return {
            success: false,
            error: error,
            provider: 'ekispert'
        };
    }
}