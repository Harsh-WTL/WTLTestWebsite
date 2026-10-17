'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  Building2,
  Car,
  Dumbbell,
  HeartPulse,
  ShoppingBag,
  UtensilsCrossed,
  ArrowRight,
} from 'lucide-react'
import { useInView, usePrefersReducedMotion } from '@/lib/hooks'
import { Reveal } from './reveal'
import styles from './use-cases.module.css'

type PvRow = { label: string; value: string }

const cases = [
  {
    icon: HeartPulse,
    tag: 'Profile Guard',
    name: 'Clinics & healthcare',
    body: 'Keep appointment hours accurate and answer patient reviews at every centre.',
    pv: [
      { label: 'Andheri West — hours', value: 'Maps 9:30 · system 9:00' },
      { label: 'Edited by', value: 'Google auto-update' },
    ],
    pvBtn: '1-click revert',
  },
  {
    icon: ShoppingBag,
    tag: 'Engage',
    name: 'Retail chains',
    body: 'Spot which stores are slipping on service and spend where footfall is.',
    pv: [
      { label: 'Khar store — rating', value: '4.8 → 4.2 · 30 days' },
      { label: 'Reply drafts', value: '2 waiting on manager' },
    ],
    pvBtn: 'Open review queue',
  },
  {
    icon: UtensilsCrossed,
    tag: 'Engage',
    name: 'Restaurants & QSR',
    body: 'Reply to every outlet’s reviews and keep menus and hours current.',
    pv: [
      { label: 'Bandra outlet — 2-star review', value: 'AI draft ready' },
      { label: 'Tone', value: 'brand voice · approval rule' },
    ],
    pvBtn: 'Approve & post',
  },
  {
    icon: Car,
    tag: 'Synapse',
    name: 'Automotive dealers',
    body: 'Route test-drive leads to the nearest showroom automatically.',
    pv: [
      { label: 'Test-drive form — A. East', value: 'new lead' },
      { label: 'Routed to', value: 'nearest showroom · 3.4 km' },
    ],
    pvBtn: 'Notify manager',
  },
  {
    icon: Building2,
    tag: 'Profile Guard',
    name: 'Banks & branches',
    body: 'Guard branch details and track sentiment by region.',
    pv: [
      { label: 'Powai branch — attributes', value: 'phone masked · 1 field' },
      { label: 'Edited by', value: 'Google auto-update' },
    ],
    pvBtn: '1-click revert',
  },
  {
    icon: Dumbbell,
    tag: 'Synapse',
    name: 'Fitness & wellness',
    body: 'Run local trial campaigns around each studio’s catchment.',
    pv: [
      { label: 'Trial-week promo — studio', value: 'catchment 4 km' },
      { label: 'Lead routing', value: 'studio WhatsApp' },
    ],
    pvBtn: 'Pulse report',
  },
] as const

type CaseEntry = (typeof cases)[number]

function Artifact({ c }: { c: CaseEntry }) {
  return (
    <div className={styles.pv}>
      {c.pv.map((r: PvRow) => (
        <div key={r.label} className={styles.pvRow}>
          <b>{r.label}</b>
          <span>{r.value}</span>
        </div>
      ))}
      <span className={styles.pvBtn}>{c.pvBtn}</span>
    </div>
  )
}

