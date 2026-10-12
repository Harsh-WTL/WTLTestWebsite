'use client'

import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'wtl-theme'
const listeners = new Set<() => void>()

function getTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

export function setTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.add('theme-transition')
  root.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {}
  listeners.forEach((l) => l())
  window.setTimeout(() => root.classList.remove('theme-transition'), 260)
}

export function useTheme() {
  return useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null)
}
