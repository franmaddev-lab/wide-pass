import Link from 'next/link'

const PAGES = [
  { href: '/legal/terms', label: 'Terms' },
  { href: '/legal/returns', label: 'Delivery & returns' },
  { href: '/legal/privacy', label: 'Privacy & cookies' },
]

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="flex flex-wrap gap-2 text-sm font-semibold">
        {PAGES.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="rounded-full border-2 border-ink bg-white px-3 py-1 hover:bg-volt"
          >
            {p.label}
          </Link>
        ))}
      </nav>
      <article className="mt-8 [&_a]:font-semibold [&_a]:underline [&_h1]:font-display [&_h1]:text-4xl [&_h1]:uppercase [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:uppercase [&_li]:mt-1 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </article>
    </div>
  )
}
