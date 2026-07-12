"use client";

import TripMarker from "./TripMarker";

/**
 * @param {{
 *   trips: any[],
 *   reducedMotion?: boolean,
 *   onSelect?: (id: string) => void,
 * }} props
 */
export default function TripMarkers({ trips, reducedMotion = false, onSelect }) {
    return (
        <>
            {trips.map((trip) => (
                <TripMarker key={trip.id} trip={trip} reducedMotion={reducedMotion} onSelect={onSelect} />
            ))}
        </>
    );
}
