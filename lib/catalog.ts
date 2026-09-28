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
// Tank, t-shirt and long sleeve: black with yellow or white print, white with black print
const APPAREL_COLORS: Color[] = [
  BLACK_WHITE[0],
  { name: 'Black, white print', hex: '#1b1b1b', ink: '#f4f4f0' },
  BLACK_WHITE[1],
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
  fits?: Fit[] // cuts on offer; the first is the default. Omitted = unisex only
  description: string
}

export type Fit = 'unisex' | 'women'
// Named by cut, not gender. Previews still show a man or a woman to match.
export const fitLabel: Record<Fit, string> = { unisex: 'Relaxed', women: 'Fitted' }

const allGarments: Garment[] = [
  {
    id: 'tank',
    name: 'Tank top',
    withArticle: 'a tank top',
    art: 'tank',
    price: 1900,
    colors: APPAREL_COLORS,
    sizes: APPAREL_SIZES,
    fits: ['unisex', 'women'],
    description: 'Light, breathable tank top for hot rides. Big back print, nothing in the way.',
  },
  {
    id: 'tee',
    name: 'T-shirt',
    withArticle: 'a t-shirt',
    art: 'tee',
    price: 2400,
    colors: APPAREL_COLORS,
    sizes: APPAREL_SIZES,
    fits: ['unisex', 'women'],
    description:
      'Organic cotton t-shirt with a soft screen print. For the ride and the café after.',
  },
  {
    id: 'longsleeve',
    name: 'Long-sleeve shirt',
    withArticle: 'a long-sleeve shirt',
    art: 'longsleeve',
    price: 3400,
    colors: APPAREL_COLORS,
    sizes: APPAREL_SIZES,
    fits: ['unisex'], // relaxed cut only
    description: 'For cool mornings and autumn commutes. Organic cotton, relaxed fit.',
  },
  {
    id: 'vest',
    name: 'Hi-vis vest',
    withArticle: 'a hi-vis vest',
    art: 'vest',
    price: 2400,
    colors: HI_VIS,
    sizes: APPAREL_SIZES,
    description:
      'Fluorescent vest with reflective strips front and back. Light, breathable, fits over a jacket or jersey.',
  },
  {
    id: 'jacket',
    name: 'Hi-vis jacket',
    withArticle: 'a hi-vis jacket',
    art: 'jacket',
    price: 6500,
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
    price: 1400,
    colors: HI_VIS,
    sizes: ['15–25 L', '25–35 L'],
    description:
      'Waterproof hi-vis cover for your backpack, with a reflective strip. Your slogan stays visible when it pours.',
  },
]

// What's on sale right now (all have real product photos). Remove an id to pause it.
const ON_SALE: GarmentId[] = ['tank', 'tee', 'longsleeve', 'vest', 'jacket', 'raincover']
export const garments = allGarments.filter((g) => ON_SALE.includes(g.id))

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

