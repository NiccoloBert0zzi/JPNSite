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
    collectCoverageFrom: [
        'src/**/*.{js,ts,jsx,tsx}',
        '!src/**/*.d.ts',
        '!src/app/layout.js',
    ],
    coverageThreshold: {
        global: {
            branches: 60,
            functions: 60,
            lines: 60,
        },
    },
};

module.exports = createJestConfig(config);
