import type { Metadata } from 'next'
import DraftNotice from '@/components/DraftNotice'
import { business } from '@/lib/site'

export const metadata: Metadata = { title: 'Privacy & cookies — Wide Pass' }

export default function PrivacyPage() {
  return (
    <>
      <DraftNotice />
      <h1 className="mt-6">Privacy &amp; cookies</h1>
      <p>
        {business.owner} ({business.name}) is the controller of your personal data under UK GDPR.
        Contact: {business.email}, {business.address}.
      </p>

      <h2>What we collect and why</h2>
      <ul>
        <li>
          <strong>Orders:</strong> name, email, delivery address, what you bought and your custom
          text. We use it to make, ship and support your order (contract), and keep it for 6 years
          for tax records (legal obligation).
        </li>
        <li>
          <strong>Payments:</strong> handled by Stripe, which receives your card or wallet details
          directly. We never see them. See{' '}
          <a href="https://stripe.com/gb/privacy" target="_blank" rel="noopener noreferrer">
            Stripe’s privacy policy
          </a>
          .
        </li>
        <li>
          <strong>Slogan ideas and votes:</strong> the text you post and an anonymous ID so each
          browser votes once (legitimate interest). We don’t link it to your name.
        </li>
      </ul>

      <h2>Cookies and storage</h2>
      <p>We don’t use advertising or tracking cookies. We use:</p>
      <ul>
        <li>
          <code>wp_voter</code>: a random ID cookie so your votes and favourites count once. Kept
          for a year.
        </li>
        <li>
          Your browser’s local storage for your cart and favourites. It never leaves your device.
        </li>
        <li>Stripe sets its own cookies on the payment page to prevent fraud.</li>
      </ul>
      <p>These are strictly necessary for features you ask for, so no cookie banner is needed.</p>

      <h2>Who else handles your data</h2>
      <ul>
        <li>Vercel (hosting), Upstash (votes and ideas database), Stripe (payments).</li>
        <li>Our print and delivery partners, only what they need to make and send your order.</li>
      </ul>
      <p>Some of these store data outside the UK, under UK-approved safeguards.</p>

      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete your data, or object to how we use it. Email{' '}
        {business.email}. If you’re unhappy with our answer, you can complain to the{' '}
        <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">
          Information Commissioner’s Office
        </a>
        .
      </p>
    </>
  )
}
