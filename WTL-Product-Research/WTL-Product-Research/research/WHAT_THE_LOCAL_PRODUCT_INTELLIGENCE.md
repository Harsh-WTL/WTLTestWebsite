# What The Local — Product Intelligence

> Comprehensive product dossier compiled from **live, read-only exploration** of the staging dashboard (`https://app.staging.whatthelocal.com`) on **2026-11-18**.
> Test workspace: **"MDRC (scale test)"** — 3,000 locations, 20,388 reviews, all synthetic scale-test data.
> Written to be consumable by another AI system **without any dashboard access**.
> Source files: `research/modules/*.md` (per-module deep dives), `snapshots/*.yml` (accessibility snapshots), `screenshots/**` (annotated captures), `notes/*` (progress + open questions).

---

## 1. What the product is

**What The Local (WTL)** is a multi-tenant, multi-location **local-presence management suite** ("AI Locations – Business Management") for brands with many physical branches (studied at 3,000 locations). It manages the entire lifecycle of a location's digital presence across Google, Meta/Facebook, owned web (microsites), and advertising — with **AI embedded at every layer**.

The app is a **three-product suite** switched via three top-level buttons (verified: they swap the entire sidebar and home page):

| Area | Route | Purpose |
|---|---|---|
| **Locations** (default) | `/dashboard`, `/listings`, … | Google Business Profile (GBP) listing management, reviews/reputation, posts, listing protection, local web pages |
| **Engage** | `/engage` | Omnichannel customer-care helpdesk: social comments, DMs, email ticketing, app-store reviews, AI auto-replies, CRM-lite |
| **Ads** | `/spark`, `/creative-studio`, … | Advertising: AI campaign engine (Google Ads / Meta Lead Ads), AI ad-creative generation, automated ad onboarding |

Account modules (User Management, Activity, Settings, Support) are shared across all areas. RBAC scopes permissions **per product area** and **per geography/location subset**.

**Core value propositions (verified on-screen):**
1. **Portfolio-scale Google presence**: manage 3,000 listings as one dataset; edit once, publish everywhere; keep listings correct against third-party edits.
2. **AI reputation automation**: AI replies (manual-assist + fully automatic per star level), AI sentiment analysis, AI reply brand voice.
3. **Local lead capture**: GBP posts, review QR codes, per-location microsites with lead forms.
4. **Customer care at scale**: unified inbox + ticketing with AI auto-replies and SLA-style rules.
5. **AI advertising**: brand-aware creative generation and campaign readiness.

**Inferred ICP** (from domain mix: diagnostics labs "MDRC", Indian states/UTs/pincodes, UPI payment chips, Indian holiday calendar, ₹-region data): Indian multi-branch brands — diagnostics/healthcare, retail, QSR, banking — plus **agencies** managing many brands.

---

## 2. Complete module map (verified)

### 2.1 Locations area (default workspace)
Sidebar groups: **Google**, **Meta**, **Microsite**, **Insights**, **Account**.

| Module | Route | Status in staging | One-liner |
|---|---|---|---|
| Dashboard | `/dashboard` | ✅ full | Portfolio home: KPIs, Ahana AI insights, notifications, charts |
| Google **Locations** | `/listings` | ✅ full | 3,000-location master list + per-location detail (5 tabs) |
| Google **Reviews** | `/reviews` | ✅ full | Review inbox, AI replies, auto-reply engine, sentiment |
| Google **Page Posts** | `/posts` | ✅ full | GBP post scheduling calendar, bulk publish to all locations |
| Google **AI Location Studio** | `/ai-audit` | ✅ full | AI score, field-completeness gaps, nightly audit, guided GBP creation |
| Google **Profile Guard** | `/profile-guard` | ✅ full | Third-party/Google edit moderation queue with AI analysis + risk scores |
| Google **Not Published** | `/under-review` | ✅ full | Tracks brand edits Google hasn't published; support escalation |
| Google **Support Cases** | `/google-cases` | ✅ full | Ticketing for Google listing issues (auto-created from Not Published) |
| Google **QR Codes** | `/qr-codes` | ✅ full | Review-page QR generation (5 designs, batch, custom templates) |
| Google **Data Manager** | `/data-manager` | ✅ full | Bulk xlsx/CSV location import (20-column schema) |
| Meta **Location Pages** | `/meta-pages` | ✅ empty | Facebook location pages (blocked: no Meta account connected) |
| Meta **Page Posts** | `/meta-posts` | ✅ empty | Facebook page posts (same blocker) |
| **Microsite** | `/microsite` | ✅ full | 3-step builder generating public per-location websites from GBP data |
| Insights **Reports** | `/reports/locations` | ✅ full | 5 report types, CSV + scheduled email reports |
| Account (4 modules) | `/user-management`, `/activity`, `/settings`, `/support` | ✅ full | RBAC, audit log, AI voice config, support tickets |

