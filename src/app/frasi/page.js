"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { frasi, currentTrip } from '@/data';

export default function FrasiPage() {
    const [activeCategory, setActiveCategory] = useState(frasi[0].id);
    const [copied, setCopied] = useState(null);

    const category = frasi.find((c) => c.id === activeCategory) || frasi[0];

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(index);
            setTimeout(() => setCopied(null), 1500);
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* HERO */}
            <div
                className="relative bg-gray-900 text-white pt-32 pb-24 px-6"
                style={{
                    backgroundImage: `url('${currentTrip.heroImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative container mx-auto max-w-5xl z-10 text-center">
                    <Link
                        href="/"
                        className="text-gray-300 hover:text-white text-sm uppercase tracking-wider font-semibold mb-6 inline-flex items-center gap-2 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
                        </svg>
                        Torna alla Home
                    </Link>
                    <h1 className="text-gray-200 text-5xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg font-display">
                        Frasi Utili
                    </h1>
                    <p className="text-gray-200 text-xl font-light max-w-xl mx-auto">
                        Le frasi essenziali con pronuncia fonetica. Toccale per copiarle e mostrarle.
                    </p>
                </div>
            </div>

            {/* CATEGORY TABS */}
            <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="container mx-auto max-w-5xl px-6">
                    <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
                        {frasi.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                                style={
                                    activeCategory === cat.id
                                        ? { backgroundColor: 'var(--primary)', color: 'white', boxShadow: '0 4px 14px -4px var(--primary)88' }
                                        : { backgroundColor: '#f3f4f6', color: '#374151' }
                                }
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-6 mt-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* hint */}
                        <p className="text-xs text-gray-400 text-center mb-6 uppercase tracking-widest font-semibold">
                            Tocca una frase per copiarla e mostrarla al locale
                        </p>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {category.phrases.map((phrase, i) => (
                                <motion.button
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: i * 0.03 }}
                                    onClick={() => handleCopy(phrase.local, i)}
                                    className="relative text-left bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                                    style={{ borderLeft: '4px solid var(--primary)' }}
                                >
                                    {/* copy feedback */}
                                    <AnimatePresence>
                                        {copied === i && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="absolute inset-0 flex items-center justify-center rounded-2xl z-10"
                                                style={{ backgroundColor: 'var(--primary)' }}
                                            >
                                                <span className="text-white font-bold text-sm flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                                                    Copiato!
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="p-4">
                                        {/* Italian */}
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{phrase.it}</p>

                                        {/* Local language — big & readable */}
                                        <p className="text-2xl font-bold text-gray-900 leading-tight mb-2 font-display">
                                            {phrase.local}
                                        </p>

                                        {/* Phonetic */}
                                        <p className="text-sm text-gray-500 italic">
                                            🔊 {phrase.phonetic}
                                        </p>
                                    </div>

                                    {/* copy icon hover */}
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                                        </svg>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
