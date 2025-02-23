'use client';

import { useState, useEffect } from 'react';
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
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const imagesPerView = 4;
    const totalSlides = Math.ceil(images.length / imagesPerView);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + imagesPerView >= images.length ? 0 : prevIndex + imagesPerView
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - imagesPerView < 0 ? images.length - imagesPerView : prevIndex - imagesPerView
        );
    };

    const currentImages = images.slice(currentIndex, currentIndex + imagesPerView);

    // Auto-advance carousel
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const titleVariants = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    const imageVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    return (
        <section className="py-16 bg-white">
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <motion.div
                    variants={titleVariants}
                    className="text-center mb-12"
                >
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        Hairstyles
                    </h2>
                    <p className="text-sm text-gray-600">
                        Discover diverse range of beautiful hairstyles
                    </p>
                </motion.div>

                <div ref={ref} className="relative px-12">
                    <div className="relative overflow-hidden">
                        <motion.div
                            className="flex gap-6"
                            variants={containerVariants}
                        >
                            <AnimatePresence mode="wait">
                                {currentImages.map((image, index) => (
                                    <motion.div
                                        key={`${currentIndex}-${index}`}
                                        variants={imageVariants}
                                        custom={index}
                                        className="flex-1"
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
                                                alt={`Hairstyle ${currentIndex + index + 1}`}
                                                fill
                                                className="object-cover hover:scale-110 transition-transform duration-500"
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                                priority={index === 0}
                                            />
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Navigation Arrows */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 text-black hover:text-gray-700 transition-colors z-10"
                        aria-label="Previous slide"
                    >
                        <FaChevronCircleLeft className="w-10 h-10" />
                    </motion.button>
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 text-black hover:text-gray-700 transition-colors z-10"
                        aria-label="Next slide"
                    >
                        <FaChevronCircleRight className="w-10 h-10" />
                    </motion.button>

                    {/* Progress Indicators */}
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
                </div>
            </motion.div>
        </section>
    );
};

export default Hairstyles; 