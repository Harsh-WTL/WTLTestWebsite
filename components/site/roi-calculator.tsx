'use client'

import { useState } from 'react'
import { Calculator, Clock, ShieldAlert, Sparkles, TrendingUp, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionHeading } from './primitives'
import { Reveal } from './reveal'
import { DemoButton } from './demo-dialog'

export function RoiCalculator() {
  const [locations, setLocations] = useState(25)
  const [monthlyReviewsPerStore, setMonthlyReviewsPerStore] = useState(20)

  // Calculations
  const totalReviews = locations * monthlyReviewsPerStore
  const hoursSavedPerMonth = Math.round(locations * 3.5 + totalReviews * 0.15)
  const driftIncidentsPrevented = Math.round(locations * 1.8)
  const estimatedFootfallIncrease = Math.round(locations * 180).toLocaleString()
  const estimatedRevenuePreserved = Math.round(locations * 45000).toLocaleString('en-IN')

  return (
    <section id="roi-calculator" aria-labelledby="roi-title" className="border-t border-line bg-card/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            id="roi-title"
            eyebrow="Interactive ROI Calculator"
            title="Calculate what unmanaged locations cost your brand."
            description="Adjust your outlet count to project time saved, revenue protected from profile drift, and local catchment growth."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Controls Box */}
          <div className="rounded-panel border border-line bg-card p-6 shadow-card lg:col-span-6 lg:p-8">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand">
              <Calculator className="size-4" />
              <span>Network Parameters</span>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-sm font-semibold">
                <label htmlFor="roi-locations" className="text-ink">
                  Total Active Outlets / Stores
                </label>
                <span className="font-mono text-base font-bold text-brand">{locations} stores</span>
              </div>
              <input
                id="roi-locations"
                type="range"
                min={5}
                max={200}
                step={5}
                value={locations}
                onChange={(e) => setLocations(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--brand-primary)]"
              />
              <div className="mt-1.5 flex justify-between text-[11px] font-mono text-ink-3">
                <span>5 locations</span>
                <span>50</span>
                <span>100</span>
                <span>200+</span>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between text-sm font-semibold">
                <label htmlFor="roi-reviews" className="text-ink">
                  Avg. Reviews per Store / Month
                </label>
                <span className="font-mono text-base font-bold text-brand">{monthlyReviewsPerStore} reviews</span>
              </div>
              <input
                id="roi-reviews"
                type="range"
                min={5}
                max={80}
                step={5}
                value={monthlyReviewsPerStore}
                onChange={(e) => setMonthlyReviewsPerStore(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--brand-primary)]"
              />
              <div className="mt-1.5 flex justify-between text-[11px] font-mono text-ink-3">
                <span>5 reviews</span>
                <span>25</span>
                <span>50</span>
                <span>80+</span>
              </div>
            </div>

            <div className="mt-8 rounded-ctl border border-line bg-sunken/60 p-4 text-xs text-ink-2 leading-relaxed">
              <p className="flex items-center gap-1.5 font-semibold text-ink">
                <Sparkles className="size-3.5 text-brand" />
                Continuous Autonomous Patrol
              </p>
              <p className="mt-1">
                Based on active data across {totalReviews.toLocaleString()} monthly customer interactions across your network.
              </p>
            </div>
          </div>

          {/* Results Display */}
          <div className="rounded-panel border border-brand-border/60 bg-gradient-to-br from-card via-card to-brand-subtle/30 p-6 shadow-raised lg:col-span-6 lg:p-8">
            <p className="text-xs font-mono uppercase tracking-wider text-ink-3">Estimated Monthly Impact</p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Projected ROI with What The Local
            </h3>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-ctl border border-line bg-card p-4 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-medium text-ink-3">
                  <Clock className="size-3.5 text-brand" />
                  <span>Manual Time Saved</span>
                </div>
                <div className="tnum mt-2 text-2xl font-bold text-ink">
                  {hoursSavedPerMonth} <span className="text-xs font-normal text-ink-3">hrs/mo</span>
                </div>
                <p className="mt-1 text-[11px] text-ink-3">Automated review replies & sync</p>
              </div>

              <div className="rounded-ctl border border-line bg-card p-4 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-medium text-ink-3">
                  <ShieldAlert className="size-3.5 text-warning" />
                  <span>Drifts Prevented</span>
                </div>
                <div className="tnum mt-2 text-2xl font-bold text-ink">
                  ~{driftIncidentsPrevented} <span className="text-xs font-normal text-ink-3">edits</span>
                </div>
                <p className="mt-1 text-[11px] text-ink-3">Rogue hours & phone changes caught</p>
              </div>

              <div className="rounded-ctl border border-line bg-card p-4 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-medium text-ink-3">
                  <TrendingUp className="size-3.5 text-success" />
                  <span>Extra Store Footfall</span>
                </div>
                <div className="tnum mt-2 text-2xl font-bold text-success">
                  +{estimatedFootfallIncrease} <span className="text-xs font-normal text-ink-3">visits/mo</span>
                </div>
                <p className="mt-1 text-[11px] text-ink-3">Via top-3 local map rank & PMax</p>
              </div>

              <div className="rounded-ctl border border-line bg-card p-4 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-medium text-ink-3">
                  <Users className="size-3.5 text-brand" />
                  <span>Revenue Preserved</span>
                </div>
                <div className="tnum mt-2 text-2xl font-bold text-brand">
                  ₹{estimatedRevenuePreserved}
                </div>
                <p className="mt-1 text-[11px] text-ink-3">Prevented closed-door dropoffs</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-line/60 pt-6">
              <div>
                <p className="text-xs font-semibold text-ink">Ready to audit your actual network?</p>
                <p className="text-[11px] text-ink-3">We run a live 24-hr scan on your store listings.</p>
              </div>
              <DemoButton size="md" withArrow>
                Run Free Store Audit
              </DemoButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
