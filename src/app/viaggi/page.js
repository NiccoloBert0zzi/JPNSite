import { Luggage } from "lucide-react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import ComingSoon from "@/components/landing/ComingSoon";

export const metadata = {
    title: "I miei viaggi | Presto disponibile",
};

export default function ViaggiPage() {
    return (
        <>
            <LandingNavbar />
            <ComingSoon
                icon={Luggage}
                title="I miei viaggi"
                description="Qui troverai il riepilogo di tutti i tuoi viaggi: copertine, date, durata e un click per rivivere ognuno di essi."
            />
        </>
    );
}
