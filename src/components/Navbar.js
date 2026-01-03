"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = pathname === '/';
    const isTransparent = isHome && !scrolled && !isOpen;

    // Text color classes based on state
    const textColor = isTransparent ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-[var(--primary)]';
    const logoColor = isTransparent ? 'text-white' : 'text-gray-900';
    const activeColor = isTransparent ? 'text-white font-bold' : 'text-[var(--primary)]';
    const burgerColor = isTransparent ? 'text-white' : 'text-gray-700';

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Itinerario', path: '/itinerary' },
        { name: 'Budget', path: '/budget' },
        { name: 'Trasporti', path: '/transport' },
        { name: 'Prenotazioni', path: '/reservations' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${!isTransparent ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className={`font-display font-bold text-2xl tracking-tight z-50 transition-colors ${logoColor}`}>
                    JAPAN <span className={`text-sm align-top ${isTransparent ? 'text-white/80' : 'text-[var(--primary)]'}`}>2026</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-8 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`text-sm font-medium transition-colors ${pathname === item.path ? activeColor : textColor
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}

                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden z-50 p-2 transition-colors ${burgerColor}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Navigation Content */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-0 left-0 w-full h-screen bg-white md:hidden flex flex-col pt-24 px-6 gap-6"
                        >
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-2xl font-display font-bold ${pathname === item.path ? 'text-[var(--primary)]' : 'text-gray-800'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
