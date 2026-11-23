'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import styles from './faq.module.css'

const faqs = [
  {
    q: 'What is What The Local?',
    a: 'What The Local is a marketing platform built for businesses with multiple locations. It brings location presence, customer engagement and local advertising workflows together in one workspace.',
  },
  {
    q: 'What are the three product families?',
    a: 'The three products are Locations, Engage, and Synapse Ads. Each supports a different part of local marketing.',
  },
  {
    q: 'How does Locations help multi-location businesses?',
    a: 'Locations helps teams organise business information for every location, review listing changes, manage customer reviews and coordinate local publishing. It is designed for brands that need to see the whole portfolio, not one store at a time.',
  },
  {
    q: 'What can teams do with Engage?',
    a: 'Engage brings customer conversations from reviews, messages, comments and email into one organised workflow. Teams can review, assign and track conversations, prepare response drafts with AI assistance, and understand customer sentiment over time. Which channels are available depends on connected accounts.',
  },
  {
    q: 'What is Synapse Ads?',
    a: 'Synapse Ads supports local advertising workflows for multi-location teams. It includes campaign preparation tools, AI-assisted creative preparation and location-oriented advertising features. Campaign availability depends on connected advertising accounts.',
  },
  {
    q: 'How is AI used in the platform?',
    a: 'AI can assist with preparing response drafts, analysing customer feedback and supporting creative workflows where these features are available. Teams can review suggestions before using them. Available capabilities depend on the product workflow.',
  },
  {
    q: 'Can teams manage multiple locations and users?',
    a: 'Yes. Teams can be organised so that head office, regional and store teams each see the areas they manage.',
  },
  {
    q: 'Which integrations are available?',
    a: 'What The Local is designed to work with channels commonly used by multi-location businesses. Which channels and features are available depends on connected and configured accounts, and we recommend confirming current availability before you rely on a specific channel.',
  },
  {
    q: 'How can I request a demo?',
    a: 'Select the "Request a demo" button anywhere on the page and tell us about your locations. Our team will tailor the walkthrough to the product areas you want to explore.',
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
                Clear answers on products, AI, integrations, permissions, and demonstrations.
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