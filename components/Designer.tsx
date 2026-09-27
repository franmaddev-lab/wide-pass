'use client'

import Link from 'next/link'
import { useState } from 'react'
import FavouriteButton from './FavouriteButton'
import ProductArt from './ProductArt'
import RealPhotos from './RealPhotos'
import { addToCart } from '@/lib/cart'
import {
  cleanCustom,
  formatPrice,
  garments,
  getGarment,
  getSlogan,
  sloganTemplate,
  sloganText,
  type GarmentId,
} from '@/lib/catalog'

// The slogan is already chosen when you land here. The only things left to pick are
// the product, the personalised word (if the slogan has one), and colour & size.

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  const cls = 'block text-sm font-bold uppercase'
  return htmlFor ? (
    <label htmlFor={htmlFor} className={cls}>
      {children}
    </label>
  ) : (
    <p className={cls}>{children}</p>
  )
}

export default function Designer({
  initialGarment,
  sloganId,
  initialText,
}: {
  initialGarment: GarmentId
  sloganId: string
  initialText?: string
}) {
  const slogan = getSlogan(sloganId)!
  const [garmentId, setGarmentId] = useState<GarmentId>(initialGarment)
  const [custom, setCustom] = useState(initialText ?? '')
  const [colorName, setColorName] = useState(getGarment(initialGarment)!.colors[0].name)
  const [size, setSize] = useState('')
  const [status, setStatus] = useState<'idle' | 'added' | 'no-size'>('idle')
  const [showMore, setShowMore] = useState(false)

  const garment = getGarment(garmentId)!
  const color = garment.colors.find((c) => c.name === colorName) ?? garment.colors[0]
  const cleaned = cleanCustom(slogan, custom)
  const invalid = cleaned === null
  const text = sloganText(slogan, invalid ? undefined : cleaned)

  function change(fn: () => void) {
    fn()
    setStatus('idle')
  }

  function add() {
    if (!size) return setStatus('no-size')
    if (invalid) return
    addToCart({
      item: garment.id,
      slogan: slogan.id,
      custom: slogan.personalise ? (cleaned ?? undefined) : undefined,
      color: color.name,
      size,
      qty: 1,
    })
    setStatus('added')
  }

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="md:sticky md:top-20 md:self-start">
        <div className="relative rounded-2xl border-2 border-ink bg-white p-8">
          <ProductArt
            art={garment.art}
            slogan={text}
            color={color.hex}
            ink={color.ink}
            sign={slogan.sign}
            className="mx-auto aspect-square w-full max-w-md"
          />
          <FavouriteButton
            item={`slogan:${slogan.id}`}
            label={`“${sloganTemplate(slogan)}”`}
            className="absolute top-3 right-3"
          />
        </div>
      </div>

      <div className="space-y-7">
        <div>
          <h1 className="font-display text-3xl uppercase sm:text-4xl">“{text}”</h1>
          <p className="mt-2 text-2xl font-bold">{formatPrice(garment.price)}</p>
        </div>

        {slogan.personalise && (
          <div>
            <Label htmlFor="custom">{slogan.personalise.label}</Label>
            <input
              id="custom"
              value={custom}
              maxLength={slogan.personalise.maxLength}
              placeholder={slogan.personalise.default}
              onChange={(e) => change(() => setCustom(e.target.value))}
              aria-invalid={invalid}
              aria-describedby={invalid ? 'custom-error' : undefined}
              className="mt-2 block w-full rounded-lg border-2 border-ink bg-white px-3 py-2 text-lg"
            />
            {invalid && (
              <p id="custom-error" className="mt-1 text-sm font-bold">
                Letters, numbers and simple punctuation only.
              </p>
            )}
            <div id="word-ideas" className="mt-2 flex flex-wrap gap-2">
              {[
                ...slogan.personalise.suggestions,
                ...(showMore ? (slogan.personalise.more ?? []) : []),
              ].map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={cleaned === s}
                  onClick={() => change(() => setCustom(s))}
                  className={`rounded-full border-2 border-ink px-3 py-1 text-sm font-semibold ${
                    cleaned === s ? 'bg-ink text-volt' : 'bg-white hover:bg-volt'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {slogan.personalise.more && (
              <button
                type="button"
                onClick={() => setShowMore((v) => !v)}
                aria-expanded={showMore}
                aria-controls="word-ideas"
                className="mt-3 text-sm font-semibold underline"
              >
                {showMore ? 'See fewer' : `See more (${slogan.personalise.more.length})`}
              </button>
            )}
          </div>
        )}

        <div>
          <Label>Print it on</Label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {garments.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={g.id === garmentId}
                onClick={() =>
                  change(() => {
                    setGarmentId(g.id)
                    if (!g.colors.some((c) => c.name === colorName)) setColorName(g.colors[0].name)
                  })
                }
                className={`flex flex-col items-center gap-1 rounded-xl border-2 border-ink px-1 py-2 text-center ${
                  g.id === garmentId ? 'bg-volt' : 'bg-white hover:bg-paper'
                }`}
              >
                <ProductArt
                  art={g.art}
                  slogan=""
                  color={g.colors[0].hex}
                  ink={g.colors[0].ink}
                  className="size-10 shrink-0"
                />
                <span className="text-xs leading-tight font-bold">{g.name}</span>
                <span className="text-xs">{formatPrice(g.price)}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Colour: {color.name}</Label>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {garment.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => change(() => setColorName(c.name))}
                aria-label={c.name}
                aria-pressed={c.name === color.name}
                title={c.name}
                className={`size-11 rounded-full border-2 border-ink ${
                  c.name === color.name ? 'ring-4 ring-ink ring-offset-2' : ''
                }`}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </div>

        <div>
          <Label>Size</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {garment.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => change(() => setSize(s))}
                aria-pressed={s === size}
                className={`min-w-12 rounded-lg border-2 border-ink px-3 py-2 font-semibold ${
                  s === size ? 'bg-ink text-volt' : 'bg-white hover:bg-volt'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={add}
            disabled={invalid}
            className="w-full rounded-full border-2 border-ink bg-volt px-6 py-4 font-display text-lg uppercase hover:shadow-[4px_4px_0_var(--color-ink)] disabled:opacity-50"
          >
            Add to cart
          </button>
          {status === 'no-size' && (
            <p role="alert" className="mt-3 font-bold">
              Pick a size first.
            </p>
          )}
          {status === 'added' && (
            <p role="status" className="mt-3">
              Added!{' '}
              <Link href="/cart" className="font-semibold underline">
                Go to cart
              </Link>
            </p>
          )}
        </div>
      </div>

      <RealPhotos garment={garment.id} title="On the road" limit={2} className="md:col-span-2" />
    </div>
  )
}
