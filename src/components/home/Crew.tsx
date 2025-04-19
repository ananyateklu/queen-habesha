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
    // {
    //     name: 'Mekdi',
    //     role: 'Co-Owner & Master Stylist',
    //     image: '/images/mekdi.jpg',
    //     instagram: 'https://www.instagram.com/mekdesakwak/',
    // },
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

    const imageVariants = {
        hover: {
            scale: 1.15,
            transition: {
                duration: 0.4,
                ease: "easeOut"
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

    // Add floating animation for crew members
    const floatingVariants = (index: number) => ({
        initial: { y: 0, rotate: 0, scale: 1 },
        float: {
            y: [0, -5, 0],
            rotate: [0, 0.3, 0],
            scale: [1, 1.01, 1],
            transition: {
                y: {
                    repeat: Infinity,
                    duration: 4 + index * 0.7,
                    ease: "easeInOut",
                    repeatType: "mirror"
                },
                rotate: {
                    repeat: Infinity,
                    duration: 5 + index * 0.7,
                    ease: "easeInOut",
                    repeatType: "mirror"
                },
                scale: {
                    repeat: Infinity,
                    duration: 4.5 + index * 0.7,
                    ease: "easeInOut",
                    repeatType: "mirror"
                }
            }
        },
        hover: {
            y: -8,
            rotate: 0,
            scale: 1.02,
            transition: {
                duration: 0.3,
                ease: "easeOut",
                type: "spring",
                stiffness: 300
            }
        }
    });

    return (
        <section id="crew" className="py-8 bg-white scroll-mt-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="text-xl md:text-2xl font-bold text-gray-900 mb-2 relative inline-block"
                    >
                        Meet Our Crew
                    </motion.h2>

                    <motion.div
                        className="h-[2px] w-0 mx-auto mt-2 mb-4 relative overflow-hidden"
                        initial={{ width: 0 }}
                        animate={inView ? { width: "150px" } : { width: 0 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
                            style={{
                                height: '100%',
                                maskImage: 'linear-gradient(to right, transparent, black 30%, black 70%, transparent)',
                                WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%, black 70%, transparent)'
                            }}
                        />
                    </motion.div>

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
                    className="grid grid-cols-1 gap-6 max-w-xl mx-auto"
                >
                    {crewMembers.map((member, index) => (
                        <motion.a
                            key={member.name}
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial="initial"
                            animate="float"
                            whileHover="hover"
                            whileTap="tap"
                            variants={floatingVariants(index)}
                            className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1),0_4px_15px_-5px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2),0_10px_20px_-5px_rgba(0,0,0,0.15)] transition-all duration-300 p-4 border border-gray-100 cursor-pointer block group"
                            style={{
                                willChange: "transform",
                                transformStyle: "preserve-3d",
                                transformOrigin: "center center"
                            }}
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
                                <div className="flex justify-center">
                                    <span className="text-gray-400 group-hover:text-yellow-600 transition-colors flex items-center gap-1.5">
                                        <FaInstagram className="w-4 h-4" />
                                        <span className="text-xs">View Instagram</span>
                                    </span>
                                </div>
                            </motion.div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Crew; 