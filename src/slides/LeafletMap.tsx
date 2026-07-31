import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { colors } from '../theme'
import { UK_CITIES, UK_SCATTER_PINS, unprojectXY } from './ukMapData'

export type MapRender = 'dots' | 'pins' | 'labels'
export type MapRegion = 'uk' | 'us' | 'world' | 'europe' | 'auto'

export interface GeoPoint {
  lat?: number
  lng?: number
  place?: string
  label?: string
  value?: string
}

type RegionKey = 'uk' | 'us' | 'europe' | 'world'

interface LeafletMapProps {
  render?: MapRender
  region?: MapRegion | MapRegion[]
  scatter?: number
  points?: GeoPoint[]
}

// Region framings (SW, NE corners).
const REGION_BOUNDS: Record<RegionKey, [[number, number], [number, number]]> = {
  uk: [[49.8, -8.8], [59.6, 2.1]],
  us: [[24.5, -125], [49.6, -66.5]],
  europe: [[34, -12], [61, 32]],
  world: [[-54, -145], [72, 155]],
}

// Normalises the region prop to a de-duplicated list of concrete regions
// ("auto" is dropped — those decks frame to their points instead).
function normalizeRegions(region: MapRegion | MapRegion[] | undefined): RegionKey[] {
  const arr = (Array.isArray(region) ? region : [region ?? 'uk']).filter(
    (r): r is RegionKey => r === 'uk' || r === 'us' || r === 'europe' || r === 'world',
  )
  return Array.from(new Set(arr))
}

// The combined SW/NE frame that contains every listed region.
function unionBounds(regions: RegionKey[]): [[number, number], [number, number]] | null {
  if (!regions.length) return null
  let s = 90, w = 180, n = -90, e = -180
  for (const r of regions) {
    const b = REGION_BOUNDS[r]
    s = Math.min(s, b[0][0]); w = Math.min(w, b[0][1]); n = Math.max(n, b[1][0]); e = Math.max(e, b[1][1])
  }
  return [[s, w], [n, e]]
}

// Initial view so the map mounts already framed (no visible zoom jump).
function initialView(regions: RegionKey[]): { center: [number, number]; zoom: number } {
  if (regions.length === 1) {
    switch (regions[0]) {
      case 'us': return { center: [38.5, -96.5], zoom: 4 }
      case 'europe': return { center: [48, 10], zoom: 4 }
      case 'world': return { center: [28, 5], zoom: 2 }
      default: return { center: [54.6, -3.4], zoom: 5 }
    }
  }
  const b = unionBounds(regions)
  if (b) return { center: [(b[0][0] + b[1][0]) / 2, (b[0][1] + b[1][1]) / 2], zoom: 2 }
  return { center: [28, 5], zoom: 2 }
}

// A small world gazetteer + coverage sample for non-UK stories.
const WORLD_CITIES: Record<string, [number, number]> = {
  london: [51.507, -0.128], paris: [48.857, 2.352], berlin: [52.52, 13.405], madrid: [40.417, -3.703],
  rome: [41.903, 12.496], amsterdam: [52.37, 4.895], dublin: [53.35, -6.26], lisbon: [38.72, -9.14],
  'new york': [40.713, -74.006], 'los angeles': [34.05, -118.24], chicago: [41.878, -87.63],
  toronto: [43.653, -79.383], 'mexico city': [19.43, -99.13], 'são paulo': [-23.55, -46.63],
  'buenos aires': [-34.6, -58.38], dubai: [25.2, 55.27], singapore: [1.352, 103.82], tokyo: [35.68, 139.69],
  'hong kong': [22.32, 114.17], shanghai: [31.23, 121.47], mumbai: [19.076, 72.878], delhi: [28.61, 77.21],
  sydney: [-33.87, 151.21], melbourne: [-37.81, 144.96], johannesburg: [-26.2, 28.04], cairo: [30.04, 31.24],
  nairobi: [-1.29, 36.82], istanbul: [41.01, 28.98], moscow: [55.75, 37.62], seoul: [37.57, 126.98],
}

// Rough land rectangles per region ([[south, west], [north, east]]). Dots are
// scattered evenly across these (area-weighted, on a jittered grid) so the fill
// looks natural like the UK — instead of clustering around a handful of cities.
type Box = [[number, number], [number, number]]

