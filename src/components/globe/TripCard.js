"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import TripCardBody from "./TripCardBody";

const MOBILE_QUERY = "(max-width: 767px)";
const SHEET_DISMISS_OFFSET = 120;
const SHEET_DISMISS_VELOCITY = 500;

function useIsMobileViewport() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(MOBILE_QUERY);
        const update = () => setIsMobile(mediaQuery.matches);
        update();
        mediaQuery.addEventListener("change", update);
        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    return isMobile;
}

/**
 * Fixed floating card opened by a marker or pill click. DOM, not
 * marker-tracking — Flighty-style, always in the same screen position.
 * Right-fixed panel on desktop/tablet, a draggable bottom sheet on mobile.
 * @param {{
 *   trip: any | null,
 *   onClose: () => void,
 * }} props
 */
export default function TripCard({ trip, onClose }) {
    const cardRef = useRef(/** @type {HTMLDivElement | null} */ (null));
    const previouslyFocused = useRef(/** @type {HTMLElement | null} */ (null));
    const isMobile = useIsMobileViewport();

    useEffect(() => {
        if (!trip) return undefined;

        previouslyFocused.current = /** @type {HTMLElement | null} */ (document.activeElement);
        cardRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            previouslyFocused.current?.focus?.();
        };
    }, [trip, onClose]);

    const handleDragEnd = (_event, info) => {
        if (info.offset.y > SHEET_DISMISS_OFFSET || info.velocity.y > SHEET_DISMISS_VELOCITY) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {trip && (
                // Non-animated flex wrapper handles fixed positioning + alignment;
                // framer-motion's own transform (entrance/exit y + scale, or drag)
                // lives on the card below so the two never fight over `transform`.
                <div
                    className={
                        isMobile
                            ? "fixed inset-0 z-30 flex items-end justify-center pointer-events-none"
                            : "fixed inset-0 z-30 flex items-center justify-end pr-6 xl:pr-12 pointer-events-none"
                    }
                >
                    <motion.div
                        ref={cardRef}
                        key={trip.id}
                        role="dialog"
                        aria-modal="false"
                        aria-labelledby={`trip-card-title-${trip.id}`}
                        tabIndex={-1}
                        drag={isMobile ? "y" : false}
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.4 }}
                        onDragEnd={isMobile ? handleDragEnd : undefined}
                        initial={isMobile ? { opacity: 0, y: "100%" } : { opacity: 0, y: 24, scale: 0.96 }}
                        animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
                        exit={isMobile ? { opacity: 0, y: "100%" } : { opacity: 0, y: 12, scale: 0.97 }}
                        transition={
                            isMobile
                                ? { type: "spring", stiffness: 320, damping: 34 }
                                : { type: "spring", stiffness: 300, damping: 30 }
                        }
                        className={
                            isMobile
                                ? "pointer-events-auto w-full max-h-[70vh] overflow-y-auto rounded-t-3xl bg-[#0b0f1a]/95 backdrop-blur-xl border-t border-white/[0.12] text-white outline-none"
                                : "pointer-events-auto w-[90vw] max-w-[360px] rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] text-white overflow-hidden shadow-2xl outline-none"
                        }
                    >
                        {isMobile && (
                            <div className="flex justify-center pt-3 pb-1" aria-hidden="true">
                                <div className="w-10 h-1.5 rounded-full bg-white/25" />
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Chiudi"
                            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                        >
                            <X size={16} />
                        </button>

                        <TripCardBody trip={trip} titleId={`trip-card-title-${trip.id}`} />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
