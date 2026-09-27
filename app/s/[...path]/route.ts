import { redirect } from 'next/navigation'
import { designHref, getGarment, getSlogan } from '@/lib/catalog'

// Short share links: /s/<slogan>, /s/<slogan>/<word>, optionally ?on=<garment>
// e.g. /s/i-could-be-your/mum → the design page for “I could be your mum”
export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const [id, word] = (await params).path
  const slogan = getSlogan(id)
  if (!slogan) redirect('/slogans')
  const garment = getGarment(new URL(request.url).searchParams.get('on') ?? undefined)
  redirect(
    designHref({
      slogan: slogan.id,
      garment: garment?.id,
      custom: slogan.personalise && word ? word.slice(0, 40) : undefined,
    })
  )
}
