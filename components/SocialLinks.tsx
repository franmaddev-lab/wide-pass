import { social } from '@/lib/site'

const icons = {
  instagram: (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.5 2.5 2.5 4.5 5 5" />
    </svg>
  ),
}

const labels = { instagram: 'Instagram', tiktok: 'TikTok' }

// Renders a link for each social account that has a URL set in lib/site.ts
export default function SocialLinks({ variant = 'pill' }: { variant?: 'pill' | 'plain' }) {
  const links = (Object.keys(labels) as (keyof typeof labels)[]).filter((k) => social[k])
  if (links.length === 0) return null
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((k) => (
        <a
          key={k}
          href={social[k]}
          target="_blank"
          rel="noopener noreferrer"
          className={
            variant === 'pill'
              ? 'inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-2 font-semibold hover:bg-volt'
              : 'inline-flex items-center gap-2 hover:text-volt'
          }
        >
          {icons[k]}
          {labels[k]}
        </a>
      ))}
    </div>
  )
}
