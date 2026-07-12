"use client";

import { useCallback, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { allTrips } from "@/data";
import GlobeScene from "./GlobeScene";
import GlobeErrorBoundary from "./GlobeErrorBoundary";
import StaticGlobeFallback from "./StaticGlobeFallback";
import TripCard from "./TripCard";
import HeroCopy from "@/components/landing/HeroCopy";
import SidePanels from "@/components/landing/SidePanels";
import DragHintPill from "@/components/landing/DragHintPill";

const sortedTrips = [...allTrips].sort((a, b) => b.startDate.localeCompare(a.startDate));

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
            className="relative flex flex-col lg:block lg:h-screen overflow-hidden"
            style={{
                background: "radial-gradient(ellipse at 50% 35%, #0b1226 0%, #060913 55%, #03050c 100%)",
            }}
        >
            {/* Hero copy — left overlay on desktop, first block in the flow on mobile */}
            <div className="px-5 pt-24 pb-4 lg:p-0 lg:absolute lg:left-8 xl:left-16 lg:top-1/2 lg:-translate-y-1/2 lg:z-10 lg:max-w-md lg:pointer-events-none">
                <HeroCopy />
            </div>

            {/* Globe — fills the section on desktop, a 55vh block on mobile */}
            <div className="relative h-[55vh] lg:absolute lg:inset-0 lg:h-auto">
                <GlobeErrorBoundary onError={handleSceneError}>
                    <GlobeScene
                        reducedMotion={!!reducedMotion}
                        onSelectTrip={setSelectedTripId}
                        onBackgroundClick={handleClose}
                        cardOpen={!!selectedTrip}
                    />
                </GlobeErrorBoundary>

                <div className="absolute bottom-3 lg:bottom-6 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                    <DragHintPill />
                </div>
            </div>

            {/* Right column: swapped out with the TripCard while a marker is selected */}
            <div className="py-6 lg:py-0">
                <SidePanels
                    hidden={!!selectedTrip}
                    trips={sortedTrips}
                    onShowOnGlobe={setSelectedTripId}
                    wishlistCount={0}
                />
            </div>

            <TripCard trip={selectedTrip} onClose={handleClose} />
        </section>
    );
}
