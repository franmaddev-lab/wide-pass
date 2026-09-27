import type { Metadata } from 'next'
import Link from 'next/link'
import SocialLinks from '@/components/SocialLinks'
import { designHref, slogans } from '@/lib/catalog'

// Link-in-bio page: put wide-pass.vercel.app/links in your Instagram and TikTok bio
export const metadata: Metadata = {
  title: 'Wide Pass — links',
  description: 'Cycling gear that talks to drivers. Make yours, vote on new slogans, find out why.',
}

const LINKS = [
  { href: designHref({ slogan: 'i-could-be-your' }), label: 'Make yours: “I could be your ___”' },
  { href: '/slogans?sort=popular', label: 'Most loved designs' },
  { href: '/slogans', label: `All ${slogans.length} slogans` },
  { href: '/shop', label: 'Pick your gear' },
  { href: '/suggest', label: 'Suggest & vote on new slogans' },
  { href: '/us', label: 'Why we do this' },
]

export default function LinksPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-10 text-center">
      <p className="font-display text-3xl uppercase">Wide Pass</p>
      <p className="mt-2 text-asphalt">
        Every rider is somebody’s someone. Cycling gear that talks to drivers.
      </p>
      <ul className="mt-8 space-y-3">
        {LINKS.map((l, i) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`block rounded-full border-2 border-ink px-6 py-4 font-bold transition hover:shadow-[4px_4px_0_var(--color-ink)] ${
                i === 0 ? 'bg-volt' : 'bg-white'
              }`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center">
        <SocialLinks />
      </div>
    </div>
  )
}
