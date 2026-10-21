'use client'

import { Store } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks'
import styles from './hero-network.module.css'

type Tone = 'ok' | 'warn' | 'bad' | 'hub'

type NetworkNode = {
  id: string
  name?: string
  meta?: string
  x: number
  y: number
  tone: Tone
  label?: 'left' | 'right' | 'below' | 'above'
  primary?: boolean
  hub?: boolean
}

/* Composed for the hero's 600 × 290 signal canvas (Mumbai metro, sample data).
   Coordinates are percentages of that canvas so the markers stay crisp while
   the SVG paths stretch with the column. */
const NODES: NetworkNode[] = [
  { id: 'bandra', name: 'Bandra West', meta: 'HQ', x: 212, y: 162, tone: 'hub', label: 'left', primary: true, hub: true },
  { id: 'thane', name: 'Thane', x: 475, y: 86, tone: 'warn', label: 'left', primary: true },
  { id: 'powai', name: 'Powai', x: 392, y: 122, tone: 'warn', label: 'right' },
  { id: 'vashi', name: 'Vashi', x: 516, y: 190, tone: 'bad', label: 'left' },
  { id: 'andheri', name: 'Andheri', x: 305, y: 130, tone: 'ok', label: 'below' },
  { id: 'lowerparel', name: 'Lower Parel', x: 238, y: 222, tone: 'ok', label: 'left' },
  { id: 'colaba', name: 'Colaba', x: 225, y: 260, tone: 'ok', label: 'below' },
  { id: 'malad', name: 'Malad', x: 262, y: 74, tone: 'ok', label: 'left' },
]

/* Faint unlabelled sites keep the composition from reading as a diagram. */
const MINOR_NODES = [
  { id: 'borivali', x: 306, y: 40 },
  { id: 'juhu', x: 214, y: 102 },
  { id: 'ghatkopar', x: 424, y: 156 },
  { id: 'chembur', x: 400, y: 188 },
]

const PATHS = [
  { id: 'malad', d: 'M212,162 C225,136 240,106 262,74' },
  { id: 'thane', d: 'M212,162 C286,142 386,106 475,86' },
  { id: 'powai', d: 'M212,162 C270,152 330,138 392,122' },
  { id: 'vashi', d: 'M212,162 C320,168 420,178 516,190' },
  { id: 'andheri', d: 'M212,162 C244,153 274,141 305,130' },
  { id: 'lowerparel', d: 'M212,162 C224,184 231,203 238,222' },
  { id: 'colaba', d: 'M212,162 C224,194 225,230 225,260' },
] as const

const TRACES = [
  { id: 'thane', d: PATHS[1].d, dur: '8.6s', begin: '0s', tone: 'brand' },
  { id: 'vashi', d: PATHS[3].d, dur: '10.4s', begin: '3.1s', tone: 'blue' },
  { id: 'colaba', d: PATHS[6].d, dur: '7.8s', begin: '5.4s', tone: 'soft' },
] as const

const TRACE_CLASS = {
  brand: styles.traceBrand,
  blue: styles.traceBlue,
  soft: styles.traceSoft,
} as const

const TONE_CLASS: Record<Exclude<Tone, 'hub'>, string> = {
  ok: styles.toneOk,
  warn: styles.toneWarn,
  bad: styles.toneBad,
}

export function HeroNetwork() {
  const reduced = usePrefersReducedMotion()

  return (
    <div
      className={styles.network}
      role="group"
      aria-label="Illustrative location signal network for a twelve-site Mumbai workspace."
    >
      <div aria-hidden="true" className={styles.wash} />

      <svg className={styles.canvas} viewBox="0 0 600 290" preserveAspectRatio="none" aria-hidden="true">
        {/* Quiet map contours — enough depth to feel composed when idle. */}
        <g className={styles.contours} fill="none">
          <path d="M-24,76 C120,120 238,26 620,50" />
          <path d="M-30,246 C126,214 268,286 624,236" />
        </g>

        {/* Curved conduits into the active location. */}
        {PATHS.map((path) => (
          <path key={path.id} className={styles.conduit} d={path.d} vectorEffect="non-scaling-stroke" />
        ))}

        {/* Slow signal traces (SMIL ignores CSS reduced-motion, so omit them). */}
        {!reduced && (
          <g>
            {TRACES.map((trace) => (
              <circle key={trace.id} className={cn(styles.trace, TRACE_CLASS[trace.tone])} r="2.3">
                <animateMotion dur={trace.dur} begin={trace.begin} repeatCount="indefinite" path={trace.d} />
              </circle>
            ))}
          </g>
        )}

        {/* Unlabelled stores for network depth. */}
        <g className={styles.minorGroup}>
          {MINOR_NODES.map((node) => (
            <circle key={node.id} className={styles.minorDot} cx={node.x} cy={node.y} r="2" />
          ))}
        </g>
      </svg>

      <p className={styles.head} aria-hidden="true">
        <span className={styles.headTitle}>Location signal network</span>
        <span className={styles.headMeta}>Mumbai metro</span>
      </p>

      <div className={styles.driftChip}>
        <span aria-hidden="true" className={styles.driftIcon}>
          ▲
        </span>
        <span className={styles.driftCopy}>
          <b>Profile drift detected</b>
          <span className={styles.driftMeta}>Thane · Saturday hours · caught 21m ago</span>
        </span>
      </div>

      <div className={styles.nodes} aria-hidden="true">
        {NODES.map((node) => (
          <span
            key={node.id}
            className={cn(
              styles.node,
              node.hub && styles.nodeHub,
              node.label && styles[`label${node.label[0].toUpperCase()}${node.label.slice(1)}`],
            )}
            style={{ left: `${(node.x / 600) * 100}%`, top: `${(node.y / 290) * 100}%` }}
          >
            {node.hub ? (
              <>
                {!reduced && (
                  <span className={styles.pulseLayer}>
                    <span className={styles.pulse} />
                    <span className={cn(styles.pulse, styles.pulseDelay)} />
                  </span>
                )}
                <span className={styles.hubTile}>
                  <Store size={12} strokeWidth={2} />
                </span>
              </>
            ) : (
              <span className={cn(styles.dot, TONE_CLASS[node.tone as Exclude<Tone, 'hub'>])} />
            )}

            {node.name && (
              <span
                className={cn(
                  styles.label,
                  node.primary && styles.labelPrimary,
                  node.label === 'left' && styles.labelLeft,
                  node.label === 'right' && styles.labelRight,
                  node.label === 'below' && styles.labelBelow,
                  node.label === 'above' && styles.labelAbove,
                )}
              >
                <span className={styles.labelName}>{node.name}</span>
                {node.meta && <span className={styles.labelMeta}>{node.meta}</span>}
              </span>
            )}
          </span>
        ))}
      </div>

      <span className={styles.coords} aria-hidden="true">
        19.076° N · 72.877° E
      </span>
    </div>
  )
}
