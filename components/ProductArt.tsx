import type { Art, SignPrint } from '@/lib/catalog'

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

const SHAPES: Record<Art, { path: string; text: { x: number; y: number; w: number } }> = {
  tee: {
    path: 'M70 22 L52 28 L18 52 L32 80 L50 70 L50 180 L150 180 L150 70 L168 80 L182 52 L148 28 L130 22 Q100 44 70 22 Z',
    text: { x: 100, y: 105, w: 12 },
  },
  vest: {
    path: 'M66 18 L56 22 Q58 60 44 76 L44 182 L156 182 L156 76 Q142 60 144 22 L134 18 Q118 64 100 64 Q82 64 66 18 Z',
    text: { x: 100, y: 118, w: 12 },
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
const FONT = 'var(--font-archivo), system-ui, sans-serif'

// Road-sign graphics drawn centred on (cx, cy) with outer radius r
function Sign({
  kind,
  cx,
  cy,
  r,
}: {
  kind: Exclude<SignPrint, 'set'>
  cx: number
  cy: number
  r: number
}) {
  if (kind === 'round') {
    return (
      <g>
        <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke="#1b1b1b" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={r * 0.82} fill="none" stroke={SIGN_RED} strokeWidth={r * 0.28} />
        <text
          x={cx}
          y={cy + r * 0.17}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={r * 0.48}
          fill="#1b1b1b"
        >
          1.5m
        </text>
      </g>
    )
  }
  if (kind === 'octagon') {
    const k = r * 0.41
    const d = `M${cx - k} ${cy - r} L${cx + k} ${cy - r} L${cx + r} ${cy - k} L${cx + r} ${cy + k} L${cx + k} ${cy + r} L${cx - k} ${cy + r} L${cx - r} ${cy + k} L${cx - r} ${cy - k} Z`
    return (
      <g>
        <path d={d} fill={SIGN_RED} stroke="#ffffff" strokeWidth={r * 0.08} />
        <text textAnchor="middle" fontFamily={FONT} fontSize={r * 0.4} fill="#ffffff">
          <tspan x={cx} y={cy - r * 0.05}>
            SLOW
          </tspan>
          <tspan x={cx} y={cy + r * 0.42}>
            DOWN
          </tspan>
        </text>
      </g>
    )
  }
  // triangle with a cyclist pictogram
  const s = r / 40
  return (
    <g transform={`translate(${cx - 50 * s} ${cy - 50 * s}) scale(${s})`}>
      <path
        d="M50 8 L94 86 L6 86 Z"
        fill="#ffffff"
        stroke={SIGN_RED}
        strokeWidth="9"
        strokeLinejoin="round"
      />
      <g fill="none" stroke="#1b1b1b" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="36" cy="70" r="9" />
        <circle cx="64" cy="70" r="9" />
        <path d="M36 70 L46 56 L60 56 L64 70 M46 56 L52 70 L60 56 M53 48 L48 56" />
      </g>
      <circle cx="56" cy="44" r="4" fill="#1b1b1b" />
    </g>
  )
}

export default function ProductArt({
  art,
  slogan,
  color,
  ink,
  sign,
  className,
}: {
  art: Art
  slogan: string
  color: string
  ink: string
  sign?: SignPrint
  className?: string
}) {
  const shape = SHAPES[art]
  const lines = wrap(slogan, shape.text.w)
  const size = art === 'band' ? 9 : lines.length > 4 ? 9 : 11
  const start = shape.text.y - ((lines.length - 1) * size * 1.15) / 2
  const { x, y } = shape.text

  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={`${slogan}`} className={className}>
      <path d={shape.path} fill={color} stroke="#1b1b1b" strokeWidth="2" fillRule="evenodd" />
      {art === 'vest' && (
        <g stroke="#cfd3d8" strokeWidth="5" opacity="0.9">
          <line x1="46" y1="158" x2="154" y2="158" />
          <line x1="46" y1="170" x2="154" y2="170" />
        </g>
      )}
      {sign === 'set' ? (
        <g>
          <Sign kind="round" cx={70} cy={76} r={26} />
          <Sign kind="triangle" cx={130} cy={78} r={28} />
          <Sign kind="octagon" cx={100} cy={132} r={28} />
        </g>
      ) : sign ? (
        <Sign kind={sign} cx={x} cy={y - 4} r={art === 'tee' ? 30 : 28} />
      ) : (
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
      )}
    </svg>
  )
}
