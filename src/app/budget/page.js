"use client";
import { budget } from '@/data/budget';

export default function BudgetPage() {
    return (
        <div className="section container">
            <h1>Budget Previsionale</h1>
            <p>Stima per 2 Persone (14 Giorni)</p>

            <div className="grid grid-2" style={{ marginBottom: '3rem', marginTop: '2rem' }}>
                <div className="card total-card">
                    <h3>Totale (Senza Cibo)</h3>
                    <div className="total-amount">€{budget.totalNoFood.toLocaleString('it-IT')}</div>
                    <p>Include voli, hotel, trasporti e attrazioni.</p>
                </div>
                <div className="card total-card safe">
                    <h3>Totale (Safe + Cibo)</h3>
                    <div className="total-amount">€{budget.totalSafe.toLocaleString('it-IT')}</div>
                    <p>Include stima cibo realistica (~€45-50/gg).</p>
                </div>
            </div>

            <h2>Dettaglio Spese</h2>
            <div className="breakdown-table">
                {budget.breakdown.map((item) => (
                    <div key={item.category} className="breakdown-row">
                        <div className="cat-name">{item.category}</div>
                        <div className="cat-note">{item.note}</div>
                        <div className="cat-amount">€{item.amount.toLocaleString('it-IT')}</div>
                    </div>
                ))}
            </div>

            <h2 style={{ marginTop: '3rem' }}>Dettaglio Hotel</h2>
            <div className="grid grid-3" style={{ marginTop: '1rem' }}>
                {budget.hotels.map((h) => (
                    <div key={h.city} className="card hotel-card">
                        <h3>{h.city}</h3>
                        <p className="hotel-name">{h.name}</p>
                        <div className="hotel-details">
                            <span>{h.nights} notti</span>
                            <span className="hotel-cost">€{h.cost.toLocaleString('it-IT')}</span>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .total-card {
          text-align: center;
          background: #fafafa;
          border-color: #ddd;
        }
        .total-card.safe {
          background: #f0f7f4;
          border-color: #cceddf;
        }
        .total-amount {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
          margin: 1rem 0;
        }
        .breakdown-table {
          background: white;
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }
        .breakdown-row {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border);
          align-items: center;
        }
        .breakdown-row:last-child { border-bottom: none; }
        .cat-name { font-weight: 600; }
        .cat-note { color: var(--secondary); font-size: 0.9rem; }
        .cat-amount { font-weight: 700; text-align: right; }
        
        .hotel-name { font-weight: 500; margin-bottom: 0.5rem; }
        .hotel-details {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid var(--border);
          padding-top: 1rem;
          margin-top: 1rem;
          font-size: 0.9rem;
        }
        .hotel-cost { font-weight: 700; }

        @media (max-width: 600px) {
          .breakdown-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
            text-align: center;
          }
          .cat-amount { text-align: center; color: var(--primary); }
        }
      `}</style>
        </div>
    );
}
