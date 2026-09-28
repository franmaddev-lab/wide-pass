'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import FavouriteButton from './FavouriteButton'
import ProductArt, { hasPhoto, photoColor } from './ProductArt'
import ShareButton from './ShareButton'
import {
  collections,
  collectionTag,
  designHref,
  formatPrice,
  garments,
  getGarment,
  getSlogan,
  shareHref,
  sloganTemplate,
  sloganText,
  type GarmentId,
} from '@/lib/catalog'

// The t-shirt is the default preview; swipe for the tank and long sleeve.
// Hi-vis items aren't shown here (they're still available on the design page).
const FIRST = 'tee'
const HI_VIS_IDS = ['vest', 'jacket', 'raincover']
const SLIDES = [
  ...garments.filter((g) => g.id === FIRST),
  ...garments.filter((g) => g.id !== FIRST && !HI_VIS_IDS.includes(g.id)),
].filter((g) => hasPhoto(g.art, g.colors[0].hex, 'x')) // only items with a product photo

// A slogan card whose preview can be swiped to see the slogan on each product.
// With `only`, it shows just that garment (no swiping).
export default function SloganCard({
  sloganId,
  likes = 0,
  only,
}: {
  sloganId: string
  likes?: number
  only?: GarmentId
}) {
  const slogan = getSlogan(sloganId)!
  const slides = only ? [getGarment(only)!] : SLIDES
  const [index, setIndex] = useState(0)
  const track = useRef<HTMLDivElement>(null)
  const garment = slides[index]
  const title = `“${sloganTemplate(slogan)}”`

  function go(i: number) {
    const el = track.current
    if (!el) return
    const next = (i + slides.length) % slides.length
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border-2 border-ink bg-white transition hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-ink)]">
      <div
        ref={track}
        onScroll={(e) => {
          const el = e.currentTarget
          setIndex(Math.round(el.scrollLeft / el.clientWidth))
        }}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto bg-white"
      >
        {slides.map((g) => {
          const c = photoColor(g.art, g.colors, sloganText(slogan))
          return (
            <Link
              key={g.id}
              href={designHref({ slogan: slogan.id, garment: g.id })}
              aria-label={`${title} on ${g.withArticle}`}
              className="block w-full shrink-0 snap-center p-6"
            >
              <ProductArt
                art={g.art}
                slogan={sloganText(slogan)}
                color={c.hex}
                ink={c.ink}
                sign={slogan.sign}
                className="mx-auto aspect-square w-full max-w-60"
              />
            </Link>
          )
        })}
      </div>

      <span
        className={`absolute top-3 left-3 rounded-full border border-ink px-2 py-0.5 text-xs font-bold uppercase ${collectionTag[slogan.collection]}`}
      >
        {collections[slogan.collection].label}
      </span>
      <div className="absolute top-3 right-3 flex gap-2">
        <FavouriteButton item={`slogan:${slogan.id}`} label={title} />
        <ShareButton
          path={shareHref({ slogan: slogan.id, garment: garment.id })}
          text={`“${sloganTemplate(slogan)}” Make yours:`}
        />
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous product"
            className="absolute top-1/3 left-2 hidden size-9 place-items-center rounded-full border-2 border-ink bg-white font-bold opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100 md:grid"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next product"
            className="absolute top-1/3 right-2 hidden size-9 place-items-center rounded-full border-2 border-ink bg-white font-bold opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100 md:grid"
          >
            ›
          </button>
          <div className="flex justify-center gap-1.5 bg-white pb-3">
            {slides.map((g, i) => (
              <button
                key={g.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show on ${g.withArticle}`}
                aria-current={i === index ? 'true' : undefined}
                className="grid size-5 place-items-center"
              >
                <span
                  className={`block rounded-full transition-all ${
                    i === index ? 'h-2 w-5 bg-ink' : 'size-2 bg-ink/25'
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}

      <Link
        href={designHref({ slogan: slogan.id, garment: garment.id })}
        className="flex items-start justify-between gap-2 border-t-2 border-ink p-4"
      >
        <div>
          <p className="font-semibold group-hover:underline">{title}</p>
          <p className="text-sm text-muted">{garment.name}</p>
          {likes > 0 && (
            <p className="mt-1 text-xs font-bold">
              ♥ {likes} {likes === 1 ? 'favourite' : 'favourites'}
            </p>
          )}
        </div>
        <p className="font-bold whitespace-nowrap">{formatPrice(garment.price)}</p>
      </Link>
    </div>
  )
}
