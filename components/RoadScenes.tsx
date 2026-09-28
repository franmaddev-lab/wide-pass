import { FONT, layout } from './ProductArt'
import SocialLinks from './SocialLinks'

// Home page "Seen on the road": real scenes with the slogan printed onto the gear.
// Coordinates are in the 900px image: centre of the print, its width and height.
// Riding shots sit on a diagonal (top right, bottom left) so the grid alternates
const SCENES = [
  {
    src: '/scenes/folded-tee.webp',
    alt: 'A folded white t-shirt printed “Honk if you’re jealous of my calves”',
    text: 'Honk if you’re jealous of my calves',
    print: { cx: 450, cy: 470, w: 400, h: 270 },
    // follow the fold: tilted and slanted with the shirt's perspective
    transform: 'matrix(0.95 0.26 -0.18 0.86 90 -60)',
    size: 900,
  },
  {
    src: '/scenes/road-vest.webp',
    alt: 'A driver’s view of a cyclist ahead on a country lane in a yellow “I could be your sister” vest',
    text: 'I could be your sister',
    print: { cx: 452, cy: 362, w: 84, h: 44 },
    size: 900,
  },
  {
    src: '/scenes/night-vest.webp',
    alt: 'A cyclist at night on a wet road in a yellow “Slow down. It’s only a few seconds.” vest, a car behind',
    text: 'Slow down. It’s only a few seconds.',
    print: { cx: 440, cy: 300, w: 245, h: 190 },
    size: 900,
  },
  {
    src: '/scenes/hanger-tee.webp',
    alt: 'A white “I’m not in your way. I am traffic.” t-shirt on a hanger',
    text: 'I’m not in your way. I am traffic.',
    print: { cx: 450, cy: 420, w: 320, h: 290 },
    size: 900,
  },
]

export default function RoadScenes({ className }: { className?: string }) {
  return (
    <section aria-labelledby="road-scenes" className={className}>
      <h2 id="road-scenes" className="font-display text-2xl uppercase">
        Seen on the road
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {SCENES.map((s) => {
          const fit = s.print && s.text ? layout(s.text, s.print.w, s.print.h, s.print.h / 2) : null
          const lineH = fit ? fit.size * 1.1 : 0
          const top = s.print && fit ? s.print.cy - (fit.lines.length * lineH) / 2 : 0
          return (
            <svg
              key={s.src}
              viewBox={`0 0 ${s.size} ${s.size}`}
              role="img"
              aria-label={s.alt}
              className="aspect-square w-full overflow-hidden rounded-xl border-2 border-ink"
            >
              <image href={s.src} width={s.size} height={s.size} />
              {s.print && fit && (
                <text
                  transform={'transform' in s ? s.transform : undefined}
                  textAnchor="middle"
                  fill="#111"
                  fontFamily={FONT}
                  fontWeight={800}
                  fontSize={fit.size}
                >
                  {fit.lines.map((l, i) => (
                    <tspan key={i} x={s.print.cx} y={top + i * lineH + fit.size * 0.85}>
                      {l}
                    </tspan>
                  ))}
                </text>
              )}
            </svg>
          )
        })}
      </div>
      <p className="mt-4 mb-3 text-asphalt">More riders, more slogans, more videos:</p>
      <SocialLinks />
    </section>
  )
}
