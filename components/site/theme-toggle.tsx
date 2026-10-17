'use client'

import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { setTheme, useTheme } from '@/lib/theme'

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={theme === null ? undefined : isDark}
      className={cn(
        'relative inline-flex size-10 items-center justify-center rounded-full border border-line bg-card text-ink-2 transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:bg-hover hover:text-ink active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        className,
      )}
    >
      <Sun
        aria-hidden="true"
        className="size-[17px] transition-[transform,opacity] duration-300 dark:-rotate-90 dark:scale-50 dark:opacity-0"
      />
      <Moon
        aria-hidden="true"
        className="absolute size-[17px] rotate-90 scale-50 opacity-0 transition-[transform,opacity] duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </button>
  )
}
