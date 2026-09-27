'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import ProductArt from './ProductArt'
import { designHref, getSlogan, sloganText } from '@/lib/catalog'

const START_DELAY = 1500
const DELETE_MS = 60
const TYPE_MS = 95
const HOLD_MS = 1600

// Home page headline + vest. If the slogan has a blank ("I could be your ___"),
// the word is deleted and retyped letter by letter through the suggestions.
export default function HeroSlogan({
  sloganId,
  custom,
  children,
}: {
  sloganId: string
  custom?: string
  children: React.ReactNode // intro text and buttons under the headline
}) {
  const slogan = getSlogan(sloganId)!
  const personalise = slogan.personalise
  const first = custom ?? personalise?.default ?? ''
  const [word, setWord] = useState(first)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (!personalise) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const words = [first, ...personalise.suggestions.filter((w) => w !== first)]
    const timers: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) => new Promise((r) => timers.push(setTimeout(r, ms)))
    let cancelled = false

    ;(async () => {
      await wait(START_DELAY)
      if (cancelled) return
      setTyping(true)
      for (let i = 0; !cancelled; i++) {
        const current = words[i % words.length]
        const next = words[(i + 1) % words.length]
        for (let n = current.length - 1; n >= 0 && !cancelled; n--) {
          setWord(current.slice(0, n))
          await wait(DELETE_MS)
        }
        await wait(250)
        for (let n = 1; n <= next.length && !cancelled; n++) {
          setWord(next.slice(0, n))
          await wait(TYPE_MS)
        }
        await wait(HOLD_MS)
      }
    })()

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [first, personalise])

  const fullText = sloganText(slogan, first)
  let headline: React.ReactNode
  let artText: string
  if (personalise) {
    const [before, after] = slogan.text.split('{}')
    artText = `${before}${word}${after}`
    headline = (
      <>
        {before}
        <span className="text-volt">
          {word}
          {typing && (
            <span className="ml-1 inline-block h-[0.8em] w-[0.08em] animate-pulse bg-volt align-baseline" />
          )}
        </span>
        {after}
      </>
    )
  } else {
    const words = fullText.split(' ')
    const last = words.pop()
    artText = fullText
    headline = (
      <>
        {words.join(' ')} <span className="text-volt">{last}</span>
      </>
    )
  }

  return (
    <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
      <div>
        <p className="text-sm font-bold tracking-widest text-volt uppercase">
          Cycling apparel with a message
        </p>
        <h1 className="mt-3 font-display text-4xl leading-[0.95] break-words uppercase min-[360px]:text-5xl sm:text-6xl">
          <span className="sr-only">{fullText}</span>
          <span aria-hidden="true">{headline}</span>
        </h1>
        {children}
      </div>
      <Link
        href={designHref({ slogan: slogan.id, custom: personalise ? word || first : undefined })}
        aria-label={`Design “${fullText}”`}
        className="mx-auto block w-full max-w-sm"
      >
        <ProductArt
          art="vest"
          slogan={artText}
          color="#e8f525"
          ink="#111111"
          sign={slogan.sign}
          className="w-full"
        />
      </Link>
    </div>
  )
}
