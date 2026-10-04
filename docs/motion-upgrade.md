# ZoloLabs motion and scroll upgrade

This pass develops the existing V1 redesign into a deliberate, responsive experience focused on **Mobile Applications + Business Platforms**. Existing uncommitted work was preserved. No commit or deployment was performed.

## Design and motion

The homepage follows the requested sequence: dark hero → introduction → two service cards → light TeaCare feature → light principles → dark development process → dark final CTA → footer. Internal pages retain their light visual system and receive lighter reveals.

- **Hero:** the service label, two masked headline lines, description, actions, footnote and interface visual enter in a short stagger. “Operate Smarter.” retains a restrained blue gradient. The final hero entrance finishes in approximately 1.25 seconds once its element is visible.
- **Reusable reveals:** fade up, left and right, scale, text mask, image mask and stagger. Server components output visible content and motion markers; one shared controller starts each reveal once. Keyboard focus exposes content immediately. Completed entrance classes are removed so they do not override hover interactions.
- **TeaCare:** label reveal, 950 ms image mask and 1.05 → 1 image settle, followed by descriptive content and actions. Desktop hover scales the browser preview to 1.03, reduces the overlay and reveals a small “View Project ↗” label. The system cursor stays available.
- **Interactions:** service cards lift slightly and move their arrows 6 pixels; buttons use small scale/arrow/background transitions. Hamburger lines animate into a close icon. Mobile navigation enters with staggered links and fades away on close.
- **Contact:** restrained entrance, focus indicators, validation feedback, pending spinner/label, success reveal and retryable error feedback. Existing server action, storage, notification and field behavior are preserved in this motion pass.

Entrance timing is generally 550–900 ms, important imagery 950 ms, and interactions 180–700 ms. Reveals use `cubic-bezier(.16, 1, .3, 1)` without springs or bouncing.

## Scroll behavior and accessibility

- Native wheel, trackpad and touch scrolling remain responsive. In-page anchor links use CSS smooth scrolling.
- The navbar contracts visually after scrolling while retaining its layout height, preventing content jumps. A 2-pixel line reflects page progress.
- Fine-pointer desktops receive 18-pixel hero/project parallax and small cursor-responsive hero/CTA glow. The shared helper caps parallax at 24 pixels and pointer motion at 16 pixels. Visibility observers and animation frames limit work to visible effects; ambient animation pauses offscreen and in hidden tabs.
- Desktop principles use a sticky editorial heading with four scroll-activated rows. The six-step process has a sticky heading, filling vertical line and active-step emphasis. React updates only when the current item changes; the progress line uses a MotionValue.
- At 900 pixels and below, sticky stories become sequential layouts. Touch devices receive static imagery and ordinary tap targets.
- Reduced motion exposes all content and removes entrances, masks, parallax, animated glows and sticky story behavior. Preferences can change while the page is open.
- The mobile menu locks the page, makes background content inert, traps keyboard navigation, supports Escape, restores focus and closes on navigation, browser history and desktop resizing. Closing immediately restores page scrolling and disables the fading menu.
- Content remains visible when JavaScript is disabled. Pages keep their semantic headings, labels, image alternatives, server rendering and page-specific metadata.

## Assets and TeaCare

Reused assets:

| Asset | Use |
| --- | --- |
| `public/branding/logos/zololabs-wordmark.png` | Existing official header/footer logo |
| `public/projects/teacare/website-preview.webp` | Real TeaCare website capture, 1440 × 900, 67,410 bytes |
| `public/branding/backgrounds/social-cover.png` | Existing social metadata image |
| CSS product-interface composition | Lightweight decorative hero visual |

No additional bitmap assets were required or generated in this pass. Project images use `next/image`, responsive sizes and appropriate lazy/eager loading. Typed project data supports a graceful image-free presentation for future records.

**TeaCare Services** is labeled **Business Platform**, in **Corporate Catering & Event Management**, using the requested description. Shared data drives the homepage, `/work` and `/work/teacare`. “View Project” opens the internal case study. “Visit Live Site ↗” links to `https://teacareservices.com` with `target="_blank"`, `rel="noopener noreferrer"` and an accessible new-tab label. The existing recorded technologies were retained. No client statistics, new projects or social accounts were invented.

## New files in this pass

