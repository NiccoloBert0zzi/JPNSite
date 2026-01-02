"use client";
import React, { use } from 'react';
import Link from 'next/link';
import { itinerary } from '@/data/itinerary';
import { notFound } from 'next/navigation';

export default function ItineraryDetail({ params }) {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const { slug } = resolvedParams;

    const day = itinerary.find(i => i.slug === slug);

    if (!day) {
        notFound();
    }

    return (
        <div className="detail-page">
            <div className="hero-banner">
                <div className="container">
                    <Link href="/itinerary" className="back-link">← Torna all'Itinerario</Link>
                    <span className="location-tag">{day.location}</span>
                    <h1>{day.title}</h1>
                    <p className="subtitle">{day.day} - {day.date.split('-').reverse().join('/')}</p>
                </div>
            </div>

            <div className="container section">
                <div className="grid grid-content">
                    <div className="main-content">
                        <section className="description-section">
                            <h2>Panoramica</h2>
                            <p className="lead">{day.description}</p>

                            <div className="tags">
                                {day.highlights.map(h => (
                                    <span key={h} className="tag">{h}</span>
                                ))}
                            </div>
                        </section>

                        <section className="timeline-section">
                            <h2>Programma Dettagliato</h2>
                            <div className="timeline-list">
                                {day.details.map((detail, i) => (
                                    <div key={i} className={`timeline-item type-${detail.type}`}>
                                        <div className="time-col">{detail.time}</div>
                                        <div className="content-col">
                                            <p>{detail.activity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="sidebar">
                        {day.image ? (
                            <div className="location-image" style={{ backgroundImage: `url(${day.image})` }} />
                        ) : (
                            <div className="image-placeholder">
                                <span>FOTO {day.location.toUpperCase()}</span>
                            </div>
                        )}

                        {day.curiosities && (
                            <div className="card info-card curiosity">
                                <h3>💡 Lo Sapevi Che?</h3>
                                <ul>
                                    {day.curiosities.map((c, i) => <li key={i}>{c}</li>)}
                                </ul>
                            </div>
                        )}

                        {day.info && (
                            <div className="card info-card tips">
                                <h3>ℹ️ Info Pratiche</h3>
                                <ul>
                                    {day.info.map((info, i) => <li key={i}>{info}</li>)}
                                </ul>
                            </div>
                        )}
                    </aside>
                </div>
            </div>

            <style jsx>{`
        .hero-banner {
          background: #2b2b2b;
          color: white;
          padding: 4rem 0;
          margin-bottom: 2rem;
        }
        .back-link {
          display: inline-block;
          color: #aaa;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        .back-link:hover { color: white; }
        .location-tag {
          background: var(--primary);
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
        }
        h1 { margin-top: 0.5rem; font-size: 3rem; }
        .subtitle { font-size: 1.25rem; opacity: 0.8; font-family: var(--font-display); }

        .grid-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
        }

        .lead { font-size: 1.2rem; margin-bottom: 1.5rem; line-height: 1.8; }
        .tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 3rem; }
        .tag { background: #eee; padding: 0.25rem 1rem; border-radius: 20px; font-size: 0.9rem; }

        .timeline-list { border-left: 2px solid #eee; padding-left: 1.5rem; }
        .timeline-item { position: relative; margin-bottom: 2rem; }
        .timeline-item::before {
          content: "";
          position: absolute;
          left: -1.95rem;
          top: 0.4rem;
          width: 12px;
          height: 12px;
          background: var(--primary);
          border-radius: 50%;
          border: 2px solid white;
        }
        .type-transport::before { background: var(--secondary); }
        .time-col { font-weight: 700; color: var(--primary); margin-bottom: 0.25rem; }
        .type-transport .time-col { color: var(--secondary); }
        .content-col p { margin: 0; }

        .image-placeholder {
          width: 100%;
          height: 200px;
          background: #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          color: #666;
          font-weight: 700;
          margin-bottom: 2rem;
        }
        .location-image {
          width: 100%;
          height: 250px;
          background-size: cover;
          background-position: center;
          border-radius: 12px;
          margin-bottom: 2rem;
          box-shadow: var(--shadow);
        }

        .info-card { margin-bottom: 1.5rem; }
        .info-card h3 { font-size: 1.1rem; margin-bottom: 1rem; }
        .info-card ul { padding-left: 1.2rem; }
        .info-card li { margin-bottom: 0.75rem; font-size: 0.95rem; }
        
        .curiosity { background: #fff8e1; border-color: #ffe082; }
        .tips { background: #e3f2fd; border-color: #90caf9; }

        @media (max-width: 768px) {
          .grid-content { grid-template-columns: 1fr; gap: 2rem; }
          h1 { font-size: 2rem; }
          .hero-banner { padding: 2rem 0; }
        }
      `}</style>
        </div>
    );
}
