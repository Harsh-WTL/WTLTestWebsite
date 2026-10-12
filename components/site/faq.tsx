'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionHeading } from './primitives'
import { Reveal } from './reveal'

const faqs = [
  {
    q: 'How does Profile Guard protect our Google and Apple Maps listings?',
    a: 'Profile Guard connects securely to your verified Google Business Profile and Maps integrations. It continuously checks public listings against your central system of record. If a third-party user or automated Google algorithm modifies your hours, phone numbers, or photos, What The Local alerts you instantly with a 1-click revert button to keep your records authoritative.',
  },
  {
    q: 'How does the WhatsApp escalation engine work for store managers?',
    a: 'Store managers rarely sit at laptops all day. Each outlet is configured with the mobile numbers of assigned store managers and regional heads. When a critical review (1–2 stars) or safety complaint lands, our engine formats an actionable alert via Meta Cloud API within 45 seconds—complete with the customer feedback, rating, and recommended resolution steps.',
  },
  {
    q: 'Can we control reply permissions between Head Office and local teams?',
    a: 'Yes. You have full workflow control. You can choose full central approval (Head Office approves all AI drafts), regional approval, or give trusted store managers permission to approve drafts directly. In all configurations, responses never post publicly until a human approves them.',
  },
  {
    q: 'How does Synapse route local ad leads to the nearest store?',
    a: 'Synapse bounds your ad campaigns to each store’s actual catchment radius (e.g. 2–5 km). When a customer submits a lead form or requests a callback, the system automatically geocodes the request and routes the lead into the nearest store manager’s CRM or WhatsApp chat, ensuring immediate follow-up while intent is highest.',
  },
  {
    q: 'How long does onboarding take for a chain with 20 to 100+ outlets?',
    a: 'Most multi-location brands are fully live within 48 to 72 hours. We sync your existing Google Business Profile manager account in bulk, map your store codes and manager phone numbers, and configure your brand tone guidelines for AI reply drafting.',
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-card/60 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            id="faq-title"
            eyebrow="Frequently Asked Questions"
            title="Everything you need to know about What The Local."
            description="Clear answers on permissions, Google Business Profile syncing, WhatsApp escalations, and onboarding."
          />
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <Reveal key={faq.q} delay={idx * 60}>
                <div className="overflow-hidden rounded-ctl border border-line bg-card transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-hover"
                  >
                    <span className="text-base font-semibold text-ink">{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        'size-4 text-ink-3 shrink-0 transition-transform duration-200',
                        isOpen && 'rotate-180 text-brand',
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-line/60 bg-sunken/30 px-5 py-4 text-[14px] leading-relaxed text-ink-2 enter-rise">
                      {faq.a}
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
