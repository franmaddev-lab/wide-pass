'use client'

import Link from 'next/link'
import ItemCard from './ItemCard'
import { useFavourites } from '@/lib/favourites'
import {
  collections,
  collectionTag,
  designHref,
  formatPrice,
  garments,
  getGadget,
  getSlogan,
  sloganTemplate,
  sloganText,
} from '@/lib/catalog'

const vest = garments.find((g) => g.id === 'vest')!
const from = Math.min(...garments.map((g) => g.price))

export default function FavouritesList() {
  const favourites = useFavourites()

  const cards = favourites.flatMap((key, i) => {
    const [kind, id] = key.split(':')
    if (kind === 'slogan') {
      const s = getSlogan(id)
      if (!s) return []
      const c = vest.colors[i % vest.colors.length]
      return [
        <ItemCard
          key={key}
          href={designHref({ slogan: s.id })}
          art="vest"
          text={sloganText(s)}
          color={c.hex}
          ink={c.ink}
          sign={s.sign}
          tag={{ label: collections[s.collection].label, className: collectionTag[s.collection] }}
          badge={s.personalise ? 'Personalise it' : undefined}
          title={`“${sloganTemplate(s)}”`}
          subtitle="Vest or tee"
          price={`from ${formatPrice(from)}`}
          favourite={key}
        />,
      ]
    }
    const g = kind === 'gadget' ? getGadget(id) : undefined
    if (!g) return []
    return [
      <ItemCard
        key={key}
        href={`/shop/${g.slug}`}
        art={g.art}
        text={g.slogan}
        color={g.colors[0].hex}
        ink={g.colors[0].ink}
        sign={g.sign}
        tag={{ label: collections[g.collection].label, className: collectionTag[g.collection] }}
        title={g.name}
        subtitle={`“${g.slogan}”`}
        price={formatPrice(g.price)}
        favourite={key}
      />,
    ]
  })

  if (cards.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border-2 border-dashed border-ink p-10 text-center">
        <p className="text-lg">
          No favourites yet. Tap the ♥ on any slogan or gadget to save it here.
        </p>
        <Link
          href="/slogans"
          className="mt-4 inline-block rounded-full border-2 border-ink bg-volt px-6 py-3 font-bold"
        >
          Browse slogans
        </Link>
      </div>
    )
  }

  return (
    <>
      <p className="mt-6 text-sm text-muted">
        {cards.length} saved {cards.length === 1 ? 'item' : 'items'}
      </p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{cards}</div>
    </>
  )
}
