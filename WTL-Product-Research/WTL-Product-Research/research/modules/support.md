# Module Findings — Support (Account group)

> Verified from live staging: https://app.staging.whatthelocal.com/support
> Snapshot: support.yml

## What it does
**Support ticketing** — the same case system as Google group's "Support Cases" (identical list + detail UI), reachable from a second nav entry so users find it under Account as well.

## Page structure (verified)
- Heading **Support**; **New Ticket** button (NOT clicked).
- Ticket list: title ("Not published by Google: <location>"), meta "Google Listing · <date>", priority "normal", status Open / In Progress — same 6 scale-test cases as /google-cases.
- Detail panel: type/priority/status chips, description, conversation area ("No messages yet. Start the conversation below."), message composer (Send disabled until text; Ctrl/⌘+Enter).

## Purpose / business problem
- One place for customers to reach WTL support for any issue (currently populated only by auto-created Google Listing cases from the Not Published module).

## Who uses it
- All dashboard users needing help; WTL support agents.

## Inputs / outputs
- Inputs: tickets (manual "New Ticket" or auto-created from Not Published "Raise"), user messages.
- Outputs: threaded conversations, status transitions.

## AI capabilities
- None observed.

## Connections
- Not Published module (auto-created cases); Support Cases (/google-cases) — same backend.

## Not tested (read-only policy)
- New Ticket, Send message.

## Unknowns
- Whether /support and /google-cases will diverge (one per Google issues, one general); ticket types available in New Ticket; SLA/priority options.
