# 3D Globe Landing Page — Architectural Implementation Plan

## Context

The home page of the multi-trip travel planner (`src/app/page.js`) currently opens with a static photo hero. This plan replaces that hero with a **premium, interactive 3D Earth** — the new centerpiece of the app: draggable with inertia, slowly auto-rotating when idle, with a **real-time day/night cycle** (sun position computed from actual UTC time), atmosphere rim glow, starfield, and one pulsing marker per trip (Japan, Budapest). Clicking a marker opens a floating card (destination, year, dates, duration, hero image, short description) with an "Apri il viaggio" CTA. Aesthetic target: Apple / Stripe / Flighty — elegant, minimal, no gaming look.

**User decisions (locked):**
1. **Cross-trip navigation:** the app is single-trip-per-deployment (`NEXT_PUBLIC_TRIP_ID` at build time, separate Neon DBs). Each trip's registry entry gets a `url` field with its deployment URL. Active trip's CTA navigates internally (`<Link href="/itinerary">`); other trips' CTAs open their deployment URL.
2. **Old home content stays:** globe fills the first 100vh as hero; the existing stats / highlights / features sections remain below the fold unchanged. The Countdown moves into the globe hero's DOM overlay.
3. **Earth textures bundled in repo** under `public/textures/` (NASA public-domain, ~2.5–3.5 MB total).

**Verified constraints (from repo):**
- Next.js 16.1.1, React 19.2.3, all runtime code plain `.js` with JSX, alias `@/*` → `./src/*`.
- Tailwind 3.4 + CSS-var design tokens in `src/app/globals.css`; `ThemeRegistry` overrides `--primary` per trip at runtime (Japan `#A40024`, Budapest `#008751`). Light theme only. Fonts: Inter (`--font-base`), Playfair Display (`--font-display`). Copy is Italian.
- framer-motion ^12 used app-wide; no three.js/R3F installed — new deps required.
- Trip registry is the **private** `const trips` in `src/data/index.js:28-57`; only `currentTrip` is exported. No trip-level lat/lng exists anywhere (only per-day itinerary coordinates).
- Client-only pattern to copy: `src/components/RouteMapWrapper.js` (`next/dynamic`, `ssr:false`, loading placeholder).
- `jest.config.js` has 70% global coverage threshold enforced by pre-push hook; pages/complex UI already excluded via `collectCoverageFrom` negations (`!src/components/RouteMap*.js` etc.).
- `tsconfig.json` `checkJs` include list covers `src/data/**/*.js` (registry changes WILL be type-checked; use JSDoc) and `src/lib/db.js` only — **new `src/lib/*.js` files must be added to `include`**.
- Navbar is already transparent-over-hero (white text) until `scrollY > 20` — perfect over a dark scene, zero changes needed.

---

## 1. Library Decision: React Three Fiber v9 + selective drei — hand-rolled globe

| Criterion | Three.js vanilla | **R3F + drei (CHOSEN)** | Globe.gl / react-globe.gl | three-globe | CesiumJS |
|---|---|---|---|---|---|
| React 19 / Next 16 compat | manual lifecycle, refs, disposal; fragile under StrictMode double-effects | **fiber v9 is built for React 19** (v8 does not support it) | React wrapper lags React 19 | imperative, manual glue | own widget DOM, poor fit |
| SSR | manual guards | `dynamic(ssr:false)` — identical to existing `RouteMapWrapper` pattern | touches `window` at import | same | same + static workers |
| Bundle (gz) | three ~155 KB | three ~155 KB + fiber ~50 KB + tree-shaken drei ~15–30 KB | +90 KB (d3, kapsule, unused accessor machinery) | +60 KB | ~600 KB — disqualifying |
| **Custom shader access** (day/night blend is a hard requirement) | full | **full** — raw `THREE.ShaderMaterial` as JSX | fighting the abstraction; terminator is a plugin hack | same | locked behind Cesium materials |
| Accessibility | DIY | DOM coexists naturally outside `<Canvas>` | canvas-internal markers, hard to expose | same | poor |
| Mobile perf control | full | full (`dpr`, `frameloop`, `gl` flags) | limited (always-on per-frame raycasting) | limited | heavy |

**Decision:** `@react-three/fiber` v9 + hand-rolled sphere/shaders/markers. Globe.gl / three-globe add weight for features we don't use (arcs, hexbins) and get in the way of the one hard requirement (custom day/night ShaderMaterial). Cesium is a GIS engine, wrong tool. **No `@react-three/postprocessing` / real bloom** — a full-res render pass kills mobile 60fps; we fake bloom with additive fresnel atmosphere + additive marker glow, which reads identically at this art style.

