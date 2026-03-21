"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cibo, currentTrip } from '@/data';

export default function CiboPage() {
    const [activeArea, setActiveArea] = useState(cibo[0].id);
    const [activeSection, setActiveSection] = useState(null);

    const area = cibo.find((c) => c.id === activeArea) || cibo[0];

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
                        Guida al Cibo
                    </h1>
                    <p className="text-gray-200 text-xl font-light max-w-xl mx-auto">
                        Cosa mangiare, dove trovarlo e come ordinarlo come un locale.
                    </p>
                </div>
            </div>

            {/* AREA TABS */}
            <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="container mx-auto max-w-5xl px-6">
                    <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
                        {cibo.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => { setActiveArea(c.id); setActiveSection(null); }}
                                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                                style={
                                    activeArea === c.id
                                        ? { backgroundColor: c.accent, color: 'white', boxShadow: `0 4px 14px -4px ${c.accent}88` }
                                        : { backgroundColor: '#f3f4f6', color: '#374151' }
                                }
                            >
                                <span>{c.name}</span>
                                <span className="text-xs opacity-70 font-normal">{c.kanji}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-6 mt-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={area.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* AREA HEADER CARD */}
                        <div className="relative rounded-2xl overflow-hidden shadow-xl mb-10 h-64 md:h-80">
                            <Image
                                src={area.image}
                                alt={area.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${area.accent}cc 0%, transparent 60%)` }} />
                            <div className="absolute bottom-0 left-0 p-8">
                                <div className="flex items-baseline gap-3 mb-1">
                                    <h2 className="text-white text-4xl font-extrabold font-display drop-shadow-md">{area.name}</h2>
                                    <span className="text-white/70 text-xl font-light">{area.kanji}</span>
                                </div>
                                <p className="text-white/90 text-lg font-light drop-shadow">{area.tagline}</p>
                            </div>
                        </div>

                        {/* SECTION FILTER PILLS */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {area.sections.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => setActiveSection(activeSection === s.id ? null : s.id)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200"
                                    style={
                                        activeSection === s.id
                                            ? { backgroundColor: area.accent, color: 'white', borderColor: area.accent }
                                            : { backgroundColor: 'white', color: '#374151', borderColor: '#e5e7eb' }
                                    }
                                >
                                    <span>{s.icon}</span>
                                    <span>{s.title}</span>
                                </button>
                            ))}
                        </div>

                        {/* SECTIONS GRID */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {area.sections
                                .filter((s) => !activeSection || s.id === activeSection)
                                .map((section, i) => (
                                    <motion.div
                                        key={section.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25, delay: i * 0.05 }}
                                        className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
                                        style={{ borderTop: `5px solid ${area.accent}` }}
                                    >
                                        <div className="p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-2xl">{section.icon}</span>
                                                <h3 className="text-lg font-bold text-gray-900 font-display">{section.title}</h3>
                                            </div>

                                            {section.summary && (
                                                <p className="text-gray-600 text-sm leading-relaxed mb-5 pb-5 border-b border-gray-100">
                                                    {section.summary}
                                                </p>
                                            )}

                                            <ul className="space-y-3">
                                                {section.facts.map((fact, fi) => (
                                                    <li key={fi} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                                                        <span
                                                            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                                                            style={{ backgroundColor: area.accent }}
                                                        >
                                                            {fi + 1}
                                                        </span>
                                                        <span>{fact}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
