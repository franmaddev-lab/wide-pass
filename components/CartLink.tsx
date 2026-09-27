'use client'

import Link from 'next/link'
import { useCartCount } from '@/lib/cart'

export default function CartLink() {
  const count = useCartCount()
  return (
    <Link
      href="/cart"
      className="rounded-full border-2 border-ink bg-ink px-3 py-1 text-volt hover:bg-asphalt"
    >
      Cart{count > 0 && <span aria-label={`${count} items`}> ({count})</span>}
    </Link>
  )
}
