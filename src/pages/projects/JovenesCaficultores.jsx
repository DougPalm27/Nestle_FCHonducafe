import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectHero from '../../components/ProjectHero'
import CounterStat from '../../components/CounterStat'
import ProgressBar from '../../components/ProgressBar'

const COLOR = '#2E7D32'
const LIGHT = '#E8F5E9'
const MID   = '#43A047'

/* ── Imágenes ─────────────────────────────────────────── */
const AULA = [
  '/imagenes/proyectos/jovenes-caficultores/aulaMovil/galeria-01.jpg',
  '/imagenes/proyectos/jovenes-caficultores/aulaMovil/galeria-02.jpg',
  '/imagenes/proyectos/jovenes-caficultores/aulaMovil/galeria-03.jpg',
]
const VIRTUAL = [
  '/imagenes/proyectos/jovenes-caficultores/clasesVirtuales/Iniciativa1.jpeg.jpg',
  '/imagenes/proyectos/jovenes-caficultores/clasesVirtuales/Iniciativa2.png',
  '/imagenes/proyectos/jovenes-caficultores/clasesVirtuales/Iniciativa3.png',
  '/imagenes/proyectos/jovenes-caficultores/clasesVirtuales/iniciativa4.png',
  '/imagenes/proyectos/jovenes-caficultores/clasesVirtuales/Iniciativa5.png',
  '/imagenes/proyectos/jovenes-caficultores/clasesVirtuales/Iniciativa6.png',
  '/imagenes/proyectos/jovenes-caficultores/clasesVirtuales/iniciativa7.png',
]

/* ── Icon helper ──────────────────────────────────────── */
const Icon = ({ d, d2, className = 'w-6 h-6', style }) => (
  <svg className={className} style={style} fill="none" viewBox="0 0 24 24"
       stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    {d2 && <path strokeLinecap="round" strokeLinejoin="round" d={d2} />}
  </svg>
)
const ICONS = {
  graduate: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  monitor:  'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3',
  truck:    'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
  coffee:   'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
  scale:    'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z',
  globe:    'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
  check:    'M4.5 12.75l6 6 9-13.5',
  pin:      'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
}

/* ── Liquid blob ──────────────────────────────────────── */
function LiquidBlob({ color = COLOR, opacity = 0.1, size = 500, delay = 0, className = '' }) {
  return (
    <motion.div
      className={`absolute pointer-events-none rounded-full ${className}`}
      style={{
        width: size, height: size,
        backgroundColor: color, opacity,
        filter: 'blur(80px)',
        willChange: 'transform',
      }}
      animate={{
        x:     [0,  35, -25,  15,   0],
        y:     [0, -25,  35, -15,   0],
        scale: [1, 1.1, 0.92, 1.04, 1],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

/* ── SVG decorativos ──────────────────────────────────── */
function CirclesPattern({ color = COLOR }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none">
      <defs>
        <pattern id="circles" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" />
          <circle cx="0"  cy="0"  r="4"  fill={color} />
          <circle cx="60" cy="60" r="4"  fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circles)" />
    </svg>
  )
}

function HexPattern({ color = COLOR }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none">
      <defs>
        <pattern id="hex" x="0" y="0" width="50" height="43" patternUnits="userSpaceOnUse">
          <polygon points="25,1 49,13 49,37 25,49 1,37 1,13" fill="none" stroke={color} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  )
}

const TOP_COUNTRIES = [
  { name: 'Honduras',    count: 24047, code: 'HN' },
  { name: 'Nicaragua',   count: 4528,  code: 'NI' },
  { name: 'Guatemala',   count: 4466,  code: 'GT' },
  { name: 'El Salvador', count: 2613,  code: 'SV' },
  { name: 'Panamá',      count: 2116,  code: 'PA' },
  { name: 'Colombia',    count: 1921,  code: 'CO' },
  { name: 'Costa Rica',  count: 1378,  code: 'CR' },
  { name: 'Perú',        count: 696,   code: 'PE' },
  { name: 'Bolivia',     count: 613,   code: 'BO' },
  { name: 'México',      count: 484,   code: 'MX' },
]
const MAX_C = 24047

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7 },
}

