# Module Findings — Page Posts (Google group)

> Verified from live staging: https://app.staging.whatthelocal.com/posts ("Post Scheduling")
> Screenshots: 14-create-post-wizard.png

## What it does
Bulk scheduling and publishing of **Google Business Profile posts** across the whole location portfolio (up to all 3,000 locations at once), with a calendar workflow, holiday-driven content prompts, and per-location personalization variables.

## Page structure (verified)
Two tabs: **Calendar** / **Post History**; "Create Post" button.

### Calendar tab
- **Upcoming Holidays** rail ("Click one to start a post"): e.g., Guru Nanak Jayanti (Nov 24, "6d"), Christmas (Dec 25, "37d") — Indian holiday calendar that pre-fills a post idea.
- Month calendar (November 2026) with prev/next month, "Today", per-day "Add post" affordances.
- Legend: **Scheduled / Published / Failed** ("Click a date to add a post — hover a post to preview it").

### Create Post wizard (full flow inspected; NOT published)
- **Step 1 — What kind of post** (GBP post types): *What's New* (update/news/announcement), *Event* (something happening on a date), *Offer* (deal, optional coupon).
- **Step 2 — Write it:** body textarea (0/1500 chars), photo attachment (1200×900 recommended, ≤5 MB), and **per-location template variables**: `{{Location name}}`, `{{Address}}`, `{{Area}}`, `{{State}}`, `{{Pincode}}` — one post text, personalized per location at publish time.
- **Step 3 — Details:** CTA button on post (optional): No button / Book / Order Online / Learn More / Sign Up / Call / Shop / Get Offer.
- **Live Preview** rendered as a Google Business Profile post card ("Google Business Profile · Just now").
- **Targeting:** "All 3000 locations" with **Change** button (scope selection).
- Actions: **Publish now** / **Schedule**; final button "Publish to 3000 locations" (disabled until content added).

### Post History tab
- Per-location selector (defaults to first location), presumably lists that location's past GBP posts.
- Currently errors: **"Backend not configured: No refresh token found"** (Google read fails in staging) — so history content not verifiable today.

## Purpose / business problem
- Keeping thousands of GBP listings "active" (fresh posts boost local SEO/engagement) is impossible manually; this module enables one-composition-many-locations publishing with scheduled cadence and holiday hooks.

## Who uses it
- Central marketing teams running campaigns across all branches; franchise marketing; agencies.

## Inputs / outputs
- Inputs: post type, body, photo, CTA link/button, target locations, schedule date; holiday calendar.
- Outputs: GBP posts published per location; statuses Scheduled/Published/Failed tracked.

## Connections
- Locations (targeting scope), Locations data (template variables), holidays (content prompts), Reports (likely post performance).

## AI capabilities
- None observed in this module (no AI buttons). AI content generation may live in AI Location Studio instead — to verify connection.

## Integrations
- Google Business Profile localPosts API (publishing); Google read path broken in staging ("No refresh token found").

## Unknowns
- "Change" targeting selector contents (partial vs filtered selection, zones).
- Event/Offer-specific fields (dates, coupons) — not fully opened.
- Whether Schedule sends one Google post per location (presumably yes).
- Post performance metrics linkage to Reports.
