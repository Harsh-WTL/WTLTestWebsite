'use client'

import { Moon, Sun } from 'lucide-react'
import { setTheme, useTheme } from '@/lib/theme'

export function ThemeToggle() {
  const theme = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={theme === null ? undefined : isDark}
      className="relative inline-flex size-10 items-center justify-center rounded-full border border-line bg-card text-ink-2 transition-colors hover:bg-hover hover:text-ink"
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
