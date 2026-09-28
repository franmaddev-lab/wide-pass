import Link from 'next/link'
import ProductArt from './ProductArt'
import SocialLinks from './SocialLinks'
import {
  designHref,
  getGarment,
  getSlogan,
  sloganText,
  type Fit,
  type GarmentId,
} from '@/lib/catalog'

// "You" page gallery: the gear on people. For now these are the product previews;
// swap in customers' photos as they arrive.
const LOOKS: { slogan: string; custom?: string; garment: GarmentId; color: number; fit?: Fit }[] = [
  { slogan: 'somebodys', custom: 'dad', garment: 'tee', color: 0 },
  { slogan: 'i-could-be-your', custom: 'sister', garment: 'tee', color: 1, fit: 'women' },
  { slogan: 'a-person', custom: 'a mum', garment: 'tank', color: 0, fit: 'women' },
  { slogan: 'waiting-at-home', custom: 'Someone', garment: 'longsleeve', color: 1 },
  { slogan: 'pass-wide', garment: 'vest', color: 0 },
  { slogan: 'one-mistake-could-cost-my-life', garment: 'jacket', color: 1 },
  { slogan: 'jealous-calves', custom: 'calves', garment: 'tank', color: 1 },
  { slogan: 'kids-ride-here', custom: 'kid', garment: 'raincover', color: 0 },
]

export default function WornGallery() {
  return (
    <section aria-labelledby="worn" className="mt-12">
      <h2 id="worn" className="font-display text-2xl uppercase">
        See it worn
      </h2>
      <p className="mt-1 text-asphalt">Tap one to make it yours.</p>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {LOOKS.map((l) => {
          const slogan = getSlogan(l.slogan)
          const garment = getGarment(l.garment)
          if (!slogan || !garment) return null
          const c = garment.colors[l.color] ?? garment.colors[0]
          const text = sloganText(slogan, l.custom)
          return (
            <Link
              key={`${l.slogan}/${l.garment}`}
              href={designHref({ slogan: slogan.id, garment: garment.id, custom: l.custom })}
              className="group overflow-hidden rounded-2xl border-2 border-ink bg-white"
            >
              <ProductArt
                art={garment.art}
                slogan={text}
                color={c.hex}
                ink={c.ink}
                fit={l.fit}
                className="aspect-square w-full transition group-hover:scale-105"
              />
              <p className="border-t-2 border-ink px-3 py-2 text-sm font-semibold">
                {garment.name}
              </p>
            </Link>
          )
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border-2 border-dashed border-ink p-4">
        <p className="font-semibold">
          Got yours on? Send us a photo or tag us and we’ll add it here.
        </p>
        <SocialLinks />
      </div>
    </section>
  )
}
