import { currentTrip } from '@/data';
import { fetchData } from '@/app/actions';
import EditableTransportList from '@/components/EditableTransportList';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function TransportPage() {
  const tripId = currentTrip.title.includes('Budapest') ? 'budapest' : 'japan';
  const data = await fetchData(tripId, 'transport');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HERO SECTION */}
      <div
        className="relative bg-gray-900 text-white pt-32 pb-44 px-6"
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

      <div className="relative z-10 mt-20">
        <div className="container mx-auto max-w-5xl px-6">

          <EditableTransportList initialData={data} tripId={tripId} />

          <div className="info-box mt-16">
            <h3>📌 Note Importanti</h3>
            <ul>
              <li><strong>IC Card (Suica/Pasmo):</strong> Indispensabile per tratti brevi non coperti. Ricaricare su iPhone (Wallet).</li>
              <li><strong>Taxi:</strong> Usare solo quando strettamente necessario (es. Katsuoji). In città preferire metro e piedi.</li>
              <li><strong>Shinkansen:</strong> Prenotare posto riservato (incluso nel pass Kansai-Hiroshima per le tratte ovest).</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
         /* Reusing styles from globals/component mostly, kept simple inline here or better in global css */
         .info-box {
            background: linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%);
            border: 1px solid #fde68a;
            padding: 2rem;
            border-radius: 16px;
        }
        .info-box h3 { margin-top: 0; color: #b45309; }
        .info-box ul { padding-left: 1.5rem; margin-bottom: 0; }
        .info-box li { margin-bottom: 0.5rem; color: #78350f; }
      `}</style>
    </div>
  );
}
