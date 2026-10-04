# ZoloLabs V1 redesign

The public website now positions ZoloLabs around **Mobile Applications + Business Platforms**. The homepage has a near-black editorial design with restrained blue accents and a lightweight CSS product diagram. Solutions, Work, About and Contact use a related light visual system. TeaCare has a reusable project record, an actual optimized website preview and a dedicated case study.

The redesign includes five-destination navigation, an accessible mobile menu, two focused service cards, four engineering principles, the six-stage development process, shared conversion links/footer, progressive scroll reveals, reduced-motion support and page-specific SEO/social metadata. Legacy solution and brand asset redirects remain available.

The inquiry form now collects name, company, email, optional phone, project type and description. Shared client/server validation, loading/disabled/success/error states and accessible feedback preserve the existing Supabase, Resend, webhook and retry behavior. Project type and phone are included in the existing message column; no database migration is needed. Descriptions accept 20–1,800 characters to fit the deployed 2,000-character message limit with this metadata.

The previous floating assistant is omitted from the public layout. Its existing API and component remain compatible, with updated company grounding. No real social URLs were present, so none were invented.

## Files created

- `docs/v1-redesign.md`
- `public/projects/teacare/website-preview.webp`
- `src/app/about/page.tsx`
- `src/app/work/page.tsx`
- `src/app/work/teacare/page.tsx`
- `src/components/Home/Intro.tsx`
- `src/components/Home/ProductBlueprint.tsx`
- `src/components/Home/WhyZoloLabs.tsx`
- `src/components/contact/contact.css`
- `src/components/layout/PageHeader.tsx`
- `src/components/layout/internal-pages.css`
- `src/components/ui/ProjectCard.tsx`
- `src/components/ui/ProjectVisual.tsx`
- `src/data/projects.ts`
- `src/lib/metadata.ts`

## Files modified

- `README.md`
- `next.config.ts`
- `package.json`
- `src/app/contact/actions.ts`
- `src/app/contact/page.tsx`
- `src/app/contact/state.ts`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/sitemap.ts`
- `src/app/solutions/page.tsx`
- `src/components/ChatWidget.tsx`
- `src/components/Home/Hero.tsx`
- `src/components/Home/Process.tsx`
- `src/components/Home/ProcessStory.tsx`
- `src/components/Home/SelectedWork.tsx`
- `src/components/Home/Services.tsx`
- `src/components/Home/home.css`
- `src/components/contact/ContactForm.tsx`
- `src/components/layout/SiteExperience.tsx`
- `src/components/layout/SiteFooter.tsx`
- `src/components/layout/SiteHeader.tsx`
- `src/components/ui/AmbientBackground.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/ContactCTA.tsx`
- `src/data/site.ts`
- `src/lib/chatSystemPrompt.ts`
- `tests/inquiries.test.mjs`

## Files removed

- `src/components/Home/GrowthVisual.tsx`
- `src/components/Home/Industries.tsx`
- `src/components/Home/Technology.tsx`
- `src/components/solutions/IndustryNav.tsx`
- `src/components/solutions/IndustrySection.tsx`
- `src/data/industries.ts`

## Existing local work

The initial worktree contained local edits to Hero, Industries, homepage styles and AmbientBackground, plus an untracked FluidText component. Copies of all five files and the original local diff are preserved at `/private/tmp/zololabs-v1-preexisting/` before the redesign. Hero/styles were rebuilt within the requested scope; Industries was removed with the obsolete industry sections. AmbientBackground's animation changes remain intact (only trailing whitespace was cleaned), and FluidText remains untouched and untracked. These unused local animation components are not part of the rendered public site.

Homepage folder/import casing now matches the repository's tracked `src/components/Home/` paths, including new files, so a Linux checkout can resolve the same imports.

## Dependencies

No dependencies were added. The implementation reuses Next.js, React, TypeScript, Tailwind and Motion. Browser verification used an already installed Playwright runtime and cached Chromium outside this repository. `typecheck` and `test` npm scripts were added for the existing TypeScript setup and inquiry tests.

## Verification

- `npm run lint`: passed, no lint errors.
- `npm run typecheck`: passed, no TypeScript errors.
- `npm test`: 35 tests passed, covering validation, optional phone, project types, persistence, webhook/email delivery, failures, concurrency, retry authorization, idempotency and throttling using mocks.
- `npm run build`: passed; all six public routes prerender successfully. The initial sandbox build stalled; the same command completed successfully with compiler worker permissions.
- Browser responsive audit: all six public routes at 375, 390, 430, 768, 1024, 1280, 1440 and 1920 pixels (48 checks) returned 200, with no accidental horizontal scrolling, broken images, obsolete service copy, browser console/page errors or hydration errors.
- Keyboard/mobile menu checks: Enter, focus containment, Escape with focus return, navigation dismissal, resize dismissal and scroll unlocking passed.
- Reduced motion: all six routes had no active animations and visible headings.
- Production browser smoke: all six routes at 390 and 1440 pixels (12 checks) passed, including canonical/social metadata, loaded images and navigation. Back/Forward keeps the mobile menu closed and the page scrollable.
- Contact browser checks: 12 checks passed for validation, accessible labels, pending/disabled, safe honeypot success, form reset, simulated connection failure, retained inputs, re-enabled submit and a 390 × 380 keyboard viewport. The deliberately aborted request produced an expected resource error; there were no unexpected browser errors.
- All internal links/anchors, legacy solution redirects and the 404 page passed browser checks.
- TeaCare live destination was verified: the provided `www` URL redirects to its live canonical website and returns 200.

Browser reports and screenshots are available locally under `/private/tmp/zololabs-v1-qa/`. The development preview is running at `http://127.0.0.1:3100`.

## Manual verification

1. Submit a real test inquiry on the configured deployment. Confirm the Supabase record, project type/phone in its message, and the team notification. Mocked tests and safe browser checks did not send real inquiries or emails.
2. Confirm `NEXT_PUBLIC_SITE_URL`, `CONTACT_EMAIL` and the existing server-only storage/notification settings are correct for deployment.
3. Review the site on physical iOS/Android devices and in Safari/Firefox. Automated browser verification used Chromium.
4. If needed, run the existing `supabase/tests/inquiries_rls.test.sql` grant checks against a configured Supabase/PostgreSQL environment; those database checks were not run locally.

## Recommended Git commit

```text
feat: redesign ZoloLabs around mobile applications and business platforms
```

No commit or deployment was performed.
