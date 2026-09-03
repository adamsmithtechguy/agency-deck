import './src/index.css'
import { mountDeck } from './src/deck/DeckPlayer'
import { BSWhoWeAre, BSImagineAnywhere, BSIntelligenceBrightBlue } from './slides-brand-sell'
import {
  ERCover,
  ERProducts,
  ERBooth,
  ERShowFloor,
  ERResellerEarn,
  ERClose,
} from './slides-event-resellers'

/**
 * Event Resellers deck.
 * Intro from Brand Sell Summary, then products + reseller earn.
 * http://localhost:5173/event-resellers.html
 */
mountDeck([
  <ERCover />,
  <BSWhoWeAre />,
  <BSImagineAnywhere />,
  <BSIntelligenceBrightBlue />,
  <ERProducts />,
  <ERBooth />,
  <ERShowFloor />,
  <ERResellerEarn />,
  <ERClose />,
])
