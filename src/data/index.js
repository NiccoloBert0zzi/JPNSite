import { itinerary as japanItinerary } from './japan/itinerary';
import { budget as japanBudget } from './japan/budget';
import { transport as japanTransport } from './japan/transport';
import { accommodations as japanAccommodations } from './japan/accommodations';
import { reservations as japanReservations } from './japan/reservations';
import { home as japanHome } from './japan/home';

import { itinerary as budapestItinerary } from './budapest/itinerary';
import { budget as budapestBudget } from './budapest/budget';
import { transport as budapestTransport } from './budapest/transport';
import { accommodations as budapestAccommodations } from './budapest/accommodations';
import { reservations as budapestReservations } from './budapest/reservations';
import { home as budapestHome } from './budapest/home';

const TRIP_ID = process.env.NEXT_PUBLIC_TRIP_ID || 'japan';

// Trip Meta Configuration
const trips = {
    japan: {
        title: "Giappone 2026",
        dates: "02 Ottobre — 17 Ottobre",
        startDate: "2026-10-02",
        emoji: "🇯🇵",
        heroImage: "/images/hero.png",
        heroFilter: "brightness(0.7)",
        label: "VIAGGIO DI COPPIA",
        color: "primary",
        theme: {
            primary: "#A40024",
            primaryLight: "#D62F4D"
        }
    },
    budapest: {
        title: "Budapest 2026",
        dates: "08 Febbraio — 10 Febbraio",
        startDate: "2026-02-08",
        emoji: "🇭🇺",
        heroImage: "/images/budapest-hero.png",
        heroFilter: "brightness(0.6)",
        label: "WEEKEND FUORI",
        color: "green",
        theme: {
            primary: "#008751", // Hungarian Green
            primaryLight: "#00A663"
        }
    }
};

export const currentTrip = trips[TRIP_ID];

export const itinerary = TRIP_ID === 'budapest' ? budapestItinerary : japanItinerary;
export const budget = TRIP_ID === 'budapest' ? budapestBudget : japanBudget;
export const transport = TRIP_ID === 'budapest' ? budapestTransport : japanTransport;
export const accommodations = TRIP_ID === 'budapest' ? budapestAccommodations : japanAccommodations;
export const reservations = TRIP_ID === 'budapest' ? budapestReservations : japanReservations;
export const homeData = TRIP_ID === 'budapest' ? budapestHome : japanHome;
