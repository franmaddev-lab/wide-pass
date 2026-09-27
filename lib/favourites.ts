'use client'

import { useSyncExternalStore } from 'react'
import { toggleLike } from '@/app/actions/community'

// Favourites are kept in this browser; each toggle also updates the shared
// like count that powers "Most popular" sorting.
// Keys look like "slogan:<id>" or "gadget:<slug>".

const KEY = 'wide-pass-favourites'
const EMPTY: string[] = []

let items: string[] | null = null
const listeners = new Set<() => void>()

function read(): string[] {
  if (items) return items
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    items = Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : []
  } catch {
    items = []
  }
  return items
}

function write(next: string[]) {
  items = next
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // storage unavailable (private mode); favourites still work for this visit
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      items = null
      listener()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

export function useFavourites() {
  return useSyncExternalStore(subscribe, read, () => EMPTY)
}

export function toggleFavourite(key: string) {
  const current = read()
  const on = !current.includes(key)
  write(on ? [key, ...current] : current.filter((k) => k !== key))
  // Best effort: the local favourite is saved even if the count update fails
  toggleLike(key, on).catch(() => {})
}