export default function JovenesCaficultores() {
  const [activeTab, setActiveTab] = useState('virtual')

  return (
    <div className="page-enter">

      {/* ── HERO ───────────────────────────────────────────── */}
      <ProjectHero
        title="Jóvenes Caficultores"
        subtitle="Iniciativa por los Jóvenes Caficultores"
        description="Mejora la calidad de vida de jóvenes caficultores a través de orientación, capacitación y agro emprendimiento. Evita la migración del país."
        color={COLOR}
        imageSrc="/imagenes/proyectos/jovenes-caficultores/aulaMovil/hero.jpg"
        logo="/imagenes/logos/Logos Generales/LOGO JÓVENES CAFICULTORES POSITIVO.png"
        tag="Educación & Desarrollo"
        collaborators={8}
      />

      {/* ── STAT RIBBON animado ────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 overflow-hidden relative">
        <CirclesPattern />
        <div className="flex gap-0 divide-x divide-gray-100 relative">
          {[
            { v: '+1,600',  label: 'horas en vivo',        icon: ICONS.monitor },
            { v: '63,212',  label: 'personas capacitadas', icon: ICONS.graduate },
            { v: '23',      label: 'países alcanzados',    icon: ICONS.globe },
            { v: '+300 TB', label: 'datos consumidos',     icon: ICONS.monitor },
            { v: '80',      label: 'jóvenes baristas',     icon: ICONS.coffee },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex-1 text-center py-6 px-3 min-w-[140px] group hover:bg-[#F2EDE4] transition-colors duration-200"
            >
              <div className="flex justify-center mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                     style={{ backgroundColor: LIGHT }}>
                  <Icon d={s.icon} className="w-4 h-4" style={{ color: COLOR }} />
                </div>
              </div>
              <p className="text-2xl font-black" style={{ color: COLOR }}>{s.v}</p>
              <p className="text-cafe-light text-xs mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── TABS: Virtual / Aula Móvil ─────────────────────── */}
      <section className="py-24 bg-[#F2EDE4] relative overflow-hidden">
        <LiquidBlob color={COLOR} opacity={0.08} size={600} className="-top-32 -left-32" />
        <LiquidBlob color={MID} opacity={0.06} size={400} delay={4} className="bottom-0 right-0" />
        <HexPattern color={COLOR} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
              Dos modalidades de formación
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-cafe mt-2">
              El programa en acción
            </h2>
          </motion.div>

          {/* Tab buttons */}
          <div className="flex gap-3 justify-center mb-12">
            {[
              { id: 'virtual', label: 'Cursos Virtuales', icon: ICONS.monitor },
              { id: 'aula',    label: 'Aula Móvil',       icon: ICONS.truck },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-white shadow-xl scale-105'
                    : 'bg-white text-cafe hover:bg-gray-50 shadow-sm'
                }`}
                style={activeTab === tab.id ? { backgroundColor: COLOR } : {}}
              >
                <Icon d={tab.icon} className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'virtual' && (
              <motion.div
                key="virtual"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  {/* Datos */}
                  <div>
                    <div className="bg-white rounded-3xl p-8 shadow-md mb-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                             style={{ backgroundColor: LIGHT }}>
                          <Icon d={ICONS.monitor} className="w-6 h-6" style={{ color: COLOR }} />
                        </div>
                        <div>
                          <h3 className="font-black text-cafe text-xl">Plataforma Virtual</h3>
                          <p className="text-cafe-light text-sm">44,373 personas · 23 países</p>
                        </div>
                      </div>
                      {[
                        { label: 'Personas capacitadas',      v: '44,373' },
                        { label: 'Horas de transmisión vivo', v: '+1,600' },
                        { label: 'Datos consumidos',          v: '+300 TB' },
                        { label: 'Países alcanzados',         v: '23' },
                      ].map((row, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                        >
                          <span className="text-cafe-light text-sm">{row.label}</span>
                          <span className="font-black text-cafe text-lg">{row.v}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Género */}
                    <div className="bg-white rounded-3xl p-6 shadow-md">
                      <p className="font-bold text-cafe mb-4 text-sm">Participación por género</p>
                      <div className="space-y-3">
                        {[
                          { label: 'Mujeres jóvenes', pct: 52, v: '12,003' },
                          { label: 'Hombres jóvenes', pct: 48, v: '10,969' },
                        ].map((g, i) => (
                          <div key={i}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-semibold text-cafe">{g.label}</span>
                              <span className="text-sm font-black" style={{ color: i === 0 ? COLOR : '#555' }}>
                                {g.v} — {g.pct}%
                              </span>
                            </div>
                            <div className="h-2.5 rounded-full bg-[#F2EDE4] overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${g.pct}%` }}
                                transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: i === 0 ? COLOR : '#888' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Galería clases virtuales */}
                  <div className="grid grid-cols-3 gap-3">
                    {VIRTUAL.slice(0, 6).map((src, i) => (
                      <motion.div
                        key={i}
                        className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-[#F2EDE4] flex items-center justify-center aspect-square"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.07 }}
                      >
                        <img
                          src={src}
                          alt={`Clase virtual ${i + 1}`}
                          className="w-full h-full object-contain p-2"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'aula' && (
              <motion.div
                key="aula"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  {/* Galería aula móvil */}
                  <div className="space-y-4">
                    {/* Foto principal */}
                    <motion.div
                      className="rounded-3xl overflow-hidden shadow-2xl aspect-video relative"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img src={AULA[0]} alt="Aula Móvil principal"
                           className="w-full h-full object-cover" />
                      <div className="absolute inset-0"
                           style={{ background: `linear-gradient(to top, ${COLOR}99, transparent)` }} />
                      <div className="absolute bottom-5 left-5">
                        <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full border border-white/30">
                          Aula Móvil · Honduras
                        </span>
                      </div>
                    </motion.div>
                    {/* 2 fotos menores */}
                    <div className="grid grid-cols-2 gap-4">
                      {AULA.slice(1).map((src, i) => (
                        <motion.div
                          key={i}
                          className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-[4/3]"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.15 }}
                        >
                          <img src={src} alt={`Aula móvil ${i + 2}`} className="w-full h-full object-cover" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Datos */}
                  <div>
                    <div className="bg-white rounded-3xl p-8 shadow-md mb-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                             style={{ backgroundColor: LIGHT }}>
                          <Icon d={ICONS.truck} className="w-6 h-6" style={{ color: COLOR }} />
                        </div>
                        <div>
                          <h3 className="font-black text-cafe text-xl">Aula Móvil</h3>
                          <p className="text-cafe-light text-sm">Unidad educativa itinerante</p>
                        </div>
                      </div>
                      {[
                        { label: 'Estudiantes capacitados',       v: '18,778' },
                        { label: 'Jóvenes baristas formados',     v: '80' },
                        { label: 'Jóvenes en Derechos Humanos',   v: '61' },
                        { label: 'Total del programa',            v: '63,212', bold: true },
                      ].map((row, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                        >
                          <span className="text-cafe-light text-sm">{row.label}</span>
                          <span className={`font-black text-lg ${row.bold ? '' : 'text-cafe'}`}
                                style={row.bold ? { color: COLOR } : {}}>
                            {row.v}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Módulos */}
                    <div className="bg-white rounded-3xl p-6 shadow-md">
                      <p className="font-bold text-cafe mb-4 text-sm">Módulos del Aula Móvil</p>
                      <div className="space-y-3">
                        {[
                          { icon: ICONS.coffee,   label: 'Barismo profesional',       sub: '80 jóvenes certificados' },
                          { icon: ICONS.scale,    label: 'Derechos Humanos',           sub: '61 jóvenes líderes' },
                          { icon: ICONS.graduate, label: 'Capacitación técnica cafetera', sub: 'Fincas rurales' },
                        ].map((m, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-xl"
                            style={{ backgroundColor: LIGHT }}
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                 style={{ backgroundColor: COLOR }}>
                              <Icon d={m.icon} className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-cafe text-sm">{m.label}</p>
                              <p className="text-cafe-light text-xs">{m.sub}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── ALCANCE POR PAÍS — dark green + imagen de fondo ── */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: COLOR }}>
        {/* SVG wave top */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="#F2EDE4" className="w-full block">
            <path d="M0,40 C240,0 480,60 720,30 C960,0 1200,50 1440,20 L1440,0 L0,0Z" />
          </svg>
        </div>
        <LiquidBlob color="#fff" opacity={0.06} size={500} delay={2} className="-top-20 right-10" />
        <LiquidBlob color={MID} opacity={0.15} size={350} delay={6} className="bottom-10 -left-20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-white/60 text-sm font-bold uppercase tracking-widest">
                Alcance internacional
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-10">
                Personas capacitadas<br />por país
              </h2>

              <div className="space-y-3">
                {TOP_COUNTRIES.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-[10px] font-black w-8 h-5 rounded flex items-center justify-center flex-shrink-0 bg-white/20 text-white">
                      {c.code}
                    </span>
                    <span className="text-white/90 text-sm font-semibold w-28 flex-shrink-0">{c.name}</span>
                    <div className="flex-1 h-2.5 rounded-full bg-white/15 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(c.count / MAX_C) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4 + i * 0.04 }}
                        className="h-full rounded-full bg-white"
                      />
                    </div>
                    <span className="text-white font-black text-sm w-16 text-right">
                      {c.count.toLocaleString('es-HN')}
                    </span>
                  </motion.div>
                ))}
                <p className="text-white/40 text-xs mt-3 pl-12">+ 13 países más (España, USA, Chile, Haití, Argentina, Brasil, Italia, Cuba…)</p>
              </div>
            </motion.div>

            {/* Big stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="flex flex-col gap-5"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-10 border border-white/20 text-center">
                <div>
                  <p className="text-8xl font-black text-white">23</p>
                </div>
                <p className="text-white/80 text-2xl font-bold mt-2">países alcanzados</p>
                <p className="text-white/50 text-sm mt-1">en América Latina y el Caribe</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: '63,212', l: 'Personas capacitadas', icon: ICONS.graduate },
                  { v: '+1,600', l: 'Horas en vivo',        icon: ICONS.monitor },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="bg-white/10 backdrop-blur-sm rounded-3xl p-5 border border-white/15 text-center"
                  >
                    <Icon d={s.icon} className="w-6 h-6 text-white/70 mx-auto mb-2" />
                    <p className="text-3xl font-black text-white">{s.v}</p>
                    <p className="text-white/60 text-xs mt-1">{s.l}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LOGROS 2025 ────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <LiquidBlob color={COLOR} opacity={0.07} size={500} className="-top-20 -right-20" />
        <CirclesPattern color={COLOR} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
              Resultados 2025
            </span>
            <h2 className="text-4xl font-black text-cafe mt-2">Metas cumplidas</h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { pct: '100.83%', label: 'Aula Móvil',         sub: '3,543 / 3,300 personas', color: COLOR },
              { pct: '100%',    label: 'Cursos impartidos',   sub: '15 de 15 cursos',         color: MID },
              { pct: '100.8%',  label: 'Graduados virtuales', sub: '8,168 / 8,100 personas',  color: '#388E3C' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, type: 'spring' }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="relative rounded-3xl overflow-hidden shadow-lg"
              >
                {/* Gradiente de fondo */}
                <div className="h-3" style={{ backgroundColor: s.color }} />
                <div className="bg-white p-8 text-center">
                  <motion.p
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, type: 'spring', bounce: 0.5 }}
                    className="text-5xl font-black mb-3"
                    style={{ color: s.color }}
                  >
                    {s.pct}
                  </motion.p>
                  <p className="font-bold text-cafe text-base">{s.label}</p>
                  <p className="text-cafe-light text-sm mt-1">{s.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METAS 2026 + Metodología ────────────────────────── */}
      <section className="py-24 bg-[#F2EDE4] relative overflow-hidden">
        <HexPattern color={COLOR} />
        <LiquidBlob color={COLOR} opacity={0.08} size={450} delay={3} className="bottom-0 left-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeUp}>
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
                Avance 2026
              </span>
              <h2 className="text-4xl font-black text-cafe mt-2 mb-3">Metas del año en curso</h2>
              <p className="text-cafe-light mb-8 text-sm">*Datos parciales al cierre de mayo 2026</p>
              <div className="space-y-5">
                {[
                  { label: 'Cursos virtuales ejecutados',       current: 6,    total: 12,   pct: 50 },
                  { label: 'Personas capacitadas (virtual)',     current: 3545, total: 6000, pct: 59 },
                  { label: 'Personas capacitadas (Aula Móvil)', current: 1226, total: 2500, pct: 49 },
                  { label: 'Horas de clases impartidas',        current: 32,   total: 139,  pct: 23 },
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-sm"
                  >
                    <ProgressBar label={p.label} percent={p.pct} color={COLOR} />
                    <p className="text-xs text-cafe-light mt-1.5 text-right font-medium">
                      {p.current.toLocaleString('es-HN')} / {p.total.toLocaleString('es-HN')}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Timeline metodología */}
            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }}>
              <h3 className="text-2xl font-black text-cafe mb-8">Metodología del programa</h3>
              <div className="relative">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
                <div className="space-y-5">
                  {[
                    { icon: ICONS.monitor, title: 'Cursos Virtuales',   desc: 'Plataforma digital en 23 países con más de 1,600 horas en vivo y +300 TB consumidos.', img: VIRTUAL[0] },
                    { icon: ICONS.truck,   title: 'Aula Móvil',          desc: 'Unidad educativa itinerante que lleva formación técnica directamente a comunidades rurales.', img: AULA[1] },
                    { icon: ICONS.coffee,  title: 'Barismo',             desc: '80 jóvenes certificados como baristas, abriendo puertas en el sector del café de especialidad.', img: AULA[2] },
                    { icon: ICONS.scale,   title: 'Liderazgo, emprendimiento e innovación en la cadena de valor del café',    desc: '61 jóvenes líderes en gobernanza, emprendimiento e innovación dentro de la cadena de valor del café.', img: VIRTUAL[2] },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 }}
                      className="flex gap-4 relative group"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 shadow-md"
                           style={{ backgroundColor: COLOR }}>
                        <Icon d={step.icon} className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl p-4 flex-1 flex gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex-1">
                          <h4 className="font-black text-cafe mb-1">{step.title}</h4>
                          <p className="text-cafe-light text-sm leading-relaxed">{step.desc}</p>
                        </div>
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white text-center relative overflow-hidden">
        <LiquidBlob color={COLOR} opacity={0.07} size={400} className="-bottom-20 left-1/2 -translate-x-1/2" />
        <motion.div {...fadeUp} className="relative max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black text-cafe mb-4">¿Te gustaría saber más?</h2>
          <p className="text-cafe-light mb-8">
            Explora el resto de nuestros proyectos o contáctanos para más información.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn-primary">← Ver todos los proyectos</Link>
            <Link to="/proyectos/bosques-del-manana" className="btn-dark">Siguiente: Bosques del Mañana →</Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
