"use client";
import Link from 'next/link';
import { budget } from '@/data/budget';

export default function Home() {
  return (
    <div className="home">
      <section className="hero section">
        <div className="container">
          <div className="hero-content">
            <span className="subtitle">Viaggio in Coppia</span>
            <h1>Giappone 2026</h1>
            <p className="dates">03 Ottobre — 16 Ottobre</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="label">Giorni</span>
                <span className="value">14</span>
              </div>
              <div className="stat">
                <span className="label">Città</span>
                <span className="value">3</span>
              </div>
              <div className="stat">
                <span className="label">Budget Safe</span>
                <span className="value">€{budget.totalSafe.toLocaleString('it-IT')}</span>
              </div>
            </div>
            <div className="actions">
              <Link href="/itinerary" className="btn">Scopri Itinerario</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="overview section">
        <div className="container">
          <div className="grid grid-3">
            <Link href="/itinerary" className="card overview-card">
              <h3>Itinerario 📅</h3>
              <p>Osaka, Kyoto, Hiroshima, Tokyo e Fuji. Dettagli giorno per giorno.</p>
            </Link>
            <Link href="/budget" className="card overview-card">
              <h3>Budget 💰</h3>
              <p>Analisi dei costi: Voli, Hotel, Cibo e Attrazioni.</p>
            </Link>
            <Link href="/transport" className="card overview-card">
              <h3>Trasporti 🚅</h3>
              <p>JR Pass, Shinkansen, Suica e strategie di spostamento.</p>
            </Link>
            <Link href="/reservations" className="card overview-card">
              <h3>Prenotazioni ✅</h3>
              <p>Checklist di cose da prenotare e mappa del viaggio.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative background or style could be added here in CSS */}
      <style jsx>{`
        .hero {
          text-align: center;
          padding: 6rem 0;
          background: linear-gradient(180deg, var(--background) 0%, #f4f4f4 100%);
        }
        .subtitle {
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--primary);
          font-weight: 600;
          font-size: 0.9rem;
          display: block;
          margin-bottom: 1rem;
        }
        .dates {
          font-size: 1.25rem;
          color: var(--secondary);
          margin-bottom: 2rem;
        }
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }
        .stat {
          text-align: center;
        }
        .stat .label {
          display: block;
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--secondary);
        }
        .stat .value {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
        }
        .overview-card {
          text-align: left;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .overview-card:hover h3 {
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}
