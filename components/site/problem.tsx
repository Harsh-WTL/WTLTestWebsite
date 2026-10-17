'use client'

import { useEffect, useState, type CSSProperties, type PointerEvent } from 'react'
import { Clock, MessagesSquare, Target } from 'lucide-react'
import styles from './problem.module.css'
import { cn } from '@/lib/utils'
import { useInView, usePrefersReducedMotion } from '@/lib/hooks'

type TitlePart = { text: string; delay: number; accent?: boolean }

const TITLE_PARTS: TitlePart[] = [
  { text: 'Twelve', delay: 0 },
  { text: 'stores.', delay: 70 },
  { text: 'Seven', delay: 210 },
  { text: 'channels.', delay: 280 },
  { text: 'One small team.', delay: 520, accent: true },
]

const problems = [
  {
    icon: Clock,
    tone: 'danger',
    title: 'Profiles drift',
    body: 'Hours, phone numbers, and photos change on Google and Maps without anyone at head office noticing — until a customer shows up to a closed door.',
  },
  {
    icon: MessagesSquare,
    tone: 'warn',
    title: 'Conversations scatter',
    body: 'Reviews, comments, and DMs arrive across a handful of platforms and dozens of locations, each in a different inbox with a different owner.',
  },
  {
    icon: Target,
    tone: 'brand',
    title: 'Growth stays generic',
    body: 'Campaigns get planned nationally while demand is local, so spend lands far from the store that could actually serve the customer.',
  },
] as const

const TONE_CLS: Record<'danger' | 'warn' | 'brand', string> = {
  danger: styles.toneDanger,
  warn: styles.toneWarn,
  brand: styles.toneBrand,
}
const CARD_DELAYS = ['80ms', '170ms', '260ms']
const HALO_DELAYS = ['0s', '0.5s', '1s']

const CHANNELS = [
  ['Google', 3],
  ['Instagram', 5],
  ['Facebook', 2],
  ['YouTube', 1],
  ['Play Store', 2],
  ['App Store', 1],
  ['Email', 4],
] as const

const DEMAND_BARS: { h: number; variant?: 'high' | 'short' }[] = [
  { h: 40, variant: 'high' },
  { h: 33 },
  { h: 24, variant: 'short' },
  { h: 42, variant: 'high' },
  { h: 31 },
  { h: 20, variant: 'short' },
  { h: 36 },
]
const DEMAND_DELAYS = ['40ms', '90ms', '140ms', '190ms', '240ms', '290ms', '340ms']

const ARC_R = 18
const ARC_CIRC = 2 * Math.PI * ARC_R

/* Card 1 — unnoticed drift replays: arc fills 0 → 9d, then the well flashes alarm */
function DriftVisual({ run, reduced }: { run: boolean; reduced: boolean }) {
  const [day, setDay] = useState(9)

  useEffect(() => {
    if (reduced) {
      setDay(9)
      return
    }
    if (!run) return
    let d = 0
    setDay(0)
    const id = setInterval(() => {
      d = d >= 9 ? 0 : d + 1
      setDay(d)
    }, 950)
    return () => clearInterval(id)
  }, [run, reduced])

  const alarm = day >= 9

  return (
    <div className={styles.pWellWrap}>
      <div className={cn(styles.well, alarm && styles.wellAlarm)}>
        <div className={styles.drTop}>
          <div>
            <p className={styles.drLabel}>Saturday hours · Thane</p>
            <div className={styles.drRow}>
              <span className={cn(styles.drOld, 'tnum')}>10:00 – 20:00</span>
              <span aria-hidden="true" className={styles.drArr}>→</span>
              <span className={cn(styles.drNew, 'tnum')}>10:00 – 18:00</span>
            </div>
          </div>
          <div aria-hidden="true" className={styles.drArc}>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle className={styles.drTrack} cx="22" cy="22" r={ARC_R} />
              <circle
                className={styles.drProg}
                cx="22"
                cy="22"
                r={ARC_R}
                strokeDasharray={ARC_CIRC}
                style={{ strokeDashoffset: ARC_CIRC * (1 - day / 9) }}
              />
            </svg>
            <b className={styles.drArcB}>{day}d</b>
          </div>
        </div>
        <div className={styles.drMeta}>
          <span>Edited by a Google user · unreviewed</span>
          <span>{alarm ? 'customer walks to a closed door' : `unnoticed for ${9 - day} more days`}</span>
        </div>
      </div>
    </div>
  )
}

