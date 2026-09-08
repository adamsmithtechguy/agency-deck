import './src/index.css'
import { mountDeck } from './src/deck/DeckPlayer'
import {
  OSCover,
  OSWhoWeAre,
  OSImagineAnywhere,
  OSIntelligence,
  OSOpportunity,
  OSListings,
  OSMedia,
  OSEvents,
  OSStock,
  OSContact,
} from './slides-occastore'

/**
 * OccaStore × Bright.Blue brand listings deck.
 * Copy of the 9-slide brand sell, rethemed for OccaStore wholesale,
 * with short-term / launch listings and a short-life stock page.
 * http://localhost:5173/occastore.html
 */
mountDeck([
  <OSCover />,
  <OSWhoWeAre />,
  <OSImagineAnywhere />,
  <OSIntelligence />,
  <OSOpportunity />,
  <OSListings />,
  <OSMedia />,
  <OSEvents />,
  <OSStock />,
  <OSContact />,
])
