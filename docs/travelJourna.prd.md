# Travel Journal Feature — Implementation Plan (Next.js / JPN edition)

> Adapted from the original Flutter plan to the actual JPN stack:
> **Next.js App Router · 100% JavaScript (+ JSDoc) · @vercel/postgres · React Context ·
> framer-motion · three/@react-three/fiber/drei · Tailwind · Jest + Testing Library + Playwright.**

## Goal

Create an immersive **Travel Journal** experience that feels like interacting with a real
collection of travel diaries instead of a traditional notes app. Make writing and reading
memories emotionally engaging, while keeping the implementation maintainable and performant
**in a Next.js web app**.

**Two tracks:** a functional **MVP** first (Track A), then a **Cinematic Layer** on top (Track B).
Don't sink weeks into 3D/animation before the core journaling (data, writing, reading) is proven.

**Reuse, don't reinvent:** the app already models each trip via `trip_id`
(`japan`, `budapest`, switched by `scripts/use-trip.js`). A "Travel" **is** an existing trip.
There is already a `src/app/diario/page.js` stub — the journal lives there.

---

## Flutter → Next.js translation (reference)

| Original (Flutter) | JPN / Next.js equivalent |
|---|---|
| Dart classes / TS interfaces | **JS + JSDoc `@typedef`** (repo is 100% `.js`) |
| Riverpod / Bloc | **React Context + hooks** (mirror `src/context/AdminContext.js`); server data via `fetch` to route handlers |
| drift / isar (local SQLite) | **`@vercel/postgres`** for durable storage (mirror `src/lib/db.js`) + **IndexedDB/localStorage** for offline drafts |
| `PageView`, `showModalBottomSheet` | React components + **framer-motion**; modal/drawer for the writing panel |
| `Transform`/`Matrix4`/`AnimationController`, `Hero` | **framer-motion** (`animate`, `layoutId` shared-layout) for 2.5D; **@react-three/fiber + drei** for true 3D |
| `RepaintBoundary`, device tiering | `React.memo`, `will-change`, dynamic `import()` of 3D, quality toggle |
| OS "reduce motion" | `useReducedMotion()` (framer-motion) / `matchMedia('(prefers-reduced-motion: reduce)')` |
| Golden / screenshot tests | **Playwright** visual snapshots (`toHaveScreenshot`) |
| Flutter widget tests | **@testing-library/react + user-event** |

---

## Architecture (mirrors existing `src/` layout)

```
src/
  app/
    diario/                     # existing stub — journal UI mounts here
      page.js                   # Library (shelf) entry
      [trip]/page.js            # opened journal for a trip (optional route)
    api/
      journal/
        route.js                # GET/POST pages  (mirror api/reservations/route.js)
        [tripId]/route.js       # per-trip pages
  components/
    journal/                    # Library, Journal, Page, WritingPanel, PageNav ...
  context/
    JournalContext.js           # mirror AdminContext.js
  lib/
    journal-db.js               # server data access (mirror lib/db.js: sql`` + JSONB)
    journal-drafts.js           # client-side draft store (IndexedDB/localStorage)
  data/
    <trip>/journal.js           # optional static seed/fallback, like other data/<trip>/*
```

State split (the reason to keep Context, not just server fetch):
- **Persisted domain state** (journal content) -> server (Postgres) + Context cache.
- **Transient UI state** (which journal is open, page-turn progress, camera/zoom) -> local component/Context state, never persisted.

---

## Track A — MVP (build this first)

Full *functional* journal with simple, cheap visuals. Nothing here is thrown away later.

### A1. Data Model (JSDoc + Postgres)

Types via JSDoc (no TS in this repo):

```js
/**
 * @typedef {Object} JournalPage
 * @property {string} id
 * @property {string} tripId        // existing trip concept: 'japan' | 'budapest' | ...
 * @property {number} pageNumber
 * @property {string} date          // ISO yyyy-mm-dd (one page per travel day)
 * @property {string} content
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {boolean} isDirty       // client-only: unsynced local edits
 * @property {number} localVersion   // client-only: simple conflict counter
 */

/**
 * @typedef {Object} Journal
 * @property {string} tripId         // PK — one journal per trip
 * @property {string} coverColor
 * @property {string} createdAt
 * @property {string} updatedAt
 */
```

Postgres (mirror the `sql\`\`` style + JSONB habit in `lib/db.js`, but use real columns so
per-date / per-trip queries are indexable):

