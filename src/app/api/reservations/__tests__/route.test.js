/**
 * @jest-environment node
 */

const mockSql = jest.fn();
jest.mock('@vercel/postgres', () => ({ sql: mockSql }));

jest.mock('@/data', () => ({
    reservations: [
        { item: 'Visto', status: 'pending', cost: 0, category: 'Documenti' },
    ],
}));

jest.mock('@/app/actions', () => ({
    checkAuth: jest.fn(),
}));

// Queue the 4 SQL calls that ensureReady() makes on first invocation
function mockSetupCalls(seedCount = '1') {
    mockSql
        .mockResolvedValueOnce({})  // CREATE TABLE
        .mockResolvedValueOnce({})  // ALTER TABLE
        .mockResolvedValueOnce({})  // UPDATE backfill
        .mockResolvedValueOnce({ rows: [{ count: seedCount }] }); // SELECT count
}

// resetModules clears the setupDone flag between tests.
// checkAuth must be re-required after each reset to get the live mock reference.
beforeEach(() => {
    jest.resetModules();
    mockSql.mockClear();
});

function getCheckAuth() {
    return require('@/app/actions').checkAuth;
}

describe('GET /api/reservations', () => {
    it('returns reservations as a JSON array with numeric costs', async () => {
        mockSetupCalls();
        mockSql.mockResolvedValueOnce({
            rows: [{ id: 1, item: 'Visto', status: 'done', cost: '0', category: 'Documenti', trip_id: 'japan' }],
        });

        const { GET } = require('../route');
        const res = await GET(new Request('http://localhost/api/reservations'));
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(Array.isArray(data)).toBe(true);
        expect(typeof data[0].cost).toBe('number');
    });

    it('runs setup only once across multiple GET calls', async () => {
        mockSetupCalls();
        // Two SELECT calls for the two GET requests
        mockSql
            .mockResolvedValueOnce({ rows: [] })
            .mockResolvedValueOnce({ rows: [] });

        const { GET } = require('../route');
        await GET(new Request('http://localhost/api/reservations'));
        await GET(new Request('http://localhost/api/reservations'));

        // Setup is 4 calls; the two SELECTs add 2 more → total 6
        expect(mockSql).toHaveBeenCalledTimes(6);
    });

    it('returns 500 on DB error', async () => {
        mockSql.mockRejectedValueOnce(new Error('DB down'));
        const { GET } = require('../route');
        const res = await GET(new Request('http://localhost/api/reservations'));
        expect(res.status).toBe(500);
    });
});

describe('POST /api/reservations – auth', () => {
    it('returns 401 when not authenticated', async () => {
        getCheckAuth().mockResolvedValue(false);
        const { POST } = require('../route');
        const req = new Request('http://localhost/api/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item: 'X', status: 'pending', cost: 0, category: 'Y' }),
        });
        const res = await POST(req);
        expect(res.status).toBe(401);
        expect(mockSql).not.toHaveBeenCalled();
    });

    it('inserts a new item when authenticated', async () => {
        getCheckAuth().mockResolvedValue(true);
        mockSetupCalls();
        mockSql.mockResolvedValueOnce({
            rows: [{ id: 5, item: 'Test', status: 'pending', cost: 100, category: 'Test', trip_id: 'japan' }],
        });

        const { POST } = require('../route');
        const req = new Request('http://localhost/api/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item: 'Test', status: 'pending', cost: 100, category: 'Test' }),
        });
        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data[0].id).toBe(5);
    });

    it('updates an existing item when authenticated', async () => {
        getCheckAuth().mockResolvedValue(true);
        mockSetupCalls();
        mockSql.mockResolvedValueOnce({
            rows: [{ id: 3, item: 'Updated', status: 'done', cost: 50, category: 'Cat', trip_id: 'japan' }],
        });

        const { POST } = require('../route');
        const req = new Request('http://localhost/api/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 3, item: 'Updated', status: 'done', cost: 50, category: 'Cat' }),
        });
        const res = await POST(req);
        const data = await res.json();

        expect(data.success).toBe(true);
        expect(data.data[0].item).toBe('Updated');
    });

    it('returns 500 on DB error', async () => {
        getCheckAuth().mockResolvedValue(true);
        mockSql.mockRejectedValueOnce(new Error('Write failed'));
        const { POST } = require('../route');
        const req = new Request('http://localhost/api/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item: 'X', status: 'pending', cost: 0, category: 'Y' }),
        });
        const res = await POST(req);
        expect(res.status).toBe(500);
    });
});

describe('DELETE /api/reservations – auth', () => {
    it('returns 401 when not authenticated', async () => {
        getCheckAuth().mockResolvedValue(false);
        const { DELETE } = require('../route');
        const req = new Request('http://localhost/api/reservations?id=1', { method: 'DELETE' });
        const res = await DELETE(req);
        expect(res.status).toBe(401);
        expect(mockSql).not.toHaveBeenCalled();
    });

    it('deletes item by id when authenticated', async () => {
        getCheckAuth().mockResolvedValue(true);
        mockSql.mockResolvedValueOnce({});
        const { DELETE } = require('../route');
        const req = new Request('http://localhost/api/reservations?id=7', { method: 'DELETE' });
        const res = await DELETE(req);
        expect(res.status).toBe(200);
        expect((await res.json()).success).toBe(true);
    });

    it('returns 400 when id is missing', async () => {
        getCheckAuth().mockResolvedValue(true);
        const { DELETE } = require('../route');
        const req = new Request('http://localhost/api/reservations', { method: 'DELETE' });
        const res = await DELETE(req);
        expect(res.status).toBe(400);
    });

    it('returns 500 on DB error', async () => {
        getCheckAuth().mockResolvedValue(true);
        mockSql.mockRejectedValueOnce(new Error('Delete failed'));
        const { DELETE } = require('../route');
        const req = new Request('http://localhost/api/reservations?id=1', { method: 'DELETE' });
        const res = await DELETE(req);
        expect(res.status).toBe(500);
    });
});
