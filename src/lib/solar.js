import { latLngToVector3 } from '@/lib/geo';

const RAD2DEG = 180 / Math.PI;

/**
 * Day-of-year (1-366) for a Date, in UTC.
 * @param {Date} date
 */
function dayOfYearUTC(date) {
    const start = Date.UTC(date.getUTCFullYear(), 0, 1);
    const current = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    return Math.round((current - start) / 86400000) + 1;
}

/**
 * Solar declination (degrees) and equation of time (minutes) via the NOAA
 * low-accuracy Fourier-series approximation (good to ~0.1 degree).
 * @param {Date} date
 */
function solarParameters(date) {
    const dayOfYear = dayOfYearUTC(date);
    const hourUTC = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;

    const gamma = ((2 * Math.PI) / 365) * (dayOfYear - 1 + (hourUTC - 12) / 24);

    const declinationRad =
        0.006918 -
        0.399912 * Math.cos(gamma) +
        0.070257 * Math.sin(gamma) -
        0.006758 * Math.cos(2 * gamma) +
        0.000907 * Math.sin(2 * gamma) -
        0.002697 * Math.cos(3 * gamma) +
        0.00148 * Math.sin(3 * gamma);

    const eqTimeMinutes =
        229.18 *
        (0.000075 +
            0.001868 * Math.cos(gamma) -
            0.032077 * Math.sin(gamma) -
            0.014615 * Math.cos(2 * gamma) -
            0.040849 * Math.sin(2 * gamma));

    return { declinationDeg: declinationRad * RAD2DEG, eqTimeMinutes, hourUTC };
}

/**
 * The point on Earth directly under the sun, right now.
 * @param {Date} date
 * @returns {{lat: number, lng: number}}
 */
export function getSubsolarPoint(date) {
    const { declinationDeg, eqTimeMinutes, hourUTC } = solarParameters(date);

    let lng = -15 * (hourUTC + eqTimeMinutes / 60 - 12);
    lng = ((lng + 180) % 360 + 360) % 360 - 180;

    return { lat: declinationDeg, lng };
}

/**
 * Unit vector (world space) pointing from Earth's center toward the sun,
 * using the same lat/lng -> vector convention as globe markers (geo.js).
 * @param {number} lat
 * @param {number} lng
 * @returns {[number, number, number]}
 */
export function subsolarToDirection(lat, lng) {
    return latLngToVector3(lat, lng, 1);
}

/**
 * The only function the scene needs to call: sun direction for a given time.
 * @param {Date} date
 * @returns {[number, number, number]}
 */
export function getSunDirection(date) {
    const { lat, lng } = getSubsolarPoint(date);
    return subsolarToDirection(lat, lng);
}
