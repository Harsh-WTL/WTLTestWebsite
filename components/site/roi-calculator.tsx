'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ChangeEvent } from 'react'
import { Calculator, Clock, ShieldAlert, Sparkles, TrendingUp, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { Reveal } from './reveal'
import { DemoButton } from './demo-dialog'
import styles from './roi-calculator.module.css'

type Fig = { hours: number; drifts: number; footfall: number; revenue: number }

function compute(locations: number, reviews: number): Fig & { totalReviews: number } {
  const totalReviews = locations * reviews
  return {
    totalReviews,
    hours: Math.round(locations * 3.5 + totalReviews * 0.15),
    drifts: Math.round(locations * 1.8),
    footfall: Math.round(locations * 180),
    revenue: Math.round(locations * 45000),
  }
}

const INITIAL = { locations: 25, reviews: 20 }

export function RoiCalculator() {
  const [locations, setLocations] = useState(INITIAL.locations)
  const [reviews, setReviews] = useState(INITIAL.reviews)
  const reduced = usePrefersReducedMotion()
  const results = useMemo(() => compute(locations, reviews), [locations, reviews])

  /* displayed (tweened) figures — SSR renders the final values */
  const [shown, setShown] = useState(compute(INITIAL.locations, INITIAL.reviews))
  const shownRef = useRef(shown)
  const rafRef = useRef<number | null>(null)
  const [pulse, setPulse] = useState(0) /* tapeline remount key: one sweep per recalculation */
  const [bump, setBump] = useState(0) /* figure-pop remount key */

  useEffect(() => {
    if (reduced) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      shownRef.current = results
      setShown(results)
      return
    }
    const target = results
    const cur = { ...shownRef.current }
    const step = () => {
      let done = true
      for (const k of ['hours', 'drifts', 'footfall', 'revenue'] as const) {
        const gap = target[k] - cur[k]
        if (Math.abs(gap) < Math.max(0.61, Math.abs(target[k]) * 0.0009)) cur[k] = target[k]
        else {
          cur[k] += gap * 0.22
          done = false
        }
      }
      shownRef.current = cur
      setShown({
        totalReviews: target.totalReviews,
        hours: Math.round(cur.hours),
        drifts: Math.round(cur.drifts),
        footfall: Math.round(cur.footfall),
        revenue: Math.round(cur.revenue),
      })
      rafRef.current = done ? null : requestAnimationFrame(step)
    }
    if (!rafRef.current) rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [results, reduced])

  const fillPct = (v: number, min: number, max: number) => `${((v - min) / (max - min)) * 100}%`

  const onSlide =
    (set: (n: number) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      set(Number(e.target.value))
      if (!reduced) setPulse((p) => p + 1)
    }

  const onRelease = () => {
    if (!reduced) setBump((b) => b + 1)
  }

  return (
    <section id="roi-calculator" aria-labelledby="roi-title" className={styles.roi}>
      <div className={styles.wrap}>
        <Reveal>
          <span className={styles.eyebrowChip}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Interactive ROI Calculator
          </span>
          <h2 id="roi-title" className={styles.sTitle}>
            Calculate what unmanaged locations <span className={styles.sAccent}>cost your brand.</span>
          </h2>
          <p className={styles.sDesc}>
            Adjust your outlet count to project time saved, revenue protected from profile drift, and local
            catchment growth.
          </p>
        </Reveal>

        <div className={styles.roiGrid}>
          {/* controls */}
          <Reveal delay={90} className={styles.ctlCard}>
            <p className={styles.ctlHead}>
              <Calculator aria-hidden="true" />
              Network Parameters
            </p>

            <div className={styles.field}>
              <div className={styles.fieldTop}>
                <label htmlFor="roi-locations">Total Active Outlets / Stores</label>
                <span className={styles.valChip}>{locations} stores</span>
              </div>
              <input
                id="roi-locations"
                className={styles.rng}
                type="range"
                min={5}
                max={200}
                step={5}
                value={locations}
                onChange={onSlide(setLocations)}
                onPointerUp={onRelease}
                onKeyUp={onRelease}
                style={{ '--fill': fillPct(locations, 5, 200) } as CSSProperties}
              />
              <div className={styles.ticks} aria-hidden="true">
                <span>5 locations</span>
                <span>50</span>
                <span>100</span>
                <span>200+</span>
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.fieldTop}>
                <label htmlFor="roi-reviews">Avg. Reviews per Store / Month</label>
                <span className={styles.valChip}>{reviews} reviews</span>
              </div>
              <input
                id="roi-reviews"
                className={styles.rng}
                type="range"
                min={5}
                max={80}
                step={5}
                value={reviews}
                onChange={onSlide(setReviews)}
                onPointerUp={onRelease}
                onKeyUp={onRelease}
                style={{ '--fill': fillPct(reviews, 5, 80) } as CSSProperties}
              />
              <div className={styles.ticks} aria-hidden="true">
                <span>5 reviews</span>
                <span>25</span>
                <span>50</span>
                <span>80+</span>
              </div>
            </div>

            <div className={styles.patrolNote}>
              <p className={styles.patrolHead}>
                <Sparkles aria-hidden="true" />
                Continuous Autonomous Patrol
              </p>
              Based on active data across <b>{results.totalReviews.toLocaleString()}</b> monthly customer
              interactions across your network.
            </div>
          </Reveal>

          {/* ledger */}
          <Reveal delay={180} className={styles.ledger}>
            <span
              key={`tape${pulse}`}
              aria-hidden="true"
              className={cn(styles.tapeline, pulse > 0 && styles.tapelineRun)}
            />
            <p className={styles.ledgerEyebrow}>Estimated Monthly Impact</p>
            <h3 className={styles.ledgerTitle}>Projected ROI with What The Local</h3>

            <div key={`row${bump}`} className={styles.leadRow}>
              {/* the anchor number */}
              <div className={styles.leadMain}>
                <div className={cn(styles.leadNum, bump > 0 && styles.bumpAnim)}>
                  ₹{shown.revenue.toLocaleString('en-IN')}
                </div>
                <div className={styles.leadCap}>
                  <span className={cn(styles.tileIc, styles.icBrand)} aria-hidden="true">
                    <Users />
                  </span>
                  Revenue Preserved
                </div>
                <p className={styles.leadSub}>Prevented closed-door dropoffs</p>
              </div>

              {/* stat rail */}
              <div className={styles.leadStats}>
                <div className={styles.sRow}>
                  <span className={cn(styles.tileIc, styles.icBrand)} aria-hidden="true">
                    <Clock />
                  </span>
                  <span className={styles.sTxt}>
                    <span className={styles.sName}>Manual Time Saved</span>
                    <span className={styles.sCap}>Automated review replies &amp; sync</span>
                  </span>
                  <span className={cn(styles.sVal, bump > 0 && styles.bumpAnim)}>
                    <b>{shown.hours}</b> <i>hrs/mo</i>
                  </span>
                </div>
                <div className={styles.sRow}>
                  <span className={cn(styles.tileIc, styles.icWarn)} aria-hidden="true">
                    <ShieldAlert />
                  </span>
                  <span className={styles.sTxt}>
                    <span className={styles.sName}>Drifts Prevented</span>
                    <span className={styles.sCap}>Rogue hours &amp; phone changes caught</span>
                  </span>
                  <span className={cn(styles.sVal, bump > 0 && styles.bumpAnim)}>
                    ~<b>{shown.drifts}</b> <i>edits</i>
                  </span>
                </div>
                <div className={styles.sRow}>
                  <span className={cn(styles.tileIc, styles.icOk)} aria-hidden="true">
                    <TrendingUp />
                  </span>
                  <span className={styles.sTxt}>
                    <span className={styles.sName}>Extra Store Footfall</span>
                    <span className={styles.sCap}>Via top-3 local map rank &amp; PMax</span>
                  </span>
                  <span className={cn(styles.sVal, bump > 0 && styles.bumpAnim)}>
                    +<b>{shown.footfall.toLocaleString()}</b> <i>visits/mo</i>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.ledgerCta}>
              <div>
                <p>Ready to audit your actual network?</p>
                <p className={styles.ctaSub}>We run a live 24-hr scan on your store listings.</p>
              </div>
              <DemoButton size="md" withArrow className="rounded-[10px] h-10">
                Run Free Store Audit
              </DemoButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
