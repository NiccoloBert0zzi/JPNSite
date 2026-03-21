import { itinerary } from '../itinerary';

describe('Budapest Itinerary Data', () => {
    it('is a non-empty array', () => {
        expect(Array.isArray(itinerary)).toBe(true);
        expect(itinerary.length).toBeGreaterThan(0);
    });

    it('each day has required fields', () => {
        itinerary.forEach((day) => {
            expect(day).toHaveProperty('slug');
            expect(day).toHaveProperty('date');
            expect(day).toHaveProperty('title');
            expect(day).toHaveProperty('location');
            expect(typeof day.slug).toBe('string');
            expect(day.slug.length).toBeGreaterThan(0);
        });
    });

    it('slugs are unique', () => {
        const slugs = itinerary.map((d) => d.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
    });

    it('dates are valid ISO strings in chronological order', () => {
        itinerary.forEach((day) => {
            expect(new Date(day.date).toString()).not.toBe('Invalid Date');
        });
        for (let i = 1; i < itinerary.length; i++) {
            expect(new Date(itinerary[i].date).getTime()).toBeGreaterThanOrEqual(
                new Date(itinerary[i - 1].date).getTime()
            );
        }
    });

    it('coordinates, when present, have valid lat/lng', () => {
        itinerary.forEach((day) => {
            (day.coordinates || []).forEach((coord) => {
                expect(typeof coord.lat).toBe('number');
                expect(typeof coord.lng).toBe('number');
                expect(coord.lat).toBeGreaterThanOrEqual(-90);
                expect(coord.lat).toBeLessThanOrEqual(90);
                expect(coord.lng).toBeGreaterThanOrEqual(-180);
                expect(coord.lng).toBeLessThanOrEqual(180);
            });
        });
    });
});
