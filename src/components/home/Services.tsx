'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const services = [
    {
        image: '/images/Afro.png',
        title: 'Afro Styling',
        description: 'Expert styling and maintenance for natural afro hair.'
    },
    {
        image: '/images/Braids.png',
        title: 'Braiding',
        description: 'Traditional Ethiopian and modern braiding styles.'
    },
    {
        image: '/images/Curly.png',
        title: 'Curly Hair',
        description: 'Specialized treatments for curly hair patterns.'
    },
    {
        image: '/images/Straight.png',
        title: 'Straight Styles',
        description: 'Professional straightening services.'
    },
    {
        image: '/images/Locks.png',
        title: 'Locks',
        description: 'Expert installation and maintenance of locks.'
    },
];

const Services = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

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
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: 0.6
            }
        }
    };

    const imageVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.07,
            filter: "brightness(1.05)",
            transition: {
                duration: 0.4,
                ease: "easeOut",
                type: "spring",
                stiffness: 200
            }
        }
    };

    // Create floating animation variants with custom timing
    const floatingVariants = (index: number) => ({
        initial: { y: 0, rotate: 0, scale: 1 },
        float: {
            y: [0, -5, 0],
            rotate: [0, 0.5, 0],
            scale: [1, 1.02, 1],
            transition: {
                y: {
                    repeat: Infinity,
                    duration: 3 + index * 0.5,
                    ease: "easeInOut",
                    repeatType: "mirror"
                },
                rotate: {
                    repeat: Infinity,
                    duration: 4 + index * 0.5,
                    ease: "easeInOut",
                    repeatType: "mirror"
                },
                scale: {
                    repeat: Infinity,
                    duration: 3.5 + index * 0.5,
                    ease: "easeInOut",
                    repeatType: "mirror"
                }
            }
        },
        hover: {
            y: 0,
            rotate: 0,
            scale: 1.03,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    });

    return (
        <section id="services" className="py-16 bg-gray-50 scroll-mt-20 md:scroll-mt-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12 relative"
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-yellow-400/20 blur-xl -z-10"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={inView ? { scale: 5, opacity: 0.3 } : {}}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />

                    <motion.h2
                        variants={titleVariants}
                        className="text-xl md:text-2xl font-bold text-gray-900 mb-2 relative inline-block"
                    >
                        Our Services
                        <motion.span
                            className="absolute -bottom-1 left-0 h-0.5 bg-yellow-500"
                            initial={{ width: 0 }}
                            animate={inView ? { width: "100%" } : {}}
                            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                        />
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-sm text-gray-600 mt-2"
                    >
                        Professional Hair Care Services
                    </motion.p>
                </motion.div>

                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 mx-auto"
                >
                    {services.map((service, index) => (
                        <div key={service.title} className="relative h-full">
                            <motion.div
                                custom={index}
                                initial="initial"
                                animate="float"
                                whileHover="hover"
                                whileTap="hover"
                                variants={floatingVariants(index)}
                                className="bg-white rounded-2xl overflow-hidden relative z-10 p-3 border border-gray-100 cursor-pointer group h-full flex flex-col"
                                style={{
                                    willChange: "transform",
                                    transformStyle: "preserve-3d",
                                    transformOrigin: "center center",
                                    boxShadow: "0 2px 10px -2px rgba(0,0,0,0.1), 0 2px 8px -3px rgba(0,0,0,0.1)"
                                }}
                            >
                                {/* Box shadow animation */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    whileHover={{
                                        opacity: 1,
                                        boxShadow: "0 15px 25px -10px rgba(0,0,0,0.15), 0 8px 15px -5px rgba(0,0,0,0.1)",
                                        transition: { duration: 0.3 }
                                    }}
                                />

                                {/* Background gradient that appears on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/50 via-white to-yellow-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                                {/* Service image with animation */}
                                <div className="relative w-full aspect-square max-w-[160px] mx-auto mb-3 overflow-hidden">
                                    <motion.div
                                        variants={imageVariants}
                                        className="relative w-full h-full"
                                    >
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-contain rounded-xl"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                                            priority={index < 2}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/images/placeholder.png';
                                                console.error(`Error loading image for ${service.title}:`, e);
                                            }}
                                        />
                                    </motion.div>

                                    {/* Subtle glow effect behind image */}
                                    <div className="absolute -inset-2 bg-yellow-300/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                                </div>

                                {/* Service title and description */}
                                <div className="text-center relative z-10 mt-auto">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-yellow-800 transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 text-xs group-hover:text-gray-700 transition-colors duration-300">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Service card border effect */}
                                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-yellow-200/50 pointer-events-none transition-all duration-300" />
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services; 