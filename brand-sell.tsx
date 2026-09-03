import './src/index.css'
import { mountDeck } from './src/deck/DeckPlayer'
import {
  BSCover,
  BSWhoWeAre,
  BSImagineAnywhere,
  BSIntelligenceBrightBlue,
  BSOpportunity,
  BSListings,
  BSMedia,
  BSEvents,
  BSContact,
} from './slides-brand-sell'

/**
 * Brand Sell Summary deck.
 * http://localhost:5173/brand-sell-summary.html
 * http://localhost:5173/brand-sell.html
 */
mountDeck([
  <BSCover />,
  <BSWhoWeAre />,
  <BSImagineAnywhere />,
  <BSIntelligenceBrightBlue />,
  <BSOpportunity />,
  <BSListings />,
  <BSMedia />,
  <BSEvents />,
  <BSContact />,
])
