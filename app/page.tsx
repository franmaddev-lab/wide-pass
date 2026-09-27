import Link from 'next/link'
import ItemCard from '@/components/ItemCard'
import ProductArt from '@/components/ProductArt'
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

// Ready-made designs shown as a starting point; each opens the designer preset
const POPULAR: { garment: GarmentId; slogan: string; custom?: string; color: number }[] = [
  { garment: 'vest', slogan: 'i-could-be-your', custom: 'sister', color: 0 },
  { garment: 'vest', slogan: 'jealous-calves', color: 1 },
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
    className: 'bg-signal text-ink',
  },
  serious: {
    art: 'vest',
    text: 'Pass wide. Pass slow.',
    color: '#ff7a1a',
    className: 'bg-ink text-paper',
  },
  funny: { art: 'tee', text: 'Powered by pasta', color: '#f4f4f0', className: 'bg-volt text-ink' },
  signs: {
    art: 'vest',
    text: 'Give me space',
    color: '#e8f525',
    sign: 'space',
    className: 'bg-asphalt text-paper',
  },
}

export default function Home() {
  return (
    <>
      <section className="border-b-2 border-ink bg-volt">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-sm font-bold tracking-widest uppercase">
              Cycling apparel with a message
            </p>
            <h1 className="mt-3 font-display text-5xl leading-[0.95] uppercase sm:text-6xl">
              I could be your sister.
            </h1>
            <p className="mt-5 max-w-md text-lg">
              Hi-vis vests and tees with slogans (funny, serious, or your own words) that remind
              drivers there’s a person on that bike.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/slogans"
                className="rounded-full border-2 border-ink bg-ink px-6 py-3 font-bold text-volt hover:bg-asphalt"
              >
                Start with a slogan
              </Link>
              <Link
                href="/shop"
                className="rounded-full border-2 border-ink px-6 py-3 font-bold hover:bg-ink hover:text-volt"
              >
                Start with a vest or tee
              </Link>
            </div>
          </div>
          <ProductArt
            art="vest"
            slogan="I could be your sister"
            color="#ff7a1a"
            ink="#111111"
            className="mx-auto w-full max-w-sm drop-shadow-[8px_8px_0_var(--color-ink)]"
          />
        </div>
      </section>

      <section className="overflow-hidden border-b-2 border-ink bg-ink py-3 text-paper">
        <p className="font-display text-lg tracking-wide whitespace-nowrap uppercase">
          Pass wide · Pass slow · I am traffic · Give me space · Someone is waiting for me at home ·
          Ding ding, be kind · Slow down · Pass wide · Pass slow
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['1', 'Pick a message', 'Funny, serious, family or road signs.'],
            ['2', 'Make it yours', 'Fill in the blank: “I could be your ___”.'],
            ['3', 'Pick your gear', 'Hi-vis vest or organic tee, any colour, any size.'],
          ].map(([n, title, body]) => (
            <div key={n} className="flex gap-4 rounded-2xl border-2 border-ink bg-white p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-volt font-display">
                {n}
              </span>
              <div>
                <p className="font-bold">{title}</p>
                <p className="text-sm text-asphalt">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl uppercase">Popular designs</h2>
          <Link href="/design" className="font-semibold underline">
            Design your own
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
                badge={slogan.personalise ? 'Personalise it' : undefined}
                title={`“${sloganText(slogan, p.custom)}”`}
                subtitle={garment.name}
                price={formatPrice(garment.price)}
              />
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-14">
        <h2 className="font-display text-3xl uppercase">Pick your message</h2>
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
                  <p className="font-display text-3xl uppercase">{collections[c].label}</p>
                  <p className="mt-2 max-w-xs opacity-90">{collections[c].blurb}</p>
                </div>
                <ProductArt
                  art={t.art}
                  slogan={t.text}
                  color={t.color}
                  ink="#111111"
                  sign={t.sign}
                  className="size-28 shrink-0"
                />
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
