import { budget } from '../budget';

describe('Budapest Budget Data', () => {
    it('has required top-level fields', () => {
        expect(budget).toHaveProperty('totalSafe');
        expect(budget).toHaveProperty('breakdown');
        expect(budget).toHaveProperty('notes');
    });

    it('totalSafe is a positive number', () => {
        expect(typeof budget.totalSafe).toBe('number');
        expect(budget.totalSafe).toBeGreaterThan(0);
    });

    it('breakdown items have required fields with valid values', () => {
        expect(budget.breakdown.length).toBeGreaterThan(0);
        budget.breakdown.forEach((item) => {
            expect(item).toHaveProperty('category');
            expect(item).toHaveProperty('amount');
            expect(typeof item.amount).toBe('number');
            expect(item.amount).toBeGreaterThanOrEqual(0);
        });
    });

    it('breakdown categories are unique', () => {
        const cats = budget.breakdown.map((i) => i.category);
        expect(new Set(cats).size).toBe(cats.length);
    });

    it('sum of breakdown does not exceed totalSafe', () => {
        const sum = budget.breakdown.reduce((acc, i) => acc + i.amount, 0);
        expect(sum).toBeLessThanOrEqual(budget.totalSafe);
    });

    it('notes is a non-empty array of strings', () => {
        expect(Array.isArray(budget.notes)).toBe(true);
        expect(budget.notes.length).toBeGreaterThan(0);
        budget.notes.forEach((note) => expect(typeof note).toBe('string'));
    });
});
