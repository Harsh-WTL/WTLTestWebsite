# Module Findings — Settings (Account group)

> Verified from live staging: https://app.staging.whatthelocal.com/settings
> Snapshot: settings.yml

## What it does
Workspace-level configuration of the **AI reply brand voice**: "Customize the voice and style of AI-generated review replies. This applies to both auto-replies and on-demand suggestions."

## Page structure (verified)
- Heading **Settings**; single card: **AI Reply Tone**
  - **Tone Instructions** textarea (1000 chars; currently "warm, professional, concise"): "Describe how you want AI replies to sound — tone, style, phrases to include or avoid."
  - **Quick presets**: Friendly & Casual · Professional & Formal · Empathetic & Caring · Short & Direct
  - **Save Tone** / **Discard** (disabled until edits; NOT saved per read-only policy).

## Purpose / business problem
- AI-generated replies must sound like the brand, not a generic bot. One central voice config drives both the automatic auto-reply engine and on-demand reply suggestions across the whole portfolio.

## Who uses it
- Brand/marketing owners; the "Manage Response Studio (brand voice + AI master switch)" permission in User Management maps to this area.

## Inputs / outputs
- Inputs: free-text tone instructions + presets.
- Outputs: prompt guidance consumed by `generate-review-reply` and the auto-reply engine.

## AI capabilities
- This IS an AI control surface: brand-voice prompt configuration for review reply generation (per-product; Engage has its own "Response Studio (brand voice + AI master switch)" per the permission model).

## Connections
- Reviews module (on-demand AI reply + auto-reply engine); User Management (permission-gated).

## Not tested (read-only policy)
- Save Tone, presets application.

## Unknowns
- Whether tone supports variables (store name placeholder — example text mentions signing off with store name); per-location or per-group tone overrides; AI master switch location.
