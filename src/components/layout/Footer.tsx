'use client';

import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Queen Habesha</h3>
                        <p className="text-gray-400 text-sm">
                            Minneapolis&apos;s premier Ethiopian hair salon, specializing in traditional and modern hair care techniques for all hair types.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/#services" className="text-gray-400 hover:text-white transition-colors">
                                    Our Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/#crew" className="text-gray-400 hover:text-white transition-colors">
                                    Our Crew
                                </Link>
                            </li>
                            <li>
                                <Link href="/#testimonials" className="text-gray-400 hover:text-white transition-colors">
                                    Testimonials
                                </Link>
                            </li>
                            <li>
                                <Link href="/#contact" className="text-gray-400 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Hours</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Tuesday - Saturday: 9:00 AM - 7:00 PM</li>
                            <li>Sunday: 10:00 AM - 5:00 PM</li>
                            <li>Monday: Closed</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="text-yellow-600 mt-1 flex-shrink-0" />
                                <span className="text-gray-400">123 Cedar Ave S, Minneapolis, MN 55454</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaPhone className="text-yellow-600 flex-shrink-0" />
                                <span className="text-gray-400">+1 (612) 555-0123</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaEnvelope className="text-yellow-600 flex-shrink-0" />
                                <span className="text-gray-400">info@queenhabesha.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Queen Habesha Hair Salon. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 