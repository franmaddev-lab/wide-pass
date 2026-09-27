import Link from 'next/link'
import CartLink from './CartLink'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-volt">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-display text-xl tracking-tight uppercase">
          Wide&nbsp;Pass
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold sm:gap-6">
          <Link href="/slogans" className="hover:underline">
            Slogans
          </Link>
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>
          <Link href="/about" className="hover:underline">
            Why
          </Link>
          <CartLink />
        </nav>
      </div>
    </header>
  )
}
