'use client'

import { useEffect, useId, useState, type CSSProperties, type ReactNode } from 'react'
import styles from './hero-signal.module.css'
import { cn } from '@/lib/utils'
import { sampleLocations, type SampleLocation } from '@/lib/sample-data'
import { usePrefersReducedMotion } from '@/lib/hooks'

type Scenario = 'listings' | 'reputation' | 'advertising'

const SCENARIOS: { id: Scenario; label: string }[] = [
  { id: 'listings', label: 'Listings' },
  { id: 'reputation', label: 'Reputation' },
  { id: 'advertising', label: 'Advertising' },
]

const byId = (id: string): SampleLocation =>
  sampleLocations.find((l) => l.id === id) ?? sampleLocations[0]

const HUB = byId('loc-004')
const TOTAL = sampleLocations.length
const HEALTHY = sampleLocations.filter((l) => l.status === 'healthy').length
const RECEIVED = sampleLocations.reduce((sum, l) => sum + l.reviews, 0)
const UNANSWERED = byId('loc-002').pending

const PATHS = {
  'loc-003': 'M488,58 C400,90 290,160 204,206',
  'loc-001': 'M392,128 C330,150 260,180 204,206',
  'loc-002': 'M512,252 C420,240 290,225 204,206',
  'loc-010': 'M262,84 C240,120 220,170 204,206',
  'loc-009': 'M424,184 C350,200 270,205 204,206',
  'loc-005': 'M300,150 C260,170 225,190 204,206',
  'loc-007': 'M228,352 C220,310 210,255 204,206',
} as const

type Row = {
  loc: SampleLocation
  pill: { label: string; tone: 'ok' | 'warn' | 'bad' }
  metaRight: string
}
const ROWS: Row[] = [
  { loc: byId('loc-003'), pill: { label: '▲ Hours edit', tone: 'warn' }, metaRight: 'auto-rejected' },
  { loc: byId('loc-001'), pill: { label: '▲ AI Score 78', tone: 'warn' }, metaRight: '13 fields incomplete' },
  { loc: byId('loc-002'), pill: { label: '✕ 3 unanswered', tone: 'bad' }, metaRight: 'sentiment needs attention' },
  { loc: byId('loc-004'), pill: { label: '✓ Verified', tone: 'ok' }, metaRight: '4.8★' },
]
const PILL_CLS: Record<Row['pill']['tone'], string> = {
  ok: styles.hpOk,
  warn: styles.hpWarn,
  bad: styles.hpBad,
}

type Chip = { ic: string; cls: string; body: ReactNode }
const CHIPS: Chip[] = [
  {
    ic: '✕',
    cls: styles.dotBad,
    body: (
      <>
        <b className={styles.chipB}>North Mall</b> · Hours edit detected externally ·{' '}
        <b className={styles.chipB} style={{ color: 'var(--success-solid)' }}>
          auto-rejected in 1 click
        </b>
      </>
    ),
  },
  {
    ic: '▲',
    cls: styles.dotWarn,
    body: (
      <>
        <b className={styles.chipB}>Downtown Branch</b> · AI Location Studio score 78/100 ·{' '}
        <b className={styles.chipB} style={{ color: 'var(--warning-solid)' }}>
          13 fields incomplete
        </b>
      </>
    ),
  },
  {
    ic: '⚡',
    cls: styles.dotBrand,
    body: (
      <>
        <b className={styles.chipB}>Westside Clinic</b> · 3 unanswered reviews ·{' '}
        <b className={styles.chipB}>AI-assisted replies active</b>
      </>
    ),
  },
]

const NOTES: Record<Scenario, ReactNode> = {
  listings: (
    <>
      <b className={styles.catchNoteB}>Profile Guard</b> caught unauthorized hours edit at{' '}
      <b className={styles.catchNoteB}>North Mall</b> — auto-rejected.{' '}
      <b className={styles.catchNoteB}>Downtown Branch</b> AI Score 78/100.
    </>
  ),
  reputation: (
    <>
      <b className={styles.catchNoteB}>AI-assisted replies</b> active across locations.{' '}
      <b className={styles.catchNoteB}>Westside Clinic</b> has 3 unanswered reviews — sentiment needs attention.
    </>
  ),
  advertising: (
    <>
      <b className={styles.catchNoteB}>Synapse Ads</b> — 14 leads routed this week.{' '}
      <b className={styles.catchNoteB}>SPARK</b> readiness: Brand Intelligence → Audience Mapping → Product Catalogue → AI Ad Generation.
    </>
  ),
}

