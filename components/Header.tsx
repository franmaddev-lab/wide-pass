import Link from 'next/link'
import BikeLogo from './BikeLogo'
import CartLink from './CartLink'
import FavouritesLink from './FavouritesLink'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-volt">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1 font-display text-sm tracking-tight uppercase min-[360px]:text-base sm:gap-1.5 sm:text-xl"
        >
          <BikeLogo className="size-5 min-[360px]:size-6 sm:size-7" />
          Wide&nbsp;Pass
        </Link>
        <nav className="flex items-center gap-2.5 text-[15px] font-semibold min-[380px]:gap-3 min-[380px]:text-base sm:gap-6 sm:text-lg">
          <Link href="/slogans" className="hover:underline">
            Slogans
          </Link>
          <Link href="/us" className="hover:underline">
            Us
          </Link>
          <Link href="/suggest" className="hover:underline">
            You
          </Link>
          <FavouritesLink />
          <CartLink />
        </nav>
      </div>
    </header>
  )
}
