'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaPhone, FaClock, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const GoogleMapComponent = dynamic(() => import('./GoogleMap'), {
    loading: () => (
        <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
            <p className="text-gray-500">Loading map...</p>
        </div>
    ),
    ssr: false
});

const Contact = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [activeItem, setActiveItem] = useState<string | null>(null);
    const headingControls = useAnimationControls();
    const contentControls = useAnimationControls();

    useEffect(() => {
        if (inView) {
            headingControls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" }
            });

            contentControls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }
            });
        }
    }, [inView, headingControls, contentControls]);

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.3 + (i * 0.1),
                duration: 0.5,
                ease: "easeOut"
            }
        }),
        hover: {
            x: 10,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        }
    };

    const decorativeElementVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: [0.3, 0.7, 0.3],
            scale: 1,
            transition: {
                opacity: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                },
                scale: {
                    duration: 0.8,
                    ease: "easeOut"
                }
            }
        }
    };

    const imageContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 1, delay: 0.6 }
        }
    };

    const imageOverlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.8, delay: 0.8 }
        },
        hover: {
            opacity: 0.3,
            transition: { duration: 0.3 }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: 0.7,
                type: "spring",
                stiffness: 200,
                damping: 10
            }
        },
        hover: {
            scale: 1.05,
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.98,
            boxShadow: "0 5px 10px -3px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.05)",
            transition: { duration: 0.1 }
        }
    };

    return (
        <section id="contact" className="py-12 bg-white scroll-mt-24 relative overflow-hidden">
            {/* Decorative elements */}
            <motion.div
                variants={decorativeElementVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-yellow-400/10 blur-xl"
            />
            <motion.div
                variants={decorativeElementVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-yellow-400/10 blur-xl"
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={headingControls}
                    className="text-center mb-8"
                >
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 relative inline-block">
                        Get in Touch
                        <motion.div
                            className="absolute -bottom-1 left-0 h-0.5 bg-yellow-500 w-0"
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        />
                    </h2>
                    <p className="text-sm text-gray-600 max-w-xl mx-auto mt-2">
                        Ready to transform your hair? Contact us today for appointments and inquiries.
                    </p>
                </motion.div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={contentControls}
                    className="bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1),0_4px_15px_-5px_rgba(0,0,0,0.15)] overflow-hidden relative z-10"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        <div className="p-6 lg:p-10">
                            <div className="space-y-5">
                                {/* Phone Contact */}
                                <motion.div
                                    custom={0}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    onMouseEnter={() => setActiveItem('phone')}
                                    onMouseLeave={() => setActiveItem(null)}
                                    className="flex items-start space-x-3 group"
                                >
                                    <motion.div
                                        className="bg-yellow-50 p-3 rounded-lg relative overflow-hidden"
                                        animate={{
                                            scale: activeItem === 'phone' ? 1.05 : 1,
                                            backgroundColor: activeItem === 'phone' ? 'rgb(254 252 232)' : 'rgb(254 249 195 / 0.3)'
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FaPhone className="text-yellow-600 text-base relative z-10" />
                                        <motion.div
                                            className="absolute inset-0 bg-yellow-200 rounded-lg"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{
                                                scale: activeItem === 'phone' ? 1 : 0,
                                                opacity: activeItem === 'phone' ? 0.2 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.div>
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-900 mb-0.5 group-hover:text-yellow-700 transition-colors">Phone</h4>
                                        <a
                                            href="tel:+13014331934"
                                            className="text-sm text-yellow-600 hover:text-yellow-700 transition-colors flex items-center gap-2 group/link"
                                        >
                                            +1 (301) 433-1934
                                            <motion.div
                                                className="inline-flex items-center justify-center bg-yellow-100 rounded-full w-5 h-5 text-yellow-600 opacity-0 -ml-1 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all duration-300"
                                                whileHover={{ rotate: 45 }}
                                            >
                                                <FaArrowRight className="w-2.5 h-2.5" />
                                            </motion.div>
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Location */}
                                <motion.div
                                    custom={1}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    onMouseEnter={() => setActiveItem('location')}
                                    onMouseLeave={() => setActiveItem(null)}
                                    className="flex items-start space-x-3 group"
                                >
                                    <motion.div
                                        className="bg-yellow-50 p-3 rounded-lg relative overflow-hidden"
                                        animate={{
                                            scale: activeItem === 'location' ? 1.05 : 1,
                                            backgroundColor: activeItem === 'location' ? 'rgb(254 252 232)' : 'rgb(254 249 195 / 0.3)'
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FaMapMarkerAlt className="text-yellow-600 text-base relative z-10" />
                                        <motion.div
                                            className="absolute inset-0 bg-yellow-200 rounded-lg"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{
                                                scale: activeItem === 'location' ? 1 : 0,
                                                opacity: activeItem === 'location' ? 0.2 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.div>
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-900 mb-0.5 group-hover:text-yellow-700 transition-colors">Location</h4>
                                        <a
                                            href="https://maps.google.com/?q=2917+Cliff+Rd+East+Burnsville+MN+55337"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-gray-600 hover:text-yellow-700 transition-colors group/link"
                                        >
                                            2917 Cliff Rd East<br />
                                            Burnsville, MN 55337
                                            <motion.div
                                                className="inline-flex items-center justify-center bg-yellow-100 rounded-full w-5 h-5 text-yellow-600 opacity-0 -ml-1 group-hover/link:opacity-100 group-hover/link:ml-1 transition-all duration-300"
                                                whileHover={{ rotate: 45 }}
                                            >
                                                <FaArrowRight className="w-2.5 h-2.5" />
                                            </motion.div>
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Hours */}
                                <motion.div
                                    custom={2}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{ y: -3 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                    className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaClock className="text-yellow-600 text-sm" />
                                        <h4 className="text-base font-semibold text-gray-900">Business Hours</h4>
                                    </div>
                                    <div className="space-y-2 text-gray-600 text-xs">
                                        <motion.div
                                            className="flex justify-between items-center py-1.5 px-2 rounded-md"
                                            whileHover={{ backgroundColor: "rgba(254, 240, 138, 0.2)" }}
                                        >
                                            <span>Monday - Saturday</span>
                                            <span className="font-medium">10:00 AM - 6:00 PM</span>
                                        </motion.div>
                                        <motion.div
                                            className="flex justify-between items-center py-1.5 px-2 rounded-md text-gray-500"
                                            whileHover={{ backgroundColor: "rgba(254, 240, 138, 0.1)" }}
                                        >
                                            <span>Sunday</span>
                                            <span className="font-medium">Closed</span>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Map */}
                                <motion.div
                                    custom={3}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{ y: -3, boxShadow: "0 12px 25px -5px rgba(0,0,0,0.1), 0 6px 10px -5px rgba(0,0,0,0.04)" }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    className="w-full h-[200px] rounded-lg overflow-hidden shadow-sm border border-gray-100"
                                >
                                    <GoogleMapComponent />
                                </motion.div>

                                {/* Call to Action */}
                                <motion.div
                                    variants={buttonVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <a
                                        href="tel:+13014331934"
                                        className="block w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-white text-center py-3 rounded-lg text-sm font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-sm hover:shadow-md"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            Call Now for Appointment
                                            <FaPhone className="text-xs opacity-80" />
                                        </span>
                                    </a>
                                </motion.div>
                            </div>
                        </div>

                        <motion.div
                            className="relative lg:h-full h-[400px]"
                            variants={imageContainerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Image
                                src="/images/Hair3.jpg"
                                alt="Queen Habesha Salon"
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                style={{
                                    objectPosition: 'center 20%'
                                }}
                                priority
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact; 