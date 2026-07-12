"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";

const hubItems = [
    { name: "Esplora", path: "/" },
    { name: "I miei viaggi", path: "/viaggi" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Diario", path: "/diario" },
];

/**
 * Dark glass navbar for the travel-hub pages (/, /viaggi, /wishlist, /diario).
 * The light site Navbar returns null on these routes.
 */
export default function LandingNavbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
                scrolled || isOpen
                    ? "bg-[#05070f]/80 backdrop-blur-md border-b border-white/[0.06]"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 z-50" onClick={() => setIsOpen(false)}>
                    <span className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent">
                        <Globe size={18} />
                    </span>
                    <span className="text-white text-sm font-semibold tracking-[0.25em] uppercase">
                        I miei viaggi
                    </span>
                </Link>

                {/* Desktop pills */}
                <div className="hidden md:flex items-center gap-1 rounded-full bg-white/[0.04] border border-white/[0.07] p-1">
                    {hubItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                pathname === item.path
                                    ? "bg-accent/15 text-accent border border-accent/30"
                                    : "text-white/60 hover:text-white hover:bg-white/[0.06] border border-transparent"
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Spacer keeps the pill group visually centered (no right-side icons by design) */}
                <div className="hidden md:block w-[172px]" aria-hidden="true" />

                {/* Mobile burger */}
                <button
                    type="button"
                    className="md:hidden z-50 p-2 text-white"
                    aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
                    onClick={() => setIsOpen((v) => !v)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.18 }}
                        className="md:hidden px-5 pb-6 flex flex-col gap-1 bg-[#05070f]/95 backdrop-blur-xl border-b border-white/[0.08]"
                    >
                        {hubItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`py-3 px-3 rounded-xl text-lg font-display font-bold transition-colors ${
                                    pathname === item.path
                                        ? "text-accent bg-accent/10"
                                        : "text-white/80 hover:bg-white/[0.06]"
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
