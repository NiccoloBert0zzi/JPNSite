import { Map, Wallet, Train, CheckSquare, Landmark, Utensils, Zap } from 'lucide-react';
import { budget } from './budget';

export const home = {
    features: [
        {
            title: "Itinerario Completo",
            desc: "Dettagli giorno per giorno del tuo viaggio.",
            icon: Map,
            href: "/itinerary",
            color: "bg-blue-50 text-blue-600"
        },
        {
            title: "Budget Tracker",
            desc: "Analisi dei costi: Voli, Hotel, Cibo e Attrazioni. Budget Safe: €" + budget.totalSafe.toLocaleString('it-IT'),
            icon: Wallet,
            href: "/budget",
            color: "bg-green-50 text-green-600"
        },
        {
            title: "Logistica & Spostamenti",
            desc: "Strategie di spostamento e dettagli trasporti.",
            icon: Train,
            href: "/transport",
            color: "bg-orange-50 text-orange-600"
        },
        {
            title: "Prenotazioni",
            desc: "Checklist di cose da prenotare e mappa del viaggio.",
            icon: CheckSquare,
            href: "/reservations",
            color: "bg-purple-50 text-purple-600"
        }
    ],
    highlights: [
        { title: "Cultura", img: "/images/culture.png", icon: Landmark },
        { title: "Gastronomia", img: "/images/food.png", icon: Utensils },
        { title: "Esperienze", img: "/images/modern.png", icon: Zap },
    ],
    stats: [
        { label: "Giorni", value: "16" },
        { label: "Città Principali", value: "3" },
        { label: "Budget Stimato", value: "€" + budget.totalSafe.toLocaleString('it-IT') }
    ],
    texts: {
        highlightsTitle: "Highlights",
        highlightsDesc: "Un mix perfetto di tradizione millenaria, natura mozzafiato e innovazione futuristica.",
        planningTitle: "Pianificazione Viaggio",
        planningDesc: "Tutto quello che serve per organizzare il viaggio perfetto, dal budget agli spostamenti."
    }
};
