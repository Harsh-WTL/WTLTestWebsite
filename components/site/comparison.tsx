'use client'

import { Building2, MessageSquare, ShieldAlert, Users, Megaphone, Bot, FileText, BarChart2, Settings } from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { useInView } from '@/lib/hooks'
import { Reveal } from './reveal'
import styles from './comparison.module.css'

// Data
const locationsItems = [
  'Google Business Profile listing management',
  'Manage location data in bulk',
  'Location health scoring and monitoring',
  'Multi-account and multi-region organisation',
]

const engageItems = [
  'Unified inbox for customer conversations',
  'Agent Queue with organised ticket workflows',
  'Round-robin ticket assignment',
  'Customer CRM with interaction history',
  'AI-assisted response reporting',
]

const synapseItems = [
  'Synapse Ads with Google Ads and Meta Lead Ads surfaces',
  'AI Creative Studio for ad creative preparation',
  'SPARK advertising-readiness workflow',
  'Per-location radius targeting',
  'Lead routing to the nearest branch',
]

type Category = 'locations' | 'engage' | 'synapse'

const categories = [
  {
    key: 'locations',
    title: 'Location presence management',
    desc: 'Centralise Google Business Profile listings across every location with health scoring and multi-region organisation.',
    items: locationsItems,
    Icon: Building2,
  },
  {
    key: 'engage' as Category,
    title: 'Reviews and reputation workflows',
    desc: 'Unified review inbox with AI-assisted replies, sentiment analysis and configurable response rules.',
    items: engageItems,
    Icon: MessageSquare,
  },
  {
    key: 'synapse' as Category,
    title: 'Advertising and creative workflows',
    desc: 'Synapse Ads with Google Ads and Meta Lead Ads, AI Creative Studio, SPARK readiness and radius targeting.',
    items: synapseItems,
    Icon: Megaphone,
  },
] as const

export function Comparison() {
  const reduced = false // usePrefersReducedMotion() - keep simple for now
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.22 })

  return (
    <section id="comparison" aria-labelledby="comparison-title" className={styles.cmp}>
      <div className={styles.wrap}>
        <Reveal>
          <span className={styles.eyebrowChip}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Platform capabilities
          </span>
          <h2 id="comparison-title" className={styles.sTitle}>
            Everything your local marketing teams need, <span className={styles.sAccent}>in one platform.</span>
          </h2>
          <p className={styles.sDesc}>
            What The Local brings location presence, customer engagement and local advertising workflows
            together for multi-location businesses.
          </p>
        </Reveal>

        <div
          ref={ref}
          data-in={inView ? 'true' : 'false'}
          className={styles.cmpGrid}
          role="region"
          aria-label="Platform capability categories"
        >
          {categories.map((cat, i) => {
            const isLast = i === categories.length - 1
            const delays = ['40ms', '110ms', '180ms', '250ms', '320ms', '390ms', '460ms', '530ms', '600ms']
            return (
              <article
                key={cat.key}
                className={cn(styles.capCard, isLast && styles.lastCard)}
                style={{ '--d': delays[i] || '40ms' } as CSSProperties}
                data-in={inView ? 'true' : 'false'}
              >
                <header className={styles.capHeader}>
                  <div className={styles.capIcon}>
                    <cat.Icon aria-hidden="true" />
                  </div>
                  <div className={styles.capMeta}>
                    <h3 className={styles.capTitle}>{cat.title}</h3>
                    <p className={styles.capDesc}>{cat.desc}</p>
                  </div>
                </header>

                <div className={styles.capPanel}>
                  <ul className={styles.capList}>
                    {cat.items.map((item, j) => (
                      <li key={item} className={styles.capItem}>
                        <span className={styles.chkIc} aria-hidden="true">
                          {cat.key === 'locations' && <Building2 size={8} />}
                          {cat.key === 'engage' && <MessageSquare size={8} />}
                          {cat.key === 'synapse' && <Megaphone size={8} />}
                        </span>
                        <span className={styles.capText}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}