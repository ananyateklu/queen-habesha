'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Our Crew', href: '/#crew' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Contact Us', href: '/#contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (pathname !== '/' && href.startsWith('/#')) {
            return; // Allow default behavior for hash links when not on homepage
        }

        e.preventDefault();

        // Handle home link
        if (href === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Handle section links
        const targetId = href.replace('/#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="font-bold text-xl text-gray-800">
                        Queen Habesha
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className={`text-gray-800 hover:text-gray-600 transition-colors px-3 py-2 rounded-md text-sm font-medium
                  ${pathname === item.href ? 'text-blue-600' : ''}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <button
                        className="md:hidden p-2 rounded-md text-gray-800 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
                        aria-label="Navigation Menu"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar; 