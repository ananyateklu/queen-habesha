'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import Image from 'next/image';
import dynamic from 'next/dynamic';

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

    return (
        <section id="contact" className="py-12 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Contact Us</h2>
                    <p className="text-lg text-gray-600">
                        Reach out to us with our phone number. You can make an appointment from our website as well.
                    </p>
                </motion.div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="p-6 space-y-6">
                            <div className="flex items-start space-x-4">
                                <FaPhone className="text-yellow-600 text-xl mt-1" />
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Phone</h4>
                                    <a
                                        href="tel:+13014331934"
                                        className="text-base text-yellow-600 hover:text-yellow-700 transition-colors inline-block"
                                    >
                                        +1 (301) 433-1934
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <FaMapMarkerAlt className="text-yellow-600 text-xl mt-1" />
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Location</h4>
                                    <p className="text-base text-gray-600">
                                        2917 Cliff Rd East<br />
                                        Burnsville, MN 55337
                                    </p>
                                </div>
                            </div>

                            <div className="w-full h-[250px] rounded-xl overflow-hidden">
                                <GoogleMapComponent />
                            </div>

                            <a
                                href="tel:+13014331934"
                                className="block w-full bg-yellow-600 text-white text-center py-3 rounded-xl text-base font-semibold hover:bg-yellow-700 transition-colors"
                            >
                                Call Now
                            </a>
                        </div>

                        <div className="relative lg:h-full min-h-[350px]">
                            <Image
                                src="/images/Hair3.jpg"
                                alt="Queen Habesha Salon"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact; 