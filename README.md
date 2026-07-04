
# 🏯 Trip Planner — Giappone 🇯🇵 & Budapest 🇭🇺

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)

<br />

**Un compagno di viaggio digitale multi-trip.**  
Pianificazione itinerario, gestione budget e logistica in un'unica app moderna, condivisa tra più viaggi.

[🚀 Demo Live](https://jpn-indol.vercel.app) · [🐛 Segnala Bug](https://github.com/NiccoloBert0zzi/JPNSite/issues)

</div>

---

## 🗺️ Multi-Trip

La stessa app serve due viaggi distinti, selezionati tramite la variabile d'ambiente `NEXT_PUBLIC_TRIP_ID` (`japan` | `budapest`), letta a build/module-load time in `src/data/index.js`. Ogni trip ha i propri dati statici (itinerario, budget, trasporti, alloggi, cultura, cibo, frasi, gallery) sotto `src/data/<trip>/`, oltre a un tema colore e branding dedicati (rosso `#A40024` per il Giappone, verde `#008751` per Budapest).

```bash
npm run dev:japan      # imposta il trip attivo su Giappone e avvia il dev server
npm run dev:budapest   # imposta il trip attivo su Budapest e avvia il dev server
```

Lo script `scripts/use-trip.js` copia il relativo `.env.japan` / `.env.budapest` su `.env.local` prima di avviare Next.js.

---

## ✨ Features

### 💸 Budget Manager
Gestisci le spese in tempo reale con un'interfaccia intuitiva.
- **Dynamic Tracking**: Aggiungi, rimuovi e rinomina voci di spesa al volo.
- **Visual Analytics**: Grafici a torta (Recharts) per visualizzare la ripartizione dei costi.
- **Real-time Updates**: Calcolo automatico del budget rimanente e speso.

### 📍 Itinerary & Logistics
Pianifica ogni dettaglio del viaggio.
- **Interactive Maps**: Integrazione mappa dinamica per visualizzare le tappe (Leaflet).
- **Day-by-Day**: Cronologia dettagliata delle attività giornaliere.
- **Transport**: Gestione pass treni (Shinkansen, JR Pass) e trasporti locali.

### 🏨 Reservations
Tieni traccia di tutte le prenotazioni.
- **Status Tracking**: Monitora cosa è stato prenotato, pagato o ancora da fare.
- **Digital Wallet**: (Feature pianificata) Archiviazione rapida di biglietti e conferme.

---

## 🛠️ Tech Stack

Built with the modern T3-inspired stack:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Design System
- **Database**: [Vercel Postgres](https://vercel.com/postgres) (SQL)
- **Charts**: [Recharts](https://recharts.org/)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 🚀 Getting Started

Clona il repository e installa le dipendenze per avviare il progetto in locale.

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# 1. Clone repo
git clone https://github.com/NiccoloBert0zzi/JPNSite.git
cd JPNSite

# 2. Install dependencies
npm install

# 3. Setup Environment
# Crea un file .env.local e aggiungi le credenziali del database (Postgres)
cp .env.example .env.local

# 4. Run Development Server
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) per vedere l'app in azione.

---

## 📸 Screenshots

| Budget Overview | Itinerary Map |
|:---:|:---:|
| *Gestione spese dettagliata* | *Mappa interattiva del viaggio* |
| ![Budget](https://placehold.co/600x400/EEE/31343C?text=Budget+UI) | ![Map](https://placehold.co/600x400/EEE/31343C?text=Map+UI) |

---

<div align="center">

Made with ❤️ by Niccolo Bertozzi — Japan 2026 🇯🇵 & Budapest 2026 🇭🇺

</div>
