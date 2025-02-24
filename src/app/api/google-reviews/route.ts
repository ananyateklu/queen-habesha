import { NextResponse } from 'next/server';

interface GoogleReview {
    time: number;
    author_name: string;
    rating: number;
    relative_time_description: string;
    text: string;
    profile_photo_url: string;
}

export async function GET() {
    try {
        const PLACE_ID = process.env.GOOGLE_PLACE_ID;
        const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

        if (!PLACE_ID || !API_KEY) {
            console.error('Missing environment variables:', {
                hasPlaceId: !!PLACE_ID,
                hasApiKey: !!API_KEY
            });
            return NextResponse.json(
                { error: 'Missing required environment variables' },
                { status: 500 }
            );
        }

        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`;
        console.log('Fetching reviews from:', url);

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.error('Google API error:', {
                status: response.status,
                statusText: response.statusText,
                data
            });
            return NextResponse.json(
                { error: `Google API error: ${data.error_message || response.statusText}` },
                { status: response.status }
            );
        }

        if (!data.result || !data.result.reviews) {
            console.error('Invalid response format:', data);
            return NextResponse.json(
                { error: 'Invalid response format from Google API' },
                { status: 500 }
            );
        }

        const reviews = data.result.reviews as GoogleReview[];
        const sortedReviews = reviews.sort((a, b) => b.time - a.time);

        return NextResponse.json({ reviews: sortedReviews });
    } catch (error) {
        console.error('Unexpected error in Google Reviews API:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error occurred' },
            { status: 500 }
        );
    }
} 