const TRAVELERS = [
  { path: PATHS['loc-001'], dur: '2.4s', begin: '0s', fill: 'var(--brand-primary)' },
  { path: PATHS['loc-002'], dur: '2.9s', begin: '0.6s', fill: 'var(--viz-1)' },
  { path: PATHS['loc-010'], dur: '2.4s', begin: '1.2s', fill: 'var(--viz-1)' },
  { path: PATHS['loc-003'], dur: '2.6s', begin: '0.9s', fill: 'var(--viz-1-soft)' },
] as const

type NodeSpec = {
  id: string
  name: string
  meta?: string
  tone: 'ok' | 'warn' | 'bad' | 'hub'
  label: Placement
}

type Placement =
  | { at: 'right' }
  | { at: 'left' }
  | { at: 'below' }
  | { at: 'leftTop' }

const NODES: NodeSpec[] = [
  { id: 'loc-003', name: 'North Mall', meta: 'hours auto-rejected', tone: 'warn', label: { at: 'left' } },
  { id: 'loc-001', name: 'Downtown Branch', meta: 'AI Score 78/100', tone: 'warn', label: { at: 'right' } },
  { id: 'loc-002', name: 'Westside Clinic', meta: '3 unanswered', tone: 'bad', label: { at: 'left' } },
  { id: 'loc-005', name: 'Eastside Centre', meta: '4.7★ · 46', tone: 'ok', label: { at: 'below' } },
  { id: 'loc-006', name: 'Central Plaza', meta: '4.9★', tone: 'ok', label: { at: 'right' } },
  { id: 'loc-007', name: 'Harbor View', meta: 'Profile complete', tone: 'ok', label: { at: 'leftTop' } },
  { id: 'loc-010', name: 'Valley Outpost', tone: 'ok', label: { at: 'right' } },
  { id: 'loc-009', name: 'Hilltop Location', tone: 'ok', label: { at: 'left' } },
]

const TONE_CLS: Record<NodeSpec['tone'], string> = {
  ok: styles.nOk,
  warn: styles.nWarn,
  bad: styles.nBad,
  hub: styles.nHub,
}
const TONE_VAR: Record<NodeSpec['tone'], string> = {
  ok: 'var(--success-solid)',
  warn: 'var(--warning-solid)',
  bad: 'var(--danger-solid)',
  hub: 'var(--brand-primary)',
}

const RING_DELAYS: Record<string, string> = {
  'loc-003': '0.5s',
  'loc-001': '0.2s',
  'loc-002': '0.7s',
}

function nodeLabels(node: NodeSpec, loc: SampleLocation) {
  const r = loc.minor ? 4 : 5.5
  const common = {
    className: styles.nLabel,
    stroke: 'var(--surface-sunken)',
    strokeWidth: 3,
    paintOrder: 'stroke' as const,
    strokeLinejoin: 'round' as const,
  }
  const meta = { ...common, className: styles.nMeta, strokeWidth: 2.5 }
  let labelNode: ReactNode = null
  let metaNode: ReactNode = null

  switch (node.label.at) {
    case 'right':
      labelNode = (
        <text {...common} x={loc.x + r + 8} y={loc.y - 3}>
          {node.name}
        </text>
      )
      metaNode = (
        <text {...meta} x={loc.x + r + 8} y={loc.y + 9}>
          {node.meta}
        </text>
      )
      break
    case 'left':
      labelNode = (
        <text {...common} x={loc.x - r - 8} y={loc.y - 3} textAnchor="end">
          {node.name}
        </text>
      )
      metaNode = (
        <text {...meta} x={loc.x - r - 8} y={loc.y + 9} textAnchor="end">
          {node.meta}
        </text>
      )
      break
    case 'below':
      labelNode = (
        <text {...common} x={loc.x} y={loc.y + r + 13} textAnchor="middle">
          {node.name}
        </text>
      )
      metaNode = (
        <text {...meta} x={loc.x} y={loc.y + r + 25} textAnchor="middle">
          {node.meta}
        </text>
      )
      break
    case 'leftTop':
      labelNode = (
        <text {...common} x={loc.x - r - 8} y={loc.y - 11} textAnchor="end">
          {node.name}
        </text>
      )
      metaNode = (
        <text {...meta} x={loc.x - r - 8} y={loc.y + 1} textAnchor="end">
          {node.meta}
        </text>
      )
      break
  }
  return { labelNode, metaNode: node.meta == null ? null : metaNode }
}