const US_BOXES: Box[] = [
  [[41.0, -124.0], [49.0, -104.0]], // Pacific NW + northern Rockies/plains
  [[36.5, -122.5], [42.0, -111.0]], // California / Nevada / Utah
  [[32.0, -118.0], [37.0, -108.0]], // SoCal / Arizona
  [[31.5, -108.0], [37.0, -103.0]], // New Mexico
  [[31.0, -103.0], [49.0, -96.0]], // Great Plains (TX panhandle → Dakotas)
  [[29.5, -100.0], [36.8, -93.5]], // South-central (TX / OK)
  [[30.0, -93.5], [40.5, -83.0]], // Mississippi valley → Ohio / Great Lakes
  [[36.5, -83.5], [43.0, -74.5]], // Appalachia → mid-Atlantic
  [[41.0, -80.0], [47.3, -69.0]], // Northeast
  [[30.0, -85.5], [35.0, -78.0]], // Deep South (AL / GA / SC)
  [[25.2, -82.2], [30.5, -80.2]], // Florida peninsula
]

const EUROPE_BOXES: Box[] = [
  [[36.5, -9.0], [43.5, 3.0]], // Iberia
  [[43.0, -4.5], [51.0, 7.5]], // France / Benelux
  [[45.5, 6.0], [54.5, 15.0]], // Germany / Alps / central
  [[47.0, 15.0], [54.5, 24.0]], // Poland / Czechia / Hungary
  [[40.0, 12.0], [46.5, 18.5]], // Italy
  [[38.5, 19.0], [46.5, 28.0]], // Balkans / Greece / Romania
  [[55.0, 8.0], [63.0, 27.0]], // Scandinavia (south)
  [[50.0, -8.0], [58.5, 1.5]], // UK & Ireland
]

const WORLD_COVERAGE: [number, number][] = Object.values(WORLD_CITIES)

function resolvePoint(p: GeoPoint): [number, number] | null {
  if (typeof p.lat === 'number' && typeof p.lng === 'number') return [p.lat, p.lng]
  const name = (p.place || '').trim()
  if (name) {
    if (UK_CITIES[name]) { const [lng, lat] = UK_CITIES[name]; return [lat, lng] }
    const key = name.toLowerCase()
    if (WORLD_CITIES[key]) return WORLD_CITIES[key]
  }
  return null
}

// Reuses the hand-tuned UK scatter (SVG space) as real lat/lng via inverse projection.
function ukCoverage(n: number): [number, number][] {
  const src = UK_SCATTER_PINS
  const count = Math.max(1, Math.min(n, src.length))
  const stride = src.length / count
  const out: [number, number][] = []
  for (let i = 0; i < count; i++) {
    const [x, y] = src[Math.floor(i * stride)]
    const [lng, lat] = unprojectXY(x, y)
    out.push([lat, lng])
  }
  return out
}

const clampNum = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

// Deterministic pseudo-random in [-0.5, 0.5) — stable across renders, so dots never jump.
function jitter(seed: number, k: number): number {
  const v = Math.sin(seed * 127.1 + k * 311.7) * 43758.5453
  return v - Math.floor(v) - 0.5
}

// Evenly samples `base` down to n, or grows it to n by scattering extra dots
// around the base places (deterministic jitter scaled to the sample's spread).
function expandSample(base: [number, number][], n: number): [number, number][] {
  const target = clampNum(Math.round(n), 1, 400)
  if (target <= base.length) {
    const stride = base.length / target
    return Array.from({ length: target }, (_, i) => base[Math.floor(i * stride)])
  }
  const lats = base.map((p) => p[0])
  const lngs = base.map((p) => p[1])
  const ampLat = clampNum((Math.max(...lats) - Math.min(...lats)) / 18, 0.22, 0.9)
  const ampLng = clampNum((Math.max(...lngs) - Math.min(...lngs)) / 18, 0.28, 1.2)
  const out = [...base]
  while (out.length < target) {
    const i = out.length
    const [lat, lng] = base[i % base.length]
    out.push([lat + jitter(i, 1) * 2 * ampLat, lng + jitter(i, 2) * 2 * ampLng])
  }
  return out
}

