'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FaPhone } from 'react-icons/fa';

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Get all sections
            const sections = ['home', 'services', 'crew', 'testimonials', 'contact'];

            // Keep track of the section that's closest to the top
            let closestSection = null;
            let closestDistance = Infinity;

            // Find the current section
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();

                    // Use the distance from top to determine the closest section
                    // Add a large offset (500px) to detect sections well before they reach the viewport
                    const effectiveTop = rect.top - 500;
                    const distance = Math.abs(effectiveTop);

                    // Special case for home section
                    if (section === 'home' && window.scrollY < 100) {
                        closestSection = 'home';
                        break;
                    }

                    // If this section is closer to our detection point than the previous one
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestSection = section;
                    }
                }
            }

            // Update active section if we found one
            if (closestSection) {
                setActiveSection(closestSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Call once to set initial state
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node) && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    // Close mobile menu when clicking a link
    const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setIsMobileMenuOpen(false);
        scrollToSection(e, href);
    };

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
            ref={navRef}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-black/85 backdrop-blur-md shadow-lg py-1'
                : 'bg-gradient-to-b from-black/80 to-transparent py-3'}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 relative">
                    {/* Logo & Brand */}
                    <Link
                        href="/"
                        className="flex items-center space-x-3 group"
                        onClick={(e) => scrollToSection(e, '/')}
                    >
                        <div className="relative w-10 h-10 overflow-hidden">
                            <motion.div
                                whileHover={{
                                    scale: 1.1,
                                    rotate: [0, 5, 0, -5, 0],
                                    transition: { rotate: { repeat: 1, duration: 0.5 } }
                                }}
                            >
                                <Image
                                    src="/images/logo-inverted.png"
                                    alt="Queen Habesha Logo"
                                    fill
                                    sizes="(max-width: 640px) 40px, 40px"
                                    className="object-contain"
                                />
                            </motion.div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-xl text-white group-hover:text-yellow-400 transition-colors duration-300">
                                Queen Habesha
                            </span>
                            <span className="text-xs text-yellow-500/90 tracking-wider font-medium">
                                ETHIOPIAN HAIR BRAIDING
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center">
                        <div className="flex items-center space-x-1 lg:space-x-3">
                            {navItems.map((item) => {
                                const sectionId = item.href.replace('/#', '') || 'home';
                                const isActive = activeSection === sectionId;

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => scrollToSection(e, item.href)}
                                        className="relative px-3 py-2 rounded-md text-sm font-medium overflow-hidden group"
                                    >
                                        <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-yellow-400' : 'text-white group-hover:text-yellow-300'
                                            }`}>
                                            {item.name}
                                        </span>

                                        {/* Golden animated underline */}
                                        {isActive && (
                                            <motion.span
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-600/30 via-yellow-400 to-yellow-600/30 mx-3"
                                                layoutId="navbar-underline"
                                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                            />
                                        )}

                                        {/* Hover background effect with golden gradient */}
                                        <motion.span
                                            className="absolute inset-0 bg-gradient-to-r from-yellow-700/5 via-yellow-500/10 to-yellow-700/5 rounded-md z-0"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    </Link>
                                );
                            })}
                        </div>

                        {/* CTA Button with extra spacing */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="ml-8"
                        >
                            <a
                                href="tel:+13014331934"
                                className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-yellow-600 text-white shadow-sm hover:bg-yellow-500 transition-all duration-300"
                            >
                                <FaPhone className="mr-1.5 text-xs" />
                                <span>Call Now</span>
                            </a>
                        </motion.div>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden p-2 rounded-full text-white hover:text-yellow-400 hover:bg-yellow-600/10 focus:outline-none transition-colors duration-300"
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
                            {isMobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-gradient-to-b from-black/90 to-black/95 backdrop-blur-md border-t border-yellow-500/20 shadow-xl"
                    >
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            {navItems.map((item) => {
                                const sectionId = item.href.replace('/#', '') || 'home';
                                const isActive = activeSection === sectionId;

                                return (
                                    <motion.div
                                        key={item.name}
                                        whileHover={{ x: 6 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={(e) => handleMobileNavClick(e, item.href)}
                                            className={`block px-3 py-2.5 rounded-md text-base font-medium transition-all duration-300 ${isActive
                                                ? 'text-yellow-400 bg-yellow-900/20 border-l-2 border-yellow-400 pl-3'
                                                : 'text-white hover:text-yellow-300 border-l-2 border-transparent'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}

                            {/* Mobile Call Button */}
                            <div className="pt-2 px-3">
                                <a
                                    href="tel:+13014331934"
                                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md text-base font-medium bg-yellow-600 text-white shadow-sm hover:bg-yellow-500 transition-all duration-300"
                                >
                                    <FaPhone className="text-sm" />
                                    <span>Call for Appointment</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar; 