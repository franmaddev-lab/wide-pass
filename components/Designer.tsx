'use client'

import Link from 'next/link'
import { useState } from 'react'
import FavouriteButton from './FavouriteButton'
import ProductArt, { photoBg, photoColor } from './ProductArt'
import ShareButton from './ShareButton'
import SizeChart from './SizeChart'
import { addToCart } from '@/lib/cart'
import {
  cleanCustom,
  colorsFor,
  fitLabel,
  isWomanWearer,
  formatPrice,
  garments,
  getGarment,
  shareHref,
  getSlogan,
  sloganTemplate,
  printText,
  sloganText,
  type Fit,
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
  // Start on a colour that has a photo for this slogan (a woman's slogan picks a
  // colour we have a woman's photo for)
  const [colorName, setColorName] = useState(() => {
    const g = getGarment(initialGarment)!
    const s = getSlogan(sloganId)!
    return photoColor(
      g.art,
      colorsFor(g, s),
      sloganText(s, cleanCustom(s, initialText) ?? undefined)
    ).name
  })
  const [size, setSize] = useState('')
  const [status, setStatus] = useState<'idle' | 'added' | 'no-size'>('idle')
  const [showMore, setShowMore] = useState(false)
  const [showSizes, setShowSizes] = useState(false)
  // null = follow the slogan (women's fit for "I could be your sister"), until the customer picks
  const [fitChoice, setFitChoice] = useState<Fit | null>(null)

  const garment = getGarment(garmentId)!
  const color = garment.colors.find((c) => c.name === colorName) ?? garment.colors[0]
  const cleaned = cleanCustom(slogan, custom)
  const invalid = cleaned === null
  const text = sloganText(slogan, invalid ? undefined : cleaned)
  const print = printText(slogan, invalid ? undefined : (cleaned ?? undefined))
  const fits = garment.fits ?? ['unisex']
  const fit: Fit = fits.includes('women')
    ? (fitChoice ?? (isWomanWearer(text) ? 'women' : 'unisex'))
    : 'unisex'

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
      fit: fit === 'women' ? 'women' : undefined,
      qty: 1,
    })
    setStatus('added')
  }

  return (
    <div className="grid gap-4 pb-24 md:grid-cols-2 md:gap-10 md:pb-0">
      {/* Pinned under the header so the preview stays in view while choosing */}
      <div className="sticky top-[58px] z-10 -mx-4 self-start bg-paper px-4 pt-2 pb-2 md:top-20 md:mx-0 md:p-0">
        <div
          className="relative rounded-2xl border-2 border-ink bg-white p-2 md:p-8"
          style={{ background: photoBg(garment.art, color.hex, text, fit) }}
        >
          {/* switching item or colour fades the new photo in once it has loaded */}
          <div>
            <ProductArt
              art={garment.art}
              slogan={print}
              color={color.hex}
              ink={color.ink}
              sign={slogan.sign}
              fit={fit}
              className="mx-auto aspect-square h-[20vh] max-w-md md:h-auto md:w-full"
            />
          </div>
          <div className="absolute top-2 right-2 flex gap-2 md:top-3 md:right-3">
            <FavouriteButton item={`slogan:${slogan.id}`} label={`“${sloganTemplate(slogan)}”`} />
            <ShareButton
              path={shareHref({
                slogan: slogan.id,
                custom: slogan.personalise && cleaned ? cleaned : undefined,
                garment: garment.id,
              })}
              text={`“${text}” Make yours:`}
            />
          </div>
        </div>
      </div>

      <div className="min-w-0 space-y-4 md:space-y-7">
        {/* on phones the price lives in the Add to cart bar, so the title gets the full width */}
        <div>
          <h1 className="font-display text-lg leading-tight uppercase sm:text-4xl">“{text}”</h1>
          <p className="hidden font-bold md:mt-2 md:block md:text-2xl">
            {formatPrice(garment.price)}
          </p>
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
              className="mt-1.5 block w-full rounded-lg border-2 border-ink bg-white px-3 py-1.5 text-base md:mt-2 md:py-2 md:text-lg"
            />
            {invalid && (
              <p id="custom-error" className="mt-1 text-sm font-bold">
                Letters, numbers and simple punctuation only.
              </p>
            )}
            <div
              id="word-ideas"
              className={`no-scrollbar mt-2 flex gap-1.5 md:flex-wrap md:gap-2 ${
                showMore ? 'flex-wrap' : '-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0'
              }`}
            >
              {[
                ...slogan.personalise.suggestions,
                ...(showMore ? (slogan.personalise.more ?? []) : []),
              ].map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={cleaned === s}
                  onClick={() => change(() => setCustom(s))}
                  className={`shrink-0 rounded-full border-2 border-ink px-3 py-1 text-sm font-semibold ${
                    cleaned === s ? 'bg-ink text-volt' : 'bg-white hover:bg-volt'
                  }`}
                >
                  {s}
                </button>
              ))}
              {slogan.personalise.more && (
                <button
                  type="button"
                  onClick={() => setShowMore((v) => !v)}
                  aria-expanded={showMore}
                  aria-controls="word-ideas"
                  className="shrink-0 rounded-full px-2 py-1 text-sm font-semibold whitespace-nowrap underline"
                >
                  {showMore ? 'See fewer' : `See more (${slogan.personalise.more.length})`}
                </button>
              )}
            </div>
          </div>
        )}

        <div>
          <Label>Print it on</Label>
          <div className="mt-1.5 grid grid-cols-3 gap-1.5 md:mt-2 md:gap-2">
            {garments.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={g.id === garmentId}
                onClick={() =>
                  change(() => {
                    setGarmentId(g.id)
                    if (!g.colors.some((c) => c.name === colorName))
                      setColorName(photoColor(g.art, colorsFor(g, slogan), text).name)
                  })
                }
                className={`flex flex-col items-center gap-0.5 rounded-xl border-2 border-ink px-1 py-1 text-center md:gap-1 md:py-2 ${
                  g.id === garmentId ? 'bg-volt' : 'bg-white hover:bg-paper'
                }`}
              >
                <ProductArt
                  art={g.art}
                  slogan=""
                  color={g.colors[0].hex}
                  ink={g.colors[0].ink}
                  className="size-7 shrink-0 md:size-10"
                />
                <span className="text-[11px] leading-tight font-bold md:text-xs">{g.name}</span>
                <span className="hidden text-xs md:block">{formatPrice(g.price)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 md:space-y-7">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-4 md:gap-x-10">
            <div>
              <Label>Colour: {color.name}</Label>
              <div className="mt-1.5 flex flex-wrap items-center gap-2 md:mt-2">
                {garment.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => change(() => setColorName(c.name))}
                    aria-label={c.name}
                    aria-pressed={c.name === color.name}
                    title={c.name}
                    className={`size-8 rounded-full border-2 border-ink md:size-11 ${
                      c.name === color.name ? 'ring-4 ring-ink ring-offset-2' : ''
                    }`}
                    // split dot: garment colour and print colour
                    style={{ background: `linear-gradient(135deg, ${c.hex} 50%, ${c.ink} 50%)` }}
                  />
                ))}
              </div>
            </div>

            {fits.length > 1 && (
              <div>
                <Label>Fit</Label>
                <div className="mt-1.5 flex gap-1 md:mt-2 md:gap-2" role="group" aria-label="Fit">
                  {fits.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => change(() => setFitChoice(f))}
                      aria-pressed={f === fit}
                      className={`rounded-lg border-2 border-ink px-2.5 py-1 text-sm font-semibold md:px-3 md:py-2 md:text-base ${
                        f === fit ? 'bg-ink text-volt' : 'bg-white hover:bg-volt'
                      }`}
                    >
                      {fitLabel[f]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <Label>Size{size ? `: ${size}` : ''}</Label>
              <button
                type="button"
                onClick={() => setShowSizes((v) => !v)}
                aria-expanded={showSizes}
                aria-controls="size-chart"
                className="text-xs font-semibold underline"
              >
                {showSizes ? 'Hide guide' : 'Size guide'}
              </button>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1 md:mt-2 md:gap-2">
              {garment.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => change(() => setSize(s))}
                  aria-pressed={s === size}
                  className={`min-w-8 rounded-lg border-2 border-ink px-1.5 py-1 text-sm font-semibold md:min-w-12 md:px-3 md:py-2 md:text-base ${
                    s === size ? 'bg-ink text-volt' : 'bg-white hover:bg-volt'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {showSizes && <SizeChart id="size-chart" garment={garment.id} />}

        {/* On phones this bar is pinned to the bottom of the screen */}
        <div className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-ink bg-paper px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:static md:border-0 md:p-0">
          {status === 'no-size' && (
            <p role="alert" className="mb-2 text-center font-bold md:order-last">
              Pick a size first.
            </p>
          )}
          <button
            type="button"
            onClick={add}
            disabled={invalid}
            className="w-full rounded-full border-2 border-ink bg-volt px-6 py-3 font-display text-lg uppercase hover:shadow-[4px_4px_0_var(--color-ink)] disabled:opacity-50 md:py-4"
          >
            Add to cart · {formatPrice(garment.price)}
          </button>
          {status === 'added' && (
            <p role="status" className="mt-2 text-center md:mt-3 md:text-left">
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
