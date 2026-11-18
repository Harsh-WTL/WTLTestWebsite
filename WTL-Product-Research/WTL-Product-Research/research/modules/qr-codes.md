# Module Findings — QR Codes (Google group)

> Verified from live staging: https://app.staging.whatthelocal.com/qr-codes
> Snapshots: qr-codes.yml, qr-custom-template.yml · Screenshots: 21-qr-single.png

## What it does
Generates **printable QR codes that deep-link each location's Google review page**, for physical placement (counters, tables, standees) to drive review volume per location.

## Tabs (verified)
1. **Single Location** — location dropdown (format `[WTL-L-####] Name — City`, all 3,000 listed) → "Choose a Design — <location>": "Each design links straight to this location's Google review page". **5 designs**:
   - *Minimal White* — "Clean white card, perfect for counters"
   - *Brand Accent* — "Client logo & brand colors"
   - *Table Card (A5)* — "Print-ready for table tents"
   - *Dark Premium* — "Elegant dark theme, gold accents"
   - *Standee* — "Vertical standee format, bold"
   Each design has **PNG** (download) and **Print** buttons. (Downloads not triggered.)
2. **Batch Generate** — for bulk printing: search locations, design selector (same 5 designs, Minimal White default), and a full selectable table of all 3,000 locations: columns **Select-all checkbox / Store Code / Store Name / City / State / Review URL** (Review URL column shows status "Available" — presumably the deep link status per location). Designed for selecting many locations and generating one asset pack.
3. **Custom Template** — "Upload Your Template Design": "Upload a poster or standee artwork; place the QR code and address on it." PNG or JPG, A4 or A5 recommended. I.e., brand-supplied artwork onto which WTL composites the QR + address.
4. **Scan Tracking** — labeled **"Soon"** (roadmap feature: track QR scans).

## Purpose / business problem
- Reviews drive local SEO and conversion; physically placed review QR codes at each branch are a proven volume driver. Doing this per-branch manually (design, QR, print) doesn't scale; this generates brandable, per-location review QR assets at portfolio scale.

## Who uses it
- Marketing teams, print/POS vendors, franchise ops; agencies producing collateral.

## Inputs / outputs
- Inputs: location (review URL derived from Google listing), design choice, optional uploaded artwork (Custom Template), batch selection.
- Outputs: PNG files / print sheets per design; (future) scan analytics.

## AI capabilities
- None.

## Connections
- Locations (store codes, WTL IDs, review URLs); Reviews module (the QR targets the same Google review pages whose inflow Reviews manages); Batch flow mirrors Locations filters.

## Not tested (read-only policy)
- PNG/Print downloads, batch generation, template upload.

## Unknowns
- Exact review URL construction (Google review short-link vs WTL redirect — "Scan Tracking Soon" implies a WTL-hosted redirect may be planned).
- Output formats beyond PNG (PDF for print?), ZIP packaging of batch results.
