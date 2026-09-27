import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Us — Wide Pass',
  description:
    'Why a cycling shop prints “I could be your sister” on hi-vis vests. The jokes, the numbers and what we’re asking drivers for.',
}

const DFT_2025 =
  'https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-vulnerable-road-user-factsheets/reported-road-casualties-great-britain-pedal-cycle-factsheet-2025'
const DFT_2024 =
  'https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-pedal-cyclist-factsheet-2024/reported-road-casualties-in-great-britain-pedal-cycle-factsheet-2024'
const NEAR_MISS =
  'https://westminsterresearch.westminster.ac.uk/item/97129/investigating-the-rates-and-impacts-of-near-misses-and-related-incidents-among-uk-cyclists'
const ATTITUDES =
  'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/724855/british-social-attitudes-survey-2017.pdf'
const HIGHWAY_CODE = 'https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203'
const HIGHWAY_CODE_2022 =
  'https://www.gov.uk/government/news/the-highway-code-8-changes-you-need-to-know-from-29-january-2022'

// Figures checked September 2026. Update them when the DfT publishes a new year.
const NUMBERS = [
  {
    big: '79',
    what: 'cyclists killed on roads in Great Britain in 2025.',
    source: 'Department for Transport',
    href: DFT_2025,
  },
  {
    big: '4,311',
    what: 'cyclists seriously injured in 2025. The kind of injured that means hospital.',
    source: 'Department for Transport',
    href: DFT_2025,
  },
  {
    big: '2 a week',
    what: 'killed, and 78 a week seriously injured, on average from 2020 to 2024.',
    source: 'Department for Transport',
    href: DFT_2024,
  },
  {
    big: '1 a week',
    what: '“very scary” near miss for the average UK rider. Close passes are almost a third of them.',
    source: 'Near Miss Project, University of Westminster',
    href: NEAR_MISS,
  },
  {
    big: '62%',
    what: 'of adults in England say the roads are too dangerous for them to cycle on.',
    source: 'British Social Attitudes survey, DfT',
    href: ATTITUDES,
  },
  {
    big: '1.5 m',
    what: 'the least space to leave when passing a cyclist at up to 30 mph. More when faster.',
    source: 'Highway Code, rule 163',
    href: HIGHWAY_CODE,
  },
]

const ASKS = [
  {
    title: 'Give 1.5 metres',
    body: 'Picture a whole bike laid sideways between you and the rider. At higher speeds, give more.',
  },
  {
    title: 'Wait a few seconds',
    body: 'If there isn’t room to pass, stay behind. You’ll catch us up at the next lights anyway.',
  },
  {
    title: 'Look before you open',
    body: 'Open your door with the hand furthest from it. It turns your head towards the bike you didn’t see (the “Dutch reach”, rule 239).',
  },
  {
    title: 'Remember who weighs more',
    body: 'The Highway Code’s hierarchy says the more harm you can do, the more care you owe. Two tonnes of car owes quite a lot.',
  },
]

const LINKS = [
  {
    href: HIGHWAY_CODE_2022,
    title: 'The 2022 Highway Code changes',
    body: 'The eight changes every road user should know, from GOV.UK.',
  },
  {
    href: 'https://www.nationaldashcamsafetyportal.com/',
    title: 'Report a close pass',
    body: 'Got it on camera? Many UK police forces take footage through the National Dashcam Safety Portal. Others have their own form.',
  },
  {
    href: 'https://www.cyclinguk.org/',
    title: 'Cycling UK',
    body: 'The national cycling charity: campaigns, legal advice and insurance.',
  },
  {
    href: 'https://www.roadpeace.org/',
    title: 'RoadPeace',
    body: 'Support for people bereaved or seriously injured in road crashes.',
  },
  {
    href: 'https://www.brake.org.uk/',
    title: 'Brake',
    body: 'Road safety charity supporting victims and campaigning for safer roads.',
  },
]

function Out({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
      {children}
    </a>
  )
}

export default function UsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm font-bold tracking-widest uppercase">Us</p>
      <h1 className="mt-1 font-display text-3xl leading-tight uppercase min-[360px]:text-4xl">
        Hi. We’re the people you overtake.
      </h1>
      <p className="mt-4 max-w-2xl">
        Wide Pass is a small, independent shop run by people who ride bikes. We also drive, walk and
        sit in traffic muttering at nobody. So we know what a cyclist looks like through a
        windscreen: small, slow, in the way. And what they look like from the saddle: somebody’s
        sister, on her way home.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl uppercase sm:text-3xl">Why print it on a vest?</h2>
        <div className="mt-4 max-w-2xl space-y-4">
          <p>
            Because “cyclist” clearly isn’t doing the job. On UK roads the average rider has a “very
            scary” near miss about <Out href={NEAR_MISS}>once a week</Out>, and close passes make up
            almost a third of them. No wonder <Out href={ATTITUDES}>62% of adults in England</Out>{' '}
            say the roads are too dangerous for them to cycle on.
          </p>
          <p>It’s easy to squeeze past a cyclist. It’s much harder to squeeze past your sister.</p>
          <p>
            So we print the human part in capital letters. <strong>I COULD BE YOUR SISTER.</strong>{' '}
            It’s a joke. It’s also true. Every rider is somebody’s someone, and we’d like them all
            to get home for dinner.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl uppercase sm:text-3xl">The unfunny bit</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NUMBERS.map((n) => (
            <div key={n.big} className="flex flex-col rounded-2xl border-2 border-ink bg-white p-5">
              <p className="font-display text-3xl uppercase">{n.big}</p>
              <p className="mt-2 flex-1">{n.what}</p>
              <p className="mt-3 text-sm text-muted">
                Source: <Out href={n.href}>{n.source}</Out>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border-2 border-ink bg-ink p-6 text-paper sm:p-8">
        <h2 className="font-display text-2xl text-volt uppercase sm:text-3xl">So why the jokes?</h2>
        <p className="mt-4 max-w-2xl">
          Because shouting doesn’t work and nobody reads a leaflet at 30 mph. A driver who smiles is
          a driver who’s looking at you, and a driver who’s looking at you gives you room. The funny
          slogans get noticed. The serious ones get remembered. Both get you a wider pass.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl uppercase sm:text-3xl">What we’re asking for</h2>
        <p className="mt-2 text-asphalt">Not much, honestly.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {ASKS.map((a) => (
            <div key={a.title} className="rounded-2xl border-2 border-ink bg-volt p-5">
              <h3 className="font-display text-lg uppercase">{a.title}</h3>
              <p className="mt-2">{a.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          From the <Out href={HIGHWAY_CODE}>Highway Code</Out>, rules 163 and 239, and the hierarchy
          of road users (rule H1).
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl uppercase sm:text-3xl">Useful links</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-2xl border-2 border-ink bg-white p-5 hover:bg-volt"
              >
                <span className="font-display text-lg uppercase">{l.title} ↗</span>
                <span className="mt-2 block">{l.body}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        <Link
          href="/slogans"
          className="rounded-full border-2 border-ink bg-ink px-6 py-4 text-center font-display text-lg text-volt uppercase"
        >
          Wear the message
        </Link>
        <Link
          href="/suggest"
          className="rounded-full border-2 border-ink bg-white px-6 py-4 text-center font-display text-lg uppercase hover:bg-volt"
        >
          Got a better line?
        </Link>
      </div>
    </div>
  )
}
