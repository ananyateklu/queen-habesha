'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const services = [
    {
        image: '/images/afro.png',
        title: 'Afro Styling',
        description: 'Expert styling and maintenance for natural afro hair.'
    },
    {
        image: '/images/braids.png',
        title: 'Braiding',
        description: 'Traditional Ethiopian and modern braiding styles.'
    },
    {
        image: '/images/curly.png',
        title: 'Curly Hair',
        description: 'Specialized treatments for curly hair patterns.'
    },
    {
        image: '/images/straight.png',
        title: 'Straight Styles',
        description: 'Professional straightening services.'
    },
    {
        image: '/images/locks.png',
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
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    const cardVariants = {
        hover: {
            y: -8,
            scale: 1.02,
            transition: {
                duration: 0.3,
                ease: "easeOut",
                type: "spring",
                stiffness: 200
            }
        },
        tap: {
            scale: 0.98,
            y: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <section id="services" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Our Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600"
                    >
                        Professional Hair Care Services
                    </motion.p>
                </div>

                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.title}
                            variants={{
                                ...itemVariants,
                                ...cardVariants
                            }}
                            whileHover="hover"
                            whileTap="tap"
                            className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1),0_4px_15px_-5px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2),0_10px_20px_-5px_rgba(0,0,0,0.15)] transition-all duration-300 p-4 border border-gray-100 cursor-pointer"
                        >
                            <div className="relative w-full pt-[100%] mb-4">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services; 