**Exact packages (Phase 2):**
```
three@^0.182.0
@react-three/fiber@^9.3.0    ← MUST be v9.x (v8 peer-deps React 18)
@react-three/drei@^10.7.0    ← MUST be v10.x (v9 targets fiber v8)
```
Drei imports used (tree-shaken): `OrbitControls`, `Stars`, `Billboard`, `useTexture` — nothing else. Do NOT install `@types/three` (globe components are not in the `checkJs` scope).

---

## 2. Assets — `public/textures/` (committed to git)

Sources: NASA Visible Earth "Blue Marble Next Generation" (August composite) + NASA "Black Marble 2016". Public domain; add a credit line to `README.md`.

| File | Content | Resolution | Format | Target size |
|---|---|---|---|---|
| `public/textures/earth-day.jpg` | day albedo | **4096×2048** | JPEG q78–82 progressive | ~1.3–1.8 MB |
| `public/textures/earth-night.jpg` | city lights | **2048×1024** | JPEG q80 | ~300–500 KB |
| `public/textures/earth-clouds.webp` | cloud alpha (optional, Phase 7) | 2048×1024 | WebP | ~400 KB |

- 4096 for day (2048 blurs on desktop at ~70vh globe); 2048 suffices for night point-lights. **Never 8192** (decoded RGBA = 134 MB VRAM → crashes older iPhones).
- **No KTX2/Basis** — the transcoder WASM + worker setup isn't justified for 3 textures. Plain `TextureLoader` via drei `useTexture`.
- Loader settings: `colorSpace = SRGBColorSpace` on both maps, `anisotropy = 4`, default mipmaps.

---

## 3. Data Architecture

### 3.1 Extend the trips registry — `src/data/index.js` (type-checked; use JSDoc)

Add fields to each entry of the existing `trips` object (`src/data/index.js:28-57`). **No existing export changes** — `currentTrip` and all domain exports untouched; zero regression surface.

New per-trip fields (JSDoc `@typedef TripMeta` at top of file):

| Field | Japan value | Budapest value |
|---|---|---|
| `endDate` | `"2026-10-17"` | `"2026-02-10"` |
| `url` | deployment URL (placeholder `"https://…"` — implementer confirms real Vercel URLs with user) | same |
| `shortDescription` | 1–2 Italian sentences for the card | same |
| `marker` | `{ lat: 35.35, lng: 137.2 }` (Tokyo–Osaka midpoint) | `{ lat: 47.4979, lng: 19.0402 }` |
| `markerLabel` | `"Giappone"` | `"Budapest"` |

New exports (bottom of file):
```js
export const activeTripId = TRIP_ID;
export const allTrips = Object.entries(trips).map(([id, t]) => ({ id, ...t }));
export function tripDurationDays(trip) { /* inclusive diff of startDate/endDate */ }
```

**Derive, don't store** (avoids duplication): `year` from `startDate`; `durationDays` via `tripDurationDays` (Japan = 16, Budapest = 3); card image = existing `heroImage`; card accent = existing `theme.primary` (per-trip literal, NOT the `--primary` CSS var — the inactive trip must keep its own color in the scene); dates line = existing `dates`.

**Adding a future trip = one registry entry** with the five new fields — the globe picks it up automatically from `allTrips`.

### 3.2 Solar math — `src/lib/solar.js` (pure, zero three.js imports, unit-tested)

- `getSubsolarPoint(date)` → `{ lat, lng }` degrees. Declination + equation of time via the **NOAA low-accuracy Fourier series** (fractional year `γ = 2π/365 · (dayOfYear − 1 + (hUTC − 12)/24)`, standard 7-term series; ±0.1° accuracy). Subsolar longitude: `lng = −15 · (hoursUTC + min/60 + sec/3600 + eqTimeMin/60 − 12)`, normalized to [−180, 180].
- `subsolarToDirection(lat, lng)` → plain `[x, y, z]` unit array (no THREE dependency → node-testable).
- `getSunDirection(date)` — composition; the only function the scene calls.
- **Update cadence:** compute on mount, then `setInterval` every **60 s** (sun moves 0.25°/min — sub-pixel at this globe size). Write directly into `material.uniforms.uSunDirection.value` — no React state, no re-render.

### 3.3 Geo helper — `src/lib/geo.js` (pure, unit-tested)

`latLngToVector3(lat, lng, radius = 1)` → plain `[x, y, z]`, plus a single shared **`LON_OFFSET`** constant. Markers AND `subsolarToDirection` both use this constant, so marker positions and the terminator can never disagree (the classic equirect off-by-90° bug becomes a one-constant calibration).

