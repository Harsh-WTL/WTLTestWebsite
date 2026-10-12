import { Building2, Car, Dumbbell, HeartPulse, ShoppingBag, UtensilsCrossed } from 'lucide-react'
import { SectionHeading } from './primitives'
import { Reveal } from './reveal'

const cases = [
  { icon: HeartPulse, name: 'Clinics & healthcare', body: 'Keep appointment hours accurate and answer patient reviews at every centre.' },
  { icon: ShoppingBag, name: 'Retail chains', body: 'Spot which stores are slipping on service and spend where footfall is.' },
  { icon: UtensilsCrossed, name: 'Restaurants & QSR', body: 'Reply to every outlet’s reviews and keep menus and hours current.' },
  { icon: Car, name: 'Automotive dealers', body: 'Route test-drive leads to the nearest showroom automatically.' },
  { icon: Building2, name: 'Banks & branches', body: 'Guard branch details and track sentiment by region.' },
  { icon: Dumbbell, name: 'Fitness & wellness', body: 'Run local trial campaigns around each studio’s catchment.' },
]

export function UseCases() {
  return (
    <section id="use-cases" aria-labelledby="use-cases-title" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            id="use-cases-title"
            eyebrow="Use cases"
            title="Built for brands that live on the high street."
            description="If customers find you through a map and judge you by your reviews, the same workflow applies."
          />
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <li key={c.name} className="bg-card">
              <Reveal delay={(i % 3) * 70} className="h-full p-6 transition-colors hover:bg-hover">
                <c.icon aria-hidden="true" className="size-5 text-brand" />
                <h3 className="mt-4 font-semibold tracking-[-0.01em]">{c.name}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{c.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
