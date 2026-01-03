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
                item TEXT UNIQUE NOT NULL,
                status TEXT NOT NULL,
                cost NUMERIC NOT NULL,
                category TEXT NOT NULL
            );
        `;

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
        // Convert cost to number (postgres returns numeric as string)
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

        for (const item of body) {
            await sql`
                INSERT INTO reservations (item, status, cost, category)
                VALUES (${item.item}, ${item.status}, ${item.cost}, ${item.category})
                ON CONFLICT (item) 
                DO UPDATE SET 
                    cost = ${item.cost},
                    status = ${item.status},
                    category = ${item.category};
            `;
        }

        return NextResponse.json({ success: true, data: body });
    } catch (error) {
        console.error("Error saving reservations:", error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
