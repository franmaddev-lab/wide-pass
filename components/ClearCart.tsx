'use client'

import { useEffect } from 'react'
import { clearCart } from '@/lib/cart'

// Empties the cart once the payment has gone through
export default function ClearCart() {
  useEffect(() => clearCart(), [])
  return null
}
