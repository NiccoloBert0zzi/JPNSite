#!/usr/bin/env node
// Cross-platform helper: copies .env.<trip> to .env.local
// Usage: node scripts/use-trip.js japan|budapest

const fs = require('fs');
const path = require('path');

const trip = process.argv[2];
const root = path.join(__dirname, '..');

if (!trip) {
    console.error('Usage: node scripts/use-trip.js <trip>');
    process.exit(1);
}

const src = path.join(root, `.env.${trip}`);
const dst = path.join(root, '.env.local');

if (!fs.existsSync(src)) {
    console.error(`File not found: .env.${trip}`);
    process.exit(1);
}

fs.copyFileSync(src, dst);
console.log(`Active trip: ${trip} (.env.local updated)`);
