'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    // Text to cycle through in typewriter effect - wrapped in useMemo to prevent recreation on every render
    const typewriterTexts = useMemo(() => [
        "Where tradition meets modern style for all hair types",
        "Authentic Ethiopian braiding and styling techniques",
        "Expert care for natural and textured hair",
        "Bringing cultural heritage to contemporary styles",
        "Professional styling with traditional influences"
    ], []);

    const [currentTypewriterTextIndex, setCurrentTypewriterTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const typeWriter = () => {
            const currentText = typewriterTexts[currentTypewriterTextIndex];

            if (isPaused) {
                // If we're paused, wait a bit before starting to delete
                timeout = setTimeout(() => {
                    setIsPaused(false);
                    setIsDeleting(true);
                }, 2000);
                return;
            }

            if (isDeleting) {
                // Deleting text
                setDisplayText(current => current.substring(0, current.length - 1));

                // When text is completely deleted, move to next text
                if (displayText.length === 0) {
                    setIsDeleting(false);
                    setCurrentTypewriterTextIndex((current) =>
                        (current + 1) % typewriterTexts.length
                    );
                }

                timeout = setTimeout(typeWriter, 30); // Faster deletion
            } else {
                // Typing text
                setDisplayText(current => currentText.substring(0, current.length + 1));

                // When text is fully typed, pause
                if (displayText.length === currentText.length) {
                    setIsPaused(true);
                }

                timeout = setTimeout(typeWriter, 80); // Slower typing
            }
        };

        timeout = setTimeout(typeWriter, 100);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, isPaused, currentTypewriterTextIndex, typewriterTexts]);

    // Animation variants for text reveal
    const headlineVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.3,
            }
        }
    };

    const wordVariants = {
        hidden: {
            y: 50,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            }
        }
    };

    // Logo animation variants
    const logoContainerVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                type: "spring",
                stiffness: 50,
                when: "beforeChildren"
            }
        }
    };

    const logoVariants = {
        hover: {
            y: [0, -7, 0],
            filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"],
            transition: {
                y: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                },
                filter: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                }
            }
        }
    };

    const glowVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: [0.2, 0.5, 0.2],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // Split text into words for animation
    const headlineText = "Experience the Art of Ethiopian Hair Care";
    const headlineWords = headlineText.split(" ");

    // Cursor animation
    const cursorVariants = {
        blink: {
            opacity: [0, 1, 1, 0],
            transition: {
                duration: 1,
                repeat: Infinity,
                repeatDelay: 0,
                ease: "linear",
                times: [0, 0.4, 0.6, 1]
            }
        }
    };

    return (
        <section id="home" className="relative h-[100dvh] sm:h-screen flex items-start md:items-center justify-center bg-black pt-16 md:pt-0">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/70 z-10" />
                <Image
                    src="/images/HomeMain.jpg"
                    alt="Queen Habesha Hair Salon Interior"
                    fill
                    priority
                    className="object-cover opacity-80"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4 py-2 mt-8 sm:mt-12 md:mt-0">
                <motion.div
                    variants={logoContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-6 md:mb-8 relative"
                >
                    <div className="relative w-[320px] h-[230px] md:w-[600px] md:h-[300px] mx-auto">
                        {/* Glow effect */}
                        <motion.div
                            variants={glowVariants}
                            initial="hidden"
                            animate="visible"
                            className="absolute inset-0 rounded-full bg-yellow-500/20 blur-xl -z-10 transform scale-90"
                        />

                        <motion.div
                            variants={logoVariants}
                            initial="initial"
                            animate="hover"
                            className="relative w-full h-full"
                        >
                            <Image
                                src="/images/logo-inverted.png"
                                alt="Queen Habesha Logo"
                                fill
                                sizes="(max-width: 640px) 320px, (max-width: 1024px) 600px, 600px"
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </div>
                </motion.div>

                <div className="relative overflow-hidden">
                    <motion.div
                        className="relative"
                        variants={headlineVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="flex flex-wrap justify-center text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 mx-auto">
                            {headlineWords.map((word, i) => (
                                <motion.span
                                    key={i}
                                    className="mx-1 md:mx-2 inline-block"
                                    variants={wordVariants}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </div>

                        <motion.div
                            className="h-0.5 bg-yellow-500 w-0 mx-auto mt-2 mb-4 md:mb-6"
                            initial={{ width: 0 }}
                            animate={{ width: "60%" }}
                            transition={{
                                delay: 1.0,
                                duration: 0.8,
                                ease: "easeOut"
                            }}
                        />
                    </motion.div>

                    <div className="text-base sm:text-xl md:text-2xl mb-8 md:mb-12 max-w-[260px] sm:max-w-none mx-auto h-8 md:h-12">
                        <div className="flex items-center justify-center">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.8, duration: 0.5 }}
                            >
                                {displayText}
                            </motion.span>
                            <motion.span
                                variants={cursorVariants}
                                animate="blink"
                                className="inline-block w-0.5 h-5 md:h-8 bg-white ml-0.5"
                                initial={{ opacity: 0 }}
                                style={{ marginTop: '4px' }}
                            />
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                    className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center"
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
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-4 sm:bottom-12 md:bottom-20 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-4 h-6 md:w-6 md:h-10 border-2 border-white rounded-full p-1">
                    <motion.div
                        animate={{
                            y: [0, 8, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: 'loop',
                        }}
                        className="w-1 h-1 md:w-2 md:h-2 bg-white rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero; 