"use client";
import { transport, currentTrip } from '@/data';
import Link from 'next/link';

export default function TransportPage() {
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
          <h1 className="text-gray-200 text-5xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg font-display">Trasporti & Pass</h1>
          <p className="text-gray-200 text-xl font-light max-w-xl mx-auto text-shadow-sm">Strategia ottimizzata per muoversi.</p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 relative z-10 -mt-10">
        <div className="grid grid-2 transport-grid">
          {transport.map((item) => (
            <div key={item.name} className="card transport-card">
              <div className="card-image" style={{ backgroundImage: `url(${item.image})` }}>
                <div className="overlay"></div>
                <div className="cost-badge">{item.cost}</div>
              </div>

              <div className="card-content">
                <div className="header-row">
                  <h3>{item.name}</h3>
                  <span className="duration-tag">{item.duration}</span>
                </div>
                <p className="dates">📅 {item.dates}</p>

                <div className="coverage-section">
                  <h4>Copertura</h4>
                  <ul>
                    {item.coverage.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="info-box mt-16">
          <h3>📌 Note Importanti</h3>
          <ul>
            <li><strong>IC Card (Suica/Pasmo):</strong> Indispensabile per tratti brevi non coperti. Ricaricare su iPhone (Wallet).</li>
            <li><strong>Taxi:</strong> Usare solo quando strettamente necessario (es. Katsuoji). In città preferire metro e piedi.</li>
            <li><strong>Shinkansen:</strong> Prenotare posto riservato (incluso nel pass Kansai-Hiroshima per le tratte ovest).</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
                .page-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }
                .page-header h1 {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                    background: linear-gradient(135deg, var(--primary) 0%, #2563eb 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .page-header p {
                    color: #666;
                    font-size: 1.1rem;
                }

                .transport-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
                    gap: 1.5rem;
                    perspective: 1000px;
                }

                .transport-card {
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    border: 1px solid rgba(0,0,0,0.05);
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    min-height: 500px;
                }
                .transport-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px -12px rgba(0,0,0,0.15);
                }

                .card-image {
                    height: 250px;
                    background-size: cover;
                    background-position: center;
                    position: relative;
                }
                .overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%);
                }
                .cost-badge {
                    position: absolute;
                    bottom: 1rem;
                    right: 1.25rem;
                    background: rgba(255, 255, 255, 0.95);
                    color: var(--primary);
                    padding: 0.5rem 1rem;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 0.95rem;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                    backdrop-filter: blur(4px);
                }

                .card-content {
                    padding: 1.5rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 1rem;
                    margin-bottom: 0.5rem;
                }
                .header-row h3 {
                    margin: 0;
                    font-size: 1.25rem;
                    font-weight: 700;
                    line-height: 1.3;
                }

                .duration-tag {
                    background: #f3f4f6;
                    color: #4b5563;
                    font-size: 0.75rem;
                    font-weight: 600;
                    padding: 0.25rem 0.6rem;
                    border-radius: 6px;
                    white-space: nowrap;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .dates {
                    color: #888;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                }

                .coverage-section h4 {
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    color: #aaa;
                    margin-bottom: 0.75rem;
                    letter-spacing: 0.05em;
                    font-weight: 600;
                }
                .coverage-section ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .coverage-section li {
                    position: relative;
                    padding-left: 1.5rem;
                    margin-bottom: 0.5rem;
                    font-size: 0.95rem;
                    color: #444;
                    line-height: 1.4;
                }
                .coverage-section li::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0.4rem;
                    width: 6px;
                    height: 6px;
                    background: var(--primary);
                    border-radius: 50%;
                }

                .info-box {
                    background: linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%);
                    border: 1px solid #fde68a;
                    padding: 2rem;
                    border-radius: 16px;
                }
                .info-box h3 { margin-top: 0; color: #b45309; }
                .info-box ul { padding-left: 1.5rem; margin-bottom: 0; }
                .info-box li { margin-bottom: 0.5rem; color: #78350f; }

                @media (max-width: 768px) {
                    .transport-grid {
                        grid-template-columns: 1fr;
                    }
                    .transport-card {
                        aspect-ratio: auto;
                    }
                    .card-image {
                        height: 200px;
                    }
                }
            `}</style>
    </div>
  );
}
