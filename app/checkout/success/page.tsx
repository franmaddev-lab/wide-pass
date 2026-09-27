import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ClearCart from '@/components/ClearCart'
import ShareButton from '@/components/ShareButton'
import { formatPrice } from '@/lib/catalog'
import { getCheckoutSession, paymentsEnabled, type CheckoutSession } from '@/lib/stripe'

export const metadata: Metadata = { title: 'Thank you — Wide Pass', robots: { index: false } }

// Stripe sends the customer here after paying: /checkout/success?session_id=cs_…
export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>
}) {
  const id = (await searchParams).session_id
  if (!paymentsEnabled || typeof id !== 'string') redirect('/cart')

  let session: CheckoutSession | null = null
  try {
    session = await getCheckoutSession(id)
  } catch {
    session = null
  }
  const paid = session?.payment_status === 'paid'

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {paid && session ? (
        <div className="rounded-2xl border-2 border-ink bg-volt p-8">
          <ClearCart />
          <p className="font-display text-2xl uppercase">
            Thank you
            {session.customer_details?.name
              ? `, ${session.customer_details.name.split(' ')[0]}`
              : ''}
            !
          </p>
          <p className="mt-3">
            Order <strong>WP-{session.id.slice(-8).toUpperCase()}</strong>
            {session.amount_total != null && ` (${formatPrice(session.amount_total)})`} is paid.
            We’ll email {session.customer_details?.email ?? 'you'} when it ships.
          </p>
          <p className="mt-3">Now go ride, and be seen. Tell a friend while you’re at it:</p>
          <div className="mt-4 flex items-center gap-4">
            <ShareButton
              path="/links"
              text="I just got my Wide Pass gear. Every rider is somebody’s someone:"
            />
            <Link href="/slogans" className="font-semibold underline">
              Keep shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-ink bg-white p-8">
          <p className="font-display text-2xl uppercase">Payment not finished</p>
          <p className="mt-3">
            We couldn’t confirm your payment. Nothing has been charged unless you got an email from
            Stripe.
          </p>
          <Link href="/cart" className="mt-6 inline-block font-semibold underline">
            Back to your cart
          </Link>
        </div>
      )}
    </div>
  )
}
