'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { ArrowUp, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useInView, usePrefersReducedMotion } from '@/lib/hooks'
import { DemoButton } from './demo-dialog'
import { Logo } from './logo'
import styles from './closing.module.css'

const demoSteps = [
  {
    title: 'Live Profile Health Scan',
    cap: 'Audit rogue hours, unreviewed user edits, and phone drifts across your branches.',
  },
  {
    title: 'WhatsApp Alert Dispatch Test',
    cap: 'Simulate a 1-star review and receive the exact store manager WhatsApp alert on your phone.',
  },
  {
    title: 'Radius Ad & Lead Routing Blueprint',
    cap: 'Calculate catchment household reach and nearest-showroom lead delivery for your stores.',
  },
] as const

const checks = ['Zero upfront migration fee', 'Official Meta & Google APIs', 'Cancel or pause anytime'] as const

export function FinalCta() {
  const reduced = usePrefersReducedMotion()
  const { ref: panelRef, inView } = useInView<HTMLDivElement>({ threshold: 0.35 })
  const [glare, setGlare] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    setGlare((g) => g + 1)
  }, [inView, reduced])

  return (
    <section aria-labelledby="cta-title" className={styles.ctaSec}>
      <div className={styles.wrap}>
        <div
          ref={panelRef}
          data-in={inView ? 'true' : 'false'}
          className={cn(styles.panel, 'bg-insight text-insight-ink shadow-raised rounded-[20px]')}
        >
          <span
            aria-hidden="true"
            key={glare}
            className={cn(styles.glare, glare > 0 && styles.glareGo)}
          />
          <div className={styles.grid}>
            <div>
              <p className={styles.ctaEye}>Ready in under 48 hours</p>
              <h2 id="cta-title" className={styles.ctaTitle}>
                See your own locations in What The Local.
              </h2>
              <p className={styles.ctaDesc}>
                Book a tailored 20-minute walkthrough. We&apos;ll load your actual Google Business
                Profiles, run a live Profile Guard drift scan, and simulate instant WhatsApp
                escalation alerts for your store managers.
              </p>
              <div className={styles.acts}>
                <DemoButton
                  size="lg"
                  withArrow
                  className="rounded-[10px] bg-ink text-ink-inverse shadow-raised"
                />
                <a href="#how-it-works" className={styles.btnHow}>
                  How rollout works
                </a>
              </div>
              <div className={styles.checks}>
                {checks.map((c) => (
                  <span key={c}>
                    <Check aria-hidden="true" className="stroke-[2.5]" /> {c}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <p className={styles.cardEye}>What you will see in your demo</p>
              <ul className={styles.steps}>
                {demoSteps.map((s, i) => (
                  <li key={s.title} className={styles.step}>
                    <span className={styles.stepNum} aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <strong className={styles.stepTitle}>{s.title}</strong>
                      <span className={styles.stepCap}>{s.cap}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const WORD = 'What The Local'

export function SiteFooter() {
  const reduced = usePrefersReducedMotion()
  const wordRef = useRef<HTMLParagraphElement>(null)
  const wordRowRef = useRef<HTMLDivElement>(null)
  const { inView: wordIn } = useInView<HTMLDivElement>({ threshold: 0.35 })
  const waveTimer = useRef(0)
  const [metrics, setMetrics] = useState<{ w: number; xs: number[] }>({ w: 0, xs: [] })

  /* continuous gradient slices across the per-letter spans */
  const measure = useCallback(() => {
    const el = wordRef.current
    if (!el) return
    const spans = el.querySelectorAll<HTMLElement>('[data-wl]')
    setMetrics({ w: Math.ceil(el.offsetWidth), xs: Array.from(spans, (s) => Math.round(s.offsetLeft)) })
  }, [])

  useEffect(() => {
    measure()
    document.fonts?.ready.then(measure).catch(() => {})
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const wave = useCallback(() => {
    if (reduced) return
    const el = wordRef.current
    if (!el) return
    el.classList.remove(styles.run)
    void el.offsetWidth
    el.classList.add(styles.run)
    window.clearTimeout(waveTimer.current)
    waveTimer.current = window.setTimeout(() => el.classList.remove(styles.run), 1500)
  }, [reduced])

  useEffect(() => {
    if (!wordIn) return
    waveTimer.current = window.setTimeout(wave, 450)
    return () => window.clearTimeout(waveTimer.current)
  }, [wordIn, wave])

  useEffect(() => () => window.clearTimeout(waveTimer.current), [])

  /* per-letter index for the staggered wave */
  const letters = useMemo(() => {
    let i = 0
    return WORD.split(' ').map((w) => Array.from(w).map((ch) => ({ ch, i: i++ })))
  }, [])

  const [clock, setClock] = useState('--:--:--')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const tick = () => setClock(fmt.format(new Date()))
    tick()
    const t = window.setInterval(tick, 1000)
    return () => window.clearInterval(t)
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.fwrap}>
        <div className={styles.fgrid}>
          <div>
            <Logo />
            <p className={styles.fdesc}>
              The connected marketing, presence, and reputation operating system built for
              multi-location brands. Run every store like your best one.
            </p>
            <p className={styles.flive}>
              <span className={cn(styles.fliveDot, 'bg-success')} aria-hidden="true" />
              All platform systems operational · Meta &amp; Google API connected
            </p>
          </div>

          <div className={styles.fcol}>
            <h4>Platform</h4>
            <ul>
              <li><a href="#products">Locations &amp; Guard</a></li>
              <li><a href="#products">Engage Inbox</a></li>
              <li><a href="#products">WhatsApp Escalations</a></li>
              <li><a href="#products">Synapse Local Ads</a></li>
            </ul>
          </div>

          <div className={styles.fcol}>
            <h4>Industries</h4>
            <ul>
              <li><a href="#use-cases">Automotive Showrooms</a></li>
              <li><a href="#use-cases">Healthcare &amp; Clinics</a></li>
              <li><a href="#use-cases">Retail Chains</a></li>
              <li><a href="#use-cases">Restaurants &amp; QSR</a></li>
              <li><a href="#use-cases">Banks &amp; Branches</a></li>
            </ul>
          </div>

          <div className={styles.fcol}>
            <h4>Navigation</h4>
            <ul>
              <li><a href="#how-it-works">How it works</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#roi-calculator">ROI Calculator</a></li>
              <li><a href="#comparison">Comparison</a></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#top">Back to top</a></li>
            </ul>
          </div>
        </div>

        <div ref={wordRowRef} className={styles.fwordRow}>
          <p
            ref={wordRef}
            aria-label={WORD}
            onPointerEnter={wave}
            className={cn(styles.word, metrics.w > 0 && styles.wordGrad)}
            style={{ '--wordW': metrics.w || 900 } as CSSProperties}
          >
            {letters.map((word, wi) => (
              <span key={wi} aria-hidden="true">
                {wi > 0 && ' '}
                {word.map((l) => (
                  <span
                    key={l.i}
                    data-wl=""
                    className={styles.wl}
                    style={{ '--i': l.i, '--x': metrics.xs[l.i] ?? 0 } as CSSProperties}
                  >
                    {l.ch}
                  </span>
                ))}
              </span>
            ))}
          </p>
          <div className={styles.fmeta}>
            <p className={styles.fclock}>
              <b>{clock}</b> IST
            </p>
            <p className={styles.fmetaSub}>Mumbai · sample-data region</p>
          </div>
        </div>

        <div className={styles.flegal}>
          <p>© {new Date().getFullYear()} What The Local Technologies. All rights reserved.</p>
          <p>Product previews on this page use sample data from Mumbai region.</p>
          <a className={styles.fTop} href="#top">
            <span className={styles.fTopIc} aria-hidden="true">
              <ArrowUp />
            </span>
            Top
          </a>
        </div>
      </div>
    </footer>
  )
}
