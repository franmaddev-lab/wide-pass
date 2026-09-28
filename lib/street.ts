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
}

export const street: StreetPost[] = [
  // Placeholders until the first real posts come in: remove when you have your own
  {
    type: 'photo',
    src: '/photos/vest-road-sister-v2.png',
    alt: 'Illustration: a driver’s view of a cyclist ahead in a yellow “I could be your sister” vest',
    example: true,
  },
  {
    type: 'photo',
    src: '/photos/vest-night-slow-v2.png',
    alt: 'Illustration: cyclist at night in a yellow “Slow down. It’s only a few seconds.” vest',
    example: true,
  },
]
