"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Left-side hero copy of the travel-hub landing: headline, subtitle,
 * decorative CTA ("Aggiungi un viaggio" does nothing yet) and the
 * handwritten "Inizia da qui!" annotation.
 */
export default function HeroCopy() {
    const reducedMotion = useReducedMotion();

    return (
        <motion.div
            variants={reducedMotion ? undefined : { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            initial={reducedMotion ? false : "hidden"}
            animate="show"
            className="max-w-md"
        >
            <motion.h1
                variants={reducedMotion ? undefined : item}
                className="font-display font-bold text-white text-4xl md:text-5xl xl:text-6xl leading-[1.08]"
            >
                Ogni viaggio
                <br />
                lascia un <span className="text-accent">segno.</span>
            </motion.h1>

            <motion.p
                variants={reducedMotion ? undefined : item}
                className="mt-5 text-white/60 text-base md:text-lg leading-relaxed"
            >
                Aggiungi i luoghi che hai visitato o che sogni di esplorare.{" "}
                <br className="hidden md:block" />
                Crea la tua mappa del mondo, un ricordo alla volta.
            </motion.p>

            <motion.div variants={reducedMotion ? undefined : item} className="mt-8">
                <button
                    type="button"
                    title="Presto disponibile"
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-accent text-[#04110b] font-semibold px-7 py-3.5 shadow-[0_8px_30px_-8px_var(--hub-accent)] hover:bg-accent-strong transition-colors cursor-default"
                >
                    <Plus size={18} />
                    Aggiungi un viaggio
                </button>

                <div className="mt-3 ml-10 flex items-start gap-1 select-none" aria-hidden="true">
                    <svg
                        width="34"
                        height="44"
                        viewBox="0 0 34 44"
                        fill="none"
                        className="text-accent -mt-4"
                    >
                        <path
                            d="M8 42 C 2 28, 8 12, 20 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M12 6 L 20 4 L 21 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                    </svg>
                    <span className="font-hand text-accent text-2xl -rotate-6 mt-3">Inizia da qui!</span>
                </div>
            </motion.div>
        </motion.div>
    );
}
