# Findings — Top-Level Areas (Locations / Engage / Ads)

> Verified from live staging, 2026-11-18. Snapshots: area-locations.yml, engage-home.yml, engage-agent-queue.yml, engage-comments.yml, engage-channels.yml, engage-response-studio.yml, spark.yml · Screenshots: 25-user-edit-access-permissions.png

## The three area buttons are workspace switchers (verified)
The row above the sidebar — **Locations / Engage / Ads** — switches the ENTIRE application context (sidebar + home page). Each area is a distinct product surface sharing Account modules (User Management, Activity, Settings, Support).

### 1. Locations area (default)
- Sidebar: Dashboard · Google (Locations, Reviews, Page Posts, AI Location Studio, Profile Guard, Not Published, Support Cases, QR Codes, Data Manager) · Meta (Location Pages, Page Posts) · Microsite · Insights (Reports) · Account.
- Home = listings dashboard ("Good afternoon, <name>", 1W/1M ranges, Google visibility trend, Engagement breakdown, Peak review hours).
- User Management RBAC scopes by product: "Locations".

### 2. Engage area (/engage) — omnichannel customer-care helpdesk + social engagement
Sidebar (verified):
- **Dashboard** — KPIs: Volume, Response rate, Needs attention ("Escalated or negative open"), **AI / Human** ("0 answered by AI · 0 by your team"); Activity chart (Total/Positive/Negative/Replied); **Sentiment** (Net score, classified counts); **Platform mix**; **Live feed**; **Themes: LOVED / ASKED ABOUT / NEEDS WORK**. Range: Last 7/30/90 days.
- **Agent Queue** (/engage/my-queue) — helpdesk pipeline **To do / WIP / ACR / Resolved / Closed**; search "Ticket #, order, AWB, email…" (order/AWB = commerce-ticket support); assignee filter (Everyone/Unassigned/agent); New ticket.
- **Inbox** group:
  - **Comments** — social comments inbox; status tabs (All/Open/Escalated/Replied/Archived/Spam/To do/In progress/Resolved/Reopened); platforms **Facebook, Instagram, YouTube**.
  - **Messages** — DM conversations; platforms **Messenger, Instagram** ("DMs from Messenger and Instagram will appear here in real-time").
  - **Email** — email ticketing ("Emails forwarded to your Engage address… Set up the forward rule in your mail client").
  - **Ad Comments** — "Comments on boosted posts and ad creatives will appear here once your ads start running" (Facebook/Instagram).
  - **App Updates** — app-store review inbox: **Google Play / App Store** tabs, star filters.
- **Understand** group:
  - **Tickets** — ticket volume over date range + **Excel** export.
  - **Analytics** — Response rate, Response time, Net sentiment, volume by platform, item **Types** ("Comments, messages, reviews and more"), themes.
  - **Customers** — lightweight CRM: table Customer / Flag / **Orders / LTV** / Interactions / Sentiment / Last contact / Platform; **Find duplicates**; platform filter includes App Store.
  - **Reports** — "Engage Reports": Items by Platform, Items by Type, Sentiment Distribution, **AI vs Manual Replies**, Top Customers by Interactions.
- **Configure** group:
  - **Alerts** — alert rules ("What to watch for and how you are told") + Recent alerts feed; New Alert.
  - **Channels** — "No channels configured — Your admin will set up Engage channels for your pages. Once configured, comments will automatically sync into your inbox." ("0 channels connected").
  - **Team** — "Active agents · 0 of 0 — New tickets go round the active agents in turn. Team leaders and admins take none" (**round-robin assignment**); Invite.
  - **Ticket Rules** — automation: "Acknowledge new emails" (on), "Ask for a rating" (on, resolved-ticket CSAT), "An order ID is required before a ticket can be resolved", QRC **reasons** hierarchy (Primary e.g. Delivery → secondary), template library with `{{brand}}` / `{{ticket}}` variables (New ticket acknowledgement, **ACR reminder 24h/48h**). Save rules.
  - **Response Studio** — Engage's AI brain: **"AI auto-replies" master switch (currently ON: "AI will reply using the tone and context configured below")**; Brand voice: About your business, Tone presets (Professional/Friendly/…/Witty/Empathetic), Contact email + phone ("The AI will share this only when it's helpful"); "Open full Brand Voice editor"; **Responses (0)** — Saved Reply + Automated Rule builders.
- RBAC (from User Management) confirms: Engage Agent/Lead/Read-Only roles, Inbox permissions (view/send/edit/delete/assign/escalate), Manage channels (SLA, auto-reply settings), Manage Response Studio (brand voice + AI master switch).

### 3. Ads area
Sidebar (verified): **Synapse Ads** · **AI Creative Studio** · **SPARK** · Insights (Reports) · Account.
- **Synapse Ads Engine ✦ AI-Powered** (/spark sibling) — tabs **Google Ads** / **Meta Lead Ads**; empty states ("No Google Ads account is linked to your account yet. Please contact your administrator." / "No Meta Lead Ads campaigns yet — Create one from Synapse Ads → Meta Lead Ads.").
- **AI Creative Studio** (/creative-studio) — AI ad-image generator: tabs **Generate / Resize & Edit / Your Generations**; 5-step wizard **Business → Style → Message → Visuals → Size** ("Answer a few quick questions to generate a perfect ad creative"); Business Name (pre-filled from a location) + Industry combobox ("**Diagnostic center (from GMB)**" — industry derived from the Google listing!; also Retail, Restaurant, Salon & Spa, Hotel); Preview panel; Download/Regenerate. Generation NOT triggered (read-only policy).
- **SPARK** (/spark) — "**Smart Personalised Ad Readiness Kit**": "Answer 3 quick questions and SPARK will scan your website, learn your brand and get your ads ready." Pipeline pillars: **Brand Intelligence → Audience Mapping → Product Catalogue → AI Ad Generation**; "Let's Go →" ("Takes about 2 minutes"). NOT started (would trigger website scanning + AI onboarding).
- **Reports** (Ads area) — "Ads Reports": campaign table (Ad Account, Created, …) for Meta Lead Ads; empty.

## Cross-cutting conclusions
- WTL is a 3-product suite: **Listings/Reputation (Locations)**, **Customer Engagement (Engage: social care + helpdesk + CRM)**, **Advertising (Ads: campaign engine + AI creative + onboarding kit)**.
- AI is embedded in every area: review replies + tone (Locations), auto-replies + brand voice + sentiment themes (Engage), AI creative + SPARK brand intelligence (Ads), plus AI Location Studio scoring/audit.
- Identity/persona: greeting "Good afternoon, Dhruv." (time-based personalization on dashboards).
