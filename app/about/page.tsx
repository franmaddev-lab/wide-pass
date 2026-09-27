import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Why — Wide Pass' }

const POINTS = [
  {
    title: 'People, not obstacles',
    body: 'From behind a windscreen, a cyclist can look like something in the way. A slogan like “I could be your sister” turns them back into a person in a split second.',
  },
  {
    title: 'Funny works too',
    body: 'A driver who laughs is a driver who is paying attention. Humour defuses tension on the road and makes the message stick.',
  },
  {
    title: 'Seen first, then read',
    body: 'Our vests are hi-vis with reflective strips, so the message comes with real visibility. Style is a bonus.',
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-4xl leading-tight uppercase sm:text-5xl">
        Every rider is somebody’s someone.
      </h1>
      <p className="mt-6 max-w-2xl text-lg">
        Wide Pass makes cycling gear that talks to drivers. Some slogans make you smile, some make
        you think. All of them ask for the same thing: a little more space and a little more
        patience.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {POINTS.map((p) => (
          <div key={p.title} className="rounded-2xl border-2 border-ink bg-white p-6">
            <h2 className="font-display text-xl uppercase">{p.title}</h2>
            <p className="mt-3 text-asphalt">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border-2 border-ink bg-volt p-8">
        <p className="font-display text-2xl uppercase">Have a slogan idea?</p>
        <p className="mt-2">
          The best ones come from riders. Tell us yours and it might be our next vest.
        </p>
        <Link
          href="/shop"
          className="mt-5 inline-block rounded-full border-2 border-ink bg-ink px-6 py-3 font-bold text-volt"
        >
          Meanwhile, shop the collection
        </Link>
      </div>
    </div>
  )
}
