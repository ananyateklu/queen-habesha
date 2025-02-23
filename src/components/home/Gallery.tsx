'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const hairStyles = [
    { src: '/images/Hair1.jpg', alt: 'Hairstyle 1' },
    { src: '/images/Hair2.jpg', alt: 'Hairstyle 2' },
    { src: '/images/Hair3.jpg', alt: 'Hairstyle 3' },
    { src: '/images/Hair4.jpg', alt: 'Hairstyle 4' },
    { src: '/images/Hair5.jpg', alt: 'Hairstyle 5' },
    { src: '/images/Hair6.jpg', alt: 'Hairstyle 6' },
    // Add more hairstyles as needed
];

const Gallery = () => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsToShow = 4;

    const nextSlide = () => {
        setStartIndex((prev) =>
            prev + itemsToShow >= hairStyles.length ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setStartIndex((prev) =>
            prev === 0 ? Math.max(0, hairStyles.length - itemsToShow) : prev - 1
        );
    };

    const visibleStyles = hairStyles.slice(startIndex, startIndex + itemsToShow);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Signature Styles
                    </h2>
                    <p className="text-xl text-gray-600">
                        Browse through our collection of beautiful hairstyles
                    </p>
                </motion.div>

                <div className="relative">
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-yellow-600 text-white p-3 rounded-full hover:bg-yellow-700 transition-colors z-10"
                        aria-label="Previous slides"
                    >
                        <FaChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="grid grid-cols-4 gap-6">
                        {visibleStyles.map((style, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden shadow-lg"
                            >
                                <Image
                                    src={style.src}
                                    alt={style.alt}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-110"
                                />
                            </motion.div>
                        ))}
                    </div>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-yellow-600 text-white p-3 rounded-full hover:bg-yellow-700 transition-colors z-10"
                        aria-label="Next slides"
                    >
                        <FaChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Gallery; 