'use client'

import Link from 'next/link'
import { useState } from 'react'
import ProductArt from './ProductArt'
import { addToCart } from '@/lib/cart'
import type { Gadget } from '@/lib/catalog'

export default function ProductPicker({
  product,
  children,
}: {
  product: Gadget
  children: React.ReactNode
}) {
  const [color, setColor] = useState(product.colors[0])
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : '')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState('')

  function add() {
    if (!size) {
      setError('Pick a size first.')
      return
    }
    addToCart({ item: product.slug, color: color.name, size, qty })
    setError('')
    setAdded(true)
  }

  return (
    <>
      <div className="rounded-2xl border-2 border-ink bg-white p-8">
        <ProductArt
          art={product.art}
          slogan={product.slogan}
          color={color.hex}
          ink={color.ink}
          sign={product.sign}
          className="mx-auto aspect-square w-full max-w-md"
        />
      </div>

      <div>
        {children}

        <fieldset className="mt-6">
          <legend className="text-sm font-bold uppercase">Colour: {color.name}</legend>
          <div className="mt-2 flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColor(c)}
                aria-label={c.name}
                aria-pressed={c.name === color.name}
                className={`size-10 rounded-full border-2 border-ink ${
                  c.name === color.name ? 'ring-4 ring-signal' : ''
                }`}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </fieldset>

        {product.sizes.length > 1 && (
          <fieldset className="mt-6">
            <legend className="text-sm font-bold uppercase">Size</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s)
                    setError('')
                  }}
                  aria-pressed={s === size}
                  className={`min-w-12 rounded-lg border-2 border-ink px-3 py-2 font-semibold ${
                    s === size ? 'bg-ink text-volt' : 'bg-white hover:bg-volt'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-6 flex items-center gap-3">
          <label className="text-sm font-bold uppercase" htmlFor="qty">
            Qty
          </label>
          <select
            id="qty"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="rounded-lg border-2 border-ink bg-white px-3 py-2"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={add}
          className="mt-6 w-full rounded-full border-2 border-ink bg-volt px-6 py-4 font-display text-lg uppercase hover:shadow-[4px_4px_0_var(--color-ink)] sm:w-auto"
        >
          Add to cart
        </button>
        {error && (
          <p role="alert" className="mt-3 font-semibold text-signal">
            {error}
          </p>
        )}
        {added && (
          <p role="status" className="mt-3">
            Added!{' '}
            <Link href="/cart" className="font-semibold underline">
              Go to cart
            </Link>
          </p>
        )}
      </div>
    </>
  )
}
