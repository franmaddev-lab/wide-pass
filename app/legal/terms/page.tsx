import type { Metadata } from 'next'
import Link from 'next/link'
import DraftNotice from '@/components/DraftNotice'
import { business } from '@/lib/site'

export const metadata: Metadata = { title: 'Terms — Wide Pass' }

export default function TermsPage() {
  return (
    <>
      <DraftNotice />
      <h1 className="mt-6">Terms of sale</h1>
      <p>Last updated: September 2026.</p>

      <h2>Who we are</h2>
      <p>
        {business.name} is run by {business.owner}, {business.address}. Email {business.email}.
        {business.companyNumber && ` ${business.companyNumber}.`}
        {business.vatNumber && ` VAT number ${business.vatNumber}.`}
      </p>

      <h2>Your order</h2>
      <ul>
        <li>
          Placing an order is an offer to buy. The contract starts when we email to confirm it.
        </li>
        <li>
          Every item is printed to order with the slogan you chose. We may refuse or cancel an order
          (with a full refund) if personalised text is offensive, targets a person, or infringes
          someone else’s rights.
        </li>
        <li>
          Colours on screen are a guide. Printed colours can vary slightly, and hi-vis fabric always
          looks brighter in real life.
        </li>
      </ul>

      <h2>Prices and payment</h2>
      <ul>
        <li>Prices are in pounds sterling and include VAT where it applies.</li>
        <li>Payment is taken by Stripe when you order. We never see or store your card details.</li>
        <li>If we’ve made an obvious pricing mistake, we’ll contact you before shipping.</li>
      </ul>

      <h2>Delivery, cancelling and returns</h2>
      <p>
        See <Link href="/legal/returns">delivery &amp; returns</Link>. Nothing in these terms
        affects your statutory rights under the Consumer Rights Act 2015.
      </p>

      <h2>Safety</h2>
      <p>
        Our clothing helps you be seen and read. It doesn’t replace lights, reflectors or attentive
        riding. Hi-vis items are fashion garments unless the product page says they’re certified to
        a safety standard (e.g. EN ISO 20471).
      </p>

      <h2>Slogan ideas you send us</h2>
      <p>
        If you post an idea on the <Link href="/suggest">suggest page</Link>, you let us publish it
        and print it on products. We don’t pay for ideas, but we’ll happily credit you if you ask.
      </p>

      <h2>Law</h2>
      <p>
        These terms are governed by the law of England and Wales. If you live elsewhere in the UK,
        you can also bring a claim in your local courts.
      </p>
    </>
  )
}
