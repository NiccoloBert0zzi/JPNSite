import { Map, Wallet, Train, CheckSquare, Landmark, Utensils, Zap } from 'lucide-react';
import { budget } from './budget';

// Placeholder until we have real budget data for Budapest
const safeBudget = 300;

export const home = {
    features: [
        {
            title: "Itinerario Weekend",
            desc: "Scopri il piano perfetto per 3 giorni a Budapest.",
            icon: Map,
            href: "/itinerary",
            color: "bg-blue-50 text-blue-600"
        },
        {
            title: "Budget & Spese",
            desc: "Monitoraggio costi per volo, hotel e terme.",
            icon: Wallet,
            href: "/budget",
            color: "bg-green-50 text-green-600"
        },
        {
            title: "Trasporti",
            desc: "Come muoversi tra Buda e Pest.",
            icon: Train,
            href: "/transport",
            color: "bg-orange-50 text-orange-600"
        },
        {
            title: "Prenotazioni",
            desc: "Voli, Hotel e Terme prenotate.",
            icon: CheckSquare,
            href: "/reservations",
            color: "bg-purple-50 text-purple-600"
        }
    ],
    highlights: [
        { title: "Terme", img: "/images/budapest-baths.png", icon: Zap },
        { title: "Architettura", img: "/images/budapest-parliament.png", icon: Landmark },
        { title: "Cibo & Vino", img: "/images/budapest-food.png", icon: Utensils },
    ],
    stats: [
        { label: "Giorni", value: "3" },
        { label: "Città", value: "1" },
        { label: "Budget", value: "€" + safeBudget.toLocaleString('it-IT') }
    ],
    texts: {
        highlightsTitle: "Perla del Danubio",
        highlightsDesc: "Terme rilassanti, architettura maestosa e una vibrante vita notturna nei ruin pubs.",
        planningTitle: "Organizzazione Weekend",
        planningDesc: "Tutti i dettagli per godersi al meglio Budapest senza pensieri."
    }
};
