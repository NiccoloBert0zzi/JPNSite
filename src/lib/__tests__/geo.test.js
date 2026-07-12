/** @jest-environment node */
import { latLngToVector3, LON_OFFSET } from '@/lib/geo';

function length([x, y, z]) {
    return Math.sqrt(x * x + y * y + z * z);
}

describe('geo – latLngToVector3', () => {
    it('produces a unit-length vector for any lat/lng', () => {
        const cases = [
            [0, 0],
            [35.35, 137.2], // Japan marker
            [47.4979, 19.0402], // Budapest marker
            [90, 0], // north pole
            [-90, 45], // south pole
            [0, 180],
        ];
        for (const [lat, lng] of cases) {
            expect(length(latLngToVector3(lat, lng))).toBeCloseTo(1, 6);
        }
    });

    it('scales with the radius argument', () => {
        const v = latLngToVector3(10, 20, 2.5);
        expect(length(v)).toBeCloseTo(2.5, 6);
    });

    it('places the north pole on the +Y axis', () => {
        const [x, y, z] = latLngToVector3(90, 0);
        expect(y).toBeCloseTo(1, 5);
        expect(x).toBeCloseTo(0, 5);
        expect(z).toBeCloseTo(0, 5);
    });

    it('places the south pole on the -Y axis', () => {
        const [x, y, z] = latLngToVector3(-90, 123);
        expect(y).toBeCloseTo(-1, 5);
        expect(x).toBeCloseTo(0, 5);
        expect(z).toBeCloseTo(0, 5);
    });

    it('is consistent for known city coordinates (snapshot)', () => {
        const tokyo = latLngToVector3(35.6762, 139.6503);
        const budapest = latLngToVector3(47.4979, 19.0402);
        expect(tokyo).toMatchSnapshot();
        expect(budapest).toMatchSnapshot();
    });

    it('exposes a numeric LON_OFFSET used by both markers and the sun', () => {
        expect(typeof LON_OFFSET).toBe('number');
    });

    // Pins the rotational calibration against three.js SphereGeometry's own
    // UV convention (u -> phi = u * 2π, texture u=0.5 at lng=0), independent
    // of any snapshot — this is the exact bug class that shipped once
    // already (markers landing ~90° off from their real countries).
    describe('longitude calibration matches the equirectangular texture UVs', () => {
        it('places the Greenwich meridian (lng=0) on the +X axis', () => {
            const [x, y, z] = latLngToVector3(0, 0);
            expect(x).toBeCloseTo(1, 5);
            expect(y).toBeCloseTo(0, 5);
            expect(z).toBeCloseTo(0, 5);
        });

        it('places the antimeridian (lng=180) on the -X axis', () => {
            const [x, y, z] = latLngToVector3(0, 180);
            expect(x).toBeCloseTo(-1, 5);
            expect(z).toBeCloseTo(0, 5);
        });

        it('places lng=90 (east) on the -Z axis', () => {
            const [x, y, z] = latLngToVector3(0, 90);
            expect(z).toBeCloseTo(-1, 5);
            expect(x).toBeCloseTo(0, 5);
        });

        it('places lng=-90 (west) on the +Z axis', () => {
            const [x, y, z] = latLngToVector3(0, -90);
            expect(z).toBeCloseTo(1, 5);
            expect(x).toBeCloseTo(0, 5);
        });
    });
});
