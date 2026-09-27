import type { Metadata } from 'next'
import Link from 'next/link'
import ItemCard from '@/components/ItemCard'
import ProductArt from '@/components/ProductArt'
import {
  collections,
  collectionTag,
  formatPrice,
  gadgets,
  garments,
} from '@/lib/catalog'

export const metadata: Metadata = { title: 'Shop — Wide Pass' }

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-sm font-bold tracking-widest uppercase">Step 1: pick your gear</p>
      <h1 className="mt-1 font-display text-4xl uppercase">Shop</h1>
      <p className="mt-2 max-w-xl text-asphalt">
        Start with a vest or a tee, then choose the message that goes on it. Prefer to start from a
        slogan?{' '}
        <Link href="/slogans" className="font-semibold underline">
          Browse slogans
        </Link>
        .
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {garments.map((g) => (
          <Link
            key={g.id}
            href={`/slogans?garment=${g.id}`}
            className="group flex items-center gap-6 rounded-2xl border-2 border-ink bg-volt p-6 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-ink)]"
          >
            <ProductArt
              art={g.art}
              slogan="Your message here"
              color={g.colors[g.id === 'vest' ? 1 : 0].hex}
              ink={g.colors[g.id === 'vest' ? 1 : 0].ink}
              className="size-36 shrink-0"
            />
            <div>
              <p className="font-display text-2xl uppercase">{g.name}</p>
              <p className="mt-1 text-sm">{g.description}</p>
              <p className="mt-3 font-bold">
                {formatPrice(g.price)} · {g.colors.length} colours
              </p>
              <p className="mt-3 inline-block rounded-full bg-ink px-4 py-2 text-sm font-bold text-volt group-hover:bg-asphalt">
                Choose a slogan →
              </p>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="mt-14 font-display text-3xl uppercase">Gadgets</h2>
      <p className="mt-1 text-asphalt">Ready-made, no design needed.</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gadgets.map((g) => (
          <ItemCard
            key={g.slug}
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
            favourite={`gadget:${g.slug}`}
          />
        ))}
      </div>
    </div>
  )
}
