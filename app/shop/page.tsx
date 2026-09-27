import type { Metadata } from 'next'
import Link from 'next/link'
import ProductArt from '@/components/ProductArt'
import { formatPrice, garments } from '@/lib/catalog'

export const metadata: Metadata = { title: 'Shop — Wide Pass' }

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl uppercase">Shop</h1>
      <p className="mt-2 max-w-xl text-asphalt">
        Pick what you’ll wear, then choose the message that goes on it. Prefer to start from a
        slogan?{' '}
        <Link href="/slogans" className="font-semibold underline">
          Browse slogans
        </Link>
        .
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {garments.map((g) => (
          <Link
            key={g.id}
            href={`/slogans?garment=${g.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border-2 border-ink bg-white transition hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-ink)]"
          >
            <div className="bg-paper p-6">
              <ProductArt
                art={g.art}
                slogan="Your message here"
                color={g.colors[0].hex}
                ink={g.colors[0].ink}
                className="mx-auto aspect-square w-full max-w-56"
              />
            </div>
            <div className="flex flex-1 flex-col border-t-2 border-ink p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-xl uppercase">{g.name}</p>
                <p className="font-bold">{formatPrice(g.price)}</p>
              </div>
              <p className="mt-1 text-sm text-asphalt">{g.description}</p>
              <p className="mt-4 self-start rounded-full bg-ink px-4 py-2 text-sm font-bold text-volt group-hover:bg-asphalt">
                Choose a slogan →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
