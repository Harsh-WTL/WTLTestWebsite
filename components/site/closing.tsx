import { Check, ShieldCheck, Sparkles, MessageSquare, MapPin } from 'lucide-react'
import { DemoButton } from './demo-dialog'
import { Logo } from './logo'
import { Reveal } from './reveal'

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="bg-insight relative overflow-hidden rounded-panel p-8 text-insight-ink shadow-raised md:p-14 lg:p-16 border border-white/20 dark:border-white/10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.1em] opacity-80">
                  Ready in under 48 hours
                </p>
                <h2 id="cta-title" className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-5xl md:leading-[1.08]">
                  See your own locations in What The Local.
                </h2>
                <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed opacity-90 md:text-lg">
                  Book a tailored 20-minute walkthrough. We&apos;ll load your actual Google Business Profiles, run a live Profile Guard drift scan, and simulate instant WhatsApp escalation alerts for your store managers.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <DemoButton size="lg" withArrow className="bg-ink text-ink-inverse shadow-raised hover:opacity-90" />
                  <a
                    href="#how-it-works"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-current/20 px-6 text-sm font-semibold transition-colors hover:bg-white/10"
                  >
                    How rollout works
                  </a>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-medium opacity-85">
                  <span className="flex items-center gap-1.5">
                    <Check className="size-3.5 stroke-[2.5]" /> Zero upfront migration fee
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="size-3.5 stroke-[2.5]" /> Official Meta & Google APIs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="size-3.5 stroke-[2.5]" /> Cancel or pause anytime
                  </span>
                </div>
              </div>

              <div className="rounded-card border border-white/30 bg-white/20 dark:bg-black/20 p-6 backdrop-blur-md">
                <p className="text-xs font-mono uppercase tracking-wider opacity-80">What you will see in your demo</p>
                <ul className="mt-4 space-y-3.5 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/40 dark:bg-white/10 text-xs font-bold">1</span>
                    <div>
                      <strong className="block font-semibold">Live Profile Health Scan</strong>
                      <span className="text-xs opacity-85">Audit rogue hours, unreviewed user edits, and phone drifts across your branches.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/40 dark:bg-white/10 text-xs font-bold">2</span>
                    <div>
                      <strong className="block font-semibold">WhatsApp Alert Dispatch Test</strong>
                      <span className="text-xs opacity-85">Simulate a 1-star review and receive the exact store manager WhatsApp alert on your phone.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/40 dark:bg-white/10 text-xs font-bold">3</span>
                    <div>
                      <strong className="block font-semibold">Radius Ad & Lead Routing Blueprint</strong>
                      <span className="text-xs opacity-85">Calculate catchment household reach and nearest-showroom lead delivery for your stores.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-2">
              The connected marketing, presence, and reputation operating system built for multi-location brands. Run every store like your best one.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-ink-3">
              <span className="size-2 rounded-full bg-success" />
              <span>All platform systems operational · Meta & Google API connected</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-ink-3">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm text-ink-2">
              <li><a href="#products" className="hover:text-ink">Locations & Guard</a></li>
              <li><a href="#products" className="hover:text-ink">Engage Inbox</a></li>
              <li><a href="#products" className="hover:text-ink">WhatsApp Escalations</a></li>
              <li><a href="#products" className="hover:text-ink">Synapse Local Ads</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-ink-3">Industries</h4>
            <ul className="mt-3 space-y-2 text-sm text-ink-2">
              <li><a href="#use-cases" className="hover:text-ink">Automotive Showrooms</a></li>
              <li><a href="#use-cases" className="hover:text-ink">Healthcare & Clinics</a></li>
              <li><a href="#use-cases" className="hover:text-ink">Retail Chains</a></li>
              <li><a href="#use-cases" className="hover:text-ink">Restaurants & QSR</a></li>
              <li><a href="#use-cases" className="hover:text-ink">Banks & Branches</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-ink-3">Navigation</h4>
            <ul className="mt-3 space-y-2 text-sm text-ink-2">
              <li><a href="#how-it-works" className="hover:text-ink">How it works</a></li>
              <li><a href="#products" className="hover:text-ink">Products</a></li>
              <li><a href="#roi-calculator" className="hover:text-ink">ROI Calculator</a></li>
              <li><a href="#comparison" className="hover:text-ink">Comparison</a></li>
              <li><a href="#faq" className="hover:text-ink">FAQs</a></li>
              <li><a href="#top" className="hover:text-ink">Back to top</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} What The Local Technologies. All rights reserved.</p>
          <p>Product previews on this page use sample data from Mumbai region.</p>
        </div>
      </div>
    </footer>
  )
}