**Add `src/lib/solar.js` and `src/lib/geo.js` to the `include` list in `tsconfig.json`** (currently only `src/lib/db.js` is listed) so `npm run typecheck` covers them; write them with JSDoc.

---

## 4. Rendering Architecture

Scene: globe radius `1`; `PerspectiveCamera fov 42, position [0, 0, 3.1]`. ~6 meshes + 1 stars Points ≈ 12 draw calls. `gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}`. No postprocessing, no shadows.

### 4.1 Earth — custom `THREE.ShaderMaterial` (`src/components/globe/shaders/earthShader.js`)

Uniforms (exact names): `uDayMap` (sampler2D), `uNightMap` (sampler2D), `uSunDirection` (vec3, unit, updated every 60 s), `uAtmosphereColor` (vec3 = `(0.35, 0.55, 1.0)`), `uNightIntensity` (float = `1.6`).

Fragment spec (the day/night blend):
1. `cosSun = dot(normalize(vNormal), uSunDirection)`
2. **Terminator:** `dayMix = smoothstep(-0.12, 0.12, cosSun)` — soft ~14° twilight belt (≈ real civil+nautical twilight; premium, not knife-edge).
3. Night = `texture2D(uNightMap, vUv).rgb * uNightIntensity`, additionally gated by `(1.0 − smoothstep(-0.18, 0.0, cosSun))` so city lights fade out at dawn, not at noon.
4. `color = mix(night, day, dayMix)`
5. **Sunset tint:** `twilight = 1.0 − abs(clamp(cosSun / 0.12, −1.0, 1.0))` → `color += vec3(0.9, 0.35, 0.15) * twilight * 0.25` — warm ring exactly on the terminator.
6. **In-material limb fresnel:** `pow(1.0 − max(dot(viewDir, normal), 0.0), 3.0)` × `uAtmosphereColor` × `0.35`, scaled by `(0.15 + 0.85·dayMix)` (glow mostly on lit side).

Result: fully smooth real-time day/night; terminator sweeps ~15°/hour; Italy correctly lit/dark by local time. No fake switching.

### 4.2 Atmosphere halo — `Atmosphere.js`

Second sphere, `scale 1.035`, `side: BackSide`, `AdditiveBlending`, `depthWrite: false`, `transparent`. Fragment: pure fresnel `pow(1 − dot(viewDir, normal), 4.5)` × atmosphere color × 0.9. This *is* the "bloom" — one draw call.

### 4.3 Starfield + background

- drei `<Stars radius={80} depth={40} count={1500} factor={3} saturation={0} fade speed={reducedMotion ? 0 : 0.4} />` — one Points draw call.
- Page background is **CSS, not GL**: `radial-gradient(ellipse at 50% 35%, #0b1226 0%, #060913 55%, #03050c 100%)` on the hero `<section>`; Canvas `alpha: true`. The same CSS backs the WebGL-fallback path, so the premium dark look survives everywhere.

### 4.4 Clouds (optional — Phase 7, desktop only)

Sphere `scale 1.006`, small ShaderMaterial sampling `uCloudsMap`, lit by the same `uSunDirection`, `transparent`, `depthWrite:false`, self-rotation ~1 rev / 5 min. Mounted only when `(pointer: fine)` and not reduced-motion. One `{showClouds && <Clouds/>}` kill switch.

### 4.5 Markers — 3D billboarded meshes (NOT drei `<Html>`)

Rationale: `<Html occlude>` raycasts per frame and syncs DOM to the render loop; its occlusion pops. Meshes get depth-buffer occlusion free and pulse in-shader.

Per trip from `allTrips`, positioned at `latLngToVector3(lat, lng, 1.012)`, inside a drei `<Billboard>`:
1. **Core dot** — `circleGeometry(0.016, 24)`, `MeshBasicMaterial`, color = `trip.theme.primary`, `toneMapped: false`.
2. **Pulse ring** — 0.09 plane, tiny ShaderMaterial: ring SDF on `uTime`, 2.4 s loop, expands 0.2→1.0, alpha 0.7→0 shaped `pow(1−t, 2)`; additive, `depthWrite:false`; frozen via `uPaused` under reduced motion.
3. **Glow sprite** — 0.12 plane, procedural radial alpha in-shader (no texture), additive; opacity 0.35 idle → 0.7 hover.
4. **Hit target** — invisible mesh `sphereGeometry(0.06)` (`colorWrite:false`, `depthWrite:false`) = generous 3× touch halo carrying `onPointerOver/Out/Click`.
5. **No in-scene text labels** (drei `<Text>` pulls troika +60 KB) — naming lives in the DOM `TripPills` and the card.

