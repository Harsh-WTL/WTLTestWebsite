import { DemoButton } from './demo-dialog'
import { buttonClass } from './primitives'
import { HeroWorkspace } from './hero-workspace'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-ambient-mesh">
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--brand-primary)_14%,transparent)_0%,transparent_70%)] blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        <div className="enter-rise">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-3.5 py-1.5 text-[13px] font-medium text-ink-2 shadow-card backdrop-blur-md">
            <span aria-hidden="true" className="live-dot size-2 rounded-full bg-success" />
            <span>Multi-location marketing, connected</span>
          </p>
          <h1
            id="hero-title"
            className="text-balance text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[54px] lg:text-[60px]"
          >
            Every location, run like your best one.
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-ink-2">
            What The Local connects location presence, customer conversations, and local growth in one workspace — so
            your central team sees what&apos;s happening at every store and acts on it before customers notice.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <DemoButton size="lg" withArrow />
            <a href="#products" className={buttonClass('secondary', 'lg')}>
              Explore the products
            </a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
            {[
              ['Locations', 'Presence'],
              ['Engage', 'Conversations'],
              ['Synapse', 'Local growth'],
            ].map(([name, role]) => (
              <div key={name}>
                <dt className="text-sm font-semibold">{name}</dt>
                <dd className="mt-0.5 text-[13px] text-ink-3">{role}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="enter-rise [animation-delay:120ms]">
          <HeroWorkspace />
        </div>
      </div>
    </section>
  )
}
