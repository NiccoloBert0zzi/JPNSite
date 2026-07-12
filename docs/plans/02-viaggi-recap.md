# Piano 2 — `/viaggi` "I miei viaggi" (recap)

> Stato: **da fare** (dopo il Piano 1)

## Obiettivo

Sostituire lo stub `/viaggi` con una pagina recap di tutti i viaggi: se clicco su un viaggio mi porta al viaggio stesso.

## Design

- **Tema scuro**: `/viaggi`, `/wishlist`, `/diario` formano il layer "hub" che condivide `LandingNavbar` e il brand teal; le pagine chiare restano il layer "dentro il viaggio" (itinerary, budget…).
- Struttura: `LandingNavbar` + header ("I miei viaggi" + strip statistiche riusando `landingStats()` da `src/data/index.js`) + griglia responsive di card viaggi da `allTrips` (ordinati per `startDate` desc).
- Card viaggio: cover `heroImage` con overlay gradiente, chip `label`, titolo, `country` + anno, `dates`, badge `tripDurationDays(trip)`.
- CTA card: viaggio attivo → `/itinerary`; altro viaggio → `trip.url` esterno (stessa logica di `TripCardBody.js`).

## File

- `src/app/viaggi/page.js` — sostituire il body ComingSoon.
- `src/components/landing/TripGridCard.js` — nuova card griglia.

## Test

- E2e: `/viaggi` mostra 2 card con href corretti (attivo → `/itinerary`, altro → URL esterno).
