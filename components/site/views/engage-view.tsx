'use client'

import { useState } from 'react'
import { Check, MessageSquare, MapPin, Send, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { locationById, sampleConversations, type Conversation } from '@/lib/sample-data'
import { Stars } from '../primitives'

const sentimentClass: Record<Conversation['sentiment'], string> = {
  Negative: 'border-danger-border bg-danger-subtle text-danger',
  Neutral: 'border-info-border bg-info-subtle text-info',
  Mixed: 'border-warning-border bg-warning-subtle text-warning',
  Positive: 'border-success-border bg-success-subtle text-success',
}

export function EngageView() {
  const [selectedId, setSelectedId] = useState(sampleConversations[0].id)
  const [drafts, setDrafts] = useState<Record<string, string>>(() =>
    Object.fromEntries(sampleConversations.map((c) => [c.id, c.draft])),
  )
  const [approved, setApproved] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState<'draft' | 'response-studio'>('draft')

  const convo = sampleConversations.find((c) => c.id === selectedId) ?? sampleConversations[0]
  const isApproved = approved[convo.id]
  const locationName = convo.locationId ? locationById(convo.locationId).name : 'All locations · App'

  return (
    <div className="grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <ul
        className="flex gap-1.5 overflow-x-auto border-b border-line p-2 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
        aria-label="Sample inbox"
      >
        {sampleConversations.map((c) => {
          const active = c.id === convo.id
          return (
            <li key={c.id} className="min-w-[230px] lg:min-w-0">
              <button
                type="button"
                onClick={() => setSelectedId(c.id)}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'w-full rounded-ctl p-3 text-left transition-colors',
                  active ? 'bg-selected shadow-sm' : 'hover:bg-hover',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[13px] font-semibold">{c.author}</span>
                  <span className="tnum shrink-0 text-[11px] text-ink-3">{c.time}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <p className="text-[11px] text-ink-3">{c.channel}</p>
                  {c.sentiment === 'Negative' && (
                    <span className="inline-flex items-center gap-0.5 rounded px-1 text-[10px] font-semibold bg-danger-subtle text-danger">
                      <MessageSquare className="size-2.5" /> Needs attention
                    </span>
                  )}
                </div>
                <p className="mt-1.5 line-clamp-2 text-[12px] leading-snug text-ink-2">{c.text}</p>
                {approved[c.id] ? (
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-success">
                    <Check aria-hidden="true" className="size-3" /> Approved & Synced
                  </span>
                ) : null}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="flex min-h-[460px] flex-col p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-line bg-sunken px-2.5 py-1 text-[11px] font-semibold text-ink-2">
              {convo.channel}
            </span>
            <span className="inline-flex items-center gap-1 text-[12px] font-semibold">
              <MapPin aria-hidden="true" className="size-3.5 text-brand" />
              {locationName}
            </span>
            {convo.rating ? <Stars rating={convo.rating} className="ml-1" /> : null}
          </div>

          <div className="flex items-center gap-1 rounded-full border border-line bg-sunken p-1">
            <button
              type="button"
              onClick={() => setActiveTab('draft')}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                activeTab === 'draft' ? 'bg-card text-ink shadow-sm' : 'text-ink-2 hover:text-ink',
              )}
            >
              <Sparkles className="size-3 text-brand" />
              AI Draft Reply
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('response-studio')}
              className={cn(
                'relative flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                activeTab === 'response-studio' ? 'bg-card text-ink shadow-sm' : 'text-ink-2 hover:text-ink',
              )}
            >
              <MessageSquare className="size-3 text-brand" />
              Response Studio
            </button>
          </div>
        </div>

        <blockquote className="mt-4 rounded-ctl border border-line bg-sunken/40 p-3.5 text-[14px] leading-relaxed text-ink">
          <p>&ldquo;{convo.text}&rdquo;</p>
          <footer className="mt-2 text-[12px] font-medium text-ink-3">
            — {convo.author} · <span className="font-mono text-[11px]">{convo.time}</span>
          </footer>
        </blockquote>

        <div className="mt-3 flex flex-wrap items-center gap-1.5" aria-label="Classification">
          <span className={cn('rounded-full border px-2.5 py-0.5 text-[11px] font-semibold', sentimentClass[convo.sentiment])}>
            {convo.sentiment}
          </span>
          {convo.topics.map((t) => (
            <span key={t} className="rounded-full border border-line bg-sunken px-2.5 py-0.5 text-[11px] font-medium text-ink-2">
              {t}
            </span>
          ))}
          {convo.sentimentTheme && (
            <span className="rounded-full border border-brand-border bg-brand-subtle px-2.5 py-0.5 text-[11px] font-semibold text-brand">
              {convo.sentimentTheme}
            </span>
          )}
        </div>

        {activeTab === 'draft' ? (
          <div className="mt-auto pt-5">
            <div className="flex items-center justify-between">
              <label htmlFor={`draft-${convo.id}`} className="flex items-center gap-1.5 text-[12px] font-semibold text-ink-2">
                <Sparkles aria-hidden="true" className="size-3.5 text-brand" />
                AI Drafted reply · edit before approving
              </label>
              {isApproved && (
                <span className="flex items-center gap-1 text-xs font-semibold text-success">
                  <Check className="size-3.5" /> Ready for live sync
                </span>
              )}
            </div>
            <textarea
              id={`draft-${convo.id}`}
              value={drafts[convo.id]}
              onChange={(e) => {
                setDrafts((d) => ({ ...d, [convo.id]: e.target.value }))
                setApproved((a) => ({ ...a, [convo.id]: false }))
              }}
              rows={3}
              className="mt-2 w-full resize-none rounded-ctl border border-line bg-card p-3 text-[13px] leading-relaxed text-ink shadow-sm transition-colors hover:border-line-strong focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[12px] text-ink-3" aria-live="polite">
                {isApproved ? 'Approved in this sample — queued for Google sync.' : 'Replies require central or store approval before posting.'}
              </p>
              <button
                type="button"
                onClick={() => setApproved((a) => ({ ...a, [convo.id]: !a[convo.id] }))}
                disabled={!drafts[convo.id]?.trim()}
                aria-pressed={!!isApproved}
                className={cn(
                  'inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold transition-[background-color,transform] active:scale-[0.98] disabled:opacity-50',
                  isApproved
                    ? 'border border-success-border bg-success-subtle text-success'
                    : 'bg-brand-ink text-ink-inverse shadow-sm hover:opacity-90',
                )}
              >
                {isApproved ? (
                  <>
                    <Check aria-hidden="true" className="size-4" /> Approved
                  </>
                ) : (
                  <>
                    <Send aria-hidden="true" className="size-3.5" />
                    Approve reply
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-auto pt-4">
            <div className="rounded-card border border-brand-border bg-brand-subtle/30 p-4">
              <div className="flex items-center justify-between gap-2 border-b border-brand-border/20 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-brand text-white">
                    <MessageSquare className="size-3.5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-ink">
                      Response Studio
                    </p>
                    <p className="text-[11px] text-ink-3">
                      AI auto-reply configuration · Brand voice controls · Saved replies
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-brand/20 px-2 py-0.5 text-[11px] font-semibold text-brand">
                  Available when channels connected
                </span>
              </div>

              <div className="mt-3 rounded-ctl border border-line bg-card/90 p-3 text-xs leading-relaxed text-ink shadow-sm">
                <p className="font-bold text-brand">Response Studio Features</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-ink-2">
                  <li>AI auto-replies master switch (per-star toggles)</li>
                  <li>Brand voice: 1,000-char description + Professional/Friendly/Witty/Empathetic presets</li>
                  <li>Contact email/phone shared by AI only when helpful</li>
                  <li>Saved Replies + Automated Rules builders</li>
                  <li>Full Brand Voice editor</li>
                </ul>
              </div>

              <div className="mt-3 rounded-ctl border border-line bg-card/90 p-3 text-xs leading-relaxed text-ink shadow-sm">
                <p className="font-bold text-brand">Agent Queue</p>
                <ul className="mt-2 list-decimal space-y-1 pl-4 text-ink-2">
                  <li>Pipeline: To do → WIP → ACR → Resolved → Closed</li>
                  <li>Round-robin assignment (configurable)</li>
                  <li>Search by Ticket #, order, AWB, email</li>
                </ul>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-ink-3">
                <span className="inline-flex items-center gap-1">
                  <MessageSquare className="size-3 text-brand" /> 8 channels available
                </span>
                <span>Channel availability depends on connected accounts</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}