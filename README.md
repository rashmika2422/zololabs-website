# ZoloLabs website

Next.js 16 (App Router) + React 19 + Tailwind CSS 4. Three pages, one shared shell, no UI
dependencies beyond the framework.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |

## Pages

| Route | Contents |
| --- | --- |
| `/` | Hero, services, industries, process, closing CTA |
| `/solutions` | All four industries on one page: `#retail`, `#hospitality`, `#education`, `#smes` |
| `/contact` | Enquiry form (server action) and what happens next |
| `/api/chat` | POST endpoint backing the assistant widget |

The old `/solutions/<slug>` URLs 308-redirect to `/solutions#<slug>` (see `next.config.ts`).

## Layout

```
src/
  app/
    layout.tsx              root shell: metadata, SiteHeader, SiteFooter, ChatWidget
    page.tsx                home
    solutions/page.tsx      all industries in one document
    contact/page.tsx        contact page
    contact/actions.ts      sendEnquiry server action (validation + delivery)
    not-found.tsx           404
    robots.ts, sitemap.ts   crawl metadata
    api/chat/route.ts       DeepSeek-backed assistant endpoint
  components/
    layout/                 SiteHeader, SiteFooter (site chrome)
    Home/                   homepage sections
    solutions/              IndustryNav, IndustrySection
    contact/                ContactForm (client component)
    ui/                     Button, Card, Section, ContactCTA, icons
    ChatWidget.tsx          floating assistant
  data/
    site.ts                 nav, services, process, proof points, site URL
    industries.ts           per-industry problems and builds
  lib/chatSystemPrompt.ts   assistant grounding
```

## Conventions

- **Copy lives in `src/data`.** Add an industry to `industries.ts` and it appears in the header
  nav, footer, homepage grid, `/solutions` page and the assistant's knowledge automatically.
- **Design tokens live in `src/app/globals.css`** (`ink`, `surface`, `raised`, `line`, `accent`).
  Use `bg-surface`, `border-line`, `text-accent` rather than new hex values.
- **Server components by default.** Client components are limited to `SiteHeader`, `ContactForm`
  and `ChatWidget`.
- **No conflicting utility classes.** Button variants are complete class strings; make sure
  overrides do not fight each other (see `src/components/ui/Button.tsx`).
- **Anchor offsets** are handled by `scroll-padding-top` in `globals.css` plus `scroll-mt-10` in
  the `Section` component, so add new anchored sections through `Section`.

## Environment

| Variable | Used by | Notes |
| --- | --- | --- |
| `DEEPSEEK_API_KEY` | `/api/chat` | Assistant is disabled with a friendly message when unset |
| `DEEPSEEK_BASE_URL` | `/api/chat` | Optional override, e.g. for a local mock |
| `NEXT_PUBLIC_SITE_URL` | metadata, sitemap | Canonical origin; set before deploying |
| `CONTACT_WEBHOOK_URL` | `/contact` | JSON POST target for enquiries |
| `CONTACT_EMAIL` | `/contact` | Shown as the direct contact address |

## Assets

`public/branding/logo.png` (480×139, ~20 KB) is an optimised, trimmed copy of the original
wordmark, and `og-cover.png` (1200×630) is the social cover. The wordmark is dark-on-transparent,
so it is presented on a light plate in the header. Provide an inverse (light) logo and the plate
can be dropped.

