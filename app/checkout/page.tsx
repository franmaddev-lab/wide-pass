import type { Metadata } from 'next'
import CheckoutForm from '@/components/CheckoutForm'

export const metadata: Metadata = { title: 'Checkout — Wide Pass' }

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-4xl uppercase">Checkout</h1>
      <CheckoutForm />
    </div>
  )
}
