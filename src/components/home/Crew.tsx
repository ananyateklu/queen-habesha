'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

const crewMembers = [
    {
        name: 'Abeba Tadesse',
        role: 'Master Stylist',
        image: '/images/stylist-1.jpg',
        bio: 'With over 15 years of experience in Ethiopian and African hair styling, Abeba brings expertise in traditional braiding and modern styling techniques.',
        social: {
            linkedin: '#',
            twitter: '#',
            instagram: '#',
        },
    },
    {
        name: 'Solomon Bekele',
        role: 'Color Specialist',
        image: '/images/stylist-2.jpg',
        bio: 'Solomon specializes in creating stunning hair colors that complement natural hair textures while maintaining hair health.',
        social: {
            linkedin: '#',
            twitter: '#',
            instagram: '#',
        },
    },
    {
        name: 'Tigist Haile',
        role: 'Natural Hair Expert',
        image: '/images/stylist-3.jpg',
        bio: 'Tigist is passionate about natural hair care and specializes in protective styling, loc maintenance, and natural hair treatments.',
        social: {
            linkedin: '#',
            twitter: '#',
            instagram: '#',
        },
    },
];

const Crew = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <section id="crew" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Meet Our Crew
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600"
                    >
                        The talented team behind Queen Habesha
                    </motion.p>
                </div>

                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {crewMembers.map((member) => (
                        <motion.div
                            key={member.name}
                            variants={itemVariants}
                            className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="aspect-w-3 aspect-h-4 relative">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-yellow-600 font-medium mb-4">{member.role}</p>
                                <p className="text-gray-600 mb-6">{member.bio}</p>
                                <div className="flex space-x-4">
                                    <a
                                        href={member.social.linkedin}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaLinkedin className="w-5 h-5" />
                                    </a>
                                    <a
                                        href={member.social.twitter}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaTwitter className="w-5 h-5" />
                                    </a>
                                    <a
                                        href={member.social.instagram}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaInstagram className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Crew; 