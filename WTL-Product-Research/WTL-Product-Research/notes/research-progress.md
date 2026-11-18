# Research Progress Log

## 2026-11-18 — Session 1
- ✅ Read AGENTS.md; verified Playwright MCP available (opencode.json local server).
- ✅ Opened staging: https://app.staging.whatthelocal.com/dashboard → redirected to /auth (email+password login).
- ✅ User logged in manually (no credentials handled by agent).
- ✅ Auth page captured: screenshots/00-auth-login-page.png
- ✅ Dashboard homepage inspected; full-page screenshot + accessibility snapshot:
  - screenshots/01-dashboard-home-full.png
  - snapshots/dashboard-home.yml
- ✅ Navigation structure documented → research/module-inventory.md
- ✅ Structure report approved by user; full investigation authorized (all modules, read-only).

## Batches (in progress)
- Batch 1: Dashboard deep dive + Google Locations — ✅ findings saved (research/modules/dashboard.md, google-locations.md)
- Batch 2: Reviews, Page Posts (Google) — ✅ findings saved (google-reviews.md, google-page-posts.md). Notes: reviews list loads on second visit; generate-review-reply edge fn 500; Post History needs Google refresh token.
- Batch 3: AI Location Studio, Profile Guard — ✅ findings saved (ai-location-studio.md, profile-guard.md). Note: Edit Detail dialog confirmed AI Analysis text.
- Batch 4: Not Published, Support Cases — ✅ findings saved (not-published.md, support-cases.md).
- Batch 5: QR Codes, Data Manager — ✅ findings saved (qr-codes.md, data-manager.md).
- Batch 6: Meta Location Pages, Meta Page Posts — ✅ both show empty state "No Meta pages connected yet — ask your admin to connect a Meta account and sync pages" (meta-location-pages.md, meta-page-posts.md).
- Batch 7: Microsite, Reports — ✅ findings saved (microsite.md, reports.md). Reports Generate verified (no data in staging ranges); Scheduled Reports panel + 5 report types documented.
- Batch 8: User Management, Activity — ✅ findings saved (user-management.md, activity.md). Full RBAC model captured (reveals Creative Studio / Inbox / Response Studio / Engage Analytics).
- Batch 9: Settings, Support — ✅ findings saved (settings.md [AI Reply Tone], support.md).
- Batch 10: Top-level areas: Locations, Engage, Ads — ✅ findings saved (areas.md). VERIFIED: the 3 buttons switch the entire workspace (Engage = social-care helpdesk suite; Ads = Synapse Ads + AI Creative Studio + SPARK).
- Final: synthesize WHAT_THE_LOCAL_PRODUCT_INTELLIGENCE.md — ✅ done (research/WHAT_THE_LOCAL_PRODUCT_INTELLIGENCE.md; 19 module deep-dives, AI surface map, integrations, staging limitations, positioning).

## Coverage status
- ALL sidebar modules visited and documented (see notes/unanswered-questions.md coverage checklist — all [x]).
- Screenshots: 26 PNGs across module folders (incl. reports/25-reports.png captured post-synthesis).

## Browser Location
- Session complete: last visited /reports/locations (screenshot capture). No further navigation planned.

## Notes / discoveries this session
- Staging banner: "Staging · test copy".
- Workspace "MDRC (scale test)" with 3,000 locations, 20,388 reviews — scale-test data, must anonymize.
- "Ahana" is an AI insight persona on the dashboard; other AI surfaces suspected.
- Google-sourced widgets empty (visibility/actions) — data pending Google API reporting; sync lag ~2 months.
- Top-level mode buttons (Locations / Engage / Ads) may switch the whole sidebar context — must verify.
