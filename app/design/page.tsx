import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Designer from '@/components/Designer'
import { cleanCustom, getGarment, getSlogan, sloganText } from '@/lib/catalog'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
const one = (v: string | string[] | undefined) => (typeof v === 'string' ? v : undefined)

// Each design gets its own link preview, so a shared link shows the actual slogan
export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<Metadata> {
  const sp = await searchParams
  const slogan = getSlogan(one(sp.slogan))
  if (!slogan) return { title: 'Make it yours — Wide Pass' }
  const garment = getGarment(one(sp.garment)) ?? getGarment('vest')!
  const custom = cleanCustom(slogan, one(sp.text)?.slice(0, 40)) ?? undefined
  const text = sloganText(slogan, custom)
  const image = `/og?${new URLSearchParams({
    slogan: slogan.id,
    garment: garment.id,
    ...(slogan.personalise && custom ? { text: custom } : {}),
  })}`
  const title = `“${text}” on ${garment.withArticle}`
  const description = 'Cycling gear that reminds drivers there’s a person on that bike. Make yours.'
  return {
    title: `${title} — Wide Pass`,
    description,
    openGraph: { title, description, images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: image },
  }
}

export default async function DesignPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams

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
