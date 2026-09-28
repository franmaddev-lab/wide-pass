'use client'

import { useSyncExternalStore } from 'react'

import type { CartLine } from './catalog'

export type { CartLine }

const KEY = 'pass-wide-cart-v2'
const EMPTY: CartLine[] = []

let lines: CartLine[] | null = null
const listeners = new Set<() => void>()

function read(): CartLine[] {
  if (lines) return lines
  try {
    const raw = window.localStorage.getItem(KEY)
    lines = raw ? (JSON.parse(raw) as CartLine[]) : []
  } catch {
    lines = []
  }
  return lines
}

function write(next: CartLine[]) {
  lines = next
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // storage unavailable (private mode); cart still works for this visit
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      lines = null
      listener()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

const same = (a: CartLine, b: Omit<CartLine, 'qty'>) =>
  a.item === b.item &&
  a.slogan === b.slogan &&
  a.custom === b.custom &&
  a.color === b.color &&
  a.size === b.size &&
  (a.fit ?? 'unisex') === (b.fit ?? 'unisex')

export function addToCart(line: CartLine) {
  const current = read()
  const existing = current.find((l) => same(l, line))
  write(
    existing
      ? current.map((l) => (same(l, line) ? { ...l, qty: Math.min(l.qty + line.qty, 20) } : l))
      : [...current, line]
  )
}

export function setQty(line: Omit<CartLine, 'qty'>, qty: number) {
  write(
    qty <= 0
      ? read().filter((l) => !same(l, line))
      : read().map((l) => (same(l, line) ? { ...l, qty: Math.min(qty, 20) } : l))
  )
}

export function clearCart() {
  write([])
}

export function useCart() {
  return useSyncExternalStore(subscribe, read, () => EMPTY)
}

export function useCartCount() {
  return useCart().reduce((n, l) => n + l.qty, 0)
}
