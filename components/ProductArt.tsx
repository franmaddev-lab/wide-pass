import { isWomanWearer, type Art, type SignPrint } from '@/lib/catalog'

// Draws a product mock-up with its slogan printed on it, so the catalogue
// needs no photo assets until real product shots exist.

function wrap(text: string, maxChars: number) {
  const words = text.toUpperCase().split(' ')
  const out: string[] = []
  let line = ''
  for (const w of words) {
    if (line && (line + ' ' + w).length > maxChars) {
      out.push(line)
      line = w
    } else {
      line = line ? line + ' ' + w : w
    }
  }
  if (line) out.push(line)
  return out
}

export const SHAPES: Record<Art, { path: string; text: { x: number; y: number; w: number } }> = {
  tee: {
    path: 'M70 22 L52 28 L18 52 L32 80 L50 70 L50 180 L150 180 L150 70 L168 80 L182 52 L148 28 L130 22 Q100 44 70 22 Z',
    text: { x: 100, y: 105, w: 12 },
  },
  vest: {
    path: 'M66 14 Q56 14 55 24 Q55 56 42 72 Q36 80 37 94 L39 172 Q39 186 53 186 L147 186 Q161 186 161 172 L163 94 Q164 80 158 72 Q145 56 145 24 Q144 14 134 14 Q124 14 121 28 Q114 58 100 58 Q86 58 79 28 Q76 14 66 14 Z',
    text: { x: 100, y: 118, w: 12 },
  },
  tank: {
    path: 'M74 18 L62 22 Q66 58 54 78 L54 182 L146 182 L146 78 Q134 58 138 22 L126 18 Q116 56 100 56 Q84 56 74 18 Z',
    text: { x: 100, y: 116, w: 11 },
  },
  longsleeve: {
    path: 'M70 22 L52 28 L24 60 L10 166 L32 170 L44 86 L50 78 L50 180 L150 180 L150 78 L156 86 L168 170 L190 166 L176 60 L148 28 L130 22 Q100 44 70 22 Z',
    text: { x: 100, y: 108, w: 12 },
  },
  jacket: {
    path: 'M80 14 Q100 4 120 14 L150 28 L178 62 L190 166 L168 170 L156 92 L152 86 L152 184 L48 184 L48 86 L44 92 L32 170 L10 166 L22 62 L50 28 Z',
    text: { x: 100, y: 104, w: 12 },
  },
  raincover: {
    path: 'M50 28 Q100 14 150 28 Q170 34 170 60 L168 164 Q168 186 146 188 L54 188 Q32 186 32 164 L30 60 Q30 34 50 28 Z',
    text: { x: 100, y: 102, w: 12 },
  },
  tote: {
    path: 'M40 70 L160 70 L166 184 L34 184 Z M72 70 Q72 20 100 20 Q128 20 128 70 L118 70 Q118 32 100 32 Q82 32 82 70 Z',
    text: { x: 100, y: 128, w: 12 },
  },
  sticker: {
    path: 'M100 16 A84 84 0 1 1 99.9 16 Z',
    text: { x: 100, y: 100, w: 10 },
  },
  bell: {
    path: 'M100 36 Q146 36 150 104 L160 128 L40 128 L50 104 Q54 36 100 36 Z M88 128 Q88 150 100 150 Q112 150 112 128 Z M94 36 L94 24 L106 24 L106 36 Z',
    text: { x: 100, y: 90, w: 10 },
  },
  band: {
    path: 'M24 84 Q100 52 176 84 L176 120 Q100 88 24 120 Z',
    text: { x: 100, y: 96, w: 20 },
  },
}

const SIGN_RED = '#c8102e'
const SIGN_BLUE = '#1d4f91'
const INK = '#1b1b1b'
const FONT = 'var(--font-archivo), system-ui, sans-serif'

type SignKind = Exclude<SignPrint, 'set'>

