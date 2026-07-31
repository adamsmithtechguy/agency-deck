# Agency Deck

Standalone Bright.Blue presentation: **Connected Retail keynote** followed by the **Retail Media supplier deck**.

Self-contained — no Presentation Maker, no Bright.Blue Studio. Clone, install, run.

## Quick start

```bash
npm install
npm run dev
```

Open **http://localhost:5173**

## Controls

- **→ / Space** — next slide
- **←** — previous slide
- **`?slide=N`** — jump to slide N (1–28)
- **`?clean`** — hide on-screen nav (for screenshots / export)

## Build for static hosting

```bash
npm run build
npm run preview
```

Output goes to `dist/` — deploy that folder to any static host (Cloudflare Pages, Netlify, etc.).

## What's included

- All slide components (`slides-keynote.tsx`, `slides-supplier.tsx`)
- Shared Bright.Blue theme + slide UI (`src/`)
- All images, videos, and brand assets (`public/`)
- Leaflet maps (requires internet for map tiles)

## Deployed preview

Live at [connected-retail-keynote.pages.dev](https://connected-retail-keynote.pages.dev)

## Structure

```
├── main.tsx              # Slide player
├── slides-keynote.tsx    # Connected Retail keynote (13 slides)
├── slides-supplier.tsx   # Retail Media supplier deck (15 slides)
├── src/                  # Theme + shared slide components
└── public/               # Assets (images, videos, brand)
```
