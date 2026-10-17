# WTL Build Notes — persistent memory
Source of truth: `WTL Design Language.dc.html` (v1.0) + `WTL Client Dashboard.dc.html`.
This file exists so no future session needs to re-analyze. Read this FIRST before any UI work.

## Product
What The Local (WTL) — multi-location SaaS marketing platform. Three products:
**Locations** (listing & SEO atlas), **Engage** (reputation & unified inbox), **Synapse** (hyperlocal ads).
Static-export Next.js 16.4 landing page, deployed to GitHub Pages, basePath `/WTLTestWebsite`.

## Design language canon (v1.0) — thesis
"One product, one surface. Typography carries the hierarchy; colour only carries meaning."

### Principles
1. Density is a feature (44px comfortable / 36px compact rows, remembered per table)
2. Colour is a signal — neutral interfaces; green/amber/coral only where a state is true, always with a word/glyph
3. Never lie about data — dash ≠ zero; empty ≠ error ≠ partial ≠ stale (five silhouettes: skeleton / empty / error+reqID / partial amber ribbon / stale cached badge)
4. Quiet for eight hours — one accent, hairlines, motion 120ms ease-in, no bounce, reduced-motion

### Foundations
- Fonts: Figtree 400/500/600(/700) — everything human-readable. Geist Mono ONLY for IDs, timestamps, numerics, cron, token counts. Never mono prose/buttons.
- Colour: oklch, brand hue 265 (indigo). Groups: surface / ink / line / signal (each signal = solid+subtle+border triplet). 4.5:1 min contrast.
- Structure: 4px base spacing; hairlines do all separating; only 3 shadows (card / raised / overlay) — shadow means floating.
- Radii: 8 inputs · 10 buttons/controls · 16 cards/tiles · 20 panels/dialogs. Pills 999px for filters & status ONLY.
- Type scale (8 steps, floor 12): 56/40/32/18/15/14/13/12. Eyebrow = mono uppercase +0.09em.

### Signature patterns
- `--insight-bg` tri-hue gradient (135deg: 262 → 330 → 72 light; 262/330/60 dark) on Ahana AI insight cards — use sparingly, 1 per screen.
- Hatched series: `repeating-linear-gradient(115deg, c1 0 5px, c2 5px 10px)` for comparison/progress fills.
- Metric tiles: eyebrow + 28–44px tabular value + unit + delta pill. Delta pills have inset ring (`0 0 0 1px line`).
- Charts: hairline horizontal grid only, 11px mono axis, gradient area fills, 4px bar caps, dashed response line `stroke-dasharray 4 3`, hatched bars for "previous".
- Table: sticky sunken header, mono right numerics, hover row, density toggle, count pill `blood danger` badges.
- App shell (dashboard): 280px sidebar, sticky topbar, ⌘K search chip, filled-ink-pill active nav, night-sync status well with pulsing success dot.

## Repo pointers
- Tokens already implemented: `app/globals.css` (strictly aligned, light+dark parity). Tailwind utilities: `bg-page`, `bg-card`, `bg-raised`, `bg-sunken`, `bg-hover`, `bg-selected`, `text-ink`(2/3/disabled/inverse), `border-line`(strong), `bg-brand-ink`, `bg-insight`, utilities in `@theme inline`.
- `components/site/hero-workspace.tsx` = existing full client command workspace mock built from the Dashboard file. Currently NOT imported (dead code). Cannibalize/revive it in Phase B.
- Sample data: `lib/sample-data.ts` (sampleLocations: Powai attention 4.3/41, Vashi critical 3.9/27, Thane attention 4.6/33 profile Edit pending, Bandra healthy 4.8/58, …, Mumbai metro).
- `lib/demo-request.ts`: honest not-configured state; endpoint integration via `NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT`.
- Old palette drift banned: hardcoded `#07090e`, `#38BDF8` in dark (sky blue) — replace with tokens.
- Buttons on the site currently `rounded-full` everywhere — canon says radius 10; pills only for filters/status. Fix in Phase A.
- Radii naming overlap: Design Language doc (8/10/16/20) vs Dashboard file (--r-card 18/--r-panel 22/--r-ctl 12 dense 9/12/14). Approved hero tweak: keep doc radii as canon (10/16/20), do not merge 18/22.

