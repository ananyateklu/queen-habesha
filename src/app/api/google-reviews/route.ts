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
        const PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
        const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;

        if (!PLACE_ID || !API_KEY) {
            throw new Error('Missing required environment variables');
        }

        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch from Google Places API');
        }

        const data = await response.json();
        console.log('Raw Google Places API response:', data);

        // Sort reviews by date (most recent first) and take the top 6
        const reviews = (data.result.reviews || []) as GoogleReview[];
        console.log('Reviews with photos:', reviews.map(review => ({
            author: review.author_name,
            photo: review.profile_photo_url
        })));

        const sortedReviews = reviews
            .sort((a, b) => b.time - a.time)
            .slice(0, 6);

        return NextResponse.json({ reviews: sortedReviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
} 