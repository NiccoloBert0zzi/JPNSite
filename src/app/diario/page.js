import { BookOpen } from "lucide-react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import ComingSoon from "@/components/landing/ComingSoon";

export const metadata = {
    title: "Diario | Presto disponibile",
};

export default function DiarioPage() {
    return (
        <>
            <LandingNavbar />
            <ComingSoon
                icon={BookOpen}
                title="Diario"
                description="Un diario di viaggio con pagine da sfogliare: foto, date e ricordi giorno per giorno, come un quaderno vero."
            />
        </>
    );
}
