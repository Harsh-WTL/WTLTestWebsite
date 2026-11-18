# Module Findings — Locations (Google group)

> Verified from live staging: https://app.staging.whatthelocal.com/listings
> Screenshots: 03-locations-list.png, 04-row-context-menu.png, 05-location-detail-overview.png, 06-location-detail-analytics.png, 07-location-edit-tab.png, 08-locations-grid-view.png

## What it does
Central registry and **Google Business Profile (GBP) listing editor** for every physical location in the workspace ("Google Locations" is the page H1). Full CRUD toward GBP (subject to Google restrictions), bulk operations, CSV export.

## List page (verified)
- **KPI cards:** Total locations 3,000 · Verified **0** · Pending 184 · Unverified 2,816 ("▼ needs action") · Avg health 63%
  - ⚠️ Data inconsistency: rows show many "✓ Verified" but the Verified KPI card reads 0 — either a staging data bug or different verification definition; flagged as open question.
- **Search:** free text "Search by name, city, ID…"
- **Filters (all verified):**
  - Status: All / Verified / Pending / Unverified / **Duplicate** / **Suspended** (implies detection of duplicate & suspended listings)
  - City: ~60 Indian cities
  - State: 24 Indian states/UTs
  - Zone: North / South / East / West (internal region grouping)
  - Account: `[SCALE] MDRC North / South / East & West` (Google accounts / groups)
- **View modes:** List (table) and **Grid** (cards)
- **Table columns:** multi-select checkbox · Store code (`MDRC-S-#####`) · Location name + address line · City · Zone · Status (✓ Verified / ◷ Pending / ✕ Unverified) · Rating · Health % · row "⋯" menu (View details / **Delete**)
- WTL ID (`WTL-L-####`) is exposed as row tooltip/aria-label
- **Pagination:** 50 per page, 60 pages for 3,000 locations
- **Export CSV** button (top right) — download/export of the location set. NOTE: triggering it produced no visible result and a burst of console errors; export behavior unverified.

## Grid card contents (verified)
Status chip · city · store code · PIN code · name · "Diagnostic center · <State>" (category) · account group label · street address · phone · website link · reviews ("No reviews" or ★ rating) · **"View online" deep link to Google Maps** (`https://maps.google.com/maps?cid=<GBP cid>`) · health %

## Location detail page (verified) — URL pattern `/listings?locationId=<internal-UUID>`
Tabs: **Overview / Analytics / Media / Services / Edit**. Header: Back, name, verified chip, "City, State · Primary category · Store code · Account group", Edit button, "Add photos or videos".
KPI header cards: Avg rating (+review count), Health % (+ "13 issues"), Verification status + "Synced <date>", Media count.

### Overview tab — field groups (all read here, editable via per-card Edit buttons)
- **Core identity:** Business name, Primary category, Open status, Store code, Opening date, Additional categories
- **Contact & location:** Address (line, city, state, PIN, IN), Coordinates (lat/long), Phone, Additional phones, **AdWords phone**, Website, **Appointment link**, **WhatsApp URL**
- **Business hours:** per-day open/close times + **Special hours** ("No special dates set")
- **Description:** long description + Short name
- **Profile photos:** Logo & Cover (not set)
- **Identifiers & metadata:** WTL ID, **Google location ID** (`locations/<id>`), **Place ID** (`ChIJ…`), Region code (IN), PIN code, Last synced (29 Sep, 00:22), **Labels** (e.g. `scale-test-mdrc` — GBP labels), Service area
- **Services:** "0 on the listing" + Edit services
- **Attributes** (Google attribute model, toggle chips ✓/✕): Service options (Dine-in, Takeaway, Delivery, Drive-through, Curbside Pickup, Online Appointments, Online Estimates, On-site Services, Online/Telehealth) · Amenities & accessibility (Wi-Fi…Multilingual Staff) · Payment methods (Cash, Credit/Debit Cards, NFC, **UPI**) · Business highlights (Women-led, Veteran-led, …ownership attributes) · Parking (Free/Paid/Street/Garage/Valet/None)