### 2.2 Engage area (`/engage`) — all 12 nav items visited (empty states, 0 channels connected)
- **Dashboard**: Volume, Response rate, Needs attention, **AI/Human split**; activity chart; sentiment net score; platform mix; live feed; **themes (LOVED / ASKED ABOUT / NEEDS WORK)**.
- **Agent Queue** (`/engage/my-queue`): ticket pipeline **To do → WIP → ACR → Resolved → Closed**; search "Ticket #, order, AWB, email…" (commerce-order ticketing); round-robin assignment ("New tickets go round the active agents in turn. Team leaders and admins take none.").
- **Inbox**: **Comments** (Facebook/Instagram/YouTube; 10 status tabs incl. Escalated, Spam, Reopened), **Messages** (Messenger/Instagram DMs), **Email** (forward-rule based email ticketing), **Ad Comments** (comments on boosted posts/ad creatives), **App Updates** (Google Play + App Store review inbox with star filters).
- **Understand**: **Tickets** (volume analytics + Excel export), **Analytics** (response rate/time, net sentiment, types, themes), **Customers** (CRM-lite: Customer/Flag/Orders/**LTV**/Interactions/Sentiment/Last contact/Platform; Find duplicates), **Reports** (platform/type breakdowns, sentiment distribution, **AI vs Manual replies**, top customers).
- **Configure**: **Alerts** (watch rules + fired-alert feed), **Channels** (admin-configured platform connections), **Team** (agent roster, round-robin), **Ticket Rules** (acknowledge new emails; ask-for-rating on resolve; order-ID-required rule; QRC reason hierarchy; `{{brand}}`/`{{ticket}}` templates incl. 24h/48h ACR reminders), **Response Studio** (**AI auto-replies master switch — observed ON**; brand voice: about-your-business, tone presets Professional/Friendly/Witty/Empathetic; contact email/phone shared by AI only "when helpful"; Saved Replies + Automated Rules builders; full Brand Voice editor).

### 2.3 Ads area — all nav items visited (empty states; no ad accounts linked)
- **Synapse Ads Engine ✦ AI-Powered**: Google Ads / Meta Lead Ads campaign surfaces; "No Google Ads account is linked… contact your administrator".
- **AI Creative Studio** (`/creative-studio`): AI ad-image generator — tabs Generate / Resize & Edit / Your Generations; 5-step wizard **Business → Style → Message → Visuals → Size**; industry pre-set "**Diagnostic center (from GMB)**" (industry derived from the Google listing).
- **SPARK** (`/spark`): "**Smart Personalised Ad Readiness Kit**" — "Answer 3 quick questions and SPARK will scan your website, learn your brand and get your ads ready." Pillars: **Brand Intelligence → Audience Mapping → Product Catalogue → AI Ad Generation** (~2 min).
- **Reports** (Ads): Meta Lead Ads campaign table (empty).

---

## 3. Deep dives — the 8 flagship modules

### 3.1 Google Locations (`/listings`) — the system of record
- **List**: KPI header; filters status/city/state/zone/account; search; Grid (50 cards, ~5 per row) or List (table) view; pagination 50/page (60 pages × 3,000). Card: name, store code (`MDRC-S-#####`), WTL ID (`WTL-L-#####`), group label, rating ★, review count, verification, health, last-synced date. Row menu: View details / Delete. Bulk multi-select exists (untested by policy).
- **Detail page** (`/listings?locationId=<uuid>`) with 5 tabs:
  - **Overview**: identity (name, store code, WTL ID, group, Google `cid` deep links to Search/Maps), KPIs, health ("13 issues" concept), review summary, sync status.
  - **Analytics**: Google-sourced impressions/search-vs-maps split, actions (calls/directions/website clicks), visibility trend. *Staging bug: edge function 500 → "No analytics data available".*
  - **Media**: photos/videos; upload limits verified (JPG/PNG ≤5 MB; MP4/MOV ≤30 s/75 MB/720p; Google review ≤48 h). *Staging bug: `get-location-media` 500 / ERR_INSUFFICIENT_RESOURCES at scale.*
  - **Services**: category-driven service list. *Staging gap: "Backend not configured: No refresh token found" (Google OAuth partially unconfigured).*
  - **Edit**: full GBP field editor — description (750-char), hours + special hours, services, **complete GBP attribute model** (Service Options, Amenities & Accessibility, Parking, Payment incl. UPI, Business Highlights), categories, contact fields.
