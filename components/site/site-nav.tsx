'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'
import { DemoButton } from './demo-dialog'
import { useTheme } from '@/lib/theme'

const primaryLinks = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#products', label: 'Products' },
  { href: '#faq', label: 'FAQs' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const theme = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = primaryLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
        isDark
          ? 'border-b border-white/[0.08] bg-[#07090e]/85 text-white backdrop-blur-md'
          : 'border-b border-line bg-page/90 text-ink backdrop-blur-md shadow-card',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-6 md:px-8"
      >
        {/* Left: Logo */}
        <div className="flex shrink-0 items-center">
          <a
            href="#top"
            className="group flex items-center rounded-ctl transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            aria-label="What The Local, return to top"
          >
            <Logo inverted={isDark} />
          </a>
        </div>

        {/* Center: Exactly 3 curated primary links with generous breathing room */}
        <ul className="hidden items-center gap-1 md:flex">
          {primaryLinks.map((l) => {
            const isActive = active === l.href
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-[14px] font-medium tracking-[-0.01em] transition-[color,background-color] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                    isDark
                      ? isActive
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                      : isActive
                        ? 'bg-sunken text-ink font-semibold'
                        : 'text-ink-2 hover:bg-hover hover:text-ink',
                  )}
                >
                  {l.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full',
                        isDark ? 'bg-[#38BDF8]' : 'bg-brand',
                      )}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right: Theme Toggle & Prominent High-Contrast Book a Demo CTA */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <DemoButton
            size="md"
            withArrow
            className={cn(
              'hidden font-semibold sm:inline-flex',
              isDark
                ? 'bg-white text-black hover:bg-white/90 shadow-[0_4px_16px_rgba(255,255,255,0.18)] hover:-translate-y-px active:scale-[0.98]'
                : 'bg-brand-ink text-ink-inverse hover:shadow-raised hover:-translate-y-px active:scale-[0.98]',
            )}
          >
            Book a Demo
          </DemoButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full border transition-colors md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
              isDark
                ? 'border-white/15 bg-white/5 text-white hover:bg-white/10'
                : 'border-line bg-card text-ink hover:bg-hover',
            )}
          >
            {open ? (
              <X aria-hidden="true" className="size-[18px]" />
            ) : (
              <Menu aria-hidden="true" className="size-[18px]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        hidden={!open}
        className={cn(
          'border-b px-5 py-4 backdrop-blur-xl md:hidden',
          isDark
            ? 'border-white/10 bg-[#0a0d16]/95 text-white'
            : 'border-line bg-page/95 text-ink',
        )}
      >
        <ul className="space-y-1">
          {primaryLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'block rounded-ctl px-3 py-2 text-base font-medium transition-colors',
                  isDark
                    ? 'text-white/80 hover:bg-white/10 hover:text-white'
                    : 'text-ink-2 hover:bg-hover hover:text-ink',
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-3 border-t border-line/60 dark:border-white/10 flex items-center justify-between gap-3">
          <DemoButton
            size="md"
            withArrow
            className={cn(
              'w-full justify-center',
              isDark
                ? 'bg-white text-black hover:bg-white/90 shadow-[0_4px_16px_rgba(255,255,255,0.18)]'
                : 'bg-brand-ink text-ink-inverse hover:shadow-raised',
            )}
          >
            Book a Demo
          </DemoButton>
        </div>
      </div>
    </header>
  )
}
