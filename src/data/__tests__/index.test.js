describe('Data index – trip switching', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    it('defaults to japan data when NEXT_PUBLIC_TRIP_ID is not set', async () => {
        delete process.env.NEXT_PUBLIC_TRIP_ID;
        const { currentTrip, itinerary } = await import('@/data/index');
        expect(currentTrip).toBeDefined();
        expect(currentTrip.title).toMatch(/Giappon/i);
        expect(Array.isArray(itinerary)).toBe(true);
    });

    it('exports japan data when NEXT_PUBLIC_TRIP_ID=japan', async () => {
        process.env.NEXT_PUBLIC_TRIP_ID = 'japan';
        const { currentTrip } = await import('@/data/index');
        expect(currentTrip.title).toMatch(/Giappon/i);
        expect(currentTrip.emoji).toBe('🇯🇵');
    });

    it('exports budapest data when NEXT_PUBLIC_TRIP_ID=budapest', async () => {
        process.env.NEXT_PUBLIC_TRIP_ID = 'budapest';
        const { currentTrip } = await import('@/data/index');
        expect(currentTrip.title).toMatch(/Budapest/i);
        expect(currentTrip.emoji).toBe('🇭🇺');
    });

    it('currentTrip has theme with primary color', async () => {
        process.env.NEXT_PUBLIC_TRIP_ID = 'japan';
        const { currentTrip } = await import('@/data/index');
        expect(currentTrip.theme).toHaveProperty('primary');
        expect(currentTrip.theme.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    it('all data exports are defined for japan', async () => {
        process.env.NEXT_PUBLIC_TRIP_ID = 'japan';
        const mod = await import('@/data/index');
        expect(mod.itinerary).toBeDefined();
        expect(mod.budget).toBeDefined();
        expect(mod.transport).toBeDefined();
        expect(mod.accommodations).toBeDefined();
        expect(mod.reservations).toBeDefined();
        expect(mod.homeData).toBeDefined();
    });

    it('all data exports are defined for budapest', async () => {
        process.env.NEXT_PUBLIC_TRIP_ID = 'budapest';
        const mod = await import('@/data/index');
        expect(mod.itinerary).toBeDefined();
        expect(mod.budget).toBeDefined();
        expect(mod.transport).toBeDefined();
        expect(mod.accommodations).toBeDefined();
        expect(mod.reservations).toBeDefined();
        expect(mod.homeData).toBeDefined();
    });
});
