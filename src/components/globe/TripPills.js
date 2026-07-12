"use client";

/**
 * The keyboard/screen-reader path AND the mobile discoverability path for
 * trip selection — a 1:1 equivalent of clicking a globe marker.
 * @param {{
 *   trips: any[],
 *   selectedTripId?: string | null,
 *   onSelect: (id: string) => void,
 * }} props
 */
export default function TripPills({ trips, selectedTripId = null, onSelect }) {
    return (
        <div className="flex items-center gap-3">
            {trips.map((trip) => {
                const selected = selectedTripId === trip.id;
                return (
                    <button
                        key={trip.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => onSelect(trip.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border text-white text-sm transition-colors duration-200 hover:bg-white/20"
                        style={{
                            borderColor: selected ? trip.theme.primaryLight : "rgba(255,255,255,0.2)",
                        }}
                    >
                        <span>{trip.emoji}</span>
                        {trip.markerLabel}
                    </button>
                );
            })}
        </div>
    );
}
