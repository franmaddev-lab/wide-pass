import type { Metadata } from 'next'
import Link from 'next/link'
import SloganCard from '@/components/SloganCard'
import { likeCounts } from '@/lib/store'
import {
  COLLECTIONS,
  collections,
  getGarment,
  sloganTemplate,
  sloganText,
  slogans,
  type Collection,
} from '@/lib/catalog'

export const metadata: Metadata = { title: 'Slogans — Wide Pass' }

const position = new Map(slogans.map((s, i) => [s.id, i]))

// "Customisable" sits with the collections as a filter: slogans with a blank to fill in
const CUSTOM = 'custom'
const CUSTOM_LABEL = 'Customisable'
const CUSTOM_BLURB = 'Fill in the blank with your own word: “I could be your ___”.'
type Filter = Collection | typeof CUSTOM
const FILTERS: Filter[] = [...COLLECTIONS, CUSTOM]
const filterLabel = (f: Filter) => (f === CUSTOM ? CUSTOM_LABEL : collections[f].label)

const SORTS = {
  featured: 'Featured',
  popular: 'Most popular',
  new: 'Newest',
  az: 'A–Z',
} as const
type Sort = keyof typeof SORTS

export default async function SlogansPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams
  const collection = FILTERS.find((c) => c === sp.collection)
  const query = typeof sp.q === 'string' ? sp.q.trim().slice(0, 60) : ''
  const q = query.toLowerCase()
  const sort: Sort =
    typeof sp.sort === 'string' && sp.sort in SORTS ? (sp.sort as Sort) : 'featured'
  // Arriving from /shop with a garment already chosen
  const garment = getGarment(typeof sp.garment === 'string' ? sp.garment : undefined)
  const likes = await likeCounts().catch(() => ({}) as Record<string, number>)
  const likesOf = (id: string) => likes[`slogan:${id}`] ?? 0

  const list = slogans.filter(
    (s) =>
      (!collection ||
        (collection === CUSTOM ? Boolean(s.personalise) : s.collection === collection)) &&
      (!q || sloganTemplate(s).toLowerCase().includes(q))
  )
  const pos = (id: string) => position.get(id) ?? 0
  if (sort === 'popular')
    list.sort((a, b) => likesOf(b.id) - likesOf(a.id) || pos(a.id) - pos(b.id))
  // Slogans are appended to the catalogue as they're added, so later = newer
  if (sort === 'new') list.sort((a, b) => pos(b.id) - pos(a.id))
  if (sort === 'az') list.sort((a, b) => sloganText(a).localeCompare(sloganText(b)))

  const link = (next: { c?: Filter; sort?: Sort; q?: string }) => {
    const p = new URLSearchParams()
    const search = next.q ?? query
    if (next.c) p.set('collection', next.c)
    if (search) p.set('q', search)
    if (next.sort && next.sort !== 'featured') p.set('sort', next.sort)
    if (garment) p.set('garment', garment.id)
    const str = p.toString()
    return str ? `/slogans?${str}` : '/slogans'
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-sm font-bold tracking-widest uppercase">
        {garment ? `Pick your message for your ${garment.name.toLowerCase()}` : 'Pick your message'}
      </p>
      <h1 className="mt-1 font-display text-3xl uppercase min-[360px]:text-4xl">
        {collection ? filterLabel(collection) : 'Slogans'}
      </h1>
      <p className="mt-2 max-w-xl text-asphalt">
        {collection === CUSTOM
          ? CUSTOM_BLURB
          : collection
            ? collections[collection].blurb
            : 'Choose the words, then what to print them on. Swipe a card to see it on all the gear.'}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {[undefined, ...FILTERS].map((c) => (
          <Link
            key={c ?? 'all'}
            href={link({ c, sort })}
            className={`rounded-full border-2 border-ink px-4 py-1.5 text-sm font-semibold ${
              c === collection ? 'bg-ink text-volt' : 'bg-white hover:bg-volt'
            }`}
          >
            {c ? filterLabel(c) : 'Everything'}
          </Link>
        ))}
        <Link
          href="/favourites"
          className="rounded-full border-2 border-ink bg-white px-4 py-1.5 text-sm font-semibold hover:bg-volt"
        >
          ♥ My favourites
        </Link>
      </div>

      <form action="/slogans" className="mt-4 flex max-w-xl gap-2">
        {collection && <input type="hidden" name="collection" value={collection} />}
        {sort !== 'featured' && <input type="hidden" name="sort" value={sort} />}
        {garment && <input type="hidden" name="garment" value={garment.id} />}
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

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {list.length} {list.length === 1 ? 'slogan' : 'slogans'}
          {query && (
            <>
              {' '}
              for “{query}” ·{' '}
              <Link href={link({ c: collection, sort, q: '' })} className="underline">
                clear
              </Link>
            </>
          )}
        </p>
        <nav aria-label="Sort slogans" className="flex flex-wrap items-center gap-1 text-sm">
          <span className="mr-1 font-semibold">Sort:</span>
          {(Object.keys(SORTS) as Sort[]).map((key) => (
            <Link
              key={key}
              href={link({ c: collection, sort: key })}
              aria-current={key === sort ? 'true' : undefined}
              className={`rounded-full px-3 py-1 font-semibold ${
                key === sort ? 'bg-ink text-volt' : 'hover:bg-volt'
              }`}
            >
              {SORTS[key]}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <SloganCard key={s.id} sloganId={s.id} likes={likesOf(s.id)} only={garment?.id} />
        ))}
      </div>
    </div>
  )
}
