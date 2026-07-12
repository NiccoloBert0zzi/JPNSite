import { Hand } from "lucide-react";

/** Glass hint pill shown under the globe. */
export default function DragHintPill() {
    return (
        <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 px-4 py-2 text-xs text-white/60">
            <Hand size={14} aria-hidden="true" />
            Trascina, ruota e scopri il mondo
        </div>
    );
}
