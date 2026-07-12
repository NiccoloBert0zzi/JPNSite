"use client";

import { Luggage, MapPin, Sparkles } from "lucide-react";
import { landingStats } from "@/data";

/**
 * "I tuoi numeri" glass card: real stats derived from the trips registry.
 * @param {{ wishlistCount?: number }} props - wishlist size; hardcoded 0
 *   until the /wishlist plan wires it to the database.
 */
export default function StatsPanel({ wishlistCount = 0 }) {
    const { countriesVisited, tripsCompleted } = landingStats();

    const rows = [
        {
            icon: MapPin,
            tile: "bg-accent/15 text-accent",
            value: countriesVisited,
            label: "Paesi visitati",
        },
        {
            icon: Luggage,
            tile: "bg-indigo-400/15 text-indigo-300",
            value: tripsCompleted,
            label: "Viaggi completati",
        },
        {
            icon: Sparkles,
            tile: "bg-pink-400/15 text-pink-300",
            value: wishlistCount,
            label: "Sogni nel cassetto",
        },
    ];

    return (
        <section
            aria-label="I tuoi numeri"
            className="rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] p-5"
        >
            <h2 className="text-sm font-semibold text-white/80 mb-4">I tuoi numeri</h2>
            <ul className="flex flex-col gap-4">
                {rows.map(({ icon: Icon, tile, value, label }) => (
                    <li key={label} className="flex items-center gap-3">
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${tile}`}>
                            <Icon size={18} />
                        </span>
                        <div>
                            <p className="text-2xl font-bold text-white leading-none">{value}</p>
                            <p className="text-xs text-white/50 mt-1">{label}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
