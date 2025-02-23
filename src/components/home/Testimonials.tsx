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
        <section id="testimonials" className="py-16 pt-32 bg-gray-50 overflow-hidden scroll-mt-32">
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
                    className="relative min-h-[600px] md:min-h-[450px] lg:min-h-[400px]"
                >
                    <div className="absolute inset-0">
                        {reviews.map((review, index) => {
                            // Calculate responsive grid position based on screen size and review length
                            const getGridPosition = () => {
                                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                                const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
                                const isLongReview = review.text.length > 150;

                                if (isMobile) {
                                    return {
                                        baseX: 20,
                                        baseY: index * (isLongReview ? 200 : 160),
                                        moveX: 15,
                                        width: 'calc(100% - 40px)'
                                    };
                                } else if (isTablet) {
                                    const row = Math.floor(index / 2);
                                    const col = index % 2;
                                    return {
                                        baseX: col * 300 + 40,
                                        baseY: row * (isLongReview ? 220 : 180),
                                        moveX: 20,
                                        width: '280px'
                                    };
                                }
                                // Desktop layout
                                const row = Math.floor(index / 3);
                                const col = index % 3;
                                return {
                                    baseX: col * 300 + 40,
                                    baseY: row * (isLongReview ? 220 : 180),
                                    moveX: 25,
                                    width: '280px'
                                };
                            };

                            const { baseX, baseY, moveX, width } = getGridPosition();

                            return (
                                <motion.div
                                    key={index}
                                    className="absolute"
                                    initial={{
                                        x: baseX,
                                        y: baseY,
                                        opacity: 0
                                    }}
                                    animate={{
                                        x: [baseX, baseX + moveX, baseX],
                                        y: [baseY, baseY - 10, baseY],
                                        opacity: 1
                                    }}
                                    transition={{
                                        duration: 4 + Math.random() * 1,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        y: {
                                            duration: 2 + Math.random() * 0.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            yoyo: true
                                        }
                                    }}
                                    style={{ width }}
                                >
                                    <a
                                        href="https://www.google.com/maps/place/Queen+Habesha+Hair+Braiding/@44.7900081,-93.2340887,17z/data=!4m8!3m7!1s0x87f63c2c3a2a8c3d:0x1f5c6e5e4c4e8e1a!8m2!3d44.7900081!4d-93.2340887!9m1!1b1!16s%2Fg%2F11t_x_7_zj"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block cursor-pointer transform transition-transform duration-200 hover:scale-[1.02]"
                                    >
                                        <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                                            <div className="flex items-center mb-2">
                                                {review.profile_photo_url ? (
                                                    <div className="relative w-8 h-8 overflow-hidden mr-2 shadow-sm">
                                                        <Image
                                                            src={review.profile_photo_url}
                                                            alt={review.author_name}
                                                            fill
                                                            className="object-cover"
                                                            unoptimized
                                                            loading="eager"
                                                            priority={index < 2}
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                const parent = target.parentElement;
                                                                if (parent) {
                                                                    target.style.display = 'none';
                                                                    parent.classList.add('bg-blue-100', 'flex', 'items-center', 'justify-center');
                                                                    const span = document.createElement('span');
                                                                    span.className = 'text-[10px] font-semibold text-blue-600';
                                                                    span.textContent = review.author_name.split(' ').map(n => n[0]).join('');
                                                                    parent.appendChild(span);
                                                                }
                                                            }}
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
                                                <p className="text-gray-600 italic relative z-10 pl-3 text-[11px] leading-relaxed line-clamp-5 group-hover:text-gray-800">
                                                    {review.text}
                                                </p>
                                                <div className="absolute bottom-0 right-0 text-[10px] text-blue-500 opacity-0 transform translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                                                    View on Google Maps →
                                                </div>
                                            </div>
                                        </div>
                                    </a>
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