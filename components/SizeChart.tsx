import { chartFor, fitNotes } from '@/lib/sizes'
import type { GarmentId } from '@/lib/catalog'

export default function SizeChart({ garment, id }: { garment: GarmentId; id?: string }) {
  const chart = chartFor(garment)
  return (
    <div id={id} className="rounded-xl border-2 border-ink bg-white p-3 text-sm">
      <table className="w-full text-left">
        <thead>
          <tr>
            {chart.headers.map((h) => (
              <th key={h} className="pb-1 font-bold uppercase">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chart.rows.map((r) => (
            <tr key={r[0]} className="border-t border-ink/15">
              {r.map((c, i) => (
                <td key={i} className={`py-1 ${i === 0 ? 'font-semibold' : ''}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-muted">{fitNotes[garment]}</p>
    </div>
  )
}
