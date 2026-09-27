'use client'

import Link from 'next/link'
import { useFavourites } from '@/lib/favourites'

export default function FavouritesLink() {
  const count = useFavourites().length
  return (
    <Link
      href="/favourites"
      aria-label={`Favourites${count ? ` (${count})` : ''}`}
      className="flex items-center gap-1 hover:underline"
    >
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          d="M12 20.5 C5 15 3 12 3 8.5 A4.5 4.5 0 0 1 12 6 A4.5 4.5 0 0 1 21 8.5 C21 12 19 15 12 20.5 Z"
          fill={count ? '#141414' : 'none'}
          stroke="#141414"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      {count > 0 && <span aria-hidden="true">{count}</span>}
    </Link>
  )
}
