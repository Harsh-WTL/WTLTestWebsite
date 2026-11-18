# Module Findings — Microsite

> Verified from live staging: https://app.staging.whatthelocal.com/microsite
> Screenshots: 23-microsite-step2.png, 24-microsite-step3.png

## What it does
**Bulk generator of public per-location web pages (microsites)** — each location gets its own public website with content from a configurable template, data auto-pulled from the location's Google Business Profile. Targeted at brands that want a landing page per branch.

## 3-step wizard (verified; navigated through steps 1–3, nothing generated)
### Step 1 — Industry & Template
- "What's your industry?" — chips: **Retail / Fashion, Automotive, Bank / NBFC, Healthcare / Diagnostics, QSR / Restaurant** ("This helps us tailor the template suggestions for your business"). Healthcare/Diagnostics selected for exploration (local UI state only; no save).

### Step 2 — Sections & Content
- "Choose Sections & Add Content — Toggle sections on/off, rename them, and upload content. You can always edit these later."
- **10 sections**, each with enable switch + rename + configure affordances:
  1. **Banners** — hero carousel images
  2. **Lead Form** — "Configure enquiry form fields"
  3. **Products / Collection** — products with images, prices, categories (**CSV supported**)
  4. **About Us** — text and image
  5. **Our Services** — list of services
  6. **Social Links & Posts** — "Social handles for scraping and featured posts"
  7. **Gallery** — "**Auto-pulled from Google Business Profile per location**"
  8. **FAQs**
  9. **News & Articles** — blog posts
  10. **Quick Links** — custom link cards

### Step 3 — Generate & Preview
- "Generate Microsites — Select the locations you want to create microsites for. Each location will get its own public page with data pulled from your Google Business Profile."
- "Data pulled from GMB for each site: Business name, address, phone number, and operating hours will be automatically imported from your Google Business Profile."
- Location multi-select with **Select All (3000 locations)** + per-location rows (name, city, full address, phone).
- Final **Generate** action NOT triggered (would create public pages — read-only policy).

## Purpose / business problem
- Brands need a local web presence per branch but can't build thousands of sites; GBP-only presence limits SEO. This auto-builds branded per-location pages from master config + GBP data, including lead capture (Lead Form) — a local-SEO lead-gen engine.

## Who uses it
- Marketing/web teams; franchise brands; agencies; diagnostics/retail/QSR chains.

## Inputs / outputs
- Inputs: industry, template, section config/content (incl. CSV product lists, banners, lead-form fields), target locations.
- Outputs: public microsite per location; lead submissions (Lead Form); gallery content from GBP photos.

## AI capabilities
- None explicitly labeled AI on the screens visited ("Generate" is template+data composition; whether AI copywriting is involved is unknown).

## Connections
- Google Business Profile (auto-import: name, address, phone, hours, gallery photos).
- Locations (target selection); Lead Form → likely feeds leads into the product or a CRM (destination unknown).
- Social Links & Posts section implies social scraping (connected Meta/Instagram handles).

## Not tested (read-only policy)
- Generate (final step), section configuration dialogs, template gallery.

## Unknowns
- Where microsites are hosted / URL pattern; whether Generate publishes immediately or drafts; lead routing; per-location overrides vs workspace-level config.
