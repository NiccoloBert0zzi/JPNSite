"use client";
import { itinerary } from '@/data/itinerary';
import Link from 'next/link';

export default function ItineraryPage() {
  return (
    <div className="section container">
      <h1>Itinerario di Viaggio</h1>
      <p>Dal 3 al 16 Ottobre 2026</p>

      <div className="timeline">
        {itinerary.map((day, index) => (
          <Link href={`/itinerary/${day.slug}`} key={day.date} className="day-card-link">
            <div className="day-card">
              <div className="date-badge">
                <span className="day-name">{day.day}</span>
                <span className="day-date">{day.date.split('-').reverse().join('/')}</span>
              </div>
              <div className="day-content">
                <div className="day-header">
                  <h2>{day.title}</h2>
                  <span className="location-tag">{day.location}</span>
                </div>

                <div className="highlights">
                  {day.highlights.map(h => (
                    <span key={h} className="highlight-pill">{h}</span>
                  ))}
                </div>

                <div className="activities">
                  {day.details.map((detail, i) => (
                    <div key={i} className={`activity-row type-${detail.type}`}>
                      <span className="time">{detail.time}</span>
                      <span className="description">{detail.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 2rem;
        }
        .day-card-link {
          display: block;
          transition: transform 0.2s;
        }
        .day-card-link:hover {
          transform: translateY(-4px);
        }
        .day-card {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 2rem;
          background: var(--card-bg);
          border: 1px solid var(--border);
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: var(--shadow);
          transition: border-color 0.2s;
        }
        .day-card-link:hover .day-card {
          border-color: var(--primary);
        }
        .more-activities {
          font-size: 0.85rem;
          color: var(--secondary);
          font-style: italic;
          padding-left: 0.5rem;
        }
        .date-badge {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: var(--background);
          border-radius: 8px;
          padding: 1rem;
          height: fit-content;
        }
        .day-name {
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          font-size: 0.9rem;
        }
        .day-date {
          font-size: 1.1rem;
          font-family: var(--font-display);
        }
        .day-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .location-tag {
          background: var(--secondary);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .highlight-pill {
          background: #f0f0f0;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          color: #555;
        }
        .activities {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .activity-row {
          display: flex;
          gap: 1.5rem;
          padding: 0.5rem;
          border-radius: 6px;
        }
        .activity-row:hover {
          background: #fafafa;
        }
        .time {
          font-weight: 600;
          min-width: 60px;
          color: var(--primary);
        }
        .type-transport .time { color: var(--secondary); }
        
        @media (max-width: 768px) {
          .day-card {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .date-badge {
            flex-direction: row;
            gap: 1rem;
            align-items: baseline;
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
