"use client";

import { currentTrip, allTrips } from "@/data";
import Countdown from "@/components/Countdown";
import TripCardBody from "./TripCardBody";

/**
 * Fully non-3D landing hero: same dark gradient background, same title and
 * countdown, but every trip is shown as a plain static card grid instead of
 * a globe marker. Used when WebGL is unavailable, the 3D scene errors at
 * runtime, or the user prefers reduced motion on a metered connection.
 */
export default function StaticGlobeFallback() {
    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 px-4"
            style={{
                background: "radial-gradient(ellipse at 50% 35%, #0b1226 0%, #060913 55%, #03050c 100%)",
            }}
        >
            <div className="flex flex-col items-center text-center mb-16">
                <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-wider mb-4">
                    {currentTrip.label}
                </span>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white drop-shadow-lg mb-3">
                    {currentTrip.title}
                </h1>
                <p className="text-lg text-white/80 font-light tracking-wide mb-6">{currentTrip.dates}</p>
                <Countdown startDate={currentTrip.startDate} />
            </div>

            <h2 className="sr-only">I nostri viaggi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
                {allTrips.map((trip) => (
                    <div
                        key={trip.id}
                        className="rounded-2xl overflow-hidden bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] text-white"
                    >
                        <TripCardBody trip={trip} />
                    </div>
                ))}
            </div>
        </section>
    );
}
