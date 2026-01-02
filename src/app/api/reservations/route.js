import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'reservations.json');

// Initial default data with costs and categories
const defaultChecklist = [
    { item: 'Voli (Andata/Ritorno)', status: 'done', cost: 1632.00, category: 'Voli' },
    { item: 'Hotel Osaka', status: 'done', cost: 264.60, category: 'Hotel' },
    { item: 'Hotel Kyoto', status: 'done', cost: 224.19, category: 'Hotel' },
    { item: 'Hotel Tokyo', status: 'done', cost: 497.52, category: 'Hotel' },
    { item: 'JR Kansai-Hiroshima Pass', status: 'todo', cost: 135.00, category: 'Trasporti' },
    { item: 'Shinkansen Kyoto-Tokyo', status: 'todo', cost: 100.00, category: 'Trasporti' },
    { item: 'Spostamenti Locali', status: 'todo', cost: 100.00, category: 'Trasporti' }, // Added generic local transport
    { item: 'USJ Express Pass', status: 'todo', cost: 200.00, category: 'Attrazioni' },
    { item: 'Disney Tickets', status: 'todo', cost: 160.00, category: 'Attrazioni' },
    { item: 'TeamLab / Altri Ingressi', status: 'todo', cost: 100.00, category: 'Attrazioni' },
    { item: 'Pocket Wifi / eSIM', status: 'todo', cost: 50.00, category: 'Servizi' },
    { item: 'Assicurazione Viaggio', status: 'todo', cost: 126.00, category: 'Assicurazione' },
    { item: 'Cibo & Extra', status: 'todo', cost: 650.00, category: 'Cibo' }, // Added Food as editable item
];

function ensureDataFile() {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, JSON.stringify(defaultChecklist, null, 2));
    }
}

export async function GET() {
    try {
        ensureDataFile();
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error reading reservations:", error);
        return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        ensureDataFile();
        fs.writeFileSync(dataFilePath, JSON.stringify(body, null, 2));
        return NextResponse.json({ success: true, data: body });
    } catch (error) {
        console.error("Error saving reservations:", error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
