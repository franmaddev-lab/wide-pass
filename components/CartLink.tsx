'use client'

import Link from 'next/link'
import { useCartCount } from '@/lib/cart'

// Bag icon; a yellow badge shows how many items are in the cart
export default function CartLink() {
  const count = useCartCount()
  return (
    <Link
      href="/cart"
      aria-label={`Cart${count ? ` (${count} items)` : ''}`}
      className="relative grid size-10 place-items-center rounded-full border-2 border-ink bg-ink text-volt hover:bg-asphalt"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
        <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      </svg>
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1.5 -right-1.5 grid min-w-5 place-items-center rounded-full border-2 border-ink bg-white px-1 text-[11px] leading-4 font-bold text-ink"
        >
          {count}
        </span>
      )}
    </Link>
  )
}
