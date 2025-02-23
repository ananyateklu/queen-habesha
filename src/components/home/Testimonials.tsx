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
                if (!response.ok) throw new Error('Failed to fetch reviews');
                const data = await response.json();
                // Sort reviews by text length, longest first
                const sortedReviews = [...data.reviews].sort((a, b) => b.text.length - a.text.length);
                setReviews(sortedReviews);
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
        return (
            <section id="testimonials" className="py-16 pt-32 bg-gray-50">
                <div className="text-center py-8">Loading reviews...</div>
            </section>
        );
    }

    if (error || !reviews.length) {
        return null;
    }

    return (
        <section id="testimonials" className="py-16 md:py-32 bg-gray-50 overflow-hidden scroll-mt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-6">
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
                    className="relative mt-8"
                    id="testimonials-container"
                    style={{
                        minHeight: typeof window !== 'undefined' && window.innerWidth >= 768
                            ? `${Math.ceil(reviews.length / (window.innerWidth >= 1024 ? 3 : 2)) * (220)}px`
                            : 'auto'
                    }}
                >
                    <div className="md:absolute md:inset-0 flex flex-col md:block">
                        {reviews.map((review, index) => {
                            // Calculate responsive grid position based on screen size and review length
                            const getGridPosition = () => {
                                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                                const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
                                const isLongReview = review.text.length > 150;
                                const cardHeight = isLongReview ? 220 : 180;

                                if (isMobile) {
                                    return {
                                        baseX: 0,
                                        baseY: 0,
                                        moveX: 10,
                                        width: '100%'
                                    };
                                } else if (isTablet) {
                                    const row = Math.floor(index / 2);
                                    const col = index % 2;
                                    return {
                                        baseX: col * 300 + 40,
                                        baseY: row * cardHeight,
                                        moveX: 15,
                                        width: '280px'
                                    };
                                }
                                // Desktop layout
                                const row = Math.floor(index / 3);
                                const col = index % 3;
                                return {
                                    baseX: col * 300 + 40,
                                    baseY: row * cardHeight,
                                    moveX: 20,
                                    width: '280px'
                                };
                            };

                            const { baseX, baseY, moveX, width } = getGridPosition();
                            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

                            return (
                                <motion.div
                                    key={index}
                                    className={`${isMobile ? 'relative mb-4' : 'absolute'}`}
                                    initial={{
                                        x: isMobile ? 0 : baseX - 100,
                                        y: isMobile ? 50 : baseY + 50,
                                        opacity: 0,
                                        scale: 0.9
                                    }}
                                    animate={{
                                        x: isMobile ? 0 : [baseX, baseX + moveX, baseX],
                                        y: isMobile ? 0 : [baseY, baseY - 10, baseY],
                                        opacity: 1,
                                        scale: 1
                                    }}
                                    transition={{
                                        duration: isMobile ? 0.5 : 4 + Math.random() * 1,
                                        repeat: isMobile ? 0 : Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.2,
                                        opacity: {
                                            duration: 0.8,
                                            ease: "easeOut",
                                            delay: index * 0.2
                                        },
                                        scale: {
                                            duration: 0.8,
                                            ease: "easeOut",
                                            delay: index * 0.2
                                        },
                                        y: isMobile ? {} : {
                                            duration: 2 + Math.random() * 0.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            yoyo: true
                                        }
                                    }}
                                    style={{ width }}
                                >
                                    <motion.a
                                        href="https://www.google.com/maps/place/Queen+Habesha+Hair+Braiding/@44.7900081,-93.2340887,17z/data=!4m8!3m7!1s0x87f63c2c3a2a8c3d:0x1f5c6e5e4c4e8e1a!8m2!3d44.7900081!4d-93.2340887!9m1!1b1!16s%2Fg%2F11t_x_7_zj"
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
                                                    <div className="relative w-8 h-8 overflow-hidden mr-2 shadow-sm rounded-full">
                                                        <Image
                                                            src={review.profile_photo_url}
                                                            alt={review.author_name}
                                                            fill
                                                            className="object-cover"
                                                            unoptimized
                                                            loading="eager"
                                                            priority={index < 2}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 shadow-sm">
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