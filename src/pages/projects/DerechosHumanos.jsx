import { useState, useLayoutEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProjectHero from '../../components/ProjectHero'
import CounterStat from '../../components/CounterStat'
import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import am5geodata_hondurasLow from '@amcharts/amcharts5-geodata/hondurasLow'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const COLOR  = '#0D47A1'
const ACCENT = '#1565C0'

const BASE  = '/imagenes/proyectos/derechos-humanos'
const COMP  = `${BASE}/compressed`

/* ── Imágenes ─────────────────────────────────────────── */
const HERO_IMG = `${COMP}/Hero.webp`

const GALLERY = [
  { src: `${COMP}/DDHH_WA01.webp`               },
  { src: `${COMP}/DDHH_WA04.webp`               },
  { src: `${COMP}/_EAA4845.webp`                },
  { src: `${COMP}/DDHH_WA03.webp`               },
  { src: `${COMP}/_EAA4525.webp`                },
  { src: `${COMP}/niño_escribe_677x747px.webp`  },
  { src: `${COMP}/niño_jugando_loteria.webp`    },
  { src: `${COMP}/DDHH_WA06.webp`               },
  { src: `${COMP}/niños_fila_merienda.webp`     },
  { src: `${COMP}/DDHH_WA05.webp`               },
  { src: `${COMP}/_EAA4688.webp`                },
  { src: `${COMP}/niña_pintando_343x394_px.webp`},
  { src: `${COMP}/_EAA4601.webp`                },
  { src: `${COMP}/DDHH_WA02.webp`               },
  { src: `${COMP}/_EAA4617.webp`                },
  { src: `${COMP}/_EAA4876.webp`                },
  { src: `${COMP}/galeria_21.webp`              },
  { src: `${COMP}/recibiendo_clases.webp`        },
  { src: `${COMP}/_EAA4888.webp`                },
  { src: `${COMP}/DDHH_WA07.webp`               },
  { src: `${COMP}/_EAA4672.webp`                },
  { src: `${COMP}/niños.webp`                   },
]

const ROTATIONS = [-4, 2, -6, 3, -2, 5, -3, 4, -5, 2, 6, -4, 3, -2, 5, -6, 4, -3]

const Icon = ({ d, d2, className = 'w-6 h-6', style }) => (
  <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    {d2 && <path strokeLinecap="round" strokeLinejoin="round" d={d2} />}
  </svg>
)

const ICONS = {
  shield:  'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  eye:     'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  home:    'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
  book:    'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
  backpack:'M16.5 6.75V6A4.5 4.5 0 0012 1.5 4.5 4.5 0 007.5 6v.75M16.5 6.75H7.5m9 0a2.25 2.25 0 012.25 2.25v2.167c-1.336.384-2.786.666-4.5.777V15a2.25 2.25 0 01-2.25 2.25h-1.5A2.25 2.25 0 019 15v-3.056a24.64 24.64 0 01-4.5-.777V9A2.25 2.25 0 016.75 6.75M12 12.75h.008v.008H12v-.008z',
  users:   'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
  hands:   'M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002',
  clip:    'M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75',
  pin:     'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
  expand:  'M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15',
  close:   'M6 18L18 6M6 6l12 12',
}

const COMPROMISOS_BASE = [
  { key: 'espaciosSeguros', icon: ICONS.home,     pct: 100, img: `${COMP}/_EAA4948.webp` },
  { key: 'monitoreo',       icon: ICONS.eye,      pct: 100, img: `${COMP}/_EAA4968.webp` },
  { key: 'capacitados',     icon: ICONS.users,    pct: 60,  img: `${COMP}/LineaTiempo1.webp` },
  { key: 'kits',            icon: ICONS.backpack, pct: 100, img: `${COMP}/galeria_20.webp` },
  { key: 'protocolo',       icon: ICONS.clip,     pct: 40,  img: `${COMP}/niños_comiendo_merienda.webp` },
  { key: 'articulacion',    icon: ICONS.hands,    pct: 85,  img: `${COMP}/_EAA4560.webp` },
]

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6 },
}

