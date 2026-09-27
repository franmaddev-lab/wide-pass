import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { SHAPES } from '@/components/ProductArt'
import { cleanCustom, getGarment, getSlogan, sloganText } from '@/lib/catalog'

// Link-preview image (1200×630) shown when a design is shared on WhatsApp,
// Instagram DMs, X, Facebook… /og?slogan=…&text=…&garment=…
// Without a slogan it shows the brand card used for the rest of the site.

const INK = '#1b1b1b'
const VOLT = '#e8f525'

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const slogan = getSlogan(params.get('slogan') ?? undefined)
  const garment =
    getGarment(params.get('garment') ?? undefined) ?? getGarment(slogan ? 'tee' : 'vest')!
  const font = await readFile(join(process.cwd(), 'assets/ArchivoBlack-Regular.ttf'))

  let text = 'Every rider is somebody’s someone.'
  if (slogan) {
    const custom = cleanCustom(slogan, params.get('text') ?? undefined)
    text = sloganText(slogan, custom ?? undefined)
  }
  const color = garment.colors[0]
  const size = text.length > 60 ? 56 : text.length > 34 ? 68 : 84

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: slogan ? '#f4f4f0' : VOLT,
        fontFamily: 'Archivo',
        color: INK,
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 0 56px 64px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, letterSpacing: 2 }}>WIDE PASS</div>
        <div
          style={{
            display: 'flex',
            fontSize: size,
            lineHeight: 1,
            textTransform: 'uppercase',
          }}
        >
          {slogan ? `“${text}”` : text}
        </div>
        <div style={{ display: 'flex', fontSize: 26 }}>
          {slogan ? `Make yours on ${garment.withArticle}` : 'Cycling gear that talks to drivers'}
        </div>
      </div>
      <div style={{ width: 460, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="400" height="400" viewBox="0 0 200 200">
          <path
            d={SHAPES[garment.art].path}
            fill={slogan ? color.hex : INK}
            stroke={INK}
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>,
    {
      fonts: [{ name: 'Archivo', data: font, weight: 400, style: 'normal' }],
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable' },
    }
  )
}
