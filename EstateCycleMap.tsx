import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { colors } from './src/theme'

// ISOLATED deck component: a static full-screen UK map densely populated with
// dots to show a national connected estate. No user interaction. Local review only.

// Real anchor cities across the UK; a deterministic jitter scatters satellite
// dots around each to read as a dense, nationwide estate.
const UK_CITIES: [number, number][] = [
  [51.5074, -0.1278], [51.46, -0.11], [51.55, -0.02], [51.49, -0.22], [51.58, -0.14], [51.44, -0.32],
  [52.4862, -1.8904], [53.4808, -2.2426], [53.8008, -1.5491], [53.4084, -2.9916], [53.3811, -1.4701],
  [51.4545, -2.5879], [52.9548, -1.1581], [54.9783, -1.6178], [55.8642, -4.2518], [55.9533, -3.1883],
  [51.4816, -3.1791], [52.6369, -1.1398], [52.4068, -1.5197], [51.4543, -0.9781], [50.9097, -1.4044],
  [50.8198, -1.088], [50.8225, -0.1372], [52.0406, -0.7594], [51.8787, -0.42], [52.6309, 1.2974],
  [53.7676, -0.3274], [54.5742, -1.2349], [57.1497, -2.0943], [50.3755, -4.1427], [51.6214, -3.9436],
  [50.7192, -1.8808], [52.9225, -1.4746], [53.0027, -2.1794], [53.7632, -2.7031], [54.5973, -5.9301],
  [56.462, -2.9707], [57.4778, -4.2247], [52.2053, 0.1218], [51.752, -1.2577], [50.7184, -3.5339],
  [53.96, -1.0873], [53.1934, -2.8931], [52.587, -2.1288], [53.5769, -2.4282], [54.9069, -1.3838],
  [53.796, -1.7594], [53.8175, -3.0357], [53.5228, -1.1285], [52.5695, -0.2405], [52.0567, 1.1482],
  [51.8642, -2.238], [51.3811, -2.359], [51.2665, -1.0876], [51.1091, -0.1872], [51.2704, 0.5227],
  [51.7356, 0.4685], [51.5558, -1.7797], [52.2405, -0.9027], [53.2307, -0.5406], [54.0466, -2.8007],
]

// MAG airports, kept exact so travel hubs sit on their real coordinates.
const AIRPORTS: [number, number][] = [
  [53.3651, -2.2728], [51.885, 0.235], [52.8311, -1.328],
]

export const UK_DOTS: [number, number][] = (() => {
  const out: [number, number][] = [...AIRPORTS]
  let seed = 1337
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    return seed / 0x7fffffff
  }
  for (const [lat, lng] of UK_CITIES) {
    out.push([lat, lng])
    const extra = 2 + Math.floor(rand() * 4)
    for (let k = 0; k < extra; k++) {
      out.push([lat + (rand() - 0.5) * 0.42, lng + (rand() - 0.5) * 0.58])
    }
  }
  return out
})()

function FitUK() {
  const map = useMap()
  useEffect(() => {
    map.fitBounds(L.latLngBounds([[49.9, -8.4], [59.2, 1.9]]), {
      paddingTopLeft: [820, 70],
      paddingBottomRight: [80, 90],
      animate: false,
    })
  }, [map])
  return null
}

function dotIcon(index: number) {
  const delay = Math.min(index * 8, 1500)
  return L.divIcon({
    className: '',
    html: `<div class="bb-dot"><span class="bb-dot-core" style="animation-delay:${delay}ms"></span></div>`,
    iconSize: [0, 0],
  })
}

export function UKDotsMap() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: colors.bg }}>
      <MapContainer
        style={{ width: '100%', height: '100%', background: colors.bg }}
        center={[54.2, -3]}
        zoom={5.4}
        minZoom={4}
        maxZoom={10}
        zoomSnap={0.1}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        boxZoom={false}
        keyboard={false}
        touchZoom={false}
        zoomAnimation={false}
        markerZoomAnimation={false}
        attributionControl={false}
      >
        <FitUK />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          detectRetina
        />
        {UK_DOTS.map((p, i) => (
          <Marker key={i} position={p} icon={dotIcon(i)} interactive={false} />
        ))}
      </MapContainer>
    </div>
  )
}
