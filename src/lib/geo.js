/**
 * Shared geographic conversion helpers for the 3D globe.
 *
 * LON_OFFSET calibrates the seam between our equirectangular Earth textures
 * (day/night maps, UV-mapped with u=0 at lng=-180, u=0.5 at lng=0/Greenwich)
 * and three.js's SphereGeometry, whose vertex u maps directly to its phi
 * (longitude) angle: phi = u * 2π = (lng + 180) * DEG2RAD. Markers
 * (latLngToVector3) and the sun direction (solar.js) both apply this SAME
 * constant, so the two can never drift out of alignment with each other —
 * but both must match the sphere's own UVs, hence 180 here.
 */
export const LON_OFFSET = 180;

const DEG2RAD = Math.PI / 180;

/**
 * Convert latitude/longitude (degrees) to a unit-sphere position.
 * @param {number} lat
 * @param {number} lng
 * @param {number} [radius]
 * @returns {[number, number, number]}
 */
export function latLngToVector3(lat, lng, radius = 1) {
    const phi = (90 - lat) * DEG2RAD;
    const theta = (lng + LON_OFFSET) * DEG2RAD;

    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return [x, y, z];
}
