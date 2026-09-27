'use client'

import Link from 'next/link'
import ProductArt from './ProductArt'
import { setQty, useCart } from '@/lib/cart'
import { FREE_SHIPPING_FROM, formatPrice, resolveLine, shippingFor } from '@/lib/catalog'
import { charityAmount, charityName } from '@/lib/site'

export default function CartView() {
  const cart = useCart()
  const rows = cart.flatMap((line) => {
    const item = resolveLine(line)
    return item ? [{ line, item }] : []
  })

  if (rows.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border-2 border-dashed border-ink p-10 text-center">
        <p className="text-lg">Your cart is empty. The road is not.</p>
        <Link
          href="/slogans"
          className="mt-4 inline-block rounded-full border-2 border-ink bg-volt px-6 py-3 font-bold"
        >
          Find your message
        </Link>
      </div>
    )
  }

  const subtotal = rows.reduce((n, r) => n + r.item.unit * r.line.qty, 0)
  const shipping = shippingFor(subtotal)

  return (
    <div className="mt-8 grid gap-8 md:grid-cols-[1fr_280px]">
      <ul className="divide-y-2 divide-ink rounded-2xl border-2 border-ink bg-white">
        {rows.map(({ line, item }) => (
          <li
            key={`${line.item}|${line.slogan}|${line.custom}|${line.color}|${line.size}`}
            className="flex gap-4 p-4"
          >
            <ProductArt
              art={item.art}
              slogan={item.text}
              color={item.color.hex}
              ink={item.color.ink}
              sign={item.sign}
              className="size-20 shrink-0"
            />
            <div className="flex-1">
              <Link href={item.href} className="font-semibold hover:underline">
                {item.title}
              </Link>
              <p className="text-sm text-muted">{item.detail}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty(line, line.qty - 1)}
                  className="size-8 rounded border-2 border-ink font-bold"
                >
                  −
                </button>
                <span className="w-6 text-center">{line.qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty(line, line.qty + 1)}
                  className="size-8 rounded border-2 border-ink font-bold"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => setQty(line, 0)}
                  className="ml-2 text-sm text-muted underline"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="font-bold">{formatPrice(item.unit * line.qty)}</p>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-2xl border-2 border-ink bg-white p-5">
        <dl className="space-y-2">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between border-t-2 border-ink pt-2 text-lg font-bold">
            <dt>Total</dt>
            <dd>{formatPrice(subtotal + shipping)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-sm text-muted">
          {charityAmount} of this order goes to {charityName}.
        </p>
        {shipping > 0 && (
          <p className="mt-3 text-sm text-muted">
            Add {formatPrice(FREE_SHIPPING_FROM - subtotal)} more for free shipping.
          </p>
        )}
        <Link
          href="/checkout"
          className="mt-5 block rounded-full border-2 border-ink bg-ink px-6 py-3 text-center font-bold text-volt hover:bg-asphalt"
        >
          Checkout
        </Link>
      </aside>
    </div>
  )
}
