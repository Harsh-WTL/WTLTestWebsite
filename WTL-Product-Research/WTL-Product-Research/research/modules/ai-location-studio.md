# Module Findings — AI Location Studio (Google group)

> Verified from live staging: https://app.staging.whatthelocal.com/ai-audit
> Screenshots: 15-studio-audit-tab.png, 16-studio-create-location.png

## What it does
Three-part module for **listing completeness / AI visibility**:
1. **Scorecard** — AI-powered "AI score" measuring how well listings would surface in AI answers (e.g., AI assistants reading Google listings), plus per-field completeness gap analysis across the portfolio.
2. **Audit** — nightly AI audit of listings (scheduled ~2:30 am) producing change/ranking recommendations.
3. **Create location** — a full guided form to draft a new Google Business Profile listing (single or bulk) and push it to Google directly.

## Tab 1 — Scorecard (verified)
- **AI score card**: "AI score" with a live reading state ("Reading your listings…"), and a **Generate score** button (disabled while reading). Score currently not computed in staging (aggregate loading).
- **"What's missing across your listings"** — per-field completeness counters `filled / 3000`. Fields verified: **Verification, Photos, Additional Categories, Appointment Link, Logo, Opening Date, WhatsApp URL, Special Hours, Cover Photo, Q&A / FAQs** (with a "show all" expansion; total tracked fields ≈13). In this scale-test workspace all counters read 0/3000 (synthetic data has empty fields), so completeness % is 0.

## Tab 2 — Audit (verified)
- Presents results of a scheduled nightly AI audit of listings (**2:30 am** job) — change suggestions and ranking recommendations per the page copy. No audit runs were triggered; results were read-only.

## Tab 3 — Create location (verified; nothing submitted)
Full GBP-listing creation wizard with sticky summary rail:
- **1. Where it goes**: Google **Business account** dropdown (lists the workspace's accounts: `[SCALE] MDRC East & West / North / South`); mode: **Single Location** or **Bulk Import**.
- **2. The basics**: Business name*, Store code, Primary category* (picker), Additional categories, Opening date, Open status toggle.
- **3. Contact**: Phone*, Additional phones, Website, AdWords phone, WhatsApp URL (click-to-chat), Appointment link (e.g., Calendly).
- **4. Address**: Address lines 1–2, City*, State* (full Indian states list incl. UTs), PIN*, Country (IN), Latitude*, Longitude* (map pin required).
- **5. Hours**: per-day Mon–Sun open toggles ("Set Monday, then copy it to Tuesday to Friday"), Closed default; **Special hours** free-text (`2025-12-25: X, 2025-01-01: 10:00-16:00` format).
- **6. Description & photos**: Description 0/750 chars; Logo (720×720 PNG/JPG ≤5 MB), Cover photo (1080×608 16:9 ≤5 MB), More photos (up to 10, 5 MB each); Labels (comma-separated).
- **7. Services**: "The tests and services this location offers" — populated from the chosen primary category ("Google's ready-made services depend on it").
- **8. Attributes**: tap-chips grouped as Service Options (Dine-in, Takeaway, Delivery, Drive-through, Curbside Pickup, Online Appointments/Estimates, On-site Services, Online/Telehealth), Amenities & Accessibility (Wi-Fi, Restroom, Wheelchair*, Gender Neutral Restroom, Changing Table, Live Music, Outdoor Seating, TV, Fireplace, A/C, Dogs Allowed, Kids Friendly, Smoking Allowed, Gym, Pool, LGBTQ+ Friendly, Multilingual Staff), Parking (Free/Paid/Street/Garage/Valet/None), Payment Methods (Cash, Credit, Debit, NFC/Mobile, **UPI**), Business Highlights (Women-led, Veteran-led, Black-owned, LGBTQ+ owned, Asian-owned, Latino-owned, Indigenous-owned, Family-owned, Small Business).
- **Summary rail** ("Your new location"): live checklist of the 9 required fields (Business account, Business name, Primary category, Phone, Address line 1, City, State, PIN, Map pin) + counters (0 days open / 0 photos / 0 services / 0 attributes); **Create on Google** button disabled until complete ("9 required fields to go"). Copy: "The listing is created on Google straight away and appears under Locations once Google accepts it."

## Purpose / business problem
- Brands' listings are often incomplete, which hurts both Google ranking and visibility inside AI assistants (which read listing fields). This module quantifies the gap (scorecard/audit) and removes friction to fix it (guided creation incl. bulk import).

## Who uses it
- Marketing/ops teams onboarding new branches; agencies running listing completeness programs.

## Inputs / outputs
- Inputs: listing fields, Google accounts, photos, category.
- Outputs: new GBP locations created directly on Google (appear under Locations after Google accepts), completeness metrics, AI score, audit recommendations.

## Connections
- Locations module (new listings land there; same field model & attribute chips as location Edit form).
- Dashboard (listing-health signals); Data Manager (bulk import path likely shared).

## AI capabilities
- AI score generation; nightly AI audit recommendations. (Score generation could not complete in staging.)

## Unknowns
- Exact AI score scale/algorithm and what inputs it weights; audit recommendation format (couldn't see a completed run).
- Bulk Import flow details (file format, mapping) — not opened to avoid import actions.
- The full 13-field list (10 verified).
