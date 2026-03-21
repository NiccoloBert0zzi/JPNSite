import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { reservations as defaultChecklist } from '@/data';
import { checkAuth } from '@/app/actions';

export const dynamic = 'force-dynamic';

const TRIP_ID = process.env.NEXT_PUBLIC_TRIP_ID || 'japan';

// Run DB setup once per server instance, not on every request.
let setupDone = false;
/** @type {Promise<void> | null} */
let setupPromise = null;

async function runSetup() {
    await sql`
        CREATE TABLE IF NOT EXISTS reservations (
            id SERIAL PRIMARY KEY,
            item TEXT NOT NULL,
            status TEXT NOT NULL,
            cost NUMERIC NOT NULL,
            category TEXT NOT NULL
        );
    `;

    await sql`ALTER TABLE reservations ADD COLUMN IF NOT EXISTS trip_id TEXT;`;
    await sql`UPDATE reservations SET trip_id = 'japan' WHERE trip_id IS NULL;`;

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
}

async function ensureReady() {
    if (setupDone) return;
    // Deduplicate concurrent calls during the first request burst
    if (!setupPromise) {
        setupPromise = runSetup()
            .then(() => { setupDone = true; })
            .catch((err) => {
                setupPromise = null; // allow retry on next request if setup failed
                throw err;
            });
    }
    await setupPromise;
}

export async function GET() {
    try {
        await ensureReady();
        const { rows } = await sql`SELECT * FROM reservations WHERE trip_id = ${TRIP_ID} ORDER BY id ASC`;
        return NextResponse.json(rows.map(row => ({ ...row, cost: Number(row.cost) })));
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
    }
}

/** @param {Request} request */
export async function POST(request) {
    if (!await checkAuth()) {
        return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    try {
        const body = await request.json();
        await ensureReady();

        const itemsToProcess = Array.isArray(body) ? body : [body];
        const processedItems = [];

        for (const item of itemsToProcess) {
            if (item.id) {
                const result = await sql`
                    UPDATE reservations
                    SET item = ${item.item}, status = ${item.status}, cost = ${item.cost}, category = ${item.category}
                    WHERE id = ${item.id} AND trip_id = ${TRIP_ID}
                    RETURNING *;
                `;
                if (result.rows[0]) processedItems.push(result.rows[0]);
            } else {
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

/** @param {Request} request */
export async function DELETE(request) {
    if (!await checkAuth()) {
        return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

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
