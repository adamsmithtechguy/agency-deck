import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { colors, font } from './src/theme'

// Small self-contained world map for the "Global Presence" card: one glowing
// hub dot per region with a label pinned right next to it (no leader-line
// layout, so nothing can clip in a small container). Isolated deck only.

type LabelPos = 'top' | 'bottom' | 'left'
const HUBS: { lat: number; lng: number; label: string; pos: LabelPos }[] = [
  { lat: 54.0, lng: -2.5, label: 'UK', pos: 'top' },
  { lat: 48.5, lng: 12.0, label: 'Europe', pos: 'bottom' },
  { lat: 39.0, lng: -98.0, label: 'US', pos: 'top' },
  { lat: 24.5, lng: 54.5, label: 'Middle East', pos: 'bottom' },
  { lat: -25.5, lng: 134.0, label: 'Australia', pos: 'left' },
]

function FitWorld() {
  const map = useMap()
  useEffect(() => {
    const bounds = L.latLngBounds(HUBS.map((h) => [h.lat, h.lng] as [number, number]))
    map.fitBounds(bounds, { padding: [28, 28], animate: false })
  }, [map])
  return null
}

function labelIcon(label: string, pos: LabelPos) {
  const transform =
    pos === 'left' ? 'translate(calc(-100% - 12px), -50%)'
    : pos === 'bottom' ? 'translate(-50%, 10px)'
    : 'translate(-50%, calc(-100% - 10px))'
  return L.divIcon({
    className: '',
    html: `<div style="
      transform: ${transform};
      display: inline-block; white-space: nowrap;
      font-family: ${font.body}; font-size: 15px; font-weight: 700; letter-spacing: 0.5px;
      color: #fff; background: rgba(5,5,25,0.82); border: 1px solid rgba(255,255,255,0.25);
      border-radius: 999px; padding: 4px 12px;">${label}</div>`,
    iconSize: [0, 0],
  })
}

export function WorldPresenceMap() {
  const [ready, setReady] = useState(false)
  const tileRef = useRef<L.TileLayer | null>(null)
  useEffect(() => {
    const done = () => setReady(true)
    const tl = tileRef.current
    if (tl) tl.once('load', done)
    const t = setTimeout(done, 1800)
    return () => {
      if (tl) tl.off('load', done)
      clearTimeout(t)
    }
  }, [])
  return (
    <div style={{ position: 'absolute', inset: 0, background: colors.bg, opacity: ready ? 1 : 0, transition: 'opacity 450ms ease' }}>
      <MapContainer
        style={{ width: '100%', height: '100%', background: colors.bg }}
        center={[26, 10]}
        zoom={1}
        zoomSnap={0.1}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        boxZoom={false}
        keyboard={false}
        touchZoom={false}
        zoomAnimation={false}
        fadeAnimation={false}
        markerZoomAnimation={false}
        attributionControl={false}
      >
        <FitWorld />
        <TileLayer
          ref={tileRef}
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          detectRetina
        />
        {HUBS.map((h) => (
          <CircleMarker
            key={h.label}
            center={[h.lat, h.lng]}
            radius={8}
            pathOptions={{ color: colors.bg, weight: 2, fillColor: colors.cyan, fillOpacity: 1 }}
          />
        ))}
        {HUBS.map((h) => (
          <Marker key={`l-${h.label}`} position={[h.lat, h.lng]} icon={labelIcon(h.label, h.pos)} interactive={false} />
        ))}
      </MapContainer>
    </div>
  )
}
