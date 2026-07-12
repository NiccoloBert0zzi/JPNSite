"use client";

import { allTrips } from "@/data";
import HeroCopy from "@/components/landing/HeroCopy";
import StatsPanel from "@/components/landing/StatsPanel";
import TripCardBody from "./TripCardBody";

/**
 * Fully non-3D landing hero: same dark gradient background and hero copy as
 * the globe scene, but every trip is shown as a plain static card grid
 * instead of a globe marker. Used when WebGL is unavailable, the 3D scene
 * errors at runtime, or the user prefers reduced motion on a metered
 * connection.
 */
export default function StaticGlobeFallback() {
    return (
        <section
            className="relative min-h-screen lg:h-full lg:overflow-y-auto flex flex-col items-center pt-28 pb-16 px-5"
            style={{
                background: "radial-gradient(ellipse at 50% 35%, #0b1226 0%, #060913 55%, #03050c 100%)",
            }}
        >
            <div className="w-full max-w-3xl flex flex-col sm:flex-row sm:items-center gap-8 mb-14">
                <HeroCopy />
                <div className="sm:ml-auto w-full sm:max-w-[280px]">
                    <StatsPanel wishlistCount={0} />
                </div>
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
