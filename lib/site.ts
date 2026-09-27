// Social accounts. Paste the full profile URL; leave empty ('') to hide a link.
// TODO: placeholders pointing at the platforms' home pages until the real
// accounts exist, e.g. 'https://www.instagram.com/<handle>' and 'https://www.tiktok.com/@<handle>'
export const social = {
  instagram: 'https://www.instagram.com/',
  tiktok: 'https://www.tiktok.com/',
}

export const hasSocial = Boolean(social.instagram || social.tiktok)

// Public address of the shop, used for link previews and share links.
// Set NEXT_PUBLIC_SITE_URL once you have your own domain.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://wide-pass.vercel.app')

// Who customers are buying from. Shown on the legal pages.
// TODO: these are FAKE placeholders. Replace them with your real details before taking
// real orders (UK law requires a real postal address and email).
export const business = {
  name: 'Wide Pass',
  owner: 'Wide Pass Ltd',
  address: '1 Placeholder Road, London, AB1 2CD',
  email: 'hello@example.com',
  companyNumber: 'Registered in England and Wales, company no. 00000000',
  vatNumber: '',
}

// Donation from every order. Mentioned quietly in the footer, cart, Us page and terms.
// TODO: pick the charity. Before naming one, UK law (Charities Act 1992, "commercial
// participator") needs a written agreement with it, and the page must say how much goes.
export const charity = {
  perOrder: 50, // pence from every order
  name: '', // e.g. 'RoadPeace'; empty = "a UK cycling charity"
  url: '',
}

export const charityName = charity.name || 'a UK cycling charity'

// "50p" rather than "£0.50"
export const charityAmount =
  charity.perOrder < 100 ? `${charity.perOrder}p` : `£${(charity.perOrder / 100).toFixed(2)}`
