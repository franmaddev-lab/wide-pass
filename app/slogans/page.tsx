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
  const query = typeof sp.q === 'string' ? sp.q.trim().slice(0, 60) : ''
  const q = query.toLowerCase()
  const list = slogans.filter(
    (s) =>
      (!collection || s.collection === collection) &&
      (!q || sloganTemplate(s).toLowerCase().includes(q))
  )
  const link = (c?: Collection) => {
    const p = new URLSearchParams()
    if (c) p.set('collection', c)
    if (query) p.set('q', query)
    const str = p.toString()
    return str ? `/slogans?${str}` : '/slogans'
  }
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
            href={link(c)}
            className={`rounded-full border-2 border-ink px-4 py-1.5 text-sm font-semibold ${
              c === collection ? 'bg-ink text-volt' : 'bg-white hover:bg-volt'
            }`}
          >
            {c ? collections[c].label : 'Everything'}
          </Link>
        ))}
      </div>

      <form action="/slogans" className="mt-4 flex max-w-xl gap-2">
        {collection && <input type="hidden" name="collection" value={collection} />}
        <label htmlFor="q" className="sr-only">
          Search slogans
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={query}
          placeholder={`Search ${slogans.length} slogans…`}
          className="block w-full rounded-full border-2 border-ink bg-white px-4 py-2"
        />
        <button
          type="submit"
          className="rounded-full border-2 border-ink bg-ink px-5 py-2 font-semibold text-volt"
        >
          Search
        </button>
      </form>

      <p className="mt-4 text-sm text-muted">
        {list.length} {list.length === 1 ? 'slogan' : 'slogans'}
        {query && (
          <>
            {' '}
            for “{query}” ·{' '}
            <Link
              href={collection ? `/slogans?collection=${collection}` : '/slogans'}
              className="underline"
            >
              clear
            </Link>
          </>
        )}
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
