"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import StatsPanel from "./StatsPanel";
import RecentTripsPanel from "./RecentTripsPanel";

const DESKTOP_QUERY = "(min-width: 1024px)";

function useIsDesktopViewport() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(DESKTOP_QUERY);
        const update = () => setIsDesktop(mediaQuery.matches);
        update();
        mediaQuery.addEventListener("change", update);
        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    return isDesktop;
}

/**
 * Right-hand column of the landing: "I tuoi numeri" + "Ultimi viaggi".
 * Desktop: absolute overlay next to the globe; slides out while a TripCard
 * is open (they share the same screen slot) and back in on close.
 * Mobile/tablet: static in-flow block, never hidden — the TripCard bottom
 * sheet simply overlays it.
 * @param {{
 *   hidden: boolean,
 *   trips: any[],
 *   onShowOnGlobe: (tripId: string) => void,
 *   wishlistCount?: number,
 * }} props
 */
export default function SidePanels({ hidden, trips, onShowOnGlobe, wishlistCount = 0 }) {
    const isDesktop = useIsDesktopViewport();
    const reducedMotion = useReducedMotion();

    return (
        <div className="lg:absolute lg:right-6 xl:right-12 lg:top-24 lg:bottom-24 lg:w-[300px] xl:w-[330px] lg:z-20 px-5 lg:px-0 lg:pointer-events-none">
            <AnimatePresence>
                {(!hidden || !isDesktop) && (
                    <motion.div
                        initial={reducedMotion || !isDesktop ? false : { opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="flex flex-col gap-4 lg:max-h-full lg:overflow-y-auto lg:pointer-events-auto"
                    >
                        <StatsPanel wishlistCount={wishlistCount} />
                        <RecentTripsPanel trips={trips} onShowOnGlobe={onShowOnGlobe} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
