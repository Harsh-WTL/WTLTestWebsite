'use client'

import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'wtl-theme'
const listeners = new Set<() => void>()

function getTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

export function setTheme(theme: Theme, persist = true) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.add('theme-transition')
  root.classList.toggle('dark', theme === 'dark')
  root.setAttribute('data-theme', theme)
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {}
  }
  listeners.forEach((l) => l())
  window.setTimeout(() => root.classList.remove('theme-transition'), 260)
}

// Listen to system preference changes when user has not saved a manual preference
if (typeof window !== 'undefined') {
  try {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = (e: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (!stored) {
          setTheme(e.matches ? 'dark' : 'light', false)
        }
      } catch {}
    }
    media.addEventListener('change', onSystemChange)
  } catch {}
}

export function useTheme() {
  return useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null)
}
