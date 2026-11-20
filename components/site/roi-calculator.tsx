'use client'

import { Building2, Users, MessageSquare, Megaphone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { DemoButton } from './demo-dialog'
import styles from './roi-calculator.module.css'

export function RoiCalculator() {
  return (
    <section id="capability-summary" aria-labelledby="roi-title" className={styles.roi}>
      <div className={styles.wrap}>
        <Reveal>
          <span className={styles.eyebrowChip}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Platform Capabilities
          </span>
          <h2 id="roi-title" className={styles.sTitle}>
            One location. <span className={styles.sAccent}>Multiple connected workflows.</span>
          </h2>
          <p className={styles.sDesc}>
            From business presence and customer feedback to local publishing, advertising preparation and reporting,
            What The Local brings the work around every location into one platform.
          </p>
        </Reveal>

        <div className={styles.roiGrid}>
          <Reveal delay={90} className={styles.ctlCard}>
            <div className={styles.capabilityGrid}>
              <div className={styles.capabilityItem}>
                <div className={styles.capabilityIcon}>
                  <Building2 aria-hidden="true" />
                </div>
                <h3 className={styles.capabilityTitle}>Locations</h3>
                <p className={styles.capabilityDesc}>
                  Manage listings, reviews, Profile Guard, AI Studio, GBP posts, QR codes, microsites, and reports.
                </p>
              </div>
              <div className={styles.capabilityItem}>
                <div className={styles.capabilityIcon}>
                  <MessageSquare aria-hidden="true" />
                </div>
                <h3 className={styles.capabilityTitle}>Engage</h3>
                <p className={styles.capabilityDesc}>
                  Unified inbox, Agent Queue, customer analytics, Response Studio, AI auto-replies, brand voice controls.
                </p>
              </div>
              <div className={styles.capabilityItem}>
                <div className={styles.capabilityIcon}>
                  <Megaphone aria-hidden="true" />
                </div>
                <h3 className={styles.capabilityTitle}>Synapse Ads</h3>
                <p className={styles.capabilityDesc}>
                  Google Ads & Meta Lead Ads, AI Creative Studio, SPARK ad-readiness, radius targeting, lead routing.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={180} className={styles.ledger}>
            <p className={styles.ledgerEyebrow}>Why it matters</p>
            <h3 className={styles.ledgerTitle}>Connected workflows for every location</h3>
            <div className={styles.leadRow}>
              <div className={styles.leadStats}>
                <div className={styles.sRow}>
                  <span className={styles.sName}>Single source of truth</span>
                  <span className={styles.sCap}>One location record feeds all three product areas</span>
                </div>
                <div className={styles.sRow}>
                  <span className={styles.sName}>AI throughout</span>
                  <span className={styles.sCap}>AI-assisted replies, Profile Guard triage, creative generation, ad readiness</span>
                </div>
                <div className={styles.sRow}>
                  <span className={styles.sName}>Team collaboration</span>
                  <span className={styles.sCap}>Role-based access, zone-scoped permissions, round-robin assignment</span>
                </div>
                <div className={styles.sRow}>
                  <span className={styles.sName}>Channel flexibility</span>
                  <span className={styles.sCap}>Google, Meta, email, app stores, ads — configure what you need</span>
                </div>
              </div>
            </div>

            <div className={styles.ledgerCta}>
              <div>
                <p>Ready to see how it fits your locations?</p>
                <p className={styles.ctaSub}>Request a tailored demonstration for your portfolio.</p>
              </div>
              <DemoButton size="md" withArrow className="rounded-[10px] h-10">
                Request a demo
              </DemoButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}