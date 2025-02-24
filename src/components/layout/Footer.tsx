'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black text-gray-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Logo and Contact */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="relative w-8 h-8">
                                <Image
                                    src="/images/logo-inverted.png"
                                    alt="Queen Habesha Logo"
                                    fill
                                    sizes="(max-width: 640px) 32px, 32px"
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-base text-white">
                                    Queen Habesha
                                </span>
                                <span className="text-xs text-gray-400">
                                    Hair Braiding
                                </span>
                            </div>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-start space-x-2">
                                <FaPhone className="text-yellow-600 mt-1 flex-shrink-0 text-sm" />
                                <span className="text-sm">+1 (301) 433-1934</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaEnvelope className="text-yellow-600 mt-1 flex-shrink-0 text-sm" />
                                <span className="text-sm">Queenhabesha@gmail.com</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaMapMarkerAlt className="text-yellow-600 mt-1 flex-shrink-0 text-sm" />
                                <span className="text-sm">2917 Cliff Rd East<br />Burnsville, MN 55337</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-sm font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-1.5">
                            <li>
                                <Link href="/#home" className="text-sm hover:text-white transition-colors">
                                    HOME
                                </Link>
                            </li>
                            <li>
                                <Link href="/#services" className="text-sm hover:text-white transition-colors">
                                    SERVICES
                                </Link>
                            </li>
                            <li>
                                <Link href="/#crew" className="text-sm hover:text-white transition-colors">
                                    OUR CREW
                                </Link>
                            </li>
                            <li>
                                <Link href="/#testimonials" className="text-sm hover:text-white transition-colors">
                                    TESTIMONIALS
                                </Link>
                            </li>
                            <li>
                                <Link href="/#contact" className="text-sm hover:text-white transition-colors">
                                    CONTACT US
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h3 className="text-white text-sm font-semibold mb-3">Hours</h3>
                        <ul className="space-y-1.5">
                            <li className="text-sm">Monday - Saturday: 10:00 AM - 6:00 PM</li>
                            <li className="text-sm">Sunday: Closed</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400 text-xs">
                    <p>&copy; {new Date().getFullYear()} Queen Habesha Hair Salon. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 