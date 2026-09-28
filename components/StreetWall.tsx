import Image from 'next/image'
import SocialLinks from './SocialLinks'
import { street } from '@/lib/street'

// "You, spreading the message": real photos and videos of people out on the road
// in their Wide Pass gear. Add entries in lib/street.ts.
export default function StreetWall() {
  return (
    <section aria-labelledby="street" className="mt-12">
      <h2 id="street" className="font-display text-2xl uppercase">
        You, spreading the message
      </h2>
      <p className="mt-1 max-w-xl text-asphalt">
        Real riders, real roads. Every photo here is someone making a driver think twice.
      </p>

      {street.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3">
          {street.map((s) => (
            <figure
              key={s.src}
              className="relative overflow-hidden rounded-2xl border-2 border-ink bg-ink"
            >
              {s.type === 'video' ? (
                <video
                  src={s.src}
                  poster={s.poster}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="aspect-[4/5] w-full object-cover"
                />
              ) : (
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={600}
                  height={750}
                  className="aspect-[4/5] w-full object-cover"
                />
              )}
              {s.example && (
                <span className="absolute top-2 left-2 rounded-full bg-white px-2 py-0.5 text-xs font-bold uppercase">
                  Example
                </span>
              )}
              {s.credit && (
                <figcaption className="bg-white px-3 py-2 text-sm font-semibold">
                  {s.link ? (
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {s.credit}
                    </a>
                  ) : (
                    s.credit
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      <div className="mt-4 grid gap-3 rounded-2xl border-2 border-ink bg-volt p-5">
        <p className="font-display text-xl uppercase">Your turn</p>
        <p>
          Out on the bike in your Wide Pass gear? Post a photo or a short video from the road and
          tag us with <strong>#WidePass</strong>. The best ones go up here.
        </p>
        <SocialLinks />
      </div>
    </section>
  )
}
