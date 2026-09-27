export type Collection = 'family' | 'serious' | 'funny' | 'signs'
export type Art =
  | 'vest'
  | 'tank'
  | 'tee'
  | 'longsleeve'
  | 'jacket'
  | 'raincover'
  | 'sticker'
  | 'bell'
  | 'tote'
  | 'band'
// A road-sign graphic printed in place of the slogan text
export type SignPrint =
  | 'space' // blue sign: car, gap arrow, bike
  | 'cyclist' // warning triangle with a cyclist
  | 'heart' // warning triangle with a heart
  | 'eye' // warning triangle with an eye
  | 'octagon' // red octagon reading SLOW DOWN
  | 'no-phone' // prohibition sign over a phone
  | 'no-horn' // prohibition sign over a horn
  | 'set' // several signs, for the sticker pack
export type Color = { name: string; hex: string; ink: string }

import {
  familyLines,
  funnyLines,
  libraryFor,
  seriousLines,
  signLines,
  sloganId,
} from './slogan-library'

const HI_VIS: Color[] = [
  { name: 'Hi-vis yellow', hex: '#e8f525', ink: '#111111' },
  { name: 'Hi-vis orange', hex: '#ff7a1a', ink: '#111111' },
]
const BLACK_WHITE: Color[] = [
  { name: 'Black', hex: '#1b1b1b', ink: '#e8f525' },
  { name: 'White', hex: '#f4f4f0', ink: '#1b1b1b' },
]
const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const ONE_SIZE = ['One size']

// ---------------------------------------------------------------------------
// Garments: the blank "models" a slogan gets printed on.
// Listed as shown in the shop: everyday wear first, then hi-vis gear.

export type GarmentId = 'vest' | 'tank' | 'tee' | 'longsleeve' | 'jacket' | 'raincover'

export type Garment = {
  id: GarmentId
  name: string
  withArticle: string // "a hi-vis vest", "a t-shirt"
  art: Art
  price: number // pence
  colors: Color[]
  sizes: string[]
  description: string
}

