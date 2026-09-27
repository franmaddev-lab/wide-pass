import Link from 'next/link'
import { connection } from 'next/server'
import ItemCard from '@/components/ItemCard'
import ProductArt from '@/components/ProductArt'
import HeroSlogan from '@/components/HeroSlogan'
import RealPhotos from '@/components/RealPhotos'
import {
  COLLECTIONS,
  collections,
  collectionTag,
  designHref,
  formatPrice,
  garments,
  getGarment,
  getSlogan,
  sloganText,
  slogans,
  type Art,
  type Collection,
  type GarmentId,
  type SignPrint,
} from '@/lib/catalog'

// The hero headline picks one of the slogans with a blank on every visit, so it
// can animate ("I could be your ___" types through sister, brother, mum…)
const HERO = slogans.filter((s) => s.personalise)

// Called after connection(), so it runs once per request rather than at build time
function randomHero() {
  return HERO[Math.floor(Math.random() * HERO.length)]
}

const STEPS = [
  ['Say it', 'Pick your message: funny, serious, family or road signs.'],
  ['Make it yours', 'Fill in the blank: “I could be your ___”.'],
  ['Wear it', 'Tank, tee or long sleeve. Or go hi-vis: vest, rain jacket or bag cover.'],
]

// Ready-made designs shown as a starting point; each opens the designer preset
const POPULAR: { garment: GarmentId; slogan: string; custom?: string; color: number }[] = [
  { garment: 'tee', slogan: 'i-could-be-your', custom: 'sister', color: 0 },
  { garment: 'tee', slogan: 'jealous-calves', color: 0 },
  { garment: 'tee', slogan: 'give-space', color: 0 },
  { garment: 'tee', slogan: 'powered-by', custom: 'pasta', color: 0 },
]

const TILES: Record<
  Collection,
  { art: Art; text: string; color: string; ink?: string; sign?: SignPrint; className: string }
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
    className: 'bg-white text-ink',
  },
  funny: {
    art: 'vest',
    text: 'Powered by pasta',
    color: '#e8f525',
    className: 'bg-white text-ink',
  },
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

  return (
    <>
      <section className="border-b-2 border-ink bg-ink text-paper">
        <HeroSlogan sloganId={pick.id}>
          <p className="mt-5 max-w-md text-lg">
            Hi-vis vests, tees, rain jackets and more, with slogans (funny, serious, or your own
            words) that remind drivers there’s a person on that bike.
          </p>
          <div className="mt-8 inline-flex flex-col items-center">
            <p className="text-sm font-bold tracking-widest uppercase">Start with</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                href="/slogans"
                className="w-full rounded-full border-2 border-paper bg-paper px-5 py-3 text-center font-display text-lg whitespace-nowrap text-ink uppercase hover:border-volt hover:bg-volt"
              >
                The slogan
              </Link>
              <Link
                href="/shop"
                className="w-full rounded-full border-2 border-paper bg-paper px-5 py-3 text-center font-display text-lg whitespace-nowrap text-ink uppercase hover:border-volt hover:bg-volt"
              >
                The gear
              </Link>
            </div>
          </div>
        </HeroSlogan>
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
        <h2 className="font-display text-2xl whitespace-nowrap uppercase sm:text-3xl">
          Popular designs
        </h2>
        <Link href="/slogans" className="mt-1 inline-block font-semibold underline">
          See all slogans
        </Link>
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
        <Link href="/slogans" className="mt-1 inline-block font-semibold underline">
          See all slogans
        </Link>
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
                  ink={t.ink ?? '#111111'}
                  sign={t.sign}
                  className="size-20 shrink-0 sm:size-28"
                />
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-14">
        <h2 className="font-display text-2xl whitespace-nowrap uppercase sm:text-3xl">
          Pick your gear
        </h2>
        <Link href="/shop" className="mt-1 inline-block font-semibold underline">
          Browse gear
        </Link>
        <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-6">
          {garments.map((g) => (
            <Link
              key={g.id}
              href={`/slogans?garment=${g.id}`}
              className="flex flex-col items-center gap-2 rounded-2xl border-2 border-ink bg-white p-3 text-center transition hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-ink)] sm:p-5"
            >
              <ProductArt
                art={g.art}
                slogan=""
                color={g.colors[0].hex}
                ink={g.colors[0].ink}
                className="size-16 sm:size-28"
              />
              <span className="font-display text-sm leading-tight uppercase sm:text-xl">
                {g.name}
              </span>
              <span className="text-sm font-bold">{formatPrice(g.price)}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
