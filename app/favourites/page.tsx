import type { Metadata } from 'next'
import FavouritesList from '@/components/FavouritesList'

export const metadata: Metadata = { title: 'My favourites — Wide Pass' }

export default function FavouritesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl uppercase">My favourites</h1>
      <p className="mt-2 max-w-xl text-asphalt">
        Everything you’ve hearted, saved in this browser. Tap a design to put it on a vest or tee.
      </p>
      <FavouritesList />
    </div>
  )
}