- Data model: workspace → business accounts (`[SCALE] MDRC North/South/East & West`) → locations; IDs `WTL-L-#####`; store codes; labels; zones; health buckets Healthy/At risk/Critical → **portfolio score 70/100 "GOOD"** (2,816 healthy / 184 at risk / 0 critical).

### 3.2 Google Reviews (`/reviews`) — AI reputation engine
- KPIs: Total reviews (16,246 / 90 d), Avg rating 4.2★, **AI replied 8,120 = "50% of reviews"**, Unanswered. Sentiment card ("AI-analyzed · 11,324 reviews": 80% positive / 8% neutral / 12% negative). **Needs reply** card with **Auto-reply all** bulk button.
- **Auto-reply mode**: Off / 5★ Only / All Stars + per-star (1★–5★) toggles → "Automatically generate and post replies to new reviews based on rating". (Defaults Off; not modified.)
- Review card: reviewer, **"Before onboarding"** chip, AI sentiment dot, stars, relative time, owning location (Name · City · PIN), text; actions **AI reply / Reply manually**; replied reviews show "AI · Your reply" with Edit/Delete; deleted state shows "Manually deleted" + "Generate new reply".
- Composer dialog "AI-Powered Reply": review context, textarea 0/1000, **Regenerate**, Cancel / Post Reply. Same dialog for manual replies.
- Verified AI flows: per-review generation (`generate-review-reply` edge function — **HTTP 500 in staging**, so drafts returned empty; UI flow complete), auto-reply mode, bulk auto-reply-all, sentiment classification, AI-vs-manual tagging.
- Business logic: reply rate + response speed are local-SEO signals; central queue removes the per-branch burden.

### 3.3 AI Location Studio (`/ai-audit`)
- **Scorecard**: "AI score" (how well listings surface in AI assistants) + per-field completeness counters (≥13 tracked fields: Verification, Photos, Additional Categories, Appointment Link, Logo, Opening Date, WhatsApp URL, Special Hours, Cover Photo, Q&A/FAQs…). **Generate score** (async; timed out in staging).
- **Audit**: nightly AI listing audit (~2:30 am) producing change/ranking recommendations.
- **Create location**: 8-section guided GBP creation (account → basics → contact → address → hours → description/photos → services → attributes) with sticky required-fields checklist (9 required) and **Single / Bulk Import** modes; "Create on Google" publishes directly (not triggered).

### 3.4 Profile Guard (`/profile-guard`)
- Moderation queue for third-party/Google edits: KPIs (Total 5, Pending 4, Approved 1, Auto-Blocked 0, High Risk 1); master switch **"Auto-reject all edits"**; risk filter Critical/High/Medium/Low; per-card Was/Now diffs on technical GBP fields (`openInfo.status`, `specialHours`, `attributes.…`, `categories.…`); **Edit Detail dialog with "AI Analysis"** (plain-language explanation, e.g., "Open status: Google marked the listing temporarily closed"), "Detected … **by the edit scan**"; Approve/Reject per card + Approve All/Reject All; Export CSV.
- Business problem: anyone can suggest listing edits; malicious/accidental changes (CLOSED_TEMPORARILY!) destroy lead flow — this restores brand control with AI triage.

### 3.5 Not Published (`/under-review`) + Support Cases (`/google-cases`)
- Not Published reconciles **You sent / Google holds / Public sees** per field for the last 60 days; statuses "Google is reviewing / Not accepted / Published"; heuristic diagnosis "Likely declined: unpublished for over 7 days while the public sees a different value. Google never says so outright."; guidance ("do not re-edit while under review; that restarts the clock"); **Raise/Raise with support** → creates cases in Support Cases.
- Support Cases = ticketing with threads (message composer, Ctrl/⌘+Enter); statuses Open/In Progress; auto-created cases titled "Not published by Google: <location>". Account-group **Support** (`/support`) is the same ticketing system via a second entry point.

