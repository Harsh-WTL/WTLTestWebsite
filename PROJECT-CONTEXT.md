# WTL Website — Project Context & Codebase Reference

**Last Updated:** 2026-11-18  
**Current Git Commit:** 27b78a8 (ignored graphify)  
**Branch:** main  

---

## 🎯 Project Overview

**What The Local (WTL)** — Multi-location SaaS marketing platform landing page.  
Three products: **Locations** (Listing & SEO Atlas), **Engage** (Reputation & Unified Inbox), **Synapse** (Hyperlocal Ads).

**Tech Stack:**
- Next.js 16.4 (App Router) + React 19 + TypeScript 5.7
- Tailwind CSS v4 (via `@tailwindcss/postcss`) + `tw-animate-css`
- Static export (`output: 'export'`) → GitHub Pages at `/WTLTestWebsite/`
- `basePath: '/WTLTestWebsite'`, `trailingSlash: true`, `images.unoptimized: true`
- Fonts: Figtree + Geist Mono via Google Fonts `<link>` in `layout.tsx` (not `next/font`)

**Key Constraints:**
- No API routes (static export forbids them)
- TypeScript errors ignored during build (`typescript.ignoreBuildErrors: true`) — only `npx tsc --noEmit` is the real typecheck
- Demo form posts to `NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT`; when unset, honestly reports "not configured"
- Light/dark theme parity required; oklch colors must be written in full form `oklch(L C H / α)`
- SSR/no-JS must show final state; hidden/animated states gated under `html.js`

---

## 📁 File Structure (Tracked Files Only)

```
wtl-website/
├── .github/workflows/deploy.yml    # CI: npm install + npm run build → deploy out/ to GitHub Pages
├── app/
│   ├── globals.css                  # Design tokens, theme vars, base styles, motion primitives
│   ├── layout.tsx                   # Root layout: fonts, theme script, metadata, Analytics
│   └── page.tsx                     # Page composition (single-page marketing site)
├── components/
│   ├── site/
│   │   ├── primitives.tsx           # Shared UI: Button, Eyebrow, SampleBadge, StatusBadge, Stars, Panel, SectionHeading
│   │   ├── reveal.tsx               # IntersectionObserver-based scroll reveal wrapper
│   │   ├── logo.tsx                 # LogoMark + Logo (theme-aware)
│   │   ├── theme-toggle.tsx         # Theme switcher (persists to localStorage)
│   │   ├── demo-dialog.tsx          # Demo request dialog + DemoButton + DemoProvider
│   │   ├── site-nav.tsx             # Sticky header with mobile drawer
│   │   ├── hero.tsx                 # Hero section (left copy + right HeroSignalMap + HeroPreview)
│   │   ├── hero-signal-map.tsx      # Animated signal network map (Mumbai sample data)
│   │   ├── hero-signal.module.css   # Hero styles (including HeroSignalMap + trust ribbon)
│   │   ├── hero-network.tsx         # Alternative network view (UNUSED in current hero)
│   │   ├── hero-network.module.css
│   │   ├── hero-preview.tsx         # Static product preview card
│   │   ├── hero-preview.module.css
│   │   ├── metrics-bar.tsx          # 4 animated stat tiles + industry chips
│   │   ├── metrics-bar.module.css
│   │   ├── problem.tsx              # 3 problem cards with live visualizations
│   │   ├── problem.module.css
│   │   ├── how-it-works.tsx         # 3-step loop with decorative mini-replays
│   │   ├── how-it-works.module.css
│   │   ├── product-tour.tsx         # Tabbed product views (Locations/Engage/Synapse)
│   │   ├── product-tour.module.css
│   │   ├── roi-calculator.tsx       # Interactive ROI calculator with live math
│   │   ├── roi-calculator.module.css
│   │   ├── comparison.tsx           # Comparison table vs spreadsheets/agencies
│   │   ├── comparison.module.css
│   │   ├── use-cases.tsx            # Industry verticals with follow-dock preview
│   │   ├── use-cases.module.css
│   │   ├── faq.tsx                  # Accordion FAQ
│   │   ├── faq.module.css
│   │   ├── closing.tsx              # FinalCta + SiteFooter
│   │   ├── closing.module.css
│   │   ├── hero-workspace.tsx       # UNUSED legacy mockup (full client dashboard)
│   │   ├── living-location-atlas.tsx # UNUSED legacy mockup
│   │   ├── location-signal-network.tsx # UNUSED legacy mockup
│   │   ├── location-map.tsx         # Shared LocationMap component (used by views)
│   │   └── views/
│   │       ├── locations-view.tsx   # Location map + profile guard demo
│   │       ├── engage-view.tsx      # Unified inbox + AI draft + WhatsApp alert
│   │       └── synapse-view.tsx     # Local ad campaigns + radius slider + map
│   └── ui/
│       └── button.tsx               # shadcn-style Button (base-ui primitive)
├── lib/
│   ├── utils.ts                     # cn() = clsx + tailwind-merge
│   ├── hooks.ts                     # useInView, usePrefersReducedMotion
│   ├── theme.ts                     # Theme management (useSyncExternalStore)
│   ├── demo-request.ts              # submitDemoRequest() → NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT
│   └── sample-data.ts               # Mumbai sample locations, conversations, campaigns
├── next.config.mjs                  # Static export config
├── tsconfig.json
├── package.json + package-lock.json
├── postcss.config.mjs
├── components.json                  # shadcn config
└── public/
    ├── icon.svg, apple-icon.png, icon-*-32x32.png
    └── placeholder.* assets
```

