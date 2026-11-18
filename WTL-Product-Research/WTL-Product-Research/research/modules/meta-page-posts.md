# Module Findings — Page Posts (Meta group)

> Verified from live staging: https://app.staging.whatthelocal.com/meta-posts
> Snapshot: meta-page-posts.yml

## What it does
Facebook page-post management for the brand's Meta location pages — the Meta counterpart of Google Page Posts. Not usable in this staging workspace: no Meta pages are connected.

## Page structure (verified)
- Heading **"Meta Page Posts"**; Refresh control only (no Create button while unconnected).
- Empty state: **"No Meta pages connected"** — "Ask your admin to connect a Meta account and sync pages."

## Purpose / business problem
- Would allow scheduled/bulk posting to Facebook location pages (analogous to GBP post scheduling for Google) — local engagement at scale.

## Who uses it
- Social media / local marketing teams; agencies.

## Inputs / outputs
- Inputs: connected Meta pages; post content (presumably similar composer to Google Page Posts).
- Outputs: posts on Facebook location pages.

## AI capabilities
- None observable in empty state.

## Connections
- Meta Location Pages (prerequisite); Meta account integration (admin-level); Microsite/Reports may consume engagement data.

## Not tested (read-only policy)
- Nothing actionable.

## Unknowns
- Full feature set when connected (composer parity with GBP posts, scheduling, targeting by location).
