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
        <section id="contact" className="py-8 bg-white scroll-mt-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-6"
                >
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
                    <p className="text-sm text-gray-600 max-w-xl mx-auto">
                        Ready to transform your hair? Contact us today for appointments and inquiries.
                    </p>
                </motion.div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1),0_4px_15px_-5px_rgba(0,0,0,0.15)] overflow-hidden"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
                        <div className="lg:col-span-2 p-4 lg:p-6 lg:border-r border-gray-100">
                            <div className="space-y-4">
                                {/* Phone Contact */}
                                <motion.div
                                    className="flex items-start space-x-3"
                                    whileHover={{ x: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="bg-yellow-50 p-2 rounded-md">
                                        <FaPhone className="text-yellow-600 text-base" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-900 mb-0.5">Phone</h4>
                                        <a
                                            href="tel:+13014331934"
                                            className="text-sm text-yellow-600 hover:text-yellow-700 transition-colors flex items-center gap-2 group"
                                        >
                                            +1 (301) 433-1934
                                            <motion.span
                                                className="inline-block"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                →
                                            </motion.span>
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Location */}
                                <motion.div
                                    className="flex items-start space-x-3"
                                    whileHover={{ x: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="bg-yellow-50 p-2 rounded-md">
                                        <FaMapMarkerAlt className="text-yellow-600 text-base" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-900 mb-0.5">Location</h4>
                                        <a
                                            href="https://maps.google.com/?q=2917+Cliff+Rd+East+Burnsville+MN+55337"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-gray-600 hover:text-gray-800 transition-colors group"
                                        >
                                            2917 Cliff Rd East<br />
                                            Burnsville, MN 55337
                                            <motion.span
                                                className="inline-block ml-2"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                →
                                            </motion.span>
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Hours */}
                                <div className="bg-gray-50 rounded-md p-3">
                                    <h4 className="text-base font-semibold text-gray-900 mb-2">Business Hours</h4>
                                    <div className="space-y-1 text-gray-600 text-xs">
                                        <p className="flex justify-between">
                                            <span>Monday - Saturday</span>
                                            <span>10:00 AM - 6:00 PM</span>
                                        </p>
                                        <p className="flex justify-between text-gray-500">
                                            <span>Sunday</span>
                                            <span>Closed</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Map */}
                                <div className="w-full h-[200px] rounded-md overflow-hidden shadow-sm">
                                    <GoogleMapComponent />
                                </div>

                                {/* Call to Action */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <a
                                        href="tel:+13014331934"
                                        className="block w-full bg-yellow-600 text-white text-center py-2.5 rounded-md text-sm font-semibold hover:bg-yellow-700 transition-colors shadow-sm hover:shadow-md"
                                    >
                                        Call Now for Appointment
                                    </a>
                                </motion.div>
                            </div>
                        </div>

                        <div className="relative lg:col-span-3 lg:h-full min-h-[250px]">
                            <div className="absolute inset-0 bg-black/10" />
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
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact; 