"use client";
import { useState, useEffect } from 'react';
import { budget } from '@/data/budget';
import StatsDashboard from '@/components/StatsDashboard';
export default function ReservationsPage() {
  const [checklist, setChecklist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reservations')
      .then(res => res.json())
      .then(data => {
        setChecklist(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load checklist", err);
        setLoading(false);
      });
  }, []);

  const toggleStatus = async (itemLabel) => {
    const newChecklist = checklist.map(item => {
      if (item.item === itemLabel) {
        return { ...item, status: item.status === 'done' ? 'todo' : 'done' };
      }
      return item;
    });

    // Optimistic UI update
    setChecklist(newChecklist);

    try {
      await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChecklist)
      });
    } catch (error) {
      console.error("Failed to save change", error);
      // Optionally revert state here if save fails
    }
  };

  // Calcoliamo il totale basato SOLO sugli elementi presenti nella lista
  const totalBookable = checklist.reduce((acc, curr) => acc + (curr.cost || 0), 0);

  return (
    <div className="section container">
      <h1>Prenotazioni & Mappa</h1>

      <div className="grid grid-2">
        <div className="checklist-section">
          <h2>Checklist</h2>
          <div className="checklist">
            {loading ? <p style={{ padding: '1rem' }}>Caricamento...</p> : checklist.map((c) => (
              <div
                key={c.item}
                className={`check-item ${c.status}`}
                onClick={() => toggleStatus(c.item)}
                style={{ cursor: 'pointer' }}
              >
                <span className="icon">{c.status === 'done' ? '✅' : '⭕'}</span>
                <span className="label">{c.item}</span>
                <span className="status-badge">{c.status === 'done' ? 'Prenotato' : 'Da fare'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="map-section">
          <StatsDashboard checklist={checklist} totalBudget={totalBookable} />
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
