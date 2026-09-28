import Image from 'next/image'
import SocialLinks from './SocialLinks'
import { street } from '@/lib/street'
import { hasSocial } from '@/lib/site'
import type { GarmentId } from '@/lib/catalog'

// Real photos when there are some; otherwise a nudge to the social accounts.
// Renders nothing if there are neither.
export default function RealPhotos({
  garment,
  title = 'Seen on the road',
  className,
  limit = 4,
}: {
  garment?: GarmentId
  title?: string
  className?: string
  limit?: number // keeps the grid to full rows
}) {
  // Real photos from the road (lib/street.ts); on an item page, that item first
  const photos = street.filter((s) => s.type === 'photo' && (garment || s.home !== false))
  const list = (
    garment
      ? [
          ...photos.filter((s) => s.garment === garment),
          ...photos.filter((s) => s.garment !== garment),
        ]
      : photos
  ).slice(0, limit)
  if (list.length === 0 && !hasSocial) return null

  return (
    <section aria-labelledby="real-photos" className={className}>
      <h2 id="real-photos" className="font-display text-2xl uppercase">
        {title}
      </h2>
      {list.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {list.map((p, i) => (
            <div
              key={p.src}
              // with an odd number, the first photo takes a full row on phones so there's no gap
              className={`relative overflow-hidden rounded-xl border-2 border-ink bg-paper ${
                i === 0 && list.length % 2 === 1
                  ? 'col-span-2 aspect-[4/3] md:col-span-1 md:aspect-[4/5]'
                  : 'aspect-[4/5]'
              }`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              {p.example && (
                <span className="absolute top-2 left-2 rounded-full bg-white px-2 py-0.5 text-xs font-bold uppercase">
                  Example
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      {hasSocial && (
        <div className="mt-4">
          <p className="mb-3 text-asphalt">
            {list.length > 0
              ? 'More riders, more slogans, more videos:'
              : 'See it all on real riders:'}
          </p>
          <SocialLinks />
        </div>
      )}
    </section>
  )
}
