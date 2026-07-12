# Piano 1 — Landing "Travel Hub" (dark + globo)

> Stato: **in implementazione**

## Obiettivo

Trasformare la home (solo globo 3D full-screen) in un "hub viaggi" in stile mockup: sfondo scuro, globo al centro con glow migliorato, e overlay tutt'attorno — navbar scura in alto (senza avatar utente), testo hero a sinistra con CTA decorativa, pannelli "I tuoi numeri" e "Ultimi viaggi" a destra, pill "Trascina, ruota…" sotto il globo, 4 card feature grafiche e citazione di Sant'Agostino in fondo.

## Decisioni

- Accento **teal fisso** (`#34d399`) solo per la landing/hub, indipendente dal tema viaggio.
- Statistiche **reali** derivate dai dati (`src/data`).
- Navbar: **Esplora → `/`, I miei viaggi → `/viaggi`, Wishlist → `/wishlist`, Diario → `/diario`** (niente "Mappe", niente avatar). Le tre pagine nuove arrivano nei piani 2–4; ora stub scuri "Presto disponibile".
- Interazione marker: di default si vedono i due pannelli destri; click su un marker → i pannelli escono e appare la TripCard; chiusura (X / click fuori / Esc) → i pannelli rientrano. TripPills eliminato.
- CTA "＋ Aggiungi un viaggio" e le 4 card in basso: solo grafica.

## File nuovi (`src/components/landing/` + stub pages)

| File | Contenuto |
|---|---|
| `landing/LandingNavbar.js` | Nav scura fissa top (z-40), glass on-scroll; logo `Globe` + wordmark "I MIEI VIAGGI"; pill centrali con attivo via `usePathname()`; hamburger su mobile. |
| `landing/HeroCopy.js` | h1 "Ogni viaggio lascia un **segno.**" (span teal), sottotitolo, bottone teal "＋ Aggiungi un viaggio" (decorativo), annotazione `font-hand` "Inizia da qui!" con freccia SVG. Entrata staggered framer-motion. |
| `landing/StatsPanel.js` | Card glass "I tuoi numeri": Paesi visitati / Viaggi completati da `landingStats()`; Sogni nel cassetto = prop `wishlistCount` (0 finché il Piano 3 non lo collega al DB). |
| `landing/RecentTripsPanel.js` | Card glass "Ultimi viaggi": thumbnail + titolo + mese/anno; riga → `/itinerary` (attivo) o `trip.url` (altro); bottone pin → apre TripCard; "Vedi tutti →" → `/viaggi`. |
| `landing/SidePanels.js` | Colonna destra assoluta su desktop (z-20), in flusso su mobile; AnimatePresence per lo swap con la TripCard. |
| `landing/DragHintPill.js` | Pill glass "Trascina, ruota e scopri il mondo". |
| `landing/FeatureCards.js` | 4 card grafiche: Esplora/Sogna/Ricorda/Condividi. |
| `landing/QuoteSection.js` | Citazione Sant'Agostino, virgolette teal. |
| `landing/ComingSoon.js` | Stub scuro riusabile "Presto disponibile". |
| `src/app/viaggi/page.js`, `wishlist/page.js`, `diario/page.js` | Stub pages con LandingNavbar + ComingSoon. |

## File modificati

- `src/app/page.js` — wrapper scuro → LandingNavbar → GlobeHeroWrapper → FeatureCards → QuoteSection (pagina scrollabile).
- `src/components/globe/GlobeHero.js` — via TripPills; dentro HeroCopy, SidePanels, DragHintPill; layout responsive.
- `src/data/index.js` — campo `country` sui viaggi + `landingStats(now)`.
- `src/app/layout.js` — font Caveat (`--font-hand`).
- `tailwind.config.js` — `colors.accent`, `fontFamily.hand`.
- `src/app/globals.css` — `--accent: #34d399; --accent-strong: #10b981`.
- `src/components/Navbar.js` — early return esteso a `/viaggi`, `/wishlist`, `/diario`.
- `src/components/globe/Atmosphere.js` + `shaders/atmosphereShader.js` — glow: scale 1.035→1.05, colore (0.4,0.65,1.0), falloff `pow(0.7-…, 3.5)`.
- `src/components/globe/StaticGlobeFallback.js` — rebrand con HeroCopy + StatsPanel.
- `e2e/smoke.test.ts` — test pill → test pannelli/pin; nuovi test stub pages.

## File eliminati

- `src/components/globe/TripPills.js`.

## Responsive (breakpoint `lg` 1024px)

- **≥1024**: sezione `relative lg:h-screen overflow-hidden`; HeroCopy assoluto a sinistra; SidePanels colonna destra; DragHintPill bottom-center; TripCard z-30; AdminControls z-50 intatto.
- **<1024**: colonna in flusso — navbar → HeroCopy → globo `h-[55vh]` → SidePanels (mai nascosti) → FeatureCards → Quote. TripCard resta bottom-sheet.

## Verifica

`npm run dev` a 1440px e 390px (swap pannelli↔card, link, fallback WebGL-off), poi `npm test`, `npm run typecheck`, `npm run lint`, `npm run test:e2e`.
