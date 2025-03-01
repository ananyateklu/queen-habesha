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
        instagram: 'https://www.instagram.com/hhailu401/',
    },
    {
        name: 'Mekdi',
        role: 'Co-Owner & Master Stylist',
        image: '/images/mekdi.jpg',
        instagram: 'https://www.instagram.com/mekdesakwak/',
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
        <section id="crew" className="py-8 bg-white scroll-mt-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="text-xl md:text-2xl font-bold text-gray-900 mb-2"
                    >
                        Meet Our Crew
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="text-sm text-gray-600"
                    >
                        The talented team behind Queen Habesha
                    </motion.p>
                </div>

                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
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
                            className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1),0_4px_15px_-5px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2),0_10px_20px_-5px_rgba(0,0,0,0.15)] transition-all duration-300 p-4 border border-gray-100 cursor-pointer"
                        >
                            <div className="relative w-24 h-24 mx-auto mb-3">
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
                                <h3 className="text-base font-semibold text-gray-900 mb-0.5">
                                    {member.name}
                                </h3>
                                <p className="text-yellow-600 font-medium text-xs mb-2">{member.role}</p>
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
                                        <FaInstagram className="w-4 h-4" />
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