import Link from 'next/link'
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
}) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border-2 border-ink bg-white transition hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-ink)]"
    >
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
          <span className="absolute top-3 right-3 rotate-3 rounded-md border-2 border-ink bg-white px-2 py-0.5 text-xs font-bold uppercase">
            {badge}
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-2 border-t-2 border-ink p-4">
        <div>
          <p className="font-semibold group-hover:underline">{title}</p>
          {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        </div>
        {price && <p className="font-bold whitespace-nowrap">{price}</p>}
      </div>
    </Link>
  )
}
