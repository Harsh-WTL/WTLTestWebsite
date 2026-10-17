'use client'

import { Check, Sparkles, X } from 'lucide-react'
import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { useInView } from '@/lib/hooks'
import { Reveal } from './reveal'
import styles from './comparison.module.css'

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
    agencies: false as const,
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
] as const

/* boolean cells mark "not offered" in this product space; keep X for false,
   Check for true (parity with the original cells) */
function Cell({ v }: { v: string | boolean }) {
  if (typeof v === 'boolean') {
    return (
      <span className={styles.cellNo} aria-hidden="true">
        {v ? <Check /> : <X />}
      </span>
    )
  }
  return <span>{v}</span>
}

export function Comparison() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.22 })

  return (
    <section id="comparison" aria-labelledby="comparison-title" className={styles.cmp}>
      <div className={styles.wrap}>
        <Reveal>
          <span className={styles.eyebrowChip}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            The Difference
          </span>
          <h2 id="comparison-title" className={styles.sTitle}>
            Why leading multi-outlet brands <span className={styles.sAccent}>switch to What The Local.</span>
          </h2>
          <p className={styles.sDesc}>
            Spreadsheets miss rogue profile changes. Agencies run generic national ads. What The Local
            unites your presence, reviews, and growth in one living workspace.
          </p>
        </Reveal>

        <div
          ref={ref}
          data-in={inView ? 'true' : 'false'}
          className={styles.cmpWrap}
        >
          <div className={styles.cmpCard}>
            <div className={styles.cmpScroll}>
              <table className={styles.cmpTable}>
                <thead>
                  <tr>
                    <th scope="col" className={styles.thC1}>
                      Capability
                    </th>
                    <th scope="col" className={styles.thW}>
                      Spreadsheets &amp; In-house
                    </th>
                    <th scope="col" className={styles.thA}>
                      Traditional Agencies
                    </th>
                    <th scope="col" className={cn(styles.wtlCol, styles.thWtl)}>
                      <span className={styles.wtlHead}>
                        <Sparkles aria-hidden="true" />
                        What The Local
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.feature} style={{ '--rd': `${i * 70}ms` } as CSSProperties}>
                      <td className={styles.c1}>
                        <b>{r.feature}</b>
                        <i>{r.desc}</i>
                      </td>
                      <td>
                        <Cell v={r.traditional} />
                      </td>
                      <td>
                        <Cell v={r.agencies} />
                      </td>
                      <td className={cn(styles.wtlCol, styles.wtlTd)}>
                        <span className={styles.chk}>
                          <span className={styles.chkIc} aria-hidden="true">
                            <Check />
                          </span>
                          <span className={styles.chkTxt}>{r.wtl}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
