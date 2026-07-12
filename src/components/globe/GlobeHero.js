"use client";

import { useCallback, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { allTrips } from "@/data";
import GlobeScene from "./GlobeScene";
import GlobeErrorBoundary from "./GlobeErrorBoundary";
import StaticGlobeFallback from "./StaticGlobeFallback";
import TripPills from "./TripPills";
import TripCard from "./TripCard";

export default function GlobeHero() {
    const reducedMotion = useReducedMotion();
    const [selectedTripId, setSelectedTripId] = useState(/** @type {string | null} */ (null));
    const [sceneError, setSceneError] = useState(false);
    const handleClose = useCallback(() => setSelectedTripId(null), []);
    const handleSceneError = useCallback(() => setSceneError(true), []);
    const selectedTrip = allTrips.find((trip) => trip.id === selectedTripId) ?? null;

    if (sceneError) {
        return <StaticGlobeFallback />;
    }

    return (
        <section
            className="relative h-screen overflow-hidden"
            style={{
                background: "radial-gradient(ellipse at 50% 35%, #0b1226 0%, #060913 55%, #03050c 100%)",
            }}
        >
            <GlobeErrorBoundary onError={handleSceneError}>
                <GlobeScene
                    reducedMotion={!!reducedMotion}
                    onSelectTrip={setSelectedTripId}
                    onBackgroundClick={handleClose}
                    cardOpen={!!selectedTrip}
                />
            </GlobeErrorBoundary>

            <div className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none pb-12 px-4">
                <h1 className="sr-only">I nostri viaggi</h1>

                <div className="pointer-events-auto">
                    <TripPills trips={allTrips} selectedTripId={selectedTripId} onSelect={setSelectedTripId} />
                </div>
            </div>

            <TripCard trip={selectedTrip} onClose={handleClose} />
        </section>
    );
}
