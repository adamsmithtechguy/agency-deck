import './src/index.css'
import { mountDeck } from './src/deck/DeckPlayer'
import {
  BSCover,
  BSWhoWeAre,
  BSImagineAnywhere,
  BSListings,
  BSMediaEvents,
  BSContact,
} from './slides-brand-sell'

/**
 * Brand Sell Summary — 6 slides for sharing.
 * Dropped the standalone intelligence and Magnum opportunity slides
 * (folded into the platform slide). Media and events share one activation slide.
 * http://localhost:5173/brand-sell-summary.html
 * http://localhost:5173/brand-sell.html
 */
mountDeck([
  <BSCover />,
  <BSWhoWeAre />,
  <BSImagineAnywhere />,
  <BSListings />,
  <BSMediaEvents />,
  <BSContact />,
])
