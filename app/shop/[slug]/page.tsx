import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import FavouriteButton from '@/components/FavouriteButton'
import ProductPicker from '@/components/ProductPicker'
import { formatPrice, gadgets, getGadget } from '@/lib/catalog'

export const dynamicParams = false

export function generateStaticParams() {
  return gadgets.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const product = getGadget((await params).slug)
  return product
    ? {
        title: `${product.name} — Wide Pass`,
        description: `“${product.slogan}” ${product.description}`,
      }
    : {}
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getGadget((await params).slug)
  if (!product) notFound()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="text-sm text-muted">
        <Link href="/shop" className="hover:underline">
          Gear
        </Link>{' '}
        / Gadgets
      </nav>

      <div className="mt-4 grid gap-10 md:grid-cols-2">
        <ProductPicker product={product}>
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-display text-4xl uppercase">{product.name}</h1>
            <FavouriteButton item={`gadget:${product.slug}`} label={product.name} />
          </div>
          <p className="mt-2 text-xl">“{product.slogan}”</p>
          <p className="mt-4 text-2xl font-bold">{formatPrice(product.price)}</p>
          <p className="mt-4 text-asphalt">{product.description}</p>
        </ProductPicker>
      </div>
    </div>
  )
}
