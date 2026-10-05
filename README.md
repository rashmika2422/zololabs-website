# ZoloLabs website

ZoloLabs builds **Mobile Applications + Business Platforms**. This public website uses Next.js 16.3 (App Router), React 19, strict TypeScript, Tailwind CSS 4 and the existing Motion library.

## Development

```bash
npm install
cp .env.example .env.local   # only if you do not already have one
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run lint` | ESLint with Next.js and TypeScript rules |
| `npm run typecheck` | Strict TypeScript verification |
| `npm test` | Mocked inquiry, validation and notification regression tests |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |

## Public pages

| Route | Contents |
| --- | --- |
| `/` | Dark hero and services, light TeaCare feature and principles, dark six-stage process and CTA |
| `/solutions` | Mobile applications and business platforms, capabilities and outcomes |
| `/work` | Case studies driven by typed project data |
| `/work/teacare` | TeaCare challenge, solution, capabilities, technologies and live website |
| `/about` | Company, engineering approach and mission |
| `/contact` | Validated project inquiry form and submission feedback |

The internal pages use a light visual system, with a shared dark closing CTA/footer. The official logo is reused throughout. Navigation includes all five primary destinations and a mobile menu with keyboard support, Escape dismissal and scroll locking.

Legacy `/solutions/{retail,hospitality,education,smes}` links permanently redirect to `/solutions#business-platforms`. Historic brand asset URLs still resolve through the existing redirects. `/api/chat` remains available for compatibility, with updated company grounding; the old floating assistant is omitted from the public shell.

## Code and design

- `src/data/site.ts`: company positioning, two service records, navigation, principles and six process steps.
- `src/data/projects.ts`: verified project records. Add a record and a matching case-study route to extend the portfolio.
- `src/app/globals.css`: light/dark design tokens, shared typography, layout, buttons, CTA and footer.
- `src/components/Home/home.css`: homepage composition and CSS product diagram.
- `src/components/Home/storytelling.css`: desktop sticky principles/process and simpler mobile sequences.
- `src/components/layout/navigation.css`: header transitions, scroll progress and animated mobile navigation.
- `src/components/animations/`: server-rendered Reveal, TextReveal, Stagger, Parallax and PointerGlow markers sharing the SiteExperience controller.
- `src/components/layout/internal-pages.css`: internal-page and project showcase styles.
- `src/components/contact/contact.css`: contact layout and form states.
- `src/components/layout/SiteExperience.tsx`: theme, progressive scroll reveals and bounded desktop effects. Content stays readable without JavaScript and motion respects the system preference.
- Pages and buttons remain server components. Client components are limited to navigation, shared motion coordination, scroll story progression and the contact form.

No runtime dependencies were added. The hero visual is built in CSS. The TeaCare preview at `public/projects/teacare/website-preview.webp` is an optimized capture of its live public website, rather than a fictional interface. No project growth or performance statistics are claimed.

## Motion behavior

Reveals animate once using fade, translate, scale or a text/image mask. The hero uses a short stagger; featured imagery gets a longer mask reveal. Native wheel and touch scrolling remain in control. Desktop parallax is bounded at 24 pixels and runs only while the visual is in view; pointer glow is limited to fine pointers. Both effects are disabled on smaller/touch screens and with reduced motion. Ambient effects pause offscreen or while the tab is hidden. The mobile menu has a restrained open/close sequence, an animated hamburger and keyboard focus management.

The Why and Process sections use sticky editorial headings on desktop and normal sequential layouts on mobile. The process line fills through a MotionValue; React updates only when the active step changes. Reduced motion keeps every piece of content visible and removes parallax, masks and ambient motion.

TeaCare Services is the real featured project. Its buttons point to `/work/teacare` and `https://teacareservices.com`, with safe new-tab behavior on the external link. No additional images are required. New projects can optionally supply their own image through the typed project record.

## Environment

| Variable | Used by | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Metadata and sitemap | Canonical origin; defaults to `https://zololabssolutions.com` |
| `CONTACT_EMAIL` | Contact page/action | Optional direct team email |
| `SUPABASE_URL` | Inquiry storage/retries | Server-only project URL |
| `SUPABASE_SECRET_KEY` | Inquiry storage/retries | Server-only secret/service-role key |
| `RESEND_API_KEY` | Notifications | Server-only email provider key |
| `INQUIRY_NOTIFICATION_FROM` | Notifications | Verified sender |
| `INQUIRY_NOTIFICATION_TO` | Notifications | Team recipient(s), comma separated |
| `CONTACT_WEBHOOK_URL` | Contact/notifications | Existing webhook alternative |
| `CRON_SECRET` | Notification retry endpoint | Scheduled-job bearer secret |
| `DEEPSEEK_API_KEY` | Existing chat API | Optional; widget is not rendered |
| `DEEPSEEK_BASE_URL` | Existing chat API | Optional upstream override |

Project type and optional phone are stored in the inquiry message and delivered through the existing notification flow. No database migration is required. The description accepts 20–1,800 characters to leave room within the existing 2,000-character database limit. Company/organization is now required by the public form; old stored inquiries remain compatible.

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
