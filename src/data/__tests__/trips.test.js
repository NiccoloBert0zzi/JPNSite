describe('Data index – trips registry (globe landing)', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    it('exposes activeTripId matching NEXT_PUBLIC_TRIP_ID', async () => {
        process.env.NEXT_PUBLIC_TRIP_ID = 'budapest';
        const { activeTripId } = await import('@/data/index');
        expect(activeTripId).toBe('budapest');
    });

    it('allTrips contains every trip regardless of the active one', async () => {
        process.env.NEXT_PUBLIC_TRIP_ID = 'japan';
        const { allTrips } = await import('@/data/index');
        const ids = allTrips.map((t) => t.id).sort();
        expect(ids).toEqual(['budapest', 'japan']);
    });

    it('every trip has a valid marker, url, and description', async () => {
        const { allTrips } = await import('@/data/index');
        for (const trip of allTrips) {
            expect(trip.marker.lat).toBeGreaterThanOrEqual(-90);
            expect(trip.marker.lat).toBeLessThanOrEqual(90);
            expect(trip.marker.lng).toBeGreaterThanOrEqual(-180);
            expect(trip.marker.lng).toBeLessThanOrEqual(180);
            expect(trip.url).toMatch(/^https:\/\//);
            expect(typeof trip.markerLabel).toBe('string');
            expect(trip.markerLabel.length).toBeGreaterThan(0);
            expect(typeof trip.shortDescription).toBe('string');
            expect(trip.shortDescription.length).toBeGreaterThan(0);
            expect(typeof trip.country).toBe('string');
            expect(trip.country.length).toBeGreaterThan(0);
            expect(new Date(trip.endDate).getTime()).toBeGreaterThanOrEqual(new Date(trip.startDate).getTime());
        }
    });

    it('tripDurationDays computes inclusive day counts', async () => {
        const { allTrips, tripDurationDays } = await import('@/data/index');
        const japan = allTrips.find((t) => t.id === 'japan');
        const budapest = allTrips.find((t) => t.id === 'budapest');
        expect(tripDurationDays(japan)).toBe(16);
        expect(tripDurationDays(budapest)).toBe(3);
    });

    it('landingStats counts distinct countries and completed trips at a given date', async () => {
        const { landingStats } = await import('@/data/index');
        expect(landingStats(new Date('2026-07-12'))).toEqual({
            countriesVisited: 2,
            tripsCompleted: 1, // only Budapest (2026-02-10) is over
        });
        expect(landingStats(new Date('2027-01-01')).tripsCompleted).toBe(2);
    });
});
