import type { Metadata } from 'next'
import Designer from '@/components/Designer'
import { getGarment, getSlogan, slogans } from '@/lib/catalog'

export const metadata: Metadata = { title: 'Design yours — Wide Pass' }

export default async function DesignPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams
  const one = (v: string | string[] | undefined) => (typeof v === 'string' ? v : undefined)

  const garment = getGarment(one(sp.garment))?.id ?? 'vest'
  const slogan = getSlogan(one(sp.slogan))?.id ?? slogans[0].id
  const text = one(sp.text)?.slice(0, 40)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl uppercase">Design yours</h1>
      <p className="mt-2 text-asphalt">Gear, message, colour, size. Change anything, any time.</p>
      <div className="mt-8">
        {/* keyed so client-side navigation to another preset starts fresh */}
        <Designer
          key={`${garment}/${slogan}/${text ?? ''}`}
          initialGarment={garment}
          initialSlogan={slogan}
          initialText={text}
        />
      </div>
    </div>
  )
}
