import type { Metadata } from 'next'
import { Archivo_Black, Inter, Poppins } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteUrl } from '@/lib/site'
import './globals.css'

const print = Archivo_Black({ variable: '--font-archivo', subsets: ['latin'], weight: '400' })
const body = Inter({ variable: '--font-inter', subsets: ['latin'] })

// Headings and buttons use Poppins Black; slogans printed on the gear use Archivo Black
const heading = Poppins({ variable: '--font-poppins', subsets: ['latin'], weight: '900' })

export const metadata: Metadata = {
  title: 'Wide Pass — cycling apparel with a message',
  description:
    'T-shirts, tank tops, long sleeves, hi-vis vests, hi-vis jackets and bag covers with funny and serious slogans that remind drivers there is a person on that bike.',
  metadataBase: new URL(siteUrl),
  openGraph: { siteName: 'Wide Pass', type: 'website', locale: 'en_GB', images: '/og' },
  twitter: { card: 'summary_large_image', images: '/og' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${print.variable} ${body.variable} ${heading.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
