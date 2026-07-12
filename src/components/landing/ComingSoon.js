import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Dark placeholder body for hub pages not yet implemented
 * (/viaggi, /wishlist, /diario).
 * @param {{
 *   icon: import('lucide-react').LucideIcon,
 *   title: string,
 *   description: string,
 * }} props
 */
export default function ComingSoon({ icon: Icon, title, description }) {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20"
            style={{
                background: "radial-gradient(ellipse at 50% 35%, #0b1226 0%, #060913 55%, #03050c 100%)",
            }}
        >
            <span className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/25 text-accent flex items-center justify-center mb-6">
                <Icon size={28} />
            </span>
            <h1 className="font-display font-bold text-white text-3xl md:text-4xl">{title}</h1>
            <span className="mt-4 inline-block rounded-full bg-white/[0.06] border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60">
                Presto disponibile
            </span>
            <p className="mt-5 max-w-md text-white/50 text-sm leading-relaxed">{description}</p>
            <Link
                href="/"
                className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong transition-colors"
            >
                <ArrowLeft size={16} />
                Torna all&apos;esplorazione
            </Link>
        </div>
    );
}
