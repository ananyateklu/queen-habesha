'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

const images = [
    '/images/Hair1.jpg',
    '/images/Hair2.jpg',
    '/images/Hair3.jpg',
    '/images/Hair4.jpg',
    '/images/Hair5.jpg',
    '/images/Hair6.jpg',
    '/images/Hair7.jpg',
    '/images/Hair8.jpg',
    '/images/Hair10.jpg',
    '/images/Hair11.jpg',
    '/images/Hair12.jpg',
    '/images/Hair13.jpg',
    '/images/Hair14.jpg',
    '/images/Hair15.jpg',
    '/images/Hair16.jpg',
    '/images/Hair17.jpg',
    '/images/Hair18.jpg',
    '/images/Hair19.jpg',
    '/images/Hair20.jpg',
    '/images/Hair21.jpg',
];

const Hairstyles = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
    const [ref] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Default to desktop view for SSR
    const [imagesPerView, setImagesPerView] = useState(4);

    // Handle client-side updates after mount
    useEffect(() => {
        setIsMounted(true);
        const updateImagesPerView = () => {
            if (window.innerWidth < 640) {
                setImagesPerView(1);
            } else if (window.innerWidth < 1024) {
                setImagesPerView(2);
            } else {
                setImagesPerView(4);
            }
        };

        updateImagesPerView();
        window.addEventListener('resize', updateImagesPerView);
        return () => window.removeEventListener('resize', updateImagesPerView);
    }, []);

    const totalSlides = Math.ceil(images.length / imagesPerView);

    const nextSlide = useCallback(() => {
        setDirection(1); // Set direction to forward
        setCurrentIndex((prevIndex) =>
            prevIndex + imagesPerView >= images.length ? 0 : prevIndex + imagesPerView
        );
    }, [imagesPerView]);

    const prevSlide = useCallback(() => {
        setDirection(-1); // Set direction to backward
        setCurrentIndex((prevIndex) =>
            prevIndex - imagesPerView < 0 ? images.length - imagesPerView : prevIndex - imagesPerView
        );
    }, [imagesPerView]);

    const currentImages = images.slice(currentIndex, currentIndex + imagesPerView);

    // Auto-advance carousel
    useEffect(() => {
        if (!isMounted) return;

        const interval = setInterval(() => {
            setDirection(1); // Set direction to forward for auto-advance
            setCurrentIndex((prevIndex) =>
                prevIndex + imagesPerView >= images.length ? 0 : prevIndex + imagesPerView
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [isMounted, imagesPerView]);

    const titleVariants = {
        hidden: {
            opacity: 0,
            x: 50,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    const imageVariants = {
        initial: (direction: number) => ({
            opacity: 0,
            x: direction > 0 ? 300 : -300,
        }),
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 25,
                mass: 1,
            }
        },
        exit: (direction: number) => ({
            opacity: 0,
            x: direction > 0 ? -300 : 300,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 25,
                mass: 1,
            }
        })
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-12"
                >
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 relative inline-block">
                        Hairstyles
                    </h2>

                    <motion.div
                        className="h-[2px] w-0 mx-auto mt-2 mb-4 relative overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: "150px" }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
                            style={{
                                height: '100%',
                                maskImage: 'linear-gradient(to right, transparent, black 30%, black 70%, transparent)',
                                WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%, black 70%, transparent)'
                            }}
                        />
                    </motion.div>

                    <p className="text-sm text-gray-600">
                        Discover diverse range of beautiful hairstyles
                    </p>
                </motion.div>

                <div ref={ref} className="relative px-12">
                    <div className="relative overflow-hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 min-h-[400px]">
                            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                                {isMounted && currentImages.map((image) => (
                                    <motion.div
                                        key={image}
                                        className="w-full absolute"
                                        custom={direction}
                                        variants={imageVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        style={{
                                            position: 'relative'
                                        }}
                                    >
                                        <motion.div
                                            className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg"
                                            whileHover={{
                                                scale: 1.03,
                                                transition: { duration: 0.3 }
                                            }}
                                        >
                                            <Image
                                                src={image}
                                                alt={`Hairstyle ${images.indexOf(image) + 1}`}
                                                fill
                                                className="object-cover hover:scale-110 transition-transform duration-500"
                                                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 23vw"
                                                priority={images.indexOf(image) === 0}
                                            />
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    {isMounted && (
                        <>
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 }}
                                onClick={prevSlide}
                                className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-2 text-black hover:text-gray-700 transition-colors z-10"
                                aria-label="Previous slide"
                            >
                                <FaChevronCircleLeft className="w-8 h-8 md:w-10 md:h-10" />
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 }}
                                onClick={nextSlide}
                                className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-2 text-black hover:text-gray-700 transition-colors z-10"
                                aria-label="Next slide"
                            >
                                <FaChevronCircleRight className="w-8 h-8 md:w-10 md:h-10" />
                            </motion.button>
                        </>
                    )}

                    {/* Progress Indicators */}
                    {isMounted && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="flex justify-center items-center space-x-2 mt-8"
                        >
                            {[...Array(totalSlides)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index * imagesPerView)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.floor(currentIndex / imagesPerView) === index
                                        ? 'bg-black w-4'
                                        : 'bg-gray-300'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hairstyles; 