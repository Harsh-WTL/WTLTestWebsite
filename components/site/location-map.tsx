'use client'

import { useId } from 'react'
import { cn } from '@/lib/utils'
import { sampleLocations, statusMeta, type SampleLocation } from '@/lib/sample-data'

const PX_PER_KM = 14

type Props = {
  className?: string
  label: string
  locations?: SampleLocation[]
  selectedId?: string | null
  pulseId?: string | null
  signalPath?: { fromId: string; toX: number; toY: number } | null
  onSelect?: (id: string) => void
  radius?: { locationId: string; km: number } | null
  showLabels?: boolean
  animateIn?: boolean
  darkCanvas?: boolean
}

export function LocationMap({
  className,
  label,
  locations = sampleLocations,
  selectedId,
  pulseId,
  signalPath,
  onSelect,
  radius,
  showLabels = true,
  animateIn = false,
  darkCanvas = false,
}: Props) {
  const uid = useId().replace(/:/g, '')
  const radiusLoc = radius ? locations.find((l) => l.id === radius.locationId) : null

  // Cartographic tone values
  const fillLand = darkCanvas ? '#0b0e17' : 'var(--map-land)'
  const fillWater = darkCanvas ? '#040508' : 'var(--map-water)'
  const strokeRoad = darkCanvas ? '#1b2336' : 'var(--map-road)'
  const fillDots = darkCanvas ? '#1c2438' : 'var(--viz-grid)'
  const textFill = darkCanvas ? '#ffffff' : 'var(--ink-primary)'
  const textStroke = darkCanvas ? '#0b0e17' : 'var(--map-land)'

  return (
    <svg
      viewBox="0 0 600 380"
      role="group"
      aria-label={label}
      className={cn('block h-full w-full select-none', className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={`dots-${uid}`} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.9" fill={fillDots} />
        </pattern>
        <clipPath id={`land-${uid}`}>
          <rect width="600" height="380" />
        </clipPath>
      </defs>

      <g aria-hidden="true">
        <rect width="600" height="380" fill={fillLand} />
        <rect width="600" height="380" fill={`url(#dots-${uid})`} />
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
        <g fill="none" stroke={strokeRoad} strokeLinecap="round">
          <path d="M228 380C232 300 214 230 238 160C258 104 282 60 300 0" strokeWidth="3.5" />
          <path d="M300 380C318 300 360 250 398 200C430 160 470 110 500 0" strokeWidth="3.5" />
          <path d="M190 210C260 196 330 172 420 186C480 196 540 240 600 250" strokeWidth="2.5" />
          <path d="M214 142C280 136 350 120 410 128" strokeWidth="2" />
          <path d="M240 290C300 270 350 250 400 240C450 232 500 250 540 270" strokeWidth="2" />
          <path d="M262 84C320 70 400 64 488 58" strokeWidth="2" />
        </g>
      </g>

      {/* Radius catchment if requested */}
      {radiusLoc && radius ? (
        <g aria-hidden="true">
          <circle
            cx={radiusLoc.x}
            cy={radiusLoc.y}
            r={radius.km * PX_PER_KM}
            fill={darkCanvas ? 'rgba(56, 189, 248, 0.15)' : 'color-mix(in oklch, var(--viz-1) 12%, transparent)'}
            stroke={darkCanvas ? '#38bdf8' : 'var(--viz-1)'}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="transition-[r] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"
          />
        </g>
      ) : null}

      {/* Location Signal Conduit Ray */}
      {signalPath && (() => {
        const source = locations.find((l) => l.id === signalPath.fromId)
        if (!source) return null
        const midX = source.x + (signalPath.toX - source.x) * 0.45
        const pathD = `M ${source.x} ${source.y} C ${midX} ${source.y}, ${midX} ${signalPath.toY}, ${signalPath.toX} ${signalPath.toY}`
        const conduitColor = darkCanvas ? '#38bdf8' : 'var(--brand-primary)'
        return (
          <g aria-hidden="true" className="signal-layer transition-opacity duration-300">
            {/* Luminous Glow Ray */}
            <path
              d={pathD}
              fill="none"
              stroke={darkCanvas ? 'rgba(56, 189, 248, 0.35)' : 'color-mix(in oklch, var(--brand-primary) 30%, transparent)'}
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Animated Dashed Stream */}
            <path
              d={pathD}
              fill="none"
              stroke={conduitColor}
              strokeWidth="2"
              className="signal-conduit"
              strokeLinecap="round"
            />
            <circle cx={signalPath.toX} cy={signalPath.toY} r="3.5" fill={conduitColor} />
          </g>
        )
      })()}

      {/* Location Markers */}
      {locations.map((loc, i) => {
        const meta = statusMeta[loc.status]
        const isSelected = selectedId === loc.id
        const isPulse = pulseId === loc.id
        const r = loc.minor ? 4.5 : 6
        const interactive = Boolean(onSelect)
        const markerLabel = `${loc.name}, ${meta.label}, rated ${loc.rating}${isSelected ? ', selected' : ''}`
        const activeAccent = darkCanvas ? '#38bdf8' : 'var(--brand-primary)'
        return (
          <g
            key={loc.id}
            transform={`translate(${loc.x} ${loc.y})`}
            {...(interactive
              ? {
                  role: 'button',
                  tabIndex: 0,
                  'aria-label': markerLabel,
                  'aria-pressed': isSelected,
                  onClick: () => onSelect?.(loc.id),
                  onKeyDown: (e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSelect?.(loc.id)
                    }
                  },
                  className: 'cursor-pointer outline-none [&:focus-visible>.focus-ring]:opacity-100',
                }
              : { 'aria-hidden': true })}
          >
            <g className={animateIn ? 'marker-pop' : undefined} style={animateIn ? { animationDelay: `${i * 45}ms` } : undefined}>
              {isPulse ? (
                <circle
                  r={r + 4}
                  fill="none"
                  stroke={isSelected ? activeAccent : meta.fill}
                  strokeWidth="2.5"
                  className="pulse-ring"
                />
              ) : null}
              <circle
                className="focus-ring opacity-0 transition-opacity"
                r={r + 8}
                fill="none"
                stroke={activeAccent}
                strokeWidth="2"
              />
              <circle
                r={r + 5.5}
                fill="none"
                stroke={activeAccent}
                strokeWidth="2"
                className={cn('transition-opacity duration-200', isSelected ? 'opacity-100' : 'opacity-0')}
              />
              {interactive ? <circle r="16" fill="transparent" /> : null}
              <circle
                r={r}
                fill={isSelected ? activeAccent : meta.fill}
                stroke={darkCanvas ? '#0b0e17' : 'var(--surface-card)'}
                strokeWidth="2"
              />
              {showLabels && !loc.minor ? (
                <text
                  x={loc.id === 'andheri' ? 0 : loc.x > 420 ? -(r + 8) : r + 8}
                  y={loc.id === 'andheri' ? r + 14 : 4}
                  textAnchor={loc.id === 'andheri' ? 'middle' : loc.x > 420 ? 'end' : 'start'}
                  fontSize="11"
                  fontWeight={isSelected ? 700 : 600}
                  fill={textFill}
                  stroke={textStroke}
                  strokeWidth="3.5"
                  paintOrder="stroke"
                  strokeLinejoin="round"
                  style={{ fontFamily: 'var(--font-figtree)' }}
                >
                  {loc.name}
                </text>
              ) : null}
            </g>
          </g>
        )
      })}
    </svg>
  )
}
