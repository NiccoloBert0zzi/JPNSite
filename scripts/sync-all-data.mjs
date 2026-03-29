#!/usr/bin/env node
/**
 * Sync all static Japan trip data to the Vercel Postgres DB.
 * Usage: node --env-file=.env.local scripts/sync-all-data.mjs
 *
 * Overwrites DB rows for: japan.itinerary, japan.transport, japan.budget
 */

import { itinerary } from '../src/data/japan/itinerary.js';
import { transport } from '../src/data/japan/transport.js';
import { budget } from '../src/data/japan/budget.js';
import { createPool } from '@vercel/postgres';

const TRIP_ID = 'japan';

const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
});

async function upsert(client, dataKey, value) {
    await client.query(
        `INSERT INTO trip_data (trip_id, data_key, data_value, last_updated)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (trip_id, data_key)
         DO UPDATE SET data_value = $3, last_updated = NOW()`,
        [TRIP_ID, dataKey, JSON.stringify(value)]
    );
}

async function main() {
    console.log(`Syncing all data for trip: ${TRIP_ID}`);

    const client = await pool.connect();
    try {
        // Ensure table exists
        await client.query(`
            CREATE TABLE IF NOT EXISTS trip_data (
                trip_id     VARCHAR(50)  NOT NULL,
                data_key    VARCHAR(50)  NOT NULL,
                data_value  JSONB        NOT NULL,
                last_updated TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (trip_id, data_key)
            );
        `);

        await upsert(client, 'itinerary', itinerary);
        console.log(`✅ itinerary — ${itinerary.length} days`);

        await upsert(client, 'transport', transport);
        console.log(`✅ transport — ${transport.length} entries`);

        await upsert(client, 'budget', budget);
        console.log(`✅ budget — ${budget.breakdown.length} categories`);

        console.log('\n✅ All data synced successfully.');
    } catch (err) {
        console.error('❌ Sync failed:', err.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

main();