```text
docs/motion-upgrade.md
src/components/animations/Reveal.tsx
src/components/animations/Stagger.tsx
src/components/animations/TextReveal.tsx
src/components/animations/Parallax.tsx
src/components/animations/PointerGlow.tsx
src/components/animations/animations.css
src/components/Home/PrincipleStory.tsx
src/components/Home/storytelling.css
src/components/layout/navigation.css
```

## Existing files modified in this pass

```text
README.md
src/app/globals.css
src/app/page.tsx
src/app/solutions/page.tsx
src/app/work/page.tsx
src/app/work/teacare/page.tsx
src/app/about/page.tsx
src/components/Home/Hero.tsx
src/components/Home/Intro.tsx
src/components/Home/Services.tsx
src/components/Home/SelectedWork.tsx
src/components/Home/WhyZoloLabs.tsx
src/components/Home/Process.tsx
src/components/Home/ProcessStory.tsx
src/components/Home/home.css
src/components/layout/SiteExperience.tsx
src/components/layout/SiteHeader.tsx
src/components/layout/PageHeader.tsx
src/components/layout/internal-pages.css
src/components/ui/ProjectCard.tsx
src/components/ui/ProjectVisual.tsx
src/components/ui/ContactCTA.tsx
src/components/contact/ContactForm.tsx
src/components/contact/contact.css
src/data/site.ts
src/data/projects.ts
src/lib/chatSystemPrompt.ts
```

Several of these were already untracked as part of the preceding V1 redesign; they are listed here according to their state at the start of this motion pass. No source or asset files were deleted in this pass.

## Dependencies

None added or changed. Existing `motion` 12.43, Next.js 16.3.6, React 19.2.8, strict TypeScript and Tailwind 4 were reused. No scroll-smoothing dependency was introduced. Browser verification used an existing local Playwright installation without changing this repository's dependency files.

## Verification

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm test`: all 35 inquiry/backend regression tests passed.
- `npm run build`: production compilation, TypeScript and static-page generation passed.
- `git diff --check`: passed.
- Production browser matrix: all six routes (`/`, `/solutions`, `/work`, `/work/teacare`, `/about`, `/contact`) at 375, 390, 430, 768, 1024, 1280, 1440 and 1920 pixels passed: **48 page checks**, with no horizontal overflow, browser errors, failed page responses, broken images or content left hidden after scrolling. Canonical/social metadata and safe TeaCare links were verified.
- Navigation was checked at all eight widths. All six routes also passed reduced-motion and JavaScript-disabled checks. Internal destinations/anchors, four legacy solution redirects and the 404 route behaved correctly.
- Interaction checks passed for native wheel scrolling, stable header layout, page progress, actual reveal/mask animation events, hover scaling, desktop parallax, touch simplification, live reduced-motion switching, mobile menu focus/inertness, immediate scroll unlocking and browser history. Frame-by-frame sampling found no transient horizontal overflow.
- Final mobile header/menu checks passed at 375, 390, 430 and 768 pixels. Focus cancels all ancestor reveals and blur does not replay them. Hydrating with partially visible, scroll-restored content preserves full visibility and scroll position without an entrance animation. Fast scrolling into partially visible content also exposes it immediately without replay or overflow.
- Precise scroll probes activated all four principles and all six process steps; the process line progressed from 0% to 100%. Mobile and reduced-motion stories retained readable static content.
- Pointer probes confirmed hero movement within 10 pixels and CTA movement within 8 pixels. Offscreen glows paused correctly.
- All 12 contact browser checks passed: required-field/email validation, labels, disabled loading state, safe honeypot success/reset, simulated network error with retained values and retry, and a short mobile keyboard viewport. No real inquiry or notification was sent.
- Desktop and mobile production screenshots were reviewed. The compact mobile illustration omits decorative captions that overlapped the interface.

Temporary browser scripts, screenshots and detailed JSON results are stored under `/private/tmp/zololabs-motion-qa/`, outside the repository.

## Recommended manual checks

Review the pacing with a real trackpad and touch device, including Safari/iOS, short landscape viewports, and the system reduced-motion preference. Confirm production inquiry credentials with one authorized test submission and verify storage/email delivery; automated checks used the honeypot and a blocked-request error simulation, without sending real inquiries. Check the deployed canonical origin through `NEXT_PUBLIC_SITE_URL`.

Browser checks cover layout, interactions and loading. A production Lighthouse score was not measured.

## Recommended Git commit message

```text
feat: add premium motion and scroll storytelling to ZoloLabs
```
