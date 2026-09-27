'use client'

import Link from 'next/link'
import ItemCard from './ItemCard'
import SloganCard from './SloganCard'
import { useFavourites } from '@/lib/favourites'
import { collections, collectionTag, formatPrice, getGadget, getSlogan } from '@/lib/catalog'

export default function FavouritesList() {
  const favourites = useFavourites()

  const cards = favourites.flatMap((key) => {
    const [kind, id] = key.split(':')
    if (kind === 'slogan') {
      return getSlogan(id) ? [<SloganCard key={key} sloganId={id} />] : []
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