---

## 🏗️ Page Composition (app/page.tsx)

```
<DemoProvider>
  <Skip to content link>
  <SiteNav />
  <main id="main">
    <Hero />                    # HeroSignalMap + HeroPreview
    <MetricsBar />              # 4 stat tiles + industry chips
    <Problem />                 # 3 problem cards with live wells
    <HowItWorks />              # 3-step loop + decorative replays
    <ProductTour />             # Tabs: Locations / Engage / Synapse
    <RoiCalculator />           # Interactive calculator
    <Comparison />              # Comparison table
    <UseCases />                # Industry verticals + follow-dock
    <Faq />                     # Accordion FAQ
    <FinalCta />                # Demo CTA panel
  </main>
  <SiteFooter />
</DemoProvider>
```

**Section IDs (for nav anchors):** `#top`, `#how-it-works`, `#products`, `#faq`, `#roi-calculator`, `#comparison`, `#use-cases`

---

## 🎨 Design System (app/globals.css)

### Color Tokens (oklch, full form only)
- **Surfaces:** `--surface-page`, `--surface-card`, `--surface-raised`, `--surface-sunken`, `--surface-hover`, `--surface-selected`
- **Inks:** `--ink-primary`, `--ink-secondary`, `--ink-muted`, `--ink-disabled`, `--ink-inverse`
- **Lines:** `--line-default`, `--line-strong`, `--line-focus`
- **Brand:** `--brand-primary` (hue 265), `--brand-hover`, `--brand-active`, `--brand-subtle`, `--brand-border`, `--brand-ink`
- **Signals:** success/warning/danger/info (solid/subtle/border triplets)
- **Visualization:** `--viz-1` through `--viz-8`, `--viz-grid`, `--viz-axis`
- **Map:** `--map-land`, `--map-water`, `--map-road`
- **Insight:** `--insight-bg` (tri-hue gradient), `--insight-ink`
- **Shadows:** `--shadow-card-v`, `--shadow-pill-v`, `--shadow-raised-v`, `--shadow-overlay-v`

### Tailwind Utilities (via `@theme inline`)
- `bg-page/card/raised/sunken/hover/selected`, `text-ink/ink-2/ink-3`, `border-line`
- `bg-brand-ink`, `bg-insight`, `glass-card`, `glass-raised`, `command-surface`, `command-card`
- Radii: `rounded-ctl` (12px), `rounded-card` (18px), `rounded-panel` (22px)

