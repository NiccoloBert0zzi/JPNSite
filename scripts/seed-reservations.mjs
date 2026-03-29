#!/usr/bin/env node
/**
 * Reset and reseed the reservations table for a trip.
 * Usage: node --env-file=.env.local scripts/seed-reservations.mjs
 *
 * WARNING: This DELETES all existing reservations for the trip and reinserts
 * the defaults from src/data/japan/reservations.js.
 * Any manual edits made via the UI will be lost.
 */

import { reservations } from '../src/data/japan/reservations.js';
import { createPool } from '@vercel/postgres';

const TRIP_ID = 'japan';

const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
});

async function main() {
    console.log(`Reseeding reservations for trip: ${TRIP_ID}`);
    console.log(`Items to insert: ${reservations.length}`);

    const client = await pool.connect();
    try {
        // Ensure table exists
        await client.query(`
            CREATE TABLE IF NOT EXISTS reservations (
                id       SERIAL PRIMARY KEY,
                item     TEXT    NOT NULL,
                status   TEXT    NOT NULL,
                cost     NUMERIC NOT NULL,
                category TEXT    NOT NULL,
                trip_id  TEXT
            );
        `);
        await client.query(`ALTER TABLE reservations ADD COLUMN IF NOT EXISTS trip_id TEXT;`);

        // Delete existing rows for this trip
        const { rowCount } = await client.query(
            `DELETE FROM reservations WHERE trip_id = $1`,
            [TRIP_ID]
        );
        console.log(`🗑️  Deleted ${rowCount} existing rows for trip '${TRIP_ID}'`);

        // Insert fresh data
        for (const item of reservations) {
            await client.query(
                `INSERT INTO reservations (item, status, cost, category, trip_id)
                 VALUES ($1, $2, $3, $4, $5)`,
                [item.item, item.status, item.cost, item.category, TRIP_ID]
            );
        }

        console.log(`✅ Inserted ${reservations.length} rows.`);

        // Summary by category
        const { rows } = await client.query(
            `SELECT category, COUNT(*) as count, SUM(cost) as total
             FROM reservations WHERE trip_id = $1
             GROUP BY category ORDER BY category`,
            [TRIP_ID]
        );
        console.log('\nSummary:');
        let grandTotal = 0;
        for (const row of rows) {
            console.log(`  ${row.category.padEnd(15)} ${String(row.count).padStart(2)} voci  €${Number(row.total).toFixed(2)}`);
            grandTotal += Number(row.total);
        }
        console.log(`${'TOTALE'.padEnd(15)}    €${grandTotal.toFixed(2)}`);

    } catch (err) {
        console.error('❌ Seed failed:', err.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
