"use client";
import { transport } from '@/data/transport';

export default function TransportPage() {
    return (
        <div className="section container">
            <h1>Trasporti & Pass</h1>
            <p>Strategia ottimizzata per risparmiare sugli spostamenti.</p>

            <div className="grid grid-2" style={{ marginTop: '2rem' }}>
                {transport.map((item) => (
                    <div key={item.name} className="card transport-card">
                        <div className="card-header">
                            <h3>{item.name}</h3>
                            <span className="dates">{item.dates}</span>
                        </div>
                        <div className="cost-tag">{item.cost}</div>
                        <p className="duration">Validità: {item.duration}</p>

                        <div className="coverage-list">
                            <h4>Copertura:</h4>
                            <ul>
                                {item.coverage.map((c, i) => (
                                    <li key={i}>{c}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <div className="info-box" style={{ marginTop: '3rem' }}>
                <h3>Note Importanti</h3>
                <ul>
                    <li><strong>IC Card (Suica/Pasmo):</strong> Indispensabile per tratti brevi non coperti. Ricaricare su iPhone (Wallet) o prendere carta fisica.</li>
                    <li><strong>Taxi:</strong> Usare solo quando strettamente necessario (es. Katsuoji). In città preferire metro e piedi.</li>
                    <li><strong>Shinkansen:</strong> Prenotare posto riservato (incluso nel pass Kansai-Hiroshima per le tratte ovest, a pagamento per Kyoto-Tokyo).</li>
                </ul>
            </div>

            <style jsx>{`
        .transport-card {
          position: relative;
          overflow: hidden;
        }
        .card-header {
          margin-bottom: 1rem;
        }
        .dates {
          display: block;
          font-size: 0.85rem;
          color: var(--secondary);
          margin-top: 0.25rem;
        }
        .cost-tag {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: var(--primary);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .duration {
          font-weight: 500;
          margin-bottom: 1rem;
        }
        .coverage-list h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          color: var(--secondary);
          margin-bottom: 0.5rem;
        }
        .coverage-list ul {
          list-style: none;
          padding: 0;
        }
        .coverage-list li {
          position: relative;
          padding-left: 1.25rem;
          margin-bottom: 0.25rem;
          font-size: 0.95rem;
        }
        .coverage-list li::before {
          content: "•";
          color: var(--primary);
          position: absolute;
          left: 0;
          font-weight: bold;
        }
        .info-box {
          background: #fff8e1;
          border: 1px solid #ffe082;
          padding: 2rem;
          border-radius: 12px;
        }
        .info-box ul {
          margin-left: 1.5rem;
        }
        .info-box li {
          margin-bottom: 0.5rem;
        }
      `}</style>
        </div>
    );
}
