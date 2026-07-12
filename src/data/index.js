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

/**
 * @typedef {Object} TripMeta
 * @property {string} title
 * @property {string} dates
 * @property {string} startDate - ISO date, e.g. "2026-10-02"
 * @property {string} endDate - ISO date, e.g. "2026-10-17"
 * @property {string} emoji
 * @property {string} country - country name in Italian, e.g. "Giappone"
 * @property {string} heroImage
 * @property {string} heroFilter
 * @property {string} label
 * @property {string} color
 * @property {{primary: string, primaryLight: string}} theme
 * @property {string} url - production deployment URL for this trip
 * @property {string} shortDescription - 1-2 sentence Italian blurb for the globe card
 * @property {{lat: number, lng: number}} marker - globe anchor coordinates
 * @property {string} markerLabel - short name shown next to the globe marker
 */

// Trip Meta Configuration
/** @type {Record<string, TripMeta>} */
const trips = {
    japan: {
        title: "Giappone 2026",
        dates: "02 Ottobre — 17 Ottobre",
        startDate: "2026-10-02",
        endDate: "2026-10-17",
        emoji: "🇯🇵",
        country: "Giappone",
        heroImage: "/images/hero.png",
        heroFilter: "brightness(0.7)",
        label: "VIAGGIO DI COPPIA",
        color: "primary",
        theme: {
            primary: "#A40024",
            primaryLight: "#D62F4D"
        },
        url: "https://jpn-indol.vercel.app",
        shortDescription: "Sedici giorni tra Tokyo, Kyoto e Osaka: templi millenari, luci al neon e cucina tradizionale, vissuti in coppia.",
        marker: { lat: 35.35, lng: 137.2 },
        markerLabel: "Giappone"
    },
    budapest: {
        title: "Budapest 2026",
        dates: "08 Febbraio — 10 Febbraio",
        startDate: "2026-02-08",
        endDate: "2026-02-10",
        emoji: "🇭🇺",
        country: "Ungheria",
        heroImage: "/images/budapest-hero.png",
        heroFilter: "brightness(0.6)",
        label: "WEEKEND FUORI",
        color: "green",
        theme: {
            primary: "#008751", // Hungarian Green
            primaryLight: "#00A663"
        },
        url: "https://budapest-site.vercel.app",
        shortDescription: "Un weekend fuori porta tra terme termali, il Parlamento illuminato sul Danubio e i celebri ruin bar.",
        marker: { lat: 47.4979, lng: 19.0402 },
        markerLabel: "Budapest"
    }
};

export const currentTrip = trips[/** @type {keyof typeof trips} */ (TRIP_ID)];

/** The trip id resolved from NEXT_PUBLIC_TRIP_ID at module load time. */
export const activeTripId = TRIP_ID;

/** Every trip's metadata, regardless of which one is active in this deployment. */
export const allTrips = Object.entries(trips).map(([id, t]) => ({ id, ...t }));

/**
 * Inclusive day count between a trip's startDate and endDate.
 * @param {TripMeta} trip
 */
export function tripDurationDays(trip) {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    return Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
}

/**
 * Aggregate landing-page stats across every trip.
 * @param {Date} [now] - reference date, injectable for tests
 */
export function landingStats(now = new Date()) {
    const countriesVisited = new Set(allTrips.map((t) => t.country)).size;
    const tripsCompleted = allTrips.filter((t) => new Date(t.endDate) < now).length;
    return { countriesVisited, tripsCompleted };
}

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
