import type { Metadata } from 'next'
import Link from 'next/link'
import ItemCard from '@/components/ItemCard'
import {
  COLLECTIONS,
  collections,
  collectionTag,
  designHref,
  formatPrice,
  garments,
  sloganTemplate,
  sloganText,
  slogans,
  type Collection,
} from '@/lib/catalog'

export const metadata: Metadata = { title: 'Slogans — Wide Pass' }

const vest = garments.find((g) => g.id === 'vest')!

export default async function SlogansPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams
  const collection = COLLECTIONS.find((c) => c === sp.collection) as Collection | undefined
  const list = slogans.filter((s) => !collection || s.collection === collection)
  const from = Math.min(...garments.map((g) => g.price))

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-sm font-bold tracking-widest uppercase">Step 1: pick a message</p>
      <h1 className="mt-1 font-display text-4xl uppercase">
        {collection ? collections[collection].label : 'All slogans'}
      </h1>
      <p className="mt-2 max-w-xl text-asphalt">
        {collection
          ? collections[collection].blurb
          : 'Choose a slogan, then put it on a hi-vis vest or a tee. Some you can personalise.'}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {[undefined, ...COLLECTIONS].map((c) => (
          <Link
            key={c ?? 'all'}
            href={c ? `/slogans?collection=${c}` : '/slogans'}
            className={`rounded-full border-2 border-ink px-4 py-1.5 text-sm font-semibold ${
              c === collection ? 'bg-ink text-volt' : 'bg-white hover:bg-volt'
            }`}
          >
            {c ? collections[c].label : 'Everything'}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s, i) => {
          const c = vest.colors[i % vest.colors.length]
          return (
            <ItemCard
              key={s.id}
              href={designHref({ slogan: s.id })}
              art="vest"
              text={sloganText(s)}
              color={c.hex}
              ink={c.ink}
              sign={s.sign}
              tag={{
                label: collections[s.collection].label,
                className: collectionTag[s.collection],
              }}
              badge={s.personalise ? 'Personalise it' : undefined}
              title={`“${sloganTemplate(s)}”`}
              subtitle="Vest or tee"
              price={`from ${formatPrice(from)}`}
            />
          )
        })}
      </div>
    </div>
  )
}
