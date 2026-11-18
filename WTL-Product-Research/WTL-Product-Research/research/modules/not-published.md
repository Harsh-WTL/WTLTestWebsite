# Module Findings — Not Published (Google group)

> Verified from live staging: https://app.staging.whatthelocal.com/under-review
> Screenshots: 19-not-published.png
> Anonymization: phone numbers observed on-screen are scale-test data; not recorded here.

## What it does
Tracks **edits the brand sent to Google that Google has not published** (still reviewing, declined, or silently held), and supports escalating stuck fields to Google support ("raise with support"). It reconciles three values per field: what you sent, what Google currently holds, and what the public sees.

## Page structure (verified)
- Heading: **"Not Published by Google"**; buttons: **Check now** (re-check publication status — NOT clicked), **Raise with support** (bulk escalation — NOT clicked).
- **KPIs**: Locations affected 38 · Fields not published 38 · Last checked "about 2 months ago".
- **Section 1 — "Changes you sent to Google, last 60 days"** (table): columns Listing / Field / You sent / Google holds / Public sees / Sent / Status. Statuses observed: **"Google is reviewing"**, **"Not accepted"**, **"Published"**. Copy: "Each change and what Google did with it. The same status shows on the listing's page."
- **"What this means"** explainer (verbatim points):
  - "Under review means Google is still deciding. Not accepted means it declined the change."
  - "Do not re-edit the same field while it is under review; that restarts the clock."
  - "If Google reverted a value you did not send, decide in Profile Guard." (cross-module link)
  - "If a field has waited more than a week, raise it with support from here."
- **Section 2 — Per-location rows** (filter box: "Filter by location, field or value"): each row = Location + city, **diagnosis text**: "Likely declined: unpublished for over 7 days while the public sees a different value. Google never says so outright. Change the detail to the public value, or to one Google accepts, and this row clears." — plus field-level detail (e.g., "Phone numbers: <sent value> · public sees <public value>"), **Since** date, **Last checked** ("about 2 months ago"), and a **Raise** button (support escalation per row — NOT clicked).

## Purpose / business problem
- Google's edit pipeline is opaque: edits can sit "under review" indefinitely or be declined without explanation, and Google never says outright that a field is declined. This module makes the invisible visible (sent vs held vs public), diagnoses "likely declined" heuristically, and offers a support-escalation path — so listings actually show the brand's data.

## Who uses it
- Listing operations teams; support staff handling Google escalations; agencies.

## Inputs / outputs
- Inputs: edit history sent to Google (last 60 days), Google-held values, publicly visible values, timestamps.
- Outputs: status per change, per-location unpublished diagnosis, support escalation tickets ("Raise"), re-check jobs ("Check now").

## AI capabilities
- None labeled AI on-screen. The "Likely declined" diagnosis reads as heuristic/rule-based (>7 days + mismatch with public value).

## Connections
- **Profile Guard** (explicit cross-reference for Google-reverted values).
- Locations detail (same status shown on the listing's page).
- Support module (Raise/Raise with support presumably creates a case — see Support Cases module).

## Not tested (read-only policy)
- Check now, Raise / Raise with support (would create support actions).

## Unknowns
- What "Raise" actually creates (ticket to WTL support vs direct Google escalation channel).
- Whether "Check now" re-checks all 38 locations or just filtered ones.
