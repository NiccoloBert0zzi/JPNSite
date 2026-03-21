# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (cross-platform)
npm run dev            # Dev server (uses current .env.local)
npm run dev:japan      # Set active trip to Japan and start dev server
npm run dev:budapest   # Set active trip to Budapest and start dev server

# Unit tests (Jest)
npm test               # Run all unit tests (non-interactive)
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report (threshold: 70%)

# E2E tests (Playwright — requires running dev server or uses webServer config)
npm run test:e2e       # Run all Playwright smoke tests
npm run test:e2e:ui    # Open Playwright UI mode

# Quality
npm run typecheck      # tsc --noEmit (checks src/app/actions.js, src/lib/db.js, src/data/**, src/app/api/**)
npm run lint           # ESLint
npm run build          # Production build
```

---

## Git Workflow

Solo project. Workflow: **feature branch → commit → fast-forward merge to main → push**.

```bash
# 1. Start from an up-to-date main
git checkout main && git pull

# 2. Create a branch with a conventional prefix
git checkout -b feat/short-description   # or fix/ chore/ refactor/ docs/ test/

# 3. Make changes, run tests
npm test

# 4. Commit with Conventional Commits
git add <files>
git commit -m "feat: add thing" \
  -m "Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

# 5. Push branch, merge, push main, delete branch
git push -u origin feat/short-description
git checkout main
git merge --ff-only feat/short-description
git push origin main
git branch -d feat/short-description
git push origin --delete feat/short-description
```

### Commit conventions
`feat:` `fix:` `refactor:` `test:` `chore:` `docs:`

### Git hooks (Husky)
- **pre-commit** → `lint-staged` (ESLint auto-fix on staged `.js/.ts` files)
- **pre-push** → `npm test` (all unit tests must pass)

Never use `--no-verify`. If a hook blocks, fix the root cause.

---

## Architecture

### Multi-Trip System

Trip selection is driven by `NEXT_PUBLIC_TRIP_ID` (`japan` | `budapest`), read **at module load time** in `src/data/index.js`, which re-exports all data from either `src/data/japan/` or `src/data/budapest/`. Trip config is done via `.env.japan` / `.env.budapest`; `scripts/use-trip.js` copies the right file to `.env.local`.

Tests that depend on this must use `jest.resetModules()` before re-requiring the module.

### Data Flow

```
Static files (src/data/<trip>/)   ← seed & fallback
        ↓
src/lib/db.js                     ← getTripData / saveTripData (Vercel Postgres)
        ↓                         ← auto-seeds from static on first read; falls back on error
src/app/actions.js                ← server actions; updateData() guards with checkAuth()
        ↓
src/app/api/reservations/         ← REST route for budget line items (POST/DELETE require auth)
        ↓
React pages / components
```

### Admin/Edit Mode

- `src/context/AdminContext.js` — React context; tracks `isAdmin` + `isEditMode`
- Auth: HMAC-SHA256 cookie (`jpn_admin_session`); token = `HMAC(ADMIN_PASSWORD, 'jpn_session_v1')`; password from `ADMIN_PASSWORD` env var (default: `admin123`)
- Editable components render edit UI only when `isEditMode === true`

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

### Unit tests (Jest)

Tests live in `__tests__/` directories co-located with source files.

**Test environments:**
- Most tests: `jest-environment-jsdom` (default)
- API route tests: `/** @jest-environment node */` docblock — Next.js `Request`/`Response` not available in jsdom

**Coverage:** pages and complex UI components are excluded (covered by E2E). Threshold: 70% on branches/functions/lines for the core logic files.

**Mocking conventions:**

| Dependency | Mock strategy |
|---|---|
| `@vercel/postgres` | `jest.mock('@vercel/postgres', () => ({ sql: jest.fn() }))` |
| `next/headers` | Mock `cookies()` to return `{ get, set, delete }` |
| Server actions | `jest.mock('@/app/actions', ...)` in context/component tests |
| Static data | `jest.mock('@/data/japan/budget', ...)` in db tests |

**`saveTripData` SQL call order** — calls `sql` twice: once in `createTable()` (catches its own errors) then once for the upsert. Mock accordingly:

```js
sql.mockResolvedValueOnce({}); // createTable
sql.mockRejectedValueOnce(new Error('fail')); // upsert → triggers catch
```

**API route tests** use `jest.resetModules()` in `beforeEach` to clear the `setupDone` flag. Re-require mocks after reset via a helper function, not a module-level `const`.

### E2E tests (Playwright)

Smoke tests live in `e2e/smoke.test.ts`. They cover: home loads, navigation, budget page, admin login modal, wrong password error. Playwright starts the dev server automatically via `webServer` in `playwright.config.ts`.

### TypeScript / checkJs

`tsconfig.json` has `checkJs: true` scoped to: `src/app/actions.js`, `src/app/api/**`, `src/lib/db.js`, `src/data/**`, `scripts/**`. Test files and component/page files are excluded. Run `npm run typecheck` to verify. Use JSDoc annotations (`@param`, `@type`) in checked files — not `// @ts-nocheck`.
