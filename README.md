# ZoloLabs website

Next.js 16 (App Router) + React 19 + Tailwind CSS 4. Three pages, one shared shell, and Motion-powered interactions.

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
| `SUPABASE_URL` | `/contact`, notification retries | Project URL; server-only |
| `SUPABASE_SECRET_KEY` | `/contact`, notification retries | Secret API key (`sb_secret_...`), or legacy service-role JWT; server-only |
| `RESEND_API_KEY` | inquiry notifications | Email sending API key; server-only |
| `INQUIRY_NOTIFICATION_FROM` | inquiry notifications | Sender on a verified Resend domain |
| `INQUIRY_NOTIFICATION_TO` | inquiry notifications | Team email address(es), comma separated |
| `CRON_SECRET` | `/api/inquiries/retry` | Bearer secret for a scheduled retry job |
| `CONTACT_WEBHOOK_URL` | `/contact` | Optional JSON webhook alternative to Resend |
| `CONTACT_EMAIL` | `/contact` | Shown as the direct contact address |

## Assets

Brand assets use descriptive paths under `public/branding/`; project previews live under
`public/projects/`. All original numbered-image and logo URLs have permanent redirects
in `next.config.ts`. Transparent PNGs retain their original pixels and alpha channels.
The existing 1200×630 social cover is at `branding/backgrounds/social-cover.png`.

### Design structure

```text
public/
  branding/
    logos/             # Wordmark and compact mark
    hero/              # Main glass sculpture
    services/          # Digital network and technology orb
    backgrounds/       # Light/dark technology, network, social cover
    decorative/        # Ring and glass orb
  projects/
    zololabs/          # Website preview
src/
  app/                 # Existing pages, metadata, API routes, global styles
  components/
    home/              # Hero, Services, Industries, Technology, Process,
                       # ProcessStory, SelectedWork, GrowthVisual, home.css
    layout/            # Shared header, footer, theme and route motion
    animations/        # Existing reusable reveal, float, parallax, magnetic motion
    ui/                # Shared buttons, cards, headings, atmosphere
    solutions/         # Existing industry navigation and sections
    contact/           # Existing form
  data/                # Existing site and industry records
  lib/                 # Existing inquiry and chat logic
```

### Files moved and renamed

All eight existing `src/components/Home/*.tsx` files moved to
`src/components/home/` with their filenames unchanged: `Hero`, `Services`,
`Industries`, `Technology`, `Process`, `ProcessStory`, `SelectedWork`,
`GrowthVisual`. `home.css` is new; it contains extracted homepage
styles. No component content was discarded.

| Previous public path | New public path |
| --- | --- |
| `branding/logo.png` | `branding/logos/zololabs-wordmark.png` |
| `branding/logo_only.png` | `branding/logos/zololabs-mark.png` |
| `branding/01.png` | `branding/backgrounds/dark-tech-background.png` |
| `branding/02.png` | `branding/backgrounds/dark-network-background.png` |
| `branding/03.png` | `branding/backgrounds/light-tech-background.png` |
| `branding/04.png` | `branding/services/technology-network-orb.png` |
| `branding/05.png` | `branding/decorative/technology-ring.png` |
| `branding/06.png` | `branding/services/digital-network.png` |
| `branding/07.png` | `branding/hero/hero-glass-sculpture.png` |
| `branding/08.png` | `branding/decorative/glass-orb.png` |
| `assets/zololabs/zololabs-website.png` | `projects/zololabs/website-preview.png` |

The previously missing `branding/og-cover.png` was recovered from the repository
as `branding/backgrounds/social-cover.png`; metadata and the legacy URL now resolve.

The visual system is light first: pale hero, white services, blue-gray process,
dark desktop project showcase, light gradient CTA, and navy footer. Mobile retains
its compact navigation and process timeline and omits the self-referential website
showcase as requested. Continuous motion and desktop pointer effects respect the
system reduced-motion preference. Homepage-specific styles live in `home/home.css`;
shared tokens, surfaces, typography, and animation keyframes remain in `globals.css`.

## Inquiry storage and notifications

Recommended flow: **Contact form → Next.js server action → Supabase → Resend**.
The form acknowledges an inquiry only after the database accepts it. Notifications
run after the response using Next.js `after()`. If email fails, the inquiry stays
in the database with a retryable notification status. No customer data is sent to
an email service until notifications are configured.

