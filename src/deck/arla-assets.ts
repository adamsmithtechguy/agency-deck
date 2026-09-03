/** Arla / Starbucks product imagery — swap paths here to update across the Red Star deck. */
export const ARLA = {
  travelBg: 'assets/machine.jpg',
  gymBg: 'assets/gym-group-connected.jpg',
  proteinHero: 'assets/arla/protein-hero.jpg',
  products: {
    frappuccino: 'assets/arla/starbucks-frappuccino.png',
    doubleshot: 'assets/arla/starbucks-doubleshot.png',
    tripleshot: 'assets/arla/starbucks-tripleshot.png',
    proteinVanilla: 'assets/arla/protein-vanilla-morrisons.jpg',
  },
} as const

/** MAG · 4 SKUs: 1× protein, 1× doubleshot, 2× frappuccino */
export const MAG_SKUS = [
  { label: 'Arla Protein', image: ARLA.products.proteinVanilla },
  { label: 'Starbucks Doubleshot', image: ARLA.products.doubleshot },
  { label: 'Starbucks Frappuccino', image: ARLA.products.frappuccino },
  { label: 'Starbucks Frappuccino', image: ARLA.products.frappuccino },
] as const

/** HFG · 5 SKUs: 1× doubleshot, 1× tripleshot, 2× protein, 1× frappuccino */
export const HFG_SKUS = [
  { label: 'Starbucks Doubleshot', image: ARLA.products.doubleshot },
  { label: 'Starbucks Tripleshot', image: ARLA.products.tripleshot },
  { label: 'Arla Protein', image: ARLA.products.proteinVanilla },
  { label: 'Arla Protein', image: ARLA.products.proteinVanilla },
  { label: 'Starbucks Frappuccino', image: ARLA.products.frappuccino },
] as const

export const FORECAST_ROS = 30
