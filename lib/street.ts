// Photos and videos of people out on the road in Wide Pass gear, shown on the You page.
// Put files in /public/street and add an entry. Only use content you have permission for
// (ask the person, or use posts they tagged you in).
export type StreetPost = {
  type: 'photo' | 'video'
  src: string // e.g. '/street/anna-commute.jpg' or '/street/leeds-ride.mp4'
  alt: string // what's in it, for screen readers
  poster?: string // still image shown before a video plays
  credit?: string // e.g. '@anna.rides, Bristol'
  link?: string // the original post
  example?: boolean // marked "Example" until real posts arrive
  home?: boolean // false = not shown in “Seen on the road” on the home page
  garment?: 'tee' | 'tank' | 'longsleeve' | 'vest' | 'jacket' | 'raincover' // what they're wearing
}

export const street: StreetPost[] = [
  // Examples of what tagged posts will look like: replace with real riders' posts
  {
    type: 'photo',
    src: '/street/slow-down-vest-night.webp',
    alt: 'A cyclist at dusk on a wet country road in a yellow hi-vis vest reading “Slow down. It’s only a few seconds.”, a car behind',
    credit: 'Evening ride',
    garment: 'vest',
    example: true,
  },
  {
    type: 'photo',
    src: '/street/kids-dinner-white-tee.webp',
    home: false,
    alt: 'A woman cycling through a busy London street in a white t-shirt reading “My kids want me home for dinner”',
    credit: 'Commuting, London',
    garment: 'tee',
    example: true,
  },
  {
    type: 'photo',
    src: '/street/somebodys-dad-backpack.webp',
    alt: 'A man with a backpack cycling in a London bike lane, black t-shirt reading “I am somebody’s dad” in yellow',
    credit: 'Saturday ride, London',
    garment: 'tee',
    example: true,
  },
]
