import { sql } from '@vercel/postgres';
import { itinerary as japanItinerary } from '@/data/japan/itinerary';
import { accommodations as japanAccommodations } from '@/data/japan/accommodations';
import { transport as japanTransport } from '@/data/japan/transport';
import { budget as japanBudget } from '@/data/japan/budget';

import { itinerary as budapestItinerary } from '@/data/budapest/itinerary';
import { accommodations as budapestAccommodations } from '@/data/budapest/accommodations';
import { transport as budapestTransport } from '@/data/budapest/transport';
import { budget as budapestBudget } from '@/data/budapest/budget';

// Map static data for seed/fallback
const STATIC_DATA = {
    japan: {
        itinerary: japanItinerary,
        accommodations: japanAccommodations,
        transport: japanTransport,
        budget: japanBudget
    },
    budapest: {
        itinerary: budapestItinerary,
        accommodations: budapestAccommodations,
        transport: budapestTransport,
        budget: budapestBudget
    }
};

export async function createTable() {
    try {
        await sql`
      CREATE TABLE IF NOT EXISTS trip_data (
        trip_id VARCHAR(50) NOT NULL,
        data_key VARCHAR(50) NOT NULL,
        data_value JSONB NOT NULL,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (trip_id, data_key)
      );
    `;
    } catch (error) {
        console.error('Failed to create table:', error);
    }
}

export async function getTripData(tripId, key) {
    try {
        // 1. Try fetching from DB
        const { rows } = await sql`
      SELECT data_value FROM trip_data 
      WHERE trip_id = ${tripId} AND data_key = ${key}
    `;

        if (rows.length > 0) {
            return rows[0].data_value;
        }

        // 2. Fallback to static file (Seed)
        console.log(`No DB data for ${tripId}.${key}, using static fallback.`);
        const staticValue = STATIC_DATA[tripId]?.[key];

        // Optional: Auto-seed on first read? 
        // For now, just return static so the site works immediately.
        return staticValue || [];

    } catch (error) {
        console.error('Database Error:', error);
        // Fallback on error (e.g. missing env vars locally)
        return STATIC_DATA[tripId]?.[key] || [];
    }
}

export async function saveTripData(tripId, key, newData) {
    try {
        await createTable(); // Ensure table exists

        await sql`
      INSERT INTO trip_data (trip_id, data_key, data_value, last_updated)
      VALUES (${tripId}, ${key}, ${JSON.stringify(newData)}, NOW())
      ON CONFLICT (trip_id, data_key) 
      DO UPDATE SET 
        data_value = ${JSON.stringify(newData)}, 
        last_updated = NOW();
    `;
        return { success: true };
    } catch (error) {
        console.error('Save Error:', error);
        return { success: false, error: error.message };
    }
}
