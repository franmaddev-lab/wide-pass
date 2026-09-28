import type { Metadata } from 'next'
import DraftNotice from '@/components/DraftNotice'
import { formatPounds, formatPrice, FREE_SHIPPING_FROM, SHIPPING } from '@/lib/catalog'
import { business } from '@/lib/site'

export const metadata: Metadata = { title: 'Delivery & returns — Wide Pass' }

export default function ReturnsPage() {
  return (
    <>
      <DraftNotice />
      <h1 className="mt-6">Delivery &amp; returns</h1>

      <h2>Delivery</h2>
      <ul>
        <li>We deliver to UK addresses.</li>
        <li>
          Standard delivery is {formatPrice(SHIPPING)}, free on orders of{' '}
          {formatPounds(FREE_SHIPPING_FROM)} or more (after any bundle saving).
        </li>
        <li>
          We’re a small business and most things are printed when you order them, so your order
          usually leaves us within 3–5 working days, then takes 2–4 working days to arrive.{' '}
          {/* TODO: confirm with your supplier */}
        </li>
        <li>
          We know, in the age of next-day everything that feels like forever. We’re very much not a
          same-day delivery kind of shop. Think of it like overtaking a cyclist: worth waiting a few
          seconds to get it right.
        </li>
      </ul>

      <h2>Changed your mind?</h2>
      <p>
        For items with one of our standard slogans, you can cancel within 14 days of receiving them,
        without giving a reason (Consumer Contracts Regulations 2013). Email {business.email} with
        your order number, then send the items back unworn within the next 14 days. You pay the
        return postage. We refund the item price and the standard delivery charge within 14 days of
        getting them back.
      </p>
      <p>
        <strong>Personalised items</strong> (where you typed or picked your own word, like “I could
        be your <em>nan</em>”) are made just for you, so they can’t be returned because you changed
        your mind.
      </p>

      <h2>Faulty or wrong item?</h2>
      <p>
        Personalised or not, if something arrives faulty, misprinted or not as described, email{' '}
        {business.email} with a photo within 30 days. We’ll replace it or refund you in full,
        including postage. This is your right under the Consumer Rights Act 2015.
      </p>

      <h2>Wrong size?</h2>
      <p>
        Check the size guide before ordering. For standard-slogan items, a swap for another size
        counts as a return plus a new order.
      </p>
    </>
  )
}
