import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

const defaultChecklist = [
    { item: 'Voli (Andata/Ritorno)', status: 'done', cost: 1632.00, category: 'Voli' },
    { item: 'Hotel Osaka', status: 'done', cost: 264.60, category: 'Hotel' },
    { item: 'Hotel Kyoto', status: 'done', cost: 224.19, category: 'Hotel' },
    { item: 'Hotel Tokyo', status: 'done', cost: 497.52, category: 'Hotel' },
    { item: 'JR Kansai-Hiroshima Pass', status: 'done', cost: 135.00, category: 'Trasporti' },
    { item: 'Shinkansen Kyoto-Tokyo', status: 'todo', cost: 100.00, category: 'Trasporti' },
    { item: 'Spostamenti Locali', status: 'todo', cost: 100.00, category: 'Trasporti' },
    { item: 'USJ Express Pass', status: 'todo', cost: 200.00, category: 'Attrazioni' },
    { item: 'Disney Tickets', status: 'todo', cost: 160.00, category: 'Attrazioni' },
    { item: 'TeamLab / Altri Ingressi', status: 'todo', cost: 100.00, category: 'Attrazioni' },
    { item: 'Pocket Wifi / eSIM', status: 'todo', cost: 50.00, category: 'Servizi' },
    { item: 'Assicurazione Viaggio', status: 'todo', cost: 126.00, category: 'Assicurazione' },
    { item: 'Cibo & Extra', status: 'todo', cost: 650.00, category: 'Cibo' },
];

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

        // Attempt to remove unique constraint if it exists (migration step)
        try {
            await sql`ALTER TABLE reservations DROP CONSTRAINT IF EXISTS reservations_item_key;`;
        } catch (e) {
            // constraint might not exist or other error, ignore safely
            console.log('Constraint drop skipped or failed (non-critical):', e.message);
        }

        const { rows } = await sql`SELECT count(*) FROM reservations`;
        if (rows[0].count == 0) {
            for (const item of defaultChecklist) {
                await sql`
                    INSERT INTO reservations (item, status, cost, category)
                    VALUES (${item.item}, ${item.status}, ${item.cost}, ${item.category})
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
        const { rows } = await sql`SELECT * FROM reservations ORDER BY id ASC`;
        // Convert cost to number
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

        // The body can be a single item (for update/create) or list. 
        // For simplicity based on previous code, let's assume the frontend sends the whole list 
        // OR we can switch to handling single items which is more efficient. 
        // The previous code sent the whole list "JSON.stringify(updatedItems)".

        // Let's optimize: The frontend will likely send the whole updated list or specific items.
        // But to support "Add" and "Rename" properly with IDs, we should probably handle upserts carefully.

        // Re-aligning with plan: The frontend sends the *entire modified array*. 
        // We will loop through them.

        const itemsToProcess = Array.isArray(body) ? body : [body];
        const processedItems = [];

        for (const item of itemsToProcess) {
            if (item.id) {
                // Update existing
                const result = await sql`
                    UPDATE reservations 
                    SET item = ${item.item}, status = ${item.status}, cost = ${item.cost}, category = ${item.category}
                    WHERE id = ${item.id}
                    RETURNING *;
                `;
                if (result.rows[0]) processedItems.push(result.rows[0]);
            } else {
                // Insert new
                const result = await sql`
                    INSERT INTO reservations (item, status, cost, category)
                    VALUES (${item.item}, ${item.status}, ${item.cost}, ${item.category})
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
