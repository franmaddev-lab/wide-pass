'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

// Keeps showing the current picture until the next photo has downloaded, then
// fades the new photo and its slogan in together, so the text never lands on
// the old shirt (or the old text on the new one). Text-only changes, like
// typing a name, update straight away.
export default function PhotoSwap({
  src,
  className,
  children,
}: {
  src: string // photo URL, or any id for a drawing
  className?: string
  children: ReactNode
}) {
  const [shown, setShown] = useState({ src, children, swapped: false })
  const latest = useRef(children)
  useEffect(() => {
    latest.current = children
  })

  useEffect(() => {
    if (src === shown.src) return
    let live = true
    const ready = src.startsWith('/')
      ? (() => {
          const img = new Image()
          img.src = src
          return img.decode().catch(() => {})
        })()
      : Promise.resolve()
    ready.then(() => {
      if (live) setShown({ src, children: latest.current, swapped: true })
    })
    return () => {
      live = false
    }
  }, [src, shown.src])

  return (
    <div key={shown.src} className={`${className ?? ''} ${shown.swapped ? 'animate-swap' : ''}`}>
      {src === shown.src ? children : shown.children}
    </div>
  )
}
