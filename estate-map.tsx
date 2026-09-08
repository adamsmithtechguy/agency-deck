import { StrictMode, useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './src/index.css'
import { colors, font, radius } from './src/theme'
import { MACHINE_COUNT, SITE_COUNT } from './src/data/machineSites'
import sitesJson from './src/data/machine-sites.json'

type Machine = {
  name: string
  model: string
  operator: string
  installed: string
}

type Site = {
  postcode: string
  lat: number
  lng: number
  city: string
  label: string
  operator: string
  count: number
  machines: Machine[]
}

type Channel = 'all' | 'airport' | 'gym' | 'other'

const SITES = sitesJson as Site[]

function channelOf(site: Site): Exclude<Channel, 'all'> {
  const blob = `${site.label} ${site.operator} ${site.machines.map((m) => m.name).join(' ')}`
  if (/airport|stansted|stanstead/i.test(blob)) return 'airport'
  if (/gym|fitness|powerleague|goals|padel/i.test(blob)) return 'gym'
  return 'other'
}

function dotSize(count: number) {
  if (count >= 30) return 22
  if (count >= 10) return 18
  if (count >= 3) return 14
  return 11
}

function siteIcon(site: Site, active: boolean) {
  const size = dotSize(site.count) + (active ? 4 : 0)
  const channel = channelOf(site)
  const fill = channel === 'airport' ? '#183EF6' : '#00BFE8'
  const glow = active ? '0 0 22px rgba(0,191,232,1)' : '0 0 14px rgba(0,191,232,.85)'
  const hub = site.count >= 8
  return L.divIcon({
    className: 'bb-pin-icon',
    html: `<div style="position:relative">
      ${hub ? `<span style="position:absolute;left:0;top:0;width:${size * 2.2}px;height:${size * 2.2}px;margin:${-size * 1.1}px 0 0 ${-size * 1.1}px;border-radius:999px;border:2px solid rgba(0,191,232,.35)"></span>` : ''}
      <span style="position:absolute;left:0;top:0;width:${size}px;height:${size}px;margin:${-size / 2}px 0 0 ${-size / 2}px;border-radius:999px;background:${fill};box-shadow:${glow},0 0 3px rgba(255,255,255,.9);border:${active ? '2px solid #fff' : '1px solid rgba(255,255,255,.55)'}"></span>
    </div>`,
    iconSize: [0, 0],
  })
}

function FitSites({ sites }: { sites: Site[] }) {
  const map = useMap()
  useEffect(() => {
    if (!sites.length) return
    const bounds = L.latLngBounds(sites.map((s) => [s.lat, s.lng] as [number, number]))
    map.fitBounds(bounds, { padding: [48, 280], maxZoom: 6.4, animate: false })
  }, [map, sites])
  return null
}

function FlyTo({ site }: { site: Site | null }) {
  const map = useMap()
  useEffect(() => {
    if (!site) return
    map.flyTo([site.lat, site.lng], 9, { duration: 0.75 })
  }, [map, site])
  return null
}

function EstateMapApp() {
  const [query, setQuery] = useState('')
  const [channel, setChannel] = useState<Channel>('all')
  const [selected, setSelected] = useState<Site | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SITES.filter((site) => {
      if (channel !== 'all' && channelOf(site) !== channel) return false
      if (!q) return true
      const hay = `${site.label} ${site.city} ${site.postcode} ${site.operator} ${site.machines.map((m) => m.name).join(' ')}`.toLowerCase()
      return hay.includes(q)
    })
  }, [query, channel])

  const visibleCount = filtered.reduce((n, s) => n + s.count, 0)

  return (
    <div style={{ position: 'fixed', inset: 0, background: colors.bgDeep, color: colors.text, fontFamily: font.body }}>
      <MapContainer
        style={{ position: 'absolute', inset: 0, background: colors.bgDeep }}
        center={[54.2, -2.8]}
        zoom={6}
        minZoom={5}
        maxZoom={14}
        zoomSnap={0.25}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          detectRetina
        />
        <FitSites sites={SITES} />
        <FlyTo site={selected} />
        {filtered.map((site, i) => (
          <Marker
            key={`${site.postcode}-${site.lat}-${i}`}
            position={[site.lat, site.lng]}
            icon={siteIcon(site, selected?.postcode === site.postcode && selected.lat === site.lat)}
            eventHandlers={{ click: () => setSelected(site) }}
          />
        ))}
      </MapContainer>

      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 400, zIndex: 500,
        background: 'linear-gradient(90deg, rgba(5,5,25,0.96) 0%, rgba(5,5,25,0.88) 72%, rgba(5,5,25,0) 100%)',
        pointerEvents: 'none',
      }} />

      <aside style={{
        position: 'absolute', top: 28, left: 28, width: 360, zIndex: 600, pointerEvents: 'auto',
        display: 'flex', flexDirection: 'column', gap: 16, maxHeight: 'calc(100vh - 56px)',
      }}>
        <img src="assets/bb-logo.png" alt="Bright.Blue" style={{ height: 40, width: 'auto', display: 'block' }} />
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2.4, textTransform: 'uppercase', color: colors.cyan }}>Connected estate</div>
          <h1 style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 34, letterSpacing: -0.8, margin: '6px 0 0', lineHeight: 1.1 }}>
            Machine locations
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Stat n={MACHINE_COUNT.toLocaleString()} l="Live machines" />
          <Stat n={SITE_COUNT.toLocaleString()} l="Sites nationwide" />
        </div>

        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelected(null) }}
          placeholder="Search site, city, postcode…"
          style={{
            width: '100%', boxSizing: 'border-box', padding: '12px 14px',
            borderRadius: radius.sm, border: `1px solid ${colors.borderStrong}`,
            background: 'rgba(5,5,25,0.78)', color: colors.text, fontFamily: font.body, fontSize: 15, outline: 'none',
          }}
        />

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['all', 'gym', 'airport', 'other'] as Channel[]).map((id) => (
            <button
              key={id}
              onClick={() => { setChannel(id); setSelected(null) }}
              style={{
                padding: '7px 12px', borderRadius: 999, cursor: 'pointer',
                border: `1px solid ${channel === id ? colors.cyan : colors.border}`,
                background: channel === id ? 'rgba(0,191,232,0.16)' : 'rgba(255,255,255,0.04)',
                color: channel === id ? colors.cyan : colors.textMuted,
                fontFamily: font.body, fontWeight: 700, fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase',
              }}
            >
              {id === 'all' ? 'All' : id === 'gym' ? 'Gyms' : id === 'airport' ? 'Airports' : 'Other'}
            </button>
          ))}
        </div>

        <div style={{ color: colors.textFaint, fontSize: 13 }}>
          Showing {visibleCount} machines across {filtered.length} sites
        </div>

        {!selected && (
          <div style={{
            overflow: 'auto', minHeight: 0, flex: '1 1 auto',
            display: 'flex', flexDirection: 'column', gap: 6, paddingRight: 4,
          }}>
            {filtered.slice(0, 40).map((site, i) => (
              <button
                key={`${site.postcode}-${i}`}
                onClick={() => setSelected(site)}
                style={{
                  textAlign: 'left', cursor: 'pointer',
                  background: 'rgba(255,255,255,0.03)', border: `1px solid ${colors.border}`,
                  borderRadius: 12, padding: '10px 12px', color: colors.text, fontFamily: font.body,
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.25 }}>{site.label}</div>
                <div style={{ color: colors.textFaint, fontSize: 12, marginTop: 3 }}>
                  {site.count} machine{site.count === 1 ? '' : 's'}
                  {site.postcode ? ` · ${site.postcode}` : ''}
                  {site.city ? ` · ${site.city}` : ''}
                </div>
              </button>
            ))}
          </div>
        )}

        {selected && (
          <div style={{
            background: 'rgba(5,5,25,0.92)', border: `1px solid ${colors.borderStrong}`,
            borderRadius: radius.md, padding: 16, overflow: 'auto', minHeight: 0, flex: '1 1 auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 20, lineHeight: 1.2 }}>{selected.label}</div>
                <div style={{ color: colors.cyan, fontSize: 13, fontWeight: 700, marginTop: 6 }}>
                  {selected.city ? `${selected.city} · ` : ''}{selected.postcode || 'No postcode'}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  border: `1px solid ${colors.border}`, background: 'transparent', color: colors.textMuted,
                  borderRadius: 999, width: 28, height: 28, cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>
            <div style={{ color: colors.textMuted, fontSize: 13, marginTop: 8 }}>
              {selected.count} machine{selected.count === 1 ? '' : 's'} · {selected.operator}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
              {selected.machines.map((m) => (
                <div key={m.name} style={{ borderTop: `1px solid ${colors.border}`, paddingTop: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: colors.textFaint, marginTop: 2 }}>
                    {[m.model, m.installed].filter(Boolean).join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      <div style={{
        position: 'absolute', left: 28, bottom: 22, zIndex: 600,
        display: selected ? 'none' : 'flex', alignItems: 'center', gap: 14,
        color: colors.textMuted, fontSize: 12, fontWeight: 600, letterSpacing: 0.3,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: colors.cyan, boxShadow: '0 0 8px rgba(0,191,232,.9)' }} />
        1 machine
        <span style={{ width: 14, height: 14, borderRadius: 999, background: colors.cyan, boxShadow: '0 0 10px rgba(0,191,232,.9)' }} />
        3–9
        <span style={{ width: 18, height: 18, borderRadius: 999, background: colors.primary, boxShadow: '0 0 12px rgba(24,62,246,.9)' }} />
        Hub
      </div>
    </div>
  )
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.border}`,
      borderRadius: radius.sm, padding: '10px 12px',
    }}>
      <div style={{ fontFamily: font.heading, fontWeight: 800, fontSize: 26, color: colors.cyan, lineHeight: 1 }}>{n}</div>
      <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>{l}</div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EstateMapApp />
  </StrictMode>,
)
