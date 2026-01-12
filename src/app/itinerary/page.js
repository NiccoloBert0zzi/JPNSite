import { currentTrip } from '@/data';
import { fetchData } from '@/app/actions';
import EditableItineraryList from '@/components/EditableItineraryList';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ItineraryPage() {
  const tripId = currentTrip.title.includes('Budapest') ? 'budapest' : 'japan';
  const data = await fetchData(tripId, 'itinerary');

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
          <h1 className="text-gray-200 text-5xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg font-display">Itinerario di Viaggio</h1>
          <p className="text-gray-200 text-xl font-light max-w-xl mx-auto text-shadow-sm">{currentTrip.dates}</p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 relative z-10 -mt-10">
        <EditableItineraryList initialData={data} tripId={tripId} />
      </div>
    </div>
  );
}
