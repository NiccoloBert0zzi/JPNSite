"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { activeTripId, tripDurationDays } from "@/data";

/**
 * Shared visual content (image, kicker, title, dates, duration, description,
 * CTA) reused by the floating TripCard and the non-3D StaticGlobeFallback grid.
 * @param {{ trip: any, titleId?: string }} props
 */
export default function TripCardBody({ trip, titleId }) {
    const year = new Date(trip.startDate).getFullYear();
    const isActiveTrip = trip.id === activeTripId;

    return (
        <>
            <div
                className="w-full aspect-video bg-cover bg-center"
                style={{ backgroundImage: `url('${trip.heroImage}')` }}
            />

            <div className="p-6">
                <span
                    className="text-xs uppercase tracking-widest font-semibold"
                    style={{ color: trip.theme.primaryLight }}
                >
                    {trip.markerLabel} · {year}
                </span>
                <h3 id={titleId} className="text-xl md:text-2xl font-display font-bold mt-2 mb-1">
                    {trip.title}
                </h3>
                <p className="text-white/70 text-sm mb-1">{trip.dates}</p>
                <p className="text-white/50 text-xs mb-4">
                    {tripDurationDays(trip)} giorni · {trip.emoji}
                </p>
                <p className="text-white/70 text-sm leading-relaxed mb-6">{trip.shortDescription}</p>

                {isActiveTrip ? (
                    <Link
                        href="/itinerary"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
                    >
                        Apri il viaggio
                    </Link>
                ) : (
                    <a
                        href={trip.url}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-white/10 border border-white/20 font-semibold hover:bg-white/20 transition-colors"
                    >
                        Apri il viaggio
                        <ExternalLink size={16} />
                    </a>
                )}
            </div>
        </>
    );
}
