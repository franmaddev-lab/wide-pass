'use client'

import { useEffect, useState } from 'react'

// TEMPORARY: tap to cycle the headline font and try each one across the whole site.
// The choice is remembered on this device. Remove once a font is picked.
const FONTS = [
  { name: 'Archivo Black', variable: '' }, // the current font
  { name: 'Titan One', variable: '--font-titan' },
  { name: 'Luckiest Guy', variable: '--font-luckiest' },
  { name: 'Lilita One', variable: '--font-lilita' },
  { name: 'Bagel Fat One', variable: '--font-bagel' },
  { name: 'Bowlby One', variable: '--font-bowlby' },
]
const KEY = 'wp-trial-font'

function apply(i: number) {
  const style = document.documentElement.style
  if (FONTS[i].variable) style.setProperty('--font-archivo', `var(${FONTS[i].variable})`)
  else style.removeProperty('--font-archivo')
}

export default function FontSwitcher() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let saved = 0
    try {
      saved = Number(localStorage.getItem(KEY)) || 0
    } catch {}
    if (saved > 0 && saved < FONTS.length) {
      apply(saved)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with the saved choice after mount
      setIndex(saved)
    }
  }, [])

  function next() {
    const i = (index + 1) % FONTS.length
    apply(i)
    setIndex(i)
    try {
      localStorage.setItem(KEY, String(i))
    } catch {}
  }

  return (
    <button type="button" onClick={next} className="text-left underline hover:text-volt">
      Font: {FONTS[index].name} ({index + 1}/{FONTS.length}), tap to switch
    </button>
  )
}
