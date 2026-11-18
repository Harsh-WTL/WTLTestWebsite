# Module Findings — Location Pages (Meta group)

> Verified from live staging: https://app.staging.whatthelocal.com/meta-pages
> Snapshot: meta-location-pages.yml

## What it does
Management of **Facebook location pages** (one per business location), the Meta counterpart of Google Locations. Not usable in this staging workspace because no Meta account is connected.

## Page structure (verified)
- Heading **"Meta Pages"**; **"Create location page"** button — **disabled** while unconnected.
- Empty state: **"No Meta pages connected yet"** — "Ask your admin to connect a Meta account and sync pages."

## Purpose / business problem
- Multi-location brands need a Facebook page per branch for local presence, local posts, and local ads; this module would let teams create/manage/sync those pages at scale from the same location master data used for Google.

## Who uses it
- Social/local marketing teams; agencies managing Meta presence for multi-branch brands.

## Inputs / outputs
- Inputs: Meta (Facebook) account connection + page sync; location master data.
- Outputs: location pages on Facebook; presumably page posts, ratings, and page health data.

## AI capabilities
- None observable in empty state.

## Connections
- Meta account integration (admin-level, not connected in this workspace).
- Location master data (same source as Google Locations); Meta Page Posts module depends on these pages.

## Not tested (read-only policy)
- Nothing actionable (Create disabled).

## Unknowns
- Full feature set when connected (page creation flow, page health metrics, sync direction and frequency, roles/permissions, ratings/reviews handling).
