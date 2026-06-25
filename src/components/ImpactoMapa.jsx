import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'

// ISO2 codes for the Americas (North, Central, South + Caribbean)
const AMERICAS = new Set([
  'CA','US','MX','GT','BZ','HN','SV','NI','CR','PA',
  'CU','JM','HT','DO','PR','TT','BB','LC','VC','GD','AG','DM','KN','BS',
  'CO','VE','GY','SR','BR','EC','PE','BO','PY','UY','AR','CL',
  'TC','KY','VG','VI','AW','CW','SX','MQ','GP','GF',
])

/* Los nombres/notas visibles (tooltip, lista) viven en i18n/locales/<lang>/impactoMapa.json */
const COUNTRIES = [
  { id: 'HN', highlight: true  },
  { id: 'NI', highlight: false },
  { id: 'GT', highlight: false },
  { id: 'SV', highlight: false },
  { id: 'PA', highlight: false },
  { id: 'CO', highlight: false },
  { id: 'CR', highlight: false },
  { id: 'PE', highlight: false },
  { id: 'BO', highlight: false },
  { id: 'VE', highlight: false },
  { id: 'MX', highlight: false },
  { id: 'BR', highlight: false },
  { id: 'EC', highlight: false },
  { id: 'DO', highlight: false },
  { id: 'CU', highlight: false },
  { id: 'PY', highlight: false },
  { id: 'UY', highlight: false },
  { id: 'CL', highlight: false },
  { id: 'AR', highlight: false },
  { id: 'HT', highlight: false },
  { id: 'JM', highlight: false },
  { id: 'PR', highlight: false },
  { id: 'CA', highlight: false },
]

// Filter geodata to Americas only
const americasGeoJSON = {
  ...am5geodata_worldLow,
  features: am5geodata_worldLow.features.filter(f => AMERICAS.has(f.id)),
}

const PAISES_LIST = [
  { id: 'HN', flag: '🇭🇳', sede: true  },
  { id: 'MX', flag: '🇲🇽' },
  { id: 'GT', flag: '🇬🇹' },
  { id: 'SV', flag: '🇸🇻' },
  { id: 'NI', flag: '🇳🇮' },
  { id: 'CR', flag: '🇨🇷' },
  { id: 'PA', flag: '🇵🇦' },
  { id: 'CU', flag: '🇨🇺' },
  { id: 'DO', flag: '🇩🇴' },
  { id: 'HT', flag: '🇭🇹' },
  { id: 'JM', flag: '🇯🇲' },
  { id: 'PR', flag: '🇵🇷' },
  { id: 'CO', flag: '🇨🇴' },
  { id: 'VE', flag: '🇻🇪' },
  { id: 'EC', flag: '🇪🇨' },
  { id: 'PE', flag: '🇵🇪' },
  { id: 'BO', flag: '🇧🇴' },
  { id: 'BR', flag: '🇧🇷' },
  { id: 'PY', flag: '🇵🇾' },
  { id: 'UY', flag: '🇺🇾' },
  { id: 'AR', flag: '🇦🇷' },
  { id: 'CL', flag: '🇨🇱' },
  { id: 'CA', flag: '🇨🇦' },
]

