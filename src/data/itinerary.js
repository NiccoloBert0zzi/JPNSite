export const itinerary = [
  {
    slug: 'osaka-arrival',
    date: '2026-10-03',
    day: 'Sabato',
    location: 'Osaka',
    title: 'Arrivo Osaka + Shitennō-ji',
    highlights: ['Arrivo KIX', 'Shitennō-ji', 'Umeda'],
    image: '/images/osaka-neon.png',
    description: "Arrivo in Giappone e primo impatto con Osaka. Dal caos ordinato dell'aeroporto alla quiete mistica di Shitennō-ji, uno dei templi più antichi del Giappone.",
    coordinates: [
      { lat: 34.432002, lng: 135.230393, title: "Kansai Airport (KIX)" },
      { lat: 34.702485, lng: 135.495951, title: "The Rise Osaka Kitashinchi" },
      { lat: 34.653347, lng: 135.516492, title: "Shitennō-ji Temple" },
      { lat: 34.706346, lng: 135.503468, title: "Hep Five" }
    ],
    curiosities: [
      "Shitennō-ji è stato fondato nel 593 d.C. dal principe Shotoku, è il primo tempio buddista e statale del Giappone.",
      "La stazione di Umeda è un enorme labirinto sotterraneo: segui sempre i cartelli per 'Midosuji Line' o l'uscita che ti serve."
    ],
    info: [
      "🔥 DECISION POINT (Ore 15:00): Guarda l'orologio all'uscita dall'hotel.",
      "✅ PIANO A (Metro entro le 15:00): Corri a Shitennō-ji per la visita interna (chiude alle 16:00).",
      "🟡 PIANO B (Dopo le 15:30): Goditi passeggiata Zen nell'area esterna gratuita e suggestiva al tramonto."
    ],
    details: [
      { time: '12:10', activity: '🛬 Arrivo KIX, Immigrazione e Bagagli.', type: 'transport' },
      { time: '13:15', activity: '🎫 Ritiro JR Kansai–Hiroshima Pass.', type: 'ticket' },
      { time: '13:45', activity: '🚄 Treno KIX → Osaka / Umeda.', type: 'transport' },
      { time: '15:00', activity: '🏨 Arrivo Hotel / Deposito bagagli veloce.', type: 'hotel' },
      { time: '15:30', activity: '🛕 Shitennō-ji (Decision Point: Interno o Esterno).', type: 'activity' },
      { time: '17:00', activity: '🌇 Umeda: Passeggiata relax e HEP Five.', type: 'activity' },
      { time: '19:30', activity: '🍜 Cena libera in zona Umeda (Rientro presto).', type: 'food' }
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
    coordinates: [
      { lat: 34.702485, lng: 135.495951, title: "Partenza da Osaka" },
      { lat: 34.397684, lng: 132.475389, title: "Hiroshima Station" },
      { lat: 34.301546, lng: 132.317926, title: "Miyaguchiguchi Ferry" },
      { lat: 34.295982, lng: 132.319808, title: "Itsukushima Shrine (Miyajima)" },
      { lat: 34.392817, lng: 132.452586, title: "Peace Memorial Park" }
    ],
    curiosities: [
      "A Miyajima i cervi sono sacri e girano liberi, ma attenzione: mangiano la carta (mappe, banconote!).",
      "Il Torii di Miyajima non è sotterrato nel fondale, si regge con il suo stesso peso."
    ],
    info: [
      "Marea: Controllare gli orari della marea per vedere il Torii con l'acqua alta.",
      "Okonomiyaki: A Hiroshima si prepara a strati (Hiroshima-style), diverso da quello di Osaka."
    ],
    details: [
      { time: '08:00', activity: '🚅 Shinkansen per Hiroshima (coperto da pass).', type: 'transport' },
      { time: '10:00', activity: '🚢 Traghetto per Miyajima (coperto da pass).', type: 'transport' },
      { time: '10:30', activity: '⛩️ Visita Itsukushima Shrine e Torii galleggiante.', type: 'activity' },
      { time: '13:00', activity: '🍱 Pranzo a Miyajima.', type: 'food' },
      { time: '14:30', activity: '☮️ Ritorno a Hiroshima City: Peace Memorial Park e Museo.', type: 'activity' },
      { time: '18:00', activity: '🚅 Rientro a Osaka.', type: 'transport' },
      { time: '20:00', activity: '🥞 Cena: Okonomiyaki (Hiroshima Style).', type: 'food' }
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
    coordinates: [
      { lat: 34.687315, lng: 135.526201, title: "Osaka Castle" },
      { lat: 34.705295, lng: 135.490088, title: "Umeda Sky Building" },
      { lat: 34.652193, lng: 135.506303, title: "Tsutenkaku (Shinsekai)" },
      { lat: 34.668725, lng: 135.501369, title: "Dotonbori" }
    ],
    curiosities: [
      "Il Castello di Osaka attuale è una ricostruzione in cemento del 1931 (l'originale bruciò più volte).",
      "Il 'Glico Man' a Dotonbori è un'icona della città dal 1935."
    ],
    info: [
      "Osaka Amazing Pass: Include ingressi gratuiti a castello, Umeda Sky, crociera Tombori.",
      "Cibo: Assaggiare Takoyaki (polpette di polpo) a Dotonbori."
    ],
    details: [
      { time: '09:00', activity: '🏯 Castello di Osaka.', type: 'activity' },
      { time: '12:00', activity: '🍱 Pranzo in zona.', type: 'food' },
      { time: '14:00', activity: '🌇 Umeda Sky Building.', type: 'activity' },
      { time: '16:00', activity: '🗼 Tsutenkaku / Shinsekai.', type: 'activity' },
      { time: '19:00', activity: '🚤 Crociera sul fiume a Dotonbori (serale).', type: 'activity' },
      { time: '20:30', activity: '🐙 Street food a Dotonbori.', type: 'food' }
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
    coordinates: [
      { lat: 34.702485, lng: 135.495951, title: "Hotel" },
      { lat: 34.665442, lng: 135.432338, title: "Universal Studios Japan" }
    ],
    curiosities: [
      "Per entrare a Nintendo World spesso serve un 'Timed Entry Ticket' (incluso nell'Express Pass o da prenotare via app appena entrati).",
      "Il castello di Hogwarts qui ha un percorso a piedi (Castle Walk) per chi non vuole fare la giostra."
    ],
    info: [
      "Arrivare presto (7:30-8:00) anche se apre alle 9:00.",
      "Scaricare l'app USJ ufficiale per le mappe e i tempi di attesa."
    ],
    details: [
      { time: '07:30', activity: '🚃 Trasferimento con JR Loop Line.', type: 'transport' },
      { time: '08:30', activity: '🎢 Ingresso USJ con Express Pass 8.', type: 'activity' },
      { time: 'Matin', activity: '🍄 Priorità Super Nintendo World.', type: 'activity' },
      { time: 'Pomer', activity: '🏰 Harry Potter e altre attrazioni.', type: 'activity' },
      { time: '20:00', activity: '🏨 Rientro in hotel.', type: 'transport' }
    ]
  },
  {
    slug: 'kyoto-arrival',
    date: '2026-10-07',
    day: 'Mercoledì',
    location: 'Osaka -> Kyoto',
    title: 'Arrivo + Kyoto Iconica & Gion',
    highlights: ['Kinkaku-ji', 'Gion', 'Pontocho'],
    image: '/images/kyoto-hero.png',
    description: "Benvenuti nell'antica capitale. Pomeriggio dedicato al Padiglione d'Oro e serata magica nel quartiere delle Geisha.",
    coordinates: [
      { lat: 34.985849, lng: 135.758767, title: "Kyoto Station" },
      { lat: 35.039370, lng: 135.729243, title: "Kinkaku-ji (Golden Pavilion)" },
      { lat: 35.003656, lng: 135.776657, title: "Gion / Hanamikoji" }
    ],
    curiosities: [
      "Il Kinkaku-ji (Padiglione d'Oro) è ricoperto da veri fogli d'oro puro.",
      "A Gion, se vedi una Geisha (o Maiko), non inseguirla per foto: è considerata maleducazione."
    ],
    info: [
      "💡 Gion Tip: Il quartiere rende al massimo solo di sera. Hanamikoji è la via principale."
    ],
    details: [
      { time: '13:00', activity: '🚄 Arrivo a Kyoto Station e deposito bagagli.', type: 'transport' },
      { time: '14:30', activity: '🛕 Kinkaku-ji (Padiglione d\'Oro).', type: 'activity' },
      { time: '16:00', activity: '🏨 Check-in Hotel e relax.', type: 'hotel' },
      { time: '18:00', activity: '🏮 Passeggiata a Gion (Hanamikoji Street).', type: 'activity' },
      { time: '19:30', activity: '🍜 Cena a Gion o Pontocho.', type: 'food' },
      { time: '20:30', activity: '🌑 Shirakawa Canal (Optional: passeggiata post-cena).', type: 'activity' }
    ]
  },
  {
    slug: 'nara-inari',
    date: '2026-10-08',
    day: 'Giovedì',
    location: 'Kyoto / Nara',
    title: 'Tour Nara, Inari & Arashiyama',
    highlights: ['Nara Park', 'Fushimi Inari', 'Arashiyama'],
    description: "La giornata dei giganti. Un tour intenso per vedere i tre luoghi più famosi di Kyoto e Nara in un colpo solo.",
    coordinates: [
      { lat: 34.685087, lng: 135.843012, title: "Nara Park" },
      { lat: 34.967140, lng: 135.772671, title: "Fushimi Inari Taisha" },
      { lat: 35.009440, lng: 135.677598, title: "Arashiyama Bamboo Grove" }
    ],
    curiosities: [
      "I cervi di Nara inchinano la testa per chiedere biscotti (ma attenzione, mordono anche!).",
      "Fushimi Inari ha migliaia di Torii donati da aziende giapponesi in cerca di prosperità."
    ],
    info: [
      "⚠️ GIORNO BLOCCATO: Il tour 8:00-18:00 è stancante, non aggiungere altro di giorno.",
      "🔥 SERA DECISION: Opzione A (Gion Night - Consigliata), B (Relax Kamogawa), C (Inari Night - Suggestiva)."
    ],
    details: [
      { time: '08:00', activity: '🚌 Partenza Tour Organizzato (Nara, Inari, Arashiyama).', type: 'activity' },
      { time: 'Mattina', activity: '🦌 Nara Park & Tōdai-ji.', type: 'activity' },
      { time: 'Pranzo', activity: '⛩️ Fushimi Inari (parte bassa) & Arashiyama.', type: 'activity' },
      { time: '18:00', activity: '🏁 Rientro a Kyoto Centro (Fine Tour).', type: 'transport' },
      { time: '18:30', activity: '🏮 SERA: Gion Night (Opzione Consigliata) o Relax.', type: 'activity' },
      { time: '19:30', activity: '🍱 Cena meritata.', type: 'food' }
    ]
  },
  {
    slug: 'higashiyama',
    date: '2026-10-09',
    day: 'Venerdì',
    location: 'Kyoto',
    title: 'Kyoto Autentica + Nishiki Market',
    highlights: ['Otagi Nenbutsu-ji', 'Kiyomizu-dera', 'Nishiki Market'],
    description: "Dalle statue di muschio di Otagi alla vivacità del mercato di Nishiki. Una giornata che mixa spiritualità e cibo.",
    coordinates: [
      { lat: 35.026365, lng: 135.660995, title: "Otagi Nenbutsu-ji" },
      { lat: 34.994856, lng: 135.785046, title: "Kiyomizu-dera" },
      { lat: 35.005008, lng: 135.764906, title: "Nishiki Market" }
    ],
    curiosities: [
      "Otagi Nenbutsu-ji ha 1200 statue Rakan scolpite da amatori, ognuna con espressioni buffe.",
      "Nishiki Market è soprannominato 'la cucina di Kyoto'."
    ],
    info: [
      "💡 TIP: Nishiki Market alle 13:00 è l'orario perfetto per pranzo/snack.",
      "🍵 TEA CEREMONY: Optional intelligente alle 15:30, solo se non siete stanchi."
    ],
    details: [
      { time: '08:30', activity: '🚕 Otagi Nenbutsu-ji (Taxi consigliato per arrivo presto).', type: 'activity' },
      { time: '10:30', activity: '🏯 Higashiyama Sud & Kiyomizu-dera.', type: 'activity' },
      { time: '13:00', activity: '🍣 Nishiki Market: Pranzo Street Food (Orario Top).', type: 'food' },
      { time: '15:30', activity: '🍵 Cerimonia del Tè (Optional).', type: 'activity' },
      { time: '19:00', activity: '🌃 Serata Libera: Kamogawa o ultima passeggiata.', type: 'activity' }
    ]
  },
  {
    slug: 'tokyo-arrival',
    date: '2026-10-10',
    day: 'Sabato',
    location: 'Kyoto -> Tokyo',
    title: 'Shinkansen & Tokyo Asakusa',
    highlights: ['Shinkansen', 'Asakusa', 'Skytree'],
    description: "Il viaggio verso il futuro. Arrivo a Tokyo e primo impatto 'soft' con la tradizione di Asakusa e la modernità della Skytree.",
    coordinates: [
      { lat: 35.681236, lng: 139.767125, title: "Tokyo Station" },
      { lat: 35.714765, lng: 139.796655, title: "Hotel Tavinos Asakusa" },
      { lat: 35.714725, lng: 139.796739, title: "Senso-ji Temple" },
      { lat: 35.710063, lng: 139.810700, title: "Tokyo Skytree" }
    ],
    curiosities: [
      "La Tokyo Skytree è la torre più alta del mondo (634m).",
      "Asakusa conserva l'atmosfera della 'Shitamachi', la città bassa di epoca Edo."
    ],
    info: [
      "💡 TIP: La sera Asakusa è molto più piacevole e meno affollata.",
      "🌇 Skytree: Prenotare assolutamente l'orario del tramonto in anticipo."
    ],
    details: [
      { time: '12:30', activity: '🚄 Arrivo a Tokyo Station.', type: 'transport' },
      { time: '13:30', activity: '🏨 Transfer & Check-in Asakusa.', type: 'hotel' },
      { time: '15:00', activity: '⏸️ Pausa relax / Unpacking.', type: 'activity' },
      { time: '16:30', activity: '🏮 Asakusa: Sensō-ji & Nakamise al tramonto.', type: 'activity' },
      { time: '18:00', activity: '🌇 Tokyo Skytree (Vista notturna).', type: 'activity' },
      { time: '20:00', activity: '🍜 Cena rilassata ad Asakusa.', type: 'food' }
    ]
  },
  {
    slug: 'modern-tokyo',
    date: '2026-10-11',
    day: 'Domenica',
    location: 'Tokyo',
    title: 'Tsukiji, TeamLab & Odaiba',
    highlights: ['Tsukiji', 'TeamLab Planets', 'Odaiba', 'Akihabara'],
    description: "Una giornata sensoriale. Dal sushi più fresco del mondo all'arte digitale immersiva, fino ai robot giganti di Odaiba.",
    coordinates: [
      { lat: 35.665486, lng: 139.770667, title: "Tsukiji Outer Market" },
      { lat: 35.646549, lng: 139.787162, title: "TeamLab Planets Toyosu" },
      { lat: 35.626297, lng: 139.774947, title: "Unicorn Gundam Statue (Odaiba)" },
      { lat: 35.698383, lng: 139.773072, title: "Akihabara Electric Town" }
    ],
    curiosities: [
      "Al TeamLab Planets si cammina nell'acqua, portate pantaloni arrotolabili!",
      "Il Gundam di Odaiba si muove e si illumina in orari specifici."
    ],
    info: [
      "🍣 Tsukiji: Arrivare presto (8:00) per evitare la folla eccessiva.",
      "👣 TeamLab: Si entra scalzi. Prenotare lo slot 10:30-12:00."
    ],
    details: [
      { time: '08:00', activity: '🍣 Colazione/Pranzo a Tsukiji Outer Market.', type: 'food' },
      { time: '10:30', activity: '🎨 TeamLab Planets (Toyosu) [STANDARD].', type: 'activity' },
      { time: '13:00', activity: '🤖 Odaiba: Gundam & Seaside.', type: 'activity' },
      { time: '18:00', activity: '⚡ Akihabara: Anime & Arcade [OPTIONAL].', type: 'activity' },
      { time: '20:00', activity: '🍛 Cena a tema o libera.', type: 'food' }
    ]
  },
  {
    slug: 'shibuya-harajuku',
    date: '2026-10-12',
    day: 'Lunedì',
    location: 'Tokyo',
    title: 'Shibuya, Harajuku & Meiji',
    highlights: ['Meiji Shrine', 'Harajuku', 'Shibuya Crossing', 'Shibuya Sky'],
    description: "Il cuore pulsante della Tokyo giovane. Dalla quiete del Meiji Shrine al caos organizzato di Shibuya Crossing.",
    coordinates: [
      { lat: 35.676398, lng: 139.699326, title: "Meiji Jingu Shrine" },
      { lat: 35.671569, lng: 139.703463, title: "Takeshita Street (Harajuku)" },
      { lat: 35.659520, lng: 139.700572, title: "Shibuya Crossing" },
      { lat: 35.658514, lng: 139.701330, title: "Shibuya Scramble Square (Sky)" },
      { lat: 35.693840, lng: 139.699447, title: "Shinjuku (Sera)" }
    ],
    curiosities: [
      "Il Meiji Shrine è un'oasi di pace di 700.000 metri quadri nel centro città.",
      "Shibuya Crossing vede passare fino a 3000 persone ogni volta che scatta il verde."
    ],
    info: [
      "🌇 Shibuya Sky: Prenotare un mese prima per l'orario del tramonto (16:40-17:40).",
      "🛍️ Harajuku: Takeshita Street è piena, esplorate le vie laterali per negozi più cool."
    ],
    details: [
      { time: '09:00', activity: '🌳 Meiji Shrine: Passeggiata Zen.', type: 'activity' },
      { time: '10:30', activity: '🍭 Harajuku & Takeshita Street.', type: 'activity' },
      { time: '12:30', activity: '🚶 Shibuya Crossing & Pranzo.', type: 'activity' },
      { time: '16:40', activity: '🌇 Shibuya Sky al Tramonto [STANDARD].', type: 'activity' },
      { time: '19:00', activity: '🌃 Shinjuku: Omoide Yokocho & Luci Kabukicho.', type: 'activity' }
    ]
  },
  {
    slug: 'fuji-tour',
    date: '2026-10-13',
    day: 'Martedì',
    location: 'Monte Fuji',
    title: 'Tour Monte Fuji',
    highlights: ['Lago Kawaguchiko', 'Vista Fuji', 'Pagoda Chureito'],
    description: "Una giornata intera dedicata al simbolo del Giappone. Sperando nella clemenza delle nuvole.",
    coordinates: [
      { lat: 35.691656, lng: 139.696879, title: "Partenza Tour (Shinjuku)" },
      { lat: 35.530397, lng: 138.751590, title: "Oishi Park (Lake Kawaguchiko)" },
      { lat: 35.501170, lng: 138.801657, title: "Chureito Pagoda" }
    ],
    curiosities: [
      "La Pagoda Chureito con il Fuji sullo sfondo è una delle foto più famose del Giappone.",
      "Il Monte Fuji è timido: spesso si nasconde tra le nuvole nel pomeriggio."
    ],
    info: [
      "🚌 GIORNO IMPEGNATIVO: Tour guidato dalle 8:00 alle 18:30.",
      "💡 TIP: Se è nuvoloso, godetevi comunque l'atmosfera del lago e dei santuari."
    ],
    details: [
      { time: '08:00', activity: '🚌 Partenza Tour Organizzato da Shinjuku.', type: 'activity' },
      { time: 'Mattina', activity: '🗻 Lago Kawaguchiko & Oishi Park.', type: 'activity' },
      { time: 'Pomer', activity: '⛩️ Chureito Pagoda & Oshino Hakkai.', type: 'activity' },
      { time: '18:30', activity: '🏁 Rientro a Tokyo (Probabilmente stanchi!).', type: 'transport' },
      { time: '20:00', activity: '🍲 Cena calda vicino all\'hotel.', type: 'food' }
    ]
  },
  {
    slug: 'disneyland',
    date: '2026-10-14',
    day: 'Mercoledì',
    location: 'Tokyo',
    title: 'Tokyo Disneyland',
    highlights: ['Disneyland', 'Beauty and the Beast', 'Splash Mountain'],
    description: "Il regno della magia. Tokyo Disneyland è famoso per la sua pulizia impeccabile e l'ospitalità unica.",
    coordinates: [
      { lat: 35.632896, lng: 139.880394, title: "Tokyo Disneyland" }
    ],
    curiosities: [
      "I cast member (staff) salutano con entrambe le mani per essere più accoglienti.",
      "La 'Beauty and the Beast' ride è un'esclusiva tecnologica incredibile."
    ],
    info: [
      "🎫 Premier Access: Usatelo strategicamente per 'Beauty and the Beast' se la coda supera i 100 min.",
      "⏰ Arrivate ai cancelli almeno 45-60 min prima dell'apertura ufficiale."
    ],
    details: [
      { time: '07:30', activity: '🚃 Trasferimento a Maihama Station.', type: 'transport' },
      { time: '08:30', activity: '🏰 Ingresso a Tokyo Disneyland.', type: 'activity' },
      { time: 'Giorno', activity: '🎢 Attrazioni, Parate e Magia.', type: 'activity' },
      { time: '20:30', activity: '🎆 Spettacolo serale / Rientro.', type: 'activity' }
    ]
  },
  {
    slug: 'disneysea',
    date: '2026-10-15',
    day: 'Giovedì',
    location: 'Tokyo',
    title: 'Tokyo DisneySea',
    highlights: ['DisneySea', 'Fantasy Springs', 'Journey to the Center of the Earth'],
    description: "Il parco Disney più bello e unico al mondo. Un viaggio attraverso i sette mari e oltre.",
    coordinates: [
      { lat: 35.626779, lng: 139.885093, title: "Tokyo DisneySea" }
    ],
    curiosities: [
      "Il vulcano Prometheus erutta fuoco vero periodicamente!",
      "È l'unico parco Disney al mondo a tema nautico/esplorazione."
    ],
    info: [
      "🌋 Fantasy Springs: La nuova area richiede pianificazione (Standby Pass/DPA).",
      "🍿 Snack: Non perdetevi i popcorn (Curry, Black Pepper, Garlic Shrimp...)."
    ],
    details: [
      { time: '08:30', activity: '🌋 Ingresso a Tokyo DisneySea.', type: 'activity' },
      { time: 'Mattina', activity: '⚓ Fantasy Springs / Soaring.', type: 'activity' },
      { time: 'Pomer', activity: '🎢 Journey to the Center of the Earth & Show.', type: 'activity' },
      { time: '21:00', activity: '🏨 Rientro in hotel (Ultima notte!).', type: 'transport' }
    ]
  },
  {
    slug: 'departure',
    date: '2026-10-16',
    day: 'Venerdì',
    location: 'Tokyo -> Partenza',
    title: 'Ueno & Rientro',
    highlights: ['Ueno Park', 'Keisei Skyliner', 'Volo'],
    description: "Ultimi saluti al Giappone. Una passeggiata rilassante a Ueno prima di volare verso casa.",
    coordinates: [
      { lat: 35.714073, lng: 139.774092, title: "Ueno Park" },
      { lat: 35.771987, lng: 140.392850, title: "Narita Airport (NRT)" }
    ],
    curiosities: [
      "Ueno Park ospita panda giganti allo zoo e moli templi storici.",
      "Ameyoko Market, lungo i binari, è perfetto per souvenir last-minute (tè, kitkat, spezie)."
    ],
    info: [
      "🚄 Keisei Skyliner: Il treno più veloce per Narita (40 min).",
      "🛫 Aeroporto: Arrivare 3 ore prima. I controlli sicurezza possono essere lenti."
    ],
    details: [
      { time: '09:00', activity: '🌳 Ueno Park: Passeggiata rilassata [STANDARD].', type: 'activity' },
      { time: '10:30', activity: '🛍️ Ultimo shopping veloce (Ameyoko/Stazione).', type: 'activity' },
      { time: '12:00', activity: '🚄 Keisei Access/Skyliner per Narita.', type: 'transport' },
      { time: '13:00', activity: '🛂 Check-in e Controlli in Aeroporto.', type: 'logistics' },
      { time: '16:00', activity: '✈️ Volo di Rientro. Sayonara!', type: 'transport' }
    ]
  }
];
