'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import styles from './faq.module.css'

const faqs = [
  {
    q: 'What is What The Local?',
    a: 'What The Local is a multi-location marketing platform that brings location presence management, customer engagement, and local advertising workflows together for businesses with multiple locations.',
  },
  {
    q: 'What are the three products within What The Local?',
    a: 'The three products are: Locations (Google Business Profile listing management, reviews, Profile Guard, AI Location Studio, local publishing), Engage (omnichannel customer care helpdesk with unified inbox, Agent Queue, AI-assisted responses), and Synapse Ads (Google Ads and Meta Lead Ads campaign tools, AI Creative Studio, SPARK ad-readiness workflow).',
  },
  {
    q: 'How does Locations help multi-location businesses?',
    a: 'Locations centralises Google Business Profile management across all your locations. It includes listing management, review monitoring with AI-assisted replies, Profile Guard for detecting unauthorized edits, AI Location Studio for completeness scoring, GBP post scheduling with per-location template variables, QR code generation, per-location microsite creation, and comprehensive reporting.',
  },
  {
    q: 'What can teams manage through Engage?',
    a: 'Engage provides a unified inbox for customer conversations across Google reviews, Facebook/Instagram comments and DMs, YouTube comments, Email tickets, Google Play & App Store reviews, and Ad comments. It includes Agent Queue with ticket pipeline (To do → WIP → ACR → Resolved → Closed), round-robin assignment, customer analytics with sentiment themes (LOVED/ASKED ABOUT/NEEDS WORK), and Response Studio for brand voice configuration and AI auto-reply rules. Channel availability depends on connected accounts.',
  },
  {
    q: 'What is Synapse Ads?',
    a: 'Synapse Ads is the advertising product area offering Google Ads and Meta Lead Ads campaign surfaces per location, AI Creative Studio for ad creative generation (5-step wizard: Business → Style → Message → Visuals → Size), and SPARK (Smart Personalised Ad Readiness Kit) which scans your website to build an ad-ready brand kit across Brand Intelligence, Audience Mapping, Product Catalogue, and AI Ad Generation. Per-location radius targeting (1–6 km) and lead routing to the nearest branch are supported.',
  },
  {
    q: 'How does AI fit into the platform?',
    a: 'AI is embedded across all three products: Locations uses AI for review reply generation (on-demand and auto-reply per star rating), Profile Guard edit risk triage, and AI Location Studio completeness scoring. Engage uses AI for auto-replies (configurable per star rating), brand voice controls, and sentiment theme extraction (LOVED/ASKED ABOUT/NEEDS WORK). Synapse Ads uses AI Creative Studio for image generation and SPARK for automated brand kit creation from website scan. AI never acts autonomously without human approval workflows.',
  },
  {
    q: 'Can teams control access by role and location?',
    a: 'Yes. Role-based access control includes roles such as Owner, Regional Manager, Store Manager, Review Handler, Report Viewer, Content Creator, Engage Agent, Engage Lead, Engage Read-Only, and Custom. Permissions can be scoped by product area (Locations, Engage, Advertising) and by geography (All, by State, by City, by Pincode, by Zone, or Specific Locations).',
  },
  {
    q: 'Which integrations and channels are supported?',
    a: 'Google Business Profile (listings, reviews, posts, media, attributes, verification, performance, edit moderation), Meta/Facebook/Instagram (location pages, page posts, comments, DMs), YouTube (comments), Email (forward-rule ingestion), Google Play & App Store (reviews), Google Ads, and Meta Lead Ads. Channel availability in Engage and Ads depends on connected and configured accounts by an admin.',
  },
  {
    q: 'How can we request a product demonstration?',
    a: 'Click the "Request a demo" button in the navigation or any CTA on this page. Fill out the form with your name, work email, company, location count, and what you\'d like to see. Our team will tailor the walkthrough to your portfolio — covering Locations, Engage, Synapse Ads, or all three.',
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