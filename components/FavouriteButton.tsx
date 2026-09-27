'use client'

import { toggleFavourite, useFavourites } from '@/lib/favourites'

export default function FavouriteButton({
  item,
  label,
  className = '',
}: {
  item: string // "slogan:<id>" or "gadget:<slug>"
  label: string // what is being favourited, for screen readers
  className?: string
}) {
  const on = useFavourites().includes(item)
  return (
    <button
      type="button"
      onClick={() => toggleFavourite(item)}
      aria-pressed={on}
      aria-label={on ? `Remove ${label} from favourites` : `Add ${label} to favourites`}
      title={on ? 'Saved to favourites' : 'Save to favourites'}
      className={`grid size-11 place-items-center rounded-full border-2 border-ink transition ${
        on ? 'bg-volt' : 'bg-white hover:bg-volt'
      } ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          d="M12 20.5 C5 15 3 12 3 8.5 A4.5 4.5 0 0 1 12 6 A4.5 4.5 0 0 1 21 8.5 C21 12 19 15 12 20.5 Z"
          fill={on ? '#141414' : 'none'}
          stroke="#141414"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
