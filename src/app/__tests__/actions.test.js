// Mock next/headers before importing actions
const mockGet = jest.fn();
const mockSet = jest.fn();
const mockDelete = jest.fn();

jest.mock('next/headers', () => ({
    cookies: jest.fn(() =>
        Promise.resolve({
            get: mockGet,
            set: mockSet,
            delete: mockDelete,
        })
    ),
}));

jest.mock('@/lib/db', () => ({
    getTripData: jest.fn(),
    saveTripData: jest.fn(),
}));

const { getTripData, saveTripData } = require('@/lib/db');

describe('checkAuth', () => {
    beforeEach(() => jest.clearAllMocks());

    it('returns true when cookie is set to "true"', async () => {
        mockGet.mockReturnValue({ value: 'true' });
        const { checkAuth } = require('@/app/actions');
        expect(await checkAuth()).toBe(true);
    });

    it('returns false when cookie is missing', async () => {
        mockGet.mockReturnValue(undefined);
        const { checkAuth } = require('@/app/actions');
        expect(await checkAuth()).toBe(false);
    });

    it('returns false when cookie has wrong value', async () => {
        mockGet.mockReturnValue({ value: 'false' });
        const { checkAuth } = require('@/app/actions');
        expect(await checkAuth()).toBe(false);
    });
});

describe('loginAdmin', () => {
    beforeEach(() => jest.clearAllMocks());

    // actions.js defaults ADMIN_PASSWORD to 'admin123' when env var is not set
    it('returns success and sets cookie with the default dev password', async () => {
        const { loginAdmin } = require('@/app/actions');
        const result = await loginAdmin('admin123');
        expect(result.success).toBe(true);
        expect(mockSet).toHaveBeenCalledWith('jpn_admin_session', 'true', expect.any(Object));
    });

    it('returns error with wrong password', async () => {
        const { loginAdmin } = require('@/app/actions');
        const result = await loginAdmin('wrongpassword');
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
        expect(mockSet).not.toHaveBeenCalled();
    });
});

describe('logoutAdmin', () => {
    beforeEach(() => jest.clearAllMocks());

    it('deletes the session cookie and returns success', async () => {
        const { logoutAdmin } = require('@/app/actions');
        const result = await logoutAdmin();
        expect(result.success).toBe(true);
        expect(mockDelete).toHaveBeenCalledWith('jpn_admin_session');
    });
});

describe('updateData', () => {
    beforeEach(() => jest.clearAllMocks());

    it('rejects when user is not authenticated', async () => {
        mockGet.mockReturnValue(undefined);
        const { updateData } = require('@/app/actions');
        const result = await updateData('japan', 'itinerary', []);
        expect(result.success).toBe(false);
        expect(result.error).toMatch(/autorizzato/i);
        expect(saveTripData).not.toHaveBeenCalled();
    });

    it('saves data when authenticated', async () => {
        mockGet.mockReturnValue({ value: 'true' });
        saveTripData.mockResolvedValue({ success: true });
        const { updateData } = require('@/app/actions');
        const result = await updateData('japan', 'itinerary', [{ slug: 'test' }]);
        expect(saveTripData).toHaveBeenCalledWith('japan', 'itinerary', [{ slug: 'test' }]);
        expect(result.success).toBe(true);
    });
});

describe('fetchData', () => {
    beforeEach(() => jest.clearAllMocks());

    it('delegates to getTripData', async () => {
        getTripData.mockResolvedValue([{ slug: 'day1' }]);
        const { fetchData } = require('@/app/actions');
        const result = await fetchData('japan', 'itinerary');
        expect(getTripData).toHaveBeenCalledWith('japan', 'itinerary');
        expect(result).toEqual([{ slug: 'day1' }]);
    });
});
