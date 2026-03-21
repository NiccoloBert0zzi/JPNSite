# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev            # Dev server (uses current .env.local)
npm run dev:japan      # Dev with Japan trip  (Windows: copies .env.japan → .env.local)
npm run dev:budapest   # Dev with Budapest trip

# Testing
npm test               # Run all tests (non-interactive)
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report

# Quality
npm run lint           # ESLint
npm run build          # Production build (type-checks via next build)
```

> **Note (Windows):** `dev:japan` / `dev:budapest` use the Windows `copy` command. On Unix run `cp .env.japan .env.local && next dev` manually.

---

## Git Workflow

This is a solo project. The workflow is: **feature branch → commit → fast-forward merge to main → push**.

### Every change follows these steps

```bash
# 1. Start from an up-to-date main
git checkout main && git pull

# 2. Create a branch with a conventional prefix
git checkout -b feat/short-description   # or fix/ chore/ refactor/ docs/

# 3. Make changes, then run tests before committing
npm test

# 4. Commit with Conventional Commits format
git add <files>
git commit -m "feat: add thing" \
  -m "Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

# 5. Push the branch
git push -u origin feat/short-description

# 6. Fast-forward merge to main (no merge commit)
git checkout main
git merge --ff-only feat/short-description
git push origin main

# 7. Clean up
git branch -d feat/short-description
git push origin --delete feat/short-description
```

### Commit message conventions

```
feat:     new feature
fix:      bug fix
refactor: code change that is not a feature or fix
test:     adding or fixing tests
chore:    build, deps, config
docs:     documentation only
```

### Git hooks (Husky)

- **pre-commit** → `lint-staged` (ESLint auto-fix on staged `.js/.ts` files)
- **pre-push** → `npm test` (all tests must pass before push)

If a hook blocks you, investigate the root cause — never use `--no-verify`.

---

## Architecture

### Multi-Trip System

Trip selection is driven by `NEXT_PUBLIC_TRIP_ID` (`japan` | `budapest`). This env var is read **at module load time** in `src/data/index.js`, which re-exports all data from either `src/data/japan/` or `src/data/budapest/`. Tests that depend on this must use `jest.resetModules()` before re-requiring the module.

### Data Flow

```
Static files (src/data/<trip>/)   ← seed & fallback
        ↓
src/lib/db.js                     ← getTripData / saveTripData (Vercel Postgres)
        ↓                         ← auto-seeds from static on first read; falls back on error
src/app/actions.js                ← server actions; updateData() guards with checkAuth()
        ↓
src/app/api/reservations/         ← REST route for budget line items
        ↓
React pages / components
```

### Admin/Edit Mode

- `src/context/AdminContext.js` — React context; tracks `isAdmin` + `isEditMode`
- Auth: cookie-based (`jpn_admin_session`); password from `ADMIN_PASSWORD` env var (default: `admin123`)
- Editable components (`EditableTransportList`, `EditableAccommodationList`, `EditableItineraryList`) only render edit UI when `isEditMode === true`

### Database Schema

```sql
-- Generic trip data (itinerary, accommodations, transport, budget)
trip_data (trip_id VARCHAR, data_key VARCHAR, data_value JSONB, last_updated TIMESTAMP)
  PRIMARY KEY (trip_id, data_key)

-- Budget/reservation line items
reservations (id SERIAL, item TEXT, status TEXT, cost NUMERIC, category TEXT, trip_id TEXT)
```

### Routing

| Path | Page |
|---|---|
| `/` | Home (hero, stats, highlights) |
| `/itinerary` | Day list |
| `/itinerary/[slug]` | Single day + Leaflet map |
| `/budget` | Budget tracker + Recharts pie chart |
| `/accommodations` | Hotels per city |
| `/transport` | Train passes, flights |
| `/reservations` | Trip prep checklist |

### Key Libraries

- **Next.js App Router** — Server Components + Server Actions (`'use server'`)
- **Tailwind CSS** — custom colors via CSS variables in `globals.css` (Japan Red `#A40024`)
- **Recharts** — budget pie chart (`BudgetChart.js`)
- **React Leaflet** — itinerary route maps; loaded client-side only (`RouteMapWrapper.js`)
- **Framer Motion** — scroll parallax and animations

### Path alias

`@/*` → `./src/*` (configured in `tsconfig.json`)

---

## Testing

Tests live co-located in `__tests__/` directories next to the source files.

### Test environments

- Most tests: `jest-environment-jsdom` (default)
- API route tests (`src/app/api/**/route.test.js`): use `/** @jest-environment node */` docblock — required because Next.js `Request`/`Response` are not available in jsdom

### Mocking conventions

| Dependency | Mock strategy |
|---|---|
| `@vercel/postgres` | `jest.mock('@vercel/postgres', () => ({ sql: jest.fn() }))` |
| `next/headers` | Mock `cookies()` to return `{ get, set, delete }` |
| Server actions | `jest.mock('@/app/actions', ...)` in context/component tests |
| Static data | `jest.mock('@/data/japan/budget', ...)` in db tests |

### `saveTripData` SQL call order

`saveTripData` calls `sql` **twice**: once inside `createTable()` (which catches its own errors) and once for the actual upsert. Mock accordingly:

```js
sql.mockResolvedValueOnce({}); // createTable
sql.mockRejectedValueOnce(new Error('fail')); // upsert → triggers catch in saveTripData
```

### Trip-switching tests

`src/data/index.js` reads `NEXT_PUBLIC_TRIP_ID` at module load. To test different trips:

```js
beforeEach(() => jest.resetModules());
process.env.NEXT_PUBLIC_TRIP_ID = 'budapest';
const { currentTrip } = await import('@/data/index');
```
