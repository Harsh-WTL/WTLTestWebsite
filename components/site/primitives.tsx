import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { statusMeta, type LocationStatus } from '@/lib/sample-data'

export const buttonStyles = {
  base: 'group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,box-shadow,transform,color] duration-200 ease-[cubic-bezier(.2,.7,.2,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
  primary: 'bg-brand-ink text-ink-inverse hover:shadow-raised hover:-translate-y-px',
  secondary: 'bg-card text-ink border border-line hover:bg-hover hover:border-line-strong',
  ghost: 'text-ink-2 hover:text-ink hover:bg-hover',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-[15px]',
}

export function buttonClass(variant: 'primary' | 'secondary' | 'ghost' = 'primary', size: 'md' | 'lg' = 'md') {
  return cn(buttonStyles.base, buttonStyles[variant], buttonStyles[size])
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('font-mono text-xs uppercase tracking-[0.09em] text-ink-3', className)}>{children}</p>
  )
}

export function SampleBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-line bg-sunken px-2.5 py-1 font-mono text-[11px] text-ink-3',
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-ink-disabled" />
      Sample Workspace
    </span>
  )
}

export function StatusBadge({ status, className }: { status: LocationStatus; className?: string }) {
  const m = statusMeta[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-semibold',
        m.bg,
        m.border,
        m.text,
        className,
      )}
    >
      <span aria-hidden="true" className={cn('size-1.5 rounded-full', m.dot)} />
      {m.label}
    </span>
  )
}

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} aria-label={`${rating} out of 5 stars`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn('size-3', i < rating ? 'fill-warning text-warning' : 'fill-transparent text-line-strong')}
        />
      ))}
    </span>
  )
}

export function Panel({
  className,
  children,
  as: Tag = 'div',
}: {
  className?: string
  children: React.ReactNode
  as?: 'div' | 'section' | 'article'
}) {
  return <Tag className={cn('rounded-card border border-line bg-card shadow-card', className)}>{children}</Tag>
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  id?: string
  className?: string
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
      <h2 id={id} className="text-balance text-3xl font-semibold tracking-[-0.03em] md:text-[44px] md:leading-[1.05]">
        {title}
      </h2>
      {description ? <p className="mt-4 text-pretty text-base leading-relaxed text-ink-2 md:text-lg">{description}</p> : null}
    </div>
  )
}
