# Module Findings — Support Cases (Google group)

> Verified from live staging: https://app.staging.whatthelocal.com/google-cases
> Screenshots: 20-support-cases.png

## What it does
Ticketing system for **Google listing support issues** — primarily escalations raised from the "Not Published" module ("Raise" button), with a message thread per case.

## Page structure (verified)
- Heading: **Support Cases**; **New Case** button (manual case creation — NOT clicked).
- **Case list** (left): each row = title `"Not published by Google: <location name>"`, metadata **"Google Listing · <date>"**, priority **"normal"**, status **Open / In Progress**. Observed 6 cases (Sep 20–27, 2026), all auto-created from Not Published escalations.
- **Detail panel** (right, switches on row click — verified): case title + type/priority/status chips, **description** (e.g., "Phone number held by Google since 9 days. Please take it up with Google Business Profile support."), conversation area ("No messages yet. Start the conversation below."), **message composer**: textbox "Type your message…" + **Send** button (disabled until text; "Ctrl/⌘ + Enter sends").

## Purpose / business problem
- Gives brands a tracked channel with WTL support for Google listing problems (e.g., stuck/declined edits), with full conversation history per issue instead of ad-hoc emails.

## Who uses it
- Brand ops teams; WTL customer support; agencies managing listings for clients.

## Inputs / outputs
- Inputs: case (title, description, type "Google Listing", priority), user messages.
- Outputs: case statuses (Open → In Progress → presumably Resolved), threaded messages, support responses.

## AI capabilities
- None observed.

## Connections
- **Not Published** module: "Raise"/"Raise with support" buttons create cases here (case titles match its diagnosis rows verbatim).
- Google Listing type suggests future case types for other Google issues.

## Not tested (read-only policy)
- New Case, Send message, status changes.

## Unknowns
- Full status lifecycle (Resolved/Closed states not observed); priority options beyond "normal"; whether New Case supports other case types.
