# Module Findings — Dashboard (homepage)

> Verified from live staging: https://app.staging.whatthelocal.com/dashboard
> Status: ✅ Inspected (deep dive done to safe extent). Screenshot: screenshots/01-dashboard-home-full.png, 02-notifications-panel.png

## What it does
Single-pane portfolio command center aggregating Google Business Profile performance for all locations of the workspace (multi-tenant org "MDRC (scale test)", 3,000 locations).

## Layout & Features (verified)
- **Greeting header** + global controls:
  - Time range: 1W / 1M / 3M / All + **comparison mode** ("vs May 22 – Aug 20" dropdown) for period-over-period deltas
  - Refresh button, **theme toggle: Soft / Ink** (two themes), Notifications bell, user avatar "SM"
- **Portfolio health** widget: score 70/100 "GOOD"; buckets Healthy 2,816 / At risk 184 / Critical 0; "last synced about 2 months ago"
- **Reviews received** widget: 16,250 in period (▼56% vs previous 37,095), weekly chart, peak marker (Peak · 2,913 on a date), axis labels
- **Ahana insight** AI card: auto-generated narrative ("Review volume fell 56%… 0 replies sent; 80% positive. <lowest-rated location> is the lowest rated") + contextual CTA "Go to Locations"
- **KPI strip:** Avg rating 4.2★ (delta vs previous) · Response rate 0% · Median reply time — · Positive sentiment 80% ("11,328 reviews analysed") · Impressions (search + maps combined)
- **Needs attention** (185 items): checklist items — "Unanswered reviews" / "Rating below 3★ <location>" / "Unverified profiles 184 (+182 more)"; each row deep-links into the relevant module (Locations/Reviews)
- **Rating distribution** bar chart: 5★ 9,855 (61%) / 4★ 3,137 (19%) / 3★ 1,330 (8%) / 1–2★ 1,928 (12%); footer: "80% 4★ and up", "0 need a reply", "4.2 Average"
- **Sentiment** widget: Positive 80% / Neutral 8% / Negative 12% of 11,328 analysed; "No themes yet" → **theme extraction** exists but requires data
- **Google visibility trend**: empty state — "Search and Maps views will chart here once Google reports them"
- **Engagement breakdown**: Search Views / Maps Views / Directions / Website Clicks / Phone Calls (all — in staging)
- **Actions trend** (weekly customer actions: Impressions, Directions, Website, Calls) + **Peak review hours** 7-day × hours heatmap ("darker = higher activity")
- **Locations table**: "Lowest rated first · 4 of 3000" preview; columns Location / WTL ID / Health / Reviews / Rating (sortable ↑) / Status / Last synced; row action "⋯"; "All 3000 →" link to Locations module

## Purpose / business problem
- Solves "spreadsheet chaos" for multi-location brands: one health score + prioritized action list instead of checking thousands of GBP listings.
- Prioritization engine: routes users to the few locations/actions that matter (low ratings, unanswered reviews, unverified profiles).

## Who uses it
- Brand/marketing managers, franchise owners, agency account managers overseeing many Google listings.

## Inputs / outputs
- Inputs: Google Business Profile API data (reviews, ratings, impressions, actions), internal health scoring, sync status.
- Outputs: KPIs, alerts, deep links; CSV-less (no export on this page).

## Connections
- Deep links → Locations (`/listings`), Reviews, Profile Guard (unverified profiles / proposed edits), Reports (presumably).
- Notifications panel (verified):
  - "20,388 reviews need a reply → Open Reviews to answer them" → Reviews
  - "38 profile edits to approve — Google proposed changes to your listings" → **Profile Guard** approval queue (Google proposed edits workflow)
  - "Nightly sync finished — 3000 locations synced" (timestamped 29 Sept) → **nightly Google sync job** exists

## AI capabilities
- "Ahana" = AI insight persona producing natural-language portfolio insights + recommended next action.
- Sentiment analysis (positive/neutral/negative shares) and theme extraction ("No themes yet").

## Integrations
- Google Business Profile / Google Maps API (visibility, actions, reviews). Sync cadence: nightly.

## Unknowns
- Whether time-range/comparison changes persist per user.
- Health score formula (weights of verified status, replies, completeness, etc.).
- How "At risk" vs "Critical" thresholds are defined.
- Ahana's data sources and generation cadence.
