'use client'

import { useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Panel, SampleBadge, SectionHeading } from './primitives'
import { Reveal } from './reveal'
import { LocationsView } from './views/locations-view'
import { EngageView } from './views/engage-view'
import { SynapseView } from './views/synapse-view'

const products = [
  {
    id: 'locations',
    name: 'Locations',
    tagline: 'LOC-D // Listing & SEO Atlas',
    title: 'Every storefront indexed, protected, and ranking #1.',
    body: 'Monitor the health of every outlet on one map. 24/7 Profile Guard catches unauthorized edits to hours, numbers, and categories before customers encounter a closed door.',
    points: ['24/7 Profile Guard against rogue user edits', 'Bulk sync to Google, Apple Maps & Bing Places', 'Per-city Geo-Grid keyword ranking & health scores'],
    hint: 'Select Thane to inspect the detected Saturday hours change, then 1-click revert it.',
    View: LocationsView,
  },
  {
    id: 'engage',
    name: 'Engage',
    tagline: 'REP-A // Reputation Core & Patrol',
    title: 'One inbox for every review, comment, and message.',
    body: 'Autonomous AI patrol across Google, Instagram, Facebook, and App Store reviews. AI drafts on-brand replies with approval guardrails, while 1-star complaints trigger instant WhatsApp alerts to store managers.',
    points: ['Unified inbox across Google, Meta & App Stores', 'Instant WhatsApp escalations for 1★ reviews (< 45s)', 'Editable AI drafts with central or store approval'],
    hint: 'Pick Rhea S., toggle "Store WhatsApp Alert" to see the manager notification, or approve the reply.',
    View: EngageView,
  },
  {
    id: 'synapse',
    name: 'Synapse',
    tagline: 'HYP-Σ // Hyperlocal Ad Network',
    title: 'Spend where each store can actually serve.',
    body: 'Run Performance Max and Meta Lead Ads per location, with a targeting radius around each store and leads routed directly to the nearest branch rep.',
    points: ['Per-store targeting radius (1–6 km)', 'Live household & footfall catchment projection', 'Leads auto-routed to the nearest store sales rep'],
    hint: 'Pick a campaign and drag the radius slider to project local reach.',
    View: SynapseView,
  },
] as const

export function ProductTour() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const product = products[active]

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = products.length - 1
    let next: number | null = null
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="products" aria-labelledby="products-title" className="border-t border-line bg-card/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="products-title"
            eyebrow="The products"
            title="Three products. One set of locations."
            description="Try each one below. Everything here is sample data you can click through."
          />
          <div
            role="tablist"
            aria-label="Products"
            onKeyDown={onKeyDown}
            className="inline-flex shrink-0 self-start rounded-full border border-line bg-sunken p-1 md:self-auto"
          >
            {products.map((p, i) => (
              <button
                key={p.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                id={`tab-${p.id}`}
                role="tab"
                type="button"
                aria-selected={active === i}
                aria-controls={`panel-${p.id}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,color,box-shadow] duration-200',
                  active === i ? 'bg-card text-ink shadow-pill' : 'text-ink-2 hover:text-ink',
                )}
              >
                {p.name}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          key={product.id}
          id={`panel-${product.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${product.id}`}
          className="enter-rise mt-12 grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10"
        >
          <div className="lg:pt-2">
            <p className="font-mono text-xs uppercase tracking-[0.09em] text-brand">{product.tagline}</p>
            <h3 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.025em] md:text-[28px] md:leading-tight">
              {product.title}
            </h3>
            <p className="mt-3 text-pretty text-[15px] leading-relaxed text-ink-2">{product.body}</p>
            <ul className="mt-6 grid gap-3">
              {product.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-[15px]">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-subtle">
                    <Check aria-hidden="true" className="size-3 text-brand" />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-ctl border border-dashed border-line-strong px-3.5 py-3 text-[13px] text-ink-2">
              <span className="font-semibold text-ink">Try it: </span>
              {product.hint}
            </p>
          </div>

          <Panel className="overflow-hidden shadow-raised">
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <p className="text-sm font-semibold">
                {product.name} <span className="font-normal text-ink-3">· Mumbai region</span>
              </p>
              <SampleBadge />
            </div>
            <product.View />
          </Panel>
        </div>
      </div>
    </section>
  )
}