// Each sign is drawn in a 100×100 box, then scaled to radius r around (cx, cy)
function SignBody({ kind }: { kind: SignKind }) {
  const triangle = (
    <path
      d="M50 6 L96 88 L4 88 Z"
      fill="#ffffff"
      stroke={SIGN_RED}
      strokeWidth="9"
      strokeLinejoin="round"
    />
  )
  const prohibition = (children: React.ReactNode) => (
    <g>
      <circle cx="50" cy="50" r="46" fill="#ffffff" />
      {children}
      <circle cx="50" cy="50" r="41" fill="none" stroke={SIGN_RED} strokeWidth="10" />
      <line x1="21" y1="21" x2="79" y2="79" stroke={SIGN_RED} strokeWidth="10" />
    </g>
  )

  switch (kind) {
    case 'space':
      return (
        <g>
          <rect
            x="3"
            y="14"
            width="94"
            height="72"
            rx="8"
            fill={SIGN_BLUE}
            stroke="#ffffff"
            strokeWidth="3"
          />
          {/* car */}
          <path d="M10 64 L10 54 L17 54 L23 45 L36 45 L42 54 L46 56 L46 64 Z" fill="#ffffff" />
          <circle cx="18" cy="65" r="5" fill={SIGN_BLUE} stroke="#ffffff" strokeWidth="3" />
          <circle cx="38" cy="65" r="5" fill={SIGN_BLUE} stroke="#ffffff" strokeWidth="3" />
          {/* gap arrow */}
          <g
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <line x1="50" y1="34" x2="66" y2="34" />
            <path d="M54 29 L49 34 L54 39 M62 29 L67 34 L62 39" />
          </g>
          {/* bike */}
          <g
            stroke="#ffffff"
            strokeWidth="3"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <circle cx="70" cy="64" r="7" />
            <circle cx="90" cy="64" r="7" />
            <path d="M70 64 L77 54 L87 54 L90 64 M77 54 L81 64 L87 54 M82 48 L78 54" />
          </g>
          <circle cx="85" cy="44" r="3.5" fill="#ffffff" />
        </g>
      )
    case 'cyclist':
      return (
        <g>
          {triangle}
          <g fill="none" stroke={INK} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
            <circle cx="36" cy="72" r="9" />
            <circle cx="64" cy="72" r="9" />
            <path d="M36 72 L46 58 L60 58 L64 72 M46 58 L52 72 L60 58 M53 50 L48 58" />
          </g>
          <circle cx="56" cy="46" r="4" fill={INK} />
        </g>
      )
    case 'heart':
      return (
        <g>
          {triangle}
          <path
            d="M50 78 C30 64 30 48 40 46 C45 45 49 48 50 52 C51 48 55 45 60 46 C70 48 70 64 50 78 Z"
            fill={SIGN_RED}
          />
        </g>
      )
    case 'eye':
      return (
        <g>
          {triangle}
          <path d="M28 64 Q50 44 72 64 Q50 84 28 64 Z" fill="none" stroke={INK} strokeWidth="4" />
          <circle cx="50" cy="64" r="7" fill={INK} />
        </g>
      )
    case 'octagon':
      return (
        <g>
          <path
            d="M30 4 L70 4 L96 30 L96 70 L70 96 L30 96 L4 70 L4 30 Z"
            fill={SIGN_RED}
            stroke="#ffffff"
            strokeWidth="4"
          />
          <text textAnchor="middle" fontFamily={FONT} fontSize="21" fill="#ffffff">
            <tspan x="50" y="47">
              SLOW
            </tspan>
            <tspan x="50" y="70">
              DOWN
            </tspan>
          </text>
        </g>
      )
    case 'no-phone':
      return prohibition(
        <g>
          <rect x="37" y="24" width="26" height="52" rx="5" fill={INK} />
          <rect x="41" y="31" width="18" height="34" rx="1" fill="#ffffff" />
        </g>
      )
    case 'no-horn':
      return prohibition(
        <g fill={INK}>
          <path d="M24 42 L40 42 L64 26 L64 74 L40 58 L24 58 Z" />
          <path
            d="M70 38 Q78 50 70 62"
            fill="none"
            stroke={INK}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      )
  }
}

function Sign({ kind, cx, cy, r }: { kind: SignKind; cx: number; cy: number; r: number }) {
  const s = (r * 2) / 100
  return (
    <g transform={`translate(${cx - r} ${cy - r}) scale(${s})`}>
      <SignBody kind={kind} />
    </g>
  )
}

