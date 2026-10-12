'use client'

import { useEffect, useState } from 'react'
import { MapPin, Pause, Play, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { heroScenarios, locationById, sampleLocations } from '@/lib/sample-data'
import { useInView, usePrefersReducedMotion } from '@/lib/hooks'
import { LocationMap } from './location-map'
import { SampleBadge, Stars, StatusBadge } from './primitives'

const STAGE_DELAYS = [900, 900, 900, 3600]
const FINAL_STAGE = 3

const avgRating = (sampleLocations.reduce((s, l) => s + l.rating, 0) / sampleLocations.length).toFixed(1)
const unanswered = sampleLocations.reduce((s, l) => s + l.pending, 0)
const verified = sampleLocations.filter((l) => l.profile === 'Verified').length

export function HeroWorkspace() {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.25, rootMargin: '0px' })
  const [index, setIndex] = useState(0)
  const [stage, setStage] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovering, setHovering] = useState(false)

  const playing = !reduced && !userPaused && !hovering && inView
  const shownStage = reduced ? FINAL_STAGE : stage

  useEffect(() => {
    if (!playing) return
    const t = window.setTimeout(() => {
      if (stage < FINAL_STAGE) {
        setStage(stage + 1)
      } else {
        setIndex((i) => (i + 1) % heroScenarios.length)
        setStage(0)
      }
    }, STAGE_DELAYS[stage])
    return () => window.clearTimeout(t)
  }, [playing, stage])

  const scenario = heroScenarios[index]
  const loc = locationById(scenario.locationId)

  const goTo = (i: number) => {
    setIndex(i)
    setStage(FINAL_STAGE)
    setUserPaused(true)
  }

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      aria-label="Sample workspace preview"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
      className="relative"
    >
      <div className="overflow-hidden rounded-panel border border-line bg-card shadow-raised">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
            </span>
            <p className="truncate text-sm font-semibold">
              Mumbai region <span className="font-normal text-ink-3">· {sampleLocations.length} locations</span>
            </p>
          </div>
          <SampleBadge />
        </div>

        <div className="relative aspect-[600/380] bg-sunken">
          <LocationMap
            label={`Sample map of ${sampleLocations.length} locations. ${loc.name} highlighted.`}
            selectedId={shownStage >= 2 ? loc.id : null}
            pulseId={shownStage >= 2 ? loc.id : null}
            animateIn
          />

          <div
            className={cn(
              'pointer-events-none absolute inset-x-3 bottom-3 hidden md:flex',
              loc.x < 300 ? 'justify-start' : 'justify-end',
            )}
          >
            <InsightCard key={`insight-${index}`} visible={shownStage >= 3} text={scenario.insight} action={scenario.action} />
          </div>

          <div
            className={cn(
              'absolute top-3 hidden w-[min(300px,52%)] md:block',
              loc.x < 300 ? 'right-3' : 'left-3',
            )}
          >
            <ReviewCard key={`review-${index}`} index={index} stage={shownStage} />
          </div>
        </div>

        <div className="grid gap-3 border-t border-line p-3 md:hidden">
          <ReviewCard key={`review-m-${index}`} index={index} stage={shownStage} />
          <InsightCard key={`insight-m-${index}`} visible={shownStage >= 3} text={scenario.insight} action={scenario.action} />
        </div>

        <dl className="grid grid-cols-3 divide-x divide-line border-t border-line">
          {[
            ['Avg. rating', avgRating],
            ['Unanswered', String(unanswered)],
            ['Verified profiles', `${verified}/${sampleLocations.length}`],
          ].map(([label, value]) => (
            <div key={label} className="px-4 py-3">
              <dt className="text-xs text-ink-3">{label}</dt>
              <dd className="tnum mt-0.5 text-lg font-semibold tracking-[-0.02em]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5" role="group" aria-label="Choose sample event">
          {heroScenarios.map((s, i) => {
            const l = locationById(s.locationId)
            const isActive = i === index
            return (
              <button
                key={s.locationId}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show sample event at ${l.name}`}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative flex h-8 items-center gap-1.5 overflow-hidden rounded-full border px-3 text-xs font-semibold transition-colors',
                  isActive
                    ? 'border-brand-border bg-brand-subtle text-ink shadow-sm'
                    : 'border-line bg-card text-ink-3 hover:bg-hover hover:text-ink',
                )}
              >
                <span
                  className={cn(
                    'size-1.5 rounded-full',
                    s.sentiment === 'Negative' ? 'bg-danger' : 'bg-success',
                  )}
                  aria-hidden="true"
                />
                {l.name}
                {isActive && playing ? (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-brand origin-left animate-pulse"
                  />
                ) : null}
              </button>
            )
          })}
        </div>
        {!reduced ? (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-ink-3">
              {userPaused ? 'Paused' : 'Auto-playing'}
            </span>
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? 'Play preview animation' : 'Pause preview animation'}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-card text-ink-2 transition-colors hover:bg-hover hover:text-ink"
            >
              {userPaused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function ReviewCard({ index, stage }: { index: number; stage: number }) {
  const s = heroScenarios[index]
  const loc = locationById(s.locationId)
  const negative = s.sentiment === 'Negative'
  return (
    <article
      aria-label={`Sample ${s.source} for ${loc.name}`}
      className="enter-rise rounded-card border border-line bg-card/95 dark:bg-[oklch(0.24_0.015_265/0.95)] dark:border-[oklch(0.38_0.02_265)] backdrop-blur-md p-3.5 shadow-raised"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-sunken text-[11px] font-semibold text-ink-2">
            {s.author
              .split(' ')
              .map((p) => p[0])
              .join('')}
          </span>
          <div className="leading-tight">
            <p className="text-[13px] font-semibold">{s.author}</p>
            <p className="text-[11px] text-ink-3">
              {s.source} · {s.time}
            </p>
          </div>
        </div>
        <Stars rating={s.rating} />
      </div>
      <p className="mt-2.5 text-[13px] leading-snug text-ink">{s.text}</p>
      <div
        className={cn(
          'mt-3 flex flex-wrap items-center gap-1.5 transition-[opacity,transform] duration-300',
          stage >= 1 ? 'opacity-100' : 'translate-y-1 opacity-0',
        )}
      >
        <span
          className={cn(
            'rounded-full border px-2 py-0.5 text-[11px] font-semibold',
            negative ? 'border-danger-border bg-danger-subtle text-danger' : 'border-success-border bg-success-subtle text-success',
          )}
        >
          {s.sentiment}
        </span>
        <span className="rounded-full border border-line bg-sunken px-2 py-0.5 text-[11px] font-medium text-ink-2">
          {s.topic}
        </span>
      </div>
      <div
        className={cn(
          'mt-2.5 flex items-center justify-between gap-2 border-t border-line pt-2.5 transition-opacity duration-300',
          stage >= 2 ? 'opacity-100' : 'opacity-0',
        )}
      >
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold">
          <MapPin aria-hidden="true" className="size-3.5 text-brand" />
          {loc.name}
        </span>
        <StatusBadge status={loc.status} className="text-[11px]" />
      </div>
    </article>
  )
}

function InsightCard({ visible, text, action }: { visible: boolean; text: string; action: string }) {
  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'bg-insight pointer-events-auto w-full max-w-[320px] rounded-card p-3.5 text-insight-ink shadow-raised transition-[opacity,transform] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] border border-white/20 dark:border-white/10',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
      )}
    >
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] opacity-90">
        <Sparkles aria-hidden="true" className="size-3.5" />
        AI Insight
      </p>
      <p className="mt-1.5 text-[13px] font-medium leading-snug">{text}</p>
      <p className="mt-2.5 inline-flex rounded-full bg-[oklch(1_0_0/0.7)] px-2.5 py-1 text-[11px] font-semibold text-[oklch(0.203_0.014_265)] dark:bg-[oklch(0_0_0/0.4)] dark:text-insight-ink">
        {action}
      </p>
    </div>
  )
}
