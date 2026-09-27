export type Collection = 'family' | 'serious' | 'funny' | 'signs'
export type Art = 'vest' | 'tee' | 'sticker' | 'bell' | 'tote' | 'band'
// A road-sign graphic printed in place of the slogan text
export type SignPrint = 'round' | 'triangle' | 'octagon' | 'set'
export type Color = { name: string; hex: string; ink: string }

const HI_VIS: Color[] = [
  { name: 'Hi-vis yellow', hex: '#e8f525', ink: '#111111' },
  { name: 'Hi-vis orange', hex: '#ff7a1a', ink: '#111111' },
]
const TEE: Color[] = [
  { name: 'Black', hex: '#1b1b1b', ink: '#e8f525' },
  { name: 'White', hex: '#f4f4f0', ink: '#1b1b1b' },
  { name: 'Road grey', hex: '#6b6f76', ink: '#ffffff' },
]
const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const ONE_SIZE = ['One size']

// ---------------------------------------------------------------------------
// Garments: the blank "models" a slogan gets printed on

export type GarmentId = 'vest' | 'tee'

export type Garment = {
  id: GarmentId
  name: string
  withArticle: string // "a hi-vis vest", "an organic tee"
  art: Art
  price: number // euro cents
  colors: Color[]
  sizes: string[]
  description: string
}

export const garments: Garment[] = [
  {
    id: 'vest',
    name: 'Hi-vis vest',
    withArticle: 'a hi-vis vest',
    art: 'vest',
    price: 2900,
    colors: HI_VIS,
    sizes: APPAREL_SIZES,
    description:
      'Fluorescent vest with reflective strips front and back. Light, breathable, fits over a jacket or jersey.',
  },
  {
    id: 'tee',
    name: 'Organic tee',
    withArticle: 'an organic tee',
    art: 'tee',
    price: 2400,
    colors: TEE,
    sizes: APPAREL_SIZES,
    description:
      'Organic cotton t-shirt with a soft screen print. For the ride and the café after.',
  },
]

export function getGarment(id: string | undefined) {
  return garments.find((g) => g.id === id)
}

// ---------------------------------------------------------------------------
// Slogans: printable on any garment. Some have a blank the buyer fills in.

export type Personalise = {
  label: string // question shown above the input
  default: string
  suggestions: string[]
  maxLength: number
}

export type Slogan = {
  id: string
  // "{}" marks the personalised part, e.g. "I could be your {}"
  text: string
  collection: Collection
  sign?: SignPrint
  personalise?: Personalise
}

export const slogans: Slogan[] = [
  {
    id: 'i-could-be-your',
    text: 'I could be your {}',
    collection: 'family',
    personalise: {
      label: 'Who could you be?',
      default: 'sister',
      suggestions: ['sister', 'brother', 'mum', 'dad', 'daughter', 'son', 'grandma', 'best friend'],
      maxLength: 16,
    },
  },
  {
    id: 'waiting-at-home',
    text: '{} is waiting for me at home',
    collection: 'family',
    personalise: {
      label: 'Who’s waiting for you?',
      default: 'Someone',
      suggestions: ['Someone', 'My family', 'My kid', 'My dog', 'My cat'],
      maxLength: 14,
    },
  },
  { id: 'pass-wide', text: 'Pass wide. Pass slow.', collection: 'serious' },
  { id: 'i-am-traffic', text: 'I’m not in your way. I am traffic.', collection: 'serious' },
  { id: 'space-life', text: '1.5 m of space = 1 life', collection: 'serious' },
  { id: 'share-the-road', text: 'Share the road', collection: 'serious' },
  { id: 'jealous-calves', text: 'Honk if you’re jealous of my calves', collection: 'funny' },
  {
    id: 'powered-by',
    text: 'Powered by {}. Zero emissions.',
    collection: 'funny',
    personalise: {
      label: 'What powers you?',
      default: 'pasta',
      suggestions: ['pasta', 'pizza', 'coffee', 'cake', 'croissants', 'spite'],
      maxLength: 14,
    },
  },
  {
    id: 'legs-engine',
    text: 'My legs are my engine. Please don’t scratch the paint.',
    collection: 'funny',
  },
  { id: 'coffee-not-cars', text: 'I stop for coffee, not for cars', collection: 'funny' },
  { id: 'keep-distance', text: 'Keep 1.5 m', collection: 'signs', sign: 'round' },
  { id: 'cyclist-ahead', text: 'Cyclist ahead', collection: 'signs', sign: 'triangle' },
  { id: 'slow-down', text: 'Slow down', collection: 'signs', sign: 'octagon' },
]