### Motion Primitives (keyframes)
- `wtl-pulse-ring`, `wtl-live`, `wtl-rise`, `wtl-pop`, `wtl-dash`, `wtl-travel`, `wtl-signal-stream`
- `.reveal` / `.reveal[data-visible='true']` (gated by `html.js`)
- `prefers-reduced-motion`: disables all CSS animations + SMIL `<animateMotion>`

### Theme Handling
- Layout script sets `.js`, `.dark`, and `data-theme` on `<html>`
- `@custom-variant dark (&:is(.dark *, [data-theme="dark"] *))` matches both
- Light/dark overrides: `:global(html:not(.dark)) .x`, `[data-theme='dark'] .x`
- In CSS modules: use `:global(html.js)` prefix for JS-gated states

---

## 🧩 Key Components Deep Dive

### 1. Hero (components/site/hero.tsx)
**Composition:** Left column (copy + CTAs + architecture signature + channel row) + Right column (`HeroSignalMap` + `HeroPreview`)

**Left Column Copy (VERBATIM - do not change):**
- Eyebrow: "MULTI-LOCATION MARKETING, CONNECTED"
- Headline: "Make every location" / "perform at its best." (second line gradient via `.metal`)
- Subcopy: "Bring location presence, customer conversations, and local marketing into one connected workspace..."
- CTAs: "Book a Demo" (primary), "Explore the Platform" (secondary)
- Architecture: "Platform Architecture: LOCATIONS / ENGAGE / SYNAPSE · Mumbai Metro · 7 Storefronts Linked"
- Channel row: "Channels" + 7 logos (Google, Instagram, WhatsApp, YouTube, Bing, Meta, Apple Maps)
- Trust ribbon: "INTEGRATIONS · Google Business Profile & Meta APIs · Profiles, reviews & local pages"

**Right Column:**
- `HeroSignalMap` — animated signal network with scenario pills (Overview/Drift/Escalations), conduit paths, SMIL travelers, hub beacon, needs-attention table, rotating catch chips, catch note
- `HeroPreview` — static product preview: portfolio health (9/12), reviews (4.6★/429), Ahana insight, attention items (Thane/Vashi)

### 2. MetricsBar (components/site/metrics-bar.tsx)
4 animated stat tiles with count-up (1300ms cubic ease), sparklines, staggered halo rings:
1. 8,400+ Storefronts Managed
2. 124,000+ Reviews Patrolled Daily  
3. < 45s WhatsApp Escalation
4. +28% Catchment Footfall
+ Industry footprint chips (Automotive, Healthcare, Retail, Restaurant, Banking)

### 3. Problem (components/site/problem.tsx)
3 tone-coded cards with live visualizations:
- **Danger (Drift):** Saturday hours arc gauge (9-day cycle), "customer walks to a closed door" alarm
- **Warn (Inbox):** 7 channel chips with sequential badge scale-in, unread tally, hold/replay
- **Brand (Bars):** Flat spend vs local demand bars with hatched "wasted" pattern

### 4. HowItWorks (components/site/how-it-works.tsx)
3 steps with decorative mini-replays:
1. Connect → converging SMIL wires to workspace chip
2. Listen → cycling stream rows with sentiment tags
3. Act → ticker cycling WhatsApp alert / draft / radius shift

### 5. ProductTour (components/site/product-tour.tsx)
Tabbed interface with sliding indicator, keyboard nav, panel swap + glare sweep:
- **Locations** → `LocationsView` (map + profile guard)
- **Engage** → `EngageView` (inbox + AI draft + WhatsApp alert)
- **Synapse** → `SynapseView` (campaigns + radius slider + map)

### 6. RoiCalculator (components/site/roi-calculator.tsx)
Interactive calculator with rAF lerp tweening:
- Controls: locations (5-200), reviews/mo (5-80)
- Live math: hours saved, drifts prevented, footfall, revenue
- Tapeline sweep + figure pop animation on input release

### 7. Comparison (components/site/comparison.tsx)
Table: Capability vs Spreadsheets vs Agencies vs WTL (6 rows, 100% verbatim copy)

