import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
    { name: 'Me', href: '/#home' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Contact', href: '/#contact' },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300">
            <nav className={cn(
                "max-w-7xl mx-auto rounded-2xl transition-all duration-300",
                "bg-background/70 backdrop-blur-xl",
                "border border-border/50",
                "shadow-sm",
                isScrolled ? "py-2" : "py-3",
            )}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-12">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <a href="/" className="text-xl font-bold text-foreground tracking-tight">
                                Rathdaro
                            </a>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center">
                            <div className="flex items-baseline space-x-2">
                                {navItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="text-foreground/80 hover:text-foreground px-4 py-2 rounded-full text-sm font-semibold transition-colors hover:bg-white/20"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-full text-foreground hover:bg-black/5 focus:outline-none transition-colors"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 10, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 left-4 right-4 md:hidden overflow-hidden bg-background/70 backdrop-blur-3xl border border-white/30 shadow-2xl rounded-3xl"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="block w-full text-center px-4 py-3 rounded-2xl text-base font-semibold text-foreground hover:bg-black/5 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
