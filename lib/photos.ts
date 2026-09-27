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

export const photos: Photo[] = []

export function photosFor(garment?: GarmentId) {
  return garment ? photos.filter((p) => p.garment === garment) : photos
}
