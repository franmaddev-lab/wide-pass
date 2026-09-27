'use client'

import { useState } from 'react'

// Opens the phone's share sheet (WhatsApp, Instagram, Messages…).
// Where that isn't available (most desktops), copies the link instead.
export default function ShareButton({
  path,
  text,
  className = '',
}: {
  path: string // e.g. /s/i-could-be-your/mum
  text: string // message that goes with the link
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = new URL(path, window.location.origin).toString()
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Wide Pass', text, url })
      } catch {
        // closed the share sheet: nothing to do
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this link', url)
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label="Share this design"
      title="Share"
      className={`grid size-11 place-items-center rounded-full border-2 border-ink bg-white transition hover:bg-volt ${className}`}
    >
      {copied ? (
        <span className="text-[10px] font-bold uppercase" role="status">
          Copied
        </span>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          aria-hidden="true"
          fill="none"
          stroke="#141414"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v12" />
          <path d="M7 8l5-5 5 5" />
          <path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
        </svg>
      )}
    </button>
  )
}