```sql
CREATE TABLE IF NOT EXISTS journal (
  trip_id     VARCHAR(50) PRIMARY KEY,
  cover_color VARCHAR(20) NOT NULL DEFAULT '#8B5E3C',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS journal_page (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id     VARCHAR(50) NOT NULL,
  page_number INT NOT NULL,
  entry_date  DATE NOT NULL,
  content     TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (trip_id, entry_date)
);
CREATE INDEX IF NOT EXISTS idx_journal_page_trip ON journal_page (trip_id, page_number);
```

`isDirty` / `localVersion` are **client-side only** (offline drafts) — they don't need DB columns
for the MVP; they live in the draft store (A3).

### A2. Data-access layer (mirror `lib/db.js`)

`src/lib/journal-db.js` — plain exported async functions using `import { sql } from '@vercel/postgres'`,
same shape as the existing repo (which does **not** use classes/ORMs):

```js
export async function ensureJournalTables() { /* CREATE TABLE IF NOT EXISTS ... */ }
export async function getJournal(tripId) { /* upsert-on-read, like STATIC_DATA fallback */ }
export async function getPages(tripId) { /* ORDER BY page_number */ }
export async function upsertPage(page) { /* INSERT ... ON CONFLICT (trip_id, entry_date) DO UPDATE */ }
```

Keep a static seed/fallback in `src/data/<trip>/journal.js`, matching how `lib/db.js`
falls back to `STATIC_DATA`.

### A3. Persistence & offline drafts

Web split (there is no on-device SQLite here):
- **Durable** storage -> Postgres via **route handlers** `src/app/api/journal/...` (mirror `api/reservations/route.js`).
- **Draft recovery** -> `src/lib/journal-drafts.js` using **IndexedDB** (preferred) or `localStorage`:
  - autosave the in-progress entry every ~2-3s while editing (debounced);
  - on mount, if a draft exists newer than the server copy, offer to restore it;
  - clear the draft once a save to the server succeeds.

### A4. Reading Mode (simplified visuals)

- Static paged view: a horizontal pager (framer-motion drag / simple next-prev), **no page-curl yet**.
- Paper-texture background (image in `public/`), warm off-white, a handwriting display font
  (`next/font/google`) for reading, clean sans while editing.
- Margins + subtle shadow. No stains/stickers yet (Track B).

### A5. Writing Panel

- Tap/click a page -> a **bottom drawer** slides up (framer-motion; the Flutter `showModalBottomSheet` equivalent).
- Contains: date picker, multiline editor (`<textarea>`), character count, Save / Cancel.
- Journal stays visible (dimmed) behind the drawer.
- On save: drawer closes, content fades onto the page. Uses `useReducedMotion()` to skip the fade if requested.

### A6. Daily Timeline & Navigation

- One page per travel day; a new page is auto-created when a new date is picked.
- Next / previous, jump to first / last, jump to date.
- Page indicator: `Page 8 / 42`.

### A7. Empty State

- Blank first page, centered: *"Your adventure begins here."* + CTA *Write first memory*.

### A8. Testing (MVP scope)

- **Unit (Jest):** `journal-db` query builders, autosave/draft-recovery logic, page-number/date logic.
  Co-locate in `src/lib/__tests__/` like the existing `db.test.js`.
- **Component (@testing-library/react + user-event):** writing panel open/save/cancel, empty state.
- **API route (Jest):** `api/journal` handlers, mirroring `api/reservations/__tests__/route.test.js`.
- No animation tests yet.

**MVP exit criteria:** a user can create a journal for a trip, write dated entries, reload the page
mid-edit and recover the draft, and browse pages — with plain but pleasant visuals. Validate before Track B.

---

## Track B — Cinematic Layer (after MVP is validated)

On the web you already ship **three / @react-three/fiber / drei**, so there are two legitimate paths.
Default to the cheaper one; the 3D path is available because the deps already exist.

### B1. Library Scene — two options

- **Option 1 (default): 2.5D with framer-motion + CSS 3D.** Layered `motion.div`s, `transform-style: preserve-3d`,
  perspective, gradients/shadows for a wooden shelf and colored book spines. Idle float via a subtle looping
  `animate`. Cheapest, SSR-friendly, no WebGL cost.
- **Option 2: true 3D with @react-three/fiber + drei.** A real shelf/books scene, `dynamic()`-imported and
  client-only (`ssr: false`) so it never blocks first paint. Use because `three`/R3F/drei are already installed —
  but gate it (B4) since WebGL is heavier on low-end devices.

