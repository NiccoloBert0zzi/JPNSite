"use client";
import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { gallery, currentTrip } from '@/data';

export default function GalleryPage() {
    const [activeAlbum, setActiveAlbum] = useState(gallery[0].id);
    const [lightbox, setLightbox] = useState(/** @type {null|{src:string,caption:string}} */ (null));
    const fileInputRef = useRef(null);

    const album = gallery.find((a) => a.id === activeAlbum) || gallery[0];
    const totalPhotos = gallery.reduce((acc, a) => acc + a.photos.length, 0);
    const isEmpty = totalPhotos === 0;

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
                        Galleria Foto
                    </h1>
                    <p className="text-gray-200 text-xl font-light max-w-xl mx-auto">
                        {isEmpty ? 'I ricordi del viaggio — da riempire al ritorno.' : `${totalPhotos} foto`}
                    </p>
                </div>
            </div>

            {/* ALBUM TABS */}
            <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="container mx-auto max-w-5xl px-6">
                    <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
                        {gallery.map((a) => (
                            <button
                                key={a.id}
                                onClick={() => setActiveAlbum(a.id)}
                                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                                style={
                                    activeAlbum === a.id
                                        ? { backgroundColor: a.coverColor, color: 'white', boxShadow: `0 4px 14px -4px ${a.coverColor}88` }
                                        : { backgroundColor: '#f3f4f6', color: '#374151' }
                                }
                            >
                                <span>{a.emoji}</span>
                                <span>{a.name}</span>
                                {a.photos.length > 0 && (
                                    <span className="text-xs opacity-70">({a.photos.length})</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-6 mt-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={album.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                    >
                        {album.photos.length === 0 ? (
                            /* Empty state */
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div
                                    className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-6 shadow-lg"
                                    style={{ backgroundColor: `${album.coverColor}22` }}
                                >
                                    {album.emoji}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 font-display mb-2">
                                    Nessuna foto ancora
                                </h2>
                                <p className="text-gray-400 max-w-sm leading-relaxed">
                                    Le foto di <strong>{album.name}</strong> appariranno qui dopo il viaggio.
                                    Aggiungi le immagini nel file <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">src/data/*/gallery.js</code>.
                                </p>

                                {/* Placeholder grid */}
                                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 w-full opacity-20">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="aspect-square rounded-xl"
                                            style={{ backgroundColor: album.coverColor, opacity: 0.3 + (i % 3) * 0.15 }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            /* Photo masonry grid */
                            <div className="columns-2 md:columns-3 gap-3 space-y-3">
                                {album.photos.map((photo, i) => (
                                    <motion.button
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.2, delay: i * 0.03 }}
                                        onClick={() => setLightbox(photo)}
                                        className="block w-full break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                                    >
                                        <Image
                                            src={photo.src}
                                            alt={photo.caption || ''}
                                            width={600}
                                            height={400}
                                            className="w-full h-auto object-cover"
                                        />
                                        {photo.caption && (
                                            <p className="px-3 py-2 text-xs text-gray-500 bg-white text-left">
                                                {photo.caption}
                                            </p>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* LIGHTBOX */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative max-w-4xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={lightbox.src}
                                alt={lightbox.caption || ''}
                                width={1200}
                                height={800}
                                className="rounded-xl w-full h-auto object-contain max-h-[80vh]"
                            />
                            {lightbox.caption && (
                                <p className="text-white/80 text-sm text-center mt-3">{lightbox.caption}</p>
                            )}
                            <button
                                onClick={() => setLightbox(null)}
                                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* suppress unused ref warning — kept for future upload feature */}
            <span ref={fileInputRef} className="hidden" />
        </div>
    );
}
