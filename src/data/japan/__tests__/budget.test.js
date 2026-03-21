import { budget } from '../budget';

describe('Japan Budget Data', () => {
    it('has required top-level fields', () => {
        expect(budget).toHaveProperty('totalNoFood');
        expect(budget).toHaveProperty('totalSafe');
        expect(budget).toHaveProperty('breakdown');
        expect(budget).toHaveProperty('hotels');
    });

    it('totalNoFood is a positive number', () => {
        expect(typeof budget.totalNoFood).toBe('number');
        expect(budget.totalNoFood).toBeGreaterThan(0);
    });

    it('totalSafe is greater than totalNoFood', () => {
        expect(budget.totalSafe).toBeGreaterThan(budget.totalNoFood);
    });

    it('breakdown items have required fields', () => {
        expect(budget.breakdown.length).toBeGreaterThan(0);
        budget.breakdown.forEach((item) => {
            expect(item).toHaveProperty('category');
            expect(item).toHaveProperty('amount');
            expect(typeof item.amount).toBe('number');
            expect(item.amount).toBeGreaterThanOrEqual(0);
        });
    });

    it('breakdown categories are unique', () => {
        const categories = budget.breakdown.map((item) => item.category);
        const unique = new Set(categories);
        expect(unique.size).toBe(categories.length);
    });

    it('breakdown total matches totalNoFood (excluding Cibo)', () => {
        const nonFoodCategories = budget.breakdown.filter(
            (item) => !item.category.toLowerCase().includes('cibo')
        );
        const sum = nonFoodCategories.reduce((acc, item) => acc + item.amount, 0);
        expect(sum).toBeCloseTo(budget.totalNoFood, 0);
    });

    it('hotels have required fields', () => {
        expect(budget.hotels.length).toBeGreaterThan(0);
        budget.hotels.forEach((hotel) => {
            expect(hotel).toHaveProperty('city');
            expect(hotel).toHaveProperty('name');
            expect(hotel).toHaveProperty('nights');
            expect(hotel).toHaveProperty('cost');
            expect(typeof hotel.nights).toBe('number');
            expect(hotel.nights).toBeGreaterThan(0);
            expect(typeof hotel.cost).toBe('number');
            expect(hotel.cost).toBeGreaterThan(0);
        });
    });

    it('hotel total matches Hotel breakdown amount', () => {
        const hotelBreakdown = budget.breakdown.find((b) => b.category === 'Hotel');
        const hotelTotal = budget.hotels.reduce((acc, h) => acc + h.cost, 0);
        expect(hotelBreakdown).toBeDefined();
        expect(hotelTotal).toBeCloseTo(hotelBreakdown.amount, 0);
    });
});
