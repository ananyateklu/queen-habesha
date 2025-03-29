'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar, FaQuoteLeft, FaGoogle } from 'react-icons/fa';
import Image from 'next/image';

interface Review {
    author_name: string;
    rating: number;
    relative_time_description: string;
    text: string;
    profile_photo_url: string;
}

const Testimonials = () => {
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
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch reviews');
                }

                // First filter to only 5-star reviews
                const fiveStarReviews = data.reviews.filter((review: Review) => review.rating === 5);

                // Then sort by recency (using relative_time_description as a proxy for recency)
                // This is a simple approach - if relative_time_description has actual timestamps,
                // we could parse and sort by actual dates
                const sortedReviews = [...fiveStarReviews].sort((a, b) => {
                    // If we can extract numbers from the time descriptions, sort by those values
                    const aTime = a.relative_time_description.match(/\d+/);
                    const bTime = b.relative_time_description.match(/\d+/);

                    // If both have numbers, compare the numbers
                    if (aTime && bTime) {
                        return parseInt(aTime[0], 10) - parseInt(bTime[0], 10);
                    }

                    // If only one has numbers, prioritize the one without numbers (likely "a week ago" vs "3 weeks ago")
                    if (!aTime && bTime) return -1;
                    if (aTime && !bTime) return 1;

                    // As a fallback, sort by text length for substantial reviews
                    return b.text.length - a.text.length;
                });

                setReviews(sortedReviews);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load reviews';
                console.error('Error fetching reviews:', err);
                setError(errorMessage);
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
        return (
            <section id="testimonials" className="py-16 pt-32 bg-gray-50">
                <div className="text-center py-8">
                    <div className="animate-pulse">Loading reviews...</div>
                </div>
            </section>
        );
    }

    if (error) {
        console.error('Reviews error:', error);
        // Return null or a fallback UI instead of completely hiding the section
        return (
            <section id="testimonials" className="py-16 pt-32 bg-gray-50">
                <div className="text-center py-8">
                    <p className="text-gray-500">Currently unable to load reviews. Please check back later.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="testimonials" className="py-16 bg-gray-50 overflow-hidden scroll-mt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="flex items-center justify-center gap-2 mb-2"
                    >
                        <FaGoogle className="text-base text-blue-500" />
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">What Our Clients Say</h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="text-sm text-gray-600"
                    >
                        Read our reviews from Google
                    </motion.p>
                </div>

                <motion.div
                    ref={ref}
                    className="relative mt-8 px-4 sm:px-0"
                    id="testimonials-container"
                    style={{
                        minHeight: typeof window !== 'undefined' && window.innerWidth >= 768
                            ? `${Math.ceil(reviews.length / (window.innerWidth >= 1024 ? 3 : 2)) * (220)}px`
                            : 'auto'
                    }}
                >
                    <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center md:items-start gap-4 md:gap-6 w-full">
                        {reviews.map((review, index) => {
                            // Calculate responsive grid position based on screen size and review length
                            const getGridPosition = () => {
                                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                                const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;

                                if (isMobile) {
                                    return {
                                        moveX: 0,
                                        width: '100%'
                                    };
                                } else if (isTablet) {
                                    return {
                                        moveX: 15,
                                        width: 'calc(50% - 1rem)'
                                    };
                                }
                                // Desktop layout
                                return {
                                    moveX: 20,
                                    width: 'calc(33.333% - 1.5rem)'
                                };
                            };

                            const { moveX, width } = getGridPosition();
                            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

                            return (
                                <motion.div
                                    key={index}
                                    className="w-full md:w-auto"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{
                                        opacity: 1,
                                        y: isMobile ? 0 : [0, -10, 0],
                                        x: isMobile ? 0 : [-moveX / 2, moveX / 2, -moveX / 2]
                                    }}
                                    transition={{
                                        opacity: { duration: 0.8, delay: index * 0.2 },
                                        y: {
                                            duration: 2 + Math.random() * 0.5,
                                            repeat: isMobile ? 0 : Infinity,
                                            ease: "easeInOut",
                                            delay: index * 0.2
                                        },
                                        x: {
                                            duration: 3 + Math.random() * 0.5,
                                            repeat: isMobile ? 0 : Infinity,
                                            ease: "easeInOut",
                                            delay: index * 0.2
                                        }
                                    }}
                                    style={{ width: isMobile ? '100%' : width }}
                                >
                                    <motion.a
                                        href="https://www.google.com/maps/place/Queen+Habesha+Hair+Braiding/@44.7898049,-93.2368792,17z/data=!3m1!4b1!4m6!3m5!1s0x87f6317195ee40bf:0xdfbaa187809a1fa7!8m2!3d44.7898049!4d-93.2343043!16s%2Fg%2F11k4y9n6qb?entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoASAFQAw%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block cursor-pointer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                                            <div className="flex items-center mb-2">
                                                {review.profile_photo_url ? (
                                                    <div className="relative w-8 h-8 overflow-hidden mr-2 shadow-sm">
                                                        <Image
                                                            src={review.profile_photo_url}
                                                            alt={review.author_name}
                                                            fill
                                                            className="object-contain"
                                                            unoptimized
                                                            loading="eager"
                                                            priority={index < 2}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 bg-blue-100 flex items-center justify-center mr-2 shadow-sm">
                                                        <span className="text-[10px] font-semibold text-blue-600">
                                                            {review.author_name.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className="text-xs font-semibold text-gray-900 mb-0.5">
                                                        {review.author_name}
                                                    </h3>
                                                    <div className="flex items-center">
                                                        <div className="flex scale-[0.6] -ml-2">
                                                            {renderStars(review.rating)}
                                                        </div>
                                                        <span className="ml-0.5 text-[10px] text-gray-500">
                                                            {review.relative_time_description}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative flex-1">
                                                <FaQuoteLeft className="text-gray-200/50 text-sm absolute -top-1 -left-0.5" />
                                                <p className="text-gray-600 italic relative z-10 pl-3 text-[11px] leading-relaxed line-clamp-4">
                                                    {review.text}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.a>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials; 