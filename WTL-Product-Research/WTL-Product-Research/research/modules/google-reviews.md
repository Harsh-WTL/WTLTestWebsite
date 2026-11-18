# Module Findings — Reviews (Google group)

> Verified from live staging: https://app.staging.whatthelocal.com/reviews
> Screenshots: 09-reviews-lifetime.png, 10-reviews-list.png, 11-ai-reply-dialog-generating.png, 12-ai-reply-dialog-draft.png, 13-manual-reply-dialog.png

## What it does
Unified inbox for Google reviews across all 3,000 locations, with **AI reply generation**, **bulk auto-reply automation**, sentiment analysis, and reply management (edit/delete/regenerate).

## Page structure (verified)
- Header: "Google Reviews"; time ranges **1D / 1M / 3M / Lifetime / Custom**; **Sync** button (manual Google re-sync — not triggered); theme/notifications/avatar controls.
- KPI cards (verified with data loaded):
  - Total reviews: 16,246 (last 90 days; label changes with range)
  - Avg rating: 4.2★ out of 5
  - **AI replied: 8,120 — "50% of reviews"** (tracks how many replies were AI-generated)
  - Unanswered: 0 — "all caught up"
- **Sentiment analysis card** ("AI-analyzed · 11,324 reviews"): Positive 80% / Neutral 8% / Negative 12%, plus big "80% positive" display.
- **Needs reply card**: count + status ("All caught up" when 0) + **"Auto-reply all"** button (bulk AI reply action — NOT triggered).
- **Auto-reply mode** panel: "Automatically generate and post replies to new reviews based on rating" with modes **Off / 5★ Only / All Stars** and per-star toggles (1★–5★) — i.e., user can opt into automatic AI replies per star level (defaults Off; toggles disabled while Off).
- Tabs: **All reviews (16,246)** / **Needs reply (0)**.
- **Search** box ("Search reviews…") + filters:
  - Location select (all 3,000 locations listed as "Name · City · PIN")
  - Sentiment: All / Positive / Neutral / Negative
  - Status: All / Replied / Unanswered
  - Stars: All / 5★…1★
  - Sort: Newest / Oldest
- Page size 15/25/50/100; pagination.

## Review card anatomy (verified)
- Reviewer avatar initials + full name (e.g., "Aditya Menon" — anonymized in docs), chip **"Before onboarding"** (review predates WTL onboarding), sentiment dot (● Positive/Neutral/Negative — AI-assigned), 1–5 star row, relative time ("1mo ago"), owning location ("Name · City · PIN")
- Review text ("No comment provided" when reviewer left no text)
- Actions on unanswered reviews: **"AI reply"** and **"Reply manually"** buttons
- On replied reviews: reply block labeled **"AI · Your reply"** (if AI-generated) or "Your reply" (manual), with **Edit** and **Delete** buttons; deleted-reply state shows **"Manually deleted"** + **"Generate new reply"**

## Reply composer dialog (verified; nothing posted)
- Dialog title: **"AI-Powered Reply"**; shows reviewer name, sentiment, stars, review text
- Textarea ("Write a thoughtful reply…", 0/1000 char counter)
- **Regenerate** button (re-run AI draft)
- Buttons: **Cancel** / **Post Reply** (disabled until text present)
- Both "AI reply" and "Reply manually" open this same composer.

## AI capabilities (verified)
1. **AI reply generation** — per-review drafts; edge function `generate-review-reply` (currently HTTP 500 in staging, so drafts come back empty; the UI flow itself is fully built: generating state "AI is crafting a reply…", regenerate, manual edit, post).
2. **Auto-reply mode** — automatic generation AND posting of replies to new reviews based on star level (Off/5★ only/All Stars + granular star toggles).
3. **Auto-reply all** — bulk reply generation for the "Needs reply" queue.
4. **AI sentiment analysis** — per-review sentiment label + aggregate shares (Positive/Neutral/Negative, "AI-analyzed · N reviews").
5. KPI "AI replied" tracks AI share of replies (8,120 = 50%).

## Reply texts observed (existing data, templates likely)
- Positive: "Thank you for your kind words. We look forward to serving you again." / "We appreciate your feedback and are glad you had a good experience."
- Negative: "We are sorry to hear this. Please share your contact details and our team will reach out to make it right."
- Replies are taggable AI vs manual; deletable; editable.

## Purpose / business problem
- At thousands of locations, replying to every Google review is impossible manually; WTL centralizes the queue and automates replies (with human edit/approve), improving response rate & local SEO signals.

## Who uses it
- Marketing/support teams of multi-location brands; franchise admins; agency reviewers.

## Inputs / outputs
- Inputs: Google reviews (text, stars, reviewer), sentiment analysis results, reply history.
- Outputs: replies posted to Google (manual or AI), reply edits/deletes, auto-reply configuration, sentiment aggregates.

## Connections
- Dashboard KPIs (response rate, sentiment, rating distribution) derive from this data.
- Locations: each review tied to a location (selectable filter).
- Notifications: "20,388 reviews need a reply → Open Reviews".
- Reports module presumably consumes reply/response data.

## Staging issues observed
- Initial load: KPIs "—" / "Counting…" for a long time (aggregate query slow/failing; loaded correctly on second visit).
- `generate-review-reply` edge function → 500 (AI draft generation broken in staging as of research date).
- Not tested: Sync button (would trigger Google sync — excluded per read-only policy), Auto-reply all, Post Reply, Edit/Delete of replies, changing Auto-reply mode (data-changing).

## Unknowns
- Exact LLM/model used; prompt structure; tone controls (none visible beyond star-based mode).
- Whether auto-reply modes are per-workspace or per-location.
- "Custom" date range picker contents (not opened).
- Whether "Needs reply" uses a different definition than "Unanswered" (KPI said Unanswered 0 while individual cards showed reply buttons on unanswered reviews).
- Edit flow for existing replies (opens same composer?).
- What "Before onboarding" chip implies for reply eligibility (replies seem possible anyway).