### Analytics tab
"Performance Analytics" with 7d/30d/90d ranges; currently error state: "No analytics data available — Edge Function returned a non-2xx status code" (staging backend issue).

### Media tab
Additional photos & videos (0 uploaded); **upload constraints shown in UI:** Photos JPG/PNG ≤5 MB; Videos MP4/MOV ≤30 s, ≤75 MB, 720p+; Google reviews videos before display (up to 48 h).

### Services tab (reveals sync architecture)
- Header: "Services — Our copy from 29 Sep, 00:22" + **"Read again"** button (re-fetch from Google)
- Semantics explained in-UI: "Saving sends the whole list: a service removed here is removed on Google" (full-list replace, not incremental)
- Warning states observed:
  - "Google could not be read just now, so this is our last copy" — **"Backend not configured: No refresh token found"** (reveals Google OAuth refresh-token storage issue in staging)
  - "Google does not let this listing change its services — depends on the listing's category and its state on Google" (Google-imposed edit restrictions surfaced to user)
- "No services on this listing yet"

### Edit tab (form inspected; NOT saved)
Full GBP editing form: Profile Photos (Logo 720×720 1:1 ≤5 MB; Cover 1080×608 16:9 ≤5 MB), Basic info (name, store code, open-status switch, opening date picker, primary + additional categories), Contact (phone, additional phones, website, appointment link, **WhatsApp number builder** `wa.me/<number>`), Labels, Description (750-char counter; currently 128), Address (lines, city, state, PIN, country), Coordinates (lat/lng spinbuttons), Business hours (per-day open switches + times), Special hours / date closures (Add Date), Service options / Amenities / Parking / Payment methods / Business highlights (checkbox chips), **Save Changes** button.

## Purpose / business problem
- Single source of truth for thousands of GBP listings; find-and-fix workflow (status/health filters), bulk visibility, and profile completeness/accuracy management without visiting Google directly.
- Handles Google-specific quirks in-UI (verification states, Google-blocked edits, full-replace service sync, media review delays).

## Who uses it
- Listing/profile managers, marketing ops, franchise admins; agency staff managing many brands.

## Inputs / outputs
- Inputs: GBP API listings (identity, attributes, hours, media, services), nightly sync, health computation.
- Outputs: edits pushed to Google; CSV export; detail views; deep links to Google Maps.

## Connections
- Dashboard "Needs attention" → Unverified profiles land here (status filter).
- Profile Guard: proposed Google edits approval (related workflow).
- Reviews: per-location reviews; location detail links to them (0 reviews here).
- QR Codes: per-location presumably (QR to review page).
- Services tab shows OAuth/refresh-token dependency with Google account connection.

## AI capabilities
- None observed in this module (no AI buttons). AI lives in AI Location Studio / Reviews / Ahana.

## Integrations
- **Google Business Profile API** (locations, attributes, hours, services, media, verification, reporting).
- Backend: **Supabase** (project emvqfdwrbdhyrqlozccg) + **Edge Functions** — e.g. `get-location-media` (returned 500 + ERR_INSUFFICIENT_RESOURCES when grid rendered many cards at once — staging scale bug).
- Google Maps `cid` deep links for "View online".

## Technical/quality observations (staging)
- Verified KPI = 0 while rows show Verified (data bug or definitional mismatch).
- Media edge function called per card → resource exhaustion at 50-card grid.
- "No refresh token found" — Google OAuth connection partially unconfigured in staging.

## Unknowns
- Bulk actions when multiple rows selected (did not select rows to avoid accidental bulk ops).
- "13 issues" list content (not clickable; what issues compose the health score).
- Delete flow (deliberately not executed) — soft vs hard delete, Google removal.
- Export CSV output/fields.
- How Duplicate/Suspended statuses get detected and displayed.
