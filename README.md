# The Exuma Outpost

Rough draft of a luxury vacation rental website for a property on Forbes Hill, Great Exuma, Bahamas.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Quick start

```bash
npm install
npm run dev
# http://localhost:3000
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Playwright end-to-end tests |
| `npm run test:unit` | Vitest unit tests |

## Structure

| Path | Contents |
|---|---|
| `app/` | Routes, layout, and API handlers (`/api/availability`, `/api/inquire`) |
| `components/sections/` | Page sections — hero, about, amenities, galleries, inquiry form |
| `components/gallery/` | Hover gallery, lightbox, floating image treatments |
| `components/ui/` | Button, container, chat bubble, lightbox primitives |
| `lib/constants.ts` | Image manifest, copy, and contact details |
| `tests/` | Playwright specs and Vitest unit tests |

## A note on images

The 78 photos the site references are included in `public/photos/`, web-sized (max 1800px, heroes
2400px) with EXIF metadata stripped — about 34MB total, so the site renders immediately after
`npm install && npm run dev`. These are compressed for the web, not the originals; the full-resolution
library lives outside this repository. Image paths are declared in [`lib/constants.ts`](lib/constants.ts).

Several sections still point at Unsplash URLs as placeholders rather than property photos.

## Status

Rough draft. Ten sections are built out (hero through footer), along with a mock availability
endpoint and an inquiry submission route. [`BUG_REPORT.md`](BUG_REPORT.md) tracks known issues.
Contact details in `lib/constants.ts` are placeholders.