// Real photos (back view) used instead of the drawing whenever a slogan is printed.
// Keyed by "<art>:<colour hex>"; cx/cy is the centre of the print area, width its width.
type Photo = {
  src: string
  w: number
  h: number
  cx: number
  cy: number
  width: number
  height: number // tallest the print may be
}
// photo(file, image width, image height, print centre x, centre y, print width, print height)
const photo = (
  file: string,
  w: number,
  h: number,
  cx: number,
  cy: number,
  width: number,
  height = 300
): Photo => ({
  src: `/mockups/${file}.webp`,
  w,
  h,
  cx,
  cy,
  width,
  height,
})
const PHOTOS: Record<string, Photo> = {
  'vest:#e8f525': photo('vest-yellow', 661, 718, 315, 196, 222),
  'vest:#ff7a1a': photo('vest-orange', 640, 723, 306, 205, 212),
  'jacket:#e8f525': photo('jacket-yellow', 680, 721, 345, 255, 220, 260),
  'jacket:#ff7a1a': photo('jacket-orange', 671, 719, 335, 255, 220, 260),
  'raincover:#e8f525': photo('raincover-yellow', 516, 632, 258, 312, 250, 210),
  'tee:#1b1b1b': photo('tee-black', 665, 726, 340, 265, 310, 330),
  'tee:#f4f4f0': photo('tee-white', 701, 708, 350, 265, 310, 330),
  'tee:#f4f4f0:w': photo('tee-white-w', 705, 707, 355, 255, 290, 320),
  'longsleeve:#1b1b1b': photo('longsleeve-black', 668, 718, 335, 265, 270, 330),
  'longsleeve:#f4f4f0': photo('longsleeve-white', 671, 728, 340, 270, 270, 330),
  'tank:#1b1b1b': photo('tank-black', 640, 725, 320, 290, 250, 330),
  'tank:#f4f4f0': photo('tank-white', 662, 717, 335, 285, 250, 330),
  'tank:#1b1b1b:w': photo('tank-black-w', 664, 716, 332, 380, 240, 300),
  'tank:#f4f4f0:w': photo('tank-white-w', 695, 707, 350, 380, 240, 300),
}

// Splits the words into `n` lines as evenly as possible (smallest longest line)
function balance(words: string[], n: number) {
  const len = (a: number, b: number) =>
    words.slice(a, b).reduce((s, w) => s + w.length, 0) + (b - a - 1)
  // shortest longest line first, then the most even lines (no lonely "IS")
  type Split = { worst: number; spread: number; cuts: number[] }
  const memo = new Map<string, Split>()
  const best = (start: number, lines: number): Split => {
    if (lines === 1) {
      const l = len(start, words.length)
      return { worst: l, spread: l * l, cuts: [] }
    }
    const key = `${start}/${lines}`
    const hit = memo.get(key)
    if (hit) return hit
    let out: Split = { worst: Infinity, spread: Infinity, cuts: [] }
    for (let end = start + 1; end <= words.length - lines + 1; end++) {
      const rest = best(end, lines - 1)
      const l = len(start, end)
      const worst = Math.max(l, rest.worst)
      const spread = l * l + rest.spread
      if (worst < out.worst || (worst === out.worst && spread < out.spread))
        out = { worst, spread, cuts: [end, ...rest.cuts] }
    }
    memo.set(key, out)
    return out
  }
  const { cuts } = best(0, n)
  const bounds = [0, ...cuts, words.length]
  return bounds.slice(0, -1).map((b, i) => words.slice(b, bounds[i + 1]).join(' '))
}

// Picks the number of lines that lets the slogan print biggest in the area,
// so it spreads across the back and reads from a distance
function layout(text: string, width: number, height: number, maxSize: number) {
  const words = text.toUpperCase().split(' ')
  let pick = { lines: [text.toUpperCase()], size: 0 }
  for (let n = 1; n <= Math.min(words.length, 6); n++) {
    const lines = balance(words, n)
    const longest = Math.max(...lines.map((l) => l.length))
    // ~0.66em per capital in Archivo Black, 1.1 line height
    let size = Math.min(maxSize, width / (longest * 0.66), height / (n * 1.1))
    // a word like "IS" alone on a line looks broken: prefer another layout
    if (n > 1 && lines.some((l) => l.length <= 2)) size *= 0.6
    if (size > pick.size + 0.5) pick = { lines, size }
  }
  return pick
}

// The photo for this item and colour. When the slogan says the wearer is a woman
// ("I could be your sister") only a woman's photo will do; otherwise we fall back
// to the drawing rather than show a man.
function photoFor(art: Art, color: string, slogan: string) {
  if (!slogan) return undefined
  const key = `${art}:${color}`
  return isWomanWearer(slogan) ? PHOTOS[`${key}:w`] : PHOTOS[key]
}

export function hasPhoto(art: Art, color: string, slogan: string) {
  return Boolean(photoFor(art, color, slogan))
}

// First colour of an item that has a photo for this slogan (e.g. white for a
// woman's slogan on a tee, until there's a black women's tee photo)
export function photoColor<C extends { hex: string }>(art: Art, colors: C[], slogan: string) {
  return colors.find((c) => hasPhoto(art, c.hex, slogan)) ?? colors[0]
}