export function HeroSignalMap() {
  const reduced = usePrefersReducedMotion()
  const uid = useId().replace(/:/g, '')
  const [scenario, setScenario] = useState<Scenario>('listings')
  const [hotIdx, setHotIdx] = useState(2)
  const [chipHead, setChipHead] = useState(0)
  const [latest, setLatest] = useState(0)
  const [popTick, setPopTick] = useState(0)

  useEffect(() => {
    if (reduced) {
      setLatest(RECEIVED)
      return
    }
    let n = 0
    const boot = setInterval(() => {
      n = Math.min(RECEIVED, n + Math.ceil((RECEIVED - n) / 12) + 1)
      setLatest(n)
      if (n >= RECEIVED) clearInterval(boot)
    }, 110)
    return () => clearInterval(boot)
  }, [reduced])

  useEffect(() => {
    if (reduced || latest < RECEIVED) return
    const pop = setInterval(() => setPopTick((t) => t + 1), 3600)
    return () => clearInterval(pop)
  }, [reduced, latest])

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      if (scenario !== 'listings') return
      setHotIdx((h) => (h + 1) % ROWS.length)
    }, 2600)
    return () => clearInterval(id)
  }, [reduced, scenario])

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setChipHead((c) => (c + 1) % CHIPS.length), 3400)
    return () => clearInterval(id)
  }, [reduced])

  const pickScenario = (s: Scenario) => {
    setScenario(s)
    if (s === 'reputation') setHotIdx(0)
    if (s === 'advertising') setHotIdx(2)
  }

  const chips = [CHIPS[chipHead], CHIPS[(chipHead + 1) % CHIPS.length]]
  const minorIds = new Set(sampleLocations.filter((l) => l.minor).map((l) => l.id))

  return (
    <div className={styles.montage}>
      <div className={styles.scenarios} role="group" aria-label="Product areas">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={styles.scBtn}
            aria-pressed={scenario === s.id}
            onClick={() => pickScenario(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className={styles.frame}>
        {/* App topbar */}
        <div className={styles.topbar}>
          <span aria-hidden="true" className={styles.brandSq} />
          <span className={styles.brandTitle}>What The Local</span>
          <span className={styles.brandCount}>{TOTAL} locations</span>
          <span className={styles.searchChip}>
            Search locations, reviews, posts
            <span className={cn(styles.kbd, 'font-mono')}>⌘K</span>
          </span>
          <span className={styles.ahanaPill}>✦ Ask Ahana</span>
        </div>

        {/* Signal map */}
        <div className={styles.mapCard}>
          <svg
            className={styles.net}
            viewBox="0 0 600 380"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id={`glowHub-${uid}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.30" />
                <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Water body */}
            <ellipse cx="130" cy="400" rx="280" ry="82" fill="var(--map-water)" opacity="0.9" />
            <ellipse cx="520" cy="370" rx="180" ry="60" fill="var(--map-water)" opacity="0.8" />

            {/* Grid */}
            <g stroke="var(--viz-grid)" strokeWidth="1">
              {[80, 160, 240, 320, 400, 480, 560].map((x) => (
                <line key={`x${x}`} x1={x} y1="0" x2={x} y2="380" />
              ))}
              {[80, 160, 240, 320].map((y) => (
                <line key={`y${y}`} x1="0" y1={y} x2="600" y2={y} />
              ))}
            </g>

            {/* Radar sweep from the hub */}
            <g fill="none" stroke="var(--viz-1-soft)">
              <circle
                className={styles.radar}
                cx={HUB.x}
                cy={HUB.y}
                r="170"
                strokeWidth="1"
                strokeDasharray="2 10"
                opacity="0.5"
              />
              <circle
                className={styles.radar}
                cx={HUB.x}
                cy={HUB.y}
                r="120"
                strokeWidth="1"
                strokeDasharray="1 12"
                opacity="0.35"
              />
            </g>

            {/* Conduits */}
            {Object.values(PATHS).map((d) => (
              <path key={d} className={styles.conduit} d={d} />
            ))}

            {/* Travelling pulses (conditional: SMIL ignores CSS reduced-motion) */}
            {!reduced && (
              <g>
                {TRAVELERS.map((t) => (
                  <circle
                    key={t.path}
                    className={styles.trav}
                    r={t.fill === 'var(--viz-1-soft)' ? 2.5 : 3}
                    fill={t.fill}
                  >
                    <animateMotion dur={t.dur} begin={t.begin} repeatCount="indefinite" path={t.path} />
                  </circle>
                ))}
              </g>
            )}

            {/* Minor unlabeled dots */}
            {sampleLocations
              .filter((l) => minorIds.has(l.id) && l.id !== 'loc-007' && l.id !== 'loc-010' && l.id !== 'loc-009')
              .map((loc) => (
                <circle
                  key={loc.id}
                  className={cn(styles.nDot, styles.nOk)}
                  cx={loc.x}
                  cy={loc.y}
                  r="4"
                />
              ))}

            {/* Labeled site nodes */}
            {NODES.map((node) => {
              const loc = byId(node.id)
              const r = loc.minor ? 4 : 5.5
              const { labelNode, metaNode } = nodeLabels(node, loc)
              return (
                <g key={node.id}>
                  {!reduced && node.id !== 'loc-007' && (
                    <circle
                      className={styles.nodeRing}
                      cx={loc.x}
                      cy={loc.y}
                      r={r}
                      fill={TONE_VAR[node.tone]}
                      style={{ '--d': RING_DELAYS[node.id] ?? '1.1s' } as CSSProperties}
                    />
                  )}
                  <circle
                    className={cn(styles.nDot, TONE_CLS[node.tone])}
                    cx={loc.x}
                    cy={loc.y}
                    r={node.tone === 'hub' ? 7 : r}
                    strokeWidth={node.tone === 'hub' ? 2.5 : 2}
                  />
                  {labelNode}
                  {metaNode}
                </g>
              )
            })}

            {/* Hub beacon */}
            <g>
              <circle cx={HUB.x} cy={HUB.y} r="30" fill={`url(#glowHub-${uid})`} />
              {!reduced && (
                <circle
                  className={styles.hubRing}
                  cx={HUB.x}
                  cy={HUB.y}
                  r="10"
                  fill="none"
                  stroke="var(--brand-primary)"
                  strokeWidth="1.5"
                />
              )}
              <circle
                className={cn(styles.nDot, styles.nHub)}
                cx={HUB.x}
                cy={HUB.y}
                r="7"
                strokeWidth="2.5"
              />
              <text
                className={styles.nLabel}
                x={HUB.x - 10}
                y={HUB.y - 3}
                textAnchor="end"
                stroke="var(--surface-sunken)"
                strokeWidth="3"
                paintOrder="stroke"
                strokeLinejoin="round"
              >
                {HUB.name}
              </text>
              <text
                className={styles.nMeta}
                x={HUB.x - 10}
                y={HUB.y + 9}
                textAnchor="end"
                stroke="var(--surface-sunken)"
                strokeWidth="2.5"
                paintOrder="stroke"
                strokeLinejoin="round"
              >
                HQ
              </text>
            </g>
          </svg>

          <span className={styles.ahanaChip} aria-hidden="true">
            ✦ <span className={styles.ahanaMono}>AHANA</span> INSIGHT
          </span>

          <div className={styles.liveStats} aria-hidden="true">
            <span className={styles.liveStat}>
              <span className="live-dot size-1.5 self-center rounded-full bg-success" />
              <span>live</span>
            </span>
            <span className={styles.statSep} />
            <span className={styles.liveStat}>
              <span>Received</span>
              <span key={popTick} className={cn(styles.liveStatB, styles.pop, 'font-mono')}>
                {latest}
              </span>
            </span>
            <span className={styles.statSep} />
            <span className={styles.liveStat}>
              <span className={cn(styles.liveStatB, 'font-mono')} style={{ color: 'var(--danger-solid)' }}>
                {UNANSWERED}
              </span>
              <span>unanswered</span>
            </span>
          </div>
        </div>

        {/* Needs-attention table */}
        <div className={styles.tWrap}>
          <div className={styles.tTitle}>
            <b className={styles.tTitleB}>Needs attention</b>
            <span className={cn(styles.tTitleMeta, 'font-mono')}>
              {HEALTHY} of {TOTAL} synced · scanned 21 min ago
            </span>
          </div>
          {ROWS.map((row, i) => {
            const loc = row.loc
            return (
              <div key={loc.id} className={cn(styles.pRow, hotIdx === i && styles.pRowHot)}>
                <div className="min-w-0">
                  <div className={styles.locRow}>
                    <span className={styles.locTitle}>{loc.name}</span>
                    <span className={cn(styles.hp, PILL_CLS[row.pill.tone])}>{row.pill.label}</span>
                  </div>
                  <div className={styles.locMeta}>
                    {loc.area}
                  </div>
                </div>
                <span className={cn(styles.monoId, 'font-mono')}>{loc.code}</span>
                <span className={cn(styles.monoNum, 'font-mono')}>{loc.reviews}</span>
                <span className={cn(styles.monoNum, styles.monoDim, 'font-mono')}>{row.metaRight}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Rotating catch chips */}
      <div className={styles.chipStack} aria-hidden="true">
        {chips.map((chip, i) => (
          <div key={`${chipHead}-${i}`} className={styles.chipIn}>
            <div className={styles.chip}>
              <span className={cn(styles.dotWrap, chip.cls, 'font-mono')}>{chip.ic}</span>
              <span>{chip.body}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Catch note */}
      <div className={styles.catchNote}>
        <span>{NOTES[scenario]}</span>
        <span className={styles.catchArrow}>Open →</span>
      </div>
    </div>
  )
}