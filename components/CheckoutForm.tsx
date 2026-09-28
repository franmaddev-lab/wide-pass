'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { placeOrder, type CheckoutState } from '@/app/actions/checkout'
import { clearCart, useCart } from '@/lib/cart'
import { formatPrice, resolveLine, totals } from '@/lib/catalog'

const FIELDS = [
  { name: 'name', label: 'Full name', autoComplete: 'name' },
  { name: 'email', label: 'Email', autoComplete: 'email', type: 'email' },
  { name: 'address', label: 'Address', autoComplete: 'street-address' },
  { name: 'city', label: 'City', autoComplete: 'address-level2' },
  { name: 'postcode', label: 'Postcode', autoComplete: 'postal-code' },
  { name: 'country', label: 'Country', autoComplete: 'country-name' },
]

async function submit(prev: CheckoutState, form: FormData) {
  const result = await placeOrder(prev, form)
  if (result.status === 'ok') clearCart()
  return result
}

export default function CheckoutForm({ payments }: { payments: boolean }) {
  const cart = useCart()
  const [state, action, pending] = useActionState(submit, { status: 'idle' })

  if (state.status === 'ok') {
    return (
      <div className="mt-8 rounded-2xl border-2 border-ink bg-volt p-8">
        <p className="font-display text-2xl uppercase">Thank you, {state.name.split(' ')[0]}!</p>
        <p className="mt-3">
          Order <strong>{state.orderId}</strong> ({formatPrice(state.total)}) is confirmed. We’ll
          email {state.email} when it ships.
        </p>
        <p className="mt-3">Now go ride, and be seen.</p>
        <Link href="/slogans" className="mt-6 inline-block font-semibold underline">
          Keep shopping
        </Link>
      </div>
    )
  }

  const { subtotal, discount, shipping, total } = totals(
    cart.map((l) => ({ unit: resolveLine(l)?.unit ?? 0, qty: l.qty }))
  )

  if (subtotal === 0) {
    return (
      <p className="mt-8">
        Your cart is empty.{' '}
        <Link href="/slogans" className="font-semibold underline">
          Back to the shop
        </Link>
      </p>
    )
  }

  return (
    <form action={action} className="mt-8 space-y-4">
      <input type="hidden" name="cart" value={JSON.stringify(cart)} />
      {!payments &&
        FIELDS.map((f) => (
          <label key={f.name} className="block">
            <span className="text-sm font-bold uppercase">{f.label}</span>
            <input
              name={f.name}
              type={f.type ?? 'text'}
              autoComplete={f.autoComplete}
              required
              className="mt-1 block w-full rounded-lg border-2 border-ink bg-white px-3 py-2"
            />
          </label>
        ))}

      <div className="rounded-2xl border-2 border-ink bg-white p-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <span>Bundle saving</span>
            <span>−{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        <div className="mt-2 flex justify-between border-t-2 border-ink pt-2 font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {state.status === 'error' && (
        <p role="alert" className="font-bold">
          {state.message}
        </p>
      )}

      {payments ? (
        <p className="text-sm text-muted">
          You’ll add your delivery address and pay on Stripe’s secure page: card, Apple Pay or
          Google Pay.
        </p>
      ) : (
        <p className="text-sm text-muted">Demo store: no payment is taken yet.</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full border-2 border-ink bg-ink px-6 py-4 font-display text-lg text-volt uppercase disabled:opacity-60"
      >
        {pending
          ? payments
            ? 'Opening secure payment…'
            : 'Placing order…'
          : payments
            ? `Pay securely · ${formatPrice(total)}`
            : 'Place order'}
      </button>
    </form>
  )
}
