import { Check, Minus, Sparkles, X } from 'lucide-react'
import { SectionHeading } from './primitives'
import { Reveal } from './reveal'

const rows = [
  {
    feature: 'Profile Drift Detection & Auto-Revert',
    desc: 'Catches unauthorized user edits to hours, phone numbers, and photos on Google Maps.',
    traditional: 'Manual checks (missed until customers complain)',
    agencies: 'Sporadic monthly audits',
    wtl: '24/7 Profile Guard with 1-click revert',
  },
  {
    feature: 'Store Manager WhatsApp Escalations',
    desc: 'Instant WhatsApp alerts to store managers for 1-star reviews or safety issues.',
    traditional: false,
    agencies: false,
    wtl: 'Dispatched in < 45s with resolution SOP',
  },
  {
    feature: 'Unified Omnichannel Review Inbox',
    desc: 'Aggregates Google, Instagram, Meta, and Play Store reviews in one inbox.',
    traditional: '7+ tabs and separate logins',
    agencies: 'Delayed weekly spreadsheets',
    wtl: 'Real-time unified stream with sentiment tags',
  },
  {
    feature: 'AI-Drafted Replies with Human Approval',
    desc: 'On-brand responses prepared instantly, posting only after central or store approval.',
    traditional: false,
    agencies: 'Generic copy-paste templates',
    wtl: 'Context-aware AI drafts with guardrails',
  },
  {
    feature: 'Hyperlocal Radius Ad Targeting',
    desc: 'Performance Max & Meta ads bounded by the true travel radius of each outlet.',
    traditional: false,
    agencies: 'Generic national/city-wide ad spend',
    wtl: 'Per-store km radius with budget pacing',
  },
  {
    feature: 'Automatic Lead Routing to Nearest Outlet',
    desc: 'Delivers incoming ad leads directly to the nearest branch or showroom staff.',
    traditional: false,
    agencies: 'Manual CSV export sent next day',
    wtl: 'Instant Geo-routing to branch rep',
  },
]

export function Comparison() {
  return (
    <section id="comparison" aria-labelledby="comparison-title" className="border-t border-line bg-card/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            id="comparison-title"
            eyebrow="The Difference"
            title="Why leading multi-outlet brands switch to What The Local."
            description="Spreadsheets miss rogue profile changes. Agencies run generic national ads. What The Local unites your presence, reviews, and growth in one living workspace."
          />
        </Reveal>

        <div className="mt-12 overflow-x-auto">
          <div className="min-w-[700px] overflow-hidden rounded-card border border-line bg-card shadow-card">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-line bg-sunken/60 text-xs font-semibold uppercase tracking-wider text-ink-3">
                  <th scope="col" className="p-4 md:p-5 w-[36%]">
                    Capability
                  </th>
                  <th scope="col" className="p-4 md:p-5 w-[20%]">
                    Spreadsheets & In-house
                  </th>
                  <th scope="col" className="p-4 md:p-5 w-[20%]">
                    Traditional Agencies
                  </th>
                  <th scope="col" className="p-4 md:p-5 w-[24%] bg-brand-subtle text-ink font-bold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-brand" />
                      What The Local
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-sm">
                {rows.map((r, i) => (
                  <tr key={r.feature} className="transition-colors hover:bg-hover/50">
                    <td className="p-4 md:p-5">
                      <p className="font-semibold text-ink">{r.feature}</p>
                      <p className="mt-1 text-xs text-ink-3 leading-relaxed">{r.desc}</p>
                    </td>
                    <td className="p-4 md:p-5 text-ink-2 align-middle">
                      {typeof r.traditional === 'boolean' ? (
                        r.traditional ? (
                          <Check className="size-4 text-success" />
                        ) : (
                          <X className="size-4 text-ink-disabled" />
                        )
                      ) : (
                        <span className="text-xs text-ink-3">{r.traditional}</span>
                      )}
                    </td>
                    <td className="p-4 md:p-5 text-ink-2 align-middle">
                      {typeof r.agencies === 'boolean' ? (
                        r.agencies ? (
                          <Check className="size-4 text-success" />
                        ) : (
                          <X className="size-4 text-ink-disabled" />
                        )
                      ) : (
                        <span className="text-xs text-ink-3">{r.agencies}</span>
                      )}
                    </td>
                    <td className="p-4 md:p-5 bg-brand-subtle/40 align-middle">
                      <span className="flex items-center gap-2 font-medium text-ink text-xs md:text-sm">
                        <Check className="size-4 text-brand shrink-0" />
                        {r.wtl}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
