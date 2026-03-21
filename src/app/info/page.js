"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { info, currentTrip } from '@/data';
import CurrencyCalculator from '@/components/CurrencyCalculator';

export default function InfoPage() {
    const [activeSection, setActiveSection] = useState(null);
    const [expandedItem, setExpandedItem] = useState(null);

    const displayed = activeSection
        ? info.filter((s) => s.id === activeSection)
        : info;

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
                        Info Pratiche
                    </h1>
                    <p className="text-gray-200 text-xl font-light max-w-xl mx-auto">
                        Tutto quello che devi sapere prima e durante il viaggio.
                    </p>
                </div>
            </div>

            {/* FILTER PILLS */}
            <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="container mx-auto max-w-5xl px-6">
                    <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
                        <button
                            onClick={() => setActiveSection(null)}
                            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                            style={
                                !activeSection
                                    ? { backgroundColor: 'var(--primary)', color: 'white' }
                                    : { backgroundColor: '#f3f4f6', color: '#374151' }
                            }
                        >
                            Tutte
                        </button>
                        {info.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setActiveSection(activeSection === s.id ? null : s.id)}
                                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                                style={
                                    activeSection === s.id
                                        ? { backgroundColor: 'var(--primary)', color: 'white' }
                                        : { backgroundColor: '#f3f4f6', color: '#374151' }
                                }
                            >
                                <span>{s.icon}</span>
                                <span>{s.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-6 mt-10">
                <CurrencyCalculator
                    currencies={currentTrip.title.toLowerCase().includes('budapest') ? ['HUF'] : ['JPY']}
                />
                <div className="grid gap-6 md:grid-cols-2">
                    <AnimatePresence mode="popLayout">
                        {displayed.map((section, i) => (
                            <motion.div
                                key={section.id}
                                layout
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.25, delay: i * 0.04 }}
                                className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden ${activeSection === section.id ? 'md:col-span-2' : ''}`}
                                style={{ borderTop: '5px solid var(--primary)' }}
                            >
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">{section.icon}</span>
                                        <h2 className="text-lg font-bold text-gray-900 font-display">{section.title}</h2>
                                    </div>

                                    {section.summary && (
                                        <p className="text-gray-500 text-sm leading-relaxed mb-5 pb-5 border-b border-gray-100">
                                            {section.summary}
                                        </p>
                                    )}

                                    {/* Items */}
                                    <div className="space-y-2">
                                        {section.items.map((item, idx) => {
                                            const key = `${section.id}-${idx}`;
                                            const isOpen = expandedItem === key;
                                            return (
                                                <div key={idx} className="rounded-xl border border-gray-100 overflow-hidden">
                                                    <button
                                                        onClick={() => setExpandedItem(isOpen ? null : key)}
                                                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span
                                                                className="w-2 h-2 rounded-full flex-shrink-0"
                                                                style={{ backgroundColor: 'var(--primary)' }}
                                                            />
                                                            <span className="text-sm font-semibold text-gray-800">{item.label}</span>
                                                        </div>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                                        >
                                                            <path d="M6 9l6 6 6-6" />
                                                        </svg>
                                                    </button>
                                                    <AnimatePresence>
                                                        {isOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <p className="px-4 pb-4 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                                                                    {item.text}
                                                                </p>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
