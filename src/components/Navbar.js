"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { currentTrip } from '@/data';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const mainItems = [
    { name: 'Home', path: '/' },
    { name: 'Itinerario', path: '/itinerary' },
    { name: 'Budget', path: '/budget' },
    { name: 'Alloggi', path: '/accommodations' },
    { name: 'Trasporti', path: '/transport' },
    { name: 'Prenotazioni', path: '/reservations' },
];

const scopriItems = [
    { name: 'Cultura', path: '/cultura', emoji: '🏯' },
    { name: 'Cibo', path: '/cibo', emoji: '🍜' },
    { name: 'Info Pratiche', path: '/info', emoji: '📋' },
    { name: 'Frasi Utili', path: '/frasi', emoji: '💬' },
    { name: 'Galleria', path: '/gallery', emoji: '📷' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const isTransparent = !scrolled && !isOpen;
    const textColor = isTransparent ? 'text-white/90 hover:text-white' : 'text-gray-600 hover:text-[var(--primary)]';
    const logoColor = isTransparent ? 'text-white' : 'text-gray-900';
    const activeColor = isTransparent ? 'text-white font-bold' : 'text-[var(--primary)]';
    const burgerColor = isTransparent ? 'text-white' : 'text-gray-700';

    const isScopriActive = scopriItems.some((i) => i.path === pathname);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                !isTransparent ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className={`font-display font-bold text-2xl tracking-tight z-50 transition-colors ${logoColor}`}
                >
                    {currentTrip.title}
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-5 items-center">
                    {mainItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`text-sm font-medium transition-colors ${
                                pathname === item.path ? activeColor : textColor
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* Scopri dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen((v) => !v)}
                            className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                                isScopriActive ? activeColor : textColor
                            }`}
                        >
                            Scopri
                            <ChevronDown
                                size={14}
                                className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                                >
                                    {scopriItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            href={item.path}
                                            onClick={() => setDropdownOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-50 ${
                                                pathname === item.path
                                                    ? 'text-[var(--primary)] bg-gray-50'
                                                    : 'text-gray-700'
                                            }`}
                                        >
                                            <span>{item.emoji}</span>
                                            {item.name}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden z-50 p-2 transition-colors ${burgerColor}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Navigation Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-0 left-0 w-full h-screen bg-white md:hidden flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
                        >
                            {/* Main links */}
                            <div className="flex flex-col gap-1">
                                {mainItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-xl font-display font-bold py-2 transition-colors ${
                                            pathname === item.path ? 'text-[var(--primary)]' : 'text-gray-800'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Divider + Scopri group */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                                    Scopri
                                </p>
                                <div className="flex flex-col gap-1">
                                    {scopriItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            href={item.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center gap-3 text-xl font-display font-bold py-2 transition-colors ${
                                                pathname === item.path ? 'text-[var(--primary)]' : 'text-gray-800'
                                            }`}
                                        >
                                            <span className="text-base">{item.emoji}</span>
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
