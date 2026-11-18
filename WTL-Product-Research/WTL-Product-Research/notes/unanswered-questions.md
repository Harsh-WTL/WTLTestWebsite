# Unanswered Questions

## Architecture / staging issues (observed, not product questions)
- Backend is Supabase (project emvqfdwrbdhyrqlozccg.supabase.co) + Edge Functions; `get-location-media` returns 500 / ERR_INSUFFICIENT_RESOURCES when the Locations grid renders ~50 cards. Is this staging-only?
- Google OAuth "No refresh token found" error in Services tab — is the Google connection partially configured in staging?
- Dashboard per-location Analytics tab also errors: "Edge Function returned a non-2xx status code".

## Product questions
1. Locations KPI says Verified = 0 while rows display "✓ Verified" — bug or different definition (e.g., Google-account-level vs listing-level verification)?
2. What composes a location's "health" score (weights, the "13 issues")?
3. What does Delete do (Google removal vs local archive)? Soft delete?
4. Export CSV — fields, scope (all vs filtered), format. No visible download occurred during test.
5. How are Duplicate and Suspended statuses detected/surfaced?
6. Ahana: model/LLM used, generation cadence, whether user feedback loops exist.
7. Do time-range/comparison selections persist per user?
8. Bulk operations available on multi-select in Locations list (not tested for safety).
9. "38 profile edits to approve" — how does Google propose edits (Profile Guard data source), and what actions does approval/rejection trigger? → Partially answered: edit scan detects changes; AI Analysis explains them; approve/reject resolves.
10. Theme toggle Soft/Ink — is preference persisted per user? (Untested by policy.)

## Post-Batch-10 additions
11. Engage channels: which connectable platforms exist beyond Facebook/Instagram/YouTube/Messenger/Email/Google Play/App Store (WhatsApp? X?)? Admin-side only ("Your admin will set up Engage channels").
12. Synapse Ads: campaign creation/management UI hidden until ad accounts are linked — full feature set unverifiable in this workspace.
13. SPARK: what exactly the website scan learns/creates (brand kit, audience map, catalog ingestion source).
14. Microsite: hosting/URL pattern, lead routing destination, Generate draft-vs-publish semantics.
15. Location "Zone" concept (RBAC "By Zone", QR batch, locations filters) — zone = user-defined region grouping? Where are zones managed? (No Zones admin screen found — possibly in Data Manager import or admin-only.)
16. AI reply model/provider and cost controls; AI master switch behavior per area.

## Coverage checklist snapshot (2026-11-18 — ALL MODULES COVERED)
- [x] Auth page
- [x] Dashboard homepage + notifications panel
- [x] Google: Locations · Reviews · Page Posts · AI Location Studio · Profile Guard · Not Published · Support Cases · QR Codes · Data Manager
- [x] Meta: Location Pages · Page Posts (empty states — no Meta account connected)
- [x] Microsite · Reports
- [x] Account: User Management · Activity · Settings · Support
- [x] Top-level areas: Locations · Engage (all 12 Engage nav items visited) · Ads (Synapse Ads, AI Creative Studio, SPARK, Reports)
- [x] Final synthesis: research/WHAT_THE_LOCAL_PRODUCT_INTELLIGENCE.md
