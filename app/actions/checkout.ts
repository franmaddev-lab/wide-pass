'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { resolveLine, shippingFor, type CartLine, type ResolvedLine } from '@/lib/catalog'
import { siteUrl } from '@/lib/site'
import { createCheckoutSession, paymentsEnabled } from '@/lib/stripe'

export type CheckoutState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'ok'; orderId: string; total: number; name: string; email: string }

export async function placeOrder(_prev: CheckoutState, form: FormData): Promise<CheckoutState> {
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
  const items: { line: ResolvedLine; qty: number }[] = []
  for (const raw of Array.isArray(lines) ? lines : []) {
    const str = (v: unknown) => (typeof v === 'string' ? v : undefined)
    const qty = Number(raw?.qty)
    const resolved = resolveLine({
      item: str(raw?.item) ?? '',
      slogan: str(raw?.slogan),
      custom: str(raw?.custom),
      color: str(raw?.color) ?? '',
      size: str(raw?.size) ?? '',
      fit: raw?.fit === 'women' ? 'women' : undefined,
      qty,
    })
    if (!resolved || !Number.isInteger(qty) || qty < 1 || qty > 20) {
      return {
        status: 'error',
        message: 'Something in your cart is no longer available. Please check your cart.',
      }
    }
    items.push({ line: resolved, qty })
  }
  const subtotal = items.reduce((n, i) => n + i.line.unit * i.qty, 0)
  if (subtotal === 0) {
    return { status: 'error', message: 'Your cart is empty.' }
  }
  const shipping = shippingFor(subtotal)

  if (paymentsEnabled) {
    // Stripe's hosted page collects the address and takes card, Apple Pay or Google Pay
    const origin = (await headers()).get('origin') ?? siteUrl
    let url: string | null
    try {
      const session = await createCheckoutSession({
        mode: 'payment',
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cart`,
        line_items: items.map(({ line, qty }) => ({
          quantity: qty,
          price_data: {
            currency: 'gbp',
            unit_amount: line.unit,
            product_data: { name: line.title, description: line.detail },
          },
        })),
        shipping_address_collection: { allowed_countries: ['GB'] },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              display_name: shipping === 0 ? 'Free UK delivery' : 'Standard UK delivery',
              fixed_amount: { amount: shipping, currency: 'gbp' },
            },
          },
        ],
      })
      url = session.url
    } catch (e) {
      console.error('Stripe checkout failed', e)
      url = null
    }
    if (!url) {
      return { status: 'error', message: 'Payment couldn’t start. Please try again in a minute.' }
    }
    redirect(url)
  }

  // Demo mode (no STRIPE_SECRET_KEY): the form collects the address and no money is taken
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

  const orderId = 'WP-' + crypto.randomUUID().slice(0, 8).toUpperCase()
  return { status: 'ok', orderId, total: subtotal + shipping, name, email }
}
