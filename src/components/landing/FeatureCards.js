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
        <section className="px-5 lg:px-16 pt-14 pb-4 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {features.map(({ icon: Icon, tile, title, desc }) => (
                    <div
                        key={title}
                        className="flex items-start gap-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5"
                    >
                        <span className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${tile}`}>
                            <Icon size={20} />
                        </span>
                        <div>
                            <h3 className="text-sm font-semibold text-white">{title}</h3>
                            <p className="mt-1 text-xs text-white/50 leading-relaxed">{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
