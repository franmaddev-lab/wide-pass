import Link from 'next/link'
import { connection } from 'next/server'
import ItemCard from '@/components/ItemCard'
import ProductArt from '@/components/ProductArt'
import RealPhotos from '@/components/RealPhotos'
import {
  COLLECTIONS,
  collections,
  collectionTag,
  designHref,
  formatPrice,
  getGarment,
  getSlogan,
  sloganText,
  type Art,
  type Collection,
  type GarmentId,
  type SignPrint,
} from '@/lib/catalog'

// The hero headline rotates through these on every visit
const HERO: { slogan: string; custom?: string }[] = [
  { slogan: 'i-could-be-your', custom: 'sister' },
  { slogan: 'pass-wide' },
  { slogan: 'give-space' },
  { slogan: 'loves-me' },
  { slogan: 'a-person' },
  { slogan: 'not-worth-it' },
  { slogan: 'same-rights' },
  { slogan: 'jealous-calves' },
  { slogan: 'powered-by', custom: 'pasta' },
  { slogan: 'i-could-be-your', custom: 'dad' },
]

// Called after connection(), so it runs once per request rather than at build time
function randomHero() {
  return HERO[Math.floor(Math.random() * HERO.length)]
}

const STEPS = [
  ['Say it', 'Pick your message: funny, serious, family or road signs.'],
  ['Wear it', 'Pick your gear: vest, tank top, t-shirt, long sleeve or rain cover.'],
  ['Make it yours', 'Fill in the blank: “I could be your ___”.'],
]

// Ready-made designs shown as a starting point; each opens the designer preset
const POPULAR: { garment: GarmentId; slogan: string; custom?: string; color: number }[] = [
  { garment: 'vest', slogan: 'i-could-be-your', custom: 'sister', color: 0 },
  { garment: 'vest', slogan: 'jealous-calves', color: 0 },
  { garment: 'vest', slogan: 'give-space', color: 0 },
  { garment: 'tee', slogan: 'powered-by', custom: 'pasta', color: 0 },
]

const TILES: Record<
  Collection,
  { art: Art; text: string; color: string; sign?: SignPrint; className: string }
> = {
  family: {
    art: 'vest',
    text: 'I could be your dad',
    color: '#e8f525',
    className: 'bg-white text-ink',
  },
  serious: {
    art: 'vest',
    text: 'Pass wide. Pass slow.',
    color: '#e8f525',
    className: 'bg-ink text-paper',
  },
  funny: { art: 'tee', text: 'Powered by pasta', color: '#f4f4f0', className: 'bg-volt text-ink' },
  signs: {
    art: 'vest',
    text: 'Give me space',
    color: '#e8f525',
    sign: 'space',
    className: 'bg-white text-ink',
  },
}

export default async function Home() {
  // Render per request so the hero slogan changes on each page load
  await connection()
  const pick = randomHero()
  const heroSlogan = getSlogan(pick.slogan)!
  const heroText = sloganText(heroSlogan, pick.custom)
  const words = heroText.split(' ')
  const lastWord = words.pop()

  return (
    <>
      <section className="border-b-2 border-ink bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-sm font-bold tracking-widest text-volt uppercase">
              Cycling apparel with a message
            </p>
            <h1 className="mt-3 font-display text-5xl leading-[0.95] uppercase sm:text-6xl">
              {words.join(' ')} <span className="text-volt">{lastWord}</span>
            </h1>
            <p className="mt-5 max-w-md text-lg">
              Hi-vis vests, tees, tanks and rain covers with slogans (funny, serious, or your own
              words) that remind drivers there’s a person on that bike.
            </p>
            <p className="mt-8 text-sm font-bold tracking-widest uppercase">Start with</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link
                href="/slogans"
                className="rounded-full border-2 border-volt bg-volt px-7 py-3 font-display text-lg text-ink uppercase hover:bg-white"
              >
                The slogan
              </Link>
              <Link
                href="/shop"
                className="rounded-full border-2 border-paper px-7 py-3 font-display text-lg uppercase hover:bg-paper hover:text-ink"
              >
                The gear
              </Link>
            </div>
          </div>
          <Link
            href={designHref({ slogan: heroSlogan.id, custom: pick.custom })}
            aria-label={`Design “${heroText}”`}
            className="mx-auto block w-full max-w-sm"
          >
            <ProductArt
              art="vest"
              slogan={heroText}
              color="#e8f525"
              ink="#111111"
              sign={heroSlogan.sign}
              className="w-full"
            />
          </Link>
        </div>
      </section>

      <section className="overflow-hidden border-b-2 border-ink bg-volt py-3 text-ink">
        <p className="font-display text-lg tracking-wide whitespace-nowrap uppercase">
          Pass wide · Pass slow · I am traffic · Give me space · Someone is waiting for me at home ·
          Ding ding, be kind · Slow down · Pass wide · Pass slow
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map(([title, body], i) => (
            <div key={title} className="flex gap-4 rounded-2xl border-2 border-ink bg-white p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-volt font-display">
                {i + 1}
              </span>
              <div>
                <p className="font-display text-lg uppercase">{title}</p>
                <p className="text-sm text-asphalt">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="font-display text-2xl whitespace-nowrap uppercase sm:text-3xl">
            Popular designs
          </h2>
          <Link href="/slogans" className="font-semibold underline">
            See all slogans
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR.map((p) => {
            const garment = getGarment(p.garment)!
            const slogan = getSlogan(p.slogan)!
            const c = garment.colors[p.color]
            return (
              <ItemCard
                key={p.slogan}
                href={designHref({ garment: p.garment, slogan: p.slogan, custom: p.custom })}
                art={garment.art}
                text={sloganText(slogan, p.custom)}
                color={c.hex}
                ink={c.ink}
                sign={slogan.sign}
                tag={{
                  label: collections[slogan.collection].label,
                  className: collectionTag[slogan.collection],
                }}
                title={`“${sloganText(slogan, p.custom)}”`}
                subtitle={garment.name}
                price={formatPrice(garment.price)}
              />
            )
          })}
        </div>
      </section>

      <RealPhotos className="mx-auto max-w-6xl px-4 pt-14" />

      <section className="mx-auto max-w-6xl px-4 pt-14">
        <h2 className="font-display text-2xl whitespace-nowrap uppercase sm:text-3xl">
          Pick your message
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {COLLECTIONS.map((c) => {
            const t = TILES[c]
            return (
              <Link
                key={c}
                href={`/slogans?collection=${c}`}
                className={`flex items-center justify-between gap-4 rounded-2xl border-2 border-ink p-6 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-ink)] ${t.className}`}
              >
                <div>
                  <p className="font-display text-2xl uppercase sm:text-3xl">
                    {collections[c].label}
                  </p>
                  <p className="mt-2 max-w-xs opacity-90">{collections[c].blurb}</p>
                </div>
                <ProductArt
                  art={t.art}
                  slogan={t.text}
                  color={t.color}
                  ink="#111111"
                  sign={t.sign}
                  className="size-20 shrink-0 sm:size-28"
                />
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
