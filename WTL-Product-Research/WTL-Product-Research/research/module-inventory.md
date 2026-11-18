# What The Local — Module Inventory

> Source of truth for the complete discovered navigation.
> Verified from live staging dashboard: https://app.staging.whatthelocal.com/dashboard
> Logged-in workspace: "MDRC (scale test)" — 3,000 locations (scale test data, anonymized examples required).
> Last updated: 2026-11-18

## Top-Level Areas (workspace switcher row)
Three top-level mode buttons appear above the grouped sidebar nav:
1. **Locations** — TBD (route/behavior under investigation)
2. **Engage** — TBD
3. **Ads** — TBD

⚠️ These three are separate "areas" of the app; the grouped sidebar may change depending on the active area. To be verified.

## Grouped Sidebar Navigation

| # | Group | Module | Badge/Count | Route | Status |
|---|-------|--------|-------------|-------|--------|
| 1 | — | Dashboard | — | /dashboard | ✅ deep dive done |
| 2 | Google | Locations | 3000 | /listings | ✅ deep dive done |
| 3 | Google | Reviews | 20388 | /reviews | ✅ deep dive done |
| 4 | Google | Page Posts | — | /posts | ✅ deep dive done |
| 5 | Google | AI Location Studio | — | /ai-audit | ✅ deep dive done |
| 6 | Google | Profile Guard | — | /profile-guard | ✅ deep dive done |
| 7 | Google | Not Published | — | /under-review | ✅ deep dive done |
| 8 | Google | Support Cases | — | /google-cases | ✅ deep dive done |
| 9 | Google | QR Codes | — | /qr-codes | ✅ deep dive done |
| 10 | Google | Data Manager | — | /data-manager | ✅ deep dive done |
| 11 | Meta | Location Pages | — | /meta-pages | ✅ empty state (no Meta connected) |
| 12 | Meta | Page Posts | — | /meta-posts | ✅ empty state (no Meta connected) |
| 13 | Microsite | Microsite | — | /microsite | ✅ deep dive done |
| 14 | Insights | Reports | — | /reports/locations | ✅ deep dive done |
| 15 | Account | User Management | — | /user-management | ✅ deep dive done |
| 16 | Account | Activity | — | /activity | ✅ deep dive done |
| 17 | Account | Settings | — | /settings | ✅ deep dive done (AI Reply Tone) |
| 18 | Account | Support | — | /support | ✅ deep dive done (same system as Support Cases) |

## Area Switchers (verified Batch 10 — see research/modules/areas.md)
Top-level buttons switch the whole sidebar:
- **Locations** → default area (Google listings suite; the 18 modules above).
- **Engage** → /engage: Dashboard, Agent Queue, Inbox (Comments/Messages/Email/Ad Comments/App Updates), Understand (Tickets/Analytics/Customers/Reports), Configure (Alerts/Channels/Team/Ticket Rules/Response Studio). Status: ✅ all visited (empty states — 0 channels connected).
- **Ads** → Synapse Ads (Google Ads/Meta Lead Ads), AI Creative Studio (/creative-studio), SPARK (/spark), Reports. Status: ✅ all visited (empty states — no ad accounts linked).

## Name Collision Register (identical names, different areas)
- **Locations**: appears BOTH as top-level area button AND Google group module (badge 3,000). Must be investigated separately.
- **Page Posts**: appears TWICE — once under **Google**, once under **Meta**. Different product areas (Google Business Profile posts vs Meta/Facebook-Instagram posts).
- **Location Pages** (Meta) vs **Locations** (Google): related but distinct; Meta Location Pages presumably mirrors locations for Facebook pages.

## AI Surface Map (to expand — AI is NOT only Ahana)
- "Ahana insight" card on Dashboard (AI insight summary) — verified name.
- **AI Location Studio** (Google group) — module name implies AI content generation.
- Reviews sentiment analysis ("11328 reviews analysed", Positive/Neutral/Negative %, "No themes yet" → theme extraction pending data).
- To be investigated: any AI in Reviews, Ads, Reports, Settings, Engage.

## Integrations Observed (to expand)
- **Google** (Business Profile / Google API): review data, search/maps impressions, actions (calls, directions, website clicks), visibility trend. Empty-data messages confirm direct Google reporting dependency.
- **Meta** group exists → Facebook/Instagram integration.
- Sync model: per-location "last synced" dates (~28–29 Sept), workspace-level "last synced about 2 months ago".

## Location Data Model (from Dashboard)
- Workspace: MDRC (scale test), 3,000 locations
- Location naming pattern: `MDRC (scale test) <City Area> <n>` with group labels like `[SCALE] MDRC North/East & West/South`
- Location IDs: `WTL-L-#####` (e.g., WTL-L-24004)
- Per-location: health, review count, avg rating, verified/unverified status, last synced date
- Health buckets: Healthy (2,816) / At risk (184) / Critical (0) → Portfolio score 70/100 "GOOD"

## Coverage Status
- [x] Auth page (00-auth-login-page.png)
- [x] Dashboard homepage (01-dashboard-home-full.png, snapshots/dashboard-home.yml)
- [ ] All other modules (see table above)

Legend: ✅ done · 🔄 in progress · 🔲 not started · ⚠️ partially blocked
