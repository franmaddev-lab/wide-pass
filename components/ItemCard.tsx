import Link from 'next/link'
import FavouriteButton from './FavouriteButton'
import ProductArt from './ProductArt'
import type { Art, SignPrint } from '@/lib/catalog'

export default function ItemCard({
  href,
  art,
  text,
  color,
  ink,
  sign,
  tag,
  badge,
  title,
  subtitle,
  price,
  favourite,
  likes,
}: {
  href: string
  art: Art
  text: string
  color: string
  ink: string
  sign?: SignPrint
  tag?: { label: string; className: string }
  badge?: string
  title: string
  subtitle?: string
  price?: string
  favourite?: string // favourites key, shows the heart button
  likes?: number
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border-2 border-ink bg-white transition hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-ink)]">
      <Link href={href} className="block">
        <div className="relative bg-paper p-6">
          <ProductArt
            art={art}
            slogan={text}
            color={color}
            ink={ink}
            sign={sign}
            className="mx-auto aspect-square w-full max-w-60"
          />
          {tag && (
            <span
              className={`absolute top-3 left-3 rounded-full border border-ink px-2 py-0.5 text-xs font-bold uppercase ${tag.className}`}
            >
              {tag.label}
            </span>
          )}
          {badge && (
            <span className="absolute bottom-3 left-3 -rotate-2 rounded-md border-2 border-ink bg-white px-2 py-0.5 text-xs font-bold uppercase">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-start justify-between gap-2 border-t-2 border-ink p-4">
          <div>
            <p className="font-semibold group-hover:underline">{title}</p>
            {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
            {likes !== undefined && likes > 0 && (
              <p className="mt-1 text-xs font-bold">
                ♥ {likes} {likes === 1 ? 'favourite' : 'favourites'}
              </p>
            )}
          </div>
          {price && <p className="font-bold whitespace-nowrap">{price}</p>}
        </div>
      </Link>
      {favourite && (
        <FavouriteButton item={favourite} label={title} className="absolute top-3 right-3" />
      )}
    </div>
  )
}
