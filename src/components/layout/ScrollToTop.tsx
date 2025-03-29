'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp } from 'react-icons/fa';
import { createPortal } from 'react-dom';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Handle mounting for portal
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const buttonVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        },
        tap: {
            scale: 0.9,
            transition: {
                duration: 0.1
            }
        },
        hover: {
            scale: 1.1,
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2), 0 5px 10px -5px rgba(0,0,0,0.1)",
            color: "#eab308", // yellow-500 - matches the horizontal line in Hairstyles
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    // Render button in a portal to avoid layout issues
    const ButtonContent = () => (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                        onClick={scrollToTop}
                        className="absolute bottom-6 right-6 sm:right-8 md:right-10 lg:right-12 bg-white/30 hover:bg-yellow-100/70 text-black p-1.5 backdrop-blur-sm rounded-full shadow-lg focus:outline-none group pointer-events-auto transition-all duration-300"
                        style={{
                            transform: 'translateZ(0)',
                            willChange: 'transform',
                            isolation: 'isolate',
                            margin: 0
                        }}
                        aria-label="Scroll to top"
                    >
                        <motion.div
                            animate={{
                                y: [-2, 0, -2],
                                transition: {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            <FaChevronUp className="w-6 h-6 md:w-7 md:h-7" />
                        </motion.div>
                        <motion.span
                            className="absolute inset-0 rounded-full bg-yellow-500/10"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.2, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                        />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );

    // Use createPortal to render the button outside the normal DOM flow
    return mounted ? createPortal(<ButtonContent />, document.body) : null;
};

export default ScrollToTop; 