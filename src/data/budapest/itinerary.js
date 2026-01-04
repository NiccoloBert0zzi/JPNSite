export const itinerary = [
    {
        slug: 'day-1',
        date: '2026-02-08',
        day: 'Domenica',
        location: 'Bologna -> Budapest',
        title: 'Arrivo a Budapest',
        image: '/images/budapest-hostel.png',
        highlights: ['Volo Serale', 'Check-in'],
        description: "Arrivo in tarda serata e sistemazione in ostello.",
        coordinates: [
            { title: "Aeroporto BUD", lat: 47.4336, lng: 19.2556 },
            { title: "Deák Ferenc tér (Bus 100E)", lat: 47.4984, lng: 19.0552 },
            { title: "a&o Budapest City", lat: 47.5024, lng: 19.0665 }
        ],
        curiosities: [
            "Il Bus 100E è l'unico mezzo diretto per il centro e richiede un biglietto speciale.",
            "L'aeroporto di Budapest (Ferenc Liszt) è dedicato al famoso compositore ungherese."
        ],
        info: [
            "Acquista il biglietto del Bus 100E (5.70€) direttamente alle macchinette viola fuori l'uscita.",
            "Scarica l'app **BudapestGO** per il trasporto pubblico.",
            "Cambia pochi Euro (o usa Revolut) per le piccole spese, ma la carta è accettata quasi ovunque."
        ],
        details: [
            { time: '21:30', activity: '✈️ Partenza da Bologna', type: 'transport' },
            { time: '22:55', activity: '🛬 Atterraggio a Budapest', type: 'transport' },
            { time: '23:30', activity: '🚌 Bus 100E per Deák Ferenc tér (€5.70)', type: 'transport' },
            { time: '00:00', activity: '🏨 Check-in a&o Budapest City', type: 'activity' }
        ]
    },
    {
        slug: 'day-2',
        date: '2026-02-09',
        day: 'Lunedì',
        location: 'Budapest (Buda & Pest)',
        title: 'Sightseeing Classico',
        image: '/images/budapest-parliament.png',
        highlights: ['Castello di Buda', 'Parlamento', 'Crociera'],
        description: "Esplorazione dei monumenti principali e crociera serale sul Danubio.",
        coordinates: [
            { title: "Batthyány tér (Miglior vista Parlamento)", lat: 47.5068, lng: 19.0394 },
            { title: "Bastione dei Pescatori", lat: 47.5022, lng: 19.0349 },
            { title: "Castello di Buda", lat: 47.4962, lng: 19.0396 },
            { title: "Ponte delle Catene", lat: 47.4990, lng: 19.0437 },
            { title: "Parlamento", lat: 47.5071, lng: 19.0456 },
            { title: "Scarpe sulla Riva del Danubio", lat: 47.5042, lng: 19.0448 },
            { title: "Basilica di Santo Stefano", lat: 47.5009, lng: 19.0540 }
        ],
        curiosities: [
            "Il Parlamento ungherese è il terzo più grande al mondo e ha 691 stanze.",
            "Le 'Scarpe sul Danubio' sono un memoriale in onore delle vittime della Shoah.",
            "Il Tram 2 è considerato una delle linee tranviarie più belle del mondo per la vista panoramica."
        ],
        info: [
            "Porta scarpe comode: si cammina molto!",
            "Per il Bastione dei Pescatori, la terrazza inferiore è gratuita.",
            "Prenota la crociera serale in anticipo su GetYourGuide per assicurarti il posto."
        ],
        details: [
            { time: '09:00', activity: '🚇 Metro M2 -> Batthyány tér (Vista Parlamento)', type: 'transport' },
            { time: '10:00', activity: '🏰 Bus 16 -> Castello di Buda, Bastione dei Pescatori, Chiesa di Mattia', type: 'activity' },
            { time: '13:00', activity: '🌉 Ponte delle Catene & Pranzo', type: 'food' },
            { time: '15:00', activity: '🏛️ Parlamento (Esterno) & Scarpe sul Danubio', type: 'activity' },
            { time: '16:30', activity: '🚋 Tram 2 Panoramico lungo il Danubio', type: 'transport' },
            { time: '17:30', activity: '⛪ Basilica di Santo Stefano', type: 'activity' },
            { time: '20:00', activity: '🚢 Crociera Notturna sul Danubio (€15)', type: 'activity' }
        ]
    },
    {
        slug: 'day-3',
        date: '2026-02-10',
        day: 'Martedì',
        location: 'Budapest -> Rientro',
        title: 'Terme & Relax',
        image: '/images/budapest-baths.png',
        highlights: ['Terme Széchenyi', 'Mercato Centrale', 'Rientro'],
        description: "Relax alle terme, ultimo shopping e volo di rientro.",
        coordinates: [
            { title: "Terme Széchenyi", lat: 47.5186, lng: 19.0824 },
            { title: "Mercato Centrale", lat: 47.4870, lng: 19.0584 },
            { title: "Deák Ferenc tér (Bus 100E)", lat: 47.4984, lng: 19.0552 },
            { title: "Aeroporto BUD", lat: 47.4336, lng: 19.2556 }
        ],
        curiosities: [
            "Le Terme Széchenyi sono il più grande complesso termale d'Europa.",
            "L'acqua proviene da due sorgenti termali con temperature di 74°C e 77°C.",
            "Al Mercato Centrale puoi trovare la vera Paprika ungherese, l'oro rosso del paese."
        ],
        info: [
            "Porta ciabatte, asciugamano e costume per le terme (noleggio costoso).",
            "Il Mercato Centrale chiude presto (spesso alle 18:00), vacci per pranzo!",
            "Arriva in aeroporto almeno 2 ore prima del volo."
        ],
        details: [
            { time: '09:00', activity: '🚇 Metro M1 -> Terme Széchenyi (€36)', type: 'activity' },
            { time: '13:00', activity: '🥘 Pranzo Tipico', type: 'food' },
            { time: '14:30', activity: '🛍️ Tram 47/49 -> Mercato Centrale (Souvenir)', type: 'activity' },
            { time: '17:00', activity: '🚌 Bus 100E -> Aeroporto (€5.70)', type: 'transport' },
            { time: '19:35', activity: '✈️ Volo Budapest -> Bologna', type: 'transport' },
            { time: '21:00', activity: '🏠 Arrivo a Bologna', type: 'transport' }
        ]
    }
];
