import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Designer from '@/components/Designer'
import { getGarment, getSlogan } from '@/lib/catalog'

export const metadata: Metadata = { title: 'Make it yours — Wide Pass' }

export default async function DesignPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams
  const one = (v: string | string[] | undefined) => (typeof v === 'string' ? v : undefined)

  const garment = getGarment(one(sp.garment))?.id
  const slogan = getSlogan(one(sp.slogan))?.id
  const text = one(sp.text)?.slice(0, 40)

  // The slogan is picked on /slogans; without one there's nothing to design yet
  if (!slogan) redirect(garment ? `/slogans?garment=${garment}` : '/slogans')

  return (
    <div className="mx-auto max-w-6xl px-4 pt-2 pb-10 md:py-10">
      {/* keyed so client-side navigation to another preset starts fresh */}
      <Designer
        key={`${garment}/${slogan}/${text ?? ''}`}
        initialGarment={garment ?? 'vest'}
        sloganId={slogan}
        initialText={text}
      />
    </div>
  )
}
