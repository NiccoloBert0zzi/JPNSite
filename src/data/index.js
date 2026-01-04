
import { itinerary as japanItinerary } from './japan/itinerary';
import { budget as japanBudget } from './japan/budget';
import { transport as japanTransport } from './japan/transport';
import { accommodations as japanAccommodations } from './japan/accommodations';

import { itinerary as budapestItinerary } from './budapest/itinerary';
import { budget as budapestBudget } from './budapest/budget';
import { transport as budapestTransport } from './budapest/transport';
import { accommodations as budapestAccommodations } from './budapest/accommodations';
import { reservations as japanReservations } from './japan/reservations';
import { reservations as budapestReservations } from './budapest/reservations';

const TRIP_ID = process.env.NEXT_PUBLIC_TRIP_ID || 'japan';

// Trip Meta Configuration
const trips = {
    japan: {
        title: "Giappone 2026",
        dates: "03 Ottobre — 16 Ottobre",
        heroImage: "/images/hero.png",
        heroFilter: "brightness(0.7)",
        label: "VIAGGIO DI COPPIA",
        color: "primary"
    },
    budapest: {
        title: "Budapest 2026",
        dates: "08 Febbraio — 10 Febbraio",
        heroImage: "/images/budapest-hero.jpg", // We need a placeholder for this
        heroFilter: "brightness(0.6)",
        label: "WEEKEND FUORI",
        color: "purple"
    }
};

export const currentTrip = trips[TRIP_ID];

export const itinerary = TRIP_ID === 'budapest' ? budapestItinerary : japanItinerary;
export const budget = TRIP_ID === 'budapest' ? budapestBudget : japanBudget;
export const transport = TRIP_ID === 'budapest' ? budapestTransport : japanTransport;
export const accommodations = TRIP_ID === 'budapest' ? budapestAccommodations : japanAccommodations;
export const reservations = TRIP_ID === 'budapest' ? budapestReservations : japanReservations;
