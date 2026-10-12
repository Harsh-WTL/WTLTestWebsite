'use client'

import { useMemo, useState } from 'react'
import { Check, ShieldAlert, Undo2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { sampleLocations, statusMeta, type SampleLocation } from '@/lib/sample-data'
import { LocationMap } from '../location-map'
import { Stars, StatusBadge } from '../primitives'

type GuardState = 'pending' | 'reverted' | 'accepted'
type Filter = 'all' | 'attention'

export function LocationsView() {
  const [selectedId, setSelectedId] = useState('thane')
  const [filter, setFilter] = useState<Filter>('all')
  const [guard, setGuard] = useState<GuardState>('pending')

  const locations = useMemo<SampleLocation[]>(
    () =>
      sampleLocations.map((l) =>
        l.id === 'thane' && guard !== 'pending'
          ? { ...l, status: 'healthy', profile: 'Verified', note: guard === 'reverted' ? 'Saturday hours restored' : 'New Saturday hours confirmed' }
          : l,
      ),
    [guard],
  )
  const visible = filter === 'all' ? locations : locations.filter((l) => l.status !== 'healthy')
  const selected = locations.find((l) => l.id === selectedId) ?? locations[0]
  const attentionCount = locations.filter((l) => l.status !== 'healthy').length

  return (
    <div className="grid gap-0 lg:h-[560px] lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="relative aspect-[600/380] border-b border-line bg-sunken lg:aspect-auto lg:border-b-0 lg:border-r">
        <LocationMap
          label="Sample map of locations. Select a marker to view its details."
          locations={locations}
          selectedId={selected.id}
          onSelect={setSelectedId}
          showLabels
        />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5" aria-hidden="true">
          {(['healthy', 'attention', 'critical'] as const).map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-raised/90 px-2 py-1 text-[11px] font-medium text-ink-2">
              <span className={cn('size-2 rounded-full', statusMeta[s].dot)} />
              {statusMeta[s].label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="border-b border-line p-4" aria-live="polite">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-mono text-[11px] text-ink-3">{selected.code}</p>
              <h4 className="text-lg font-semibold tracking-[-0.015em]">{selected.name}</h4>
              <p className="text-[13px] text-ink-3">{selected.area}</p>
            </div>
            <StatusBadge status={selected.status} />
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-ctl bg-sunken px-2 py-2">
              <dt className="text-[11px] text-ink-3">Rating</dt>
              <dd className="tnum font-semibold">{selected.rating}</dd>
            </div>
            <div className="rounded-ctl bg-sunken px-2 py-2">
              <dt className="text-[11px] text-ink-3">Reviews</dt>
              <dd className="tnum font-semibold">{selected.reviews}</dd>
            </div>
            <div className="rounded-ctl bg-sunken px-2 py-2">
              <dt className="text-[11px] text-ink-3">Pending</dt>
              <dd className={cn('tnum font-semibold', selected.pending > 0 && 'text-danger')}>{selected.pending}</dd>
            </div>
          </dl>
          <p className="mt-3 text-[13px] text-ink-2">{selected.note}</p>

          {selected.id === 'thane' ? <ProfileGuard state={guard} onChange={setGuard} /> : null}
        </div>

        <div className="flex items-center gap-1 border-b border-line px-3 py-2" role="group" aria-label="Filter locations">
          {(
            [
              ['all', `All ${locations.length}`],
              ['attention', `Needs attention ${attentionCount}`],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={cn(
                'rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors',
                filter === value ? 'bg-brand-ink text-ink-inverse' : 'text-ink-2 hover:bg-hover',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <ul className="max-h-[220px] flex-1 overflow-y-auto p-1.5 lg:max-h-none" aria-label="Locations">
          {visible.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => setSelectedId(l.id)}
                aria-current={l.id === selected.id ? 'true' : undefined}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-ctl px-2.5 py-2 text-left transition-colors',
                  l.id === selected.id ? 'bg-selected' : 'hover:bg-hover',
                )}
              >
                <span aria-hidden="true" className={cn('size-2 shrink-0 rounded-full', statusMeta[l.status].dot)} />
                <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{l.name}</span>
                <span aria-hidden="true" className="hidden sm:inline-flex">
                  <Stars rating={Math.round(l.rating)} />
                </span>
                <span className="tnum w-7 text-right text-[12px] text-ink-3">
                  <span className="sr-only">rated </span>
                  {l.rating}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ProfileGuard({ state, onChange }: { state: GuardState; onChange: (s: GuardState) => void }) {
  if (state !== 'pending') {
    return (
      <div className="mt-3 flex items-center justify-between gap-2 rounded-ctl border border-success-border bg-success-subtle p-3 text-[13px]">
        <span className="flex items-center gap-1.5 font-semibold text-success">
          <Check aria-hidden="true" className="size-4" />
          {state === 'reverted' ? 'Edit reverted' : 'Edit accepted'}
        </span>
        <button type="button" onClick={() => onChange('pending')} className="text-[12px] font-semibold text-ink-2 hover:text-ink">
          Reset sample
        </button>
      </div>
    )
  }
  return (
    <div className="mt-3 rounded-ctl border border-warning-border bg-warning-subtle p-3">
      <p className="flex items-center gap-1.5 text-[13px] font-semibold text-warning">
        <ShieldAlert aria-hidden="true" className="size-4" />
        Profile Guard
      </p>
      <p className="mt-1 text-[13px] text-ink-2">
        Saturday hours on Google changed to <strong className="font-semibold text-ink">10:00 – 18:00</strong>. Your record says 10:00 – 20:00.
      </p>
      <div className="mt-2.5 flex gap-2">
        <button
          type="button"
          onClick={() => onChange('reverted')}
          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-brand-ink px-3 text-[12px] font-semibold text-ink-inverse transition-transform active:scale-[0.98]"
        >
          <Undo2 aria-hidden="true" className="size-3.5" />
          Revert edit
        </button>
        <button
          type="button"
          onClick={() => onChange('accepted')}
          className="inline-flex h-8 items-center rounded-full border border-line bg-card px-3 text-[12px] font-semibold text-ink hover:bg-hover"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
