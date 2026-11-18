# Module Findings — Activity (Account group)

> Verified from live staging: https://app.staging.whatthelocal.com/activity
> Snapshot: activity.yml

## What it does
**Audit log** of everything done in the workspace — by people and (implicitly) the system — with searchable/filterable timeline.

## Page structure (verified)
- Heading **Activity**; search: "Search person, action, location or value".
- **Person filter** (Everyone + all team members, name + email).
- **Action category filter**: All actions / **Listings / Posts / Reviews / Profile Guard / Team / Settings / Google account / Support / Engage** ← confirms "Engage" is a live product category.
- Table columns: **When** (timestamp + relative), **Who** (name + email), **What** (action + detail), **Where** (location).
- Pagination: **50 per page** + "Load older" button.

## Observed event types (verified)
- **Approved a Google change** — with field diff (e.g., "Business Hours: Mon 09:30–19:30; … → Mon 10:00–18:00; …") + location (Profile Guard decision trail)
- **Rejected a Google change** — e.g., "Website: https://… → (empty)"
- **Edited a listing** — "Phone: 098765 43210 → 099887 76655"
- **Published a post** — with the post text ("Festive offer this week. Walk in for a free check-up.")
- **Replied to a review** — with reply text ("Thank you for your feedback!")
- **Removed a team member**
- System/test entries: "prepush sweep", "phase7 probe" (engineering artifacts in staging)

## Purpose / business problem
- Accountability across a large team: who changed what listing, who replied to which review, who approved/rejected Google changes, who published what — for compliance, disputes, and onboarding forensics.

## Who uses it
- Admins/owners; support investigating incidents; compliance.

## Inputs / outputs
- Inputs: user actions across all modules (+ system jobs).
- Outputs: searchable/filterable audit trail.

## AI capabilities
- None (pure log).

## Connections
- All modules write events here; Profile Guard decisions, Reviews replies, Posts publishing, User Management changes all appear.

## Unknowns
- Retention period; whether Engage events (inbox replies, DMs) are logged once that area is active; export capability.