### Set up Supabase

1. Create a Supabase project in your own account, or use an existing project.
2. Apply `supabase/migrations/202610010001_create_inquiries.sql` in the project's
   SQL Editor. This creates `public.inquiries`, indexes, RLS, and server-only grants.
   Apply it once; do not rerun it against an existing table. With a linked Supabase
   CLI project, use your normal migration workflow instead.
3. Copy `.env.example` to `.env.local` if you do not already have one. Set
   `SUPABASE_URL` and `SUPABASE_SECRET_KEY` from the project's API-key settings.
   Use a secret key, not a publishable key. Never prefix this key with `NEXT_PUBLIC_`.
4. Add the same variables to your hosting provider, then restart local development
   or redeploy. View submissions in Supabase's Table Editor under `inquiries`.
   The `status` column supports `new`, `contacted`, and `closed` for follow-up.

The migration does not grant website visitors access to this table, including
signed-in visitors. No public read/insert policies are created. Only the server
uses the secret key. Database access should remain limited to your team.

### Set up email notifications

1. Create a Resend account and verify a sending domain you own.
2. Set `RESEND_API_KEY`, `INQUIRY_NOTIFICATION_FROM` (for example,
   `ZoloLabs <inquiries@your-verified-domain>`), and `INQUIRY_NOTIFICATION_TO`.
   The recipient is your team; the customer's email becomes `reply_to` so you can
   reply directly to the customer. The form does not email customers automatically.
3. Submit a test inquiry and confirm both the database row and the received email.
   `notification_status = sent` means the provider accepted the send request;
   it does not confirm inbox delivery. Check Resend's delivery events for that.

Alternatively, leave all three email variables unset and configure
`CONTACT_WEBHOOK_URL` for an existing automation. It receives a JSON payload with
`name`, `email`, `company`, `message`, `source`, `submittedAt`, and `inquiryId`.
Resend takes precedence if any email setting is present. Partial email configuration
produces a tracked failure instead of silently switching providers.

With Supabase configured but no notification settings, inquiries are stored with
`notification_status = disabled`. Without Supabase settings, an existing webhook
continues to work as before, but the website does not maintain a database copy.

### Retry failed notifications

Set `CRON_SECRET` to a long random value. Configure your hosting provider or an
external scheduler to call `GET /api/inquiries/retry` every 10 minutes with
`Authorization: Bearer <CRON_SECRET>`. No scheduler is automatically provisioned;
automatic retries start only after you configure this job. The handler processes
up to four records per run with exponential backoff and a five-attempt limit.

Concurrent workers claim records atomically. Interrupted workers can be recovered
after five minutes. Email requests use a stable idempotency key for each inquiry;
Resend retains these keys for 24 hours. A webhook receiver must honor the provided
`Idempotency-Key` header to deduplicate its own deliveries. Retries after the
provider's deduplication window can repeat a notification whose outcome was unknown.

Review rows with `notification_status = failed` and `notification_attempts >= 5`
in the Supabase dashboard. Fix configuration/provider errors first; then reset
`notification_attempts` to `0`, `notification_status` to `pending`, and
`notification_next_attempt_at` to the current time to retry deliberately.
Previously disabled rows need their `notification_channel` set to `email` or
`webhook` as well. Review provider logs before retrying an ambiguous delivery.

The existing honeypot and best-effort per-IP rate limit still apply. The in-memory
limit is not shared between serverless instances; a distributed limiter or bot
challenge can be added if submission volume or abuse requires it.

### Verification

Run `node --test tests/inquiries.test.mjs` for mocked storage, email, failure,
validation, concurrency, and retry-authorization tests. These tests never send a
real email or submit anything to a live Supabase project.

Database grant checks are in `supabase/tests/inquiries_rls.test.sql`. Run them with
`supabase test db` against a configured local Supabase stack, or execute the test
SQL in the project's SQL Editor with pgTAP available. These checks require an
actual PostgreSQL/Supabase environment and are separate from the mocked tests.

References: [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys),
[Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security),
[Resend email API](https://resend.com/docs/api-reference/emails/send-email),
[Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys).
