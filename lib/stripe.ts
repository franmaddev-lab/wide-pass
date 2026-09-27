// Minimal Stripe client using the REST API directly (no SDK needed).
// Server only: never import this from a client component.
//
// Set STRIPE_SECRET_KEY in Vercel (sk_test_… to try it, sk_live_… to take real money).
// Apple Pay and Google Pay show up on Stripe's checkout page automatically once they're
// switched on in Stripe → Settings → Payment methods.

export const paymentsEnabled = Boolean(process.env.STRIPE_SECRET_KEY)

// Stripe wants nested form fields: line_items[0][price_data][currency]=gbp
function encode(value: unknown, prefix = '', out = new URLSearchParams()) {
  if (value === undefined || value === null) return out
  if (Array.isArray(value)) value.forEach((v, i) => encode(v, `${prefix}[${i}]`, out))
  else if (typeof value === 'object')
    for (const [k, v] of Object.entries(value)) encode(v, prefix ? `${prefix}[${k}]` : k, out)
  else out.append(prefix, String(value))
  return out
}

async function stripe<T>(path: string, body?: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
    },
    body: body ? encode(body) : undefined,
    cache: 'no-store',
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json?.error?.message ?? `Stripe error ${res.status}`)
  return json as T
}

export type CheckoutSession = {
  id: string
  url: string | null
  status: 'open' | 'complete' | 'expired'
  payment_status: 'paid' | 'unpaid' | 'no_payment_required'
  amount_total: number | null
  customer_details: { name: string | null; email: string | null } | null
}

export function createCheckoutSession(params: Record<string, unknown>) {
  return stripe<CheckoutSession>('checkout/sessions', params)
}

export function getCheckoutSession(id: string) {
  return stripe<CheckoutSession>(`checkout/sessions/${encodeURIComponent(id)}`)
}
