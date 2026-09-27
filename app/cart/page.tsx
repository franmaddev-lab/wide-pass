import type { Metadata } from 'next'
import CartView from '@/components/CartView'

export const metadata: Metadata = { title: 'Cart — Wide Pass' }

export default function CartPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl uppercase">Your cart</h1>
      <CartView />
    </div>
  )
}
