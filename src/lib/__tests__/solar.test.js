/** @jest-environment node */
import { getSubsolarPoint, subsolarToDirection, getSunDirection } from '@/lib/solar';

function length([x, y, z]) {
    return Math.sqrt(x * x + y * y + z * z);
}

describe('solar – getSubsolarPoint', () => {
    it('is near-equatorial at the March equinox', () => {
        const { lat } = getSubsolarPoint(new Date('2026-03-20T12:00:00Z'));
        expect(Math.abs(lat)).toBeLessThan(1.2);
    });

    it('is near-equatorial at the September equinox', () => {
        const { lat } = getSubsolarPoint(new Date('2026-09-23T12:00:00Z'));
        expect(Math.abs(lat)).toBeLessThan(1.2);
    });

    it('reaches ~+23.4 degrees at the June solstice', () => {
        const { lat } = getSubsolarPoint(new Date('2026-06-21T12:00:00Z'));
        expect(lat).toBeGreaterThan(23.0);
        expect(lat).toBeLessThan(23.6);
    });

    it('reaches ~-23.4 degrees at the December solstice', () => {
        const { lat } = getSubsolarPoint(new Date('2026-12-21T12:00:00Z'));
        expect(lat).toBeLessThan(-23.0);
        expect(lat).toBeGreaterThan(-23.6);
    });

    it('places the subsolar longitude near 0 degrees at 12:00 UTC', () => {
        const { lng } = getSubsolarPoint(new Date('2026-03-20T12:00:00Z'));
        expect(Math.abs(lng)).toBeLessThan(4.5); // bounded by the equation of time
    });

    it('places the subsolar longitude near 180 degrees at 00:00 UTC', () => {
        const { lng } = getSubsolarPoint(new Date('2026-03-20T00:00:00Z'));
        expect(Math.abs(Math.abs(lng) - 180)).toBeLessThan(4.5);
    });
});

describe('solar – subsolarToDirection / getSunDirection', () => {
    it('returns a unit vector', () => {
        const dir = subsolarToDirection(23.4, 45);
        expect(length(dir)).toBeCloseTo(1, 6);
    });

    it('getSunDirection composes getSubsolarPoint + subsolarToDirection', () => {
        const date = new Date('2026-07-04T10:00:00Z');
        const { lat, lng } = getSubsolarPoint(date);
        const expected = subsolarToDirection(lat, lng);
        const actual = getSunDirection(date);
        expect(actual).toEqual(expected);
    });

    it('is a unit vector for an arbitrary date', () => {
        const dir = getSunDirection(new Date('2026-01-15T05:30:00Z'));
        expect(length(dir)).toBeCloseTo(1, 6);
    });
});
