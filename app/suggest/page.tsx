import type { Metadata } from 'next'
import Link from 'next/link'
import { deleteSuggestion } from '@/app/actions/community'
import SuggestForm from '@/components/SuggestForm'
import VoteButton from '@/components/VoteButton'
import WornGallery from '@/components/WornGallery'
import { listSuggestions, persistent, votedBy } from '@/lib/store'
import { currentVoter } from '@/lib/voter'

export const metadata: Metadata = { title: 'Suggest a slogan — Wide Pass' }

const SORTS = { top: 'Most votes', new: 'Newest' } as const
type Sort = keyof typeof SORTS

export default async function SuggestPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams
  const sort: Sort = sp.sort === 'new' ? 'new' : 'top'
  const adminKey =
    typeof sp.key === 'string' && process.env.ADMIN_KEY && sp.key === process.env.ADMIN_KEY
      ? sp.key
      : undefined

  const voter = await currentVoter()
  const [suggestions, mine] = await Promise.all([
    listSuggestions(),
    voter ? votedBy(voter) : Promise.resolve([] as string[]),
  ])
  const voted = new Set(mine)
  suggestions.sort((a, b) =>
    sort === 'new' ? b.createdAt - a.createdAt : b.votes - a.votes || b.createdAt - a.createdAt
  )

  const sortHref = (s: Sort) => {
    const p = new URLSearchParams()
    if (s !== 'top') p.set('sort', s)
    if (adminKey) p.set('key', adminKey)
    const str = p.toString()
    return str ? `/suggest?${str}` : '/suggest'
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl uppercase">Suggest a slogan</h1>
      <p className="mt-2 max-w-xl text-asphalt">
        Got a line that would make a driver slow down, smile or think? Post it, then vote for your
        favourites. The best ideas get printed.
      </p>

      <SuggestForm />

      {!persistent && (
        <p className="mt-6 rounded-xl border-2 border-dashed border-ink p-3 text-sm">
          Preview mode: ideas and votes are kept in memory and reset when the server restarts.
          Connect a database (see README) to keep them.
        </p>
      )}

      <WornGallery />

      <div className="mt-10 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-display text-2xl uppercase">
          Vote for your favourites <span className="text-muted">({suggestions.length})</span>
        </h2>
        <nav aria-label="Sort ideas" className="flex gap-1 text-sm">
          {(Object.keys(SORTS) as Sort[]).map((s) => (
            <Link
              key={s}
              href={sortHref(s)}
              aria-current={s === sort ? 'true' : undefined}
              className={`rounded-full px-3 py-1 font-semibold ${
                s === sort ? 'bg-ink text-volt' : 'hover:bg-volt'
              }`}
            >
              {SORTS[s]}
            </Link>
          ))}
        </nav>
      </div>

      {suggestions.length === 0 ? (
        <p className="mt-6 rounded-2xl border-2 border-dashed border-ink p-8 text-center">
          No ideas yet. Be the first!
        </p>
      ) : (
        <ol className="mt-4 space-y-3">
          {suggestions.map((s, i) => {
            return (
              <li
                key={s.id}
                className="flex items-center gap-4 rounded-2xl border-2 border-ink bg-white p-4"
              >
                {sort === 'top' && (
                  <span className="w-6 shrink-0 text-center font-display text-lg text-muted">
                    {i + 1}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-semibold break-words">“{s.text}”</p>
                </div>
                <VoteButton id={s.id} votes={s.votes} voted={voted.has(s.id)} />
                {adminKey && (
                  <form action={deleteSuggestion}>
                    <input type="hidden" name="id" value={s.id} />
                    <input type="hidden" name="key" value={adminKey} />
                    <button type="submit" className="text-sm font-semibold underline">
                      Delete
                    </button>
                  </form>
                )}
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