const boxArea = (b: Box) => (b[1][0] - b[0][0]) * (b[1][1] - b[0][1])

// Even, deterministic scatter across a set of land rectangles. Each box gets a
// share of dots proportional to its area, laid on a jittered grid so the fill
// looks natural and uniform (never clustered).
function boxScatter(boxes: Box[], n: number): [number, number][] {
  const target = clampNum(Math.round(n), 1, 400)
  const areas = boxes.map(boxArea)
  const total = areas.reduce((a, b) => a + b, 0) || 1
  const out: [number, number][] = []
  let seed = 1
  boxes.forEach((b, bi) => {
    const count = Math.max(1, Math.round((target * areas[bi]) / total))
    const spanLat = b[1][0] - b[0][0]
    const spanLng = b[1][1] - b[0][1]
    const cols = Math.max(1, Math.round(Math.sqrt((count * spanLng) / spanLat)))
    const rows = Math.max(1, Math.ceil(count / cols))
    let placed = 0
    for (let r = 0; r < rows && placed < count; r++) {
      for (let c = 0; c < cols && placed < count; c++) {
        const fx = (c + 0.5 + jitter(seed, 1) * 0.85) / cols
        const fy = (r + 0.5 + jitter(seed, 2) * 0.85) / rows
        seed++
        out.push([b[0][0] + fy * spanLat, b[0][1] + fx * spanLng])
      }
    }
  })
  return out
}

// Coverage dots for one region: UK reuses the hand-tuned scatter; US/Europe use
// even land-rectangle scatter; world falls back to a spread of major cities.
function regionCoverage(region: RegionKey, n: number): [number, number][] {
  if (region === 'uk') return ukCoverage(n)
  if (region === 'us') return boxScatter(US_BOXES, n)
  if (region === 'europe') return boxScatter(EUROPE_BOXES, n)
  return expandSample(WORLD_COVERAGE, Math.min(n, 90))
}

// Even coverage across the bounding box of a set of points — used for region
// "auto" so an arbitrary country still gets a natural fill (never city clusters).
function bboxScatter(pts: [number, number][], n: number): [number, number][] {
  const lats = pts.map((p) => p[0])
  const lngs = pts.map((p) => p[1])
  const box: Box = [
    [Math.min(...lats) - 0.4, Math.min(...lngs) - 0.6],
    [Math.max(...lats) + 0.4, Math.max(...lngs) + 0.6],
  ]
  return boxScatter([box], n)
}

function pinIcon() {
  return L.divIcon({
    className: 'bb-pin-icon',
    html:
      '<svg width="34" height="46" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M15 1C7.3 1 1 7 1 14.5 1 25 15 39 15 39S29 25 29 14.5C29 7 22.7 1 15 1z" fill="#00BFE8" stroke="#050519" stroke-width="2"/>' +
      '<circle cx="15" cy="14.5" r="5" fill="#050519"/></svg>',
    iconSize: [34, 46],
    iconAnchor: [17, 46],
  })
}

interface LabelItem {
  xy: [number, number]
  place: string
  value?: string
}
interface ChipLayout {
  key: number
  side: 'left' | 'right'
  top: number
  edge: number // px from the anchored side to the column's inner edge
  place: string
  value?: string
}
interface LineLayout {
  key: number
  x1: number
  y1: number
  x2: number
  y2: number
}

