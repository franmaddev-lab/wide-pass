# Wide Pass — cycling apparel with a message

A small online shop for hi-vis vests, t-shirts and gadgets with funny and serious
slogans (“I could be your sister”, “Pass wide. Pass slow.”, “Powered by pasta”)
that remind drivers there is a person on that bike.

Built with Next.js 16, React 19 and Tailwind CSS 4.

```bash
npm install
npm run dev    # http://localhost:3000
```

## What's here

There are two ways to shop, and both end on the same design page:

- **Slogan first:** `/slogans` → pick a message → choose vest or tee
- **Gear first:** `/shop` → pick vest or tee → choose a message

Some slogans have a blank the buyer fills in (“I could be your ___”, “Powered by ___”).

| Page | What it does |
| --- | --- |
| `/` | Hero, the two ways to shop, popular designs, the four collections |
| `/slogans` | All slogans, filter with `?collection=family\|serious\|funny\|signs` |
| `/shop` | Vest and tee (each opens the designer), plus ready-made gadgets |
| `/design` | Designer: gear, slogan, personalised text, colour, size. Presets via `?garment=vest&slogan=powered-by&text=coffee` |
| `/shop/[slug]` | Gadget page (bell, stickers, tote…) |
| `/cart` | Cart (saved in the browser's localStorage), free shipping over €50 |
| `/checkout` | Shipping form; a server action re-checks and re-prices every line |
| `/about` | The mission |

- **Garments, slogans and gadgets:** edit `lib/catalog.ts`. Prices are in euro cents.
  A slogan with `{}` in its text and a `personalise` block gets a fill-in-the-blank.
- **Product images:** `components/ProductArt.tsx` draws each item with its slogan
  (or road sign) as SVG, so no photos are needed yet.

## Not done yet

- **Checking personalised text:** only length and characters are checked. Review
  custom text (or add a word filter) before anything is printed.

- **Payments:** checkout confirms the order but takes no money. Plug in Stripe
  Checkout (or similar) at the `TODO` in `app/actions/checkout.ts`.
- **Orders:** orders aren't stored or emailed anywhere yet.
- **Stock and fulfilment:** a print-on-demand service (Printful, Printify, etc.)
  could print and ship vests and tees without you holding stock.
