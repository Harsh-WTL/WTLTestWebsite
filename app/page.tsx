import { DemoProvider } from '@/components/site/demo-dialog'
import { SiteNav } from '@/components/site/site-nav'
import { Hero } from '@/components/site/hero'
import { MetricsBar } from '@/components/site/metrics-bar'
import { Problem } from '@/components/site/problem'
import { HowItWorks } from '@/components/site/how-it-works'
import { ProductTour } from '@/components/site/product-tour'
import { RoiCalculator } from '@/components/site/roi-calculator'
import { Comparison } from '@/components/site/comparison'
import { UseCases } from '@/components/site/use-cases'
import { Faq } from '@/components/site/faq'
import { FinalCta, SiteFooter } from '@/components/site/closing'

export default function Page() {
  return (
    <DemoProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-ink focus:px-4 focus:py-2 focus:text-ink-inverse"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main">
        <Hero />
        <MetricsBar />
        <Problem />
        <HowItWorks />
        <ProductTour />
        <RoiCalculator />
        <Comparison />
        <UseCases />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </DemoProvider>
  )
}
