import Image from 'next/image'
import SocialLinks from './SocialLinks'
import { photosFor } from '@/lib/photos'
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
  const list = photosFor(garment).slice(0, limit)
  if (list.length === 0 && !hasSocial) return null

  return (
    <section aria-labelledby="real-photos" className={className}>
      <h2 id="real-photos" className="font-display text-2xl uppercase">
        {title}
      </h2>
      {list.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {list.map((p) => (
            <div
              key={p.src}
              className="relative aspect-square overflow-hidden rounded-xl border-2 border-ink bg-paper"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
      {hasSocial && (
        <div className="mt-4">
          <p className="mb-3 text-asphalt">
            {list.length > 0
              ? 'More riders, more slogans, more videos:'
              : 'See the vests and tees on real riders:'}
          </p>
          <SocialLinks />
        </div>
      )}
    </section>
  )
}
