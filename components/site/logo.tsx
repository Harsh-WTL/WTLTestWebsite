import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('size-8', className)}>
      <rect width="32" height="32" rx="9" className="fill-brand-ink" />
      <path
        d="M16 7a7 7 0 0 1 7 7c0 4.9-7 11-7 11s-7-6.1-7-11a7 7 0 0 1 7-7Z"
        fill="none"
        strokeWidth="2"
        className="stroke-ink-inverse"
      />
      <circle cx="16" cy="14" r="2.8" className="fill-ink-inverse" />
      <circle cx="25.2" cy="6.8" r="2.3" className="fill-brand" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-[-0.02em]">What The Local</span>
    </span>
  )
}
