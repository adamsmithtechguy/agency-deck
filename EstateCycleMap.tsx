import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { colors } from './src/theme'
import { MACHINE_SITES } from './src/data/machineSites'

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

function dotSize(count: number) {
  if (count >= 30) return 22
  if (count >= 10) return 18
  if (count >= 3) return 14
  return 11
}

function siteIcon(index: number, count: number) {
  const delay = Math.min(index * 6, 1400)
  const size = dotSize(count)
  const hub = count >= 8
  return L.divIcon({
    className: '',
    html: `<div class="bb-dot">${
      hub
        ? `<span class="bb-dot-ring" style="width:${size * 2}px;height:${size * 2}px;margin:${-size}px 0 0 ${-size}px;animation-delay:${delay}ms"></span>`
        : ''
    }<span class="bb-dot-core" style="width:${size}px;height:${size}px;margin:${-size / 2}px 0 0 ${-size / 2}px;animation-delay:${delay}ms"></span></div>`,
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
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          detectRetina
        />
        {MACHINE_SITES.map((site, i) => (
          <Marker
            key={`${site.postcode}-${i}`}
            position={[site.lat, site.lng]}
            icon={siteIcon(i, site.count)}
            interactive={false}
          />
        ))}
      </MapContainer>
    </div>
  )
}