### 8. UseCases (components/site/use-cases.tsx)
6 industry verticals with follow-dock preview (rAF lerp to cursor Y):
- Mobile: inline expand under active row
- Desktop: right-column dock with artifact swap
- Auto-cycle pauses on interaction

### 9. FAQ (components/site/faq.tsx)
Accordion with grid-rows animation (SSR/no-JS fully expanded)

### 10. Closing (components/site/closing.tsx)
- **FinalCta:** Insight-gradient panel + demo steps + checkmarks + one-shot glare
- **SiteFooter:** Logo + links + animated wordmark (per-letter gradient wave) + IST clock

---

## 📊 Sample Data (lib/sample-data.ts)

**12 Mumbai Locations** with SVG coordinates (600×380 viewBox):
| ID | Name | Area | Status | Rating | Reviews | Pending |
|----|------|------|--------|--------|---------|---------|
| powai | Powai | Hiranandani Gardens | attention | 4.3 | 41 | 2 |
| vashi | Vashi | Sector 17 | critical | 3.9 | 27 | 3 |
| thane | Thane | Ghodbunder Road | attention | 4.6 | 33 | 0 (Edit pending) |
| bandra | Bandra West | Hill Road | healthy | 4.8 | 58 | 0 |
| andheri | Andheri East | Chakala | healthy | 4.7 | 46 | 0 |
| lowerparel | Lower Parel | Senapati Bapat Marg | healthy | 4.9 | 39 | 0 |
| colaba | Colaba | Causeway | healthy | 4.8 | 22 | 0 (minor) |
| chembur | Chembur | Diamond Garden | healthy | 4.6 | 30 | 0 (minor) |
| ghatkopar | Ghatkopar | LBS Marg | healthy | 4.5 | 25 | 1 (minor) |
| malad | Malad | Link Road | healthy | 4.7 | 35 | 0 (minor) |
| borivali | Borivali | Shimpoli | healthy | 4.8 | 29 | 0 (minor) |
| juhu | Juhu | Gulmohar Road | healthy | 4.9 | 44 | 0 (minor) |

**Hero Scenarios** (for HeroSignalMap): Powai (2★ wait time), Bandra (5★ staff), Vashi (2★ phone access)  
**Conversations:** 3 samples across Google/Instagram/Play Store  
**Campaigns:** 4 samples (PMax + Meta Lead Ads, various radii)

---

## 🔧 Shared Hooks & Utilities

### lib/hooks.ts
- `useInView<T>(options)` — IntersectionObserver, returns `{ ref, inView }`
- `usePrefersReducedMotion()` — `useSyncExternalStore` + `matchMedia`

### lib/theme.ts
- `useTheme()` — syncs with `document.documentElement.classList.contains('dark')`
- `setTheme('light'|'dark', persist?)` — toggles `.dark` + `data-theme`, persists to localStorage
- System preference listener when no manual preference saved

### lib/demo-request.ts
```ts
submitDemoRequest(payload): Promise<{status:'sent'} | {status:'not-configured'} | {status:'error', message}>
```
- Reads `NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT` at build time
- When unset: returns `{ status: 'not-configured' }` (honest UI)

### lib/utils.ts
- `cn(...inputs)` — `twMerge(clsx(inputs))`

---

## 🏃 Commands

```bash
npx tsc --noEmit          # REAL typecheck (build skips this)
npm run dev               # Serves at http://localhost:3000/WTLTestWebsite/
npm run build             # Static export to out/ (gitignored)
```

**CI (`.github/workflows/deploy.yml`):**
- `npm install` (not pnpm, despite `packageManager: pnpm`)
- `npm run build`
- Deploys `out/` to GitHub Pages

---

## ⚠️ Known Gotchas & Rules

1. **oklch must be full form:** `oklch(L C H / α)` — abbreviated `oklch(1 / .5)` dropped by lightningcss (made hero headline invisible before)

2. **JS-gated hidden states:** Use `:global(html.js) .selector` in CSS modules (bare selectors get hashed). Repeat prefix on paired hover rules.

3. **Theme overrides:** 
   - Light: `:global(html:not(.dark)) .x`
   - Dark: `[data-theme='dark'] .x`

