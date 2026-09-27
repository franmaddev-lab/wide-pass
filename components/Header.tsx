import Link from 'next/link'
import CartLink from './CartLink'
import FavouritesLink from './FavouritesLink'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-volt">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-4">
        <Link
          href="/"
          className="shrink-0 font-display text-sm tracking-tight uppercase min-[360px]:text-base sm:text-xl"
        >
          Wide&nbsp;Pass
        </Link>
        <nav className="flex items-center gap-1.5 text-xs font-semibold min-[360px]:gap-2 min-[360px]:text-[13px] sm:gap-6 sm:text-sm">
          <Link href="/slogans" className="hover:underline">
            Slogans
          </Link>
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>
          <Link href="/suggest" className="hover:underline">
            Suggest
          </Link>
          <FavouritesLink />
          <CartLink />
        </nav>
      </div>
    </header>
  )
}
