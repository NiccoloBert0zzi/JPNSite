# Piano 3 — `/wishlist` (paesi dei desideri)

> Stato: **da fare** (dopo il Piano 2)

## Obiettivo

Sostituire lo stub `/wishlist` con una pagina dove aggiungo/tolgo i paesi che sogno di visitare, scegliendo da un catalogo precaricato (combobox ricercabile). Lettura pubblica, modifica solo da admin.

## Storage (verificato)

- Riuso `getTripData`/`saveTripData` da `src/lib/db.js` con pseudo trip id **`'shared'`** e data_key **`'wishlist'`**: `trip_id` è VARCHAR(50) parametrizzato senza whitelist; il fallback statico assente restituisce `[]` pulito; entrambi i deploy (japan/budapest) vedono la stessa lista.
- Formato dato: `[{ code: 'JP', name: 'Giappone', flag: '🇯🇵', addedAt: '2026-07-12' }, …]`.

## Implementazione

- Catalogo statico `src/data/countries.js` (codice ISO, nome italiano, bandiera emoji).
- Server actions in `src/app/actions.js`: `addWishlistCountry` / `removeWishlistCountry`, protette dal `checkAuth()` esistente; `revalidatePath('/wishlist')` e `revalidatePath('/')`.
- Pagina hub scura: `LandingNavbar` + griglia paesi (bandiera, nome, data aggiunta); UI aggiungi/rimuovi visibile solo con `isAdmin` (`AdminContext`); combobox filter-as-you-type navigabile da tastiera.

## Integrazione landing

- `src/app/page.js` diventa server component: legge il conteggio wishlist e lo passa `GlobeHeroWrapper → GlobeHero/StaticGlobeFallback → SidePanels → StatsPanel` — "Sogni nel cassetto" diventa reale (sostituisce lo 0 hardcoded).
- La CTA "＋ Aggiungi un viaggio" della landing potrà puntare a `/wishlist`.

## Test

- Jest: server actions (auth negata senza cookie; add/remove aggiornano il JSONB — mock `@vercel/postgres` come da convenzioni CLAUDE.md).
- E2e: pagina carica; da non-admin nessuna UI di modifica.
