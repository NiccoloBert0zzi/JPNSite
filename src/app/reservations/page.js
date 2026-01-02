"use client";
export default function ReservationsPage() {
    const checklist = [
        { item: 'Voli (Andata/Ritorno)', status: 'done' },
        { item: 'Hotel Osaka', status: 'done' },
        { item: 'Hotel Kyoto', status: 'done' },
        { item: 'Hotel Tokyo', status: 'done' },
        { item: 'JR Kansai-Hiroshima Pass', status: 'todo' },
        { item: 'USJ Express Pass', status: 'todo' },
        { item: 'Disney Tickets', status: 'todo' },
        { item: 'Shinkansen Kyoto-Tokyo', status: 'todo' },
        { item: 'Pocket Wifi / eSIM', status: 'todo' },
        { item: 'Assicurazione Viaggio', status: 'todo' },
    ];

    return (
        <div className="section container">
            <h1>Prenotazioni & Mappa</h1>

            <div className="grid grid-2">
                <div className="checklist-section">
                    <h2>Checklist</h2>
                    <div className="checklist">
                        {checklist.map((c) => (
                            <div key={c.item} className={`check-item ${c.status}`}>
                                <span className="icon">{c.status === 'done' ? '✅' : '⭕'}</span>
                                <span className="label">{c.item}</span>
                                <span className="status-badge">{c.status === 'done' ? 'Prenotato' : 'Da fare'}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="map-section">
                    <h2>Mappa del Viaggio</h2>
                    <div className="map-placeholder">
                        <p>🗺️ Google Maps Embed</p>
                        <p style={{ fontSize: '0.8rem', color: '#666' }}>Qui andrà la mappa interattiva con i pin.</p>
                        {/* 
              Per embeddare Google Maps:
              <iframe src="LINK_EMBED" width="100%" height="100%" loading="lazy"></iframe>
            */}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .checklist {
          background: white;
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }
        .check-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-bottom: 1px solid var(--border);
        }
        .check-item:last-child { border-bottom: none; }
        .check-item.done { background: #f9fdfa; }
        .label { flex: 1; font-weight: 500; }
        .status-badge {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          background: #eee;
          text-transform: uppercase;
        }
        .check-item.done .status-badge { background: #d1fae5; color: #065f46; }
        .check-item.todo .status-badge { background: #fee2e2; color: #991b1b; }

        .map-placeholder {
          background: #eee;
          height: 400px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #888;
        }
      `}</style>
        </div>
    );
}