4. **Container queries in CSS modules:** Must be placed AFTER base rules they override (source order matters in built CSS).

5. **Reduced motion:** 
   - CSS: `@media (prefers-reduced-motion: reduce)` disables animations
   - SMIL: Conditionally omit `<animateMotion>` in JSX (`!reduced && <animateMotion...>`)

6. **Static export constraints:**
   - No API routes, no server-only deps
   - Asset URLs need `/WTLTestWebsite` prefix (basePath)
   - `trailingSlash: true` affects all routes

7. **SSR/No-JS final state:** 
   - Animated counters render final value in SSR
   - Hidden states only applied under `html.js`
   - `html.js` class set by inline script in `layout.tsx`

8. **Unused legacy files (do not delete without checking):**
   - `hero-workspace.tsx` — full client dashboard mockup
   - `living-location-atlas.tsx`
   - `location-signal-network.tsx`
   - `hero-network.tsx` + `.module.css` — alternative network view (replaced by HeroSignalMap)
   - `hero-preview.tsx` + `.module.css` — static preview (currently used by hero)

9. **Graphify:** Knowledge graph at `graphify-out/`. Run `graphify update .` after code changes (AST-only, no API cost).

10. **Build notes:** `WTL-BUILD-NOTES.md` is ignored (local-only). Contains full history of hero passes, port decisions, and bug fixes. Read before substantial UI changes.

---

## 📝 Current State Summary (as of 27b78a8)

**What's LIVE on the page:**
1. Hero with HeroSignalMap + HeroPreview
2. MetricsBar (4 stats + industry chips)
3. Problem (3 cards with live wells)
4. HowItWorks (3 steps + decorative replays)
5. ProductTour (3 tabs → Locations/Engage/Synapse views)
6. RoiCalculator (interactive)
7. Comparison (table)
8. UseCases (verticals + follow-dock)
9. FAQ (accordion)
10. FinalCta + SiteFooter

**What's NOT in current codebase (despite build notes mentioning):**
- ❌ `hero-engine.tsx`, `hero-engine.module.css`
- ❌ `hero-city.tsx`, `hero-city.module.css`
- ❌ `platform-overview.tsx`
- ❌ `product-details.tsx`
- ❌ `dashboard-showcase.tsx`
- ❌ `india-intelligence-hero.tsx`, `india-outline.ts`
- ❌ `platform-icons.tsx`
- ❌ `hero-stage.tsx`
- ❌ `public/hero-brands/`, `public/heroImage*.png`, `public/heroMap.webp`, `public/*illustration.webp`

**Verified Working:**
- `npx tsc --noEmit` → clean
- `npm run build` → passes (static export to `out/`)
- Light/dark parity
- Reduced motion (0 animations)
- Responsive at 1440/1280/1024/768/390/360
- No horizontal overflow

---

## 📦 Real Product Intelligence (from WTL-Product-Research)

**Source:** Live read-only exploration of `https://app.staging.whatthelocal.com` on 2026-11-18  
**Test Workspace:** "MDRC (scale test)" — 3,000 locations, 20,388 reviews (synthetic data)

### Three Product Areas (top-level switches entire sidebar)

| Area | Route | Purpose |
|------|-------|---------|
| **Locations** (default) | `/dashboard`, `/listings`, `/reviews`, `/posts`, `/ai-audit`, `/profile-guard`, `/under-review`, `/google-cases`, `/qr-codes`, `/data-manager` | Google Business Profile listing management, reviews/reputation, posts, listing protection, local web pages |
| **Engage** | `/engage` (Dashboard, Agent Queue, Inbox, Understand, Configure) | Omnichannel customer-care helpdesk: social comments, DMs, email ticketing, app-store reviews, AI auto-replies, CRM-lite |
| **Ads** | `/spark`, `/creative-studio`, `/reports` | AI advertising: Google Ads / Meta Lead Ads campaign engine, AI creative generation, automated ad onboarding |

**Account modules** (shared): User Management, Activity, Settings, Support — RBAC scopes per product area + geography/location subset.