### 3.6 Page Posts (`/posts`) — GBP publishing at scale
- **Post Scheduling**: Calendar/Post History tabs; **Upcoming Holidays** rail (Indian holidays, "Click one to start a post"); Create-Post wizard: type (**What's New / Event / Offer**), body 0/1500 + photo (1200×900, ≤5 MB), **per-location template variables `{{Location name}} {{Address}} {{Area}} {{State}} {{Pincode}}`** (one composition → personalized per location), CTA (Book/Order Online/Learn More/Sign Up/Call/Shop/Get Offer), live GBP preview, targeting "All 3000 locations", **Publish now / Schedule → "Publish to 3000 locations"** (not triggered). Post History is per-location (staging: Google read fails, no refresh token).

### 3.7 Microsite (`/microsite`)
- 3-step wizard: **Industry & Template** (Retail/Fashion, Automotive, Bank/NBFC, Healthcare/Diagnostics, QSR/Restaurant) → **Sections & Content** (10 toggleable sections: Banners, Lead Form, Products/Collection [CSV], About Us, Our Services, Social Links & Posts ["handles for scraping"], Gallery ["auto-pulled from Google Business Profile per location"], FAQs, News & Articles, Quick Links) → **Generate & Preview** (select up to all 3,000 locations; "Each location will get its own public page with data pulled from your Google Business Profile" — name/address/phone/hours auto-imported). Generation not triggered.

### 3.8 Reports (`/reports/locations`)
- 5 types: **Performance** (impressions/clicks/calls/directions/bookings/conversations), **Reviews** (per-review incl. **AI Reply** column), **Review Summary** (per-location rating histogram 5★–1★, sentiment %, reply %), **Profile Protection** (edit alerts incl. **AI Reason** column), **Location Status** (verified/active/last-synced health).
- Filters: 8 date presets + custom, 25 states, ~60 cities, **Compare** (Previous Period / YoY / Custom).
- **Scheduled Reports**: recurring CSV delivery to email recipients (Name/Type/Frequency/Recipients/Last Sent/Status). Verified pipeline (Generate ran; zero data because Google metric ingestion has no recent data in staging).

---

## 4. Cross-cutting platform analysis

### 4.1 Identity & access (verified RBAC)
- **Magic-link invitations**; roles Owner / Regional Manager / Store Manager / Review Handler / Report Viewer / Content Creator / Engage Agent / Engage Lead / Engage Read-Only / Custom.
- **Product scoping**: All products / Locations / Engage / Advertising.
- **Location scoping**: All / By State / By City / By Pincode / **By Zone** / Specific Locations.
- ~24 granular permissions incl. Inbox agent actions (assign/escalate), "Manage Response Studio (brand voice + **AI master switch**)", "Manage Ads", "Manage Users".

### 4.2 AI surface map (all verified)
| AI capability | Where | Evidence |
|---|---|---|
| Review reply generation (assist + auto) | Reviews, Settings | "AI-Powered Reply" dialog; auto-reply per-star modes; `generate-review-reply` fn |
| Brand voice / tone control | Settings (AI Reply Tone 1000-char + presets); Response Studio | "applies to both auto-replies and on-demand suggestions" |
| Sentiment classification | Reviews, Engage | "AI-analyzed · 11,324 reviews"; net score; themes LOVED/ASKED ABOUT/NEEDS WORK |
| AI insight persona "Ahana" | Dashboard | Insight cards |
| Edit-risk triage + AI Analysis | Profile Guard, Reports ("AI Reason" column) | Edit Detail dialog |
| AI score + nightly listing audit | AI Location Studio | "Generate score", 2:30 am audit |
| AI/Human answer split | Engage Dashboard | "answered by AI · by your team" |
| Auto-replies for social/email | Response Studio (switch ON by default) | "AI will reply using the tone and context configured below" |
| AI ad creative generation | AI Creative Studio | 5-step wizard → image |
| AI ad readiness (site scan → brand → catalog → ads) | SPARK | pillar labels |
| AI customer duplicates / CRM enrichment | Customers (Find duplicates) | button |

### 4.3 Integrations
- **Google Business Profile**: locations, reviews, posts, media, attributes, verification, performance metrics, edit moderation — via nightly sync ("Nightly sync finished — 3000 locations synced") + OAuth refresh tokens (partially unconfigured in staging).
- **Meta/Facebook/Instagram**: location pages, page posts, comments, DMs (blocked: no account connected).
- **YouTube** (comments), **Messenger** (DMs), **Email** (forward-rule ingestion), **Google Play / App Store** (reviews).
- **Google Ads / Meta Lead Ads** (campaign management; no accounts linked in staging).
- **Backend**: Supabase (project `emvqfdwrbdhyrqlozccg`) + Edge Functions; known staging failures at scale (`get-location-media` 500/ERR_INSUFFICIENT_RESOURCES, `generate-review-reply` 500, listing analytics 500, reviews aggregates slow on first load).

### 4.4 Data & workstreams
- Single **location master record** feeds: GBP fields, microsite content, QR deep links, reviews, posts targeting, ad creative context ("from GMB"), RBAC scoping, reporting rows.
- **Audit trail**: Activity log records Approved/Rejected Google changes (with diffs), listing edits (field diffs), published posts (text), review replies (text), team removals — 50/page, "Load older".
- **Notification model**: dashboard notifications panel cross-links modules ("20,388 reviews need a reply", "38 profile edits to approve"), per-module needs-attention chips deep-link to filtered views.

### 4.5 Staging limitations encountered (do not reflect product design)
1. Reviews aggregate/edge functions slow or failing on first load (KPIs "—", list 0 rows once; loaded correctly on retry).
2. `generate-review-reply` 500 (AI drafting broken).
3. `get-location-media` 500 / ERR_INSUFFICIENT_RESOURCES on Locations grid/media.
4. Location Analytics tab 500.
5. Google OAuth refresh token missing → Services tab + GBP Post History read failures.
6. Google performance metrics have no recent rows (Reports return 0; "synced ~2 months ago").
7. Meta unconnected; Ads accounts unlinked (empty states by design of the test workspace).
8. Ahana insights, AI score, sentiment themes: "No data/No themes yet" — need real data.

---

## 5. Positioning summary (for another AI)

**Category**: Local Experience Management / Listing & Reputation management + Social Customer Care + AI Advertising — a "Google-first, Meta-next, owned-web and ads" stack for multi-branch brands.

**Direct functional parallels**: BrightLocal / Yext / Uberall (listings & reputation), Sprout Social / Statusbrew / Zendesk (Engage helpdesk + inbox), AdCreative.ai (creative), with a differentiating **AI-everywhere** layer (Ahana insights, auto-replies with brand voice, AI edit triage, AI score for AI-assistant visibility, AI ad generation).

**Unique angles observed**:
- **AI score** measuring how well listings would surface in *AI assistants* — positioning for the AI-search era.
- **Profile Guard with AI risk triage** — protecting listings against Google/public edits.
- **Not Published** — exposing Google's opaque edit pipeline (sent vs held vs public) with support escalation.
- **SPARK** — 2-minute website-scan → ad-ready brand kit (Brand Intelligence → Audience Mapping → Product Catalogue → AI Ad Generation).
- **Per-location microsites auto-populated from GBP** including lead forms.
- **GBP posts with per-location template variables** — one composition, 3,000 personalized posts.

**Maturity signals**: deep, finished UX in Locations/Reviews/Profile Guard/Posts/QR/Microsite/Reports/RBAC; Engage and Ads are fully scaffolded (all screens present, empty-state driven) and activate once channels/ad accounts are connected by an admin; several staging edge functions are broken or data-poor — production readiness of those paths is unverified.

---

## 6. Source index
- `research/modules/`: dashboard, google-locations, google-reviews, google-page-posts, ai-location-studio, profile-guard, not-published, support-cases, qr-codes, data-manager, meta-location-pages, meta-page-posts, microsite, reports, user-management, activity, settings, support, areas.
- `snapshots/`: 20 accessibility snapshots incl. per-module page YAML.
- `screenshots/`: numbered captures (00–25) in module folders.
- `notes/research-progress.md` (batch log), `notes/unanswered-questions.md` (open questions + coverage checklist), `research/module-inventory.md` (nav map + routes).
