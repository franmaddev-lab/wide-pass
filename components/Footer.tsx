import Link from 'next/link'
import SocialLinks from './SocialLinks'
import { garments } from '@/lib/catalog'

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
          {garments.map((g) => (
            <li key={g.id}>
              <Link href={`/slogans?garment=${g.id}`} className="hover:text-volt">
                {g.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/suggest" className="hover:text-volt">
              Suggest &amp; vote
            </Link>
          </li>
          <li>
            <Link href="/us" className="hover:text-volt">
              Us: why we do this
            </Link>
          </li>
          <li>
            <Link href="/sizes" className="hover:text-volt">
              Size guide
            </Link>
          </li>
        </ul>
        <div className="space-y-3 text-sm">
          <SocialLinks variant="plain" />
          <p className="text-paper/70">Free shipping on orders over £50. Ride safe, ride seen.</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-paper/70">
            <li>
              <Link href="/legal/terms" className="hover:text-volt">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/legal/returns" className="hover:text-volt">
                Delivery &amp; returns
              </Link>
            </li>
            <li>
              <Link href="/legal/privacy" className="hover:text-volt">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
