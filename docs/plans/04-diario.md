# Piano 4 — `/diario` (diario sfogliabile)

> Stato: **da fare** (dopo il Piano 3)

## Obiettivo

Sostituire lo stub `/diario` con una pagina in stile diario con pagine che si sfogliano (frecce destra/sinistra, tastiera, swipe).

## Design versione base

- Pagina hub scura a "quaderno": una doppia pagina per giorno di itinerario — a sinistra foto dalla `gallery` abbinate per location/slug, a destra data, titolo, descrizione da `itinerary`; ornamenti in `font-hand` (Caveat).
- Navigazione: bottoni freccia + tasti `ArrowLeft`/`ArrowRight` + swipe touch.
- Transizione: **framer-motion slide direzionale** (`AnimatePresence` + variants direction-aware), NON flip 3D CSS nella base — framer-motion è già in dependency e gestisce gesture/keyboard/reduced-motion; il flip 3D (backface-visibility/perspective) è buggy su mobile.
- Strutturare `DiaryPage` dietro un'API `paginate(direction)` così l'effetto sfoglia realistico 3D si può innestare in seguito senza rifare la logica.

## Dati

- Solo dati statici nella base (`gallery` + `itinerary` da `src/data`).
- Evoluzione futura: note editabili per pagina via `trip_data` con data_key `'diario'` (riuso `getTripData`/`saveTripData` + admin edit mode).

## File

- `src/app/diario/page.js` — sostituire il body ComingSoon.
- `src/components/landing/DiaryBook.js` + `DiaryPage.js`.

## Test

- E2e: pagina carica, freccia destra cambia pagina, tasto freccia funziona.
