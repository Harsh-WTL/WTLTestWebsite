import { Building, Clock, Flame, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'
import { Reveal } from './reveal'

const stats = [
  {
    icon: Building,
    value: '8,400+',
    label: 'Storefronts Managed',
    sub: 'across 42 metro & tier-2 cities',
  },
  {
    icon: ShieldCheck,
    value: '124,000+',
    label: 'Reviews Patrolled Daily',
    sub: 'autonomous 24/7 sentiment AI',
  },
  {
    icon: Flame,
    value: '< 45s',
    label: 'WhatsApp Escalation',
    sub: 'instant alert to branch managers',
  },
  {
    icon: TrendingUp,
    value: '+28%',
    label: 'Catchment Footfall',
    sub: '3-km radius bounded ad engine',
  },
]

const industries = [
  { name: 'Automotive Dealerships', count: '1,800+ Showrooms' },
  { name: 'Healthcare & Clinics', count: '940+ Centres' },
  { name: 'Retail Chains', count: '3,200+ Outlets' },
  { name: 'Restaurants & QSR', count: '1,450+ Outlets' },
  { name: 'Banking & Branches', count: '1,000+ Branches' },
]

export function MetricsBar() {
  return (
    <section aria-label="Key performance metrics" className="border-y border-line bg-card/60 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <Reveal>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {stats.map((s) => (
              <div key={s.label} className="flex items-start gap-3.5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-ctl border border-line bg-sunken text-brand shadow-sm">
                  <s.icon aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <div className="tnum text-2xl font-bold tracking-tight text-ink md:text-3xl">
                    {s.value}
                  </div>
                  <div className="text-sm font-semibold text-ink">{s.label}</div>
                  <div className="text-xs text-ink-3">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-line/60 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-3">
                Industry Footprints:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {industries.map((ind) => (
                  <span
                    key={ind.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-sunken px-3 py-1 text-xs font-medium text-ink-2"
                  >
                    <span className="font-semibold text-ink">{ind.name}</span>
                    <span className="text-[11px] font-mono text-ink-3">({ind.count})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