// Draws the labelled dots' chips into de-collided left/right columns with a
// leader line from each geo-accurate dot to its chip, so nearby labels never overlap.
function LeaderLabels({ items }: { items: LabelItem[] }) {
  const map = useMap()
  const [layout, setLayout] = useState<{ w: number; h: number; chips: ChipLayout[]; lines: LineLayout[] } | null>(null)

  useLayoutEffect(() => {
    const compute = () => {
      const size = map.getSize()
      const W = size.x
      const H = size.y
      if (!W || !H) return
      const pts = items.map((it, i) => {
        const p = map.latLngToContainerPoint(it.xy as L.LatLngExpression)
        return { key: i, dx: p.x, dy: p.y, place: it.place, value: it.value }
      })
      const topM = 42
      const botM = 42
      const gap = 16
      const leftEdge = Math.round(W * 0.3) // right edge of the left column
      const rightEdge = Math.round(W * 0.7) // left edge of the right column

      const placeColumn = (arr: typeof pts, side: 'left' | 'right') => {
        arr.sort((a, b) => a.dy - b.dy)
        const chips: ChipLayout[] = []
        const lines: LineLayout[] = []
        let cursor = topM
        for (const p of arr) {
          const chipH = p.value ? 74 : 52
          let cy = Math.max(p.dy, cursor + chipH / 2)
          cy = Math.min(cy, H - botM - chipH / 2)
          cy = Math.max(cy, cursor + chipH / 2)
          const ex = side === 'left' ? leftEdge : rightEdge
          chips.push({ key: p.key, side, top: cy - chipH / 2, edge: side === 'left' ? W - ex : ex, place: p.place, value: p.value })
          lines.push({ key: p.key, x1: p.dx, y1: p.dy, x2: ex, y2: cy })
          cursor = cy + chipH / 2 + gap
        }
        return { chips, lines }
      }

      const mid = W / 2
      const left = placeColumn(pts.filter((p) => p.dx < mid), 'left')
      const right = placeColumn(pts.filter((p) => p.dx >= mid), 'right')
      setLayout({ w: W, h: H, chips: [...left.chips, ...right.chips], lines: [...left.lines, ...right.lines] })
    }

    compute()
    map.on('resize zoomend moveend', compute)
    return () => {
      map.off('resize zoomend moveend', compute)
    }
  }, [items, map])

  if (!layout) return null
  return (
    <div className="bb-leader-layer" style={{ position: 'absolute', inset: 0, width: layout.w, height: layout.h, pointerEvents: 'none', zIndex: 650 }}>
      <svg width={layout.w} height={layout.h} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        {layout.lines.map((l) => (
          <g key={l.key}>
            <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={colors.cyan} strokeWidth={1.75} strokeOpacity={0.8} />
            <circle cx={l.x2} cy={l.y2} r={3} fill={colors.cyan} />
          </g>
        ))}
      </svg>
      {layout.chips.map((c) => (
        <div
          key={c.key}
          className={`bb-lchip ${c.side}`}
          style={{ position: 'absolute', top: c.top, ...(c.side === 'left' ? { right: c.edge } : { left: c.edge }) }}
        >
          <span className="bb-place">{c.place}</span>
          {c.value && <span className="bb-val">{c.value}</span>}
        </div>
      ))}
    </div>
  )
}

// Frames the map before first paint (no animation), so there is no visible
// zoom-out or marker flicker when the slide lands.
function Framer({ regions, focus }: { regions: RegionKey[]; focus: [number, number][] }) {
  const map = useMap()
  useLayoutEffect(() => {
    map.invalidateSize(false)
    const opts: L.FitBoundsOptions = { padding: [26, 26], animate: false }
    if (regions.includes('world')) {
      map.fitBounds(REGION_BOUNDS.world, opts)
      // If the panel is taller than the world at this zoom, blank bands would
      // show above/below — floor the zoom so tiles always cover the container.
      const size = map.getSize()
      const worldPx = 256 * Math.pow(2, map.getZoom())
      if (worldPx < size.y) {
        const z = Math.ceil(Math.log2(size.y / 256) * 4) / 4
        const lng = focus.length ? focus.reduce((s, p) => s + p[1], 0) / focus.length : 0
        map.setView([25, lng], z, { animate: false })
      }
      return
    }
    const bounds = unionBounds(regions)
    if (bounds) {
      // One or more concrete regions — frame the combined extent.
      map.fitBounds(bounds, opts)
    } else if (focus.length >= 2) {
      // "auto": fit to the plotted points.
      map.fitBounds(L.latLngBounds(focus), { padding: [48, 48], maxZoom: 9, animate: false })
    } else if (focus.length === 1) {
      map.setView(focus[0], 9, { animate: false })
    } else {
      map.fitBounds(REGION_BOUNDS.uk, opts)
    }
  }, [regions, focus, map])
  return null
}

