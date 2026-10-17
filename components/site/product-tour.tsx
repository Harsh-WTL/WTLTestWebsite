'use client'

import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { SampleBadge } from './primitives'
import { Reveal } from './reveal'
import { LocationsView } from './views/locations-view'
import { EngageView } from './views/engage-view'
import { SynapseView } from './views/synapse-view'
import styles from './product-tour.module.css'

const products = [
  {
    id: 'locations',
    name: 'Locations',
    mono: 'LD',
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
    mono: 'RA',
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
    mono: 'HΣ',
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
  const [glare, setGlare] = useState(0)
  const [ind, setInd] = useState<{ left: number; width: number } | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const product = products[active]

  useEffect(() => {
    const measure = () => {
      const el = tabRefs.current[active]
      if (el) setInd({ left: el.offsetLeft - 3, width: el.offsetWidth })
    }
    measure()
    window.addEventListener('resize', measure)
    // tab labels can shift width when the display font swaps in
    document.fonts?.ready.then(measure).catch(() => {})
    return () => window.removeEventListener('resize', measure)
  }, [active])

  const pick = (i: number) => {
    if (i === active) return
    setActive(i)
    setGlare((g) => g + 1)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = products.length - 1
    let next: number | null = null
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    pick(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="products" aria-labelledby="products-title" className={styles.tour}>
      <div className={styles.wrap}>
        <div className={styles.tourGrid}>
          <Reveal className={styles.tourLeft}>
            <span className={styles.eyebrowChip}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              The products
            </span>
            <h2 id="products-title" className={styles.sTitle}>
              Three products. One set of locations.
            </h2>
            <p className={styles.sDesc}>Try each one below. Everything here is sample data you can click through.</p>

            <div className={styles.tourRail}>
              <p className={styles.tagTagline}>{product.tagline}</p>
              <h3 className={styles.tPointTitle}>{product.title}</h3>
              <p className={styles.tPointBody}>{product.body}</p>
              <ul className={styles.points}>
                {product.points.map((pt) => (
                  <li key={pt} className={styles.point}>
                    <span className={styles.pointChk} aria-hidden="true">
                      <Check />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              <p className={styles.tryNote}>
                <b>Try it:</b> {product.hint}
                <span className={styles.tryArrow} aria-hidden="true">
                  →
                </span>
              </p>
            </div>
          </Reveal>

          {/* right: tabs + artifact rise to the section top */}
          <Reveal delay={160} className={styles.tourRight}>
            <div className={styles.tabWrap} role="tablist" aria-label="Products" onKeyDown={onKeyDown}>
              <span
                aria-hidden="true"
                className={styles.tabIndicator}
                style={{
                  width: ind?.width,
                  transform: `translateX(${ind ? ind.left : 0}px)`,
                  opacity: ind ? 1 : 0,
                }}
              />
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
                  onClick={() => pick(i)}
                  className={styles.tabBtn}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <div
              id={`panel-${product.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${product.id}`}
              className={styles.pframe}
            >
              <div className={styles.ptop}>
                <p className={styles.ptName}>
                  <span className={styles.ptMonogram} aria-hidden="true">
                    {product.mono}
                  </span>
                  {product.name} <i>· Mumbai region</i>
                </p>
                <SampleBadge />
              </div>
              <div key={product.id} className={styles.swap}>
                <product.View />
              </div>
              <span
                key={glare}
                aria-hidden="true"
                className={cn(styles.pframeGlare, glare > 0 && styles.glareRun)}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
