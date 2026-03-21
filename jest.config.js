const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: ['**/__tests__/**/*.{js,ts}', '**/*.test.{js,ts}'],
    testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
    collectCoverageFrom: [
        'src/**/*.{js,ts,jsx,tsx}',
        '!src/**/*.d.ts',
        // Pages and complex UI components are covered by Playwright E2E tests, not unit tests
        '!src/app/**/page.js',
        '!src/app/layout.js',
        '!src/components/Editable*.js',
        '!src/components/RouteMap*.js',
        '!src/components/StatsDashboard.js',
        '!src/components/ThemeRegistry.js',
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
        },
    },
};

module.exports = createJestConfig(config);
