'use client'

import Link from 'next/link'
import { useState } from 'react'
import FavouriteButton from './FavouriteButton'
import ProductArt from './ProductArt'
import { addToCart } from '@/lib/cart'
import {
  cleanCustom,
  COLLECTIONS,
  collections,
  formatPrice,
  garments,
  getGarment,
  getSlogan,
  sloganTemplate,
  sloganText,
  slogans,
  type Collection,
  type GarmentId,
} from '@/lib/catalog'

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t-2 border-ink pt-5">
      <h2 className="flex items-center gap-3 font-display text-xl uppercase">
        <span className="grid size-8 place-items-center rounded-full bg-ink text-sm text-volt">
          {n}
        </span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

const pill = (active: boolean) =>
  `rounded-full border-2 border-ink px-4 py-2 text-sm font-semibold ${
    active ? 'bg-ink text-volt' : 'bg-white hover:bg-volt'
  }`

export default function Designer({
  initialGarment,
  initialSlogan,
  initialText,
}: {
  initialGarment: GarmentId
  initialSlogan: string
  initialText?: string
}) {
  const [garmentId, setGarmentId] = useState<GarmentId>(initialGarment)
  const [sloganId, setSloganId] = useState(initialSlogan)
  const [custom, setCustom] = useState(initialText ?? '')
  const [filter, setFilter] = useState<Collection | undefined>(
    () => getSlogan(initialSlogan)?.collection
  )
  const [query, setQuery] = useState('')
  const [colorName, setColorName] = useState(getGarment(initialGarment)!.colors[0].name)
  const [size, setSize] = useState('')
  const [qty, setQty] = useState(1)
  const [status, setStatus] = useState<'idle' | 'added' | 'no-size'>('idle')

  const garment = getGarment(garmentId)!
  const slogan = getSlogan(sloganId) ?? slogans[0]
  const color = garment.colors.find((c) => c.name === colorName) ?? garment.colors[0]
  const cleaned = cleanCustom(slogan, custom)
  const invalid = cleaned === null
  const text = sloganText(slogan, invalid ? undefined : cleaned)
  const q = query.trim().toLowerCase()
  const shown = slogans.filter(
    (s) =>
      (!filter || s.collection === filter) && (!q || sloganTemplate(s).toLowerCase().includes(q))
  )

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
      qty,
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
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <p className="text-lg font-semibold">
            “{text}” <span className="text-muted">on {garment.withArticle}</span>
          </p>
          <p className="text-2xl font-bold">{formatPrice(garment.price)}</p>
        </div>
      </div>

      <div className="space-y-8">
        <Step n={1} title="Pick your gear">
          <div className="grid grid-cols-2 gap-3">
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
                className={`flex items-center gap-3 rounded-xl border-2 border-ink p-3 text-left ${
                  g.id === garmentId ? 'bg-volt shadow-[4px_4px_0_var(--color-ink)]' : 'bg-white'
                }`}
              >
                <ProductArt
                  art={g.art}
                  slogan=""
                  color={g.colors[0].hex}
                  ink={g.colors[0].ink}
                  className="size-14 shrink-0"
                />
                <span>
                  <span className="block font-bold">{g.name}</span>
                  <span className="text-sm">{formatPrice(g.price)}</span>
                </span>
              </button>
            ))}
          </div>
        </Step>

        <Step n={2} title="Pick your message">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={pill(!filter)}
              aria-pressed={!filter}
              onClick={() => setFilter(undefined)}
            >
              All
            </button>
            {COLLECTIONS.map((c) => (
              <button
                key={c}
                type="button"
                className={pill(filter === c)}
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
              >
                {collections[c].label}
              </button>
            ))}
          </div>
          <label htmlFor="slogan-search" className="sr-only">
            Search slogans
          </label>
          <input
            id="slogan-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${slogans.length} slogans…`}
            className="mt-3 block w-full rounded-lg border-2 border-ink bg-white px-3 py-2"
          />
          <p className="mt-2 text-sm text-muted" aria-live="polite">
            {shown.length} {shown.length === 1 ? 'slogan' : 'slogans'}
          </p>
          <ul className="mt-2 max-h-[28rem] space-y-2 overflow-y-auto pr-1">
            {shown.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  aria-pressed={s.id === slogan.id}
                  onClick={() => change(() => setSloganId(s.id))}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left font-semibold ${
                    s.id === slogan.id
                      ? 'border-ink bg-ink text-volt'
                      : 'border-ink/20 bg-white hover:border-ink'
                  }`}
                >
                  <span>“{sloganTemplate(s)}”</span>
                  {s.personalise && (
                    <span className="shrink-0 rounded-md bg-signal px-2 py-0.5 text-xs text-ink uppercase">
                      Personalise
                    </span>
                  )}
                  {s.sign && (
                    <span className="shrink-0 rounded-md bg-sign px-2 py-0.5 text-xs text-white uppercase">
                      Sign
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {slogan.personalise && (
            <div className="mt-5 rounded-xl border-2 border-ink bg-volt p-4">
              <label htmlFor="custom" className="font-bold">
                {slogan.personalise.label}
              </label>
              <input
                id="custom"
                value={custom}
                maxLength={slogan.personalise.maxLength}
                placeholder={slogan.personalise.default}
                onChange={(e) => change(() => setCustom(e.target.value))}
                aria-invalid={invalid}
                aria-describedby="custom-help"
                className="mt-2 block w-full rounded-lg border-2 border-ink bg-white px-3 py-2 text-lg"
              />
              <p id="custom-help" className={`mt-1 text-sm ${invalid ? 'font-semibold' : ''}`}>
                {invalid
                  ? 'Letters, numbers and simple punctuation only.'
                  : `Up to ${slogan.personalise.maxLength} characters.`}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {slogan.personalise.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => change(() => setCustom(s))}
                    className="rounded-full border-2 border-ink bg-white px-3 py-1 text-sm font-semibold hover:bg-paper"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Step>

        <Step n={3} title="Colour & size">
          <p className="text-sm font-bold uppercase">Colour: {color.name}</p>
          <div className="mt-2 flex gap-2">
            {garment.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => change(() => setColorName(c.name))}
                aria-label={c.name}
                aria-pressed={c.name === color.name}
                className={`size-11 rounded-full border-2 border-ink ${
                  c.name === color.name ? 'ring-4 ring-signal' : ''
                }`}
                style={{ background: c.hex }}
              />
            ))}
          </div>
          <p className="mt-5 text-sm font-bold uppercase">Size</p>
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
          <div className="mt-5 flex items-center gap-3">
            <label className="text-sm font-bold uppercase" htmlFor="qty">
              Qty
            </label>
            <select
              id="qty"
              value={qty}
              onChange={(e) => change(() => setQty(Number(e.target.value)))}
              className="rounded-lg border-2 border-ink bg-white px-3 py-2"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
        </Step>

        <div>
          <button
            type="button"
            onClick={add}
            disabled={invalid}
            className="w-full rounded-full border-2 border-ink bg-volt px-6 py-4 font-display text-lg uppercase hover:shadow-[4px_4px_0_var(--color-ink)] disabled:opacity-50"
          >
            Add to cart · {formatPrice(garment.price * qty)}
          </button>
          {status === 'no-size' && (
            <p role="alert" className="mt-3 font-semibold text-sign">
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
    </div>
  )
}
