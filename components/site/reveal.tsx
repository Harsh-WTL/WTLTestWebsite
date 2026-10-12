'use client'

import { cn } from '@/lib/utils'
import { useInView } from '@/lib/hooks'

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 })
  return (
    <div
      ref={ref}
      data-visible={inView}
      className={cn('reveal', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
