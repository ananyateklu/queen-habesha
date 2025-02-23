'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navItems = [
    { name: 'Home', href: '/', sectionId: 'home' },
    { name: 'Services', href: '/#services', sectionId: 'services' },
    { name: 'Our Crew', href: '/#crew', sectionId: 'crew' },
    { name: 'Testimonials', href: '/#testimonials', sectionId: 'testimonials' },
    { name: 'Contact Us', href: '/#contact', sectionId: 'contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Find which section is most visible
            let maxVisibility = 0;
            let mostVisibleSection = 'home';

            navItems.forEach(({ sectionId }) => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const total = rect.height;
                    const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
                    const percentage = visible / total;

                    // Special case for home section
                    if (sectionId === 'home' && window.scrollY < 100) {
                        maxVisibility = 1;
                        mostVisibleSection = 'home';
                        return;
                    }

                    // Adjust visibility calculation based on section position
                    const adjustedVisibility = percentage * (1 - Math.abs(rect.top) / window.innerHeight);

                    if (adjustedVisibility > maxVisibility) {
                        maxVisibility = adjustedVisibility;
                        mostVisibleSection = sectionId;
                    }
                }
            });

            setActiveSection(mostVisibleSection);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            const navHeight = 80; // Height of the navbar
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - navHeight,
                behavior: 'smooth'
            });
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
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                            {isMobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`md:hidden ${isScrolled ? 'bg-black/90' : 'bg-black/70'} backdrop-blur-sm border-t border-white/10`}
                    >
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            {navItems.map((item) => {
                                const sectionId = item.href.replace('/#', '') || 'home';
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => handleMobileNavClick(e, item.href)}
                                        className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:text-yellow-400 transition-colors
                                            ${activeSection === sectionId ? 'text-yellow-400 bg-white/5' : ''}`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar; 