## Hero proposal (WTL Hero Proposal.html) — v2 "living product" — decisions
v1 (static montage right side) rejected: "looks like any other website". v2 makes the right side a forever-looping live product. Structure for the port:
1. Left column: live eyebrow pill → 3-line display h1 (line 1 muted, line 2 ink→brand→ink gradient span, clamp 42→68px) → subcopy naming drift/reviews/ad-spend → "live sting" card (PROFILE DRIFT · Saturday hours · caught 21 min ago, mono + drift badge) → CTA radius-10 row (brand-ink "Book a demo", raised "Explore the platform") → logo-rail: "Official" + seamless duplicated-set mono channel marquee (Google, Instagram, WhatsApp, YouTube, Bing, Meta, Apple Maps, 26s loop, masked edges).
2. Right column: scenario pill row (Overview/Drift/Escalations) → `.frame` radius-20 app montage: app topbar with ⌘K search chip + "Ask Ahana" pill → **animated map card (h 320, sunken bg)**: SVG viewBox 560×320 — water blobs (map-water), viz-grid grid lines (40px), **rotating dashed radar rings** (`.radar`, 14s), **seven dashed conduits** to hub with `.conduit` dashoffset shimmer (1.8s, keyframes wtl-conduit), **four SMIL traveler pulses** (`animateMotion`, class="traveler", glow drop-shadow, staggered begins) — **node markers** in canonical signal colors (Andheri warn "Sat hours · reverted", Powai warn "wait-time ▲", Thane ok, Vashi danger "3 unanswered", Colaba/Malad/Ghatkopar ok, `.node-ring` ping animation staggered via --d) — **hub Bandra West** (glow radial + `.radar-hub-ring` expanding ring + 7px beacon) — canon partial-state ribbon "18 of 21 loaded · Meta timed out" + "next sync 02:00 IST" ribbon — `.ahana-chip` overlay top-left — `.live-stats` overlay bottom-left (live dot · Received `#tickNum` · unanswered danger).
3. Needs-attention table: t-title sunken + 4 rows (loc title + health-pill, mono WTL-L-44xx IDs, counts); **`.hot` highlighted row cycles every 2.6s via JS** (surface-selected + 3px brand inset bar). Initial hot on row 3.
4. Rotating **catch chips** (two visible slots, three chips rotate every 3.4s, re-triggered enter-rise): Andheri revert-in-1-click (danger ic + success tag), Powai at-risk (warn), Vashi WhatsApp escalation (brand).
5. catch-note below frame on brand border; bottom mono ribbon "OFFICIAL · Google & Meta APIs · Zero migration fee · Rollout in 48 hours".
React-port key patterns: SMIL animateMotion must be removed under prefers-reduced-motion (CSS can't pause it); radar/conduit/hub are pure CSS; counter (0→399 boot then pops) + chip rotation + hot-row cycling in useEffect with matchMedia guard. Retained hero-tweak approvals from v1: gradient headline span, live-sting card, catch-note, ribbon. No new tokens, no radii merges (canon 10/16/20).
Proposal chrome (sticky strip + theme switch) won't ship. Bottom `footer` (h 120) is only for framing — don't port.

## Phases agreed
A: remove drift (rounded-full → radius-10, kill hardcoded dark hexes, section surface rhythm)
B: hero becomes the real product on stage (revive HeroWorkspace or montage)
C: conversion building (logo wall done in hero, testimonials, pricing)
D: perf polish (next/font, drop glass/mesh, remove ignoreBuildErrors)
Current: **A proposal done → user reviews hero mock → then it gets changed to main files.**

## Light-mode color lift (user approved deviation, "add colors, don't follow design language this much")
Dark mode untouched. All light pop is scoped `:root:not([data-theme="dark"])` — port as one wrap or a `light:` variant group:
1. Hero canvas: 4-hue pastel mesh (teal 200 / indigo 262 / violet 330 / warm 72, L≈0.86-0.90, C≈0.06-0.075) + 26px dot grid.
2. Headline `.grad` → multi-stop `--grad-head` (262 → 280 → 330 → 72, far richer than canon ink→brand).
3. Eyebrow pill: filled gradient chip (262→330→72 tints) + colored shadow; `Live` dot stays.
4. Live sting + catch-note: gradient hairline borders via double-background padding-box/border-box trick (sting = warning→brand; note = brand→330→72) + colored glow shadows.
5. Frame: 1.5px `--grad-frame` (insight 262/330/72) border + stacked colored shadows (0.28 indigo / 0.16 330).
6. Map card: softly tinted terrain radial tints; nodes get colored drop-shadow halos by `[fill]` attr selectors; travelers stronger glow.
7. Live-stats card: slight indigo tint bg + brand border; ribbon "OFFICIAL" gets success dot + brand ink.
## Gloss applied to BOTH themes (user: "do it in the dark mode too")
Signature vars are now theme-driven in `:root` and `[data-theme="dark"]`:
- `--grad-head`: light = ink→280→330→72 sweep; dark = near-white→280→330→gold (metal on dark canvas)
- `--grad-frame`: light pastel 262/330/72; dark glows 262 (0.42)/330 (0.40)/60 (0.52) at high alpha
- `--spec` (vertical spec sheen over headline): light `oklch(1/.55)`, dark `oklch(1/.28)`
Glossy treatments are now GLOBAL (theme-driven by vars, no scoping): metal headline, `.ahana-chip` + `.live-stats` glass (vertical gradients + backdrop blur/saturate + `inset 0 1px oklch(1/.65-.75)`), `.caught-chip`, glossy `.btn-primary/.btn-secondary`, glossy `.topbar-pill`, gradient-border `.frame` + `.catch-note`, `.uw` underline, and the glare sweep `.frame::after` (now runs in BOTH themes; dark translation panel = translucent raised = subtle frost sweep).
STILL light-only (intentional, keep when porting): 4-hue hero mesh + dot grid, filled gradient eyebrow, sting gradient border, map terrain tints, node drop-shadow halos, ribbon dot.
Dark also keeps the canon values it had (user called dark "good"); the frost additions are additive.

## Light-mode glossy finish (user: "do the dark's glossy finish in this too" + "more ideas")
Second light-only group appended below the color lift:
1. Headline metal type = vertical spec sheen `linear-gradient(180deg, oklch(1/.55), oklch(1/0) 46%)` layered over `--grad-head` (background-clip text on two layers).
2. Glass chips glossy: `.ahana-chip` and `.live-stats` get vertical glass gradients + `backdrop-filter blur(10-12px) saturate(1.25-1.3)` + `inset 0 1px oklch(1/.65-.75)` top highlight + colored glow shadows.
3. Buttons glossy: primary vertical indigo fill + inset sheen + colored shadow; secondary vertical raised→subtle fill + inset sheen.
4. Signature `.topbar-pill` (Ask Ahana in app): vertical 280→265 gradient + inset sheen.
5. **Glare sweep** `.frame::after` (105deg white strip, translateX -130%→130%, 8.6s, cubic-bezier .4,0,.2,1) — hides to `display:none` in dark; reduced-motion: `animation:none` (base transform leaves it offscreen).
6. `.uw` underline highlight: phrase "one connected workspace" gets 2px brand→330→72 gradient underline via `background bottom/100% 2px no-repeat` + `slice` box-decoration-break.

## PORT TO SITE — DONE (2026-10-17)
User approved the mock; constrained to "don't change content": all existing hero copy kept verbatim
(eyebrow, "Make every location / perform at its best.", supporting copy, CTA labels, Platform
Architecture signature). Mock's "Twelve stores…" headline NOT used. Montage carries NO client name —
topbar is "What The Local · {n} locations"; rows/nodes use only sample-data locations.
Files:
- `components/site/hero-signal.module.css` — scoped CSS module (all montage + left-column styles).
- `components/site/hero-signal-map.tsx` — client component (`'use client'`): scenario pill row
  (Overview/Drift/Escalations → pins hot row 0/2, Overview cycles every 2.6s), counter boot
  0→Σreviews (429) over ~110ms ticks then 3.6s pop re-trigger via key, chip pair rotation 3.4s via
  key remount, SMIL travelers conditionally rendered `!reduced` (node/hub rings also conditional).
- `components/site/hero.tsx` — rewritten; imports HeroSignalMap; `rounded-[10px]` + `.btnP` gloss
  via cn/twMerge over buttonClass. Old LivingLocationAtlas removed from hero (file kept, unused).
- `app/globals.css` — added `--grad-head/--grad-frame/--spec` to BOTH theme blocks; `.hero-canvas`
  light upgraded to 4-hue mesh (dark override block untouched for Phase A).
Port-specific gotchas discovered:
- data coords live in `sampleLocations` (viewBox 600x380, same as atlas) — montage nodes/conduits use
  them; proposals' 560x320 layout unused. Colaba (228,352) sits low → live-stats glass moved to
  bottom-RIGHT, table title carries the partial-sync canon ("9 of 12 synced · scanned 21 min ago"),
  SVG ribbons dropped.
- CSS modules HASH class selectors inside bare `html:not(.dark) .x` (!) — must write
  `:global(html:not(.dark)) .x`; `[data-theme='dark'] .x` passes unhashed (attribute selectors fine).
  Pre-hydration layout script sets BOTH `.dark` class and `data-theme` → attr restores are safe.
- tsc --noEmit clean; `npm run build` (Next 16 Turbopack static export) passes; prerendered
  `index.html` contains animateMotion + all copy. Remaining phases A/C/D (site-nav hex cleanup,
  conversion sections, perf) still pending.

## BUGFIX (first user review) — invisible headline line 2
Root cause: abbreviated `oklch(L / α)` (chroma+hue omitted) in `.metal` layer 1 and the `--spec`
definition — engine rejected the layer → entire `background-image` dropped → transparent text with
no gradient = invisible. lightningcss minification KEEPS the abbreviated form (it converted all
other oklch values but passed `oklch(1 / 0)` / `oklch(1 / .55)` through).
Rule for this codebase: **always write oklch in full `oklch(L C H / α)` form** (module + globals).
Fix: all `oklch(1 / x)` → `oklch(1 0 0 / x)`; `.metal` now = ink fallback, then
`@supports (background: oklch(1 0 0 / 0)) { transparent + clip + -webkit-text-fill-color }`.
Compiled `--spec` ends up as hex+alpha (`#ffffff8c` / `#ffffff47`) — safe.
Also refined from screenshot feedback: search chip capped `max-width: 210px` (catch chips no longer
cover its text), chip copy tightened (3 lines → 2), unanswered count = mono red number, ribbon gets
`font-mono` per mock.

## PORT 2 — MetricsBar + Problem (proposal v2 approved 2026-10-17)
Files:
- `components/site/metrics-bar.module.css` + rewritten `metrics-bar.tsx` ('use client').
  Glass stat tiles (translucent card 84% + backdrop blur + mask-ring `--grad-frame` hairline) over
  light mesh `::before`; "Network telemetry" live pill (module-owned pulsing dot); 4 tiles with
  count-up (SSR renders final value; rAF cubic ease 1300ms once grid inView; `landed` scale pop),
  17px lucide icons w/ staggered `--dh` halo rings, self-drawing sparklines (SVG gradient stops set
  via inline `style` — var() in `stop-color=` PRESENTATION ATTRIBUTES is unreliable; React `style`
  prop is safe; `.sparkLine/.sparkArea/.sparkTip` all fill/stroke via CSS classes). Industry pills:
  mono count badge + glossy hover lift, static (hero keeps the page's only marquee).
- `components/site/problem.module.css` + rewritten `problem.tsx` ('use client').
  Eyebrow chip = warntone glass pill + pulsing dot (light-only gradient lift); title = pre-split
  word spans `.w` blur-rise (delays 0/70/210/280ms) + `.wAccent` "One small team." rising as ONE span
  (per-word gradient clips break with bg-clip:text; single span = one sweep) — spans spaced via
  `margin-right: .24em` (a trailing space inside an inline-block collapses); description fade;
  3 ptone cards (danger/warn/brand `--tone`) with cursor-spotlight `::before` at `--mx/--my`
  (pointermove handler), halo icon chips, bottom-aligned wells: (1) Saturdays drift: strike hours +
  44px 9-day ARC gauge (r18, dasharray=2πr via inline strokeDashoffset) resets 0→9 every 950ms,
  `wellAlarm` flashes at 9d + copy flips to "customer walks to a closed door"; (2) inbox: 7 channel
  chips bob (--bd stagger), badges scale in sequentially 420ms, `{unread} unread` tally, hold 1900ms
  then replay; (3) bars: 7 flat-spend (34px) + 7 demand bars grow with --bd delays, demandShort
  cells = canonical hatched pattern + `hatchDrift` background-position loop). Approved connective
  line (S6): "No single store looks broken — multiply by twelve and it compounds." with
  self-drawing gradient underline (background-size 0→100% 2px).
Port rules confirmed/learned this pass:
- NO-JS + SSR: hide efflorescence states under `:global(html.js)` ONLY (globals `.reveal` does the
  same); SSR renders final values (day=9, unread=18, bars grown-under-js) so no-JS users see content.
  BUT: hidden-state selectors must NOT swallow their own triggers — `html.js .x[data-in=true]`
  (0,3,1) OUTSPECIFIES `.x[data-in=true]:hover` (0,3,0), so paired hover rules MUST repeat the
  :global(html.js) prefix (fixed on both stat + pcard).
- `as const` arrays: `tuple.length` is a LITERAL type (7) → `useState(arr.length)` infers
  SetStateAction<7>; annotate `useState<number>(...)`.
- Reused: `useInView/usePrefersReducedMotion` from lib/hooks; index delays: tiles 40/110/180/250ms,
  cards 80/170/260ms. Milestone media break 1080px (not canon md 768) for grid wrap.
Verified: tsc clean; build passes; prerendered HTML contains every piece of existing copy verbatim
(8,400+ / 124,000+ / < 45s / +28% split across value+fix spans), no client names in visuals
(sample-only "Thane"), keyframes: 8 new (livePulse, mHalo, mValPop, hatchDrift, chipBob, pHalo,
warnPulse).(metrics attrs: mask-composite exclude + xor survive lightningcss).

## PORT 3 — HowItWorks + ProductTour (proposal 2 approved 2026-10-17)
Mock: `WTL Sections Proposal 2.html` (S1–S7 upgrades incl. tabs-above-artifact layout fix +
glare-on-tab-change). Files:
- `components/site/how-it-works.module.css` + rewritten `how-it-works.tsx` ('use client').
  Eyebrow chip (gradient light lift) + "in one place." grad-head accent span; living loop rail:
  hairline `.rail` across node row + self-drawing `.railFill` (scaleX 0→1, 1400ms, gated
  `:global(html.js)`, triggered by `data-in` on `.stepsWrap` via useInView 0.3); per-step halo
  `::after` ping (delay `calc(300ms + 1400ms * var(--hiwP) - 700ms)`); step entrance rise (--d
  stagger 0/140/280ms, html.js-gated); step node = 44px brand-tint radius-12 chip w/ inset sheen;
  mono idx `<b>01</b> · Locations`. Decorative mini-replay wells (aria-hidden, sample data only —
  NO client names): (1) Connect: Google/Meta/Ad-accounts chips → 3 dashed SMIL wires converging to
  wsChip "12 locations · one workspace", travelers NOT rendered under reduced-motion; (2) Listen:
  3 stream rows cycle (window of 2 on, 380ms), tags ✓/▼/✕ + sample times/locations; (3) Act:
  ticker cycles 3 inline items 2200ms (WA alert·Vashi·45s, draft·Thane, radius shift·Powai).
- `components/site/product-tour.module.css` + rewritten `product-tour.tsx` ('use client').
  Two-column grid `minmax(0,460px) minmax(0,1fr)` gap 28, `align-items: start` so tabs+artifact
  RISE TO SECTION TOP beside the heading; left = heading + hairline-divider rail (tagline mono,
  title, body, glass pointChk checks, try-note gradient-hairline + mono → arrow, margin-left auto
  hover nudge); right = Reveal 160ms + segmented tab control sitting directly on the frame +
  gradient-frame product frame. Sliding tab indicator: absolute span, measured per active tab via
  refs (`offsetLeft-3 / offsetWidth`), translateX+width transitions 240ms, re-measured on resize
  AND `document.fonts.ready` (font-swap shift); keyboard nav (arrows/Home/End) kept from original.
  Panel swap: `<div key={product.id} className={swap}>` → 420ms rise-in; one-shot glare sweep
  `.pframeGlare` keyed remount (`glare` counter, run class only after first pick), 1100ms; monogram
  chips ('LD'/'RA'/'HΣ' derived from taglines) use ink bg.
  REAL views untouched: LocationsView/EngageView/SynapseView imported as-is; SampleBadge primitive
  reused in frame topbar ("· Mumbai region" copy kept).
Learned this pass:
- JS-gated hidden/on state pairs need the html.js prefix on the ON rule too:
  `:global(html.js) .streamRow.streamRowOn` (0,3,1) beats `:global(html.js) .streamRow` (0,2,1);
  same for `.actItem.actItemOn`.
- Engage/Synapse rail copy renders client-side only (active-product panel), same as pre-port —
  prerender check will flag them as MISS; NOT a regression.
- `document.fonts?.ready.then(measure)` passed tsc (optional chaining on font set).
Verified: tsc clean, build passes, prerendered index.html contains all HowItWorks copy + Locations
product copy verbatim; reduced-motion kills all new animation (incl. avoiding SMIL traveler
render); both themes carry chip/frame/rail treatments via tokens + `html:not(.dark)` guards.

## PORT 4 — RoiCalculator + Comparison (proposal 3 approved 2026-10-17, v2 after "does not look
good": flat 2×2 tiles → anchor number + stat rail; faint spotlight column → real glass column)
Mock: `WTL Sections Proposal 3.html`. User tweak: the two ROI cards must be EQUAL LENGTH →
`.roiGrid` stretch (no align-items:start) + `.ctlCard` flex-column + `.patrolNote` margin-top:auto
pinned to card bottom. Files:
- `components/site/roi-calculator.module.css` + rewritten `roi-calculator.tsx`.
  Layout: controls (5fr) stretch-flush vs ledger (7fr). Controls: mono "Network Parameters" head +
  calculator icon; custom range (hairline track w/ brand→330 fill tracking `--fill` %; 18px glass
  thumb, scale on press, webkit+moz pseudo sets; `--fill` via CSSProperties cast); enlarged mono
  value chips; ticks unchanged; patrol note anchored bottom (`margin-top:auto`).
  Ledger: hero-motif gradient-frame panel + tapeline (2px gradient sweep, remount-keyed per input
  change, display:none under reduced) + light-only washes. HIERARCHY: "Revenue Preserved" is the
  ANCHOR — clamp(30-40px) brand number + brand radial glow (::before both themes) + Users icon chip
  + caption; time/drifts/footfall = compact stat rail (hairline dividers, 28px icon chips, mono
  values + muted units); vertical hairline between; stacks at 620px. CTA row: DemoButton rounded-
  [10px] h-10 (twMerge overwrites the pill).
  Live math: rAF lerp tween on all four figures (0.22 factor, terminal threshold max(0.61,
  |target|*0.0009); results via useMemo (IDENTITY STABILITY — recomputed object in effect deps
  caused a loop); shownRef carries floats, setShown rounds; reduced → snap now. `pulse` state =
  tapeline rerun key (incremented per React onChange — React maps range `input` to onChange, so
  bump must NOT be there). `bump` state keyed remount of `.leadRow` adds .bumpAnim via key={bump};
  fired on onPointerUp/onKeyUp only (release event React can't hear natively).
- `components/site/comparison.module.css` + rewritten `comparison.tsx` (NOW 'use client' + useInView
  HTMLDivElement threshold 0.22 → data-in on .cmpWrap). Rows copy 100% verbatim (`< 45s` lives in
  the data string so `&lt;` escapes fine). Spotlight: `.wtlCol` on th+td (brand wash + inset left
  hairline), `thead .thWtl` = brand-glass header + inset bottom hairline + crown ::after that
  DRAWS (html.js scaleX0→1 1200ms delay 250ms, keyed off cmpWrap[data-in]); td light gradient via
  separate `.wtlTd` class (`:not(thead *)` inside :not = invalid — use dedicated classes instead).
  Rows rise staggered (--rd i*70ms) then chkIc glass chips pop (delay --rd+340ms); hover = brand
  wash row + inset 3px brand bar on feature cell; feature col sticky (bg gradient, z-2) for
  horizontal scroll; cell types: string → text 13px, false → muted 15px X lucide.
Verified: tsc clean; build passes; prerender has 100% of BOTH sections' copy (value chips/₹ render
as `25<!-- --> stores` React SSR markers — check copy with markers or per-node, not joined
strings; `+<b>4,500</b>` has no marker, `<` in JSX-text after space is fine inside string data).
Reduced-motion: all new animation killed; no-JS: rows/chips/crown/results all final-state.

## PORT 5 — UseCases + Faq + FinalCta/SiteFooter (proposal 4 approved 2026-10-17,
## S10 reworked twice per user "looks simple / footer very bad" → verticals rail + wordmark footer)
Mock: `WTL Sections Proposal 4.html` (S10 verticals rail, S11 answer ledger, S12 insight close,
S13 wordmark footer). Files:
- `components/site/use-cases.module.css` + rewritten `use-cases.tsx` (NOW 'use client').
  No more 6-card grid: full-width hairline ledger (mono idx + 40px brand-tint chip + name/body +
  ucGo arrow), `--rd` stagger under :global(html.js) + stage[data-in] (useInView 0.2). The ACTIVE
  row: brand inset bar drops (::before scaleY), chip halo pings once, `.rowOn .name` takes
  --grad-head (plain @supports clip-text pattern). Cursor-following glass dock: dockCard absolute
  in a stretched `.dock` column; rAF lerp (0.14) toward pointerY clamped inside dock; per-row
  pointerenter/focus/click + click sets aria-pressed; `interacted` ref pauses the 3.4s auto-cycle
  (resumes on list pointerleave; skips on `(hover: none)`, reduced, hidden doc). Per-vertical
  sample artifacts (Guard drift + 1-click revert, Engage slips/AI draft, Synapse routing — Mumbai
  data only) render TWICE: inside each row `.exp` (mobile-only grid-rows inline expand) and the
  dock (state-driven swap `key={active}` → pvIn replay). Dock glare = one-shot keyed span
  (`glare` counter); dock card opacity gated `:global(html.js) .stage[data-in='true'] .dockCard`.
  aria-hidden dock; `.badge` = Sample pill (mock sBadge); hint line aria-hidden.
- `components/site/faq.module.css` + rewritten `faq.tsx`.
  Two-col grid 4.4/7.6 gap 40 @1080 collapse; heading rail `position: sticky; top: 96px`. Items
  keep 100% verbatim Q/A; single-open accordion (openIndex number|null, 0); answers now ALWAYS
  rendered + true grid-rows animation: base `.body { grid-template-rows: 1fr }`,
  `:global(html.js) .body { 0fr }`, `:global(html.js) .itemOpen .body { 1fr }` (SSR/no-JS fully
  expanded). Numbered mono chips 01–05 tint brand when open; chevron rotates + brand; open row =
  brand border. Light + dark corner-wash `::before` (ellipse at 96% 62%).
- `components/site/closing.module.css` + rewritten `closing.tsx` (NOW 'use client' — both exports).
  FinalCta: panel keeps `bg-insight text-insight-ink` utilities + module `.panel` (spec sheen
  ::before light `.32→0 46%`, one-shot `.glareGo` keyed counter fired on useInView 0.35, radius
  via `rounded-[20px]`), `.ctaGrid` 7/5 gap 40 @1080. DemoButton `rounded-[10px] bg-ink
  text-ink-inverse shadow-raised` (twMerge overwrite); `.btnHow` anchor module (radius 10, hover
  white/14 & dark /09). Glass steps card `.card` (backdrop blur 10 saturate 1.25, dark /07-03);
  `.steps::before` rail = brand→330→72 gradient, drops 900ms delay 350 gated
  `:global(html.js) .panel[data-in='true']`; stepNums pop 500/680/860ms, `stepRise` scale .6→1.
  SiteFooter: module grid 1.7/1/1/1 @900 1fr1fr; link self-drawing underlines; fliveDot success
  pulse 3s; giant `.word` wordmark (nowrap, clamp 44px/9.4vw/116px, letter-spacing -0.045em):
  letters = spans w/ `--i` (wave stagger 22ms, cubic-bezier(.3,1.45,.45,1)) + per-letter gradient
  slices via `background-size: calc(var(--wordW)*1px)` + `background-position: calc(var(--x)*-1px)`
  — requires `.word { position: relative }` (offsetLeft is relative to offsetParent!) measured
  after mount + fonts.ready + resize; measured flag gates `styles.wordGrad` (no flash of
  invisible 0-size bg). Wave triggered on scroll-in (480ms/450ms delay) + pointerenter, classed
  `.run` via ref classList (module hashed names fine); `aria-label` on p + aria-hidden groups.
  Live IST clock (Intl en-GB Asia/Kolkata hour12:false, setState 1s, SSR `--:--:--`); flegal keeps
  BOTH legal lines verbatim (`© {new Date().getFullYear()}` renders as
  `© <!-- -->2026<!-- -->` markers — expected); circular fTop → #top (id exists on hero).
Learned this pass:
- Next/font: use `var(--font-mono)` in modules (mock "Geist Mono" literal is name-dependent).
- Scroll-behavior smooth + reduce override already in globals (no need to add).
- React namespace types (React.PointerEvent/ChangeEvent) usable without importing React.
- When a mock block's styles live in Tailwind on the original element (e.g. FinalCta panel
  `p-8 md:p-14 lg:p-16`), module replacement MUST re-declare padding → missed it on `.panel`
  (content clipped at panel edges; fixed with mock's `clamp(28px, 4.4vw, 56px)`).
Verified: tsc clean; build passes; prerender copy check: 61/62 exact strings + the © line present
behind SSR markers (verified in raw HTML). No client names anywhere (artifacts use sample Mumbai
neighbourhoods). Reduced-motion: follow/pvIn/glare/rail/nums/wordWave/fliveDot all killed;
no-JS: rows/dock/FAQ answers/steps/wordmark all final-state.

## PORT 6 — glass card pass (S14 ported to site cards only, no aurora/grain/nav)
User: "the card design that you made can be done on the cards of the main site. Only change the
card ui like that" (Proposal 5 card look: frosted translucent interior + signature rim +
blur/saturate + inset top highlight). Layout, copy, motion untouched — CSS only.
- globals.css: new tokens in `:root` AND `.dark, [data-theme="dark"]` blocks:
  `--glass-bg: oklch(1 0 0 / 0.5)` / `--glass-bg-2: oklch(1 0 0 / 0.24)` light;
  `oklch(1 0 0 / 0.065)` / `oklch(1 0 0 / 0.028)` dark. Rim always `var(--grad-frame)` border-box.
- Glass recipe applied to: problem `.pcard` (+ `[data-theme='dark'] .pcard` shadow, light
  variant block DELETED — it would have overridden the rim), problem `.well`/`.wellAlarm`
  made translucent glass-within-glass; roi `.ctlCard` + `.ledger` (frosted interior, tapeline +
  ledger::after sheen kept); comparison `.cmpCard` + `.cmpTable th` translucent (light th
  variant re-declared translucent); product-tour `.tabWrap` (rim pill) + `.tabIndicator`
  (88% raised) + `.pframe` (opaque interior KEPT — real views ship inside — rim added +
  `.ptop` becomes frosted strip).
- Already glassy, left alone: metrics `.stat`, closing `.card`, uc dock/dockCard, hero
  `.frame` — all P1/P2/P4-approved. NOT touched: hiw steps (columns, not cards), FAQ rows,
  FinalCta `.panel`, all typography/copy/motion.
- tsc not needed (CSS only); `npm run build` passes, 3/3 prerendered.
- USER CORRECTION (same session): "i wanted only the glass look and not the background color
  inside the cards. revert the background color of the cards" → interiors reverted to the
  original opaque fills (original light gradients restored in every `html:not(.dark)` block),
  all backdrop-filter/tinted fills removed, glass tokens deleted from globals. What stayed:
  the signature `--grad-frame` rim via transparent border + dual-background (border-box) trick
  on `.pcard`, `.ctlCard`, `.ledger`, `.cmpCard`, `.tabWrap`, `.pframe`. Rule going forward:
  the "glass card look" the user wants = rim-light border + highlights ONLY; never change the
  card's interior fill color.
- Duplicate-key bug: roi `.tapeline` span used `key={pulse}` and sibling `.leadRow` used
  `key={bump}` — both counters start at 0 → "two children with the same key, `0`". Fixed with
  prefixed keys `key={'tape' + pulse}` / `key={'row' + bump}`. To find this class of bug, grep
  for two *sibling* elements in the same parent keyed by independent numeric counters
  (pulse/bump/pvIn/glare/starTick).

