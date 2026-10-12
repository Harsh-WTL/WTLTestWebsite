'use client'

import { Link2, Radar, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useInView } from '@/lib/hooks'
import { SectionHeading } from './primitives'
import { Reveal } from './reveal'

const steps = [
  {
    icon: Link2,
    title: 'Connect every location',
    body: 'Bring each store’s profiles, review sources, social accounts, and ad accounts into one workspace, organised by region.',
    product: 'Locations',
  },
  {
    icon: Radar,
    title: 'Listen across channels',
    body: 'Every review, comment, and message is tagged with its location, sentiment, and topic the moment it arrives.',
    product: 'Engage',
  },
  {
    icon: Zap,
    title: 'Act locally, at scale',
    body: 'Reply with on-brand drafts, guard profiles from unwanted edits, and point spend at the stores and radius that need it.',
    product: 'Synapse',
  },
]

export function HowItWorks() {
  const { ref, inView } = useInView<HTMLOListElement>({ threshold: 0.3 })
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            id="how-title"
            eyebrow="How it works"
            title="From signal to local action in one place."
            description="Each product handles one part of the loop, and they share the same locations, data, and context."
          />
        </Reveal>

        <ol ref={ref} className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          <span aria-hidden="true" className="absolute left-5 right-[16%] top-5 hidden h-px bg-line md:block">
            <span
              className={cn(
                'block h-full origin-left bg-brand transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)]',
                inView ? 'scale-x-100' : 'scale-x-0',
              )}
            />
          </span>
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={cn(
                'relative transition-[opacity,transform] duration-500',
                !inView && '[.js_&]:translate-y-3 [.js_&]:opacity-0 motion-reduce:translate-y-0! motion-reduce:opacity-100!',
              )}
              style={{ transitionDelay: `${i * 220}ms` }}
            >
              <span className="relative z-10 flex size-10 items-center justify-center rounded-full border border-brand-border bg-brand-subtle text-ink">
                <s.icon aria-hidden="true" className="size-[18px]" />
              </span>
              <p className="mt-6 font-mono text-xs text-ink-3">
                0{i + 1} · {s.product}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
