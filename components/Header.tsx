import Link from 'next/link'
import CartLink from './CartLink'
import FavouritesLink from './FavouritesLink'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-volt">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
        <Link
          href="/"
          className="shrink-0 font-display text-base tracking-tight uppercase sm:text-xl"
        >
          Wide&nbsp;Pass
        </Link>
        <nav className="flex items-center gap-2.5 text-sm font-semibold sm:gap-6">
          <Link href="/slogans" className="hover:underline">
            Slogans
          </Link>
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>
          <Link href="/suggest" className="hover:underline">
            Ideas
          </Link>
          <FavouritesLink />
          <CartLink />
        </nav>
      </div>
    </header>
  )
}
