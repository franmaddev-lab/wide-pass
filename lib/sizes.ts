import type { GarmentId } from './catalog'

// Size guide. TODO: replace with the exact chart from your supplier before launch.

export const apparelChart = {
  headers: ['Size', 'Chest (cm)', 'Chest (in)'],
  rows: [
    ['XS', '81–86', '32–34'],
    ['S', '86–94', '34–37'],
    ['M', '94–102', '37–40'],
    ['L', '102–110', '40–43'],
    ['XL', '110–118', '43–46'],
    ['XXL', '118–126', '46–50'],
  ],
}

export const raincoverChart = {
  headers: ['Size', 'Fits'],
  rows: [
    ['15–25 L', 'Most commuter and day backpacks'],
    ['25–35 L', 'Large backpacks and laptop bags'],
  ],
}

export const fitNotes: Record<GarmentId, string> = {
  tank: 'Relaxed: straight cut. Fitted: racerback, slimmer and shaped at the waist. Between sizes? Go up.',
  tee: 'Relaxed: straight, roomy cut. Fitted: narrower and shaped at the waist. Between sizes? Go up.',
  longsleeve: 'Unisex regular fit. Between sizes? Go up.',
  vest: 'Cut to go over a jersey or jacket. Between sizes? Go up.',
  jacket: 'Cut to go over layers, with a longer back for riding. Between sizes? Go up.',
  raincover:
    'Elasticated edge. Check the litres on your bag’s label; if it’s on the border, take the bigger one.',
}

export function chartFor(garment: GarmentId) {
  return garment === 'raincover' ? raincoverChart : apparelChart
}
