import { Heart } from "lucide-react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import ComingSoon from "@/components/landing/ComingSoon";

export const metadata = {
    title: "Wishlist | Presto disponibile",
};

export default function WishlistPage() {
    return (
        <>
            <LandingNavbar />
            <ComingSoon
                icon={Heart}
                title="Wishlist"
                description="I paesi che sogni di visitare, tutti in un posto: aggiungili da un catalogo e guardali comparire tra i tuoi sogni nel cassetto."
            />
        </>
    );
}