### Locations Area — 18 Modules (Google / Meta / Microsite / Insights / Account)

| Group | Module | Route | Key Features |
|-------|--------|-------|--------------|
| Google | **Dashboard** | `/dashboard` | Portfolio KPIs, Ahana AI insights, notifications, charts |
| Google | **Locations** | `/listings` | 3,000-location master list + 5-tab detail (Overview, Analytics, Media, Services, Edit) |
| Google | **Reviews** | `/reviews` | Review inbox, AI replies (assist + auto per-star), sentiment (80/8/12%), auto-reply-all |
| Google | **Page Posts** | `/posts` | GBP post scheduling, per-location template variables `{{Location name}} {{Address}} {{Area}} {{State}} {{Pincode}}`, calendar + history |
| Google | **AI Location Studio** | `/ai-audit` | AI score (AI assistant visibility), nightly audit (2:30am), guided GBP creation (8 sections) |
| Google | **Profile Guard** | `/profile-guard` | Third-party/Google edit moderation queue, AI risk triage, Auto-reject master switch, Was/Now diffs |
| Google | **Not Published** | `/under-review` | Sent vs Held vs Public reconciliation (60 days), heuristic diagnosis, Raise support case |
| Google | **Support Cases** | `/google-cases` | Ticketing for Google listing issues, auto-created from Not Published |
| Google | **QR Codes** | `/qr-codes` | Review-page QR generation (5 designs, batch, custom templates) |
| Google | **Data Manager** | `/data-manager` | Bulk xlsx/CSV import (20-column schema) |
| Meta | **Location Pages** | `/meta-pages` | Facebook location pages (empty — no Meta connected) |
| Meta | **Page Posts** | `/meta-posts` | Facebook page posts (empty — no Meta connected) |
| Microsite | **Microsite** | `/microsite` | 3-step builder: Industry → Sections (10 toggles) → Generate up to 3,000 public pages |
| Insights | **Reports** | `/reports/locations` | 5 types (Performance, Reviews, Review Summary, Profile Protection, Location Status), scheduled CSV email |
| Account | **User Management** | `/user-management` | RBAC: Owner/Regional Manager/Store Manager/Review Handler/Report Viewer/Content Creator/Engage Agent/Engage Lead/Engage Read-Only/Custom |
| Account | **Activity** | `/activity` | Audit log: approvals, edits, posts, replies, team changes |
| Account | **Settings** | `/settings` | AI Reply Tone (1000-char + presets Professional/Friendly/Witty/Empathetic) |
| Account | **Support** | `/support` | Same ticketing system as Support Cases |

### Engage Area — 12 Modules (all empty: 0 channels connected)

| Module | Key Features |
|--------|--------------|
| **Dashboard** | Volume, Response rate, Needs attention, AI/Human split, sentiment net score, themes (LOVED/ASKED ABOUT/NEEDS WORK) |
| **Agent Queue** | Pipeline: To do → WIP → ACR → Resolved → Closed; round-robin assignment; search "Ticket #, order, AWB, email" |
| **Inbox** | Comments (FB/IG/YouTube, 10 status tabs), Messages (Messenger/IG DMs), Email (forward-rule), Ad Comments, App Updates (Play/App Store) |
| **Understand** | Tickets analytics, Analytics (response rate/time, net sentiment, AI vs Manual), Customers (CRM-lite with LTV), Reports |
| **Configure** | Alerts, Channels, Team, Ticket Rules, **Response Studio** (AI auto-replies master switch ON by default; brand voice editor; Saved Replies + Automated Rules builders) |

### Ads Area — 4 Modules (all empty: no ad accounts linked)

| Module | Key Features |
|--------|--------------|
| **Synapse Ads Engine** | Google Ads / Meta Lead Ads campaign surfaces |
| **AI Creative Studio** | 5-step wizard: Business → Style → Message → Visuals → Size; industry pre-set "Diagnostic center (from GMB)" |
| **SPARK** | "Smart Personalised Ad Readiness Kit" — 3 questions → Brand Intelligence → Audience Mapping → Product Catalogue → AI Ad Generation (~2 min) |
| **Reports** | Meta Lead Ads campaign table |

