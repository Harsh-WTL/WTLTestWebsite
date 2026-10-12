import { Clock, MessagesSquare, Target } from 'lucide-react'
import { Panel, SectionHeading } from './primitives'
import { Reveal } from './reveal'

const problems = [
  {
    icon: Clock,
    title: 'Profiles drift',
    body: 'Hours, phone numbers, and photos change on Google and Maps without anyone at head office noticing — until a customer shows up to a closed door.',
    visual: (
      <div className="rounded-ctl border border-line bg-raised p-3 text-[13px]">
        <p className="text-[11px] text-ink-3">Saturday hours · Thane</p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-ink-3 line-through">10:00 – 20:00</span>
          <span aria-hidden="true" className="text-ink-3">→</span>
          <span className="font-semibold text-warning">10:00 – 18:00</span>
        </div>
        <p className="mt-1.5 text-[11px] text-ink-3">Edited by a Google user · unreviewed</p>
      </div>
    ),
  },
  {
    icon: MessagesSquare,
    title: 'Conversations scatter',
    body: 'Reviews, comments, and DMs arrive across a handful of platforms and dozens of locations, each in a different inbox with a different owner.',
    visual: (
      <div className="flex flex-wrap gap-1.5">
        {['Google', 'Instagram', 'Facebook', 'YouTube', 'Play Store', 'App Store', 'Email'].map((c) => (
          <span key={c} className="rounded-full border border-line bg-raised px-2.5 py-1 text-[12px] font-medium text-ink-2">
            {c}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: Target,
    title: 'Growth stays generic',
    body: 'Campaigns get planned nationally while demand is local, so spend lands far from the store that could actually serve the customer.',
    visual: (
      <div className="rounded-ctl border border-line bg-raised p-3">
        <div className="flex items-end gap-1.5" aria-hidden="true">
          {[30, 52, 22, 68, 40, 18, 58].map((h, i) => (
            <span key={i} className="w-full rounded-t-[4px] bg-[var(--viz-1-soft)]" style={{ height: `${h * 0.6}px` }} />
          ))}
        </div>
        <p className="mt-2 text-[11px] text-ink-3">Same budget, every store, regardless of local demand</p>
      </div>
    ),
  },
]

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="border-t border-line bg-card/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            id="problem-title"
            eyebrow="The multi-location problem"
            title="Twelve stores. Seven channels. One small team."
            description="Most brands manage local marketing across disconnected tools. Nothing is wrong at any single location — it just slips quietly everywhere at once."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <Panel as="article" className="flex h-full flex-col p-6">
                <span className="flex size-10 items-center justify-center rounded-ctl border border-line bg-sunken">
                  <p.icon aria-hidden="true" className="size-[18px] text-ink-2" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.015em]">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{p.body}</p>
                <div className="mt-auto pt-6">{p.visual}</div>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
