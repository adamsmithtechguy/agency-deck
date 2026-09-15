import 'leaflet/dist/leaflet.css'
import './src/index.css'
import { mountDeck } from './src/deck/DeckPlayer'
import {
  CRIntro,
  CRCover,
  CREstate,
  CRJourney,
  CRRoof,
  CRTurnkey,
  CRUI,
  CRClose,
} from './slides-connected-retail'

/**
 * Generic Connected Retail pack.
 * Four doors in (venue, brand, OOH, agency), then the full platform.
 * http://localhost:5173/connected-retail.html
 */
mountDeck([
  <CRIntro />,
  <CRCover />,
  <CREstate />,
  <CRJourney />,
  <CRRoof />,
  <CRTurnkey />,
  <CRUI />,
  <CRClose />,
])
