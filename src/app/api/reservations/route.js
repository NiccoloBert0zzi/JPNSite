import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { reservations as defaultChecklist } from '@/data';

export const dynamic = 'force-dynamic';

const TRIP_ID = process.env.NEXT_PUBLIC_TRIP_ID || 'japan';

async function ensureTableAndData() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS reservations (
                id SERIAL PRIMARY KEY,
                item TEXT NOT NULL,
                status TEXT NOT NULL,
                cost NUMERIC NOT NULL,
                category TEXT NOT NULL
            );
        `;

        // Migration: Add trip_id column if it doesn't exist
        try {
            await sql`ALTER TABLE reservations ADD COLUMN IF NOT EXISTS trip_id TEXT;`;
            // Backfill existing data as 'japan' if NULL (Migration for existing production data)
            await sql`UPDATE reservations SET trip_id = 'japan' WHERE trip_id IS NULL;`;
        } catch (e) {
            console.log('Migration note:', e.message);
        }

        // Check data for THIS specific trip
        const { rows } = await sql`SELECT count(*) FROM reservations WHERE trip_id = ${TRIP_ID}`;

        if (rows[0].count == 0) {
            console.log(`No data found for trip ${TRIP_ID}. Seeding defaults...`);
            for (const item of defaultChecklist) {
                await sql`
                    INSERT INTO reservations (item, status, cost, category, trip_id)
                    VALUES (${item.item}, ${item.status}, ${item.cost}, ${item.category}, ${TRIP_ID})
                `;
            }
        }
    } catch (error) {
        console.error('Database setup failed:', error);
        throw error;
    }
}

export async function GET() {
    try {
        await ensureTableAndData();
        const { rows } = await sql`SELECT * FROM reservations WHERE trip_id = ${TRIP_ID} ORDER BY id ASC`;

        const data = rows.map(row => ({
            ...row,
            cost: Number(row.cost)
        }));
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await ensureTableAndData();

        const itemsToProcess = Array.isArray(body) ? body : [body];
        const processedItems = [];

        for (const item of itemsToProcess) {
            if (item.id) {
                // Update existing (Ensure we only update items belonging to this trip, for safety)
                const result = await sql`
                    UPDATE reservations 
                    SET item = ${item.item}, status = ${item.status}, cost = ${item.cost}, category = ${item.category}
                    WHERE id = ${item.id} AND trip_id = ${TRIP_ID}
                    RETURNING *;
                `;
                if (result.rows[0]) processedItems.push(result.rows[0]);
            } else {
                // Insert new with current TRIP_ID
                const result = await sql`
                    INSERT INTO reservations (item, status, cost, category, trip_id)
                    VALUES (${item.item}, ${item.status}, ${item.cost}, ${item.category}, ${TRIP_ID})
                    RETURNING *;
                `;
                if (result.rows[0]) processedItems.push(result.rows[0]);
            }
        }

        return NextResponse.json({ success: true, data: processedItems });
    } catch (error) {
        console.error("Error saving reservations:", error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        await sql`DELETE FROM reservations WHERE id = ${id}`;
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting reservation:", error);
        return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
    }
}
