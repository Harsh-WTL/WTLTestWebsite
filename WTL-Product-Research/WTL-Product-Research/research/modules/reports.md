# Module Findings — Reports (Insights group)

> Verified from live staging: https://app.staging.whatthelocal.com/reports/locations
> Snapshots: reports.yml, reports-scheduled.yml

## What it does
On-demand and scheduled **CSV reporting across the portfolio** with 5 report types, date-range/state/city filters, period comparison, and per-location result tables.

## Common controls (verified)
- **Report type tabs**: Performance · Reviews · Review Summary · Profile Protection · Location Status.
- **Date range**: Today / Yesterday / Last 7 Days / Last 30 Days (default) / This Month / Last Month / Last Quarter / Custom Range; From–To date fields (2026-10-20 → 2026-11-18 default).
- **Filters**: All States (25 states/UTs) + All Cities (~60 cities).
- **Compare toggle**: Previous Period / Year over Year / Custom Period (dropdown enabled when Compare on).
- **Generate Report** (computes; verified — writes no business data) and **Download CSV** (enabled after generation).
- Results table: "Search in results…", sortable headers.

## The 5 report types (columns/KPIs verified)
1. **Performance** — "Views, clicks, calls & directions". KPIs: Total Impressions, Website Clicks, Phone Calls, Direction Requests. Columns: Store Code, Store Name, City, State, Search Views, Maps Views, Total Impressions, Website Clicks, Phone Calls, Directions, **Bookings, Conversations**.
2. **Reviews** — "Individual review content & replies". KPIs: Total Reviews, Avg Rating, Replied, (+1). Columns: Store Code, Store Name, Reviewer, Rating, Review, Date, Sentiment, Reply, **AI Reply**.
3. **Review Summary** — "Aggregated ratings & sentiment per location". KPIs: Locations, Total Reviews, Avg Rating, Reply Rate. Columns: Store Code, Store Name, City, State, Total Reviews, Avg Rating, 5★/4★/3★/2★/1★ counts, Positive %, Neutral %, Negative %, Replied %.
4. **Profile Protection** — "Edit alerts & risk assessment". KPIs: Total Alerts, Pending, High/Critical Risk, Rejected. Columns: Store Code, Store Name, **Field Modified, Old Value, New Value, Risk, AI Reason**, Status, Detected. → **"AI Reason" column: the AI edit analysis is surfaced in reports.**
5. **Location Status** — "Location overview & sync health". KPIs: Total Locations, Verified, Avg Rating, (+1). Columns: Store Code, Store Name, City, State, Phone, Verified, Active, Last Synced, Reviews, Avg Rating.

## Metric Breakdown chart
- "This period vs previous, by metric" with This/Previous columns; states "No report yet — Generate a report to draw the chart" / "No data for this period — Nothing was recorded for these locations in the range".

## Scheduled Reports panel (verified, empty)
- "Configure recurring reports delivered as CSV to specified email addresses"; table: Name, Type, Frequency, Recipients, Last Sent, Status; **New Schedule** button (NOT clicked).

## Verified behavior
- Generate Report ran successfully (Performance, Last 30 Days and Last Quarter): KPIs computed to **0** and "No data for this period — Nothing was recorded for these locations in the range" — Google performance metric ingestion has no data in staging for recent ranges (consistent with ~2-month sync lag / no metric ingest). The reporting pipeline itself works.

## Purpose / business problem
- Executives need periodic portfolio rollups (per-location performance, reviews, protection, health) delivered by email; manual export doesn't scale or recur.

## Who uses it
- Leadership/analysts; agencies reporting to clients; ops reviews.

## Inputs / outputs
- Inputs: report type, date range, geography filters, comparison period; schedule config (recipients, frequency).
- Outputs: on-screen tables + charts, CSV downloads, scheduled email CSV deliveries.

## AI capabilities
- AI Reply column (Reviews) and **AI Reason** column (Profile Protection) — surfaces AI outputs in reports. No AI generation in Reports itself.

## Connections
- Reviews, Profile Guard, Locations (sync health), Google Business Profile performance metrics; email delivery for schedules.

## Unknowns
- New Schedule form fields (frequency options, report types allowed); whether Bookings/Conversations map to GBP or other channels.
