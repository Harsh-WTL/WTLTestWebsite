'use client'

import { useEffect, useId, useState, type CSSProperties } from 'react'
import { Building, Flame, ShieldCheck, TrendingUp } from 'lucide-react'
import styles from './metrics-bar.module.css'
import { cn } from '@/lib/utils'
import { useInView, usePrefersReducedMotion } from '@/lib/hooks'

type SparkSpec = { area: string; line: string; tipX: number; tipY: number }

const SPARKS: SparkSpec[] = [
  { area: 'M0,24 16,22 32,19 48,17 64,14 80,9 96,4 V30 H0 Z', line: 'M0,24 16,22 32,19 48,17 64,14 80,9 96,4', tipX: 96, tipY: 4 },
  { area: 'M0,26 16,23 32,20 48,14 64,10 80,7 96,3 V30 H0 Z', line: 'M0,26 16,23 32,20 48,14 64,10 80,7 96,3', tipX: 96, tipY: 3 },
  { area: 'M0,6 16,8 32,10 48,15 64,19 80,22 96,25 V30 H0 Z', line: 'M0,6 16,8 32,10 48,15 64,19 80,22 96,25', tipX: 96, tipY: 25 },
  { area: 'M0,22 16,18 32,21 48,15 64,17 80,10 96,5 V30 H0 Z', line: 'M0,22 16,18 32,21 48,15 64,17 80,10 96,5', tipX: 96, tipY: 5 },
]

/* Final rendered strings must match the shipped copy:
   8,400+ · 124,000+ · < 45s · +28% */
const stats = [
  { icon: Building, label: 'Storefronts Managed', sub: 'across 42 metro & tier-2 cities', prefix: '', suffix: '+', target: 8400, comma: true, halo: '0s' },
  { icon: ShieldCheck, label: 'Reviews Patrolled Daily', sub: 'autonomous 24/7 sentiment AI', prefix: '', suffix: '+', target: 124000, comma: true, halo: '0.4s' },
  { icon: Flame, label: 'WhatsApp Escalation', sub: 'instant alert to branch managers', prefix: '< ', suffix: 's', target: 45, comma: false, halo: '0.8s' },
  { icon: TrendingUp, label: 'Catchment Footfall', sub: '3-km radius bounded ad engine', prefix: '+', suffix: '%', target: 28, comma: false, halo: '1.2s' },
]

const industries = [
  { name: 'Automotive Dealerships', count: '1,800+ Showrooms' },
  { name: 'Healthcare & Clinics', count: '940+ Centres' },
  { name: 'Retail Chains', count: '3,200+ Outlets' },
  { name: 'Restaurants & QSR', count: '1,450+ Outlets' },
  { name: 'Banking & Branches', count: '1,000+ Branches' },
]

const TILE_DELAYS = ['40ms', '110ms', '180ms', '250ms']

function StatTile({
  stat,
  spark,
  sparkId,
  delay,
  run,
  reduced,
}: {
  stat: (typeof stats)[number]
  spark: SparkSpec
  sparkId: string
  delay: string
  run: boolean
  reduced: boolean
}) {
  const [val, setVal] = useState(0)
  const [landed, setLanded] = useState(false)

  /* Count-up on first sight (SSR renders the final value for no-JS) */
  useEffect(() => {
    if (!run) return
    if (reduced) {
      setVal(stat.target)
      setLanded(true)
      return
    }
    const t0 = performance.now()
    const D = 1300
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / D)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(stat.target * eased))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setVal(stat.target)
        setLanded(true)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, reduced, stat.target])

  const shown = run || reduced ? val : stat.target
  const text = stat.comma ? shown.toLocaleString('en-US') : String(shown)

  return (
    <div
      className={styles.stat}
      data-in={run || reduced ? 'true' : 'false'}
      style={{ '--d': delay } as CSSProperties}
    >
      <div className={styles.mTop}>
        <span aria-hidden="true" className={styles.mIc} style={{ '--dh': stat.halo } as CSSProperties}>
          <stat.icon />
        </span>
        <span className={cn(styles.mVal, 'tnum', landed && styles.landed)}>
          {stat.prefix ? <span className={styles.fix}>{stat.prefix}</span> : null}
          {text}
          <span className={styles.fix}>{stat.suffix}</span>
        </span>
      </div>
      <span className={styles.mLab}>{stat.label}</span>
      <span className={styles.mSub}>{stat.sub}</span>
      <svg className={styles.spark} viewBox="0 0 96 30" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={sparkId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: 'var(--viz-1)', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: 'var(--viz-1)', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <path className={styles.sparkArea} fill={`url(#${sparkId})`} d={spark.area} />
        <path className={styles.sparkLine} pathLength={1} d={spark.line} />
        <circle className={styles.sparkTip} cx={spark.tipX} cy={spark.tipY} r={2} />
      </svg>
    </div>
  )
}

export function MetricsBar() {
  const reduced = usePrefersReducedMotion()
  const uid = useId().replace(/:/g, '')
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 })
  const run = inView || reduced

  return (
    <section aria-label="Key performance metrics" className={styles.metrics}>
      <div className={styles.mWrap}>
        <div className={styles.mStripHead}>
          <span className={styles.mLive}>
            <span aria-hidden="true" className={styles.liveDot} />
            Network telemetry
          </span>
        </div>

        <div ref={ref} className={styles.mGrid}>
          {stats.map((s, i) => (
            <StatTile
              key={s.label}
              stat={s}
              spark={SPARKS[i]}
              sparkId={`${uid}-spark${i}`}
              delay={TILE_DELAYS[i]}
              run={run}
              reduced={reduced}
            />
          ))}
        </div>

        <div className={styles.mFoot}>
          <span className={styles.mFootLabel}>Industry Footprints:</span>
          <div className={styles.mChips}>
            {industries.map((ind) => (
              <span key={ind.name} className={styles.indChip}>
                <b>{ind.name}</b>
                <span className={styles.indChipCnt}>{ind.count}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
