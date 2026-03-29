export const itinerary = [
  {
    slug: 'departure-milan',
    date: '2026-10-02',
    day: 'Venerdì',
    location: 'Milano -> Volo',
    title: 'Partenza per il Giappone',
    highlights: ['Volo Eva Air', 'Scalo a Taipei'],
    image: '/images/malpensa.png',
    description: "Inizia l'avventura! Partenza da Milano Malpensa verso l'oriente.",
    coordinates: [
      { lat: 45.630063, lng: 8.725531, title: "Milano Malpensa T1" },
      { lat: 25.079651, lng: 121.234217, title: "Taipei Taoyuan T2" }
    ],
    curiosities: [],
    info: [
      "Presentati in aeroporto 3 ore prima del volo.",
      "Scalo a Taipei della mattina successiva.",
      "Notte in volo — riposa bene, domani è lunga!"
    ],
    details: [
      { time: '11:15', activity: '✈️ Partenza da Milano Malpensa (T1) — Eva Air.', type: 'transport' },
      { time: '–', activity: '🛬 Scalo a Taipei Taoyuan (TPE).', type: 'transport' },
      { time: '–', activity: '🌙 Notte in volo.', type: 'transport' }
    ]
  },
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
      { lat: 34.671000, lng: 135.501000, title: "Ark Hotel Osaka Shinsaibashi" },
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
      { time: '05:55', activity: '🛬 Arrivo a Taipei (Scalo breve).', type: 'transport' },
      { time: '08:20', activity: '✈️ Partenza per Osaka (Kansai).', type: 'transport' },
      { time: '12:10', activity: '🛬 Arrivo Osaka KIX (T1).', type: 'transport' },
      { time: '13:15', activity: '🎫 Ritiro JR Kansai–Hiroshima Pass al counter JR in aeroporto.', type: 'ticket' },
      { time: '13:45', activity: '🚄 Treno KIX → Osaka / Umeda con il pass.', type: 'transport' },
      { time: '15:00', activity: '🏨 Arrivo Ark Hotel — deposita bagagli (check-in dalle 15:00).', type: 'hotel' },
      { time: '15:30', activity: '🛕 Shitennō-ji (Decision Point: Interno o Esterno).', type: 'activity' },
      { time: '17:00', activity: '🌇 Passeggiata Umeda + HEP Five.', type: 'activity' },
      { time: '19:30', activity: '🍜 Cena libera in zona Umeda — rientra presto, sei sveglio da ieri!', type: 'food' }
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
      "⚠️ MAREE MIYAJIMA — IMPORTANTE: Il torii galleggiante si vede solo con l'alta marea. Con la bassa marea il fondale è fango. Controlla le tavole delle maree per il 4 Ottobre 2026 su tide-forecast.com oppure l'app 'Tide Chart' prima di partire. L'alta marea ideale è al mattino — ottimo timing con l'arrivo alle 10:30.",
      "Okonomiyaki: A Hiroshima si prepara a strati (Hiroshima-style), diverso da quello di Osaka."
    ],
    details: [
      { time: '08:00', activity: '🚅 Shinkansen Osaka → Hiroshima (coperto dal pass).', type: 'transport' },
      { time: '10:00', activity: '🚢 Traghetto per Miyajima (coperto dal pass).', type: 'transport' },
      { time: '10:30', activity: '⛩️ Itsukushima Shrine e Torii galleggiante.', type: 'activity' },
      { time: '13:00', activity: '🍱 Pranzo a Miyajima — prova il momiji manju e le ostriche!', type: 'food' },
      { time: '14:30', activity: '☮️ Rientro Hiroshima — Peace Memorial Park e Museo.', type: 'activity' },
      { time: '18:00', activity: '🚅 Shinkansen rientro a Osaka.', type: 'transport' },
      { time: '20:00', activity: '🥞 Cena: Okonomiyaki Hiroshima Style.', type: 'food' }
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
      "Osaka Amazing Pass: Include ingressi gratuiti a castello, Umeda Sky Building e crociera Dotonbori.",
      "🍢 Street food: Takoyaki, gyoza e crêpes a Dotonbori la sera."
    ],
    details: [
      { time: '09:00', activity: '🏯 Castello di Osaka (incluso nell\'Osaka Amazing Pass).', type: 'activity' },
      { time: '12:00', activity: '🍱 Pranzo in zona Morinomiya.', type: 'food' },
      { time: '14:00', activity: '🌇 Umeda Sky Building — vista panoramica.', type: 'activity' },
      { time: '16:00', activity: '🗼 Tsutenkaku / Shinsekai — quartiere retrò.', type: 'activity' },
      { time: '19:00', activity: '🚤 Crociera serale sul fiume a Dotonbori (prenota online!).', type: 'activity' },
      { time: '20:30', activity: '🐙 Street food Dotonbori: takoyaki, gyoza, crêpes!', type: 'food' }
    ]
  },
  {
    slug: 'usj',
    date: '2026-10-06',
    day: 'Martedì',
    location: 'Osaka — USJ',
    title: 'Universal Studios Japan',
    highlights: ['Super Nintendo World', 'Harry Potter', 'Express Pass 8'],
    description: "Divertimento puro. Super Nintendo World è un'esperienza immersiva unica al mondo. Ottobre è il mese dell'Halloween Horror Nights!",
    coordinates: [
      { lat: 34.702485, lng: 135.495951, title: "Hotel" },
      { lat: 34.665442, lng: 135.432338, title: "Universal Studios Japan" }
    ],
    curiosities: [
      "Super Nintendo World richiede un Timed Entry Ticket separato dall'Express Pass — prenota sul sito USJ appena apre la finestra, si esaurisce rapidamente soprattutto in ottobre.",
      "Il castello di Hogwarts ha un percorso a piedi (Castle Walk) per chi non vuole fare la giostra."
    ],
    info: [
      "🎃 SUPER NINTENDO WORLD — TIMED ENTRY SEPARATO: Prenota su usj.co.jp con settimane o mesi di anticipo. Senza timed entry non si entra nell'area, indipendentemente dall'Express Pass.",
      "Arrivare presto (7:30-8:00) anche se apre alle 8:30. Scaricare l'app USJ ufficiale."
    ],
    details: [
      { time: '07:30', activity: '🚃 Trasferimento con JR Loop Line → JR Sakurajima.', type: 'transport' },
      { time: '08:30', activity: '🎢 Ingresso USJ con Express Pass 8 — arriva presto!', type: 'activity' },
      { time: 'Mattina', activity: '🍄 Super Nintendo World — vedi nota timed entry!', type: 'activity' },
      { time: 'Pomeriggio', activity: '🏰 Harry Potter e le altre attrazioni Express Pass.', type: 'activity' },
      { time: 'Sera', activity: '🎃 Spettacoli serali Halloween — ottobre è fantastico!', type: 'activity' },
      { time: '20:00', activity: '🏨 Rientro in hotel — domani si parte per Kyoto.', type: 'transport' }
    ]
  },
  {
    slug: 'kyoto-arrival',
    date: '2026-10-07',
    day: 'Mercoledì',
    location: 'Osaka -> Kyoto',
    title: 'Arrivo Kyoto + Kinkaku-ji & Gion',
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
      "💡 Coin locker: Deposita i bagagli in coin locker a Kyoto Station prima di Kinkakuji (ore 13:00).",
      "💡 Gion Tip: Il quartiere rende al massimo solo di sera. Hanamikoji è la via principale."
    ],
    details: [
      { time: 'Mattina', activity: '🏨 Check-out Ark Hotel Osaka.', type: 'hotel' },
      { time: '13:00', activity: '🚄 Arrivo Kyoto Station — coin locker per bagagli.', type: 'transport' },
      { time: '13:30', activity: '🚌 Bus verso Kinkakuji (linea 101 o 205).', type: 'transport' },
      { time: '14:30', activity: '🛕 Kinkaku-ji — il Padiglione d\'Oro.', type: 'activity' },
      { time: '16:00', activity: '🏨 Check-in Hotel Tavinos Kyoto + relax.', type: 'hotel' },
      { time: '18:00', activity: '🏮 Gion — Hanamikoji Street.', type: 'activity' },
      { time: '19:30', activity: '🍜 Cena a Gion o Pontocho Alley.', type: 'food' },
      { time: '20:30', activity: '🌑 Passeggiata Shirakawa Canal (opzionale).', type: 'activity' }
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
      "🍱 Cena: Hai camminato tanto, scegli qualcosa di sostanzioso!"
    ],
    details: [
      { time: '08:00', activity: '🚌 Partenza Tour Organizzato (Nara, Inari, Arashiyama).', type: 'activity' },
      { time: 'Mattina', activity: '🦌 Nara Park — cervi sacri e Tōdai-ji (il più grande tempio in legno).', type: 'activity' },
      { time: 'Pranzo', activity: '⛩️ Fushimi Inari — migliaia di torii rossi (parte bassa).', type: 'activity' },
      { time: 'Pomeriggio', activity: '🎋 Arashiyama — bamboo grove, tempio Tenryuji.', type: 'activity' },
      { time: '18:00', activity: '🏁 Rientro a Kyoto centro.', type: 'transport' },
      { time: '19:30', activity: '🍱 Cena — hai camminato tanto, scegli qualcosa di sostanzioso!', type: 'food' }
    ]
  },
  {
    slug: 'higashiyama',
    date: '2026-10-09',
    day: 'Venerdì',
    location: 'Kyoto',
    title: 'Kyoto Autentica — Higashiyama',
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
      "🚕 Taxi per Otagi Nenbutsu-ji: consigliato — difficile coi mezzi.",
      "🍵 Tea Ceremony: Optional intelligente alle 15:30, solo se non siete stanchi — prenota in anticipo."
    ],
    details: [
      { time: '08:30', activity: '🚕 Taxi per Otagi Nenbutsu-ji (consigliato — difficile coi mezzi).', type: 'activity' },
      { time: '10:30', activity: '🏘️ Higashiyama Sud — vicoletti Ninnen-zaka e Sannen-zaka.', type: 'activity' },
      { time: '11:30', activity: '🛕 Kiyomizu-dera — terrazza panoramica su Kyoto.', type: 'activity' },
      { time: '13:00', activity: '🍣 Nishiki Market — pranzo street food.', type: 'food' },
      { time: '15:30', activity: '🍵 Cerimonia del Tè (opzionale — prenota in anticipo).', type: 'activity' },
      { time: '19:00', activity: '🌃 Serata libera — Kamogawa o ultima passeggiata a Kyoto.', type: 'activity' }
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
      "🚄 Shinkansen Nozomi Kyoto → Tokyo: ~2h15m, €160 per 2 pax. NON coperto dal JR Kansai-Hiroshima Pass.",
      "🌇 Skytree: Prenotare l'orario del tramonto in anticipo."
    ],
    details: [
      { time: 'Mattina', activity: '🏨 Check-out Hotel Tavinos Kyoto.', type: 'hotel' },
      { time: '~10:00', activity: '🚄 Shinkansen Nozomi Kyoto → Tokyo (~2h15m) — €160 per 2 pax.', type: 'transport' },
      { time: '12:30', activity: '🛬 Arrivo Tokyo Station.', type: 'transport' },
      { time: '13:30', activity: '🏨 Metro → Check-in Hotel Tavinos Asakusa.', type: 'hotel' },
      { time: '15:00', activity: '⏸️ Pausa relax — disfa le valigie, respira.', type: 'activity' },
      { time: '16:30', activity: '🏮 Asakusa: Senso-ji e Nakamise al tramonto.', type: 'activity' },
      { time: '18:00', activity: '🌇 Tokyo Skytree — vista notturna su tutta la city.', type: 'activity' },
      { time: '20:00', activity: '🍜 Cena rilassata ad Asakusa.', type: 'food' }
    ]
  },
  {
    slug: 'modern-tokyo',
    date: '2026-10-11',
    day: 'Domenica',
    location: 'Tokyo',
    title: 'Tsukiji, TeamLab & Odaiba',
    highlights: ['Tsukiji', 'TeamLab Planets', 'Odaiba'],
    description: "Una giornata sensoriale. Dal sushi più fresco del mondo all'arte digitale immersiva, fino ai robot giganti di Odaiba.",
    coordinates: [
      { lat: 35.665486, lng: 139.770667, title: "Tsukiji Outer Market" },
      { lat: 35.646549, lng: 139.787162, title: "TeamLab Planets Toyosu" },
      { lat: 35.626297, lng: 139.774947, title: "Unicorn Gundam Statue (Odaiba)" }
    ],
    curiosities: [
      "Al TeamLab Planets si cammina nell'acqua, portate pantaloni arrotolabili!",
      "Il Gundam di Odaiba si muove e si illumina in orari specifici."
    ],
    info: [
      "🍣 Tsukiji: Arrivare presto (8:00) per gli spuntini al mercato esterno.",
      "👣 TeamLab Planets — PRENOTAZIONE OBBLIGATORIA su teamlab.art. Si entra scalzi.",
      "📍 Akihabara spostata al Giorno 13 (dopo il tour Fuji) dove c'è più margine."
    ],
    details: [
      { time: '08:00', activity: '🍣 Tsukiji Outer Market — colazione/spuntino.', type: 'food' },
      { time: '10:30', activity: '🎨 TeamLab Planets (Toyosu) — PRENOTAZIONE OBBLIGATORIA.', type: 'activity' },
      { time: '13:00', activity: '🤖 Odaiba — Gundam Unicorn e lungomare di Tokyo Bay.', type: 'activity' },
      { time: '17:30', activity: '🏨 Rientro in hotel — giornata piena, ci si ferma qui.', type: 'transport' },
      { time: '19:30', activity: '🍛 Cena ad Asakusa o Ueno.', type: 'food' }
    ]
  },
  {
    slug: 'shibuya-harajuku',
    date: '2026-10-12',
    day: 'Lunedì',
    location: 'Tokyo',
    title: 'Shibuya, Harajuku & Shinjuku',
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
      "🌇 Shibuya Sky: Prenota l'orario esatto del tramonto su shibuyasky.jp — 2-4 mesi prima.",
      "🛍️ Harajuku: Takeshita Street è piena, esplorate le vie laterali per negozi più cool."
    ],
    details: [
      { time: '09:00', activity: '🌳 Meiji Shrine — oasi verde nel cuore di Tokyo.', type: 'activity' },
      { time: '10:30', activity: '🍭 Harajuku & Takeshita Street — moda alternativa e crepes.', type: 'activity' },
      { time: '12:30', activity: '🚶 Shibuya Crossing — l\'incrocio più famoso del mondo + pranzo.', type: 'activity' },
      { time: '16:40', activity: '🌇 Shibuya Sky al tramonto — prenota l\'orario esatto!', type: 'activity' },
      { time: '19:00', activity: '🌃 Shinjuku: Omoide Yokocho e luci di Kabukicho.', type: 'activity' }
    ]
  },
  {
    slug: 'fuji-tour',
    date: '2026-10-13',
    day: 'Martedì',
    location: 'Lago Kawaguchiko / Tokyo',
    title: 'Tour Monte Fuji + Akihabara',
    highlights: ['Lago Kawaguchiko', 'Vista Fuji', 'Pagoda Chureito', 'Akihabara'],
    description: "Una giornata intera dedicata al simbolo del Giappone. Sperando nella clemenza delle nuvole. Serata opzionale ad Akihabara.",
    coordinates: [
      { lat: 35.691656, lng: 139.696879, title: "Partenza Tour (Shinjuku)" },
      { lat: 35.530397, lng: 138.751590, title: "Oishi Park (Lake Kawaguchiko)" },
      { lat: 35.501170, lng: 138.801657, title: "Chureito Pagoda" },
      { lat: 35.698383, lng: 139.773072, title: "Akihabara Electric Town" }
    ],
    curiosities: [
      "La Pagoda Chureito con il Fuji sullo sfondo è una delle foto più famose del Giappone.",
      "Il Monte Fuji è timido: spesso si nasconde tra le nuvole nel pomeriggio."
    ],
    info: [
      "🚌 GIORNO IMPEGNATIVO: Tour guidato dalle 8:00 alle 18:30.",
      "⚡ Tokyo Subway Ticket scade domani (13/10) — sfruttalo oggi per Akihabara se hai energie.",
      "💡 TIP: Se è nuvoloso, godetevi comunque l'atmosfera del lago e dei santuari."
    ],
    details: [
      { time: '08:00', activity: '🚌 Partenza tour organizzato da Shinjuku Station.', type: 'activity' },
      { time: 'Mattina', activity: '🗻 Lago Kawaguchiko e Oishi Park (riflesso del Fuji nell\'acqua).', type: 'activity' },
      { time: 'Pomeriggio', activity: '⛩️ Chureito Pagoda — vista classica Fuji + Pagoda (colori autunnali!).', type: 'activity' },
      { time: 'Pomeriggio', activity: '💧 Oshino Hakkai — sorgenti cristalline ai piedi del Fuji.', type: 'activity' },
      { time: '18:30', activity: '🏁 Rientro a Tokyo / Shinjuku.', type: 'transport' },
      { time: '19:30', activity: '⚡ Akihabara (opzionale) — anime, retrogaming, maid cafe.', type: 'activity' },
      { time: '21:00', activity: '🍲 Cena calda vicino all\'hotel.', type: 'food' }
    ]
  },
  {
    slug: 'disneyland',
    date: '2026-10-14',
    day: 'Mercoledì',
    location: 'Maihama — Tokyo',
    title: 'Tokyo Disneyland',
    highlights: ['Disneyland', 'Beauty and the Beast', 'Haunted Mansion'],
    description: "Il regno della magia. Tokyo Disneyland è famoso per la sua pulizia impeccabile e l'ospitalità unica. Ottobre = Halloween!",
    coordinates: [
      { lat: 35.632896, lng: 139.880394, title: "Tokyo Disneyland" }
    ],
    curiosities: [
      "I cast member (staff) salutano con entrambe le mani per essere più accoglienti.",
      "La 'Beauty and the Beast' ride è un'esclusiva tecnologica incredibile."
    ],
    info: [
      "📱 Usa l'app MyDisney per le virtual queue e i tempi di attesa.",
      "⏰ Arrivate ai cancelli almeno 45-60 min prima dell'apertura ufficiale."
    ],
    details: [
      { time: '07:30', activity: '🚃 JR Keiyō Line → Maihama Station (diretto).', type: 'transport' },
      { time: '08:30', activity: '🏰 Ingresso Tokyo Disneyland — OTTOBRE = Halloween!', type: 'activity' },
      { time: 'Mattina', activity: '🎢 Attrazioni prioritarie (usa l\'app MyDisney per le virtual queue).', type: 'activity' },
      { time: 'Pranzo', activity: '🍗 Turkey leg o Mont Blanc popcorn — esperienze gastronomiche Disney.', type: 'food' },
      { time: 'Pomeriggio', activity: '🌹 Beauty and the Beast / Space Mountain / Haunted Mansion.', type: 'activity' },
      { time: '20:30', activity: '🎃 Spettacolo serale Halloween e rientro.', type: 'activity' }
    ]
  },
  {
    slug: 'disneysea',
    date: '2026-10-15',
    day: 'Giovedì',
    location: 'Maihama — Tokyo',
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
      "🌟 Fantasy Springs (zona 2024): Peter Pan, Frozen, Rapunzel — pianifica bene l'ingresso.",
      "🎢 Soaring: Fantastic Flight — prenota la virtual queue all'apertura del parco!"
    ],
    details: [
      { time: '08:30', activity: '🌋 Ingresso Tokyo DisneySea — unico al mondo!', type: 'activity' },
      { time: 'Apertura', activity: '🏰 Fantasy Springs — zona 2024 (Peter Pan, Frozen, Rapunzel).', type: 'activity' },
      { time: 'Mattina', activity: '🌍 Soaring: Fantastic Flight — prenota virtual queue all\'apertura!', type: 'activity' },
      { time: 'Pomeriggio', activity: '🎢 Journey to the Center of the Earth + show.', type: 'activity' },
      { time: 'Sera', activity: '🍽️ Cena in uno dei ristoranti tematici Disney (prenota via app).', type: 'food' },
      { time: '21:00', activity: '🏨 Rientro in hotel — ultima notte a Tokyo.', type: 'transport' }
    ]
  },
  {
    slug: 'departure',
    date: '2026-10-16',
    day: 'Venerdì',
    location: 'Tokyo -> Narita -> Milano',
    title: 'Ueno & Partenza',
    highlights: ['Ueno Park', 'Keisei Skyliner', 'Volo'],
    description: "Ultimi saluti al Giappone. Una passeggiata rilassante a Ueno prima di volare verso casa.",
    coordinates: [
      { lat: 35.714073, lng: 139.774092, title: "Ueno Park" },
      { lat: 35.771987, lng: 140.392850, title: "Narita Airport (NRT)" }
    ],
    curiosities: [
      "Ueno Park ospita panda giganti allo zoo e molti templi storici.",
      "Ameyoko Market, lungo i binari, è perfetto per souvenir last-minute (tè, kitkat, spezie)."
    ],
    info: [
      "🚄 Keisei Skyliner da Nippori Station (non Ueno!) → Narita Terminal 1 in ~40 min. Nippori è più vicina all'hotel.",
      "🛫 Parti con lo Skyliner ore 10:30 → arrivo Narita ~11:25. Margine consigliato: almeno 3h prima del volo (14:25)."
    ],
    details: [
      { time: '09:00', activity: '🌳 Ueno Park — breve passeggiata, forse i primi momiji (aceri rossi).', type: 'activity' },
      { time: '10:30', activity: '🚄 Keisei Skyliner da Nippori Station → Narita Terminal 1 (~40 min).', type: 'transport' },
      { time: '11:25', activity: '🛂 Arrivo Narita: check-in, dogana, duty-free.', type: 'logistics' },
      { time: '14:25', activity: '✈️ Partenza volo Eva Air per Taipei.', type: 'transport' },
      { time: '17:05', activity: '🛬 Scalo Taipei Terminal 2.', type: 'transport' },
      { time: '23:15', activity: '✈️ Partenza per Milano Malpensa.', type: 'transport' }
    ]
  },
  {
    slug: 'home-arrival',
    date: '2026-10-17',
    day: 'Sabato',
    location: 'Italia',
    title: 'Bentornati a Casa!',
    highlights: ['Arrivo MXP'],
    image: '/images/malpensa.png',
    description: "Fine del viaggio. Benvenuti a casa!",
    coordinates: [
      { lat: 45.630063, lng: 8.725531, title: "Milano Malpensa T1" }
    ],
    curiosities: [],
    info: [],
    details: [
      { time: '07:35', activity: '🛬 Arrivo Milano Malpensa Terminal 1.', type: 'transport' },
      { time: '–', activity: '🧳 Ritiro bagagli e uscita — il Giappone è nel cuore.', type: 'logistics' },
      { time: '–', activity: '☕ Prima cosa: un buon caffè italiano (il Giappone era meglio?).', type: 'food' }
    ]
  }
];
