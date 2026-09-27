import type { Metadata } from 'next'
import {
  Archivo_Black,
  Bagel_Fat_One,
  Bowlby_One,
  Inter,
  Lilita_One,
  Luckiest_Guy,
  Titan_One,
} from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteUrl } from '@/lib/site'
import './globals.css'

const display = Archivo_Black({ variable: '--font-archivo', subsets: ['latin'], weight: '400' })
const body = Inter({ variable: '--font-inter', subsets: ['latin'] })

// TEMPORARY: fonts to try with the switcher in the footer. Only downloaded when picked.
const titan = Titan_One({
  variable: '--font-titan',
  subsets: ['latin'],
  weight: '400',
  preload: false,
})
const luckiest = Luckiest_Guy({
  variable: '--font-luckiest',
  subsets: ['latin'],
  weight: '400',
  preload: false,
})
const lilita = Lilita_One({
  variable: '--font-lilita',
  subsets: ['latin'],
  weight: '400',
  preload: false,
})
const bagel = Bagel_Fat_One({
  variable: '--font-bagel',
  subsets: ['latin'],
  weight: '400',
  preload: false,
})
const bowlby = Bowlby_One({
  variable: '--font-bowlby',
  subsets: ['latin'],
  weight: '400',
  preload: false,
})
const trialFonts = [titan, luckiest, lilita, bagel, bowlby].map((f) => f.variable).join(' ')

export const metadata: Metadata = {
  title: 'Wide Pass — cycling apparel with a message',
  description:
    'Hi-vis vests, t-shirts, tank tops, rain jackets and bag covers with funny and serious slogans that remind drivers there is a person on that bike.',
  metadataBase: new URL(siteUrl),
  openGraph: { siteName: 'Wide Pass', type: 'website', locale: 'en_GB', images: '/og' },
  twitter: { card: 'summary_large_image', images: '/og' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${trialFonts} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
