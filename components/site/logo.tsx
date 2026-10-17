import { cn } from '@/lib/utils'

export function LogoMark({ className, inverted }: { className?: string; inverted?: boolean }) {
  const isForceInverted = inverted === true
  const isForceStandard = inverted === false

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('size-8 shrink-0', className)}>
      <rect
        width="32"
        height="32"
        rx="9"
        className={cn(
          isForceInverted
            ? 'fill-white/10 stroke-white/20'
            : isForceStandard
              ? 'fill-brand-ink'
              : 'fill-brand-ink dark:fill-white/10 dark:stroke-white/20',
        )}
        strokeWidth={isForceInverted ? 1 : undefined}
      />
      <path
        d="M16 7a7 7 0 0 1 7 7c0 4.9-7 11-7 11s-7-6.1-7-11a7 7 0 0 1 7-7Z"
        fill="none"
        strokeWidth="2"
        className={cn(
          isForceInverted
            ? 'stroke-white'
            : isForceStandard
              ? 'stroke-ink-inverse'
              : 'stroke-ink-inverse dark:stroke-white',
        )}
      />
      <circle
        cx="16"
        cy="14"
        r="2.8"
        className={cn(
          isForceInverted
            ? 'fill-white'
            : isForceStandard
              ? 'fill-ink-inverse'
              : 'fill-ink-inverse dark:fill-white',
        )}
      />
      <circle
        cx="25.2"
        cy="6.8"
        r="2.3"
        className={cn(
          isForceInverted
            ? 'fill-[#38BDF8]'
            : isForceStandard
              ? 'fill-brand'
              : 'fill-brand dark:fill-[#38BDF8]',
        )}
      />
    </svg>
  )
}

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  const isForceInverted = inverted === true
  const isForceStandard = inverted === false

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark inverted={inverted} />
      <span
        className={cn(
          'text-[17px] font-semibold tracking-[-0.02em]',
          isForceInverted
            ? 'text-white'
            : isForceStandard
              ? 'text-ink'
              : 'text-ink dark:text-white',
        )}
      >
        What The Local
      </span>
    </span>
  )
}
