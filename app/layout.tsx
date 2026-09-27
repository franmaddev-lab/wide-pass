import type { Metadata } from 'next'
import {
  Archivo_Black,
  Bowlby_One,
  Inter,
  Paytone_One,
  Poppins,
  Rubik,
  Unbounded,
} from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteUrl } from '@/lib/site'
import './globals.css'

const display = Archivo_Black({ variable: '--font-archivo', subsets: ['latin'], weight: '400' })
const body = Inter({ variable: '--font-inter', subsets: ['latin'] })

// TEMPORARY: fonts to try with the switcher in the footer. Only downloaded when picked.
const bowlby = Bowlby_One({
  variable: '--font-bowlby',
  subsets: ['latin'],
  weight: '400',
  preload: false,
})
const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin'],
  weight: '900',
  preload: false,
})
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: '900',
  preload: false,
})
const paytone = Paytone_One({
  variable: '--font-paytone',
  subsets: ['latin'],
  weight: '400',
  preload: false,
})
const unbounded = Unbounded({
  variable: '--font-unbounded',
  subsets: ['latin'],
  weight: '900',
  preload: false,
})
const trialFonts = [bowlby, rubik, poppins, paytone, unbounded].map((f) => f.variable).join(' ')

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
