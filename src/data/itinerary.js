export const itinerary = [
  {
    slug: 'osaka-arrival',
    date: '2026-10-03',
    day: 'Sabato',
    location: 'Osaka',
    title: 'Arrivo a Osaka',
    highlights: ['Arrivo KIX', 'Umeda', 'Hep Five'],
    image: '/images/osaka-hero.png',
    description: "Il primo impatto con il Giappone. Osaka è vibrante, caotica e famosa per il cibo. La zona di Umeda (Kita) è il cuore moderno, pieno di grattacieli e shopping.",
    curiosities: [
      "La stazione di Osaka/Umeda è considerata uno dei labirinti più complessi al mondo.",
      "Hep Five ha una ruota panoramica rossa brillante integrata direttamente nel centro commerciale."
    ],
    info: [
      "Trasporto KIX -> Osaka: Coperto da JR Pass (Haruka Express non coperto da Kansai-Hiroshima, usare Rapid o pagare supplemento, verifica in loco).",
      "Check-in hotel solitamente dalle 15:00."
    ],
    details: [
      { time: '12:10', activity: 'Arrivo all\'aeroporto Kansai (KIX).', type: 'transport' },
      { time: '13:30', activity: 'Ritiro JR Kansai–Hiroshima Area Pass e treno per Osaka Station.', type: 'transport' },
      { time: '15:00', activity: 'Check-in Hotel: The Rise Osaka Kitashinchi.', type: 'hotel' },
      { time: '16:30', activity: 'Esplorazione zona Umeda.', type: 'activity' },
      { time: '18:00', activity: 'Ruota panoramica Hep Five al tramonto.', type: 'activity' },
      { time: '20:00', activity: 'Cena in zona Umeda.', type: 'food' }
    ]
  },
  {
    slug: 'hiroshima-miyajima',
    date: '2026-10-04',
    day: 'Domenica',
    location: 'Hiroshima / Miyajima',
    title: 'Gita a Hiroshima & Miyajima',
    highlights: ['Itsukushima Shrine', 'Torii galleggiante', 'Peace Memorial Park'],
    description: "Una giornata intensa e toccante. Miyajima è l'isola in cui convivono uomini e dei, famosa per il Torii che sembra galleggiare sull'acqua.",
    curiosities: [
      "A Miyajima i cervi sono sacri e girano liberi, ma attenzione: mangiano la carta (mappe, banconote!).",
      "Il Torii di Miyajima non è sotterrato nel fondale, si regge con il suo stesso peso."
    ],
    info: [
      "Marea: Controllare gli orari della marea per vedere il Torii con l'acqua alta.",
      "Okonomiyaki: A Hiroshima si prepara a strati (Hiroshima-style), diverso da quello di Osaka."
    ],
    details: [
      { time: '08:00', activity: 'Shinkansen per Hiroshima (coperto da pass).', type: 'transport' },
      { time: '10:00', activity: 'Traghetto per Miyajima (coperto da pass).', type: 'transport' },
      { time: '10:30', activity: 'Visita Itsukushima Shrine e Torii galleggiante.', type: 'activity' },
      { time: '13:00', activity: 'Pranzo a Miyajima.', type: 'food' },
      { time: '14:30', activity: 'Ritorno a Hiroshima City: Peace Memorial Park e Museo.', type: 'activity' },
      { time: '18:00', activity: 'Rientro a Osaka.', type: 'transport' },
      { time: '20:00', activity: 'Cena: Okonomiyaki.', type: 'food' }
    ]
  },
  {
    slug: 'osaka-city',
    date: '2026-10-05',
    day: 'Lunedì',
    location: 'Osaka',
    title: 'Osaka City Tour',
    highlights: ['Castello di Osaka', 'Umeda Sky Building', 'Dotonbori'],
    description: "Giornata dedicata ai simboli di Osaka, dal castello storico alle luci al neon di Dotonbori.",
    curiosities: [
      "Il Castello di Osaka attuale è una ricostruzione in cemento del 1931 (l'originale bruciò più volte).",
      "Il 'Glico Man' a Dotonbori è un'icona della città dal 1935."
    ],
    info: [
      "Osaka Amazing Pass: Include ingressi gratuiti a castello, Umeda Sky, crociera Tombori.",
      "Cibo: Assaggiare Takoyaki (polpette di polpo) a Dotonbori."
    ],
    details: [
      { time: '09:00', activity: 'Castello di Osaka.', type: 'activity' },
      { time: '12:00', activity: 'Pranzo in zona.', type: 'food' },
      { time: '14:00', activity: 'Umeda Sky Building.', type: 'activity' },
      { time: '16:00', activity: 'Tsutenkaku / Shinsekai.', type: 'activity' },
      { time: '19:00', activity: 'Crociera sul fiume a Dotonbori (serale).', type: 'activity' },
      { time: '20:30', activity: 'Street food a Dotonbori.', type: 'food' }
    ]
  },
  {
    slug: 'usj',
    date: '2026-10-06',
    day: 'Martedì',
    location: 'Osaka',
    title: 'Universal Studios Japan',
    highlights: ['Super Nintendo World', 'Harry Potter', 'Express Pass 8'],
    description: "Divertimento puro. Super Nintendo World è un'esperienza immersiva unica al mondo.",
    curiosities: [
      "Per entrare a Nintendo World spesso serve un 'Timed Entry Ticket' (incluso nell'Express Pass o da prenotare via app appena entrati).",
      "Il castello di Hogwarts qui ha un percorso a piedi (Castle Walk) per chi non vuole fare la giostra."
    ],
    info: [
      "Arrivare presto (7:30-8:00) anche se apre alle 9:00.",
      "Scaricare l'app USJ ufficiale per le mappe e i tempi di attesa."
    ],
    details: [
      { time: '07:30', activity: 'Trasferimento con JR Loop Line.', type: 'transport' },
      { time: '08:30', activity: 'Ingresso USJ con Express Pass 8.', type: 'activity' },
      { time: 'Matin', activity: 'Priorità Super Nintendo World.', type: 'activity' },
      { time: 'Pomer', activity: 'Harry Potter e altre attrazioni.', type: 'activity' },
      { time: '20:00', activity: 'Rientro in hotel.', type: 'transport' }
    ]
  },
  {
    slug: 'kyoto-arrival',
    date: '2026-10-07',
    day: 'Mercoledì',
    location: 'Osaka -> Kyoto',
    title: 'Daruma & Kyoto Arrivo',
    highlights: ['Tempio Katsuoji', 'Spostamento a Kyoto', 'Kinkaku-ji', 'Pontocho'],
    image: '/images/kyoto-hero.png',
    description: "Trasferimento verso l'antica capitale, con una tappa mistica al tempio dei Daruma.",
    curiosities: [
      "Katsuoji è pieno di migliaia di bambole Daruma lasciate dai fedeli in segno di vittoria o fortuna.",
      "Il Padiglione d'Oro (Kinkaku-ji) è ricoperto di vere foglie d'oro."
    ],
    info: [
      "Taxi per Katsuoji: Indispensabile, i bus sono rari.",
      "Pontocho: Vicolo stretto pieno di ristoranti, spesso si avvistano Geisha o Maiko."
    ],
    details: [
      { time: '08:00', activity: 'Check-out e deposito bagagli a Osaka Station.', type: 'logistics' },
      { time: '09:00', activity: 'Taxi per Tempio Katsuoji (Daruma).', type: 'transport' },
      { time: '11:00', activity: 'Rientro a Osaka Station in taxi.', type: 'transport' },
      { time: '12:00', activity: 'JR Special Rapid per Kyoto (30 min).', type: 'transport' },
      { time: '13:00', activity: 'Arrivo a Kyoto e check-in.', type: 'hotel' },
      { time: '15:00', activity: 'Visita Kinkaku-ji (Padiglione d\'Oro).', type: 'activity' },
      { time: '19:00', activity: 'Serata a Pontocho.', type: 'activity' }
    ]
  },
  {
    slug: 'nara-inari',
    date: '2026-10-08',
    day: 'Giovedì',
    location: 'Kyoto / Nara',
    title: 'Tour Nara & Fushimi Inari',
    highlights: ['Nara Park', 'Fushimi Inari', 'Arashiyama'],
    description: "I tre giganti di Kyoto/Nara in un giorno. Cervi, portali rossi infiniti e bambù.",
    curiosities: [
      "Fushimi Inari ha più di 10.000 torii rossi. La camminata completa fino alla cima dura 2-3 ore.",
      "Nel parco di Nara ci sono oltre 1000 cervi selvatici considerati messaggeri divini."
    ],
    info: [
      "Nara: Attenzione ai cervi se avete cibo in mano, possono essere insistenti.",
      "Arashiyama: La foresta di bambù è molto affollata, il momento migliore è... presto o tardi."
    ],
    details: [
      { time: '08:00', activity: 'Partenza Tour Organizzato.', type: 'activity' },
      { time: 'Mattina', activity: 'Nara: Parco dei cervi e Todai-ji.', type: 'activity' },
      { time: 'Primo Pom', activity: 'Fushimi Inari (Torii rossi).', type: 'activity' },
      { time: 'Tardo Pom', activity: 'Arashiyama: Foresta di bambù.', type: 'activity' },
      { time: '18:00', activity: 'Rientro a Kyoto.', type: 'transport' }
    ]
  },
  {
    slug: 'higashiyama',
    date: '2026-10-09',
    day: 'Venerdì',
    location: 'Kyoto',
    title: 'Higashiyama & Cerimonia del Tè',
    highlights: ['Otagi Nenbutsu-ji', 'Kiyomizu-dera', 'Cerimonia del Tè'],
    description: "Kyoto tradizionale al suo meglio. Templi nascosti, stradine lastricate e il rito del tè.",
    curiosities: [
      "Otagi Nenbutsu-ji ha 1200 statue di Rakan, ognuna con una faccia diversa (e buffa).",
      "Kiyomizu-dera ha una terrazza di legno costruita senza usare un solo chiodo."
    ],
    info: [
      "Tea Ceremony: Essere puntuali e indossare calzini puliti (si tolgono le scarpe).",
      "Ninenzaka/Sannenzaka: Attenzione a non cadere, la leggenda dice che porta sfortuna!"
    ],
    details: [
      { time: '09:00', activity: 'Otagi Nenbutsu-ji (taxi consigliato).', type: 'activity' },
      { time: '11:00', activity: 'Passeggiata Higashiyama (Sannenzaka/Ninenzaka).', type: 'activity' },
      { time: '12:30', activity: 'Kiyomizu-dera.', type: 'activity' },
      { time: '14:00', activity: 'Cerimonia del Tè al Tempio Jotokuji (prenotare).', type: 'activity' },
      { time: '19:00', activity: 'Cena libera.', type: 'food' }
    ]
  },
  {
    slug: 'tokyo-arrival',
    date: '2026-10-10',
    day: 'Sabato',
    location: 'Kyoto -> Tokyo',
    title: 'Shinkansen & Tokyo Asakusa',
    highlights: ['Shinkansen', 'Asakusa', 'Skytree'],
    description: "Il viaggio verso il futuro. Dalla storica Kyoto alla metropoli infinita di Tokyo.",
    curiosities: [
      "Sul Shinkansen, se sedete a sinistra (verso Tokyo), potreste vedere il Monte Fuji (meteo permettendo).",
      "Asakusa conserva l'atmosfera della vecchia Edo."
    ],
    info: [
      "Bagagli Shinkansen: Prenotare posto con 'Baggage Area' per valigie grandi.",
      "Skytree: Consigliato prenotare i biglietti online per evitare code."
    ],
    details: [
      { time: '09:00', activity: 'Check-out e Shinkansen per Tokyo.', type: 'transport' },
      { time: '12:00', activity: 'Arrivo Tokyo Station.', type: 'transport' },
      { time: '13:00', activity: 'Check-in: Hotel Tavinos Asakusa.', type: 'hotel' },
      { time: '14:30', activity: 'Esplorazione Asakusa e Senso-ji.', type: 'activity' },
      { time: '17:00', activity: 'Tokyo Skytree al tramonto.', type: 'activity' }
    ]
  },
  {
    slug: 'modern-tokyo',
    date: '2026-10-11',
    day: 'Domenica',
    location: 'Tokyo',
    title: 'Modern Tokyo',
    highlights: ['Tsukiji', 'TeamLab Planets', 'Odaiba', 'Akihabara'],
    description: "Arte digitale, robot giganti e cultura pop.",
    curiosities: [
      "TeamLab Planets si visita a piedi nudi e si cammina nell'acqua.",
      "Il Gundam Unicorn a Odaiba si 'trasforma' in orari specifici con luci e suoni."
    ],
    info: [
      "TeamLab: Indossare pantaloni arrotolabili (acqua fino al ginocchio).",
      "Tsukiji: Molti negozi chiudono nel primo pomeriggio, andare presto."
    ],
    details: [
      { time: '08:30', activity: 'Colazione/Sushi a Tsukiji Outer Market.', type: 'food' },
      { time: '10:30', activity: 'TeamLab Planets (Toyosu).', type: 'activity' },
      { time: '13:00', activity: 'Odaiba (Gundam Unicorn).', type: 'activity' },
      { time: '18:00', activity: 'Akihabara: Anime, Manga, Elettronica.', type: 'activity' }
    ]
  },
  {
    slug: 'shibuya-harajuku',
    date: '2026-10-12',
    day: 'Lunedì',
    location: 'Tokyo',
    title: 'Shibuya & Harajuku',
    highlights: ['Meiji Shrine', 'Shibuya Crossing', 'Shibuya Sky', 'Shinjuku'],
    description: "Il cuore pulsante della moda e della gioventù tokyoita.",
    curiosities: [
      "Shibuya Crossing è l'incrocio più affollato del mondo (fino a 2500 persone per verde).",
      "Takeshita Street è il centro della cultura Kawaii."
    ],
    info: [
      "Shibuya Sky: Prenotare slot orario per il tramonto con un mese di anticipo.",
      "Omoide Yokocho: Vicolo stretto famoso per gli spiedini (Yakitori)."
    ],
    details: [
      { time: '09:00', activity: 'Meiji Shrine (Yoyogi Park).', type: 'activity' },
      { time: '11:00', activity: 'Harajuku & Takeshita Street.', type: 'activity' },
      { time: '14:00', activity: 'Shibuya Crossing.', type: 'activity' },
      { time: '16:40', activity: 'Shibuya Sky (tramonto).', type: 'activity' },
      { time: '19:00', activity: 'Cena a Shinjuku (Omoide Yokocho).', type: 'food' }
    ]
  },
  {
    slug: 'fuji-tour',
    date: '2026-10-13',
    day: 'Martedì',
    location: 'Monte Fuji',
    title: 'Tour Monte Fuji',
    highlights: ['Lago Kawaguchiko', 'Vista Fuji'],
    description: "Escursione per ammirare il simbolo del Giappone.",
    curiosities: [
      "Il Fuji è un vulcano ancora attivo (anche se dormiente dal 1707).",
      "È considerato sacro e fonte di ispirazione artistica da secoli."
    ],
    info: [
      "Meteo: Il Fuji è timido, spesso coperto da nuvole. In autunno (ottobre) le probabilità di vederlo sono buone.",
      "Abbigliamento: Vestirsi a strati, può fare più fresco che a Tokyo."
    ],
    details: [
      { time: '08:00', activity: 'Partenza Bus Tour Monte Fuji.', type: 'activity' },
      { time: 'Tutto il giorno', activity: 'Visita aree panoramiche (Oishi Park, Pagoda Chureito).', type: 'activity' },
      { time: '18:30', activity: 'Rientro a Tokyo.', type: 'transport' }
    ]
  },
  {
    slug: 'disneyland',
    date: '2026-10-14',
    day: 'Mercoledì',
    location: 'Tokyo',
    title: 'Tokyo Disneyland',
    highlights: ['Disneyland'],
    description: "Il regno della magia in stile classico.",
    curiosities: [
      "Tokyo Disneyland è stato il primo parco Disney fuori dagli USA (1983).",
      "Il livello di servizio e pulizia è leggendario, superiore agli altri parchi Disney."
    ],
    info: [
      "Biglietti: Comprare online in anticipo, non vendono in cassa.",
      "Parate: I giapponesi si siedono ordinatamente ore prima per vederle."
    ],
    details: [
      { time: '08:00', activity: 'Trasferimento (Metro + JR Keiyo Line).', type: 'transport' },
      { time: '09:00', activity: 'Intera giornata a Tokyo Disneyland.', type: 'activity' }
    ]
  },
  {
    slug: 'disneysea',
    date: '2026-10-15',
    day: 'Giovedì',
    location: 'Tokyo',
    title: 'Tokyo DisneySea',
    highlights: ['DisneySea'],
    description: "Unico al mondo, ispirato ai miti e alle leggende del mare.",
    curiosities: [
      "Viene spesso votato come il miglior parco a tema del mondo per tematizzazione.",
      "Al centro c'è un vulcano 'attivo' che erutta fuoco regolarmente."
    ],
    info: [
      "Fantasy Springs: La nuova area (Frozen, Peter Pan, Rapunzel) richiede pass speciali (Standby Pass o DPA).",
      "Snack: Provare i popcorn ai gusti strani (curry, tè al latte, pepe nero)."
    ],
    details: [
      { time: '09:00', activity: 'Intera giornata a Tokyo DisneySea.', type: 'activity' }
    ]
  },
  {
    slug: 'departure',
    date: '2026-10-16',
    day: 'Venerdì',
    location: 'Tokyo -> Partenza',
    title: 'Ueno & Rientro',
    highlights: ['Ueno Park', 'Volo di rientro'],
    description: "Ultimi momenti in terra nipponica prima del volo.",
    curiosities: [
      "Ueno Park è famoso per i ciliegi (non in fiore a ottobre) e per i musei nazionali.",
      "Ameyoko Market a Ueno era un mercato nero nel dopoguerra."
    ],
    info: [
      "Keisei Skyliner/Access: È il modo più veloce per Narita.",
      "Aeroporto: Arrivare almeno 3 ore prima, i controlli possono essere lunghi."
    ],
    details: [
      { time: '09:00', activity: 'Ueno Park (ultima passeggiata/shopping).', type: 'activity' },
      { time: '12:00', activity: 'Keisei Access Express Asakusa -> Narita.', type: 'transport' },
      { time: '16:00', activity: 'Volo di partenza da Narita.', type: 'transport' }
    ]
  }
];
