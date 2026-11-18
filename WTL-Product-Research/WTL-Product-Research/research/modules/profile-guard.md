# Module Findings — Profile Guard (Google group)

> Verified from live staging: https://app.staging.whatthelocal.com/profile-guard
> Screenshots: 17-profile-guard-list.png

## What it does
Moderation queue for **third-party edits to Google Business Profile listings** (e.g., Google itself, or suggestions from the public). Shows what changed field-by-field, with risk scoring, and lets the brand approve/reject each change (or auto-reject everything).

## Page structure (verified)
- Header: **Profile Guard**; **Export CSV**; **Scan Now** (re-scan for new third-party edits — NOT triggered per read-only policy).
- **Auto-reject all edits** master switch: "Automatically revert any third-party changes to your listings" (observed unchecked; NOT toggled).
- **KPI cards**: Total Edits 5 · Pending 4 · Approved 1 · Rejected 0 · Auto-Blocked 0 · **High Risk 1**.
- **Search** ("Search location or field…") + filters: **Status** (All/Pending/Approved/Rejected/Auto-Blocked) and **Risk** (All/Critical/High/Medium/Low).
- **Bulk actions**: "Approve All (4)" and "Reject All (4)" (NOT used).
- **Edit cards** (anatomy verified):
  - Location name + city ("MDRC (scale test) Bhopal Airport Road · Bhopal")
  - Risk chip: ▲ High / Medium / Low (4 levels incl. Critical)
  - Source: **"Google Update"**; status: ◷ Pending / ✓ Approved
  - Timestamp (e.g., "Oct 5, 11:59 PM")
  - Changed **field** shown as technical GBP paths: `specialHours`, `openInfo.status`, `attributes.has_wheelchair_accessible_entrance`, `categories.additionalCategories`, `Business Hours`
  - **Was / Now diff** (e.g., "Was: OPEN / Now: CLOSED_TEMPORARILY"; "Was: Medical laboratory / Now: Blood testing service, Medical laboratory")
  - Per-card **Approve** / **Reject** buttons (NOT used).

## Purpose / business problem
- Anyone can suggest edits to a Google listing and Google itself can change fields; malicious or accidental edits (closed status, removed attributes, changed hours) damage lead flow. Profile Guard detects these changes and gives the brand one-click control to keep listings correct — critical at 100s–1000s of locations.

## Who uses it
- Listing/ops managers; franchise brand guardians; agencies.

## Inputs / outputs
- Inputs: Google-side edit events per location (field, before/after, timestamp), risk classification.
- Outputs: approve/reject decisions pushed to Google, auto-reject policy, CSV export, audit trail (Approved/Rejected/Auto-Blocked counts).

- **Edit Detail dialog** (opened by clicking a card; verified): title "Edit Detail", subtitle "Location · City · detected Oct 5, 11:59 PM"; definition list **Field / Previous Value / New Value**; **AI Analysis** section (✦ icon) with a plain-language explanation — e.g., "Open status: Google marked the listing temporarily closed"; footer note "Detected Oct 5, 2026, 11:59:20 PM **by the edit scan**"; Approve/Reject buttons also present here.

## AI capabilities
- **AI Analysis** of each detected edit: plain-language explanation of what the change means (verified in Edit Detail dialog).
- **Risk scoring** of incoming edits (Critical/High/Medium/Low) — classification logic present (AI involvement plausible but not labeled AI on-screen).
- **Auto-Blocked** status exists (changes auto-rejected by policy/engine).
- Detection via a scheduled **edit scan** ("by the edit scan" footer).

## Connections
- Dashboard notification: "38 profile edits to approve — Google proposed changes → Open Profile Guard".
- Locations module (per-location listing state); nightly sync job surfaces these edits.

## Not tested (read-only policy)
- Scan Now, Auto-reject toggle, Approve/Reject (any), Approve All / Reject All, Export CSV.

## Unknowns
- Exact risk-scoring criteria; who/what counts as edit source besides "Google Update" (public suggestions? owner suggestions?).
- Whether rejected edits are pushed back to Google as restorations or held.
- Relationship between "Auto-Blocked" and "Auto-reject all edits".
