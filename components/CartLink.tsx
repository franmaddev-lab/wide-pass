'use client'

import Link from 'next/link'
import { useCartCount } from '@/lib/cart'

export default function CartLink() {
  const count = useCartCount()
  return (
    <Link
      href="/cart"
      className="rounded-full border-2 border-ink bg-ink px-2.5 py-1 whitespace-nowrap text-volt hover:bg-asphalt sm:px-3"
    >
      Cart{count > 0 && <span aria-label={`${count} items`}> ({count})</span>}
    </Link>
  )
}
