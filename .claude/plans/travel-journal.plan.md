# Plan: Travel Journal — Data Model & Data-Access Layer

**Source PRD**: docs/travelJourna.prd.md
**Selected Milestone**: Deliverables Order items 1–2 (PRD sections A1 "Data Model" + A2 "Data-access layer")
**Complexity**: Small

## Summary
Stand up the Postgres schema and data-access layer for the Travel Journal feature: two new tables (`journal`, `journal_page`), a `src/lib/journal-db.js` module exposing `ensureJournalTables`/`getJournal`/`getPages`/`upsertPage`, and per-trip static seed files under `src/data/<trip>/journal.js`. This is the foundation every later Track A step (API routes, context, UI) builds on — no UI or routes are touched in this milestone.

## Patterns to Mirror
| Category | Source | Pattern |
|---|---|---|
| Data access | [src/lib/db.js:28-42](src/lib/db.js#L28-L42) | `createTable()` — plain async function, `sql\`CREATE TABLE IF NOT EXISTS ...\``, errors caught and logged internally (never thrown) |
| Data access | [src/lib/db.js:44-75](src/lib/db.js#L44-L75) | Read-with-fallback: try DB first, fall back to a `STATIC_DATA[tripId][key]` map built from direct per-trip static imports, catch-all returns the static fallback on DB error |
| Data access | [src/lib/db.js:82-99](src/lib/db.js#L82-L99) | Write function returns `{ success: true }` / `{ success: false, error: 'Errore nel salvataggio dei dati' }` instead of throwing; calls its own table-ensure function first |
| Naming | [src/data/index.js:1-23](src/data/index.js#L1-L23) | Per-trip static modules are imported directly (`import { x as japanX } from './japan/x'`), not through a generic loader |
| Naming | [src/data/japan/reservations.js:1](src/data/japan/reservations.js#L1) | Static data files export one named const matching the domain (`export const reservations = [...]`) |
| Types | [src/data/index.js:27-44](src/data/index.js#L27-L44) | JSDoc `@typedef` block declared directly above its primary consumers in the same file (no separate types file in this repo) |
| Tests | [src/lib/__tests__/db.test.js](src/lib/__tests__/db.test.js) | `jest.mock('@vercel/postgres', () => ({ sql: jest.fn() }))` + `jest.mock('@/data/<trip>/<file>', ...)` per import; `beforeEach(() => jest.clearAllMocks())`; assert on returned value shape, not implementation |
| Tests | [src/lib/__tests__/db.test.js:60-84](src/lib/__tests__/db.test.js#L60-L84) | `saveTripData`-style write tests queue exactly 2 `sql` resolutions (ensure-table call, then the upsert) via `mockResolvedValueOnce` |

No existing code creates two related tables from one module or does `ON CONFLICT` upserts outside `db.js`/`reservations/route.js` — the SQL shapes below are new but follow the same `sql\`\`` tagged-template style used everywhere else.

## Files to Change
| File | Action | Why |
|---|---|---|
| `src/lib/journal-db.js` | CREATE | Data-access layer: JSDoc typedefs, `ensureJournalTables`, `getJournal`, `getPages`, `upsertPage` (PRD A1/A2) |
| `src/data/japan/journal.js` | CREATE | Static seed/fallback for the Japan trip journal (empty journal + no pages — no existing diary content) |
| `src/data/budapest/journal.js` | CREATE | Static seed/fallback for the Budapest trip journal |
| `src/lib/__tests__/journal-db.test.js` | CREATE | Unit tests for the four exported functions, mirroring `db.test.js` |

## Tasks

### Task 1: JSDoc typedefs
- **Action**: At the top of `src/lib/journal-db.js`, add `@typedef {Object} JournalPage` and `@typedef {Object} Journal` exactly as specified in PRD A1 (id, tripId, pageNumber, date, content, createdAt, updatedAt, isDirty, localVersion for pages; tripId, coverColor, createdAt, updatedAt for the journal). Note in a comment that `isDirty`/`localVersion` are client-only and have no DB column (per PRD A1 note).
- **Mirror**: `src/data/index.js:27-44` typedef placement/style.
- **Validate**: `npm run typecheck` (file is in the `checkJs` scope via `src/lib/**/*.js`).

### Task 2: Postgres schema + `ensureJournalTables()`
- **Action**: Implement `ensureJournalTables()` running the two `CREATE TABLE IF NOT EXISTS` statements and the index from PRD A1 (`journal`, `journal_page` with `UNIQUE (trip_id, entry_date)`, `idx_journal_page_trip`). Catch and `console.error` internally, matching `createTable()` — never throw.
- **Mirror**: `src/lib/db.js:28-42`.
- **Validate**: `npm run typecheck`; covered by Task 7 tests.

### Task 3: `getJournal(tripId)`
- **Action**: `SELECT * FROM journal WHERE trip_id = $1`. If no row, upsert-on-read: call `ensureJournalTables()`, then `INSERT ... ON CONFLICT (trip_id) DO NOTHING RETURNING *` using the static seed's `coverColor` (fallback `#8B5E3C` per PRD A1 default) if no row comes back re-select it. On any DB error, fall back to `STATIC_DATA[tripId]` shaped as a `Journal` (no throw), matching `getTripData`'s catch-all fallback.
- **Mirror**: `src/lib/db.js:44-75` (read-with-fallback shape).
- **Validate**: `npm run test -- journal-db`.

### Task 4: `getPages(tripId)`
- **Action**: `SELECT * FROM journal_page WHERE trip_id = $1 ORDER BY page_number ASC`. On DB error, fall back to the static seed's `pages` array (empty for MVP).
- **Mirror**: `src/lib/db.js:44-75`.
- **Validate**: `npm run test -- journal-db`.

### Task 5: `upsertPage(page)`
- **Action**: Call `ensureJournalTables()`, then `INSERT INTO journal_page (...) VALUES (...) ON CONFLICT (trip_id, entry_date) DO UPDATE SET content, page_number, updated_at = NOW() RETURNING *`. Return `{ success: true, page }` or `{ success: false, error: 'Errore nel salvataggio della pagina del diario' }` on failure — same Italian-error-string convention as `saveTripData`.
- **Mirror**: `src/lib/db.js:82-99`.
- **Validate**: `npm run test -- journal-db`.

### Task 6: Static seed files
- **Action**: Create `src/data/japan/journal.js` and `src/data/budapest/journal.js`, each `export const journal = { coverColor: '<trip theme primary or PRD default>', pages: [] }`. Import both directly into `journal-db.js`'s `STATIC_DATA` map, matching `db.js`'s direct-import style (not routed through `src/data/index.js`).
- **Mirror**: `src/data/japan/reservations.js:1`; `src/lib/db.js:2-10` (direct static imports feeding a `STATIC_DATA` map).
- **Validate**: `npm run typecheck` (path is in `checkJs` scope via `src/data/**/*.js`).

### Task 7: Unit tests
- **Action**: `src/lib/__tests__/journal-db.test.js` — mock `@vercel/postgres` and the two static journal imports; cover: `getJournal` DB-hit, DB-empty-triggers-upsert, DB-error-fallback; `getPages` DB-hit and DB-error-fallback; `upsertPage` success (2 queued `sql` resolutions: ensure-table, then upsert) and failure.
- **Mirror**: `src/lib/__tests__/db.test.js` full file (mock setup, `mockResolvedValueOnce` sequencing, assertion style).
- **Validate**: `npm test` (must also clear 70% branch/function/line coverage threshold on this new file, per `npm run test:coverage`).

## Validation
```bash
npm run typecheck
npm test -- journal-db
npm run lint
```

## Risks
| Risk | Likelihood | Mitigation |
|---|---|---|
| `gen_random_uuid()` needs the `pgcrypto` extension; may not be pre-enabled on this Vercel Postgres instance | Medium | Verify against the real DB once deployed; if it fails, generate the UUID in `upsertPage` with `crypto.randomUUID()` (Node built-in) and pass it in explicitly instead of relying on the column default |
| Concurrent first-requests both hitting `getJournal`/`upsertPage` could both attempt `ensureJournalTables()` | Low | `CREATE TABLE IF NOT EXISTS` is idempotent and safe to call repeatedly; unlike `reservations/route.js` there's no seed-loop side effect to deduplicate, so the `setupDone`/`setupPromise` memoization isn't needed here |
| Static seed shape (`{ coverColor, pages: [] }`) may not match what later Track A milestones (API routes, context) expect | Low | Shape is derived directly from the PRD's `Journal`/`JournalPage` typedefs (A1); later milestones consume through `getJournal`/`getPages`, not the seed file directly |

## Acceptance
- [ ] All tasks complete
- [ ] Validation passes
- [ ] Patterns mirrored, not reinvented
