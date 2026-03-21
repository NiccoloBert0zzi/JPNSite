import { itinerary } from '../itinerary';

describe('Japan Itinerary Data', () => {
    it('is a non-empty array', () => {
        expect(Array.isArray(itinerary)).toBe(true);
        expect(itinerary.length).toBeGreaterThan(0);
    });

    it('each day has required fields', () => {
        itinerary.forEach((day) => {
            expect(day).toHaveProperty('slug');
            expect(day).toHaveProperty('date');
            expect(day).toHaveProperty('day');
            expect(day).toHaveProperty('title');
            expect(typeof day.slug).toBe('string');
            expect(day.slug.length).toBeGreaterThan(0);
        });
    });

    it('slugs are unique', () => {
        const slugs = itinerary.map((d) => d.slug);
        const unique = new Set(slugs);
        expect(unique.size).toBe(slugs.length);
    });

    it('dates are valid ISO date strings', () => {
        itinerary.forEach((day) => {
            const parsed = new Date(day.date);
            expect(parsed.toString()).not.toBe('Invalid Date');
        });
    });

    it('dates are in chronological order', () => {
        for (let i = 1; i < itinerary.length; i++) {
            const prev = new Date(itinerary[i - 1].date);
            const curr = new Date(itinerary[i].date);
            expect(curr.getTime()).toBeGreaterThanOrEqual(prev.getTime());
        }
    });

    it('coordinates, when present, have lat and lng', () => {
        itinerary.forEach((day) => {
            if (day.coordinates && day.coordinates.length > 0) {
                day.coordinates.forEach((coord) => {
                    expect(coord).toHaveProperty('lat');
                    expect(coord).toHaveProperty('lng');
                    expect(typeof coord.lat).toBe('number');
                    expect(typeof coord.lng).toBe('number');
                    expect(coord.lat).toBeGreaterThanOrEqual(-90);
                    expect(coord.lat).toBeLessThanOrEqual(90);
                    expect(coord.lng).toBeGreaterThanOrEqual(-180);
                    expect(coord.lng).toBeLessThanOrEqual(180);
                });
            }
        });
    });
});
