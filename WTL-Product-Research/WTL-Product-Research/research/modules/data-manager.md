# Module Findings — Data Manager (Google group)

> Verified from live staging: https://app.staging.whatthelocal.com/data-manager
> Snapshot: data-manager.yml

## What it does
Bulk location-data management: upload a master spreadsheet (Excel `.xlsx` or CSV) of location data, or browse & edit locations directly in-app without uploading.

## Page structure (verified)
- Heading **Data Manager**.
- **Upload card**: "Upload your master location data — Drag and drop an Excel (.xlsx) or CSV file, or click to browse". Buttons: **Choose File**, **Download Sample** (sample template; download not triggered).
- Link: **"Or browse & edit locations directly without uploading"** (→ Locations module).
- **"Expected columns (flexible matching)"** — 20 documented columns: Store Code, Name / Title, Phone, Website, Description, Address Line 1, Address Line 2, City, State, Pincode, Monday Hours … Sunday Hours (per-day hours as text columns).

## Purpose / business problem
- Brands maintain location data in spreadsheets/other systems; this gives an import path to onboard or update hundreds/thousands of locations at once, plus a no-upload direct-edit path. "Flexible matching" lowers format friction.

## Who uses it
- Ops/IT teams running bulk onboarding or periodic data refreshes; agencies migrating clients.

## Inputs / outputs
- Inputs: xlsx/CSV master file (20-column schema incl. per-day hours), or direct edits.
- Outputs: created/updated locations (which then sync to Google via the platform's sync pipeline — connection implied, not verified on-screen).

## AI capabilities
- None observed on this screen.

## Connections
- Locations module (direct-edit link; imported rows become locations).
- Google sync / AI Location Studio "Bulk Import" (likely related pipelines).
- Attribute/service/category data are NOT in the 20 columns — rich fields presumably set per location afterwards.

## Not tested (read-only policy)
- Choose File/upload, Download Sample.

## Unknowns
- Post-upload mapping/preview/validation UI; create-vs-update semantics (match key = Store Code?); error reporting format.
