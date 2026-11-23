'use client'

import { Building2, MessageSquare, Megaphone, TrendingUp, Users } from 'lucide-react'
import { useId, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { useInView, usePrefersReducedMotion } from '@/lib/hooks'
import styles from './metrics-bar.module.css'

/* Capability cards - three product areas */
const capabilities = [
  {
    icon: Building2,
    title: 'Locations',
    subtitle: 'Manage location presence',
    items: [
      'Listing and review management',
      'Profile Guard change review',
      'AI Location Studio',
      'Local publishing and scheduling',
    ],
  },
  {
    icon: MessageSquare,
    title: 'Engage',
    subtitle: 'Organise conversations',
    items: [
      'Unified inbox',
      'Agent queue and tickets',
      'Customer and sentiment analytics',
      'Response Studio and brand voice',
      'AI-assisted reply drafts',
    ],
  },
  {
    icon: Megaphone,
    title: 'Synapse Ads',
    subtitle: 'Support local advertising',
    items: [
      'Campaign preparation tools',
      'AI Creative Studio',
      'SPARK ad-readiness',
      'Per-location radius targeting',
    ],
  },
]

const industries = [
  { name: 'Healthcare & Diagnostics' },
  { name: 'Retail & Fashion' },
  { name: 'Automotive' },
  { name: 'Banking & NBFC' },
  { name: 'Restaurants & QSR' },
]

export function MetricsBar() {
  const reduced = usePrefersReducedMotion()
  const uid = useId().replace(/:/g, '')
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 })
  const run = inView || reduced

  return (
    <section aria-label="Product capabilities" className={styles.metrics}>
      <div className={styles.mWrap}>
        <div className={styles.mStripHead}>
          <span className={styles.mLive}>
            <span aria-hidden="true" className={styles.liveDot} />
            Product capabilities
          </span>
        </div>

        <div ref={ref} className={styles.mGrid}>
          {capabilities.map((cap, i) => {
            const delays = ['40ms', '110ms', '180ms']
            return (
              <div
                key={cap.title}
                className={cn(styles.stat, reduced && styles.statReduced)}
                style={{ '--d': delays[i] || '40ms' } as CSSProperties}
                data-in={run ? 'true' : 'false'}
              >
                <div className={styles.statInner}>
                  <div className={styles.statIcon}>
                    <cap.icon className="h-6 w-6" />
                  </div>
                  <h3 className={styles.statTitle}>{cap.title}</h3>
                  <p className={styles.statSub}>{cap.subtitle}</p>
                  <ul className={styles.statItems} aria-hidden="true">
                    {cap.items.map((item, j) => (
                      <li key={item} className={styles.statItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        <div className={styles.mFoot}>
          <span className={styles.mFootLabel}>Industries:</span>
          <div className={styles.mChips}>
            {industries.map((ind) => (
              <span key={ind.name} className={styles.indChip}>
                <b>{ind.name}</b>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}