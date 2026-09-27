import Link from 'next/link'
import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg uppercase text-volt">Wide Pass</p>
          <p className="mt-2 text-sm text-paper/70">
            Every rider is somebody. Wear the message, share the road.
          </p>
        </div>
        <ul className="space-y-1 text-sm">
          <li>
            <Link href="/slogans?garment=vest" className="hover:text-volt">
              Hi-vis vests
            </Link>
          </li>
          <li>
            <Link href="/slogans?garment=tee" className="hover:text-volt">
              T-shirts
            </Link>
          </li>
          <li>
            <Link href="/shop" className="hover:text-volt">
              Gadgets
            </Link>
          </li>
          <li>
            <Link href="/suggest" className="hover:text-volt">
              Suggest &amp; vote
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-volt">
              Why we do this
            </Link>
          </li>
        </ul>
        <div className="space-y-3 text-sm">
          <SocialLinks variant="plain" />
          <p className="text-paper/70">Free shipping on orders over €50. Ride safe, ride seen.</p>
        </div>
      </div>
    </footer>
  )
}
