/**
 * @jest-environment node
 */

// Mock @vercel/postgres — must be before any import of the route
const mockSql = jest.fn();
jest.mock('@vercel/postgres', () => ({ sql: mockSql }));

jest.mock('@/data', () => ({
    reservations: [
        { item: 'Visto', status: 'pending', cost: 0, category: 'Documenti' },
    ],
}));

// Queue helpers for ensureTableAndData (CREATE TABLE + ALTER + UPDATE backfill + SELECT count)
function mockEnsureOk(seedCount = '1') {
    mockSql
        .mockResolvedValueOnce({})  // CREATE TABLE
        .mockResolvedValueOnce({})  // ALTER TABLE add column
        .mockResolvedValueOnce({})  // UPDATE backfill
        .mockResolvedValueOnce({ rows: [{ count: seedCount }] }); // SELECT count
}

describe('GET /api/reservations', () => {
    beforeEach(() => mockSql.mockClear());

    it('returns reservations as a JSON array with numeric costs', async () => {
        mockEnsureOk();
        mockSql.mockResolvedValueOnce({
            rows: [{ id: 1, item: 'Visto', status: 'done', cost: '0', category: 'Documenti', trip_id: 'japan' }],
        });

        const { GET } = require('../route');
        const req = new Request('http://localhost/api/reservations');
        const res = await GET(req);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(Array.isArray(data)).toBe(true);
        expect(data[0].id).toBe(1);
        expect(typeof data[0].cost).toBe('number');
    });

    it('returns 500 on DB error', async () => {
        mockSql.mockRejectedValueOnce(new Error('DB down'));
        const { GET } = require('../route');
        const req = new Request('http://localhost/api/reservations');
        const res = await GET(req);
        expect(res.status).toBe(500);
        const body = await res.json();
        expect(body.error).toBeDefined();
    });
});

describe('POST /api/reservations', () => {
    beforeEach(() => mockSql.mockClear());

    it('inserts a new item (no id) and returns it with a real id', async () => {
        mockEnsureOk();
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

    it('updates an existing item (has id)', async () => {
        mockEnsureOk();
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

describe('DELETE /api/reservations', () => {
    beforeEach(() => mockSql.mockClear());

    it('deletes item by id', async () => {
        mockSql.mockResolvedValueOnce({});
        const { DELETE } = require('../route');
        const req = new Request('http://localhost/api/reservations?id=7', { method: 'DELETE' });
        const res = await DELETE(req);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.success).toBe(true);
    });

    it('returns 400 when id is missing', async () => {
        const { DELETE } = require('../route');
        const req = new Request('http://localhost/api/reservations', { method: 'DELETE' });
        const res = await DELETE(req);
        expect(res.status).toBe(400);
    });

    it('returns 500 on DB error', async () => {
        mockSql.mockRejectedValueOnce(new Error('Delete failed'));
        const { DELETE } = require('../route');
        const req = new Request('http://localhost/api/reservations?id=1', { method: 'DELETE' });
        const res = await DELETE(req);
        expect(res.status).toBe(500);
    });
});
