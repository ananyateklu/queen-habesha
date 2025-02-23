'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Our Crew', href: '/#crew' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Contact Us', href: '/#contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Get all sections
            const sections = ['home', 'services', 'crew', 'testimonials', 'contact'];

            // Find the current section
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Add offset to account for navbar height
                    const offset = section === 'home' ? 0 : 96;
                    if (rect.top <= offset && rect.bottom > 0) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (pathname !== '/' && href.startsWith('/#')) {
            return;
        }

        e.preventDefault();

        if (href === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('home');
            return;
        }

        const targetId = href.replace('/#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(targetId);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link
                        href="/"
                        className="flex items-center space-x-3"
                        onClick={(e) => scrollToSection(e, '/')}
                    >
                        <div className="relative w-10 h-10">
                            <Image
                                src="/images/logo-inverted.png"
                                alt="Queen Habesha Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-xl text-white hover:text-gray-200 transition-colors">
                                Queen Habesha
                            </span>
                            <span className="text-sm text-white/80">
                                Hair Braiding
                            </span>
                        </div>
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item) => {
                            const sectionId = item.href.replace('/#', '') || 'home';
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className={`text-white hover:text-yellow-400 transition-colors px-3 py-2 rounded-md text-sm font-medium
                                        ${activeSection === sectionId ? 'text-yellow-400' : ''}`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    <button
                        className="md:hidden p-2 rounded-md text-white hover:text-gray-200 hover:bg-white/10 focus:outline-none"
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