export function getSlogan(id: string | undefined) {
  return slogans.find((s) => s.id === id)
}

// Allowed characters for personalised text: letters, digits, spaces and light punctuation
const CUSTOM_OK = /^[\p{L}\p{N} .,'’!&-]+$/u

export function cleanCustom(slogan: Slogan, value: string | undefined) {
  if (!slogan.personalise) return undefined
  const v = (value ?? '').replace(/\s+/g, ' ').trim()
  if (!v) return slogan.personalise.default
  if (v.length > slogan.personalise.maxLength || !CUSTOM_OK.test(v)) return null
  return v
}

export function sloganText(slogan: Slogan, custom?: string) {
  return slogan.personalise
    ? slogan.text.replace('{}', custom || slogan.personalise.default)
    : slogan.text
}

// Slogan text with the blank shown as a line, for listings
export function sloganTemplate(slogan: Slogan) {
  return slogan.text.replace('{}', '___')
}

// ---------------------------------------------------------------------------
// Gadgets: ready-made items with a fixed design

export type Gadget = {
  slug: string
  name: string
  slogan: string
  collection: Collection
  art: Art
  sign?: SignPrint
  price: number
  colors: Color[]
  sizes: string[]
  description: string
}

export const gadgets: Gadget[] = [
  {
    slug: 'share-the-road-sticker-pack',
    name: 'Slogan Sticker Pack',
    slogan: 'Share the road',
    collection: 'serious',
    art: 'sticker',
    price: 800,
    colors: [{ name: 'Mixed', hex: '#e8f525', ink: '#111111' }],
    sizes: ONE_SIZE,
    description:
      'Ten weatherproof vinyl stickers with our slogans. For helmets, frames, laptops and car bumpers (especially car bumpers).',
  },
  {
    slug: 'road-sign-sticker-pack',
    name: 'Road Sign Sticker Pack',
    slogan: 'Road sign stickers',
    collection: 'signs',
    art: 'sticker',
    sign: 'set',
    price: 900,
    colors: [{ name: 'Mixed', hex: '#e8f525', ink: '#111111' }],
    sizes: ONE_SIZE,
    description:
      'Eight weatherproof stickers shaped like road signs: 1.5 m, cyclist ahead, slow down and more.',
  },
  {
    slug: 'ding-ding-be-kind-bell',
    name: 'Ding Ding Bell',
    slogan: 'Ding ding, be kind',
    collection: 'funny',
    art: 'bell',
    price: 1500,
    colors: [
      { name: 'Brass', hex: '#d4a93c', ink: '#111111' },
      { name: 'Hi-vis yellow', hex: '#e8f525', ink: '#111111' },
    ],
    sizes: ONE_SIZE,
    description:
      'A loud, friendly bell engraved with a polite request. Fits standard 22 mm handlebars.',
  },
  {
    slug: 'reflective-slap-band',
    name: 'Reflective Slap Band',
    slogan: 'See me. Pass wide.',
    collection: 'serious',
    art: 'band',
    price: 600,
    colors: HI_VIS,
    sizes: ONE_SIZE,
    description: 'Snap it on your wrist or ankle for extra visibility at night. Sold in pairs.',
  },
  {
    slug: 'cafe-stop-tote',
    name: 'Café Stop Tote',
    slogan: 'I stop for coffee, not for cars',
    collection: 'funny',
    art: 'tote',
    price: 1400,
    colors: [
      { name: 'Natural', hex: '#efe6d2', ink: '#1b1b1b' },
      { name: 'Black', hex: '#1b1b1b', ink: '#e8f525' },
    ],
    sizes: ONE_SIZE,
    description: 'Heavy cotton tote that fits a lock, a jacket and a croissant.',
  },
]

export function getGadget(slug: string | undefined) {
  return gadgets.find((g) => g.slug === slug)
}

// ---------------------------------------------------------------------------
// Cart lines: a garment + slogan (+ personalised text), or a gadget

export type CartLine = {
  item: string // garment id or gadget slug
  slogan?: string // slogan id, garments only
  custom?: string // personalised text, if the slogan has a blank
  color: string
  size: string
  qty: number
}

export type ResolvedLine = {
  title: string
  detail: string
  unit: number
  art: Art
  sign?: SignPrint
  text: string
  color: Color
  href: string
}

// Validates a cart line against the catalogue and prices it. Used by the cart,
// the checkout form and (authoritatively) by the checkout server action.
export function resolveLine(line: CartLine): ResolvedLine | null {
  const garment = getGarment(line.item)
  if (garment) {
    const slogan = getSlogan(line.slogan)
    const color = garment.colors.find((c) => c.name === line.color)
    if (!slogan || !color || !garment.sizes.includes(line.size)) return null
    const custom = cleanCustom(slogan, line.custom)
    if (custom === null) return null
    const text = sloganText(slogan, custom)
    return {
      title: `“${text}” on ${garment.withArticle}`,
      detail: `${color.name} · ${line.size}`,
      unit: garment.price,
      art: garment.art,
      sign: slogan.sign,
      text,
      color,
      href: designHref({ garment: garment.id, slogan: slogan.id, custom }),
    }
  }
  const gadget = getGadget(line.item)
  if (gadget) {
    const color = gadget.colors.find((c) => c.name === line.color)
    if (!color || !gadget.sizes.includes(line.size)) return null
    return {
      title: gadget.name,
      detail: color.name,
      unit: gadget.price,
      art: gadget.art,
      sign: gadget.sign,
      text: gadget.slogan,
      color,
      href: `/shop/${gadget.slug}`,
    }
  }
  return null
}

export function designHref(p: { garment?: string; slogan?: string; custom?: string }) {
  const q = new URLSearchParams()
  if (p.garment) q.set('garment', p.garment)
  if (p.slogan) q.set('slogan', p.slogan)
  if (p.custom) q.set('text', p.custom)
  const s = q.toString()
  return s ? `/design?${s}` : '/design'
}

// ---------------------------------------------------------------------------

export function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(cents / 100)
}

export const FREE_SHIPPING_FROM = 5000
export const SHIPPING = 495

export function shippingFor(subtotal: number) {
  return subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING
}

export const collections: Record<Collection, { label: string; blurb: string }> = {
  family: {
    label: 'Family',
    blurb: 'I could be your sister, your dad, your best friend. Every rider is somebody’s someone.',
  },
  serious: {
    label: 'Serious',
    blurb: 'Direct messages for busy roads: space, patience, respect.',
  },
  funny: {
    label: 'Funny',
    blurb: 'A laugh travels faster than a horn. Make drivers smile, then make them slow down.',
  },
  signs: {
    label: 'Road Signs',
    blurb: 'Signs every driver already obeys, printed where they can’t miss them: on you.',
  },
}

export const COLLECTIONS = Object.keys(collections) as Collection[]

export const collectionTag: Record<Collection, string> = {
  family: 'bg-signal text-ink',
  serious: 'bg-ink text-paper',
  funny: 'bg-volt text-ink',
  signs: 'bg-sign text-white',
}
