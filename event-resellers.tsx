import './src/index.css'
import { mountDeck } from './src/deck/DeckPlayer'
import {
  ERCover,
  ERWhoAndProducts,
  ERConnectivity,
  EROpportunity,
  ERClose,
} from './slides-event-resellers'

/**
 * Connected Events — organisers + experiential partners.
 * http://localhost:5173/event-resellers.html
 */
mountDeck([
  <ERCover />,
  <ERWhoAndProducts />,
  <ERConnectivity />,
  <EROpportunity />,
  <ERClose />,
])
