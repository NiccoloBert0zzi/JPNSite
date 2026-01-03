"use client";
import React, { use } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { itinerary } from "@/data/itinerary";
import { notFound } from "next/navigation";

// Dynamically import the Map component to avoid SSR issues with Leaflet
const RouteMap = dynamic(() => import("@/components/RouteMap"), {
    ssr: false,
    loading: () => (
        <div
            style={{
                height: "450px",
                background: "#111",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#555",
            }}
        >
            Caricamento Mappa...
        </div>
    ),
});

export default function ItineraryDetail({ params }) {
    const resolvedParams = use(params);
    const { slug } = resolvedParams;

    const day = itinerary.find((i) => i.slug === slug);

    if (!day) {
        notFound();
    }

    // Helper date formatter
    const formatDate = (dateStr) => {
        const options = { month: "long", day: "numeric" };
        return new Date(dateStr).toLocaleDateString("it-IT", options);
    };

    return (
        <div className="detail-page">
            {/* HERO SECTION */}
            <div
                className="hero-banner"
                style={{ backgroundImage: `url(${day.image || "/images/hero.png"})` }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content container">
                    {/* Main Content aligned to bottom */}
                    <div className="hero-main">
                        <div className="hero-toprow">
                            <Link href="/itinerary" className="back-link">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                                <span>TORNA ALL'ITINERARIO</span>
                            </Link>

                            <div className="location-badge">OSAKA</div>
                        </div>

                        <h1>{day.title}</h1>

                        <p className="hero-subtitle">
                            <span className="day-name">{day.day}</span>
                            <span className="separator">•</span>
                            <span className="date-val">{formatDate(day.date)}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="container section main-layout">
                <div className="content-grid">
                    {/* LEFT COLUMN */}
                    <div className="main-col">
                        <section className="overview-card">
                            <h2>Panoramica</h2>
                            <p className="lead">{day.description}</p>
                            <div className="tags">
                                {day.highlights.map((h) => (
                                    <span key={h} className="tag">
                                        {h}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section className="timeline-section">
                            <h2>Programma Dettagliato</h2>
                            <div className="timeline-container">
                                {day.details.map((detail, i) => (
                                    <div key={i} className={`timeline-item type-${detail.type}`}>
                                        <div className="timeline-marker"></div>
                                        <div className="timeline-content">
                                            <span className="time">{detail.time}</span>
                                            <p className="activity">{detail.activity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN */}
                    <aside className="sidebar-col">
                        {day.curiosities && (
                            <div className="info-card curiosity">
                                <div className="card-icon">💡</div>
                                <h3>Lo Sapevi Che?</h3>
                                <ul>
                                    {day.curiosities.map((c, i) => (
                                        <li key={i}>{c}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {day.info && (
                            <div className="info-card tips">
                                <div className="card-icon">ℹ️</div>
                                <h3>Info Pratiche</h3>
                                <ul>
                                    {day.info.map((info, i) => (
                                        <li key={i}>{info}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </aside>
                </div>
            </div>

            {/* MAP SECTION */}
            {(day.coordinates || day.mapUrl) && (
                <section className="map-section">
                    <div className="container">
                        <h2>Mappa del Percorso</h2>
                        <div className="map-frame">
                            {day.coordinates ? (
                                <RouteMap coordinates={day.coordinates} />
                            ) : (
                                <iframe
                                    src={day.mapUrl}
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            )}
                        </div>
                    </div>
                </section>
            )}

            <style jsx>{`
        .detail-page {
          background-color: #fafafa;
          min-height: 100vh;
        }

.hero-toprow {
  display: flex;
  align-items: center;
  width: 100%;
}

        /* HERO STYLES */
        .hero-banner {
          position: relative;
          height: 60vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          color: white;
          overflow: hidden;
          background-size: cover;
          background-position: center top; 
        }
        
        .back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: rgba(255,255,255,0.75);
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  font-weight: 600;
  white-space: nowrap;
}
  
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0.9)
          );
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          animation: fadeIn 0.8s ease-out;
          padding-top: 6rem; /* Account for navbar */
          padding-bottom: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end; /* Align content to bottom */
          align-items: flex-start; /* Ensure items don't stretch */
        }

.hero-main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 2rem;
}


        .back-nav a {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          background: rgba(255,255,255,0.15);
          padding: 0.5rem 1rem;
          border-radius: 99px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.2);
          text-transform: uppercase;
          text-decoration: none;
        }
        .back-nav a:hover {
          background: rgba(255, 255, 255, 0.25);
          color: white;
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.4);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

.location-badge {
  display: inline-block;
  background: var(--primary);
  color: white;
  padding: 0.35rem 0.85rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  align-self: flex-start;
  margin-bottom: 0;
  margin-left: auto;
  white-space: nowrap;
  }

  @media (max-width: 520px) {
  .location-badge {
    margin-left: 0;
  }
}

        .hero-content h1 {
          color: white;
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.95);
          font-family: var(--font-display);
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 500;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        .separator {
          color: var(--primary-light);
          font-size: 1.2rem;
          opacity: 0.8;
        }
        
        .day-name {
            font-style: italic;
        }

        /* CONTENT LAYOUT */
        .content-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 5rem;
          align-items: start;
        }

        .overview-card {
           margin-bottom: 4rem;
        }
        
        .lead {
          font-size: 1.35rem;
          line-height: 1.7;
          color: #374151; /* Darker than default */
          margin-bottom: 2rem;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .tag {
          background: white;
          border: 1px solid #e5e7eb;
          padding: 0.5rem 1.25rem;
          border-radius: 99px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        /* TIMELINE */
        .timeline-section h2 {
            margin-bottom: 3rem;
        }
        
        .timeline-container {
            position: relative;
            padding-left: 1rem;
        }
        .timeline-container::before {
            content: '';
            position: absolute;
            top: 25px;
            bottom: 30px;
            left: 23px;
            width: 2px;
            background: #e5e7eb;
        }

        .timeline-item {
            display: flex;
            gap: 2.5rem;
            margin-bottom: 3rem;
            position: relative;
        }

        .timeline-marker {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: white;
            border: 4px solid var(--primary);
            flex-shrink: 0;
            z-index: 1;
            box-shadow: 0 0 0 4px white;
            margin-top: 4px;
        }

        /* Dynamic Colors for Timeline Types */
        .type-transport .timeline-marker { border-color: #9CA3AF; }
        .type-food .timeline-marker { border-color: #F59E0B; }
        .type-hotel .timeline-marker { border-color: #10B981; }

        .timeline-content {
             flex-grow: 1;
        }
        
        .time {
            display: block;
            font-size: 0.9rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 0.25rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
         .type-transport .time { color: var(--secondary); }
         
        .activity {
            font-size: 1.2rem;
            font-weight: 600;
            color: #1F2937;
            margin: 0;
            line-height: 1.4;
        }

        /* SIDEBAR CARDS */
        .info-card {
            background: white;
            border-radius: 20px;
            padding: 2.5rem;
            border: 1px solid rgba(0,0,0,0.06);
            box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08); /* More diffuse shadow */
            margin-bottom: 2.5rem;
            position: relative;
            overflow: hidden;
        }
        
        .curiosity { border-top: 5px solid #F59E0B; }
        .tips { border-top: 5px solid #3B82F6; }

        .card-icon {
            font-size: 2rem;
            margin-bottom: 1.5rem;
        }

        .info-card h3 {
            font-size: 1.25rem;
            margin-bottom: 1.25rem;
        }
        .info-card ul {
            list-style: none;
            padding: 0;
        }
        .info-card li {
            margin-bottom: 1rem;
            padding-left: 1.4rem;
            position: relative;
            font-size: 1rem;
            color: #4B5563;
        }
        .info-card li::before {
            content: "•";
            position: absolute;
            left: 0;
            color: var(--secondary);
            font-weight: bold;
            font-size: 1.2rem;
            line-height: 1;
        }

        /* MAP SECTION */
        .map-section {
            background: white;
            padding: 6rem 0;
            border-top: 1px solid #f3f4f6;
        }
        .map-section h2 {
            text-align: center;
            margin-bottom: 4rem;
        }
        .map-frame {
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
            background: #222; /* Dark placeholder matches branding */
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
            .content-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
             .timeline-container::before {
                left: 14px;
            }
            .timeline-marker {
                width: 20px;
                height: 20px;
                border-width: 3px;
                box-shadow: 0 0 0 3px white;
            }
            .timeline-container {
                padding-left: 0.5rem;
            }
        }
      `}</style>
        </div>
    );
}
