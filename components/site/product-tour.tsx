'use client'

import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { SampleBadge } from './primitives'
import { Reveal } from './reveal'
import { LocationsView } from './views/locations-view'
import { EngageView } from './views/engage-view'
import { AdsView } from './views/ads-view'
import styles from './product-tour.module.css'

const products = [
  {
    id: 'locations',
    name: 'Locations',
    mono: 'LOC',
    tagline: 'Google Business Profile Suite',
    title: 'Manage your local presence at scale.',
    body: 'Bring location information, reviews, profile changes and local publishing workflows into one organised workspace.',
    points: [
      'Location and listing management',
      'Review management and sentiment analysis',
      'AI-assisted review response workflows',
      'Profile Guard and listing-change review',
      'AI Location Studio',
      'Google Business Profile post scheduling',
      'QR code generation',
      'Per-location microsite workflows',
      'Location reports and data management',
    ],
    hint: 'Select North Mall to see Profile Guard edit detection, or open AI Location Studio for Downtown Branch score.',
    View: LocationsView,
  },
  {
    id: 'engage',
    name: 'Engage',
    mono: 'ENG',
    tagline: 'Omnichannel Helpdesk',
    title: 'Turn customer interactions into organised workflows.',
    body: 'Bring customer conversations into a shared workflow where teams can review, assign, respond and understand customer interactions.',
    points: [
      'Social comments and messages',
      'Email ticketing',
      'Ad comments',
      'App-store reviews',
      'Agent Queue and ticket management',
      'Team assignment and alerts',
      'Customer and sentiment analytics',
      'Response Studio and brand voice controls',
      'AI-assisted response configuration',
    ],
    hint: 'Open Agent Queue to see pipeline, or Configure → Response Studio for AI auto-reply settings.',
    View: EngageView,
  },
  {
    id: 'ads',
    name: 'Synapse Ads',
    mono: 'ADS',
    tagline: 'AI Advertising Engine',
    title: 'Build more informed local advertising workflows.',
    body: 'Explore advertising tools, AI-assisted creative preparation and a structured approach to getting campaigns ready.',
    points: [
      'Google Ads and Meta Lead Ads surfaces',
      'AI Creative Studio: 5-step wizard (Business→Style→Message→Visuals→Size)',
      'SPARK: 3 questions → Brand Intelligence → Audience Mapping → Product Catalogue → AI Ad Generation',
      'Reports: Meta Lead Ads campaign table + scheduled delivery',
      'Per-location radius targeting + lead routing to nearest branch',
    ],
    hint: 'Open AI Creative Studio to generate ad creative, or SPARK to scan your site for ad readiness.',
    View: AdsView,
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
                  {product.name} <i>· Sample region</i>
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