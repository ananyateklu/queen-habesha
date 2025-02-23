'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCut, FaSprayCan, FaMagic, FaPaintBrush } from 'react-icons/fa';

const services = [
    {
        icon: FaCut,
        title: 'Hair Styling',
        description: 'Expert styling for all hair types, specializing in traditional Ethiopian and modern hairstyles.',
    },
    {
        icon: FaMagic,
        title: 'Hair Treatments',
        description: 'Nourishing treatments, deep conditioning, and specialized care for natural African hair.',
    },
    {
        icon: FaPaintBrush,
        title: 'Hair Coloring',
        description: 'Professional coloring services from natural highlights to vibrant fashion colors.',
    },
    {
        icon: FaSprayCan,
        title: 'Braiding & Extensions',
        description: 'Traditional Ethiopian braiding, box braids, twists, and premium hair extension services.',
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
                        Discover what makes Queen Habesha special
                    </motion.p>
                </div>

                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.title}
                            variants={itemVariants}
                            className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="text-4xl text-yellow-600 mb-6">
                                <service.icon />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                {service.title}
                            </h3>
                            <p className="text-gray-600">{service.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services; 