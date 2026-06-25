import { useEffect, useRef } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import hondurasHigh from '@amcharts/amcharts5-geodata/hondurasHigh'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { useTranslation } from 'react-i18next'

// Intensidad relativa por departamento basada en imagen oficial
// Los nombres se traducen en tiempo de render vía i18n/locales/<lang>/bosquesMap.json
const HEAT_DATA_BASE = [
  { id: 'HN-CP', value: 100 },
  { id: 'HN-YO', value: 100 },
  { id: 'HN-LE', value: 75  },
  { id: 'HN-CM', value: 75  },
  { id: 'HN-OC', value: 75  },
  { id: 'HN-SB', value: 55  },
  { id: 'HN-IN', value: 30  },
  { id: 'HN-CR', value: 15  },
  { id: 'HN-LP', value: 5   },
]

const ACTIVE_IDS = HEAT_DATA_BASE.map(d => d.id)

export default function BosquesMap() {
  const { t } = useTranslation('bosquesMap')
  const chartRef = useRef(null)
  const rootRef  = useRef(null)
  const HEAT_DATA = HEAT_DATA_BASE.map(d => ({ ...d, name: t(`departments.${d.id}`) }))

  useEffect(() => {
    if (!chartRef.current) return

    const root = am5.Root.new(chartRef.current)
    rootRef.current = root
    root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection:    am5map.geoMercator(),
        panX:          'none', panY: 'none',
        wheelY:        'none', wheelX: 'none',
        pinchZoom:     false,
        homeGeoPoint:  { longitude: -88.0, latitude: 14.7 },
        homeZoomLevel: 3.5,
        maxZoomLevel:  3.5,
      })
    )

    // Fondo — todos los departamentos en gris claro
    const bgSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, { geoJSON: hondurasHigh })
    )
    bgSeries.mapPolygons.template.setAll({
      fill:        am5.color('#E5D9C5'),
      stroke:      am5.color('#ffffff'),
      strokeWidth: 1,
      tooltipText: '',
    })

    // Departamentos con calor
    const heatSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON:             hondurasHigh,
        include:             ACTIVE_IDS,
        valueField:          'value',
        calculateAggregates: true,
      })
    )

    heatSeries.set('heatRules', [{
      target:    heatSeries.mapPolygons.template,
      dataField: 'value',
      min:       am5.color('#C8E6C9'),
      max:       am5.color('#1B5E20'),
      key:       'fill',
    }])

    heatSeries.mapPolygons.template.setAll({
      stroke:      am5.color('#ffffff'),
      strokeWidth: 1.2,
      interactive: true,
      tooltipHTML: `<div style="background:#1B5E20;color:#fff;padding:8px 14px;border-radius:10px;font-family:inherit;">
        <p style="font-size:13px;font-weight:700;margin:0">{name}</p>
        <p style="font-size:11px;opacity:0.7;margin:2px 0 0">${t('tooltip')}</p>
      </div>`,
    })

    heatSeries.mapPolygons.template.states.create('hover', {
      fillOpacity: 0.75,
    })

    heatSeries.data.setAll(HEAT_DATA)

    chart.appear(800, 100)
    return () => root.dispose()
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div ref={chartRef} style={{ width: '100%', flex: 1, minHeight: '300px' }} />
      {/* Leyenda */}
      <div className="flex items-center justify-center gap-3 mt-2">
        <span className="text-[10px] text-cafe-light font-medium">{t('legend.lower')}</span>
        <div className="flex h-2.5 w-32 rounded-full overflow-hidden">
          {['#C8E6C9','#A5D6A7','#66BB6A','#388E3C','#1B5E20'].map((c,i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="text-[10px] text-cafe-light font-medium">{t('legend.higher')}</span>
      </div>
    </div>
  )
}