export default function ImpactoMapa() {
  const { t } = useTranslation('impactoMapa')
  const chartDivRef = useRef(null)
  const rootRef = useRef(null)
  const [tooltip, setTooltip] = useState(null)
  const [showPaises, setShowPaises] = useState(false)

  useEffect(() => {
    if (!chartDivRef.current) return

    const root = am5.Root.new(chartDivRef.current)
    rootRef.current = root
    root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'translateX',
        panY: 'translateY',
        projection: am5map.geoMercator(),
        homeGeoPoint: { longitude: -80, latitude: 10 },
        homeZoomLevel: 1,
        maxZoomLevel: 8,
        minZoomLevel: 0.8,
      })
    )

    // Americas polygons
    const americasSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: americasGeoJSON,
      })
    )

    americasSeries.mapPolygons.template.setAll({
      fill: am5.color(0xD7CCC8),
      stroke: am5.color(0xFFFFFF),
      strokeWidth: 0.8,
      interactive: true,
    })

    americasSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(0xBCAAA4),
    })

    americasSeries.events.on('datavalidated', () => {
      americasSeries.mapPolygons.each((polygon) => {
        const id = polygon.dataItem?.get('id')
        const country = COUNTRIES.find(c => c.id === id)
        if (country) {
          polygon.set('fill', am5.color(country.highlight ? 0x1B5E20 : 0x4CAF50))
          polygon.set('fillOpacity', country.highlight ? 1 : 0.72)
          polygon.states.create('hover', {
            fill: am5.color(country.highlight ? 0x2E7D32 : 0x81C784),
          })
          polygon.set('cursorOverStyle', 'pointer')

          polygon.events.on('pointerover', (ev) => {
            setTooltip({
              name: i18n.t(`countries.${country.id}.name`, { ns: 'impactoMapa' }),
              note: i18n.t(`countries.${country.id}.note`, { ns: 'impactoMapa' }),
              x: ev.point.x,
              y: ev.point.y,
            })
          })
          polygon.events.on('pointerout', () => setTooltip(null))
        }
      })
    })

    // Pulsing dots
    const pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {})
    )

    pointSeries.bullets.push((root, series, dataItem) => {
      const isHighlight = dataItem.dataContext.highlight
      const container = am5.Container.new(root, {})

      const pulse = container.children.push(am5.Circle.new(root, {
        radius: isHighlight ? 12 : 6,
        fill: am5.color(isHighlight ? 0x1B5E20 : 0x4CAF50),
        fillOpacity: 0.25,
        strokeOpacity: 0,
      }))
      pulse.animate({ key: 'radius', from: isHighlight ? 8 : 4, to: isHighlight ? 20 : 12, duration: 1400, loops: Infinity, easing: am5.ease.out(am5.ease.cubic) })
      pulse.animate({ key: 'fillOpacity', from: 0.45, to: 0, duration: 1400, loops: Infinity, easing: am5.ease.out(am5.ease.cubic) })

      container.children.push(am5.Circle.new(root, {
        radius: isHighlight ? 6 : 3.5,
        fill: am5.color(isHighlight ? 0x1B5E20 : 0x4CAF50),
        stroke: am5.color(0xFFFFFF),
        strokeWidth: isHighlight ? 2 : 1,
      }))

      return am5.Bullet.new(root, { sprite: container })
    })

    pointSeries.data.setAll(
      COUNTRIES
        .map(c => ({ longitude: getCenter(c.id)[0], latitude: getCenter(c.id)[1], highlight: c.highlight, id: c.id }))
        .filter(d => d.longitude !== 0)
    )

    chart.set('zoomControl', am5map.ZoomControl.new(root, {}))
    chart.appear(1000, 100)

    return () => root.dispose()
  }, [])

  return (
    <div className="relative w-full">
      <div
        ref={chartDivRef}
        className="w-full rounded-3xl overflow-hidden shadow-xl bg-[#EAF4EA]"
        style={{ height: 520 }}
      />

      {tooltip && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{ left: tooltip.x + 14, top: tooltip.y - 14 }}
        >
          <div className="bg-[#1B2C1E] text-white rounded-xl px-4 py-2.5 shadow-2xl min-w-[170px]">
            <p className="font-bold text-sm">{tooltip.name}</p>
            <p className="text-xs text-white/60 mt-0.5">{tooltip.note}</p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-cafe">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: '#1B5E20' }} />
          <span className="font-semibold">{t('legend.hq')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: '#4CAF50' }} />
          <span>{t('legend.virtual')}</span>
        </div>
        <div className="flex items-center gap-2 text-cafe-light">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
          </svg>
          <span>{t('legend.drag')}</span>
        </div>
      </div>

      {/* Stats strip */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        {/* Clickable: países alcanzados */}
        <button
          onClick={() => setShowPaises(true)}
          className="bg-white rounded-2xl py-4 px-3 shadow-sm hover:shadow-md hover:ring-2 hover:ring-[#1B5E20]/30 transition-all duration-200 cursor-pointer group"
        >
          <p className="text-2xl font-black text-[#1B5E20]">23</p>
          <p className="text-xs text-cafe-light mt-1">{t('statsStrip.countries')}</p>
          <p className="text-[10px] text-[#1B5E20] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{t('statsStrip.viewList')}</p>
        </button>

        <div className="bg-white rounded-2xl py-4 px-3 shadow-sm">
          <p className="text-2xl font-black text-[#1B5E20]">6</p>
          <p className="text-xs text-cafe-light mt-1">{t('statsStrip.activeProjects')}</p>
        </div>

        <div className="bg-white rounded-2xl py-4 px-3 shadow-sm">
          <p className="text-2xl font-black text-[#1B5E20]">CA+LATAM</p>
          <p className="text-xs text-cafe-light mt-1">{t('statsStrip.region')}</p>
        </div>
      </div>

      {/* Modal lista de países — portal para evitar que el transform del padre rompa el fixed */}
      {showPaises && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowPaises(false)}
        >
          <div
            className="bg-[#F2EDE4] rounded-3xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/8">
              <div>
                <h3 className="text-xl font-black text-cafe">{t('modal.title')}</h3>
                <p className="text-xs text-cafe-light mt-0.5">{t('modal.subtitle')}</p>
              </div>
              <button
                onClick={() => setShowPaises(false)}
                className="w-8 h-8 rounded-full bg-black/8 hover:bg-black/15 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-cafe" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* List */}
            <div className="overflow-y-auto flex-1 px-4 py-4 space-y-2">
              {PAISES_LIST.map((p, i) => (
                <div
                  key={p.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
                    p.sede ? 'bg-[#1B5E20] text-white' : 'bg-white text-cafe hover:bg-white/80'
                  }`}
                >
                  <span className="text-2xl leading-none">{p.flag}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{t(`countries.${p.id}.name`)}</p>
                    {p.sede && <p className="text-xs text-white/70">{t('sedePrincipal')}</p>}
                  </div>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                    p.sede ? 'bg-white/20 text-white' : 'bg-[#1B5E20]/10 text-[#1B5E20]'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      , document.body)}
    </div>
  )
}

function getCenter(id) {
  const c = {
    HN:[-86.5,14.8], NI:[-85.0,12.8], GT:[-90.2,15.5], SV:[-88.9,13.8],
    PA:[-80.0,8.9],  CO:[-74.0,4.5],  CR:[-84.0,9.7],  PE:[-75.0,-9.2],
    BO:[-65.0,-16.5],VE:[-66.0,8.0],  MX:[-102.5,23.6],BR:[-51.9,-14.2],
    EC:[-78.1,-1.8], DO:[-70.1,18.7], CU:[-79.5,22.0], PY:[-58.4,-23.4],
    UY:[-56.1,-32.5],CL:[-71.5,-35.7],AR:[-63.6,-38.4],HT:[-72.3,19.0],
    JM:[-77.3,18.1], PR:[-66.5,18.2], CA:[-96.8,56.1],
  }
  return c[id] ?? [0,0]
}
