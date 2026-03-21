import React from 'react';
import { render } from '@testing-library/react';
import BudgetChart from '../BudgetChart';

// Recharts uses ResizeObserver which is not in jsdom
global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};

const sampleData = [
    { category: 'Voli', total: 1632 },
    { category: 'Hotel', total: 986 },
    { category: 'Cibo', total: 0 },      // should be filtered out
    { category: 'Trasporti', total: 481 },
];

describe('BudgetChart', () => {
    it('renders without crashing', () => {
        render(<BudgetChart data={sampleData} />);
    });

    it('renders a chart container', () => {
        const { container } = render(<BudgetChart data={sampleData} />);
        expect(container.firstChild).toBeTruthy();
    });

    it('accepts data with all-zero values without crashing', () => {
        const zeroData = [{ category: 'Voli', total: 0 }];
        render(<BudgetChart data={zeroData} />);
    });

    it('accepts empty data array without crashing', () => {
        render(<BudgetChart data={[]} />);
    });
});
