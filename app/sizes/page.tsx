import type { Metadata } from 'next'
import Link from 'next/link'
import { garments } from '@/lib/catalog'
import { apparelChart, fitNotes, raincoverChart } from '@/lib/sizes'

export const metadata: Metadata = { title: 'Size guide — Wide Pass' }

function Chart({ chart }: { chart: { headers: string[]; rows: string[][] } }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border-2 border-ink bg-white">
      <table className="w-full text-left">
        <thead className="bg-volt">
          <tr>
            {chart.headers.map((h) => (
              <th key={h} className="px-4 py-2 text-sm font-bold uppercase">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chart.rows.map((r) => (
            <tr key={r[0]} className="border-t-2 border-ink/10">
              {r.map((c, i) => (
                <td key={i} className={`px-4 py-2 ${i === 0 ? 'font-bold' : ''}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SizesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl uppercase">Size guide</h1>
      <p className="mt-2 text-asphalt">
        Measure around the fullest part of your chest, under your arms, with the tape level.
      </p>

      <h2 className="mt-10 font-display text-2xl uppercase">Tops, vests &amp; jackets</h2>
      <Chart chart={apparelChart} />
      <ul className="mt-4 space-y-2">
        {garments
          .filter((g) => g.id !== 'raincover')
          .map((g) => (
            <li key={g.id}>
              <strong>{g.name}:</strong> {fitNotes[g.id]}
            </li>
          ))}
      </ul>

      <h2 className="mt-10 font-display text-2xl uppercase">Bag rain cover</h2>
      <Chart chart={raincoverChart} />
      <p className="mt-4">{fitNotes.raincover}</p>

      <p className="mt-10">
        Still unsure? Unworn, un-personalised items can be swapped. See{' '}
        <Link href="/legal/returns" className="font-semibold underline">
          returns
        </Link>
        .
      </p>
    </div>
  )
}