export function LeafletMap({ render = 'dots', region = 'uk', scatter, points }: LeafletMapProps) {
  const resolved = useMemo(() => (points || []).map((p) => ({ p, xy: resolvePoint(p) })).filter((r) => r.xy) as { p: GeoPoint; xy: [number, number] }[], [points])
  const regionList = useMemo(() => normalizeRegions(region), [region])

  // Coverage dots. A concrete region (or list of regions) is the SOURCE OF TRUTH
  // for a coverage field: we always scatter evenly across the region's landmass
  // and IGNORE any city points the model may have attached (those cause the
  // "urban cluster" look). Only when the region is "auto" (no concrete region)
  // do we fall back to the supplied points, even-scattered across their extent.
  const dots = useMemo<[number, number][]>(() => {
    if (render !== 'dots') return []
    const n = scatter ?? 240
    if (regionList.length === 1) return regionCoverage(regionList[0], n)
    if (regionList.length > 1) {
      // Multiple regions: give each a healthy share so all of them read as densely
      // scattered (rather than one big region swamping a small one).
      const per = clampNum(Math.round(n / Math.sqrt(regionList.length)), 90, 200)
      return regionList.flatMap((r) => regionCoverage(r, per))
    }
    // region "auto": even-scatter across the extent of the supplied points, but
    // only when they describe a compact area (a single country). If they span a
    // huge extent (multi-region misuse), plot the points as-is rather than
    // flooding the oceans between them.
    if (resolved.length >= 3) {
      const pts = resolved.map((r) => r.xy)
      const lats = pts.map((p) => p[0])
      const lngs = pts.map((p) => p[1])
      const spanLat = Math.max(...lats) - Math.min(...lats)
      const spanLng = Math.max(...lngs) - Math.min(...lngs)
      if (spanLat <= 26 && spanLng <= 34) return bboxScatter(pts, Math.max(n, pts.length))
      return pts
    }
    if (resolved.length) return resolved.map((r) => r.xy)
    return regionCoverage('uk', n)
  }, [render, resolved, regionList, scatter])

  // Everything plotted — used to fit "auto" regions and to centre the world view.
  const focus = useMemo<[number, number][]>(
    () => (render === 'dots' ? dots : resolved.map((r) => r.xy)),
    [render, dots, resolved],
  )

  const labelItems = useMemo<LabelItem[]>(
    () => resolved.map((r) => ({ xy: r.xy, place: r.p.label || r.p.place || '', value: r.p.value })),
    [resolved],
  )

  // The map is revealed only after its tiles have loaded (or a short timeout),
  // hiding initial tile pop-in behind a fade.
  const [ready, setReady] = useState(false)
  const tileRef = useRef<L.TileLayer | null>(null)
  useEffect(() => {
    const done = () => setReady(true)
    const tl = tileRef.current
    if (tl) tl.once('load', done)
    const t = setTimeout(done, 1500)
    return () => {
      if (tl) tl.off('load', done)
      clearTimeout(t)
    }
  }, [])

  const view = initialView(regionList)

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: ready ? 1 : 0, transition: 'opacity 450ms ease' }}>
      <MapContainer
        style={{ width: '100%', height: '100%', background: colors.bg }}
        center={view.center}
        zoom={view.zoom}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        boxZoom={false}
        keyboard={false}
        touchZoom={false}
        zoomSnap={0.25}
        zoomAnimation={false}
        fadeAnimation={false}
        markerZoomAnimation={false}
      >
        <TileLayer
          ref={tileRef}
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
          subdomains="abcd"
          detectRetina
        />
        <Framer regions={regionList} focus={focus} />

        {render === 'dots' &&
          dots.map((c, i) => (
            <CircleMarker
              key={i}
              center={c}
              radius={6}
              pathOptions={{ color: colors.bg, weight: 1.5, fillColor: colors.cyan, fillOpacity: 0.9 }}
            />
          ))}

        {render === 'pins' &&
          resolved.map((r, i) => <Marker key={i} position={r.xy} icon={pinIcon()} />)}

        {render === 'labels' && (
          <>
            {resolved.map((r, i) => (
              <CircleMarker
                key={i}
                center={r.xy}
                radius={7}
                pathOptions={{ color: colors.bg, weight: 2.5, fillColor: colors.cyan, fillOpacity: 1 }}
              />
            ))}
            <LeaderLabels items={labelItems} />
          </>
        )}
      </MapContainer>
    </div>
  )
}
