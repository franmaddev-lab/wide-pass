'use server'

import { resolveLine, shippingFor, type CartLine } from '@/lib/catalog'

export type CheckoutState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'ok'; orderId: string; total: number; name: string; email: string }

export async function placeOrder(_prev: CheckoutState, form: FormData): Promise<CheckoutState> {
  const name = String(form.get('name') ?? '').trim()
  const email = String(form.get('email') ?? '').trim()
  const address = String(form.get('address') ?? '').trim()
  const city = String(form.get('city') ?? '').trim()
  const postcode = String(form.get('postcode') ?? '').trim()
  const country = String(form.get('country') ?? '').trim()

  if (!name || !address || !city || !postcode || !country) {
    return { status: 'error', message: 'Please fill in all the shipping fields.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'That email address doesn’t look right.' }
  }

  let lines: Partial<Record<keyof CartLine, unknown>>[]
  try {
    lines = JSON.parse(String(form.get('cart') ?? '[]'))
  } catch {
    return {
      status: 'error',
      message: 'Your cart could not be read. Please refresh and try again.',
    }
  }

  // Never trust prices from the browser: re-check and re-price every line from the catalogue.
  let subtotal = 0
  for (const raw of Array.isArray(lines) ? lines : []) {
    const str = (v: unknown) => (typeof v === 'string' ? v : undefined)
    const qty = Number(raw?.qty)
    const resolved = resolveLine({
      item: str(raw?.item) ?? '',
      slogan: str(raw?.slogan),
      custom: str(raw?.custom),
      color: str(raw?.color) ?? '',
      size: str(raw?.size) ?? '',
      qty,
    })
    if (!resolved || !Number.isInteger(qty) || qty < 1 || qty > 20) {
      return {
        status: 'error',
        message: 'Something in your cart is no longer available. Please check your cart.',
      }
    }
    subtotal += resolved.unit * qty
  }
  if (subtotal === 0) {
    return { status: 'error', message: 'Your cart is empty.' }
  }

  // TODO: take payment here (e.g. Stripe Checkout) and save the order before confirming.
  const orderId = 'WP-' + crypto.randomUUID().slice(0, 8).toUpperCase()
  return { status: 'ok', orderId, total: subtotal + shippingFor(subtotal), name, email }
}
