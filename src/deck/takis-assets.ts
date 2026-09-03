/** Taki's® GB product imagery — swap paths here to update across the deck. */
export const TAKIS = {
  travelBg: 'assets/machine.jpg',
  gymBg: 'assets/gym-group-connected.jpg',
  hero: 'assets/takis/pack-trio.png',
  products: {
    fuego: 'assets/takis/fuego.png',
    blueHeat: 'assets/takis/blue-heat.png',
    dragonSweetChilli: 'assets/takis/dragon-sweet-chilli.png',
    intenseNacho: 'assets/takis/intense-nacho.png',
  },
} as const

/** MAG · 4 SKUs */
export const MAG_SKUS = [
  { label: 'Takis® Fuego', image: TAKIS.products.fuego },
  { label: 'Takis® Blue Heat', image: TAKIS.products.blueHeat },
  { label: 'Takis® Fuego', image: TAKIS.products.fuego },
  { label: 'Takis® Dragon Sweet Chilli', image: TAKIS.products.dragonSweetChilli },
] as const

/** HFG · 5 SKUs */
export const HFG_SKUS = [
  { label: 'Takis® Fuego', image: TAKIS.products.fuego },
  { label: 'Takis® Blue Heat', image: TAKIS.products.blueHeat },
  { label: 'Takis® Intense Nacho', image: TAKIS.products.intenseNacho },
  { label: 'Takis® Intense Nacho', image: TAKIS.products.intenseNacho },
  { label: 'Takis® Dragon Sweet Chilli', image: TAKIS.products.dragonSweetChilli },
] as const

export const FORECAST_ROS = 30
