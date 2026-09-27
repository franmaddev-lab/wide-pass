'use client'

import { useEffect, useState } from 'react'

// TEMPORARY: tap to cycle the headline font and try each one across the whole site.
// The choice is remembered on this device. A link with ?font=<key> (e.g. /?font=rubik)
// picks a font directly. Remove once a font is picked.
const FONTS = [
  { key: 'archivo', name: 'Archivo Black', variable: '' }, // the current font
  { key: 'bowlby', name: 'Bowlby One', variable: '--font-bowlby' },
  { key: 'rubik', name: 'Rubik Black', variable: '--font-rubik' },
  { key: 'poppins', name: 'Poppins Black', variable: '--font-poppins' },
  { key: 'paytone', name: 'Paytone One', variable: '--font-paytone' },
  { key: 'unbounded', name: 'Unbounded Black', variable: '--font-unbounded' },
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
    const fromLink = FONTS.findIndex(
      (f) => f.key === new URLSearchParams(window.location.search).get('font')
    )
    let saved = 0
    try {
      saved = Number(localStorage.getItem(KEY)) || 0
      if (fromLink >= 0) localStorage.setItem(KEY, String(fromLink))
    } catch {}
    const i = fromLink >= 0 ? fromLink : saved
    if (i > 0 && i < FONTS.length) {
      apply(i)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with the saved choice after mount
      setIndex(i)
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
