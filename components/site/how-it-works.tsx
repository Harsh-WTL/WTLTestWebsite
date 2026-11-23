/* eslint-disable */
'use client'

import { Link2, MessageSquare, Megaphone } from 'lucide-react'
import { useEffect, useState, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { useInView, usePrefersReducedMotion } from '@/lib/hooks'
import { Reveal } from './reveal'
import styles from './how-it-works.module.css'

const steps = [
  {
    icon: Link2,
    title: 'Manage every location\'s presence',
    body: 'Organise business information, monitor listing changes, manage reviews and coordinate location-level publishing.',
    product: 'Locations',
  },
  {
    icon: MessageSquare,
    title: 'Bring customer conversations together',
    body: 'Give teams organised workflows for social interactions, messages, email tickets, app-store reviews and customer response management.',
    product: 'Engage',
  },
  {
    icon: Megaphone,
    title: 'Prepare for local advertising',
    body: 'Support advertising workflows with campaign-related tools, AI-assisted creative preparation and structured ad-readiness processes.',
    product: 'Synapse Ads',
  },
]

const LISTEN_ROWS = [
  { time: '09:41', tone: 'var(--success-solid)', tag: '✓ positive', tagCls: 'tagOk', topic: 'wait times' },
  { time: '09:38', tone: 'var(--warning-solid)', tag: '▼ mixed', tagCls: 'tagWarn', topic: 'hours' },
  { time: '09:35', tone: 'var(--danger-solid)', tag: '✕ negative', tagCls: 'tagBad', topic: 'reply due' },
]

const ACTIONS = [
  { ic: 'AI', tone: 'actBrand', content: 'AI reply drafted · sample location' },
  { ic: 'GBP', tone: 'actWarn', content: 'Post scheduled for all locations' },
  { ic: 'AD', tone: 'actBrand', content: 'Campaign prepared for sample radius' },
]

const CONNECT_PATHS = ['M18 1 L18 28', 'M118 1 C118 13, 20 15, 18 28', 'M240 1 C240 17, 26 16, 18 28']

function ConnectWell({ run, reduced }: { run: boolean; reduced: boolean }) {
  void run
  return (
    <div className={styles.stepWell} aria-hidden="true">
      <div className={styles.connRow}>
        <span className={styles.srcChip}>
          <span className={styles.srcDot} style={{ background: 'var(--success-solid)' }} />
          Google Business Profile
        </span>
        <span className={styles.srcChip}>
          <span className={styles.srcDot} style={{ background: 'var(--viz-2)' }} />
          Meta
        </span>
        <span className={styles.srcChip}>
          <span className={styles.srcDot} style={{ background: 'var(--warning-solid)' }} />
          Microsite
        </span>
      </div>
      <svg className={styles.connSvg} viewBox="0 0 280 30" preserveAspectRatio="none" aria-hidden="true">
        {CONNECT_PATHS.map((d) => (
          <path key={d} className={styles.wire} d={d} />
        ))}
        {!reduced && (
          <>
            <circle className={styles.trav} r="2.4">
              <animateMotion dur="2.2s" begin="0.2s" repeatCount="indefinite" path={CONNECT_PATHS[0]} />
            </circle>
            <circle className={styles.trav} r="2.4">
              <animateMotion dur="2.8s" begin="0.9s" repeatCount="indefinite" path={CONNECT_PATHS[1]} />
            </circle>
            <circle className={styles.trav} r="2.4">
              <animateMotion dur="3.4s" begin="1.6s" repeatCount="indefinite" path={CONNECT_PATHS[2]} />
            </circle>
          </>
        )}
      </svg>
      <span className={styles.wsChip}>All locations · one workspace</span>
    </div>
  )
}

function ListenWell({ run, reduced }: { run: boolean; reduced: boolean }) {
  const [head, setHead] = useState(0)
  useEffect(() => {
    if (reduced || !run) return
    const id = setInterval(() => setHead((h) => (h + 1) % LISTEN_ROWS.length), 1400)
    return () => clearInterval(id)
  }, [run, reduced])

  return (
    <div className={styles.stepWell} aria-hidden="true">
      <div className={styles.stream}>
        {LISTEN_ROWS.map((r, i) => {
          const on = reduced || !run || i === head || i === (head + 1) % LISTEN_ROWS.length
          return (
            <div key={r.time} className={cn(styles.streamRow, on && styles.streamRowOn)}>
              <span className={styles.tDot} style={{ background: r.tone }} />
              <span className={styles.tMeta}>{r.time}</span>
              <span className={cn(styles.tagPill, styles[r.tagCls])}>{r.tag}</span>
              <span className={styles.tTopic}>{r.topic}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ActWell({ run, reduced }: { run: boolean; reduced: boolean }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (reduced || !run) return
    const id = setInterval(() => setIdx((a) => (a + 1) % ACTIONS.length), 2200)
    return () => clearInterval(id)
  }, [run, reduced])

  return (
    <div className={styles.stepWell} aria-hidden="true">
      <div className={styles.actFill}>
        <div className={styles.actTicker}>
          {ACTIONS.map((a, i) => {
            const on = reduced || !run || i === idx
            return (
              <div key={i} className={cn(styles.actItem, on && styles.actItemOn)}>
                <span className={cn(styles.actIc, styles[a.tone])}>{a.ic}</span>
                {a.content}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function HowItWorks() {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 })
  const run = inView || reduced

  return (
    <section id="how-it-works" aria-labelledby="how-title" className={styles.hiw}>
      <div className={styles.wrap}>
        <Reveal>
          <span className={styles.eyebrowChip}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            How it works
          </span>
          <h2 id="how-title" className={styles.sTitle}>
            Three connected workflows <span className={styles.sAccent}>for multi-location marketing.</span>
          </h2>
          <p className={styles.sDesc}>
            Each product area handles one part of the loop, and they share the same locations, data, and context.
          </p>
        </Reveal>

        <div ref={ref} data-in={inView ? 'true' : 'false'} className={styles.stepsWrap}>
          <span aria-hidden="true" className={styles.rail}>
            <span className={styles.railFill} />
          </span>
          <ol className={styles.steps}>
            {steps.map((s, i) => (
              <li key={s.title} className={styles.step} style={{ '--hiwP': `${i / 2}`, '--d': `${i * 140}ms` } as CSSProperties}>
                <span className={styles.stepNode}>
                  <s.icon aria-hidden="true" />
                </span>
                <p className={styles.stepIdx}>
                  <b>0{i + 1}</b> · {s.product}
                </p>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
                {i === 0 && <ConnectWell run={run} reduced={reduced} />}
                {i === 1 && <ListenWell run={run} reduced={reduced} />}
                {i === 2 && <ActWell run={run} reduced={reduced} />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}