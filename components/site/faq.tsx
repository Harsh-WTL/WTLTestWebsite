'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import styles from './faq.module.css'

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
] as const

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-title" className={styles.faq}>
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <div className={styles.rail}>
            <Reveal>
              <span className={styles.eyebrowChip}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                Frequently Asked Questions
              </span>
              <h2 id="faq-title" className={styles.sTitle}>
                Everything you need to know about{' '}
                <span className={styles.sAccent}>What The Local.</span>
              </h2>
              <p className={styles.sDesc}>
                Clear answers on permissions, Google Business Profile syncing, WhatsApp escalations,
                and onboarding.
              </p>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className={styles.list}>
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx
                return (
                  <div key={faq.q} className={cn(styles.item, isOpen && styles.itemOpen)}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${idx}`}
                      id={`faq-q-${idx}`}
                      className={styles.btn}
                    >
                      <span className={styles.num} aria-hidden="true">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className={styles.q}>{faq.q}</span>
                      <ChevronDown aria-hidden="true" className={styles.chev} />
                    </button>
                    <div
                      className={styles.body}
                      id={`faq-a-${idx}`}
                      role="region"
                      aria-labelledby={`faq-q-${idx}`}
                    >
                      <div className={styles.bodyIn}>
                        <p className={styles.a}>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