/* ── Mapa de Honduras (amCharts 5) ────────────────────── */
const HIGHLIGHTED = ['HN-SB', 'HN-YO', 'HN-CM']

function HondurasMap({ color = '#0D47A1' }) {
  const { t } = useTranslation('derechosHumanos')
  const chartRef = useRef(null)

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current)
    root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'none',
        panY: 'none',
        wheelX: 'none',
        wheelY: 'none',
        projection: am5map.geoMercator(),
      })
    )

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_hondurasLow,
      })
    )

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
      fill: am5.color('#93C5FD'),
      stroke: am5.color('#ffffff'),
      strokeWidth: 1,
    })

    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color('#60A5FA'),
    })

    polygonSeries.events.on('datavalidated', () => {
      polygonSeries.mapPolygons.each(polygon => {
        const id = polygon.dataItem?.get('id')
        if (HIGHLIGHTED.includes(id)) {
          polygon.setAll({
            fill: am5.color(color),
            stroke: am5.color('#ffffff'),
            strokeWidth: 2,
          })
          polygon.states.create('hover', {
            fill: am5.color('#1976D2'),
          })
        }
      })
    })

    return () => root.dispose()
  }, [color])

  return (
    <div>
      <div ref={chartRef} style={{ width: '100%', height: '380px' }} />
      <div className="mt-4 flex gap-5 justify-center flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 rounded" style={{ backgroundColor: color }} />
          <span className="text-xs text-cafe-light font-medium">{t('map.legend.intervened')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 rounded bg-blue-300" />
          <span className="text-xs text-cafe-light font-medium">{t('map.legend.other')}</span>
        </div>
      </div>
    </div>
  )
}

