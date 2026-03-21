import { itinerary as japanItinerary } from './japan/itinerary';
import { budget as japanBudget } from './japan/budget';
import { transport as japanTransport } from './japan/transport';
import { accommodations as japanAccommodations } from './japan/accommodations';
import { reservations as japanReservations } from './japan/reservations';
import { home as japanHome } from './japan/home';
import { cultura as japanCultura } from './japan/cultura';
import { cibo as japanCibo } from './japan/cibo';
import { info as japanInfo } from './japan/info';
import { frasi as japanFrasi } from './japan/frasi';
import { gallery as japanGallery } from './japan/gallery';

import { itinerary as budapestItinerary } from './budapest/itinerary';
import { budget as budapestBudget } from './budapest/budget';
import { transport as budapestTransport } from './budapest/transport';
import { accommodations as budapestAccommodations } from './budapest/accommodations';
import { reservations as budapestReservations } from './budapest/reservations';
import { home as budapestHome } from './budapest/home';
import { cultura as budapestCultura } from './budapest/cultura';
import { cibo as budapestCibo } from './budapest/cibo';
import { info as budapestInfo } from './budapest/info';
import { frasi as budapestFrasi } from './budapest/frasi';
import { gallery as budapestGallery } from './budapest/gallery';

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

export const currentTrip = trips[/** @type {keyof typeof trips} */ (TRIP_ID)];

export const itinerary = TRIP_ID === 'budapest' ? budapestItinerary : japanItinerary;
export const budget = TRIP_ID === 'budapest' ? budapestBudget : japanBudget;
export const transport = TRIP_ID === 'budapest' ? budapestTransport : japanTransport;
export const accommodations = TRIP_ID === 'budapest' ? budapestAccommodations : japanAccommodations;
export const reservations = TRIP_ID === 'budapest' ? budapestReservations : japanReservations;
export const homeData = TRIP_ID === 'budapest' ? budapestHome : japanHome;
export const cultura = TRIP_ID === 'budapest' ? budapestCultura : japanCultura;
export const cibo = TRIP_ID === 'budapest' ? budapestCibo : japanCibo;
export const info = TRIP_ID === 'budapest' ? budapestInfo : japanInfo;
export const frasi = TRIP_ID === 'budapest' ? budapestFrasi : japanFrasi;
export const gallery = TRIP_ID === 'budapest' ? budapestGallery : japanGallery;
