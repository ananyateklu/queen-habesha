'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-[90vh] flex items-start md:items-center justify-center bg-black pt-20 md:pt-0">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/70 z-10" />
                <Image
                    src="/images/HomeMain.png"
                    alt="Queen Habesha Hair Salon Interior"
                    fill
                    priority
                    className="object-cover opacity-80"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4 py-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-3 md:mb-4 relative"
                >
                    <div className="relative w-[340px] h-[240px] md:w-[440px] md:h-[220px] mx-auto">
                        <Image
                            src="/images/logo-inverted.png"
                            alt="Queen Habesha Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4"
                >
                    Experience the Art of Ethiopian Hair Care
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg sm:text-xl md:text-2xl mb-3 md:mb-6"
                >
                    Where tradition meets modern style for all hair types
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center"
                >
                    <Link
                        href="/#services"
                        className="bg-white text-gray-900 hover:bg-gray-100 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full font-semibold transition-colors"
                    >
                        Our Services
                    </Link>
                    <Link
                        href="/#contact"
                        className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full font-semibold transition-colors"
                    >
                        Contact Us
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 md:bottom-20 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white rounded-full p-1">
                    <motion.div
                        animate={{
                            y: [0, 12, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: 'loop',
                        }}
                        className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero; 