'use client'

import { useEffect, useId, useState } from 'react'
import {
  Check,
  ChevronRight,
  Flame,
  Globe,
  MapPin,
  MessageSquare,
  Navigation,
  Pause,
  Play,
  RotateCcw,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { sampleLocations, statusMeta, type SampleLocation } from '@/lib/sample-data'
import { useInView, usePrefersReducedMotion } from '@/lib/hooks'
import { useTheme } from '@/lib/theme'
import { Stars } from './primitives'

// Multi-location Atlas Scenarios covering What The Local's 3 core pillars:
// 1. Engage: Wait-time review spike at Powai -> Instant WhatsApp escalation
// 2. Locations: Unauthorized Google Maps hours drift at Thane -> 1-click Profile Guard revert
// 3. Synapse: Catchment footfall surge at Bandra West -> 3.5 km radius ad pacing & lead routing
export type AtlasScenario = {
  id: string
  pillar: 'ENGAGE' | 'LOCATIONS' | 'SYNAPSE'
  pillarLabel: string
  locationId: string
  locationName: string
  locationCode: string
  area: string
  status: 'healthy' | 'attention' | 'critical'
  eventBadge: string
  eventBadgeColor: 'danger' | 'warning' | 'success'
  eventTime: string
  source: string
  customer?: { name: string; avatar: string; rating: number }
  title: string
  description: string
  insight: string
  suggestedAction: string
  actionSuccessText: string
  catchmentStat?: { label: string; value: string }
}

const ATLAS_SCENARIOS: AtlasScenario[] = [
  {
    id: 'powai-engage',
    pillar: 'ENGAGE',
    pillarLabel: 'Engage · Review Patrol',
    locationId: 'powai',
    locationName: 'Powai',
    locationCode: 'LOC-014',
    area: 'Hiranandani Gardens',
    status: 'attention',
    eventBadge: '2★ Google Review',
    eventBadgeColor: 'danger',
    eventTime: '2m ago',
    source: 'Google Business Profile',
    customer: {
      name: 'Rhea S.',
      avatar: 'RS',
      rating: 2,
    },
    title: 'Wait-time complaint received',
    description: '“Waited almost 40 minutes past my appointment. Staff were kind, but nobody told us about the delay.”',
    insight: 'Wait-time mentions at Powai are up +35% this month while other 11 outlets stay flat. Requires manager escalation.',
    suggestedAction: 'Dispatch WhatsApp SOP to Manager',
    actionSuccessText: 'Dispatched to Manager (< 45s SLA met) ✓',
    catchmentStat: { label: 'WhatsApp SLA', value: '< 45s' },
  },
  {
    id: 'thane-guard',
    pillar: 'LOCATIONS',
    pillarLabel: 'Locations · 24/7 Profile Guard',
    locationId: 'thane',
    locationName: 'Thane',
    locationCode: 'LOC-009',
    area: 'Ghodbunder Road',
    status: 'attention',
    eventBadge: 'Hours Drift Detected',
    eventBadgeColor: 'warning',
    eventTime: 'Just now',
    source: 'Google Maps Public Sync',
    title: 'Unauthorized edit to Saturday hours',
    description: 'External Google user modified operating hours: 10:00–20:00 → 10:00–18:00 without corporate authorization.',
    insight: 'Profile Guard caught rogue Saturday change before weekend footfall. Authoritative master record is 10:00–20:00.',
    suggestedAction: '1-Click Revert to Verified Hours',
    actionSuccessText: 'Restored authoritative hours to Google API ✓',
    catchmentStat: { label: 'Hours Drift', value: 'Reverted' },
  },
  {
    id: 'bandra-synapse',
    pillar: 'SYNAPSE',
    pillarLabel: 'Synapse · Catchment Network',
    locationId: 'bandra',
    locationName: 'Bandra West',
    locationCode: 'LOC-002',
    area: 'Linking Road',
    status: 'healthy',
    eventBadge: 'Catchment Surge (+28%)',
    eventBadgeColor: 'success',
    eventTime: 'Live signal',
    source: 'Performance Max & Meta Geo',
    customer: {
      name: 'Kabir M.',
      avatar: 'KM',
      rating: 5,
    },
    title: 'Top-rated store catchment intent',
    description: '“In and out in twenty minutes. The front desk team were genuinely friendly and explained everything.”',
    insight: 'Bandra West 3.5 km radius catchment footfall is up +28%. High conversion intent in Khar & Pali Hill area.',
    suggestedAction: 'Scale 3.5 km Catchment Ads',
    actionSuccessText: 'Radius budget paced · routed to branch sales rep ✓',
    catchmentStat: { label: 'Catchment Reach', value: '3.5 km' },
  },
]

const STAGE_DELAYS = [700, 800, 900, 4800]
const FINAL_STAGE = 3

export function LivingLocationAtlas() {
  const reduced = usePrefersReducedMotion()
  const theme = useTheme()
  const isDark = theme === 'dark'
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.15, rootMargin: '0px' })
  const [index, setIndex] = useState(0)
  const [stage, setStage] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [actionDone, setActionDone] = useState(false)
  const uid = useId().replace(/:/g, '')

  const currentScenario = ATLAS_SCENARIOS[index]
  const activeLocation = sampleLocations.find((l) => l.id === currentScenario.locationId) ?? sampleLocations[0]

  const playing = !reduced && !userPaused && !hovering && inView
  const shownStage = reduced ? FINAL_STAGE : stage

  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => {
      if (stage < FINAL_STAGE) {
        setStage(stage + 1)
      } else {
        setIndex((i) => (i + 1) % ATLAS_SCENARIOS.length)
        setStage(0)
        setActionDone(false)
      }
    }, STAGE_DELAYS[stage])
    return () => window.clearTimeout(timer)
  }, [playing, stage])

  const handleSelectScenario = (i: number) => {
    setIndex(i)
    setStage(FINAL_STAGE)
    setUserPaused(true)
    setActionDone(false)
  }

  // Geographic SVG cartography tones
  const fillLand = isDark ? '#0b0e17' : 'var(--map-land)'
  const fillWater = isDark ? '#040508' : 'var(--map-water)'
  const strokeRoad = isDark ? '#1b2336' : 'var(--map-road)'
  const fillDots = isDark ? '#1c2438' : 'var(--viz-grid)'
  const activeAccent = isDark ? '#38bdf8' : 'var(--brand-primary)'

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="interactive-atlas"
      aria-label="The Living Location Atlas · What The Local Operational Workspace"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
      className="relative w-full select-none"
    >
      {/* Outer Command Canvas Shell */}
      <div className="command-surface relative overflow-hidden rounded-panel border border-line transition-all duration-300">
        {/* Top Atlas Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-sunken/85 px-4 py-3 backdrop-blur-md dark:border-white/[0.09] dark:bg-[#0A0D16]/95">
          <div className="flex min-w-0 items-center gap-2.5">
            {/* Terminal Window Dots */}
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-line-strong dark:bg-white/20" />
              <span className="size-2.5 rounded-full bg-line-strong dark:bg-white/20" />
              <span className="size-2.5 rounded-full bg-line-strong dark:bg-white/20" />
            </span>
            <span aria-hidden="true" className="h-3.5 w-px bg-line-strong dark:bg-white/10" />
            {/* Title & Network Scope */}
            <p className="truncate font-mono text-[12px] font-semibold tracking-wider text-ink dark:text-white">
              WTL // LIVING ATLAS <span className="font-normal text-ink-3 dark:text-white/50">· Mumbai Hub (12 Storefronts)</span>
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {/* Sentinel Autonomous Status */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand-subtle px-2.5 py-0.5 font-mono text-[11px] font-semibold text-brand dark:border-[#38BDF8]/30 dark:bg-[#38BDF8]/10 dark:text-[#38BDF8]">
              <span aria-hidden="true" className="live-dot size-1.5 rounded-full bg-brand dark:bg-[#38BDF8]" />
              Sentinel: Autonomous 24/7
            </span>

            {/* Portfolio Health Score */}
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-2.5 py-0.5 font-mono text-[11px] font-medium text-ink-2 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70">
              <span className="size-1.5 rounded-full bg-success" />
              Health: 98/100
            </span>

            <span className="hidden md:inline-flex items-center rounded-full border border-line bg-card px-2.5 py-0.5 font-mono text-[11px] text-ink-3 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/50">
              Sample Workspace
            </span>
          </div>
        </div>

        {/* Spatial Deck: 3-Zone Architecture on Desktop, Responsive Stack on Mobile */}
        <div className="relative grid min-h-[440px] lg:h-[480px] lg:grid-cols-[minmax(0,3.2fr)_minmax(0,5.6fr)_minmax(0,3.2fr)]">
          {/* ZONE 1 (Left): Portfolio Triage Hub */}
          <div className="flex flex-col justify-between border-b border-line bg-card/90 p-4 lg:border-b-0 lg:border-r dark:border-white/[0.08] dark:bg-[#0B0E18]/90">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-brand dark:text-[#38BDF8]">
                  {currentScenario.pillarLabel}
                </span>
                <span className="rounded-full border border-line bg-sunken px-2 py-0.5 font-mono text-[10px] text-ink-3 dark:border-white/10 dark:text-white/50">
                  {currentScenario.locationCode}
                </span>
              </div>

              <div className="mt-2.5 flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-ink dark:text-white">
                    {currentScenario.locationName} Hub
                  </h3>
                  <p className="text-xs text-ink-3 dark:text-white/50">{currentScenario.area}</p>
                </div>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold',
                    currentScenario.status === 'healthy'
                      ? 'border-success-border bg-success-subtle text-success'
                      : 'border-warning-border bg-warning-subtle text-warning',
                  )}
                >
                  <span
                    className={cn(
                      'size-1.5 rounded-full',
                      currentScenario.status === 'healthy' ? 'bg-success' : 'bg-warning',
                    )}
                  />
                  {currentScenario.status === 'healthy' ? 'Verified GBP' : 'Action Required'}
                </span>
              </div>

              {/* Outlet Metric Strip */}
              <div className="mt-4 grid grid-cols-3 gap-1.5 rounded-ctl border border-line bg-sunken/60 p-2 text-center text-xs dark:border-white/10 dark:bg-white/[0.03]">
                <div>
                  <span className="block text-[10px] font-mono text-ink-3 dark:text-white/45">Rating</span>
                  <span className="font-semibold text-ink dark:text-white">{activeLocation.rating} ★</span>
                </div>
                <div className="border-x border-line dark:border-white/10">
                  <span className="block text-[10px] font-mono text-ink-3 dark:text-white/45">Reviews</span>
                  <span className="font-semibold text-ink dark:text-white">{activeLocation.reviews}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-ink-3 dark:text-white/45">Pending</span>
                  <span
                    className={cn(
                      'font-semibold',
                      activeLocation.pending > 0 ? 'text-warning font-bold' : 'text-success',
                    )}
                  >
                    {activeLocation.pending}
                  </span>
                </div>
              </div>

              {/* Real-time incident context */}
              <div className="mt-4 rounded-ctl border border-line bg-card p-3 shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-ink-2 dark:text-white/70">Active Incident Stream:</span>
                  <span className="font-mono text-[10px] text-ink-3 dark:text-white/50">{currentScenario.eventTime}</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-ink dark:text-white">{currentScenario.title}</p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-ink-3 dark:text-white/60">
                  {currentScenario.description}
                </p>
              </div>
            </div>

            {/* Bottom SLA / Network Footprint */}
            <div className="mt-4 border-t border-line pt-3 text-[11px] text-ink-3 dark:border-white/10 dark:text-white/50">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck aria-hidden="true" className="size-3.5 text-brand dark:text-[#38BDF8]" />
                  24/7 Profile Guard Active
                </span>
                <span className="font-mono text-[10.5px]">API v2.4</span>
              </div>
            </div>
          </div>

          {/* ZONE 2 (Center): The Living Geographic Mesh & Signal Conduit */}
          <div className="relative min-h-[300px] overflow-hidden bg-sunken lg:h-full dark:bg-[#07090e]">
            {/* SVG Cartographic Atlas */}
            <svg
              viewBox="0 0 600 380"
              role="group"
              aria-label={`Geographic atlas of Mumbai network. Active location: ${activeLocation.name}`}
              className="block h-full w-full select-none"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern id={`atlas-dots-${uid}`} width="14" height="14" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="0.8" fill={fillDots} />
                </pattern>
                {/* Luminous Glow Filter for Signal Ray */}
                <filter id={`glow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Geographic Land & Coastline Paths */}
              <g aria-hidden="true">
                <rect width="600" height="380" fill={fillLand} />
                <rect width="600" height="380" fill={`url(#atlas-dots-${uid})`} />
                {/* Arabian Sea & Mahim / Thane Creeks */}
                <path
                  d="M0 0H178C162 52 190 98 176 150C164 198 196 238 190 292C186 334 214 352 210 380H0Z"
                  fill={fillWater}
                />
                <path
                  d="M452 380C446 330 470 300 458 250C448 206 466 170 452 128C442 96 452 62 438 0"
                  fill="none"
                  stroke={fillWater}
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                {/* Major Arterial Roads & Western/Eastern Express Contours */}
                <g fill="none" stroke={strokeRoad} strokeLinecap="round">
                  <path d="M228 380C232 300 214 230 238 160C258 104 282 60 300 0" strokeWidth="3" />
                  <path d="M300 380C318 300 360 250 398 200C430 160 470 110 500 0" strokeWidth="3" />
                  <path d="M190 210C260 196 330 172 420 186C480 196 540 240 600 250" strokeWidth="2.2" />
                  <path d="M214 142C280 136 350 120 410 128" strokeWidth="1.8" />
                  <path d="M240 290C300 270 350 250 400 240C450 232 500 250 540 270" strokeWidth="1.8" />
                  <path d="M262 84C320 70 400 64 488 58" strokeWidth="1.8" />
                </g>
              </g>

              {/* Cartographic Coordinate Ticks & Reference Marks */}
              <g
                aria-hidden="true"
                className="font-mono text-[9px] fill-ink-3/70 dark:fill-white/35"
                style={{ fontFamily: 'var(--font-geist-mono)' }}
              >
                <text x="18" y="24">19°12'N · 72°50'E</text>
                <text x="500" y="365" textAnchor="end">MUMBAI METRO // REGION 01</text>
                {/* Fine Latitude/Longitude Guideline */}
                <line x1="220" y1="0" x2="220" y2="380" stroke={strokeRoad} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                <line x1="0" y1="180" x2="600" y2="180" stroke={strokeRoad} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
              </g>

              {/* Dynamic Signal Conduit Stream from Active Location to Output Deck */}
              {shownStage >= 1 && (() => {
                const targetX = 580
                const targetY = 160
                const midX = activeLocation.x + (targetX - activeLocation.x) * 0.45
                const pathD = `M ${activeLocation.x} ${activeLocation.y} C ${midX} ${activeLocation.y}, ${midX} ${targetY}, ${targetX} ${targetY}`
                return (
                  <g aria-hidden="true" className="signal-layer transition-opacity duration-300">
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isDark ? 'rgba(56, 189, 248, 0.35)' : 'color-mix(in oklch, var(--brand-primary) 30%, transparent)'}
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <path
                      d={pathD}
                      fill="none"
                      stroke={activeAccent}
                      strokeWidth="2"
                      className="signal-conduit"
                      strokeLinecap="round"
                    />
                    <circle cx={targetX} cy={targetY} r="3" fill={activeAccent} />
                  </g>
                )
              })()}

              {/* 12 Storefront Nodes with Status Rings */}
              {sampleLocations.map((loc) => {
                const isSelected = loc.id === activeLocation.id
                const meta = statusMeta[loc.status]
                const r = loc.minor ? 4 : 5.5

                return (
                  <g
                    key={loc.id}
                    transform={`translate(${loc.x} ${loc.y})`}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => {
                      const foundIdx = ATLAS_SCENARIOS.findIndex((s) => s.locationId === loc.id)
                      if (foundIdx !== -1) {
                        handleSelectScenario(foundIdx)
                      }
                    }}
                  >
                    {/* Active Location Beacon Pulse Ring */}
                    {isSelected && (
                      <circle
                        r={r + 6}
                        fill="none"
                        stroke={activeAccent}
                        strokeWidth="2.5"
                        className="pulse-ring"
                      />
                    )}
                    {/* Selected Highlight Ring */}
                    {isSelected && (
                      <circle
                        r={r + 3.5}
                        fill="none"
                        stroke={activeAccent}
                        strokeWidth="1.8"
                      />
                    )}
                    {/* Tap target expander */}
                    <circle r="16" fill="transparent" />
                    {/* Base Node Circle */}
                    <circle
                      r={r}
                      fill={isSelected ? activeAccent : meta.fill}
                      stroke={isDark ? '#0b0e17' : 'var(--surface-card)'}
                      strokeWidth="2"
                    />
                    {/* City / Outlet Label */}
                    {!loc.minor && (
                      <text
                        x={loc.id === 'andheri' ? 0 : loc.x > 420 ? -(r + 7) : r + 7}
                        y={loc.id === 'andheri' ? r + 13 : 4}
                        textAnchor={loc.id === 'andheri' ? 'middle' : loc.x > 420 ? 'end' : 'start'}
                        fontSize="10.5"
                        fontWeight={isSelected ? 700 : 500}
                        fill={isDark ? '#ffffff' : 'var(--ink-primary)'}
                        stroke={isDark ? '#0b0e17' : 'var(--map-land)'}
                        strokeWidth="3.2"
                        paintOrder="stroke"
                        strokeLinejoin="round"
                        style={{ fontFamily: 'var(--font-figtree)' }}
                      >
                        {loc.name}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>

            {/* Spatial Geographic Compass Indicator */}
            <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-line bg-card/85 px-2.5 py-1 text-[10.5px] font-mono text-ink-3 backdrop-blur-md dark:border-white/10 dark:bg-black/60 dark:text-white/60">
              <span className="live-dot size-1.5 rounded-full bg-brand dark:bg-[#38BDF8]" />
              <span>Location Signal: Synced</span>
            </div>
          </div>

          {/* ZONE 3 (Right): Real-Time Signal & Ask Ahana Operational Deck */}
          <div className="flex flex-col justify-between border-t border-line bg-card/90 p-4 lg:border-t-0 lg:border-l dark:border-white/[0.08] dark:bg-[#0B0E18]/90">
            <div>
              {/* Event Header */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-semibold',
                    currentScenario.eventBadgeColor === 'danger' && 'border-danger-border bg-danger-subtle text-danger',
                    currentScenario.eventBadgeColor === 'warning' && 'border-warning-border bg-warning-subtle text-warning',
                    currentScenario.eventBadgeColor === 'success' && 'border-success-border bg-success-subtle text-success',
                  )}
                >
                  {currentScenario.eventBadgeColor === 'danger' && <Flame className="size-2.5" />}
                  {currentScenario.eventBadgeColor === 'warning' && <ShieldAlert className="size-2.5" />}
                  {currentScenario.eventBadgeColor === 'success' && <TrendingUp className="size-2.5" />}
                  {currentScenario.eventBadge}
                </span>
                <span className="font-mono text-[10.5px] text-ink-3 dark:text-white/50">
                  {currentScenario.source}
                </span>
              </div>

              {/* Customer / Event Card */}
              <div className="mt-3 rounded-card border border-line bg-sunken/60 p-3 text-xs dark:border-white/10 dark:bg-white/[0.03]">
                {currentScenario.customer ? (
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-line bg-card text-[10px] font-bold text-ink dark:border-white/10 dark:bg-white/10 dark:text-white">
                        {currentScenario.customer.avatar}
                      </span>
                      <div>
                        <p className="text-[12px] font-semibold text-ink dark:text-white">
                          {currentScenario.customer.name}
                        </p>
                        <p className="text-[10px] text-ink-3 dark:text-white/50">{currentScenario.eventTime}</p>
                      </div>
                    </div>
                    <Stars rating={currentScenario.customer.rating} />
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 font-semibold text-warning">
                    <ShieldAlert className="size-3.5" />
                    <span>Google Maps Sync Anomaly</span>
                  </div>
                )}
                <p className="mt-2 text-[12px] leading-snug text-ink-2 dark:text-white/80">
                  {currentScenario.description}
                </p>
              </div>

              {/* Ask Ahana Conversational Intelligence Resolution Card */}
              <div className="mt-3.5 rounded-card border border-brand/30 bg-gradient-to-br from-raised via-card to-brand-subtle/40 p-3.5 shadow-sm dark:border-[#38BDF8]/40 dark:bg-gradient-to-br dark:from-[#0F1424]/95 dark:via-[#0A0E1A]/95 dark:to-[#131B33]/95">
                <div className="flex items-center justify-between gap-2">
                  <p className="flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-brand dark:text-[#38BDF8]">
                    <Sparkles aria-hidden="true" className="size-3 text-brand dark:text-[#38BDF8]" />
                    Ask Ahana · Intelligence
                  </p>
                  <span className="rounded-full bg-brand-subtle border border-brand/20 px-2 py-0.5 font-mono text-[9.5px] font-semibold text-brand dark:bg-[#38BDF8]/15 dark:border-[#38BDF8]/30 dark:text-[#38BDF8]">
                    {currentScenario.locationName}
                  </span>
                </div>

                <p className="mt-2 text-[12px] font-medium leading-relaxed text-ink dark:text-white/90">
                  {currentScenario.insight}
                </p>

                {/* 1-Click Interactive Action Button */}
                <div className="mt-3 border-t border-line/70 pt-2.5 dark:border-white/10">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10.5px] font-mono text-ink-3 dark:text-white/50">Next Action:</span>
                    <button
                      type="button"
                      onClick={() => setActionDone(true)}
                      className={cn(
                        'group inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all active:scale-[0.98]',
                        actionDone
                          ? 'border-success-border bg-success-subtle text-success'
                          : 'border-brand/40 bg-brand-subtle text-brand-ink hover:bg-brand-subtle/80 dark:border-[#38BDF8]/40 dark:bg-[#38BDF8]/15 dark:text-white dark:hover:bg-[#38BDF8]/25',
                      )}
                    >
                      {actionDone ? (
                        <>
                          <Check aria-hidden="true" className="size-3 text-success" />
                          <span>{currentScenario.actionSuccessText}</span>
                        </>
                      ) : (
                        <>
                          <span>{currentScenario.suggestedAction}</span>
                          <ChevronRight
                            aria-hidden="true"
                            className="size-3 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-ink dark:text-white/50 dark:group-hover:text-white"
                          />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Ticker */}
            <div className="mt-3.5 border-t border-line pt-2.5 text-[11px] text-ink-3 dark:border-white/10 dark:text-white/50">
              <span className="flex items-center justify-between">
                <span>Action Resolution Status:</span>
                <span className={cn('font-semibold', actionDone ? 'text-success' : 'text-brand dark:text-[#38BDF8]')}>
                  {actionDone ? 'Resolved ✓' : 'Awaiting Approval'}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Workspace Telemetry & Operational Scenario Dock */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-sunken/90 px-4 py-2.5 dark:border-white/[0.09] dark:bg-[#0A0D16]/95">
          {/* Scenario Selector Pills */}
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Location Atlas Scenarios">
            {ATLAS_SCENARIOS.map((s, i) => {
              const isActive = i === index
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectScenario(i)}
                  aria-label={`View scenario: ${s.locationName} (${s.pillar})`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative flex h-7.5 items-center gap-1.5 overflow-hidden rounded-full border px-3 text-xs font-medium transition-[background-color,border-color,color,box-shadow]',
                    isActive
                      ? 'border-brand/40 bg-brand-subtle text-brand-ink font-semibold shadow-sm dark:border-[#38BDF8]/50 dark:bg-[#38BDF8]/15 dark:text-white dark:shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                      : 'border-line bg-card text-ink-2 hover:bg-hover hover:text-ink dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60 dark:hover:bg-white/[0.08] dark:hover:text-white',
                  )}
                >
                  <span
                    className={cn(
                      'size-1.5 rounded-full shrink-0',
                      s.status === 'healthy' ? 'bg-success' : 'bg-warning',
                    )}
                    aria-hidden="true"
                  />
                  <span>0{i + 1} · {s.locationName}</span>
                  <span className="hidden sm:inline font-mono text-[10px] opacity-70">({s.pillar})</span>
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

          {/* Telemetry Summary & Pause/Play Control */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex font-mono text-[11px] text-ink-3 dark:text-white/45">
              {userPaused ? 'Manual control active' : 'Live location signal stream'}
            </span>
            {!reduced && (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? 'Resume live atlas signal stream' : 'Pause live atlas signal stream'}
                className="inline-flex size-7 items-center justify-center rounded-full border border-line bg-card text-ink-2 transition-colors hover:bg-hover hover:text-ink dark:border-white/15 dark:bg-white/[0.05] dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {userPaused ? (
                  <Play aria-hidden="true" className="size-3 text-ink dark:text-white" />
                ) : (
                  <Pause aria-hidden="true" className="size-3 text-ink dark:text-white" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