Selection: tap a book -> it scales/translates forward, siblings blur (CSS `backdrop-filter`, used sparingly),
scene "zooms", then a **framer-motion shared-layout (`layoutId`) transition** into the desk scene
(the web equivalent of Flutter's `Hero`).

### B2. Desk Transition & Journal Opening

- `layoutId` shared-element transition from shelf book -> desk journal (no manual position math).
- Cover-open: framer-motion rotateY with `perspective`, a drop shadow that shifts with the angle,
  and a thin "page-stack" edge for thickness.

### B3. Page Turning

- **Tier 1 (default):** rotation-based flip via framer-motion `rotateY` + `perspective`, with a moving
  shadow-gradient overlay. Drag-to-turn with easing on release. This is what most web "book" UIs ship.
- **Tier 2 (optional, capable devices):** true page-curl via a WebGL shader in R3F, or a `<canvas>`
  bent-page renderer, for a closer-to-physical curl.

### B4. Performance Gating

- Target **60 FPS**; 120 FPS only a stretch goal on capable hardware — don't over-scope Tier 2.
- Detect capability at startup (device memory / `matchMedia` / a user "simplified visuals" toggle) and gate
  Tier 2 + WebGL scene + heavy blur/particles accordingly.
- `dynamic(() => import(...), { ssr:false })` for the 3D scene; `React.memo` + `will-change` on animated
  nodes; only animate the currently visible page; avoid re-rendering the whole journal per frame.

### B5. Decorative Polish

- Paper texture, subtle imperfections, soft shadows, slightly yellowed paper.
- Optional, randomly generated per page: coffee stains, pressed corners, stickers, passport stamps,
  washi tape, tiny sketches — subtle, never cartoonish. (`canvas-confetti` is already available for celebratory beats.)
- Sound: page flip, cover open/close, ambient — all togglable, honoring the tab's mute state.
- Subtle haptics via `navigator.vibrate()` where supported (mobile web).

### B6. Testing (Track B scope)

- **Playwright visual snapshots** (`toHaveScreenshot`) for key states: shelf idle, cover open, mid page-turn
  — the web replacement for Flutter golden tests. Put them in `e2e/`.
- Manual perf profiling (Chrome DevTools / Lighthouse) on a mid/low-end target before shipping Tier 2 broadly.
- Verify the **reduced-motion** path end-to-end (no zoom/parallax; direct navigation still works).

---

## Accessibility (hard requirement, not "future")

Every camera/zoom/parallax/rotation must respect reduced motion: use framer-motion `useReducedMotion()`
(and `matchMedia('(prefers-reduced-motion: reduce)')`). When enabled, replace motion with cross-fades/slides —
same end state, no vestibular triggers. Applies to A5 fades, B1 zoom, B2 cover-open, B3 page-turn.

---

## Deliverables Order (dependency-correct)

1. JSDoc typedefs + Postgres tables (`journal`, `journal_page`) in `lib/journal-db.js`
2. Data-access functions + static seed in `data/<trip>/journal.js`
3. API route handlers `app/api/journal/...` (+ Jest route tests)
4. `JournalContext` + client draft store (IndexedDB) with autosave/recovery
5. Reading mode (static pager, MVP visuals)
6. Writing panel (bottom drawer) + save flow
7. Timeline navigation + empty state
8. **MVP testing pass -> validate before continuing**
9. Library scene (2.5D framer-motion; R3F optional)
10. Book selection + desk transition (`layoutId` shared layout)
11. Journal cover-open animation
12. Page-turning (Tier 1, framer-motion)
13. Performance gating + capability detection + reduced-motion wiring
14. Decorative polish (textures, stickers, sound, haptics)
15. Tier 2 page-curl (optional, WebGL/canvas)
16. Playwright visual + perf pass

---

## Success Criteria

**MVP:** a user can keep a real, reliable daily travel journal per trip — write, edit, browse, never lose a
draft (offline recovery works) — with pleasant but simple visuals.

**Full experience:** every interaction reinforces the illusion of a physical journal — browsing a shelf,
opening a cover, turning realistic pages, writing without breaking immersion — within a 60 FPS budget and
with reduced-motion respected on every device.

Prioritize reliability of the writing/reading core over cinematic completeness; the cinematic layer must
never cause a lost entry.

---

## Future Features (easier thanks to sync-shaped data access)

Photos on pages (leverage existing `gallery`), location pins (Leaflet already installed), weather, visited
places, expense summary (link to existing `budget` + recharts), tickets/reservations (existing `reservations`
API), maps, voice notes, drawings, stickers, PDF export, cloud sync/multi-device, search, bookmarks, favorites,
AI-generated trip summaries.