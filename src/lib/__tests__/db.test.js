// Mock @vercel/postgres before importing db.js
jest.mock('@vercel/postgres', () => ({
    sql: jest.fn(),
}));

// Mock static data imports
jest.mock('@/data/japan/itinerary', () => ({ itinerary: [{ slug: 'test-japan-day' }] }));
jest.mock('@/data/japan/accommodations', () => ({ accommodations: [{ id: 'test-jp-acc' }] }));
jest.mock('@/data/japan/transport', () => ({ transport: { trains: [] } }));
jest.mock('@/data/japan/budget', () => ({ budget: { totalNoFood: 100 } }));
jest.mock('@/data/budapest/itinerary', () => ({ itinerary: [{ slug: 'test-budapest-day' }] }));
jest.mock('@/data/budapest/accommodations', () => ({ accommodations: [{ id: 'test-bp-acc' }] }));
jest.mock('@/data/budapest/transport', () => ({ transport: { trains: [] } }));
jest.mock('@/data/budapest/budget', () => ({ budget: { totalNoFood: 200 } }));

const { sql } = require('@vercel/postgres');

describe('getTripData', () => {
    beforeEach(() => jest.clearAllMocks());

    it('returns data from DB when row exists', async () => {
        sql.mockResolvedValueOnce({ rows: [{ data_value: [{ slug: 'db-day' }] }] });
        const { getTripData } = require('@/lib/db');
        const result = await getTripData('japan', 'itinerary');
        expect(result).toEqual([{ slug: 'db-day' }]);
    });

    it('falls back to static data when DB returns empty', async () => {
        sql.mockResolvedValueOnce({ rows: [] });
        const { getTripData } = require('@/lib/db');
        const result = await getTripData('japan', 'itinerary');
        expect(result).toEqual([{ slug: 'test-japan-day' }]);
    });

    it('falls back to static data on DB error', async () => {
        sql.mockRejectedValueOnce(new Error('Connection refused'));
        const { getTripData } = require('@/lib/db');
        const result = await getTripData('japan', 'budget');
        expect(result).toEqual({ totalNoFood: 100 });
    });

    it('returns static data for budapest trip', async () => {
        sql.mockResolvedValueOnce({ rows: [] });
        const { getTripData } = require('@/lib/db');
        const result = await getTripData('budapest', 'budget');
        expect(result).toEqual({ totalNoFood: 200 });
    });

    it('returns empty array for unknown trip/key', async () => {
        sql.mockResolvedValueOnce({ rows: [] });
        const { getTripData } = require('@/lib/db');
        const result = await getTripData('unknown', 'unknown');
        expect(result).toEqual([]);
    });
});

describe('saveTripData', () => {
    beforeEach(() => jest.clearAllMocks());

    it('returns success on successful upsert', async () => {
        sql.mockResolvedValueOnce({}); // createTable CREATE TABLE
        sql.mockResolvedValueOnce({}); // actual upsert INSERT ... ON CONFLICT
        const { saveTripData } = require('@/lib/db');
        const result = await saveTripData('japan', 'itinerary', [{ slug: 'new-day' }]);
        expect(result).toEqual({ success: true });
    });

    it('returns error object when upsert fails', async () => {
        sql.mockResolvedValueOnce({}); // createTable succeeds
        sql.mockRejectedValueOnce(new Error('Write failed')); // upsert fails
        const { saveTripData } = require('@/lib/db');
        const result = await saveTripData('japan', 'itinerary', []);
        expect(result.success).toBe(false);
        expect(result.error).toBe('Write failed');
    });

    it('still returns error when createTable also fails (graceful degradation)', async () => {
        sql.mockRejectedValueOnce(new Error('No table')); // createTable fails (caught internally)
        sql.mockRejectedValueOnce(new Error('Write failed')); // upsert also fails
        const { saveTripData } = require('@/lib/db');
        const result = await saveTripData('japan', 'itinerary', []);
        expect(result.success).toBe(false);
    });
});
