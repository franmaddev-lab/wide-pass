import type { Metadata } from 'next'
import Link from 'next/link'
import { connection } from 'next/server'
import CheckoutForm from '@/components/CheckoutForm'
import { paymentsEnabled } from '@/lib/stripe'

export const metadata: Metadata = { title: 'Checkout — Wide Pass' }

export default async function CheckoutPage() {
  await connection() // read the Stripe key at request time, not build time
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-4xl uppercase">Checkout</h1>
      <CheckoutForm payments={paymentsEnabled} />
      <p className="mt-6 text-sm text-muted">
        By ordering you agree to our{' '}
        <Link href="/legal/terms" className="underline">
          terms
        </Link>
        . Personalised items can’t be returned for a change of mind;{' '}
        <Link href="/legal/returns" className="underline">
          delivery &amp; returns
        </Link>
        .
      </p>
    </div>
  )
}