export const garments: Garment[] = [
  {
    id: 'tank',
    name: 'Tank top',
    withArticle: 'a tank top',
    art: 'tank',
    price: 2200,
    colors: BLACK_WHITE,
    sizes: APPAREL_SIZES,
    description: 'Light, breathable tank top for hot rides. Big back print, nothing in the way.',
  },
  {
    id: 'tee',
    name: 'T-shirt',
    withArticle: 'a t-shirt',
    art: 'tee',
    price: 2400,
    colors: BLACK_WHITE,
    sizes: APPAREL_SIZES,
    description:
      'Organic cotton t-shirt with a soft screen print. For the ride and the café after.',
  },
  {
    id: 'longsleeve',
    name: 'Long-sleeve shirt',
    withArticle: 'a long-sleeve shirt',
    art: 'longsleeve',
    price: 3200,
    colors: BLACK_WHITE,
    sizes: APPAREL_SIZES,
    description: 'For cool mornings and autumn commutes. Organic cotton, relaxed fit.',
  },
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
    id: 'jacket',
    name: 'Rain jacket',
    withArticle: 'a rain jacket',
    art: 'jacket',
    price: 4500,
    colors: HI_VIS,
    sizes: APPAREL_SIZES,
    description:
      'Waterproof hi-vis jacket with reflective strips. The slogan goes big on the back, where drivers look.',
  },
  {
    id: 'raincover',
    name: 'Bag rain cover',
    withArticle: 'a bag rain cover',
    art: 'raincover',
    price: 2500,
    colors: HI_VIS,
    sizes: ['15–25 L', '25–35 L'],
    description:
      'Waterproof hi-vis cover for your backpack, with a reflective strip. Your slogan stays visible when it pours.',
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
  suggestions: string[] // quick picks shown straight away
  more?: string[] // extra ideas behind a "See more" link
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
  // Family
  {
    id: 'i-could-be-your',
    text: 'I could be your {}',
    collection: 'family',
    personalise: {
      label: 'Who could you be?',
      default: 'sister',
      suggestions: ['sister', 'brother', 'mum', 'dad', 'daughter', 'son', 'grandma', 'best friend'],
      more: ['grandpa', 'nonna', 'nonno', 'aunt', 'uncle', 'cousin', 'niece', 'nephew', 'twin', 'wife', 'husband', 'partner', 'girlfriend', 'boyfriend', 'stepmum', 'stepdad', 'godmother', 'bestie', 'neighbour', 'teacher', 'nurse', 'doctor', 'colleague', 'barista', 'postie', 'coach', 'first love', 'childhood friend'],
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
      more: ['My mum', 'My dad', 'My partner', 'My wife', 'My husband', 'My twins', 'My nonna', 'My flatmate', 'My goldfish', 'My hamster', 'My plants', 'My sourdough', 'My sofa', 'Dinner'],
      maxLength: 14,
    },
  },
  {
    id: 'somebodys',
    text: 'I’m somebody’s {}',
    collection: 'family',
    personalise: {
      label: 'Whose are you?',
      default: 'mum',
      suggestions: ['mum', 'dad', 'kid', 'sister', 'brother', 'grandma', 'whole world'],
      more: ['nonna', 'nonno', 'grandad', 'auntie', 'uncle', 'cousin', 'bestie', 'partner', 'other half', 'neighbour', 'teacher', 'hero', 'favourite', 'sunshine'],
      maxLength: 14,
    },
  },
  {
    id: 'home-for-dinner',
    text: '{} wants me home for dinner',
    collection: 'family',
    personalise: {
      label: 'Who wants you home?',
      default: 'Mum',
      suggestions: ['Mum', 'Nonna', 'My kids', 'My partner', 'The dog'],
      more: ['Dad', 'Grandma', 'Grandad', 'Nonno', 'My wife', 'My husband', 'My twins', 'My flatmate', 'The cat', 'The kids', 'Everyone'],
      maxLength: 12,
    },
  },
  { id: 'loves-me', text: 'Somebody loves me. Drive like it.', collection: 'family' },
  { id: 'kids-ride-here', text: 'Drive like your kids ride here', collection: 'family' },

  // Serious
  { id: 'pass-wide', text: 'Pass wide. Pass slow.', collection: 'serious' },
  { id: 'i-am-traffic', text: 'I’m not in your way. I am traffic.', collection: 'serious' },
  { id: 'share-the-road', text: 'Share the road', collection: 'serious' },
  { id: 'not-worth-it', text: 'Your hurry is not worth my life', collection: 'serious' },
  { id: 'few-seconds', text: 'Slow down. It’s only a few seconds.', collection: 'serious' },
  { id: 'same-rights', text: 'Same road. Same rights.', collection: 'serious' },
  { id: 'a-person', text: 'Not a cyclist. A person.', collection: 'serious' },
  { id: 'wait-then-pass', text: 'No space? Wait. Then pass wide.', collection: 'serious' },
  { id: 'get-home', text: 'We’re all just trying to get home', collection: 'serious' },

  // Funny
  { id: 'jealous-calves', text: 'Honk if you’re jealous of my calves', collection: 'funny' },
  {
    id: 'powered-by',
    text: 'Powered by {}. Zero emissions.',
    collection: 'funny',
    personalise: {
      label: 'What powers you?',
      default: 'pasta',
      suggestions: ['pasta', 'pizza', 'coffee', 'cake', 'croissants', 'spite'],
      more: ['espresso', 'tiramisù', 'risotto', 'carbonara', 'gelato', 'biscotti', 'porridge', 'bananas', 'flapjacks', 'tea', 'bacon rolls', 'noodles', 'podcasts', 'sunshine', 'stubbornness', 'love'],
      maxLength: 14,
    },
  },
  {
    id: 'brake-for',
    text: 'I brake for {}',
    collection: 'funny',
    personalise: {
      label: 'What do you brake for?',
      default: 'gelato',
      suggestions: ['gelato', 'espresso', 'cats', 'bakeries', 'sunsets'],
      more: ['pizza', 'cake', 'coffee', 'ice cream', 'croissants', 'pastries', 'dogs', 'ducks', 'hedgehogs', 'squirrels', 'puddles', 'views', 'children', 'red lights'],
      maxLength: 12,
    },
  },
  {
    id: 'legs-engine',
    text: 'My legs are my engine. Please don’t scratch the paint.',
    collection: 'funny',
  },
  { id: 'coffee-not-cars', text: 'I stop for coffee, not for cars', collection: 'funny' },
  { id: 'sightseeing', text: 'I’m not slow. I’m sightseeing.', collection: 'funny' },
  { id: 'one-less-car', text: 'One less car. You’re welcome.', collection: 'funny' },
  { id: 'saving-planet', text: 'Stuck behind me? I’m saving the planet.', collection: 'funny' },
  { id: 'other-car', text: 'My other car is also a bike', collection: 'funny' },
  { id: 'just-wave', text: 'Honk if you love cyclists. Actually, just wave.', collection: 'funny' },
  { id: 'traffic-jam', text: 'Faster than your traffic jam', collection: 'funny' },
  { id: 'may-stop', text: 'Warning: may stop for coffee at any moment', collection: 'funny' },

  // Road signs: every sign carries a caption, so it reads without knowing the rules
  { id: 'give-space', text: 'Give me space', collection: 'signs', sign: 'space' },
  { id: 'cyclist-ahead', text: 'Cyclist ahead. Slow down.', collection: 'signs', sign: 'cyclist' },
  { id: 'human-on-board', text: 'Human on board', collection: 'signs', sign: 'heart' },
  { id: 'slow-down', text: 'It only costs you seconds', collection: 'signs', sign: 'octagon' },
  { id: 'eyes-on-road', text: 'Eyes on the road', collection: 'signs', sign: 'no-phone' },
  { id: 'no-honk', text: 'No need to honk. I see you.', collection: 'signs', sign: 'no-horn' },
  { id: 'look-twice', text: 'Look twice. Save a life.', collection: 'signs', sign: 'eye' },

  // More personalised ones
  {
    id: 'is-watching',
    text: 'Drive nice. My {} is watching.',
    collection: 'family',
    personalise: {
      label: 'Who’s watching?',
      default: 'nonna',
      suggestions: ['nonna', 'mum', 'dad', 'dog', 'kids', 'grandpa'],
      more: ['granny', 'grandad', 'nonno', 'auntie', 'cat', 'bestie', 'wife', 'husband', 'boss', 'teacher', 'neighbour', 'camera'],
      maxLength: 12,
    },
  },
  {
    id: 'will-ride-for',
    text: 'Will ride for {}',
    collection: 'funny',
    personalise: {
      label: 'What would you ride for?',
      default: 'gelato',
      suggestions: ['gelato', 'pizza', 'croissants', 'beer', 'tacos', 'love'],
      more: ['coffee', 'cake', 'cheese', 'crisps', 'biscuits', 'ice cream', 'noodles', 'sushi', 'donuts', 'snacks', 'views', 'hugs'],
      maxLength: 12,
    },
  },

  // The wider library
  ...libraryFor('family', familyLines),
  ...libraryFor('serious', seriousLines),
  ...libraryFor('funny', funnyLines),
  ...signLines.map(([sign, text]) => ({
    id: sloganId(text),
    text,
    collection: 'signs' as const,
    sign,
  })),
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
// Gadgets: ready-made items with a fixed design.
// Paused for now: not linked from the shop or menus, but their pages still work.

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
      'Eight weatherproof road-sign stickers: give me space, cyclist ahead, slow down, eyes on the road and more.',
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
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(cents / 100)
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
  family: 'bg-white text-ink',
  serious: 'bg-white text-ink',
  funny: 'bg-white text-ink',
  signs: 'bg-white text-ink',
}

// Categories people can file a slogan suggestion under: the collections plus a
// catch-all for ideas that don't fit (or when they're not sure)
export const suggestionCategories: { value: string; label: string }[] = [
  { value: 'general', label: 'General' },
  ...COLLECTIONS.map((c) => ({ value: c, label: collections[c].label })),
]

export function suggestionCategoryLabel(value: string) {
  return suggestionCategories.find((c) => c.value === value)?.label ?? 'General'
}
