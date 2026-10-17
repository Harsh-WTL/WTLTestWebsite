'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronRight, MapPin, Pause, Play, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { heroScenarios, locationById, sampleLocations } from '@/lib/sample-data'
import { useInView, usePrefersReducedMotion } from '@/lib/hooks'
import { useTheme } from '@/lib/theme'
import { LocationMap } from './location-map'
import { Stars } from './primitives'

// Sequence stages for the signature "Location Signal":
// Stage 0: Initial map & network initialization
// Stage 1: Storefront marker activates (pulse beacon)
// Stage 2: Signal beam conduit travels from storefront to workspace
// Stage 3: Live customer review / event card appears
// Stage 4: Ask Ahana AI insight panel surfaces anomaly & resolution
const STAGE_DELAYS = [600, 700, 700, 850, 4400]
const FINAL_STAGE = 4

const avgRating = (sampleLocations.reduce((s, l) => s + l.rating, 0) / sampleLocations.length).toFixed(1)
const unanswered = sampleLocations.reduce((s, l) => s + l.pending, 0)

export function HeroWorkspace() {
  const reduced = usePrefersReducedMotion()
  const theme = useTheme()
  const isDark = theme === 'dark'
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.15, rootMargin: '0px' })
  const [index, setIndex] = useState(0)
  const [stage, setStage] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [actionDone, setActionDone] = useState(false)

  const playing = !reduced && !userPaused && !hovering && inView
  const shownStage = reduced ? FINAL_STAGE : stage

  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => {
      if (stage < FINAL_STAGE) {
        setStage(stage + 1)
      } else {
        setIndex((i) => (i + 1) % heroScenarios.length)
        setStage(0)
        setActionDone(false)
      }
    }, STAGE_DELAYS[stage])
    return () => window.clearTimeout(timer)
  }, [playing, stage])

  const scenario = heroScenarios[index]
  const loc = locationById(scenario.locationId)

  const handleSelectScenario = (i: number) => {
    setIndex(i)
    setStage(FINAL_STAGE)
    setUserPaused(true)
    setActionDone(false)
  }

  const isPinOnRight = loc.x > 320
  const signalTarget = isPinOnRight ? { toX: 195, toY: 82 } : { toX: 405, toY: 82 }

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      aria-label="What The Local Client Command Workspace"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
      className="relative w-full select-none"
    >
      {/* Outer Dashboard Shell */}
      <div className="command-surface overflow-hidden rounded-panel transition-all duration-300">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-line bg-sunken/80 px-4 py-3 backdrop-blur-md dark:border-white/[0.09] dark:bg-[#0A0D16]/95">
          <div className="flex min-w-0 items-center gap-2.5">
            {/* Window Dots */}
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-line-strong dark:bg-white/20" />
              <span className="size-2.5 rounded-full bg-line-strong dark:bg-white/20" />
              <span className="size-2.5 rounded-full bg-line-strong dark:bg-white/20" />
            </span>
            <span aria-hidden="true" className="h-3.5 w-px bg-line-strong dark:bg-white/10" />
            {/* Title & Live Status */}
            <p className="truncate font-mono text-[12px] font-semibold tracking-wider text-ink dark:text-white">
              WTL / CONTROL <span className="font-normal text-ink-3 dark:text-white/50">· Mumbai Network (12 Storefronts)</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand-subtle px-2.5 py-0.5 font-mono text-[11px] text-brand dark:border-white/10 dark:bg-white/[0.04] dark:text-[#38BDF8]">
              <span aria-hidden="true" className="live-dot size-1.5 rounded-full bg-brand dark:bg-[#38BDF8]" />
              Sentinel: Active
            </span>
            <span className="inline-flex items-center rounded-full border border-line bg-card px-2.5 py-0.5 font-mono text-[11px] text-ink-3 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/50">
              Sample Workspace
            </span>
          </div>
        </div>

        {/* Central Map Canvas + Location Signal Overlays */}
        <div className="relative aspect-[600/380] bg-sunken dark:bg-[#07090e] overflow-hidden">
          <LocationMap
            label={`Regional network map of 12 Mumbai locations. Active storefront: ${loc.name}.`}
            selectedId={shownStage >= 1 ? loc.id : null}
            pulseId={shownStage >= 1 ? loc.id : null}
            signalPath={shownStage >= 2 ? { fromId: loc.id, ...signalTarget } : null}
            animateIn
            darkCanvas={isDark}
          />

          {/* Real-time Customer Review / Activity Signal Card (Desktop Overlay) */}
          <div
            className={cn(
              'pointer-events-none absolute top-3 hidden w-[min(300px,52%)] transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] md:block',
              isPinOnRight ? 'left-3' : 'right-3',
              shownStage >= 3 ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
            )}
          >
            <div className="pointer-events-auto">
              <ReviewSignalCard scenario={scenario} loc={loc} />
            </div>
          </div>

          {/* Ask Ahana AI Insight & Action Panel (Desktop Overlay) */}
          <div
            className={cn(
              'pointer-events-none absolute bottom-3 hidden max-w-[340px] transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] md:flex',
              isPinOnRight ? 'left-3' : 'right-3',
              shownStage >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
            )}
          >
            <div className="pointer-events-auto w-full">
              <AhanaInsightPanel
                text={scenario.insight}
                action={scenario.action}
                locationName={loc.name}
                actionDone={actionDone}
                onTriggerAction={() => setActionDone(true)}
              />
            </div>
          </div>
        </div>

        {/* Mobile View: Clean sequential cards below the map */}
        <div className="grid gap-3 border-t border-line p-3 md:hidden bg-sunken/40 dark:border-white/10 dark:bg-[#0a0d16]">
          <ReviewSignalCard scenario={scenario} loc={loc} />
          <AhanaInsightPanel
            text={scenario.insight}
            action={scenario.action}
            locationName={loc.name}
            actionDone={actionDone}
            onTriggerAction={() => setActionDone(true)}
          />
        </div>

        {/* Bottom Workspace Telemetry Strip */}
        <dl className="grid grid-cols-4 divide-x divide-line border-t border-line bg-sunken/80 text-center text-ink dark:divide-white/[0.08] dark:border-white/[0.09] dark:bg-[#0A0D16]/95 dark:text-white">
          <div className="px-3 py-2.5">
            <dt className="text-[11px] font-mono text-ink-3 dark:text-white/50">Storefronts</dt>
            <dd className="tnum mt-0.5 text-[15px] font-semibold text-ink sm:text-[16px] dark:text-white">
              12 <span className="text-ink-3 dark:text-white/40 text-[11px] font-normal">Active</span>
            </dd>
          </div>
          <div className="px-3 py-2.5">
            <dt className="text-[11px] font-mono text-ink-3 dark:text-white/50">Portfolio Rating</dt>
            <dd className="tnum mt-0.5 text-[15px] font-semibold text-ink sm:text-[16px] dark:text-white">
              {avgRating} <span className="text-[#FBBF24] text-xs font-normal">★</span>
            </dd>
          </div>
          <div className="px-3 py-2.5">
            <dt className="text-[11px] font-mono text-ink-3 dark:text-white/50">Review Queue</dt>
            <dd className="tnum mt-0.5 text-[15px] font-semibold text-ink sm:text-[16px] dark:text-white">
              {unanswered} <span className="text-ink-3 dark:text-white/40 text-[11px] font-normal">pending</span>
            </dd>
          </div>
          <div className="px-3 py-2.5">
            <dt className="text-[11px] font-mono text-ink-3 dark:text-white/50">WhatsApp SLA</dt>
            <dd className="tnum mt-0.5 text-[15px] font-semibold text-brand dark:text-[#38BDF8] sm:text-[16px]">
              &lt; 45s
            </dd>
          </div>
        </dl>
      </div>

      {/* Control Bar: Location Signal Switcher & Auto-Play Controls */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 px-1">
        {/* Interactive Location Scenario Tabs */}
        <div className="flex items-center gap-1.5" role="group" aria-label="Location Signal Scenarios">
          {heroScenarios.map((s, i) => {
            const l = locationById(s.locationId)
            const isActive = i === index
            return (
              <button
                key={s.locationId}
                type="button"
                onClick={() => handleSelectScenario(i)}
                aria-label={`Activate Location Signal for ${l.name}`}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative flex h-8 items-center gap-1.5 overflow-hidden rounded-full border px-3 text-xs font-medium transition-[background-color,border-color,color,box-shadow]',
                  isActive
                    ? 'border-brand/40 bg-brand-subtle text-brand-ink font-semibold shadow-sm dark:border-[#38BDF8]/50 dark:bg-[#38BDF8]/15 dark:text-white dark:shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                    : 'border-line bg-card text-ink-2 hover:bg-hover hover:text-ink dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60 dark:hover:bg-white/[0.08] dark:hover:text-white',
                )}
              >
                <span
                  className={cn(
                    'size-1.5 rounded-full shrink-0',
                    s.sentiment === 'Negative' ? 'bg-[#FB7185]' : 'bg-[#34D399]',
                  )}
                  aria-hidden="true"
                />
                <span>{l.name}</span>
                {isActive && playing && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-brand dark:bg-[#38BDF8] origin-left animate-pulse"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Auto-play status & toggle */}
        {!reduced && (
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-ink-3 dark:text-white/45">
              {userPaused ? 'Manual control' : 'Signal stream active'}
            </span>
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? 'Resume signal playback' : 'Pause signal playback'}
              className="inline-flex size-7.5 shrink-0 items-center justify-center rounded-full border border-line bg-card text-ink-2 transition-colors hover:bg-hover hover:text-ink dark:border-white/15 dark:bg-white/[0.05] dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {userPaused ? (
                <Play aria-hidden="true" className="size-3 text-ink dark:text-white" />
              ) : (
                <Pause aria-hidden="true" className="size-3 text-ink dark:text-white" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Real-time Customer Review / Activity Signal Card
 */
function ReviewSignalCard({
  scenario,
  loc,
}: {
  scenario: (typeof heroScenarios)[0]
  loc: ReturnType<typeof locationById>
}) {
  const isNegative = scenario.sentiment === 'Negative'
  return (
    <article
      aria-label={`Incoming ${scenario.source} from ${loc.name}`}
      className="command-card rounded-card border border-line p-3.5 shadow-card text-ink dark:border-white/15 dark:shadow-2xl dark:text-white"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Reviewer Avatar */}
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line bg-sunken text-[11px] font-semibold text-ink dark:border-white/10 dark:bg-white/[0.08] dark:text-white/90">
            {scenario.author
              .split(' ')
              .map((p) => p[0])
              .join('')}
          </span>
          <div className="leading-tight">
            <p className="text-[13px] font-semibold text-ink dark:text-white">{scenario.author}</p>
            <p className="text-[11px] text-ink-3 dark:text-white/50">
              {scenario.source} · {scenario.time}
            </p>
          </div>
        </div>
        <Stars rating={scenario.rating} />
      </div>

      <p className="mt-2.5 text-[12.5px] leading-snug text-ink-2 dark:text-white/85">{scenario.text}</p>

      {/* Signal metadata pills */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold',
            isNegative
              ? 'border-danger-border bg-danger-subtle text-danger'
              : 'border-success-border bg-success-subtle text-success',
          )}
        >
          {scenario.sentiment}
        </span>
        <span className="rounded-full border border-line bg-sunken px-2 py-0.5 text-[11px] font-medium text-ink-2 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70">
          {scenario.topic}
        </span>
      </div>

      {/* Connected Storefront Anchor */}
      <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-line pt-2.5 dark:border-white/10">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink dark:text-white">
          <MapPin aria-hidden="true" className="size-3.5 text-brand dark:text-[#38BDF8] shrink-0" />
          {loc.name}
        </span>
        <span className="font-mono text-[10.5px] text-ink-3 dark:text-white/50">{loc.code}</span>
      </div>
    </article>
  )
}

/**
 * Ask Ahana AI Insight & Action Panel
 * What The Local conversational intelligence layer
 */
function AhanaInsightPanel({
  text,
  action,
  locationName,
  actionDone,
  onTriggerAction,
}: {
  text: string
  action: string
  locationName: string
  actionDone: boolean
  onTriggerAction: () => void
}) {
  return (
    <div className="command-card rounded-card border border-brand/35 bg-gradient-to-br from-raised via-card to-brand-subtle/30 p-3.5 shadow-raised text-ink dark:border-[#38BDF8]/40 dark:bg-gradient-to-br dark:from-[#0F1424]/95 dark:via-[#0A0E1A]/95 dark:to-[#131B33]/95 dark:shadow-2xl dark:text-white">
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand dark:text-[#38BDF8]">
          <Sparkles aria-hidden="true" className="size-3.5 shrink-0 text-brand dark:text-[#38BDF8]" />
          Ask Ahana · Intelligence Layer
        </p>
        <span className="inline-flex items-center rounded-full bg-brand-subtle border border-brand/25 px-2 py-0.5 font-mono text-[10px] font-semibold text-brand dark:bg-[#38BDF8]/15 dark:border-[#38BDF8]/30 dark:text-[#38BDF8]">
          {locationName}
        </span>
      </div>

      <p className="mt-2 text-[13px] font-medium leading-snug text-ink dark:text-white/90">{text}</p>

      {/* Action resolution button */}
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-line pt-2.5 dark:border-white/10">
        <span className="text-[11px] font-mono text-ink-3 dark:text-white/45">Suggested Action:</span>
        <button
          type="button"
          onClick={onTriggerAction}
          className={cn(
            'group inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all active:scale-[0.98]',
            actionDone
              ? 'border-success-border bg-success-subtle text-success'
              : 'border-brand/30 bg-brand-subtle text-brand-ink hover:bg-brand-subtle/80 hover:border-brand/50 dark:border-[#38BDF8]/40 dark:bg-[#38BDF8]/15 dark:text-white dark:hover:bg-[#38BDF8]/25',
          )}
        >
          {actionDone ? (
            <>
              <Check aria-hidden="true" className="size-3 text-success" />
              <span>Escalated to Manager ✓</span>
            </>
          ) : (
            <>
              <span>{action}</span>
              <ChevronRight
                aria-hidden="true"
                className="size-3 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-ink dark:text-white/50 dark:group-hover:text-white"
              />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
