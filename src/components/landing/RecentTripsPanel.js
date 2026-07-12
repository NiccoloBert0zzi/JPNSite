"use client";

import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { activeTripId } from "@/data";

/** Capitalized "ottobre 2026" → "Ottobre 2026" from an ISO start date. */
function monthYear(isoDate) {
    const formatted = new Date(isoDate).toLocaleDateString("it-IT", {
        month: "long",
        year: "numeric",
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * "Ultimi viaggi" glass card. Each row navigates to the trip (active trip →
 * /itinerary, other trips → their external deployment); the pin button
 * highlights the trip on the globe instead (opens its TripCard) — it also
 * inherits the keyboard/screen-reader trip-selection role the old TripPills had.
 * @param {{
 *   trips: any[],
 *   onShowOnGlobe?: (tripId: string) => void,
 * }} props
 */
export default function RecentTripsPanel({ trips, onShowOnGlobe }) {
    return (
        <section
            aria-label="Ultimi viaggi"
            className="rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] p-5"
        >
            <h2 className="text-sm font-semibold text-white/80 mb-4">Ultimi viaggi</h2>

            <ul className="flex flex-col gap-2">
                {trips.map((trip) => {
                    const isActiveTrip = trip.id === activeTripId;
                    const rowContent = (
                        <>
                            <span
                                className="w-12 h-12 shrink-0 rounded-xl bg-cover bg-center border border-white/10"
                                style={{ backgroundImage: `url('${trip.heroImage}')` }}
                                aria-hidden="true"
                            />
                            <span className="min-w-0 flex-1">
                                <span className="block text-sm font-semibold text-white truncate">
                                    {trip.markerLabel}
                                </span>
                                <span className="block text-xs text-white/50">
                                    {monthYear(trip.startDate)}
                                </span>
                            </span>
                        </>
                    );
                    const rowClass =
                        "flex items-center gap-3 flex-1 min-w-0 rounded-xl p-2 -m-2 hover:bg-white/[0.05] transition-colors";

                    return (
                        <li key={trip.id} className="flex items-center gap-2">
                            {isActiveTrip ? (
                                <Link href="/itinerary" className={rowClass}>
                                    {rowContent}
                                </Link>
                            ) : (
                                <a href={trip.url} className={rowClass}>
                                    {rowContent}
                                </a>
                            )}
                            {onShowOnGlobe && (
                                <button
                                    type="button"
                                    aria-label={`Mostra ${trip.markerLabel} sul globo`}
                                    onClick={() => onShowOnGlobe(trip.id)}
                                    className="w-9 h-9 shrink-0 rounded-full border border-accent/30 text-accent bg-accent/10 hover:bg-accent/20 transition-colors flex items-center justify-center"
                                >
                                    <MapPin size={15} />
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>

            <Link
                href="/viaggi"
                className="mt-4 flex items-center justify-between text-sm font-medium text-accent hover:text-accent-strong transition-colors"
            >
                Vedi tutti
                <ChevronRight size={16} />
            </Link>
        </section>
    );
}
