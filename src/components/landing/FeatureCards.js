import { Camera, Compass, Share2, Star } from "lucide-react";

const features = [
    {
        icon: Compass,
        tile: "bg-accent/15 text-accent",
        title: "Esplora",
        desc: "Ruota il globo e rivivi ogni destinazione.",
    },
    {
        icon: Star,
        tile: "bg-indigo-400/15 text-indigo-300",
        title: "Sogna",
        desc: "Salva i paesi che vuoi ancora vedere.",
    },
    {
        icon: Camera,
        tile: "bg-pink-400/15 text-pink-300",
        title: "Ricorda",
        desc: "Foto e diari per non dimenticare nulla.",
    },
    {
        icon: Share2,
        tile: "bg-sky-400/15 text-sky-300",
        title: "Condividi",
        desc: "Racconta i tuoi viaggi a chi ami.",
    },
];

/** Decorative feature strip below the globe hero (no navigation yet). */
export default function FeatureCards() {
    return (
        <section className="px-5 lg:px-16 pt-14 pb-4 lg:pt-3 lg:pb-1 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-3">
                {features.map(({ icon: Icon, tile, title, desc }) => (
                    <div
                        key={title}
                        className="flex items-start gap-4 lg:gap-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5 lg:p-3"
                    >
                        <span
                            className={`w-11 h-11 lg:w-8 lg:h-8 shrink-0 rounded-xl flex items-center justify-center ${tile}`}
                        >
                            <Icon size={20} className="lg:hidden" />
                            <Icon size={16} className="hidden lg:block" />
                        </span>
                        <div>
                            <h3 className="text-sm font-semibold text-white">{title}</h3>
                            <p className="mt-1 lg:mt-0.5 text-xs text-white/50 leading-relaxed lg:leading-snug">
                                {desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
