"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Itinerario', path: '/itinerary' },
        { name: 'Budget', path: '/budget' },
        { name: 'Trasporti', path: '/transport' },
        { name: 'Prenotazioni', path: '/reservations' },
    ];

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link href="/" className="logo">
                    JAPAN <span className="logo-year">2026</span>
                </Link>
                <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? '✕' : '☰'}
                </button>
                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                className={pathname === item.path ? 'active' : ''}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
