'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar, FaGoogle } from 'react-icons/fa';
import Image from 'next/image';

interface Review {
    author_name: string;
    rating: number;
    relative_time_description: string;
    text: string;
    profile_photo_url: string;
}

const GoogleReviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/google-reviews');
                if (!response.ok) throw new Error('Failed to fetch reviews');
                const data = await response.json();
                setReviews(data.reviews);
            } catch (err) {
                setError('Failed to load reviews');
                console.error('Error fetching reviews:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <FaStar
                key={index}
                className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
            />
        ));
    };

    if (loading) {
        return <div className="text-center py-8">Loading reviews...</div>;
    }

    if (error) {
        return null; // Silently fail if reviews can't be loaded
    }

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <FaGoogle className="text-2xl text-blue-500" />
                        <h2 className="text-3xl font-bold text-gray-900">Google Reviews</h2>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
                        >
                            <div className="flex items-center mb-4">
                                {review.profile_photo_url && (
                                    <Image
                                        src={review.profile_photo_url}
                                        alt={review.author_name}
                                        width={40}
                                        height={40}
                                        className="rounded-full mr-4"
                                    />
                                )}
                                <div>
                                    <h3 className="font-semibold text-gray-900">{review.author_name}</h3>
                                    <div className="flex items-center mt-1">
                                        {renderStars(review.rating)}
                                        <span className="ml-2 text-sm text-gray-500">
                                            {review.relative_time_description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">{review.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GoogleReviews; 