const allSlogans: Slogan[] = [
  // Family
  {
    id: 'i-could-be-your',
    text: 'I could be your {}',
    collection: 'family',
    personalise: {
      label: 'Who could you be?',
      default: 'brother',
      suggestions: ['brother', 'sister', 'mum', 'dad', 'best friend', 'daughter', 'son', 'grandma'],
      more: [
        'grandpa',
        'nonna',
        'nonno',
        'aunt',
        'uncle',
        'cousin',
        'niece',
        'nephew',
        'twin',
        'wife',
        'husband',
        'partner',
        'girlfriend',
        'boyfriend',
        'stepmum',
        'stepdad',
        'godmother',
        'bestie',
        'neighbour',
        'teacher',
        'nurse',
        'doctor',
        'colleague',
        'barista',
        'postie',
        'coach',
        'kid’s coach',
        'first love',
        'childhood friend',
      ],
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
      suggestions: ['Someone', 'My family', 'My kid', 'My mum', 'My cat', 'My dog'],
      more: [
        'My dad',
        'My partner',
        'My wife',
        'My husband',
        'My son',
        'My daughter',
        'My nonna',
        'My flatmate',
        'My goldfish',
        'My hamster',
        'My cactus',
        'My sourdough',
        'My sofa',
        'Dinner',
      ],
      maxLength: 14,
    },
  },
  {
    id: 'somebodys',
    text: 'I’m somebody’s {}',
    collection: 'family',
    personalise: {
      label: 'Whose are you?',
      default: 'dad',
      suggestions: ['dad', 'mum', 'kid', 'sister', 'whole world', 'brother', 'grandma'],
      more: [
        'nonna',
        'nonno',
        'grandad',
        'auntie',
        'uncle',
        'cousin',
        'bestie',
        'partner',
        'other half',
        'neighbour',
        'teacher',
        'hero',
        'favourite',
        'sunshine',
      ],
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
      suggestions: ['Mum', 'Nonna', 'My kid', 'My partner', 'The cat', 'The dog'],
      more: [
        'Dad',
        'Grandma',
        'Grandad',
        'Nonno',
        'My wife',
        'My husband',
        'My son',
        'My daughter',
        'My flatmate',
        'Everyone',
      ],
      maxLength: 12,
    },
  },
  {
    id: 'counting-on-me',
    text: '{} is counting on me',
    collection: 'family',
    personalise: {
      label: 'Who’s counting on you?',
      default: 'Somebody',
      suggestions: ['Somebody', 'My family', 'My kid', 'My mum', 'My team', 'My dog'],
      more: [
        'My dad',
        'My partner',
        'My wife',
        'My husband',
        'My nonna',
        'My boss',
        'My club',
        'My cat',
        'Everyone',
      ],
      maxLength: 14,
    },
  },
  {
    id: 'made-me-wear',
    text: 'My {} made me wear this',
    collection: 'family',
    personalise: {
      label: 'Who made you wear it?',
      default: 'mum',
      suggestions: ['mum', 'dad', 'nonna', 'wife', 'husband', 'kids'],
      more: [
        'partner',
        'boyfriend',
        'girlfriend',
        'grandma',
        'sister',
        'brother',
        'cat',
        'boss',
        'therapist',
      ],
      maxLength: 12,
    },
  },
  {
    id: 'on-the-way-home',
    text: '{} on the way home',
    collection: 'family',
    personalise: {
      label: 'Who’s on the way home?',
      default: 'Mummy’s',
      suggestions: ['Mummy’s', 'Daddy’s', 'Nonna’s', 'Grandad’s', 'Auntie’s'],
      more: ['Mum’s', 'Dad’s', 'Grandma’s', 'Nonno’s', 'Uncle’s', 'Your neighbour’s', 'Somebody’s'],
      maxLength: 16,
    },
  },
  {
    id: 'imagine-its-your',
    text: 'Imagine it’s your {} on this bike',
    collection: 'family',
    personalise: {
      label: 'Imagine it’s your…',
      default: 'mum',
      suggestions: ['mum', 'dad', 'kid', 'sister', 'brother', 'nonna'],
      more: ['grandma', 'grandad', 'wife', 'husband', 'partner', 'best friend', 'daughter', 'son'],
      maxLength: 12,
    },
  },
  {
    id: 'to-feed',
    text: 'I have a {} to feed',
    collection: 'family',
    personalise: {
      label: 'Who needs feeding?',
      default: 'dog',
      suggestions: ['dog', 'cat', 'family', 'baby', 'hamster'],
      more: ['goldfish', 'parrot', 'tortoise', 'partner', 'teenager'],
      maxLength: 16,
    },
  },
  {
    id: 'loves-me',
    text: 'My {} loves me. Drive like it.',
    collection: 'family',
    personalise: {
      label: 'Who loves you?',
      default: 'family',
      suggestions: ['family', 'mum', 'dad', 'wife', 'husband', 'kids'],
      more: ['nan', 'grandad', 'partner', 'dog', 'cat', 'best friend', 'whole street'],
      maxLength: 16,
    },
  },
  {
    id: 'im-someones-reason-to-smile',
    text: 'I’m my {}’s reason to smile',
    collection: 'family',
    personalise: {
      label: 'Whose reason to smile are you?',
      default: 'daughter',
      suggestions: ['daughter', 'son', 'mum', 'dad', 'wife', 'husband'],
      more: ['nan', 'grandad', 'partner', 'best friend', 'dog', 'cat'],
      maxLength: 16,
    },
  },
  {
    id: 'be-kind-i-have-a-family',
    text: 'Be kind. I have a {}.',
    collection: 'family',
    personalise: {
      label: 'What do you have?',
      default: 'family',
      suggestions: ['family', 'cat', 'dog', 'baby on the way', 'mortgage'],
      more: ['hamster', 'big day tomorrow', 'train to catch'],
      maxLength: 16,
    },
  },
  {
    id: 'future-grandma-please-pass-wide',
    text: 'Future {}. Please pass wide.',
    collection: 'family',
    personalise: {
      label: 'Future what?',
      default: 'grandma',
      suggestions: ['grandma', 'grandad', 'mum', 'dad', 'Olympian'],
      more: ['nonna', 'nonno', 'bride', 'groom', 'centenarian', 'champion'],
      maxLength: 16,
    },
  },
  {
    id: 'i-promised-id-be-home-by-six',
    text: 'I promised I’d be home by {}',
    collection: 'family',
    personalise: {
      label: 'Home by when?',
      default: 'six',
      suggestions: ['six', 'bedtime', 'dinner', 'tea time'],
      more: ['five', 'seven', 'midnight', 'the match', 'story time'],
      maxLength: 14,
    },
  },
  {
    id: 'tonight-is-pizza-night-let-me-get-there',
    text: 'Tonight is {} night. Let me get there.',
    collection: 'family',
    personalise: {
      label: 'What night is it?',
      default: 'pizza',
      suggestions: ['pizza', 'curry', 'taco', 'quiz', 'film'],
      more: ['date', 'games', 'roast', 'chippy', 'bath'],
      maxLength: 12,
    },
  },
  {
    id: 'on-my-way-back-to-the-people-i-love',
    text: 'On my way back to {}',
    collection: 'family',
    personalise: {
      label: 'Who are you heading back to?',
      default: 'the ones I love',
      suggestions: ['the ones I love', 'my kids', 'my family', 'my cat', 'my dog'],
      more: ['my wife', 'my husband', 'my partner', 'the sofa', 'the pub'],
      maxLength: 16,
    },
  },
  {
    id: 'my-cat-needs-me-alive',
    text: 'My {} needs me alive',
    collection: 'family',
    personalise: {
      label: 'Who needs you alive?',
      default: 'cat',
      suggestions: ['cat', 'dog', 'family', 'goldfish', 'plant'],
      more: ['hamster', 'tortoise', 'rabbit', 'team'],
      maxLength: 16,
    },
  },
  {
    id: 'kids-ride-here',
    text: 'Drive like your {} rides here',
    collection: 'family',
    personalise: {
      label: 'Who rides here?',
      default: 'kid',
      suggestions: ['kid', 'mum', 'dad', 'nonna', 'grandad', 'sister', 'brother'],
      more: ['daughter', 'son', 'grandma', 'wife', 'husband', 'partner', 'best friend'],
      maxLength: 12,
    },
  },

  // Serious
  { id: 'pass-wide', text: 'Pass wide. Pass slow.', collection: 'serious' },
  { id: 'i-am-traffic', text: 'I’m not in your way. I am traffic.', collection: 'serious' },
  { id: 'share-the-road', text: 'Share the road', collection: 'serious' },
  { id: 'not-worth-it', text: 'Your hurry is not worth my life', collection: 'serious' },
  { id: 'few-seconds', text: 'Slow down. It’s only a few seconds.', collection: 'serious' },
  { id: 'same-rights', text: 'Same road. Same rights.', collection: 'serious' },
  {
    id: 'a-person',
    text: 'Not a cyclist. I’m {}.',
    collection: 'serious',
    personalise: {
      label: 'What are you?',
      default: 'a person',
      suggestions: ['a person', 'a dad', 'a mum', 'a sister', 'a human', 'a brother', 'a nurse'],
      more: [
        'a son',
        'a daughter',
        'a grandma',
        'a grandad',
        'a nonna',
        'a wife',
        'a husband',
        'a teacher',
        'a doctor',
        'a friend',
        'an aunt',
        'an uncle',
        'someone’s kid',
        'someone’s mum',
        'someone’s dad',
      ],
      maxLength: 16,
    },
  },
  {
    id: 'overtake-like-its-your-child-on-the-bike',
    text: 'Overtake like it’s your {} on the bike',
    collection: 'serious',
    personalise: {
      label: 'Who might it be?',
      default: 'child',
      suggestions: ['child', 'mum', 'dad', 'best friend', 'grandma'],
      more: ['sister', 'brother', 'partner', 'grandad', 'neighbour'],
      maxLength: 14,
    },
  },
  {
    id: 'i-ride-so-the-air-is-cleaner-for-your-kids',
    text: 'I ride so the air is cleaner for your {}',
    collection: 'serious',
    personalise: {
      label: 'Cleaner for whose sake?',
      default: 'kids',
      suggestions: ['kids', 'grandkids', 'lungs', 'dog'],
      more: ['family', 'children', 'baby', 'neighbours'],
      maxLength: 14,
    },
  },
  { id: 'wait-then-pass', text: 'No space? Wait. Then pass wide.', collection: 'serious' },
  { id: 'get-home', text: 'We’re all just trying to get home', collection: 'serious' },

  // Funny
  {
    id: 'jealous-calves',
    text: 'Honk if you’re jealous of my {}',
    collection: 'funny',
    personalise: {
      label: 'Jealous of your…?',
      default: 'calves',
      suggestions: ['calves', 'bum', 'thighs', 'legs', 'arse', 'tan lines'],
      more: [
        'quads',
        'lungs',
        'lycra',
        'bike',
        'helmet hair',
        'stamina',
        'freedom',
        'parking spot',
        'fuel bill',
        'free gym',
        'smile',
      ],
      maxLength: 14,
    },
  },
  {
    id: 'powered-by',
    text: 'Powered by {}. Zero emissions.',
    collection: 'funny',
    personalise: {
      label: 'What powers you?',
      default: 'pasta',
      suggestions: ['pasta', 'fish and chips', 'pizza', 'coffee', 'spite', 'cake'],
      more: [
        'croissants',
        'espresso',
        'tiramisù',
        'risotto',
        'carbonara',
        'gelato',
        'biscotti',
        'porridge',
        'bananas',
        'flapjacks',
        'tea',
        'bacon rolls',
        'noodles',
        'podcasts',
        'sunshine',
        'stubbornness',
        'love',
      ],
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
      more: [
        'pizza',
        'cake',
        'coffee',
        'ice cream',
        'croissants',
        'pastries',
        'dogs',
        'ducks',
        'hedgehogs',
        'squirrels',
        'puddles',
        'views',
        'children',
        'red lights',
      ],
      maxLength: 12,
    },
  },
  {
    id: 'legs-engine',
    text: 'My legs are my engine. Please don’t scratch the paint.',
    collection: 'funny',
  },
  {
    id: 'earning-my',
    text: 'Earning my {}',
    collection: 'funny',
    personalise: {
      label: 'What are you earning?',
      default: 'tiramisù',
      suggestions: ['tiramisù', 'second breakfast', 'pizza', 'cake', 'pint', 'fish and chips'],
      more: ['gelato', 'croissant', 'brownie', 'burger', 'curry', 'Sunday roast', 'nap'],
      maxLength: 16,
    },
  },
  {
    id: 'espresso-in-watts-out',
    text: '{} in, watts out',
    collection: 'funny',
    personalise: {
      label: 'What’s your fuel?',
      default: 'Espresso',
      suggestions: ['Espresso', 'Cake', 'Pasta', 'Porridge', 'Flat white'],
      more: ['Banana', 'Croissant', 'Beer', 'Gel', 'Jelly babies'],
      maxLength: 14,
    },
  },
  {
    id: 'currently-burning-off-tonights-dinner',
    text: 'Currently burning off {}',
    collection: 'funny',
    personalise: {
      label: 'What are you burning off?',
      default: 'tonight’s dinner',
      suggestions: ['tonight’s dinner', 'that cake', 'Christmas'],
      more: ['my birthday', 'the weekend', 'a full English', 'the biscuit tin'],
      maxLength: 16,
    },
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
      suggestions: ['nonna', 'mum', 'dad', 'dog', 'cat', 'kid', 'grandpa'],
      more: [
        'granny',
        'grandad',
        'nonno',
        'auntie',
        'bestie',
        'wife',
        'husband',
        'boss',
        'teacher',
        'neighbour',
        'camera',
      ],
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
      more: [
        'coffee',
        'cake',
        'cheese',
        'crisps',
        'biscuits',
        'ice cream',
        'noodles',
        'sushi',
        'donuts',
        'snacks',
        'views',
        'hugs',
      ],
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

// Collections hidden from the shop for now. Remove 'signs' here to bring road signs back.
const PAUSED: Collection[] = ['signs']
// Slogans taken out of the shop (cull of Sep 2026). Delete an id here to bring it back.
const REMOVED = new Set([
  'precious-cargo-on-board',
  'my-kids-think-im-a-superhero-prove-them-right',
  'treat-me-like-family',
  'ride-like-someone-loves-you-drive-like-it-too',
  'every-rider-has-a-story',
  'home-is-where-im-heading',
  'my-family-rides-here-too',
  'wave-at-me-i-might-be-your-cousin',
  'please-return-me-to-my-family-unharmed',
  'somebody-will-miss-me-at-dinner',
  'patience-is-free',
  'seen-me-good-now-give-me-space',
  'respect-is-free',
  'bikes-are-traffic-too',
  'arrive-together',
  'slow-is-smooth-smooth-is-safe',
  'no-overtaking-on-blind-bends',
  'look-out-for-each-other',
  'streets-are-for-people',
  'one-second-of-distraction-could-cost-my-life',
  'headlights-on-phone-away',
  'im-vulnerable-youre-not',
  'pass-me-like-youd-pass-a-horse',
  'i-ride-to-work-just-like-you-drive-to-work',
  'road-rage-never-got-anyone-home-faster',
  'take-a-breath-then-overtake',
  'calm-roads-for-everyone',
  'safety-is-a-shared-job',
  'brake-for',
  'legs-engine',
  'coffee-not-cars',
  'other-car',
  'just-wave',
  'traffic-jam',
  'may-stop',
  'will-ride-for',
  'legs-of-steel-skin-of-paper-please-pass-wide',
  'pedal-power-activated',
  'im-not-lost-im-on-a-ride',
  'cyclist-by-day-snack-enthusiast-by-night',
  'my-bike-is-cheaper-than-your-parking',
  'no-parking-fees-no-regrets',
  'i-climb-hills-for-fun-weird-i-know',
  'hills-are-just-flat-roads-with-attitude',
  'ask-me-about-my-cadence-actually-dont',
  'helmet-hair-dont-care',
  'running-late-not-me-im-on-a-bike',
  'my-commute-has-birds-yours-has-traffic',
  'zero-litres-per-100-km',
  'carbon-footprint-pasta',
  'chasing-sunsets-not-cars',
  'im-in-no-hurry-clearly',
  'honk-twice-if-you-like-my-socks',
  'nice-car-mine-has-a-bell',
  'ding-ding-that-was-a-friendly-ding',
  'snack-stop-in-5-km',
  'uphill-is-just-character-building',
  'downhill-is-my-reward',
  'out-of-breath-not-out-of-patience',
  'slower-than-you-happier-than-you',
  'my-bike-doesnt-need-a-car-wash',
  'tyres-pumped-mood-pumped',
  'pedals-before-petrol',
  'warning-frequent-snack-stops',
  'i-bike-therefore-i-am-hungry',
  'spokesperson-for-safer-roads',
  'tired-legs-happy-heart',
  'wheelie-good-at-being-careful',
  'not-racing-just-vibing',
  'just-here-for-the-cafe-stop',
  'my-other-hobby-is-also-cycling',
  'life-is-better-at-20-km-h',
  '20-km-h-of-pure-joy',
  'congestion-never-heard-of-her',
  'traffic-jams-are-for-toast',
  'beep-beep-is-not-a-love-language',
  'i-pedal-you-smile-deal',
  'this-bike-runs-on-good-vibes',
  'built-for-comfort-not-for-speed',
  'sunday-rider-every-day-of-the-week',
  'i-came-for-the-views-stayed-for-the-pastries',
  'if-you-can-read-this-thanks-for-the-space',
  'ill-beat-you-to-the-parking-spot',
  'cheaper-than-therapy',
  'overtaking-me-wont-make-you-less-late',
  'lycra-because-dignity-is-overrated',
  'yes-the-bike-was-expensive-no-i-wont-discuss-it',
  'brb-cycling-up-a-hill-for-no-reason',
  'hi-im-the-traffic-youre-complaining-about',
  'please-pass-wide-my-ego-is-fragile',
  'slow-on-hills-fast-at-cafe-stops',
  'im-not-sweating-im-sparkling',
])
export const slogans = allSlogans.filter(
  (s) => !PAUSED.includes(s.collection) && !REMOVED.has(s.id)
)

export function getSlogan(id: string | undefined) {
  return slogans.find((s) => s.id === id)
}

// Allowed characters for personalised text: letters, digits, spaces and light punctuation
const CUSTOM_OK = /^[\p{L}\p{N} .,'’!&-]+$/u

export function cleanCustom(slogan: Slogan, value: string | undefined) {
  if (!slogan.personalise) return undefined
  const v = (value ?? '').replace(/\s+/g, ' ').trim()
  if (!v) return slogan.personalise.default
  if (v.length > Math.min(slogan.personalise.maxLength, CUSTOM_MAX) || !CUSTOM_OK.test(v))
    return null
  return v
}

// Longest word a customer can put in the blank, so it prints big on its own line
export const CUSTOM_MAX = 16

// Text for the print: the custom word gets a line of its own ("\n" marks the breaks),
// keeping anything stuck to it ("’s", ".") on the same line
export function markCustom(before: string, word: string, after: string) {
  const glue = after.match(/^\S*/)?.[0] ?? ''
  return [before.trim(), word + glue, after.slice(glue.length).trim()].filter(Boolean).join('\n')
}

export function printText(slogan: Slogan, custom?: string) {
  if (!slogan.personalise) return slogan.text
  const [before, after] = slogan.text.split('{}')
  return markCustom(before, custom || slogan.personalise.default, after)
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
  fit?: Fit // only 'women' is stored; missing = unisex
  qty: number
}

export type ResolvedLine = {
  title: string
  detail: string
  unit: number
  art: Art
  sign?: SignPrint
  text: string
  print?: string // text for the print, custom word on its own line
  color: Color
  fit?: Fit
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
    const fit: Fit = line.fit === 'women' ? 'women' : 'unisex'
    if (fit === 'women' && !garment.fits?.includes('women')) return null
    const custom = cleanCustom(slogan, line.custom)
    if (custom === null) return null
    const text = sloganText(slogan, custom)
    return {
      title: `“${text}” on ${garment.withArticle}`,
      detail: `${garment.fits ? `${fitLabel[fit]} fit · ` : ''}${color.name} · ${line.size}`,
      unit: garment.price,
      art: garment.art,
      sign: slogan.sign,
      text,
      print: printText(slogan, custom),
      color,
      fit,
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

export const COLLECTIONS = (Object.keys(collections) as Collection[]).filter(
  (c) => !PAUSED.includes(c)
)

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

// Short link for sharing a design: /s/<slogan>[/<word>][?on=<garment>]
export function shareHref(p: { slogan: string; custom?: string; garment?: string }) {
  let path = `/s/${p.slogan}`
  if (p.custom) path += `/${encodeURIComponent(p.custom)}`
  return p.garment ? `${path}?on=${p.garment}` : path
}

// Slogans where the blank describes the wearer ("I could be your sister") get a
// woman's body in the photo preview when the word is female.
const FEMALE =
  'sister|mum|mom|mother|mummy|mama|daughter|grandma|granny|gran|nan|nana|nanna|nonna|wife|girlfriend|' +
  'aunt|auntie|aunty|niece|stepmum|godmother|goddaughter|stepdaughter|girl|woman|lady|queen|bride'
const WOMAN_WEARER = [
  new RegExp(`^i could be your (${FEMALE})\\b`, 'i'),
  new RegExp(`^i[’']m (somebody|someone)[’']s (${FEMALE})\\b`, 'i'),
  new RegExp(`^not a cyclist\\. i[’']m (a |an |somebody[’']s |someone[’']s )?(${FEMALE})\\b`, 'i'),
  new RegExp(`^(${FEMALE})[’']s on the way home`, 'i'),
  new RegExp(`^imagine it[’']s your (${FEMALE}) on this bike`, 'i'),
  /^future grandma/i,
]

export function isWomanWearer(text: string) {
  const t = text.replace(/\s+/g, ' ').trim() // print text has line breaks
  return WOMAN_WEARER.some((r) => r.test(t))
}