export function UseCases() {
  const reduced = usePrefersReducedMotion()
  const { ref: stageRef, inView: stageInView } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const listRef = useRef<HTMLUListElement>(null)
  const dockRef = useRef<HTMLDivElement>(null)
  const dockCardRef = useRef<HTMLDivElement>(null)
  const followRaf = useRef(0)
  const targetY = useRef(0)
  const currentY = useRef(0)
  const interacted = useRef(false)
  const [active, setActiveIdx] = useState<number>(0)
  const [glare, setGlare] = useState(0)

  const setActive = useCallback(
    (i: number, withGlare: boolean) => {
      setActiveIdx(i)
      if (withGlare && !reduced) setGlare((g) => g + 1)
    },
    [reduced],
  )

  /* dock follow: rAF lerp toward the cursor's Y, clamped to the dock */
  const driveFollow = useCallback(() => {
    if (followRaf.current) return
    const step = () => {
      const diff = targetY.current - currentY.current
      currentY.current = Math.abs(diff) < 0.5 ? targetY.current : currentY.current + diff * 0.14
      if (dockCardRef.current) {
        dockCardRef.current.style.transform = `translateY(${currentY.current}px)`
      }
      followRaf.current =
        Math.abs(diff) < 0.5 ? 0 : requestAnimationFrame(step)
    }
    followRaf.current = requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    /* initial dock position beside row 1 once the stage is in view */
    if (!stageInView || reduced) return
    const dock = dockRef.current
    const card = dockCardRef.current
    const firstRow = listRef.current?.querySelector('li:first-child')
    if (!dock || !card || !firstRow) return
    const d = dock.getBoundingClientRect()
    const r = firstRow.getBoundingClientRect()
    const max = Math.max(0, d.height - card.offsetHeight)
    const y = Math.max(0, Math.min(r.top + r.height / 2 - d.top - card.offsetHeight / 2, max))
    targetY.current = currentY.current = y
    card.style.transform = `translateY(${y}px)`

    const media = window.matchMedia('(hover: none)')
    if (media.matches) return
    /* auto-preview every vertical until the visitor takes over */
    const timer = window.setInterval(() => {
      if (interacted.current || document.hidden) return
      setActive((activeRef.current + 1) % cases.length, true)
    }, 3400)
    return () => window.clearInterval(timer)
  }, [stageInView, reduced, setActive])

  /* stable ref mirror of `active` so the interval closure never goes stale */
  const activeRef = useRef(active)
  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => () => cancelAnimationFrame(followRaf.current), [])

  const listPointerMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType === 'touch') return
    const dock = dockRef.current
    const card = dockCardRef.current
    if (!dock || !card) return
    interacted.current = true
    const d = dock.getBoundingClientRect()
    const max = Math.max(0, d.height - card.offsetHeight)
    targetY.current = Math.max(0, Math.min(e.clientY - d.top - card.offsetHeight / 2, max))
    driveFollow()
  }

  const current = cases[active]

  return (
    <section id="use-cases" aria-labelledby="use-cases-title" className={styles.uc}>
      <div className={styles.rings} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className={styles.wrap}>
        <Reveal>
          <span className={styles.eyebrowChip}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Use cases
          </span>
          <h2 id="use-cases-title" className={styles.sTitle}>
            Built for brands that <span className={styles.sAccent}>live on the high street.</span>
          </h2>
          <p className={styles.sDesc}>
            If customers find you through a map and judge you by your reviews, the same workflow
            applies.
          </p>
        </Reveal>

        <div ref={stageRef} data-in={stageInView ? 'true' : 'false'} className={styles.stage}>
          <div>
            <ul
              ref={listRef}
              className={styles.list}
              onPointerMove={listPointerMove}
              onPointerLeave={() => {
                interacted.current = false
              }}
            >
              {cases.map((c, i) => {
                const on = active === i
                const Icon = c.icon
                return (
                  <li key={c.name} className={on ? `${styles.row} ${styles.rowOn}` : styles.row}>
                    <button
                      type="button"
                      aria-pressed={on}
                      style={{ '--rd': `${i * 60}ms` } as CSSProperties}
                      className={styles.rowBtn}
                      onPointerEnter={(e) => {
                        if (e.pointerType === 'touch') return
                        interacted.current = true
                        setActive(i, true)
                      }}
                      onFocus={() => setActive(i, true)}
                      onClick={() => setActive(i, true)}
                    >
                      <span className={styles.idx} aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={styles.ic} aria-hidden="true">
                        <Icon />
                      </span>
                      <span className={styles.tx}>
                        <span className={styles.name}>{c.name}</span>
                        <span className={styles.rb}>{c.body}</span>
                      </span>
                      <ArrowRight aria-hidden="true" className={styles.go} />
                    </button>
                    {/* touch/small screens: the preview expands inline under the active row */}
                    <div className={styles.exp}>
                      <div className={styles.expIn}>
                        <div className={styles.expPad}>
                          <Artifact c={c} />
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className={styles.hint} aria-hidden="true">
              Hover an industry · sample data
            </p>
          </div>

          <div ref={dockRef} className={styles.dock} aria-hidden="true">
            <div ref={dockCardRef} className={styles.dockCard}>
              <span
                aria-hidden="true"
                className={glare > 0 ? `${styles.glare} ${styles.glareGo}` : styles.glare}
                key={glare}
              />
              <div className={styles.dockHead}>
                <span className={styles.dockTag}>{current.tag}</span>
                <span className={styles.badge}>Sample</span>
              </div>
              <div className={styles.pvHost}>
                <div className={styles.pvSw} key={active}>
                  <Artifact c={current} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
