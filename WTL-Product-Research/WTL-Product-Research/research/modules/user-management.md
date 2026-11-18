# Module Findings — User Management (Account group)

> Verified from live staging: https://app.staging.whatthelocal.com/user-management
> Snapshots: user-management.yml, user-edit-access.yml · Screenshots: 25-user-edit-access-permissions.png
> Anonymization: emails are scale-test (@staging.invalid); shown as patterns only.

## What it does
**Team/permissions management** ("Team Management"): invite members, assign roles and granular permissions, scope access by geography or location list.

## Page structure (verified)
- Heading **Team Management**; **Invite Member** button (dialog NOT opened/submitted).
- "Team (50) — People with access to your business dashboard"; search by names/emails.
- **Member row anatomy**: name, **role chip** (Owner / Custom), status — **"Signed up"** or **"Invitation pending"** (tooltip: "Invitation sent, hasn't clicked the magic link yet"), email, permission count ("Full access" for Owner / "10 permissions" etc.).
- Row actions: **Send the invitation email again** (pending only), **Edit access**, **Remove from the team** (NOT used).
- Login model: **magic-link invitations** (email-based, no password set at invite time).

## Edit Access dialog — full RBAC model (verified)
- **Product scoping**: All products / **Locations** / **Engage** / **Advertising** — "Scopes the permissions and role presets below to a single product."
- **Role presets**: Owner · Regional Manager · Store Manager · Review Handler · Report Viewer · Content Creator · Engage Agent · Engage Lead · Engage Read-Only · Custom ("Pick and choose permissions").
- **Location Access scoping**: All Locations / By State / By City / By Pincode / By Zone / Specific Locations.
- **Permissions** (grouped):
  - General: View Dashboard
  - Reports: View Reports
  - Locations: View Locations, Edit Locations
  - Reviews: View Reviews, Reply to Reviews
  - Posts: View Posts, Create Posts
  - Profile Guard: View Profile Guard, Manage Profile Guard
  - Creative: **Use Creative Studio**
  - Inbox: View Inbox (**Comments / DMs / Mentions**), Send replies, Edit sent replies, Delete items / replies, Assign items to other agents, Escalate and resolve items
  - Configure: **Manage Response Studio (brand voice + AI master switch)**, Manage channels (SLA, auto-reply settings), Manage team (invite / roles)
  - Insights: View Engage Analytics + Reports
  - Advertising: Manage Ads
  - Admin: Manage Users
- Buttons: Cancel / **Save Permissions** (NOT saved).

## Strategic reveal (from permission model)
- Confirms three product areas: **Locations, Engage, Advertising** (matches top-level area buttons).
- Unrevealed modules referenced by permissions: **Creative Studio** (asset creation), **Inbox** (social comments/DMs/mentions with agent assignment, SLA, escalation — a social care helpdesk), **Response Studio** (brand voice + AI master switch, auto-reply settings per channel), **Engage Analytics**.

## Purpose / business problem
- Multi-brand/multi-region teams need least-privilege access: regional/store managers see only their area; agencies get scoped roles; social care agents get inbox rights without listing edit rights.

## Who uses it
- Workspace owners/admins; IT/security; agency account managers.

## Inputs / outputs
- Inputs: member emails, role presets or custom permission sets, product + location scoping.
- Outputs: access control across all modules; invitations (magic link).

## AI capabilities
- Permission "Manage Response Studio (brand voice + AI master switch)" confirms a workspace-level **AI master switch** exists in Engage configuration.

## Connections
- All modules (authorization layer); Activity log (user actions); top-level areas (product scoping).

## Not tested (read-only policy)
- Invite Member, re-send invitation, Save Permissions, Remove from team.

## Unknowns
- Whether the same dialog handles re-invites; owner transfer; seat limits; SSO.