### Cross-Cutting AI Surface Map (Verified)

| AI Capability | Where | Evidence |
|--------------|-------|----------|
| Review reply generation (assist + auto) | Reviews, Settings | "AI-Powered Reply" dialog; auto-reply per-star modes |
| Brand voice / tone control | Settings, Response Studio | 1000-char + presets; applies to auto + on-demand |
| Sentiment classification | Reviews, Engage | "AI-analyzed · 11,324 reviews"; themes LOVED/ASKED ABOUT/NEEDS WORK |
| AI insight persona "Ahana" | Dashboard | Insight cards |
| Edit-risk triage + AI Analysis | Profile Guard, Reports | Edit Detail dialog; "AI Reason" column |
| AI score + nightly listing audit | AI Location Studio | "Generate score", 2:30am audit |
| AI/Human answer split | Engage Dashboard | "answered by AI · by your team" |
| Auto-replies for social/email | Response Studio | Master switch ON by default |
| AI ad creative generation | AI Creative Studio | 5-step wizard → image |
| AI ad readiness (site scan) | SPARK | 4 pillars |
| AI customer duplicates / CRM | Customers | Find duplicates button |

### Data Model (Locations)

- **Workspace** → Business Accounts (e.g., `[SCALE] MDRC North/East & West/South`) → **Locations**
- **Location IDs:** `WTL-L-#####` (e.g., WTL-L-24004)
- **Store Codes:** `MDRC-S-#####`
- **Per-location:** health, review count, avg rating, verified/unverified, last synced date, Google `cid`
- **Health Buckets:** Healthy (2,816) / At risk (184) / Critical (0) → **Portfolio Score 70/100 "GOOD"**
- **Single master record** feeds: GBP fields, microsite content, QR deep links, reviews, posts targeting, ad creative context, RBAC scoping, reporting rows

### Integrations

- **Google Business Profile:** locations, reviews, posts, media, attributes, verification, performance, edit moderation — nightly sync + OAuth refresh tokens
- **Meta/Facebook/Instagram:** location pages, page posts, comments, DMs (empty — no account)
- **YouTube** (comments), **Messenger** (DMs), **Email** (forward-rule ingestion), **Google Play / App Store** (reviews)
- **Google Ads / Meta Lead Ads** (campaign management; empty — no accounts)
- **Backend:** Supabase + Edge Functions

### Unique Differentiators (for positioning)

1. **AI Score** — measures how well listings surface in *AI assistants* (AI-search era positioning)
2. **Profile Guard with AI risk triage** — protects listings against Google/public edits
3. **Not Published** — exposes Google's opaque edit pipeline (sent vs held vs public) with support escalation
4. **SPARK** — 2-minute website-scan → ad-ready brand kit
5. **Per-location microsites** auto-populated from GBP including lead forms
6. **GBP posts with per-location template variables** — one composition, 3,000 personalized posts

### Maturity Signals

- **Deep/finished UX:** Locations, Reviews, Profile Guard, Posts, QR, Microsite, Reports, RBAC
- **Fully scaffolded (empty-state driven):** Engage, Ads — activate once channels/ad accounts connected
- **Staging limitations (do not reflect product design):** edge function 500s at scale, missing OAuth tokens, no recent Google metrics, Meta/Ads unconnected

---

## 🔮 Next Tasks Reference

When user gives tasks, refer to this context. Key areas that commonly need work:
- Hero refinements (signal map, preview, copy) — align with real product modules
- Section additions/removals in `app/page.tsx` — reflect actual 3-area structure
- Sample data updates in `lib/sample-data.ts` — use real module names, health buckets, IDs
- Theme/color adjustments in `app/globals.css`
- Motion/reduced-motion behavior
- Responsive breakpoints
- Demo dialog endpoint configuration
- Accessibility (ARIA, keyboard nav, focus management)
- **Marketing copy alignment** — current site says "Locations, Engage, Synapse" but product uses "Locations, Engage, Ads" (Synapse is the Ads engine name)