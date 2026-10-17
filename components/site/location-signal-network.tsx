'use client'

import React, { useState } from 'react'
import { Check, ShieldAlert, Store, Zap, Radio, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StorefrontNode {
  id: string
  name: string
  code: string
  x: number
  y: number
  stat: string
  status: 'active' | 'synced' | 'signal'
}

const STOREFRONT_NODES: StorefrontNode[] = [
  { id: 'bandra', name: 'Bandra West', code: 'BOM-01', x: 100, y: 90, stat: '4.8★ · High footfall', status: 'signal' },
  { id: 'bkc', name: 'BKC Central', code: 'BOM-02', x: 350, y: 75, stat: '4.9★ · 98% Profile Health', status: 'synced' },
  { id: 'lower-parel', name: 'Lower Parel', code: 'BOM-03', x: 80, y: 195, stat: '4.7★ · Fast triage', status: 'synced' },
  { id: 'andheri', name: 'Andheri East', code: 'BOM-04', x: 380, y: 170, stat: '4.6★ · Menu sync OK', status: 'synced' },
  { id: 'powai', name: 'Powai High St', code: 'BOM-05', x: 365, y: 265, stat: '4.9★ · Synapse linked', status: 'synced' },
  { id: 'juhu', name: 'Juhu Tara', code: 'BOM-06', x: 115, y: 275, stat: '4.8★ · 12 reviews triaged', status: 'synced' },
  { id: 'colaba', name: 'Colaba Causeway', code: 'BOM-07', x: 230, y: 290, stat: '4.7★ · Catchment +14%', status: 'synced' },
]

export function LocationSignalNetwork({ className }: { className?: string }) {
  const [hoveredNode, setHoveredNode] = useState<StorefrontNode | null>(null)

  return (
    <div
      className={cn(
        'group relative w-full max-w-[460px] xl:max-w-[490px] select-none',
        'rounded-2xl border border-line-default/80 dark:border-white/10',
        'bg-card/90 dark:bg-[#131418]/90 backdrop-blur-md',
        'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]',
        'dark:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.07)]',
        'transition-all duration-300 overflow-hidden',
        className,
      )}
      aria-label="What The Local Location Signal Network Visualization"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,rgba(37,99,235,0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_50%_45%,rgba(56,189,248,0.12)_0%,transparent_70%)]"
      />

      {/* Subtle geospatial crosshair watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 0.75px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between border-b border-line-default/70 dark:border-white/[0.08] px-4 py-2.5 font-mono text-[10.5px]">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 dark:bg-emerald-400" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-semibold tracking-[0.14em] uppercase text-ink dark:text-white/90">
            LOCATION SIGNAL NETWORK
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-ink-3 dark:text-white/45">
          <span className="inline-block size-1.5 rounded-full bg-brand dark:bg-[#38BDF8]" />
          <span>7 NODES CONNECTED</span>
        </div>
      </div>

      {/* Interactive & Animated Visual Area */}
      <div className="relative aspect-[460/320] w-full">
        {/* SVG Network Canvas */}
        <svg
          viewBox="0 0 460 320"
          className="size-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Dark & Light Gradient Defs */}
            <linearGradient id="signalGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="signalGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
              <stop offset="50%" stopColor="#2563EB" stopOpacity="1" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="hubBeaconGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#2563EB" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </radialGradient>

            <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Precision Concentric Radar Guides around Central Hub */}
          <circle
            cx="230"
            cy="160"
            r="85"
            className="stroke-line-default/60 dark:stroke-white/[0.04]"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
          <circle
            cx="230"
            cy="160"
            r="145"
            className="stroke-line-default/40 dark:stroke-white/[0.025]"
            strokeWidth="0.75"
            strokeDasharray="2 8"
          />

          {/* Secondary Constellation Paths (Storefront-to-Storefront Mesh) */}
          <g className="stroke-line-default/60 dark:stroke-white/[0.06] transition-colors" strokeWidth="1" strokeDasharray="2 4">
            <path d="M 100 90 C 190 60, 270 55, 350 75" />
            <path d="M 100 90 C 85 125, 80 160, 80 195" />
            <path d="M 80 195 C 85 230, 95 255, 115 275" />
            <path d="M 115 275 C 150 295, 190 295, 230 290" />
            <path d="M 350 75 C 370 105, 380 135, 380 170" />
            <path d="M 380 170 C 380 205, 375 235, 365 265" />
            <path d="M 365 265 C 330 290, 280 295, 230 290" />
          </g>

          {/* Primary Connecting Spoke Paths (Storefronts -> Central Hub) */}
          <g className="stroke-line-strong/80 dark:stroke-white/[0.12] transition-colors" strokeWidth="1.25">
            {/* Bandra West -> Hub (Signal Path 1) */}
            <path id="path-bandra-hub" d="M 100 90 C 145 105, 185 135, 230 160" />
            {/* BKC -> Hub */}
            <path d="M 350 75 C 315 105, 275 135, 230 160" />
            {/* Lower Parel -> Hub */}
            <path d="M 80 195 C 125 190, 180 175, 230 160" />
            {/* Andheri East -> Hub */}
            <path d="M 380 170 C 335 170, 285 165, 230 160" />
            {/* Powai -> Hub (Signal Path 2) */}
            <path id="path-powai-hub" d="M 365 265 C 325 235, 280 195, 230 160" />
            {/* Juhu -> Hub */}
            <path d="M 115 275 C 150 245, 190 205, 230 160" />
            {/* Colaba -> Hub */}
            <path d="M 230 290 C 230 250, 230 205, 230 160" />
          </g>

          {/* ANIMATED SIGNAL 1: Travelling from Bandra West into Central Hub */}
          <path
            d="M 100 90 C 145 105, 185 135, 230 160"
            className="signal-trace-1 stroke-brand dark:stroke-[#38BDF8]"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* ANIMATED SIGNAL 2: Routed out from Central Hub to Powai / Synapse Resolver */}
          <path
            d="M 230 160 C 280 195, 325 235, 365 265"
            className="signal-trace-2 stroke-brand dark:stroke-[#38BDF8]"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Active Bandra Location Halo (Restrained expanding beacon ring) */}
          <circle
            cx="100"
            cy="90"
            className="halo-pulse stroke-brand/60 dark:stroke-[#38BDF8]/70"
            fill="none"
            strokeWidth="1.5"
          />

          {/* Central Hub Reactive Halo (Illuminates when signal arrives) */}
          <circle
            cx="230"
            cy="160"
            className="hub-glow-ring stroke-brand/50 dark:stroke-[#38BDF8]/60"
            fill="none"
            strokeWidth="2"
          />

          {/* Central Hub Storefront Anchor */}
          <g transform="translate(230, 160)">
            {/* Subtle beacon fill */}
            <circle r="22" fill="url(#hubBeaconGlow)" className="opacity-70 dark:opacity-90" />
            {/* Outer ring with tick marks */}
            <circle
              r="17"
              className="stroke-brand/40 dark:stroke-[#38BDF8]/40 fill-card dark:fill-[#1E2028]"
              strokeWidth="1.5"
            />
            {/* Inner core badge */}
            <circle
              r="9"
              className="fill-brand-ink text-white dark:fill-white dark:text-black"
            />
            {/* Micro Storefront Glyph */}
            <path
              d="M -4 -2 L 4 -2 L 4 3 L -4 3 Z M -5 -2 L -4 -4 L 4 -4 L 5 -2 Z M -1 0 L 1 0 L 1 3 L -1 3 Z"
              className="fill-white dark:fill-black"
            />
            {/* Central Hub Micro-Label */}
            <text
              y="28"
              textAnchor="middle"
              className="fill-ink-2 font-mono text-[8.5px] font-semibold uppercase tracking-[0.18em] dark:fill-white/70"
            >
              WTL CORE HUB
            </text>
          </g>

          {/* Storefront Nodes (Asymmetric distribution) */}
          {STOREFRONT_NODES.map((node) => {
            const isSignalNode = node.id === 'bandra'
            const isHovered = hoveredNode?.id === node.id

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer group/node"
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Hit area for easy mouse hover */}
                <circle r="16" fill="transparent" />

                {/* Resting Node Outer Ring */}
                <circle
                  r={isHovered ? '7' : '5'}
                  className={cn(
                    'transition-all duration-200 stroke-line-strong dark:stroke-white/20',
                    isSignalNode
                      ? 'stroke-brand dark:stroke-[#38BDF8]'
                      : 'hover:stroke-brand dark:hover:stroke-[#38BDF8]',
                    isHovered ? 'fill-brand text-white dark:fill-[#38BDF8]' : 'fill-card dark:fill-[#1E2028]',
                  )}
                  strokeWidth="1.5"
                />

                {/* Inner Core Dot */}
                <circle
                  r="2.5"
                  className={cn(
                    'transition-colors',
                    isSignalNode
                      ? 'fill-brand dark:fill-[#38BDF8]'
                      : isHovered
                        ? 'fill-white dark:fill-black'
                        : 'fill-ink-3 dark:fill-white/60',
                  )}
                />

                {/* Micro Node Code Label */}
                <text
                  x="0"
                  y="14"
                  textAnchor="middle"
                  className={cn(
                    'font-mono text-[8px] font-medium tracking-wider transition-colors',
                    isSignalNode
                      ? 'fill-brand dark:fill-[#38BDF8] font-semibold'
                      : isHovered
                        ? 'fill-ink dark:fill-white font-semibold'
                        : 'fill-ink-3/80 dark:fill-white/40',
                  )}
                >
                  {node.name.split(' ')[0]}
                </text>
              </g>
            )
          })}
        </svg>

        {/* ELEGANT ANIMATED EVENT BADGE (Anchored near Bandra West at x:100, y:90) */}
        <div
          className="event-badge-anim pointer-events-none absolute left-[30px] sm:left-[35px] top-[14px] sm:top-[18px] z-20"
          aria-live="polite"
        >
          {/* Phase 1: Detection State (Hours Drift Alert) */}
          <div className="event-phase-detect flex items-center gap-2 rounded-lg border border-amber-500/30 bg-card/95 dark:bg-[#1A1816]/95 px-2.5 py-1.5 shadow-raised backdrop-blur-md">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-amber-500" />
            </span>
            <div className="flex flex-col font-mono text-[10px] leading-tight">
              <span className="font-semibold text-amber-700 dark:text-amber-400">
                Signal: Profile hours drift
              </span>
              <span className="text-[9px] text-ink-3 dark:text-white/60">
                Bandra West · Maps mismatch
              </span>
            </div>
          </div>

          {/* Phase 2: Synapse Resolution State (Auto-synced across channels) */}
          <div className="event-phase-resolve flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-card/95 dark:bg-[#121B16]/95 px-2.5 py-1.5 shadow-raised backdrop-blur-md">
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Check className="size-2.5 stroke-[2.5]" />
            </span>
            <div className="flex flex-col font-mono text-[10px] leading-tight">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                Synapse: Auto-synced
              </span>
              <span className="text-[9px] text-ink-3 dark:text-white/60">
                Google & Apple profiles aligned
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Hover Tooltip for any node */}
        {hoveredNode && (
          <div
            className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full rounded-md border border-line-default bg-card/95 px-2.5 py-1 font-mono text-[10px] text-ink shadow-raised backdrop-blur-md dark:border-white/20 dark:bg-black/90 dark:text-white"
            style={{
              left: `${(hoveredNode.x / 460) * 100}%`,
              top: `${(hoveredNode.y / 320) * 100 - 8}%`,
            }}
          >
            <div className="font-semibold">{hoveredNode.name} ({hoveredNode.code})</div>
            <div className="text-[9px] text-ink-3 dark:text-white/60">{hoveredNode.stat}</div>
          </div>
        )}
      </div>

      {/* Bottom Platform Signal Workflow Pipeline Bar */}
      <div className="border-t border-line-default/70 dark:border-white/[0.08] bg-surface-sunken/40 dark:bg-white/[0.02] px-4 py-2 font-mono text-[10px]">
        <div className="flex items-center justify-between text-ink-3 dark:text-white/50">
          <span className="flex items-center gap-1.5 font-semibold text-ink dark:text-white/80">
            <Radio className="size-3 text-brand dark:text-[#38BDF8]" />
            <span>SIGNAL WORKFLOW:</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="workflow-step-1 font-medium text-ink-2 dark:text-white/70">1. Detect</span>
            <span className="opacity-30">→</span>
            <span className="workflow-step-2 font-medium text-ink-2 dark:text-white/70">2. Synapse Route</span>
            <span className="opacity-30">→</span>
            <span className="workflow-step-3 font-medium text-ink-2 dark:text-white/70">3. Synced</span>
          </div>
        </div>
      </div>

      {/* Scoped CSS Keyframes for the 8.5s Calm, Polished Choreography */}
      <style jsx>{`
        /* Signal 1: Bandra West -> Central Hub */
        .signal-trace-1 {
          stroke-dasharray: 28 200;
          animation: signalTravelOne 8.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        /* Signal 2: Central Hub -> Powai / Synapse Resolution */
        .signal-trace-2 {
          stroke-dasharray: 28 200;
          animation: signalTravelTwo 8.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        /* Restrained expanding beacon ring around active node */
        .halo-pulse {
          transform-origin: 100px 90px;
          animation: nodeHaloPulse 8.5s ease-out infinite;
        }

        /* Central Hub luminous glow ripple */
        .hub-glow-ring {
          transform-origin: 230px 160px;
          animation: hubRingGlow 8.5s ease-out infinite;
        }

        /* Event Badge Container Animation */
        .event-badge-anim {
          animation: badgeContainerAnim 8.5s ease-in-out infinite;
        }

        /* Event Phase 1: Detection State */
        .event-phase-detect {
          animation: phaseDetectAnim 8.5s ease-in-out infinite;
        }

        /* Event Phase 2: Resolution State */
        .event-phase-resolve {
          position: absolute;
          inset: 0;
          animation: phaseResolveAnim 8.5s ease-in-out infinite;
        }

        /* Pipeline Workflow Step Highlights */
        .workflow-step-1 {
          animation: stepOneHighlight 8.5s ease infinite;
        }
        .workflow-step-2 {
          animation: stepTwoHighlight 8.5s ease infinite;
        }
        .workflow-step-3 {
          animation: stepThreeHighlight 8.5s ease infinite;
        }

        /* Keyframes for Signal 1 */
        @keyframes signalTravelOne {
          0%, 18% {
            stroke-dashoffset: 220;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          38% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          42% {
            stroke-dashoffset: -20;
            opacity: 0;
          }
          43%, 100% {
            stroke-dashoffset: 220;
            opacity: 0;
          }
        }

        /* Keyframes for Signal 2 */
        @keyframes signalTravelTwo {
          0%, 42% {
            stroke-dashoffset: 220;
            opacity: 0;
          }
          44% {
            opacity: 1;
          }
          62% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          66% {
            stroke-dashoffset: -20;
            opacity: 0;
          }
          67%, 100% {
            stroke-dashoffset: 220;
            opacity: 0;
          }
        }

        /* Expanding Halo on Bandra West Node */
        @keyframes nodeHaloPulse {
          0%, 15% {
            r: 5px;
            opacity: 0;
          }
          17% {
            opacity: 0.85;
            r: 5px;
          }
          32% {
            opacity: 0;
            r: 22px;
          }
          33%, 100% {
            opacity: 0;
            r: 5px;
          }
        }

        /* Hub Ring Glow */
        @keyframes hubRingGlow {
          0%, 36% {
            r: 17px;
            opacity: 0;
          }
          38% {
            opacity: 0.9;
            r: 17px;
          }
          52% {
            opacity: 0;
            r: 34px;
          }
          53%, 100% {
            opacity: 0;
            r: 17px;
          }
        }

        /* Badge Container Entrance & Exit */
        @keyframes badgeContainerAnim {
          0%, 16% {
            opacity: 0;
            transform: translateY(4px) scale(0.96);
          }
          20% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          72% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          76%, 100% {
            opacity: 0;
            transform: translateY(-4px) scale(0.96);
          }
        }

        /* Detection Alert Display */
        @keyframes phaseDetectAnim {
          0%, 18% {
            opacity: 0;
            pointer-events: none;
          }
          20%, 42% {
            opacity: 1;
            pointer-events: auto;
          }
          45%, 100% {
            opacity: 0;
            pointer-events: none;
          }
        }

        /* Resolution Alert Display */
        @keyframes phaseResolveAnim {
          0%, 44% {
            opacity: 0;
            pointer-events: none;
          }
          47%, 72% {
            opacity: 1;
            pointer-events: auto;
          }
          75%, 100% {
            opacity: 0;
            pointer-events: none;
          }
        }

        /* Step 1 highlight */
        @keyframes stepOneHighlight {
          0%, 15% { color: inherit; }
          18%, 38% { color: var(--warning-solid, #f59e0b); font-weight: 700; }
          42%, 100% { color: inherit; }
        }

        /* Step 2 highlight */
        @keyframes stepTwoHighlight {
          0%, 38% { color: inherit; }
          42%, 58% { color: var(--brand-primary, #38bdf8); font-weight: 700; }
          62%, 100% { color: inherit; }
        }

        /* Step 3 highlight */
        @keyframes stepThreeHighlight {
          0%, 58% { color: inherit; }
          62%, 75% { color: var(--success-solid, #10b981); font-weight: 700; }
          78%, 100% { color: inherit; }
        }

        /* Prefers-reduced-motion: disable all active loops */
        @media (prefers-reduced-motion: reduce) {
          .signal-trace-1,
          .signal-trace-2,
          .halo-pulse,
          .hub-glow-ring,
          .event-badge-anim,
          .event-phase-detect,
          .event-phase-resolve,
          .workflow-step-1,
          .workflow-step-2,
          .workflow-step-3 {
            animation: none !important;
          }
          .event-badge-anim {
            opacity: 1 !important;
            transform: none !important;
          }
          .event-phase-detect {
            display: none !important;
          }
          .event-phase-resolve {
            position: static !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  )
}