**Far-side fade:** per frame, `visibleFactor = smoothstep(0.0, 0.25, dot(markerNormal, cameraDir))` drives group scale (×`0.6 + 0.4f`) and opacities — markers melt away behind the limb instead of popping (depth test clips them exactly at the horizon too).

**Hover:** cursor `pointer`; dot scale 1→1.3 and glow 0.35→0.7 lerped with `MathUtils.damp` λ=8 (~180 ms feel). Click → `onSelectTrip(trip.id)` callback up to `GlobeHero`.

### 4.6 Controls & rotation — drei `<OrbitControls>` (not custom inertia; its damping IS the inertia, battle-tested for touch)

| Prop | Value | Why |
|---|---|---|
| `enablePan` | `false` | globe stays centered |
| `enableZoom` | `false` | **decision: no zoom** — two markers, one art-directed scale; pinch fights page scroll on mobile |
| `enableDamping` / `dampingFactor` | `true` / `0.06` | ~0.5 s glide-out after release |
| `rotateSpeed` | `0.45` | heavy, physical feel |
| `minPolarAngle` / `maxPolarAngle` | `π·0.22` / `π·0.78` | can't flip over the poles |
| `autoRotateSpeed` | target `0.4` (~1 rev / 2.5 min) | barely-perceptible idle drift |

**Idle auto-rotate state machine** — hook `useIdleAutoRotate(controlsRef)`:
- controls `'start'` event → `speedTarget = 0`, clear timer; `'end'` → 4000 ms timeout → `speedTarget = 0.4`.
- Per frame: `controls.autoRotateSpeed = damp(current, speedTarget, 1.2, delta)` — rotation *fades* back in over ~1.5 s, never snaps. `autoRotate` stays `true`; speed 0 = paused.
- Card open → `speedTarget = 0`. Reduced motion → forced 0 forever.

**Recenter on select (A13, Phase 5):** tween controls azimuth/polar toward the marker over 800 ms `easeInOutCubic`, via `controls.setAzimuthalAngle/setPolarAngle` per frame in `useFrame` (never animate camera position directly). Skipped under reduced motion.

### 4.7 Frame loop & throttling

- `<Canvas frameloop="always" dpr={isTouch ? [1, 1.5] : [1, 1.75]}>` — "always", not "demand": auto-rotate + pulse + damping mean motion every frame anyway; demand plumbing adds bug surface for zero savings.
- **Pause when invisible:** `IntersectionObserver` on the hero (<5% visible → `setFrameloop('never')`, restore on re-entry) + `document.visibilitychange`. Big battery win — the globe is only the first 100vh.
- Geometry: earth `sphereGeometry(1, 64, 64)`, atmosphere/clouds `(1, 48, 48)`.
- GC hygiene: module-level scratch `Vector3`s reused in `useFrame`; zero per-frame allocations. Card-dismiss via Canvas-level `onPointerMissed` (no backdrop mesh).

---

## 5. Component Hierarchy & Folder Structure

```
src/components/globe/
├── GlobeHeroWrapper.js      "use client". next/dynamic(() => import('./GlobeHero'), { ssr:false,
│                            loading: <HeroShell/> }) — mirrors RouteMapWrapper.js exactly.
│                            Owns useWebGLSupport() gate: no WebGL → renders StaticGlobeFallback
│                            WITHOUT even downloading the three.js chunk.
├── GlobeHero.js             The 100vh <section>. Owns ALL state (selectedTripId, reducedMotion,
│                            glError). Renders: CSS gradient bg, <GlobeScene/>, DOM overlay
│                            (label pill, Playfair title, dates, Countdown, scroll cue),
│                            <TripPills/>, <TripCard/> in AnimatePresence, sr-only <h2>,
│                            error boundary around GlobeScene → StaticGlobeFallback.
├── HeroShell.js             Loading state: same CSS gradient + centered copy + CSS-keyframe
│                            pulsing circle placeholder (1.2 s loop). No layout shift, no spinner.
├── GlobeScene.js            <Canvas> + camera + <Stars> + <OrbitControls> + useIdleAutoRotate +
│                            IntersectionObserver/visibilitychange frameloop management +
│                            Suspense(null) around <Earth>.
├── Earth.js                 Sphere + earthShader material; useTexture(day, night); 60 s sun
│                            uniform interval; webglcontextlost → error path.
├── Atmosphere.js            Backside fresnel halo mesh (§4.2).
├── Clouds.js                Optional cloud shell (Phase 7, desktop only).
├── TripMarkers.js           Maps allTrips → <TripMarker/>; passes onSelect, selectedTripId.
├── TripMarker.js            Billboard group: dot + pulse + glow + hit mesh; hover/far-side
│                            useFrame logic (§4.5).
├── TripPills.js             DOM. One <button> pill per trip (emoji + markerLabel), bottom-center.
│                            THE keyboard/screen-reader path AND mobile discoverability path.
│                            Same onSelectTrip as marker click. aria-pressed when selected.
├── TripCard.js              DOM + framer-motion. Fixed right panel (≥768px) / bottom sheet
│                            (<768px). Renders heroImage, markerLabel + derived year kicker,
│                            Playfair title, dates, "{durationDays} giorni", shortDescription,
│                            CTA. Focus management + Esc (§7).
├── StaticGlobeFallback.js   Same CSS gradient; title + Countdown + TripPills + simple non-3D
│                            trip cards grid. Used for: no WebGL, GL/texture failure,
│                            reduced-motion + Save-Data.
├── useIdleAutoRotate.js     Hook (§4.6).
└── shaders/
    ├── earthShader.js       vertex/fragment template strings + uniform factory
    ├── atmosphereShader.js
    └── markerShader.js      pulse ring + glow (shared)

src/lib/solar.js             pure solar math (tested, checkJs'd)
src/lib/geo.js               latLngToVector3 + LON_OFFSET (tested, checkJs'd)
src/lib/__tests__/solar.test.js, geo.test.js
src/data/__tests__/trips.test.js
public/textures/earth-day.jpg, earth-night.jpg, earth-clouds.webp
```

