'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

const crewMembers = [
    {
        name: 'Helen',
        role: 'Co-Owner & Master Stylist',
        image: '/images/Helen.png',
        instagram: 'https://instagram.com/queenhabesha',
    },
    {
        name: 'Mekdi',
        role: 'Co-Owner & Master Stylist',
        image: '/images/mekdi.jpg',
        instagram: 'https://instagram.com/queenhabesha',
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

    const imageVariants = {
        hover: {
            scale: 1.15,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
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

    const borderVariants = {
        initial: {
            scale: 1,
            borderColor: "rgb(202 138 4)",
        },
        hover: {
            scale: 1.1,
            borderColor: "rgb(234 179 8)",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
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
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
                >
                    {crewMembers.map((member) => (
                        <motion.div
                            key={member.name}
                            variants={{
                                ...itemVariants,
                                ...cardVariants
                            }}
                            whileHover="hover"
                            whileTap="tap"
                            className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1),0_4px_15px_-5px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2),0_10px_20px_-5px_rgba(0,0,0,0.15)] transition-all duration-300 p-4 border border-gray-100 cursor-pointer"
                        >
                            <div className="relative w-32 h-32 mx-auto mb-3">
                                <motion.div
                                    variants={borderVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    className="absolute inset-0 rounded-full border-[1px] border-yellow-600 shadow-[0_0_10px_rgba(202,138,4,0.15)]"
                                />
                                <motion.div
                                    variants={borderVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    className="absolute inset-0 rounded-full border-[1px] border-yellow-600 shadow-[0_0_10px_rgba(202,138,4,0.15)]"
                                />
                                <motion.div
                                    variants={imageVariants}
                                    className="relative w-full h-full rounded-full overflow-hidden border-2 border-yellow-600 shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
                                >
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        priority
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        onError={(e) => {
                                            console.error(`Error loading image for ${member.name}:`, e);
                                        }}
                                    />
                                </motion.div>
                            </div>
                            <motion.div
                                className="text-center"
                                variants={{
                                    hover: {
                                        y: -2,
                                        transition: { duration: 0.3 }
                                    }
                                }}
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-yellow-600 font-medium text-sm mb-2">{member.role}</p>
                                <motion.div
                                    className="flex justify-center"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <a
                                        href={member.instagram}
                                        className="text-gray-400 hover:text-yellow-600 transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaInstagram className="w-5 h-5" />
                                    </a>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Crew; 