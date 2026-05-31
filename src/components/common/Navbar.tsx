import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
    { name: 'Me', href: '/#me' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Contact', href: '/#contact' },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('me');

    useEffect(() => {
        const handleScroll = () => {
            // Only run scroll spy on the homepage
            if (window.location.pathname !== '/') {
                setActiveSection('');
                return;
            }

            const sections = navItems.map(item => item.href.split('#')[1]);
            const scrollPosition = window.scrollY + 150; // Increased offset 
            
            // Check if at the very bottom of page
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
            if (isAtBottom) {
                setActiveSection(sections[sections.length - 1]);
                return;
            }

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-end h-20">
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center">
                        <div className="flex items-baseline space-x-12">
                            {navItems.map((item) => {
                                const sectionId = item.href.split('#')[1];
                                const isActive = activeSection === sectionId;
                                
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "relative px-1 py-2 text-sm font-semibold transition-colors duration-300 tracking-wide uppercase",
                                            isActive ? "text-primary" : "text-foreground/40 hover:text-foreground"
                                        )}
                                    >
                                        {item.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeUnderline"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center w-full justify-end">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-full text-foreground hover:bg-black/5 transition-colors focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-20 left-4 right-4 md:hidden overflow-hidden bg-background/90 backdrop-blur-2xl border border-border/50 shadow-2xl rounded-3xl z-40"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navItems.map((item) => {
                                const sectionId = item.href.split('#')[1];
                                const isActive = activeSection === sectionId;
                                
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "block w-full text-center px-4 py-4 rounded-2xl text-lg font-bold transition-all duration-300",
                                            isActive ? "text-primary bg-primary/5 scale-105" : "text-foreground/60 active:scale-95"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
