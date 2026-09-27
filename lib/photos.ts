import type { GarmentId } from './catalog'

// Real product photos. To add one:
//   1. put the file in public/photos/ (JPG or WebP, ideally square, ~1600px wide)
//   2. add a line below, e.g.
//      { src: '/photos/vest-sister-orange.jpg', alt: 'Rider in the orange “I could be your sister” vest', garment: 'vest' },
// `garment` shows the photo on that product's design page too; leave it out for
// general shots that only appear in the home page gallery.

export type Photo = {
  src: string
  alt: string // describe what's in the photo, for screen readers
  garment?: GarmentId
}

// Placeholder illustrations until real photos arrive. Replace them (or add real
// photos above them) and delete these entries plus their files.
export const photos: Photo[] = [
  {
    src: '/photos/vest-road-sister-v2.png',
    alt: 'Illustration: a driver’s view of a cyclist ahead in a yellow “I could be your sister” vest',
    garment: 'vest',
  },
  {
    src: '/photos/tee-flatlay-pasta-v2.png',
    alt: 'Illustration: black “Powered by pasta. Zero emissions.” tee laid out with a helmet, espresso and sunglasses',
    garment: 'tee',
  },
  {
    src: '/photos/vest-night-slow-v2.png',
    alt: 'Illustration: cyclist at night in a yellow “Slow down. It’s only a few seconds.” vest, reflective strips lit by headlights',
    garment: 'vest',
  },
  {
    src: '/photos/tee-hanger-traffic-v2.png',
    alt: 'Illustration: white “I’m not in your way. I am traffic.” tee on a hanger',
    garment: 'tee',
  },
  {
    src: '/photos/vest-hanger-passwide-v2.png',
    alt: 'Illustration: yellow “Pass wide. Pass slow.” vest on a hanger with a Wide Pass tag',
    garment: 'vest',
  },
]

export function photosFor(garment?: GarmentId) {
  return garment ? photos.filter((p) => p.garment === garment) : photos
}