/* Card 2 — inbox badges accumulate, tally up, then replay */
function InboxVisual({ run, reduced }: { run: boolean; reduced: boolean }) {
  const [shown, setShown] = useState<number>(CHANNELS.length)

  useEffect(() => {
    if (reduced) {
      setShown(CHANNELS.length)
      return
    }
    if (!run) return
    let i = 0
    let holding = false
    setShown(0)
    const id = setInterval(() => {
      if (holding) return
      if (i >= CHANNELS.length) {
        holding = true
        window.setTimeout(() => {
          i = 0
          setShown(0)
          holding = false
        }, 1900)
        return
      }
      i += 1
      setShown(i)
    }, 420)
    return () => clearInterval(id)
  }, [run, reduced])

  const unread = CHANNELS.slice(0, shown).reduce((sum, c) => sum + c[1], 0)

  return (
    <div className={styles.pWellWrap}>
      <div className={styles.well}>
        <div>
          <div className={styles.inboxHead}>
            <span>untriaged</span>
            <span className={cn(styles.inboxTotal, 'tnum')}>{unread} unread</span>
          </div>
          <div className={styles.chanChips}>
            {CHANNELS.map(([name, n], idx) => (
              <span
                key={name}
                className={styles.chanChip}
                style={{ '--bd': `${idx * 0.5}s` } as CSSProperties}
              >
                {name}
                <span className={cn(styles.badge, idx < shown && styles.badgeOn)}>{n}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* Card 3 — spend stays flat while local demand is uneven ("wasted" cells hatch-drift) */
function BarsVisual({ run, reduced }: { run: boolean; reduced: boolean }) {
  return (
    <div className={styles.pWellWrap}>
      <div className={styles.well}>
        <div>
          <div className={styles.bars} data-in={run || reduced ? 'true' : 'false'} aria-hidden="true">
            <div className={styles.barRow}>
              {DEMAND_DELAYS.map((bd, i) => (
                <span key={i} className={styles.bar} style={{ '--bd': bd, height: 34 } as CSSProperties} />
              ))}
            </div>
            <div className={styles.barRow}>
              {DEMAND_BARS.map((b, i) => (
                <span
                  key={i}
                  className={cn(
                    styles.bar,
                    styles.demand,
                    b.variant === 'high' && styles.demandHigh,
                    b.variant === 'short' && styles.demandShort,
                  )}
                  style={{ height: b.h, '--bd': DEMAND_DELAYS[i] } as CSSProperties}
                />
              ))}
            </div>
          </div>
          <div className={styles.barsLegend}>
            <span>
              <i aria-hidden="true" className={styles.lgDot} style={{ background: 'var(--viz-1-soft)' }} />
              flat spend
            </span>
            <span>
              <i aria-hidden="true" className={styles.lgDot} style={{ background: 'var(--viz-1)' }} />
              local demand
            </span>
            <span>
              <i
                aria-hidden="true"
                className={styles.lgDot}
                style={{ background: 'var(--danger-subtle)', border: '1px solid var(--danger-border)' }}
              />
              wasted
            </span>
          </div>
        </div>
        <p className={styles.wNote}>Same budget, every store, regardless of local demand</p>
      </div>
    </div>
  )
}

const VISUALS = [DriftVisual, InboxVisual, BarsVisual]

export function Problem() {
  const reduced = usePrefersReducedMotion()
  const head = useInView<HTMLDivElement>({ threshold: 0.3 })
  const grid = useInView<HTMLDivElement>({ threshold: 0.15 })
  const conn = useInView<HTMLSpanElement>({ threshold: 0.6 })
  const run = grid.inView || reduced

  /* Cursor spotlight: soft tinted glow that follows the pointer */
  const onSpotlight = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section aria-labelledby="problem-title" className={styles.problem}>
      <div className={styles.pWrap}>
        <div
          ref={head.ref}
          className={styles.sh}
          data-in={head.inView || reduced ? 'true' : 'false'}
        >
          <span className={styles.shEyebrow}>
            <span aria-hidden="true" className={styles.shEyebrowDot} />
            The multi-location problem
          </span>
          <h2 id="problem-title" className={styles.shTitle}>
            {TITLE_PARTS.map((p, i) => (
              <span key={i} style={{ '--d': `${p.delay}ms` } as CSSProperties}
                className={p.accent ? styles.wAccent : styles.w}>
                {p.text}
              </span>
            ))}
          </h2>
          <p className={styles.shDesc}>
            Most brands manage local marketing across disconnected tools. Nothing is wrong at any
            single location — it just slips quietly everywhere at once.
          </p>
        </div>

        <div ref={grid.ref} className={styles.pGrid}>
          {problems.map((p, i) => {
            const Visual = VISUALS[i]
            return (
              <article
                key={p.title}
                className={cn(styles.pcard, TONE_CLS[p.tone])}
                data-in={run ? 'true' : 'false'}
                style={{ '--d': CARD_DELAYS[i] } as CSSProperties}
                onPointerMove={onSpotlight}
              >
                <span aria-hidden="true" className={styles.pIc} style={{ '--dh': HALO_DELAYS[i] } as CSSProperties}>
                  <p.icon />
                </span>
                <h3 className={styles.pTitle}>{p.title}</h3>
                <p className={styles.pBody}>{p.body}</p>
                <Visual run={run} reduced={reduced} />
              </article>
            )
          })}
        </div>

        <div className={styles.connectiveRow}>
          <span
            ref={conn.ref}
            className={styles.connective}
            data-in={conn.inView || reduced ? 'true' : 'false'}
          >
            <b>No single store looks broken</b> — multiply by twelve and it compounds.
          </span>
        </div>
      </div>
    </section>
  )
}
