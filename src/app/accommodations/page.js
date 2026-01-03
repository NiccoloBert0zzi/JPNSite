import React from 'react';
import Link from 'next/link';
import { accommodations } from '@/data/accommodations';
import { MapPin, Calendar, CreditCard, ExternalLink } from 'lucide-react';

export default function AccommodationsPage() {
    const totalCost = accommodations.reduce((acc, item) => acc + item.price, 0);
    const totalNights = accommodations.reduce((acc, item) => acc + item.nights, 0);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* HERO SECTION */}
            <div
                className="relative bg-gray-900 text-white pt-32 pb-24 px-6"
                style={{
                    backgroundImage: "url('/images/hero.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative container mx-auto max-w-5xl z-10">
                    <Link href="/" className="text-gray-300 hover:text-white text-sm uppercase tracking-wider font-semibold mb-6 inline-flex items-center gap-2 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                        Torna alla Home
                    </Link>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mt-4">
                        <div>
                            <h1 className="text-gray-200 text-5xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg font-display">Alloggi & Hotel</h1>
                            <p className="text-gray-200 text-xl font-light max-w-xl text-shadow-sm">Le nostre basi operative. Selezionate per posizione strategica e comfort.</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex gap-10 border border-white/20 shadow-xl transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl hover:scale-105 group cursor-default">
                            <div className="text-center md:text-left transition-transform duration-300 group-hover:-translate-y-1">
                                <p className="text-gray-300 text-xs uppercase tracking-wider font-bold mb-1 transition-colors group-hover:text-white">Totale Notti</p>
                                <p className="text-3xl font-bold text-white transition-all group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{totalNights}</p>
                            </div>
                            <div className="w-px bg-white/20 h-auto"></div>
                            <div className="text-center md:text-left transition-transform duration-300 group-hover:-translate-y-1 delay-75">
                                <p className="text-gray-300 text-xs uppercase tracking-wider font-bold mb-1 transition-colors group-hover:text-white">Budget Totale</p>
                                <p className="text-3xl font-bold text-[var(--primary)] text-shadow-sm transition-all group-hover:text-red-400 group-hover:drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">€ {totalCost.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LIST SECTION */}
            <div className="relative z-20 mt-8">
                <div className="container mx-auto max-w-5xl px-6">
                    <div className="space-y-12">
                        {accommodations.map((hotel) => (
                            <div key={hotel.id} className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row transform transition-all hover:-translate-y-1 hover:shadow-2xl border border-gray-100 group">

                                {/* IMAGE */}
                                <div className="md:w-5/12 min-h-[300px] relative overflow-hidden">
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                                    <div className="absolute top-5 left-5">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${hotel.status === 'booked'
                                            ? 'bg-[var(--primary)] text-white'
                                            : 'bg-gray-800 text-white'
                                            }`}>
                                            {hotel.status === 'booked' ? 'Confermato' : 'In Attesa'}
                                        </span>
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="p-8 md:w-7/12 flex flex-col justify-between relative">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-[var(--primary)] text-xs font-bold uppercase tracking-[0.2em] mb-2">{hotel.city}</h3>
                                                <h2 className="text-3xl font-bold text-gray-900 font-display leading-tight">{hotel.name}</h2>
                                            </div>
                                            <div className="text-right pl-4">
                                                <span className="block text-3xl font-bold text-gray-900">€{hotel.price}</span>
                                                <span className="text-gray-400 text-sm font-medium">{hotel.nights} notti</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 mt-6">
                                            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                <Calendar className="w-5 h-5 text-gray-400" />
                                                <span className="font-medium">{new Date(hotel.checkIn).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })} — {new Date(hotel.checkOut).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600 px-3">
                                                <MapPin className="w-5 h-5 text-[var(--primary)]" />
                                                <span className="truncate border-b border-dashed border-gray-300 pb-0.5">{hotel.address}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {hotel.features.map(f => (
                                                <span key={f} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs rounded-full font-semibold uppercase tracking-wide">
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-8 flex gap-4 pt-6 border-t border-gray-100">
                                        <a
                                            href={hotel.googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3.5 rounded-xl font-bold text-center hover:border-gray-900 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 group/btn"
                                        >
                                            <MapPin className="w-4 h-4 text-gray-400 group-hover/btn:text-gray-900 transition-colors" />
                                            Mappa
                                        </a>
                                        {hotel.website && (
                                            <a
                                                href={hotel.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 bg-[var(--primary)] text-white px-6 py-3.5 rounded-xl font-bold text-center hover:bg-[var(--primary-light)] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                            >
                                                Sito Ufficiale
                                            </a>
                                        )}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
