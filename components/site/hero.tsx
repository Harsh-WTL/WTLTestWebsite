import { DemoButton } from './demo-dialog'
import { HeroSignalMap } from './hero-signal-map'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import styles from './hero-signal.module.css'

/* Official channel wordmarks (dot colors follow each brand's identity) */
const OFFICIAL_LOGOS: { name: string; dot: string; dotClass?: string }[] = [
  { name: 'Google', dot: '#4285F4' },
  { name: 'Instagram', dot: 'linear-gradient(135deg, #F58529, #DD2A7B 55%, #8134AF)' },
  { name: 'WhatsApp', dot: 'var(--surface-raised)', dotClass: 'border border-line-strong' },
  { name: 'YouTube', dot: '#FF0033' },
  { name: 'Bing', dot: '#00A4EF' },
  { name: 'Meta', dot: 'var(--ink-primary)' },
  { name: 'Apple Maps', dot: '#111111', dotClass: 'border-[1.5px] border-line-strong' },
]

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} style={{ display: 'inline-flex', gap: 44, paddingRight: 44 }}>
      {OFFICIAL_LOGOS.map((logo) => (
        <span key={logo.name} className={styles.logoItem}>
          <span
            aria-hidden="true"
            className={cn(styles.logoDot, logo.dotClass)}
            style={{ background: logo.dot }}
          />
          {logo.name}
        </span>
      ))}
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="hero-canvas relative overflow-hidden text-ink dark:text-white pt-10 pb-10 sm:pt-12 md:pt-14 md:pb-14 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
        {/* Left: content (copy unchanged) · Right: living product montage */}
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1.04fr)] lg:items-center">
          <div className="enter-rise max-w-2xl lg:max-w-none">
            {/* Eyebrow */}
            <p className={cn(styles.eyebrow, 'mb-5 font-mono')}>
              <span aria-hidden="true" className="live-dot size-[7px] shrink-0 rounded-full bg-success" />
              <span>MULTI-LOCATION MARKETING, CONNECTED</span>
            </p>

            {/* Oversized Headline with Deliberate 2-Line Desktop Rhythm */}
            <h1
              id="hero-title"
              className="text-balance text-[38px] leading-[1.04] font-semibold tracking-[-0.035em] sm:text-[50px] md:text-[58px] lg:text-[56px] xl:text-[64px]"
            >
              <span className="block text-ink dark:text-white">Make every location</span>
              <span className={cn('block', styles.metal)}>perform at its best.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-4 sm:mt-5 max-w-xl text-pretty text-[16px] leading-relaxed text-ink-2 sm:text-[17.5px] dark:text-white/70">
              Bring location presence, customer conversations, and local marketing into{' '}
              <span className={styles.uw}>one connected workspace</span>—so your team knows what
              needs attention and what to do next.
            </p>

            {/* Live drift sting */}
            <p className={cn(styles.sting, 'mt-6 sm:mt-7')}>
              <span className={cn(styles.driftBadge, 'font-mono')}>▲ PROFILE DRIFT</span>
              <span className="font-mono">
                Thane · Saturday hours ·{' '}
                <b className={styles.stingB}>caught 21 min ago</b>
              </span>
            </p>

            {/* CTAs */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5">
              <DemoButton size="lg" withArrow className={cn('rounded-[10px]', styles.btnP)}>
                Book a Demo
              </DemoButton>
              <a
                href="#products"
                className={cn(
                  styles.btnS,
                  'group inline-flex items-center justify-center gap-2 h-12 px-6 text-[15px] font-medium transition-colors duration-150 hover:bg-hover active:scale-[0.98]',
                )}
              >
                <span>Explore the Platform</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-ink-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink dark:text-white/50 dark:group-hover:text-white"
                />
              </a>
            </div>

            {/* Compact Platform Architecture Signature */}
            <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink-3 dark:text-white/50">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-75">Platform Architecture:</span>
              <div className="flex items-center gap-1.5 tracking-[0.14em] font-semibold text-ink dark:text-white/80">
                <span>LOCATIONS</span>
                <span aria-hidden="true" className="opacity-40">/</span>
                <span>ENGAGE</span>
                <span aria-hidden="true" className="opacity-40">/</span>
                <span>SYNAPSE</span>
              </div>
              <span aria-hidden="true" className="hidden sm:inline opacity-30">·</span>
              <span className="text-[10.5px] opacity-70">Mumbai Metro · 7 Storefronts Linked</span>
            </div>

            {/* Official logo rail */}
            <div className={cn(styles.rail, 'mt-8 sm:mt-10')}>
              <span className={cn(styles.railLabel, 'font-mono')}>Official</span>
              <div className={styles.marquee}>
                <div className={styles.track}>
                  <LogoSet />
                  <LogoSet hidden />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Living Signal Montage (scenarios · map · table · chips) */}
          <div className="enter-rise [animation-delay:120ms] w-full">
            <HeroSignalMap />
          </div>
        </div>

        {/* Trust ribbon */}
        <div className={cn('enter-rise [animation-delay:180ms] mt-10 sm:mt-12 font-mono', styles.ribbon)}>
          <span className={styles.ribbonKey}>OFFICIAL</span>
          <span aria-hidden="true" className={styles.ribbonSep}>·</span>
          <span>Google Business Profile &amp; Meta APIs</span>
          <span aria-hidden="true" className={styles.ribbonSep}>·</span>
          <span>Zero migration fee</span>
          <span aria-hidden="true" className={styles.ribbonSep}>·</span>
          <span>Rollout in 48 hours</span>
        </div>
      </div>
    </section>
  )
}
