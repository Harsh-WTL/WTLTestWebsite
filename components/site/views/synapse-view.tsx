'use client'

import { useId, useState } from 'react'
import { Users, TrendingUp, Navigation } from 'lucide-react'
import { cn } from '@/lib/utils'
import { locationById, sampleCampaigns } from '@/lib/sample-data'
import { LocationMap } from '../location-map'

export function SynapseView() {
  const [selectedId, setSelectedId] = useState(sampleCampaigns[0].id)
  const [radii, setRadii] = useState<Record<string, number>>(() =>
    Object.fromEntries(sampleCampaigns.map((c) => [c.id, c.radiusKm])),
  )
  const sliderId = useId()

  const campaign = sampleCampaigns.find((c) => c.id === selectedId) ?? sampleCampaigns[0]
  const loc = locationById(campaign.locationId)
  const radius = radii[campaign.id]

  // Dynamic catchment estimation based on radius
  const estimatedHouseholds = Math.round(Math.PI * Math.pow(radius, 2) * 5200).toLocaleString()
  const estimatedDailyFootfall = Math.round(Math.PI * Math.pow(radius, 1.6) * 2400).toLocaleString()

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="relative aspect-[600/380] border-b border-line bg-sunken lg:aspect-auto lg:min-h-[460px] lg:border-b-0 lg:border-r">
        <LocationMap
          label={`Sample map showing a ${radius} km targeting radius around ${loc.name}.`}
          selectedId={loc.id}
          radius={{ locationId: loc.id, km: radius }}
          showLabels
        />
        <div className="absolute left-3 top-3 rounded-ctl border border-line bg-card/95 p-3 shadow-card backdrop-blur-md">
          <p className="text-[11px] font-mono text-ink-3">{campaign.type}</p>
          <p className="text-[13px] font-semibold text-ink">
            {loc.name} · <span className="tnum text-brand">{radius} km</span> catchment
          </p>
          <div className="mt-2 flex items-center gap-3 border-t border-line/60 pt-2 text-[11px] text-ink-2">
            <span className="inline-flex items-center gap-1">
              <Users className="size-3 text-brand" /> {estimatedHouseholds} homes
            </span>
            <span className="inline-flex items-center gap-1">
              <Navigation className="size-3 text-success" /> ~{estimatedDailyFootfall} reach
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="p-3 border-b border-line bg-sunken/40">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-3">Local Ad Campaigns</p>
        </div>

        <ul className="p-2 space-y-1 overflow-y-auto max-h-[220px] lg:max-h-none flex-1" aria-label="Sample local campaigns">
          {sampleCampaigns.map((c) => {
            const l = locationById(c.locationId)
            const active = c.id === campaign.id
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  aria-current={active ? 'true' : undefined}
                  className={cn('w-full rounded-ctl p-2.5 text-left transition-colors', active ? 'bg-selected shadow-sm' : 'hover:bg-hover')}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] font-semibold text-ink">{l.name}</span>
                    <span
                      className={cn(
                        'rounded-full border px-2 py-0.5 text-[11px] font-semibold',
                        c.status === 'Active'
                          ? 'border-success-border bg-success-subtle text-success'
                          : 'border-line bg-sunken text-ink-3',
                      )}
                    >
                      {c.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-ink-3">{c.type}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-sunken" aria-hidden="true">
                      <span
                        className="block h-full rounded-full bg-brand transition-[width] duration-700"
                        style={{ width: `${c.pacing}%` }}
                      />
                    </span>
                    <span className="tnum w-20 text-right text-[11px] text-ink-3">
                      {c.status === 'Draft' ? 'Not started' : `${c.pacing}% budget`}
                    </span>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-auto border-t border-line p-4 bg-card">
          <div className="flex items-center justify-between">
            <label htmlFor={sliderId} className="text-[13px] font-semibold text-ink">
              Targeting radius
            </label>
            <output htmlFor={sliderId} className="tnum text-[13px] font-bold text-brand">
              {radius} km
            </output>
          </div>
          <input
            id={sliderId}
            type="range"
            min={1}
            max={6}
            step={0.5}
            value={radius}
            onChange={(e) => setRadii((r) => ({ ...r, [campaign.id]: Number(e.target.value) }))}
            className="mt-3 w-full accent-[var(--brand-primary)]"
          />

          <div className="mt-3 rounded-ctl border border-line bg-sunken/60 p-2.5 text-[11px] leading-relaxed text-ink-2">
            <div className="flex items-center justify-between font-semibold text-ink">
              <span>Catchment Projection</span>
              <span className="inline-flex items-center gap-0.5 text-brand">
                <TrendingUp className="size-3" /> Auto-routed
              </span>
            </div>
            <p className="mt-1">
              {campaign.type === 'Meta Lead Ads'
                ? `Leads within ${radius} km route straight to ${loc.name}'s sales counter. ${campaign.leads ? `${campaign.leads} routed this week.` : ''}`
                : `PMax spend stays strictly inside the ${radius} km radius customers will actually travel from.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
