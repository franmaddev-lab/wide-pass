# Wide Pass — cycling apparel with a message

A small online shop for hi-vis vests, tank tops, t-shirts, long-sleeve shirts, rain jackets and bag rain covers with funny and serious
slogans (“I could be your sister”, “Pass wide. Pass slow.”, “Powered by pasta”)
that remind drivers there is a person on that bike.

Built with Next.js 16, React 19 and Tailwind CSS 4.

```bash
npm install
npm run dev    # http://localhost:3000
```

## What's here

There are two ways to shop, and both end on the same short design page:

- **Slogan first:** `/slogans` → pick a message → choose what to print it on
- **Gear first:** `/shop` → pick a garment → `/slogans?garment=…` → choose a message

Some slogans have a blank the buyer fills in (“I could be your **_”, “Powered by _**”).

| Page           | What it does                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `/`            | Hero, the two ways to shop, popular designs, the four collections                                                                     |
| `/slogans`     | All slogans with search (`?q=`), sorting (`?sort=popular\|new\|az`), filter with `?collection=family\|serious\|funny\|signs`          |
| `/shop`        | The six garments: hi-vis vest, tank top, t-shirt, long-sleeve shirt, rain jacket, bag rain cover                                      |
| `/design`      | After a slogan is picked: fill in the blank (if any), vest or tee, colour and size. Needs `?slogan=`; also takes `garment` and `text` |
| `/shop/[slug]` | Gadget pages (bell, stickers, tote…). Paused: no longer linked from the shop                                                          |
| `/cart`        | Cart (saved in the browser's localStorage), free shipping over £50                                                                    |
| `/checkout`    | Shipping form; a server action re-checks and re-prices every line                                                                     |
| `/about`       | The mission                                                                                                                           |
| `/suggest`     | Visitors suggest slogans and vote (one vote per browser); sort by most votes or newest                                                |
| `/favourites`  | Everything the visitor has hearted (saved in their browser)                                                                           |

- **Garments, slogans and gadgets:** edit `lib/catalog.ts`. Prices are in pence (GBP).
  A slogan with `{}` in its text and a `personalise` block gets a fill-in-the-blank.
- **The slogan library:** most of the 200+ fixed slogans are plain lists in
  `lib/slogan-library.ts`. Add a line to a list and it appears on the site.
- **Product images:** `components/ProductArt.tsx` draws each item with its slogan
  (or road sign) as SVG, so no photos are needed yet.

## Real photos and social links

- **Instagram / TikTok:** paste the profile URLs into `lib/site.ts`. The links then show in the
  footer, on the home page and on the design page. Empty = hidden.
- **Photos:** drop files into `public/photos/` and list them in `lib/photos.ts` with a short
  description. Tag a photo with `garment: 'vest'` or `'tee'` to also show it on that product's
  design page. With no photos, those spots just show the social links (or nothing).

## Votes, suggestions and favourite counts

These need a small shared database. The app uses **Upstash Redis** over its REST API
(no extra packages):

1. In Vercel, open the project → **Storage** (or **Integrations**) → add **Upstash for Redis**
   and connect it to this project. It sets `KV_REST_API_URL` and `KV_REST_API_TOKEN`
   (`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` also work).
2. Redeploy.

Without it the site still works, but ideas, votes and "Most popular" counts live in memory
and reset whenever the server restarts (the suggest page says so).

**Moderation:** set an `ADMIN_KEY` environment variable, then open
`/suggest?key=<ADMIN_KEY>` to get a Delete button on every idea. Ideas are checked for
length, characters and a short list of rude words, and each browser can post 5 a day.
To turn a winning idea into a product, add it to `lib/slogan-library.ts`.

## Not done yet

- **Checking personalised text:** only length and characters are checked. Review
  custom text (or add a word filter) before anything is printed.

- **Payments:** checkout confirms the order but takes no money. Plug in Stripe
  Checkout (or similar) at the `TODO` in `app/actions/checkout.ts`.
- **Orders:** orders aren't stored or emailed anywhere yet.
- **Stock and fulfilment:** a print-on-demand service (Printful, Printify, etc.)
  could print and ship vests and tees without you holding stock.

## Payments (Stripe)

Set `STRIPE_SECRET_KEY` in Vercel → Settings → Environment Variables (`sk_test_…` to try it,
`sk_live_…` for real money). Without it, checkout runs in demo mode and takes no payment.
Apple Pay and Google Pay appear on Stripe's checkout page once switched on in
Stripe → Settings → Payment methods. Orders (items, slogan text, size, colour, address) show up
in the Stripe dashboard under Payments.

## Sharing

- Every design has its own link preview image (`/og`), so shared links show the slogan.
- Short share links: `/s/<slogan>/<word>?on=<garment>`, e.g. `/s/i-could-be-your/mum`.
- Link-in-bio page for Instagram/TikTok: `/links`.
- Set `NEXT_PUBLIC_SITE_URL` when you move to your own domain.

## Before launch

- Fill in `business` in `lib/site.ts` (name, address, email) and the social URLs.
- Replace the size chart in `lib/sizes.ts` with your supplier's.
- Have the draft pages under `/legal` checked, then remove `DraftNotice`.
