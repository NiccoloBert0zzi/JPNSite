"use client";
import { useState, useEffect } from 'react';
import { budget, currentTrip } from '@/data';
import Link from 'next/link';
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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HERO SECTION */}
      <div
        className="relative bg-gray-900 text-white pt-32 pb-24 px-6"
        style={{
          backgroundImage: `url('${currentTrip.heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto max-w-5xl z-10 text-center">
          <Link href="/" className="text-gray-300 hover:text-white text-sm uppercase tracking-wider font-semibold mb-6 inline-flex items-center gap-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
            Torna alla Home
          </Link>
          <h1 className="text-gray-200 text-5xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg font-display">Prenotazioni & Mappa</h1>
          <p className="text-gray-200 text-xl font-light max-w-xl mx-auto text-shadow-sm">Checklist e posizione stay.</p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 relative z-10 -mt-10">

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
    </div>
  );
}
