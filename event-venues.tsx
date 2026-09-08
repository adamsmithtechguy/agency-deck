import './src/index.css'
import { mountDeck } from './src/deck/DeckPlayer'
import {
  EVCover,
  EVAudience,
  EVVipJourney,
  EVPublicSpaces,
  EVOrganizerResale,
  EVOpportunity,
  EVClose,
} from './slides-event-venues'

/**
 * Connected Events — venues, convention centres, hotels, destinations.
 * http://localhost:5173/event-venues.html
 */
mountDeck([
  <EVCover />,
  <EVAudience />,
  <EVVipJourney />,
  <EVPublicSpaces />,
  <EVOrganizerResale />,
  <EVOpportunity />,
  <EVClose />,
])
