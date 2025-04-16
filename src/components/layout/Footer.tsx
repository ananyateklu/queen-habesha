'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaInstagram, FaFacebook, FaTiktok, FaHeart } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaInstagram, href: 'https://www.instagram.com/', name: 'Instagram' },
        { icon: FaFacebook, href: 'https://www.facebook.com/', name: 'Facebook' },
        { icon: FaTiktok, href: 'https://www.tiktok.com/@queenhabeshahairsalon', name: 'TikTok' },
    ];

    const quickLinks = [
        { name: 'Home', href: '/#home' },
        { name: 'Services', href: '/#services' },
        { name: 'Our Crew', href: '/#crew' },
        { name: 'Testimonials', href: '/#testimonials' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <footer className="relative bg-black text-white overflow-hidden pt-8 pb-4">
            {/* Subtle golden glow effects */}
            <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-yellow-600/5 blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-yellow-600/5 blur-[80px]" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main footer content */}
                <div className="flex flex-col lg:flex-row gap-8 justify-between mb-6">
                    {/* Brand and contact information - Column 1 */}
                    <div className="flex-shrink-0 lg:max-w-sm">
                        <motion.div
                            className="flex items-center space-x-3 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="relative w-10 h-10 overflow-hidden">
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <Image
                                        src="/images/logo-inverted.png"
                                        alt="Queen Habesha Logo"
                                        fill
                                        sizes="(max-width: 640px) 40px, 40px"
                                        className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                                    />
                                </motion.div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg text-white">
                                    Queen Habesha
                                </span>
                                <span className="text-xs text-yellow-500/90 tracking-wider font-medium">
                                    ETHIOPIAN HAIR BRAIDING
                                </span>
                            </div>
                        </motion.div>

                        <motion.p
                            className="text-sm text-gray-400 leading-relaxed mb-4 max-w-sm"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            Experience authentic Ethiopian hair styling techniques in a professional and welcoming environment.
                        </motion.p>
                    </div>

                    {/* Contact information - Column 2 */}
                    <motion.div
                        className="flex-grow space-y-1.5"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-sm font-semibold text-white mb-3">
                            Contact Information
                        </h3>

                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <div className="text-yellow-500 w-5 flex-shrink-0">
                                    <FaPhone className="w-3 h-3" />
                                </div>
                                <a href="tel:+13014331934" className="text-sm text-white hover:text-yellow-400 transition-colors whitespace-nowrap">
                                    +1 (301) 433-1934
                                </a>
                            </li>

                            <li className="flex items-center">
                                <div className="text-yellow-500 w-5 flex-shrink-0">
                                    <FaEnvelope className="w-3 h-3" />
                                </div>
                                <a href="mailto:Queenhabesha@gmail.com" className="text-sm text-white hover:text-yellow-400 transition-colors whitespace-nowrap">
                                    Queenhabesha@gmail.com
                                </a>
                            </li>

                            {/* Address removed */}
                            {/* 
                            <li className="flex items-center">
                                <div className="text-yellow-500 w-5 flex-shrink-0 self-start mt-0.5">
                                    <FaMapMarkerAlt className="w-3 h-3" />
                                </div>
                                <a
                                    href="https://maps.google.com/?q=2917+Cliff+Rd+East+Burnsville+MN+55337"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-white hover:text-yellow-400 transition-colors"
                                >
                                    2917 Cliff Rd East, Burnsville, MN 55337
                                </a>
                            </li>
                            */}
                        </ul>
                    </motion.div>

                    {/* Quick links and social - Column 3 */}
                    <motion.div
                        className="flex-shrink-0 space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div>
                            <h3 className="text-sm font-semibold text-white mb-3">
                                Quick Links
                            </h3>

                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                                {quickLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white mb-3">
                                Connect With Us
                            </h3>

                            <div className="flex space-x-3">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-yellow-500/90 hover:text-white transition-all duration-300"
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label={social.name}
                                    >
                                        <social.icon className="w-4 h-4" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Business Hours - Full Width */}
                <div className="text-xs text-gray-500 mb-6 text-center border-t border-white/10 pt-4 pb-2">
                    <span className="font-medium text-white">BUSINESS HOURS:</span>
                    <span className="ml-2 block md:inline">Monday - Saturday: 10:00 AM - 6:00 PM</span>
                    <span className="hidden md:inline mx-2">•</span>
                    <span className="block md:inline">Sunday: Closed</span>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-xs mb-2 md:mb-0 text-center md:text-left">
                        &copy; {currentYear} Queen Habesha Hair Braiding. All rights reserved.
                    </p>

                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <span>Made with</span>
                        <FaHeart className="text-yellow-500 mx-0.5 w-3 h-3" />
                        <span>in Minnesota</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 