/* ── Lightbox ─────────────────────────────────────────── */
function Lightbox({ src, onClose, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
      >
        <Icon d={ICONS.close} className="w-8 h-8" />
      </button>
      <button
        onClick={e => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 text-white/70 hover:text-white transition-colors p-2"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <motion.img
        key={src}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        src={src}
        alt=""
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      />
      <button
        onClick={e => { e.stopPropagation(); onNext() }}
        className="absolute right-4 text-white/70 hover:text-white transition-colors p-2"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </motion.div>
  )
}

export default function DerechosHumanos() {
  const { t } = useTranslation('derechosHumanos')
  const [lightbox,    setLightbox]    = useState(null)
  const [draggingIdx, setDraggingIdx] = useState(null)
  const boardRef = useRef(null)

  const CAPTIONS = t('captions', { returnObjects: true })
  const COMPROMISOS = COMPROMISOS_BASE.map(c => ({
    ...c,
    title:  t(`timeline.items.${c.key}.title`),
    desc:   t(`timeline.items.${c.key}.desc`),
    status: t(`timeline.items.${c.key}.status`),
  }))

  const openLightbox = (idx) => setLightbox(idx)
  const closeLightbox = () => setLightbox(null)
  const prevImg = () => setLightbox(i => (i - 1 + GALLERY.length) % GALLERY.length)
  const nextImg = () => setLightbox(i => (i + 1) % GALLERY.length)

  return (
    <div className="page-enter">
      <ProjectHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        description={t('hero.description')}
        color={COLOR}
        imageSrc={HERO_IMG}
        imagePosition="center 25%"
        tag={t('hero.tag')}
        collaborators={1}
      />

      {/* ── Números clave ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-3xl overflow-hidden">
            {[
              { value: 450,  label: t('stats.items.personas.label'),       sub: t('stats.items.personas.sub') },
              { value: 86,   label: t('stats.items.kits.label'),           sub: t('stats.items.kits.sub') },
              { value: 3,    label: t('stats.items.espacios.label'),       sub: t('stats.items.espacios.sub') },
              { value: 3,    label: t('stats.items.departamentos.label'), sub: t('stats.items.departamentos.sub') },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white px-8 py-10 text-center"
              >
                <CounterStat value={s.value} className="text-cafe" duration={1800} />
                <p className="font-bold text-cafe text-sm mt-1">{s.label}</p>
                <p className="text-cafe-light text-xs mt-0.5">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline de compromisos ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-16">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
              {t('timeline.eyebrow')}
            </span>
            <h2 className="text-4xl font-black text-cafe mt-2">{t('timeline.title')}</h2>
            <p className="text-cafe-light mt-3 max-w-xl leading-relaxed">
              {t('timeline.description')}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-300 md:left-1/2" />

            <div className="space-y-8">
              {COMPROMISOS.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex flex-col md:flex-row md:items-center gap-6 md:gap-0 ${
                    c.img ? (i % 2 !== 0 ? 'md:flex-row-reverse' : '') : 'md:justify-center'
                  }`}
                >
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-4 border-white -translate-x-1/2 top-6 z-10"
                       style={{ backgroundColor: COLOR }} />

                  <div className={`ml-14 md:ml-0 bg-white rounded-3xl p-6 shadow-sm w-full ${c.img ? 'md:w-[46%]' : 'md:w-[60%]'} hover:shadow-lg transition-shadow duration-300 border border-gray-100 ${
                    c.img ? (i % 2 === 0 ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10') : ''
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                           style={{ backgroundColor: `${COLOR}12` }}>
                        <Icon d={c.icon} className="w-5 h-5" style={{ color: COLOR }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                          <h3 className="font-black text-cafe text-base leading-snug">{c.title}</h3>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                                style={{ backgroundColor: `${COLOR}15`, color: COLOR }}>
                            {c.status}
                          </span>
                        </div>
                        <p className="text-cafe-light text-sm leading-relaxed mb-3">{c.desc}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${c.pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.4 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: COLOR }}
                            />
                          </div>
                          <span className="text-xs font-black" style={{ color: COLOR }}>{c.pct}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {c.img && (
                    <div className={`ml-14 md:ml-0 md:w-[46%] flex ${
                      i % 2 === 0 ? 'justify-start md:justify-end' : 'justify-start'
                    }`}>
                      <div className="w-3/4 sm:w-2/3 md:w-[70%] rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                        <img src={c.img} alt={c.title} className="w-full h-full object-cover aspect-[4/3]" loading="lazy" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Departamentos + descripción ── */}
      <section className="py-24 bg-[#F2EDE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
                {t('map.eyebrow')}
              </span>
              <h2 className="text-4xl font-black text-cafe mt-2 mb-6">
                {t('map.title')}
              </h2>
              <p className="text-cafe-light mb-8 leading-relaxed">
                {t('map.description')}
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <HondurasMap color={COLOR} />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-3xl p-8 text-white"
                   style={{ background: `linear-gradient(150deg, ${COLOR}, ${ACCENT})` }}>
                <Icon d={ICONS.shield} className="w-12 h-12 mb-6 opacity-80" />
                <h3 className="text-2xl font-black mb-4">{t('map.objectiveTitle')}</h3>
                <p className="text-white/80 leading-relaxed mb-6 text-sm">
                  {t('map.objectiveText')}
                </p>
                <div className="grid grid-cols-3 gap-3 border-t border-white/20 pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-black">1</p>
                    <p className="text-white/70 text-xs mt-0.5">{t('map.miniStats.coordinadora')}</p>
                  </div>
                  <div className="text-center border-x border-white/20">
                    <p className="text-3xl font-black">3</p>
                    <p className="text-white/70 text-xs mt-0.5">{t('map.miniStats.departamentos')}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-black">450</p>
                    <p className="text-white/70 text-xs mt-0.5">{t('map.miniStats.meta')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Galería polaroid ── */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#7a4f2e' }}>
        {/* Textura tablero de corcho */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }} />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-14 text-center">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold
                             uppercase tracking-widest px-4 py-2 rounded-full border border-white/30 mb-4">
              {t('gallery.badge')}
            </span>
            <h2 className="text-4xl font-black text-white">{t('gallery.title')}</h2>
            <p className="text-white/60 mt-3 max-w-xl mx-auto leading-relaxed">
              {t('gallery.description')}
            </p>
            <p className="text-white/40 mt-2 text-sm flex items-center justify-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3.75 9A2.25 2.25 0 016 6.75h12A2.25 2.25 0 0120.25 9v7.5A2.25 2.25 0 0118 18.75H6A2.25 2.25 0 013.75 16.5V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75V5.25a.75.75 0 01.75-.75h6a.75.75 0 01.75.75v1.5" />
              </svg>
              {t('gallery.dragHint')}
            </p>
          </motion.div>

          {/* CSS keyframe sway — corre en GPU, sin JS */}
          <style>{`
            @keyframes polaroid-sway {
              from { transform: rotate(calc(var(--base) - var(--amp))); }
              to   { transform: rotate(calc(var(--base) + var(--amp))); }
            }
            .polaroid-sway {
              animation: polaroid-sway var(--dur) ease-in-out infinite alternate;
              animation-delay: var(--delay);
              transform-origin: top center;
              will-change: transform;
              transition: box-shadow 0.25s ease, transform 0.15s ease;
            }
            .polaroid-sway:hover {
              animation-play-state: paused;
              box-shadow: 6px 8px 24px rgba(0,0,0,0.65) !important;
            }
          `}</style>

          <div
            ref={boardRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8"
          >
            {GALLERY.map((img, i) => {
              const isDragging = draggingIdx === i
              const rot = ROTATIONS[i % ROTATIONS.length]
              return (
                /* Wrapper de entrada — sin drag para no conflictuar con y de animate */
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: (i % 5) * 0.08 }}
                  style={{ position: 'relative' }}
                >
                  {/* Div draggable — separado para no mezclar transforms */}
                  <motion.div
                    drag
                    dragConstraints={boardRef}
                    dragMomentum={false}
                    dragElastic={0.06}
                    onDragStart={() => setDraggingIdx(i)}
                    onDragEnd={() => setDraggingIdx(null)}
                    onTap={() => openLightbox(i)}
                    style={{
                      position: 'relative',
                      zIndex: isDragging ? 50 : 1,
                      cursor: isDragging ? 'grabbing' : 'grab',
                      userSelect: 'none',
                    }}
                  >
                    {/* Inner: solo sway rotation */}
                    <div
                      className={isDragging ? '' : 'polaroid-sway'}
                      style={{
                        '--base':  `${rot}deg`,
                        '--amp':   `${1 + (i % 3) * 0.6}deg`,
                        '--dur':   `${2.5 + (i % 5) * 0.6}s`,
                        '--delay': `${(i % 7) * 0.4}s`,
                        transform: isDragging ? `rotate(${rot}deg) scale(1.07)` : undefined,
                        backgroundColor: '#fff',
                        padding: '10px',
                        paddingBottom: '44px',
                        boxShadow: isDragging
                          ? '12px 16px 40px rgba(0,0,0,0.8)'
                          : '3px 4px 14px rgba(0,0,0,0.5)',
                        transition: 'box-shadow 0.2s ease',
                      }}
                    >
                      {/* Tachuela */}
                      <div
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
                        style={{
                          backgroundColor: isDragging ? '#95a5a6' : '#c0392b',
                          boxShadow: isDragging
                            ? '0 2px 6px rgba(0,0,0,0.3)'
                            : '0 1px 4px rgba(0,0,0,0.5)',
                          transform: isDragging ? 'translateY(3px)' : 'none',
                          transition: 'background-color 0.15s, box-shadow 0.15s, transform 0.15s',
                        }}
                      />
                      <div className="overflow-hidden aspect-square">
                        <img src={img.src} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <p className="text-center text-gray-400 text-xs mt-2 truncate"
                         style={{ fontFamily: 'cursive', letterSpacing: '0.03em' }}>
                        {CAPTIONS[i % CAPTIONS.length]}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white text-center">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn-primary">{t('cta.btnAll')}</Link>
            <Link to="/proyectos/piloto-yoro" className="btn-dark">{t('cta.btnNext')}</Link>
          </div>
        </motion.div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            src={GALLERY[lightbox].src}
            onClose={closeLightbox}
            onPrev={prevImg}
            onNext={nextImg}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
