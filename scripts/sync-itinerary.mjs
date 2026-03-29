#!/usr/bin/env node
/**
 * Sync the static itinerary to the Vercel Postgres DB.
 * Usage: node --env-file=.env.local scripts/sync-itinerary.mjs
 *
 * This overwrites the DB row for japan.itinerary with the current static data.
 */

import { itinerary } from '../src/data/japan/itinerary.js';
import { createPool } from '@vercel/postgres';

const TRIP_ID = 'japan';
const DATA_KEY = 'itinerary';

const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
});

async function main() {
    console.log(`Syncing ${TRIP_ID}.${DATA_KEY} to DB...`);
    console.log(`Days to sync: ${itinerary.length}`);

    try {
        // Ensure table exists
        await pool.query(`
      CREATE TABLE IF NOT EXISTS trip_data (
        trip_id VARCHAR(50) NOT NULL,
        data_key VARCHAR(50) NOT NULL,
        data_value JSONB NOT NULL,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (trip_id, data_key)
      );
    `);

        // Upsert static data
        await pool.query(
            `INSERT INTO trip_data (trip_id, data_key, data_value, last_updated)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (trip_id, data_key)
       DO UPDATE SET data_value = $3, last_updated = NOW()`,
            [TRIP_ID, DATA_KEY, JSON.stringify(itinerary)]
        );

        console.log(`✅ Sync complete! ${itinerary.length} days written to DB.`);
    } catch (err) {
        console.error('❌ Sync failed:', err.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

main();