**`src/app/page.js` changes:** replace the hero `<section>` (lines 22–72) with `<GlobeHeroWrapper />`; keep stats/highlights/features sections untouched (stats keeps its `-mt-20` overlap onto the hero's bottom fade). Countdown moves into `GlobeHero`'s overlay. Reduced-motion: use framer-motion's `useReducedMotion()` (already a dependency — no new hook file).

---

## 6. State Management — all local to `GlobeHero`, no new context

| State | Where | Notes |
|---|---|---|
| `selectedTripId` (`null` = closed) | `useState` in GlobeHero | drives card + pill highlight |
| Hover / autorotate speed / tween progress | `useRef` + `useFrame` inside Canvas | **never React state** — 60fps values must not re-render |
| `reducedMotion` | framer-motion `useReducedMotion()` in GlobeHero, passed as prop into the Canvas tree | |
| WebGL support | `useWebGLSupport()` in wrapper (probe `webgl2 || webgl` once in an effect) | gates chunk download |
| GL/texture error | error-boundary state in GlobeHero → StaticGlobeFallback | rare path |
| Sun direction | uniform ref + 60 s interval | no state |

Props/callbacks flow normally across the Canvas reconciler boundary — no store needed.

---

## 7. Trip Card UX (DOM, fixed position — Flighty-style, NOT marker-tracking)

- **Desktop/tablet ≥ 768px:** fixed panel, `right: clamp(24px, 6vw, 96px)`, vertically centered, 360px (320px on tablet), `rounded-2xl`, dark glass (`bg-white/[0.07] backdrop-blur-xl border-white/[0.12]`), white text. Top→bottom: heroImage 16:9 rounded, kicker `markerLabel + year` in `trip.theme.primaryLight`, Playfair title, dates, `{durationDays} giorni • {emoji}`, shortDescription (`text-white/70`), full-width CTA — active trip: `<Link href="/itinerary">Apri il viaggio</Link>` (`bg-white text-black`); other trip: `<a href={trip.url}>` same tab, with lucide `ExternalLink` icon. Close: X + Esc + `onPointerMissed` on scene.
- **Mobile < 768px:** bottom sheet, full-width, `rounded-t-3xl`, max-height 70vh, drag handle; framer-motion `drag="y"`, dismiss on `offset.y > 120 || velocity.y > 500`. Canvas container shifts up `translateY(-6vh)` (400 ms easeOut) so the sheet doesn't bury the globe.
- **Focus:** on open, focus the card container (`tabIndex={-1}`, `role="dialog"`, `aria-modal="false"` — non-blocking, scene stays usable, `aria-labelledby` title). On close, return focus to the originating pill (markers are pointer-only; keyboard users always arrive via pills).

---

## 8. Animation Inventory (complete)

| # | Name | What | Duration | Easing | Library |
|---|---|---|---|---|---|
| A1 | Hero copy entrance | kicker/title/countdown/pills fade-up `y:24→0`, staggered | 0.8 s, stagger 0.12 s | `easeOut` (matches existing hero) | framer-motion |
| A2 | Globe entrance | canvas container `opacity 0→1, scale 0.94→1` after first frame (`onCreated`) | 1.1 s | cubic-bezier `(0.22, 1, 0.36, 1)` | framer-motion |
| A3 | Idle auto-rotate | ~1 rev / 2.5 min | continuous | linear | OrbitControls |
| A4 | Drag inertia | damped glide after release | ~0.5 s decay | exponential, `dampingFactor 0.06` | OrbitControls |
| A5 | Auto-rotate resume | speed 0→0.4 after 4 s idle | ~1.5 s | exponential `damp(λ=1.2)` | useFrame |
| A6 | Marker pulse | ring 0.2→1 scale, alpha 0.7→0, loop | 2.4 s loop | `pow(1−t,2)` in-shader | GLSL `uTime` |
| A7 | Marker hover | dot 1→1.3, glow 0.35→0.7 | ~180 ms | `MathUtils.damp` λ=8 | useFrame |
| A8 | Far-side marker fade | opacity/scale vs limb angle | continuous | `smoothstep(0, 0.25, ·)` | useFrame |
| A9 | Card open (desktop) | `opacity 0→1, y 24→0, scale 0.96→1` | ~0.4 s | spring `stiffness 300, damping 30` | framer-motion |
| A10 | Card close | `opacity→0, y→12, scale→0.97` | 0.18 s | `easeIn` | framer-motion |
| A11 | Sheet open (mobile) | `y 100%→0` | ~0.45 s | spring `stiffness 320, damping 34` | framer-motion |
| A12 | Sheet dismiss | drag-release to `y:100%` | velocity-based | spring | framer-motion drag |
| A13 | Recenter on select | azimuth/polar tween to marker | 0.8 s | easeInOutCubic | useFrame tween |
| A14 | Star drift/twinkle | drei Stars `speed 0.4` | continuous | internal | drei |
| A15 | Terminator sweep | sun uniform step | 60 s cadence | n/a | interval |
| A16 | Pill hover/active | `bg-white/10→/20`, active ring in trip color | 200 ms | CSS transition | Tailwind |
| A17 | Scroll cue | chevron `y: 0→6→0` loop | 1.8 s loop | easeInOut | framer-motion |
| A18 | Cloud drift (opt.) | shell rotation ~1 rev / 5 min | continuous | linear | useFrame |
| A19 | Loading shell pulse | placeholder opacity 0.4↔0.7 | 1.2 s loop | easeInOut | CSS keyframes |

**Reduced motion:** A3, A5, A6, A13, A14 (speed 0), A17, A18 disabled; A1/A2/A9/A11 become plain 0.15 s opacity fades; A4 (user-initiated drag) still works. Single source: `useReducedMotion()` prop.

---

## 9. Page Integration

- **Navbar:** no changes (already transparent + white over hero, solid after `scrollY > 20`).
- **Hero → content transition:** absolute bottom strip `h-40 bg-gradient-to-b from-transparent to-[var(--background)]` dissolving the dark scene into the light stats section.
- **ThemeRegistry:** untouched. Markers use per-trip `theme.primary` literals (both identities in one scene); only the active-trip CTA may use `var(--primary)` accents.
- **SEO:** h1 title, dates, descriptions all live in the DOM overlay → crawlable despite `ssr:false` canvas.

## 10. Responsive Behavior

| Breakpoint | Globe | Card |
|---|---|---|
| Desktop ≥ 1024 | camera z 3.1, globe ≈ 70vh | right fixed panel 360px |
| Tablet 768–1023 | camera z 3.4 | right panel 320px |
| Mobile < 768 | camera z 3.7, center shifted up ~6vh, `dpr ≤ 1.5`, clouds off | bottom sheet |
| Short viewports (h ≤ 640) | hide scroll cue, compact countdown | |

Camera distance derives from `useThree` `size.width` (no remount). Touch: `touch-action: pan-y` on the canvas container so vertical swipes scroll the page and horizontal drags rotate (`controls.touches.ONE = TOUCH.ROTATE`); validate on device — if it fights, fall back to full capture (hero is escapable via scroll cue).

## 11. Accessibility

1. Canvas container `aria-hidden="true"` — the globe is decorative enhancement.
2. **TripPills are the 1:1 equivalent affordance**: real `<button>`s, visible to everyone. SR flow: sr-only `<h2>` "I nostri viaggi" → pills → dialog with full text.
3. Keyboard: Tab → pill → Enter opens card → focus into card → Esc/close returns focus. Markers pointer-only by design (documented; pills are equivalents).
4. Reduced motion per §8; additionally serve `StaticGlobeFallback` when reduced-motion AND `navigator.connection.saveData` (skips 3+ MB of textures).
5. Contrast: white on `#060913` = AAA; `text-white/70` body = AA; pills ≥ 4.5:1.

## 12. Performance Budget

- Targets: 60 fps desktop, ≥ 50 fps mid-mobile (iPhone 12 / Pixel 6 class); DOM hero shell < 1 s; globe visible < 2.5 s on fast 4G.
- **Code splitting:** the whole three/fiber/drei graph (~220 KB gz) lives only in the dynamic `GlobeHero` chunk. Import three ONLY under `src/components/globe/**` — never from `src/lib/solar.js`/`geo.js`. Verify in `next build` that `/` first-load JS stays within ~5 KB of current.
- Textures ~2.5–3.5 MB, loaded in Suspense behind the A2 entrance.
- dpr caps + offscreen/hidden-tab frameloop pause (§4.7). No postprocessing (the single biggest mobile protector). ~12 draw calls.
- **Mobile kill switches, in order:** clouds off (default on touch) → dpr 1.25 → stars 600 → sphere segments 48.

## 13. Risks & Fallbacks

| Risk | Likelihood | Mitigation / fallback |
|---|---|---|
| fiber/drei version mismatch with React 19 (accidentally installing fiber v8 / drei v9) | Med | Pinned majors (§1); Phase 2 validation runs `npm ls react three @react-three/fiber` |
| **Marker/sun longitude misalignment** (classic equirect off-by-90°) | **High on first try** | Single `LON_OFFSET` in `geo.js` shared by markers AND sun; unit test locks Tokyo's vector; Phase 3 checklist: compare terminator vs timeanddate.com day/night map |
| WebGL unavailable (old GPU, webviews, policy) | Low | `useWebGLSupport()` in wrapper → `StaticGlobeFallback` before the chunk even downloads |
| Texture 404 / decode fail / GL context lost | Low | `useTexture` throws in Suspense → error boundary → fallback; `webglcontextlost` → same path |
| Mobile perf below target | Med | Kill-switch ladder (§12), each a single prop/constant |
| three leaking into main bundle | Med | Phase 2 checklist: inspect `next build` first-load JS for `/` |
| Hydration mismatch | Low | `ssr:false` wrapper (proven repo pattern); all `Date`/`matchMedia` reads in effects |
| Jest 70% pre-push gate drops from untested UI files | Med | Add `'!src/components/globe/**'` to `collectCoverageFrom` in `jest.config.js` (precedent: `!src/components/RouteMap*.js`); `solar.js`/`geo.js` ARE tested and lift the ratio |
| Touch drag vs page scroll fight | Med | `touch-action: pan-y` strategy (§10); real-device validation in Phase 6 |

---

## 14. Implementation Roadmap (each phase shippable, decision-free)

### Phase 1 — Data & math foundations (no new deps, no UI) — LOW complexity
- **Files:** `src/data/index.js` (registry fields + `activeTripId`/`allTrips`/`tripDurationDays` + JSDoc typedef), `src/lib/solar.js`, `src/lib/geo.js`, `tsconfig.json` (add the two lib files to `include`), tests: `src/lib/__tests__/solar.test.js`, `src/lib/__tests__/geo.test.js`, `src/data/__tests__/trips.test.js`.
- Deployment `url` values: literal placeholders, confirm real Vercel URLs with the user.
- **Validation:** `npm test` + `npm run typecheck` green. Solar tests: |declination| < 1° at equinoxes; ≈ +23.4° ±0.3 at June solstice; subsolar lng at 12:00 UTC within ±4° of 0. Geo tests: unit length; Tokyo/Budapest/poles snapshots. Trips tests: every `allTrips` entry has valid `marker` ranges, `url` matches `^https://`, `endDate ≥ startDate`, durations = 16 / 3.

### Phase 2 — Dependencies + scene skeleton — MEDIUM
- Install `three@^0.182.0 @react-three/fiber@^9.3.0 @react-three/drei@^10.7.0`; add textures to `public/textures/` (§2 sourcing).
- **Files:** `GlobeHeroWrapper.js`, `HeroShell.js`, `GlobeHero.js` (gradient bg + overlay copy + Countdown + placeholder pills), `GlobeScene.js` (Canvas/Stars/OrbitControls/idle-rotate/visibility pausing), `Earth.js` **with plain `meshStandardMaterial map={dayTexture}` + one directionalLight** (shader is next phase); edit `src/app/page.js` (hero swap); edit `jest.config.js` (coverage exclusion).
- **Validation:** `/` shows draggable globe with inertia; auto-rotate pauses on grab, resumes after 4 s; navbar transparent over scene; below-fold sections intact; `next build` succeeds and three is NOT in shared first-load JS; hidden tab stops rAF; `npm test` green.

### Phase 3 — Day/night shader + atmosphere — HIGH (the hard phase)
- **Files:** `shaders/earthShader.js`, `shaders/atmosphereShader.js`, rewrite `Earth.js` to ShaderMaterial (§4.1 uniforms, 60 s interval), `Atmosphere.js`.
- **Validation:** terminator matches timeanddate.com world map for current UTC (±5°); Italy lit at 14:00 CEST, dark at 23:00; smooth twilight band with warm tint; night lights only on dark side; rim glow visible; no z-fighting; 60 fps desktop.

### Phase 4 — Markers + interaction — MEDIUM
- **Files:** `TripMarkers.js`, `TripMarker.js`, `shaders/markerShader.js`, `useIdleAutoRotate.js` (extract if inline from Phase 2).
- **Validation:** markers on correct cities (visual vs texture landmass); 2.4 s pulse; hover grows dot + glow + cursor; far-side fade; comfortable tap targets on phone; click sets `selectedTripId`.

### Phase 5 — Trip card + pills + cross-trip navigation — MEDIUM
- **Files:** `TripCard.js`, `TripPills.js`, wiring in `GlobeHero.js`; optional A13 recenter tween.
- **Validation:** marker AND pill clicks open card with correct data (image, derived year, "{n} giorni", dates, description); active trip CTA → internal `/itinerary`; other trip CTA → its `url`; Esc/X/outside-click close; focus in/out correct; auto-rotate paused while open; **run with `NEXT_PUBLIC_TRIP_ID=budapest` too — both markers render, CTAs swap roles**.

### Phase 6 — Responsive, a11y, reduced motion, fallbacks — MEDIUM
- **Files:** `StaticGlobeFallback.js`, `useWebGLSupport` in wrapper, error boundary in `GlobeHero.js`, mobile bottom-sheet variant of `TripCard.js`, camera/dpr breakpoints, `touch-action` tuning, sr-only/aria pass.
- **Validation:** DevTools reduced-motion emulation → no auto-rotate/pulse/drift; WebGL blocked → fallback fully usable with pills + cards; keyboard-only pass; real iPhone + Android drag/scroll/sheet check; Lighthouse a11y ≥ 95 on `/`.

### Phase 7 — Polish, optional clouds, E2E — LOW/MEDIUM
- **Files:** `Clouds.js` (desktop-only, kill switch), perf tuning per §12 ladder, `e2e/smoke.test.ts` additions, README texture credits.
- **Playwright additions:** `/` shows `canvas` or fallback within 10 s; pills visible; clicking pill "Budapest"/"Giappone" shows dialog containing "Apri il viaggio"; CTA href assertions (one internal, one external).
- **Validation:** `npm test` + `npm run test:e2e` green; pre-push passes; non-home routes' bundles unchanged; fps targets re-verified with clouds on/off.

---

## 15. Testing Strategy (fits existing conventions)

- **Jest:** `solar.js`, `geo.js`, trips-registry shape tests (details in Phase 1). Prefer the `/** @jest-environment node */` docblock for consistency with API-route tests (pure math runs in either env).
- **Never unit-test anything rendering `<Canvas>`** — jsdom has no WebGL. Mirror the RouteMap precedent: `jest.config.js` `collectCoverageFrom` gets `'!src/components/globe/**'`.
- **Playwright:** role/text-based smoke assertions (Phase 7), resilient to visual changes.
- **Manual checklist items** (cannot automate cheaply): terminator-vs-reality check (Phase 3), real-device touch check (Phase 6).

## Verification (end-to-end)

1. `npm run dev:japan` → `/` shows the globe hero: drag with inertia, idle auto-rotate resumes after 4 s, day/night matches real time (Italy side lit/dark correctly), both markers pulse, Japan card CTA → `/itinerary`, Budapest card CTA → external URL.
2. `npm run dev:budapest` → same page, theme green, CTA roles swapped.
3. `npm test`, `npm run typecheck`, `npm run lint`, `npm run build` (verify `/` first-load JS unchanged), `npm run test:e2e` — all green.
4. DevTools: reduced-motion emulation, WebGL-disabled fallback, mobile emulation (bottom sheet), Performance tab 60 fps + rAF stops when tab hidden.

## Critical files

- `src/data/index.js` — registry extension (the data backbone)
- `src/lib/solar.js`, `src/lib/geo.js` — tested math core (+ `tsconfig.json` include)
- `src/components/globe/**` — all new UI (wrapper pattern from `src/components/RouteMapWrapper.js`)
- `src/app/page.js` — hero swap point (below-fold sections preserved)
- `jest.config.js` — coverage exclusion protecting the 70% pre-push gate
