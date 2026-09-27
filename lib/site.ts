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
// TODO: fill in before taking real orders (UK law requires a postal address and an email).
export const business = {
  name: 'Wide Pass',
  owner: '[Your name or company name]',
  address: '[Business postal address, UK]',
  email: '[hello@your-domain.co.uk]',
  companyNumber: '', // e.g. 'Registered in England and Wales, company no. 12345678'
  vatNumber: '',
}