function PhotoArt({
  photo,
  slogan,
  ink,
  sign,
  className,
}: {
  photo: Photo
  slogan: string
  ink: string
  sign?: SignKind
  className?: string
}) {
  const signR = 52
  const signH = sign ? signR * 2 + 16 : 0
  const { lines, size } = layout(slogan, photo.width, photo.height - signH, sign ? 44 : 80)
  const lineH = size * 1.1
  const blockTop = photo.cy - (signH + lines.length * lineH) / 2
  const textTop = blockTop + signH

  return (
    <svg viewBox={`0 0 ${photo.w} ${photo.h}`} role="img" aria-label={slogan} className={className}>
      <image href={photo.src} width={photo.w} height={photo.h} />
      {sign && <Sign kind={sign} cx={photo.cx} cy={blockTop + signR} r={signR} />}
      <text textAnchor="middle" fill={ink} fontFamily={FONT} fontWeight={800} fontSize={size}>
        {lines.map((l, i) => (
          <tspan key={i} x={photo.cx} y={textTop + i * lineH + size * 0.85}>
            {l}
          </tspan>
        ))}
      </text>
    </svg>
  )
}

export default function ProductArt({
  art,
  slogan,
  color,
  ink,
  sign,
  className,
  drawing = false,
}: {
  art: Art
  slogan: string
  color: string
  ink: string
  sign?: SignPrint
  className?: string
  drawing?: boolean // force the flat drawing even when a photo exists
}) {
  const pic = !drawing && sign !== 'set' ? photoFor(art, color, slogan) : undefined
  if (pic) {
    return (
      <PhotoArt
        photo={pic}
        slogan={slogan}
        ink={ink}
        sign={sign && sign !== 'set' ? sign : undefined}
        className={className}
      />
    )
  }

  const shape = SHAPES[art]
  const { x, y } = shape.text

  // Signs sit above a small caption (the slogan) so they explain themselves
  const signed = sign && sign !== 'set'
  const lines = wrap(slogan, signed ? 16 : shape.text.w)
  const size = signed ? 8.5 : art === 'band' ? 9 : lines.length > 4 ? 9 : 11
  const signR = 23
  const signY = y - 20
  const textY = signed ? signY + signR + 14 : y
  const start = textY - ((lines.length - 1) * size * 1.15) / 2

  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={`${slogan}`} className={className}>
      <path
        d={shape.path}
        fill={color}
        stroke={INK}
        strokeWidth={art === 'vest' ? 4 : 2}
        strokeLinejoin="round"
        fillRule="evenodd"
      />
      {art === 'raincover' && (
        <g>
          <path
            d="M40 40 Q100 26 160 40"
            stroke="#1b1b1b"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            fill="none"
            opacity="0.5"
          />
          <line x1="34" y1="160" x2="166" y2="160" stroke="#cfd3d8" strokeWidth="6" opacity="0.9" />
        </g>
      )}
      {art === 'jacket' && (
        <g stroke="#cfd3d8" strokeWidth="5" opacity="0.9">
          <line x1="50" y1="160" x2="150" y2="160" />
          <line x1="50" y1="172" x2="150" y2="172" />
          <line x1="14" y1="140" x2="30" y2="142" />
          <line x1="186" y1="140" x2="170" y2="142" />
        </g>
      )}
      {art === 'vest' && (
        <g>
          {/* chunky cartoon reflective bands and a shine on the fabric */}
          <rect
            x="41"
            y="150"
            width="118"
            height="9"
            rx="4.5"
            fill="#dfe3e8"
            stroke={INK}
            strokeWidth="2.5"
          />
          <rect
            x="41"
            y="165"
            width="118"
            height="9"
            rx="4.5"
            fill="#dfe3e8"
            stroke={INK}
            strokeWidth="2.5"
          />
          <path
            d="M50 84 Q46 110 48 138"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
        </g>
      )}
      {sign === 'set' ? (
        <g>
          <Sign kind="space" cx={70} cy={74} r={26} />
          <Sign kind="cyclist" cx={130} cy={74} r={26} />
          <Sign kind="no-phone" cx={72} cy={128} r={22} />
          <Sign kind="octagon" cx={128} cy={128} r={24} />
        </g>
      ) : (
        <>
          {signed && <Sign kind={sign} cx={x} cy={signY} r={signR} />}
          <text
            x={x}
            textAnchor="middle"
            fill={ink}
            fontFamily={FONT}
            fontWeight={800}
            fontSize={size}
            letterSpacing="0.3"
          >
            {lines.map((l, i) => (
              <tspan key={i} x={x} y={start + i * size * 1.15 + size / 3}>
                {l}
              </tspan>
            ))}
          </text>
        </>
      )}
    </svg>
  )
}
