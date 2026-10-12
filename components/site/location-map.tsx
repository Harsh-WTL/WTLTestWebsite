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
  onSelect?: (id: string) => void
  radius?: { locationId: string; km: number } | null
  showLabels?: boolean
  animateIn?: boolean
}

export function LocationMap({
  className,
  label,
  locations = sampleLocations,
  selectedId,
  pulseId,
  onSelect,
  radius,
  showLabels = true,
  animateIn = false,
}: Props) {
  const uid = useId().replace(/:/g, '')
  const radiusLoc = radius ? locations.find((l) => l.id === radius.locationId) : null

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
          <circle cx="1.5" cy="1.5" r="0.9" fill="var(--viz-grid)" />
        </pattern>
        <clipPath id={`land-${uid}`}>
          <rect width="600" height="380" />
        </clipPath>
      </defs>

      <g aria-hidden="true">
        <rect width="600" height="380" fill="var(--map-land)" />
        <rect width="600" height="380" fill={`url(#dots-${uid})`} />
        <path
          d="M0 0H178C162 52 190 98 176 150C164 198 196 238 190 292C186 334 214 352 210 380H0Z"
          fill="var(--map-water)"
        />
        <path
          d="M452 380C446 330 470 300 458 250C448 206 466 170 452 128C442 96 452 62 438 0"
          fill="none"
          stroke="var(--map-water)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <g fill="none" stroke="var(--map-road)" strokeLinecap="round">
          <path d="M228 380C232 300 214 230 238 160C258 104 282 60 300 0" strokeWidth="3.5" />
          <path d="M300 380C318 300 360 250 398 200C430 160 470 110 500 0" strokeWidth="3.5" />
          <path d="M190 210C260 196 330 172 420 186C480 196 540 240 600 250" strokeWidth="2.5" />
          <path d="M214 142C280 136 350 120 410 128" strokeWidth="2" />
          <path d="M240 290C300 270 350 250 400 240C450 232 500 250 540 270" strokeWidth="2" />
          <path d="M262 84C320 70 400 64 488 58" strokeWidth="2" />
        </g>
      </g>

      {radiusLoc && radius ? (
        <g aria-hidden="true">
          <circle
            cx={radiusLoc.x}
            cy={radiusLoc.y}
            r={radius.km * PX_PER_KM}
            fill="color-mix(in oklch, var(--viz-1) 12%, transparent)"
            stroke="var(--viz-1)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="transition-[r] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"
          />
        </g>
      ) : null}

      {locations.map((loc, i) => {
        const meta = statusMeta[loc.status]
        const isSelected = selectedId === loc.id
        const isPulse = pulseId === loc.id
        const r = loc.minor ? 4.5 : 6
        const interactive = Boolean(onSelect)
        const markerLabel = `${loc.name}, ${meta.label}, rated ${loc.rating}${isSelected ? ', selected' : ''}`
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
                <circle r={r + 2} fill="none" stroke={meta.fill} strokeWidth="2" className="pulse-ring" />
              ) : null}
              <circle
                className="focus-ring opacity-0 transition-opacity"
                r={r + 7}
                fill="none"
                stroke="var(--line-focus)"
                strokeWidth="2"
              />
              <circle
                r={r + 5}
                fill="none"
                stroke="var(--brand-primary)"
                strokeWidth="2"
                className={cn('transition-opacity duration-200', isSelected ? 'opacity-100' : 'opacity-0')}
              />
              {interactive ? <circle r="16" fill="transparent" /> : null}
              <circle r={r} fill={meta.fill} stroke="var(--surface-card)" strokeWidth="2" />
              {showLabels && !loc.minor ? (
                <text
                  x={loc.id === 'andheri' ? 0 : loc.x > 420 ? -(r + 8) : r + 8}
                  y={loc.id === 'andheri' ? r + 14 : 4}
                  textAnchor={loc.id === 'andheri' ? 'middle' : loc.x > 420 ? 'end' : 'start'}
                  fontSize="11"
                  fontWeight={isSelected ? 700 : 600}
                  fill="var(--ink-primary)"
                  stroke="var(--map-land)"
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
