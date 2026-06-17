import { motion, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ProjectHero from '../../components/ProjectHero'
import CounterStat from '../../components/CounterStat'

const COLOR = '#1B5E20'
const MID   = '#2E7D32'
const LIGHT = '#4CAF50'

/* ── Imágenes ─────────────────────────────────────────── */
const IMG = {
  hero:   '/imagenes/proyectos/bosques-del-manana/bosques_01.jpg',
  num:    '/imagenes/proyectos/bosques-del-manana/Bosques1.jpg',
  mad:    '/imagenes/proyectos/bosques-del-manana/bosques_02.jpg',
  fru:    '/imagenes/proyectos/bosques-del-manana/bosques_03.jpg',
  cer:    '/imagenes/proyectos/bosques-del-manana/bosques_04.jpg',
  meta:   '/imagenes/proyectos/bosques-del-manana/Bosques2.jpg',
  audit:  '/imagenes/proyectos/bosques-del-manana/bosques_05.jpg',
  fin:    '/imagenes/proyectos/bosques-del-manana/Bosques3.jpg',
  g1:     '/imagenes/proyectos/bosques-del-manana/bosques5.png',
  g2:     '/imagenes/proyectos/bosques-del-manana/bosques6.png',
  g3:     '/imagenes/proyectos/bosques-del-manana/bosques7.png',
}

/* ── Icon helper ──────────────────────────────────────── */
const Icon = ({ d, className = 'w-6 h-6', style }) => (
  <svg className={className} style={style} fill="none" viewBox="0 0 24 24"
       stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
)
const ICONS = {
  tree:    'M12 3v16m0 0c-2.5 0-5-1.5-7-4m7 4c2.5 0 5-1.5 7-4M5 17c-1-2-1-4 0-6m14 0c1 2 1 4 0 6M8 11c0-2.209 1.791-4 4-4s4 1.791 4 4',
  leaf:    'M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.209-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a1.125 1.125 0 001.307-.419l1.136-1.703a1.125 1.125 0 00.032-1.186 2.988 2.988 0 00-.848-1.024C15.97 4.99 14.02 4.5 12 4.5a7.5 7.5 0 00-5.885 2.69',
  map:     'M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z',
  users:   'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
  dollar:  'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  shield:  'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  recycle: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99',
  chart:   'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
}

/* ── Liquid Blob decorativo ───────────────────────────── */
function LiquidBlob({ color = COLOR, opacity = 0.12, size = 500, delay = 0, className = '' }) {
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
        x:      [0,  40, -30,  20,   0],
        y:      [0, -30,  40, -20,   0],
        scale:  [1, 1.12, 0.9, 1.05, 1],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

/* ── SVG Leaf pattern de fondo ────────────────────────── */
function LeafPattern({ color = COLOR }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
         xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="leaves" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <g fill={color}>
            <path d="M20,10 Q30,0 40,10 Q50,20 40,30 Q30,40 20,30 Q10,20 20,10Z" opacity="0.6" />
            <path d="M60,50 Q70,40 80,50 Q90,60 80,70 Q70,80 60,70 Q50,60 60,50Z" opacity="0.4" />
            <circle cx="10" cy="60" r="3" opacity="0.3" />
            <circle cx="70" cy="10" r="2" opacity="0.5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#leaves)" />
    </svg>
  )
}

/* ── SVG Dots grid ────────────────────────────────────── */
function DotsPattern({ color = '#fff' }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none">
      <defs>
        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  )
}

/* ── Wave separator ───────────────────────────────────── */
function WaveDown({ from = '#F2EDE4', to = '#fff' }) {
  return (
    <div className="w-full overflow-hidden leading-none" style={{ backgroundColor: to }}>
      <svg viewBox="0 0 1440 80" fill={from} xmlns="http://www.w3.org/2000/svg" className="w-full block">
        <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,0 L0,0Z" />
      </svg>
    </div>
  )
}

/* ── Floating image card ──────────────────────────────── */
function FloatImg({ src, alt, delay = 0, className = '' }) {
  return (
    <motion.div
      className={`rounded-3xl overflow-hidden shadow-2xl ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      animate={{ y: [0, -8, 0] }}
      // Note: we override with whileInView, so the floating only starts after entry
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7 },
}

const BENEFICIOS = [
  { label: 'Compensación por plantación',    monto: 731794.08,  pct: 20 },
  { label: 'Compensación por mantenimiento', monto: 1413383.68, pct: 38 },
  { label: 'Agroquímicos y MIP',             monto: 1062766.82, pct: 29 },
  { label: 'Compensación por supervivencia', monto: 477452.80,  pct: 13 },
]

export default function BosquesDelManana() {
  const containerRef = useRef(null)

  return (
    <div className="page-enter" ref={containerRef}>

      {/* ── HERO ───────────────────────────────────────────── */}
      <ProjectHero
        title="Bosques del Mañana"
        logo="/imagenes/logos/Logos Generales/LOGO BOSQUES DEL MAÑANA NEGATIVO.png"
        subtitle="Reforestación con sistemas agroforestales"
        description="Más de 4 millones de árboles plantados en sistemas agroforestales junto al café. Generando empleo, ingresos y biodiversidad en Honduras y Panamá."
        color={COLOR}
        imageSrc={IMG.hero}
        tag="Medio Ambiente"
        collaborators={57}
      />

      {/* ── NÚMERO CENTRAL con imagen + liquid ─────────────── */}
      <section className="relative py-32 bg-[#F2EDE4] overflow-hidden">
        <LeafPattern color={COLOR} />
        <LiquidBlob color={COLOR} opacity={0.1} size={600} className="-top-32 -left-32" />
        <LiquidBlob color={LIGHT} opacity={0.08} size={400} delay={3} className="top-20 right-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Número gigante */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: COLOR }}
              >
                Acumulado 2022–2025
              </motion.p>

              <div className="flex items-end gap-2 justify-center lg:justify-start">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, type: 'spring', bounce: 0.3 }}
                  className="text-[100px] md:text-[140px] font-black leading-none"
                  style={{ color: COLOR }}
                >
                  <CounterStat value={4010362} duration={2500} />
                </motion.div>
              </div>

              <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }}>
                <p className="text-3xl font-black text-cafe mt-2">árboles plantados</p>
                <p className="text-cafe-light mt-3 text-lg leading-relaxed">
                  en sistemas agroforestales integrados al cultivo del café
                </p>
              </motion.div>

              {/* Mini stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: ICONS.map,   v: '19,683 ha', l: 'Hectáreas' },
                  { icon: ICONS.users, v: '2,718',     l: 'Productores' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: `${COLOR}15` }}>
                      <Icon d={s.icon} className="w-5 h-5" style={{ color: COLOR }} />
                    </div>
                    <div>
                      <p className="font-black text-cafe text-base">{s.v}</p>
                      <p className="text-cafe-light text-xs">{s.l}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Imagen con blob detrás */}
            <div className="relative flex justify-center">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: COLOR, opacity: 0.15, filter: 'blur(60px)', willChange: 'transform' }}
                animate={{ scale: [1, 1.15, 0.92, 1], rotate: [0, 12, -8, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="relative rounded-[40px] overflow-hidden shadow-2xl w-full max-w-md aspect-[4/5]"
                initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, type: 'spring' }}
              >
                <img src={IMG.num} alt="Bosques" className="w-full h-full object-cover" />
                <div className="absolute inset-0"
                     style={{ background: `linear-gradient(to top, ${COLOR}99 0%, transparent 50%)` }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-black text-xl drop-shadow">5,000,000</p>
                  <p className="text-white/80 text-sm">árboles — meta 2026</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* wave */}
      <WaveDown from="#F2EDE4" to="#fff" />

      {/* ── TIPOS DE ÁRBOLES con fotos ─────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <DotsPattern color={COLOR} />
        <LiquidBlob color={COLOR} opacity={0.06} size={500} delay={1} className="top-0 right-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-16 text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
              Composición de la plantación
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-cafe mt-2">
              Tipos de árboles
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img:   IMG.mad,
                icon:  ICONS.tree,
                label: 'Árboles maderables',
                value: '3,639,139',
                pct:   91,
                desc:  'Especies forestales de alto valor comercial y ecológico integradas en fincas cafetaleras.',
                badge: '91%',
              },
              {
                img:   IMG.fru,
                icon:  ICONS.leaf,
                label: 'Árboles frutales',
                value: '371,223',
                pct:   9,
                desc:  'Diversificación de ingresos y nutrición local con frutales nativos y comerciales.',
                badge: '9%',
              },
              {
                img:   IMG.cer,
                icon:  ICONS.map,
                label: 'Km de cercas vivas',
                value: '3,311 km',
                pct:   null,
                desc:  'Barreras naturales que protegen suelos, retienen agua y aumentan la biodiversidad.',
                badge: 'VIVO',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white border border-gray-100"
              >
                {/* Foto */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0"
                       style={{ background: `linear-gradient(to top, ${COLOR}cc 0%, transparent 60%)` }} />
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <span className="font-black text-sm" style={{ color: COLOR }}>{item.badge}</span>
                  </div>
                  {/* Icon circle */}
                  <div className="absolute bottom-4 left-4 w-10 h-10 rounded-2xl flex items-center justify-center"
                       style={{ backgroundColor: COLOR }}>
                    <Icon d={item.icon} className="w-5 h-5 text-white" />
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <p className="text-xs text-cafe-light font-semibold uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-4xl font-black text-cafe mb-3">{item.value}</p>
                  {item.pct !== null && (
                    <div className="h-2 rounded-full bg-gray-100 mb-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: 0.4 + i * 0.15 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: COLOR }}
                      />
                    </div>
                  )}
                  <p className="text-cafe-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { icon: ICONS.map,    label: 'Hectáreas',     value: '19,683.90' },
              { icon: ICONS.users,  label: 'Productores',   value: '2,718' },
              { icon: ICONS.shield, label: 'Colaboradores', value: '57' },
              { icon: ICONS.recycle, label: 'Meta 2026',    value: '5 M árboles' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08, type: 'spring', bounce: 0.4 }}
                className="rounded-2xl p-5 flex items-center gap-3"
                style={{ backgroundColor: `${COLOR}0e` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                     style={{ backgroundColor: `${COLOR}20` }}>
                  <Icon d={s.icon} className="w-5 h-5" style={{ color: COLOR }} />
                </div>
                <div>
                  <p className="font-black text-cafe text-sm">{s.value}</p>
                  <p className="text-cafe-light text-xs">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METAS 2026 con imagen lateral ──────────────────── */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: COLOR }}>
        {/* SVG wave top */}
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="#fff" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,0 C360,60 1080,0 1440,0 L1440,0 L0,0Z" opacity="0.1" />
            <path d="M0,20 C360,60 1080,0 1440,20 L1440,0 L0,0Z" />
          </svg>
        </div>

        <LiquidBlob color="#fff" opacity={0.06} size={600} delay={2} className="-top-20 -right-20" />
        <LiquidBlob color={LIGHT} opacity={0.1} size={400} delay={5} className="bottom-0 left-10" />
        <DotsPattern color="#fff" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-white/60 text-sm font-bold uppercase tracking-widest">
                Objetivos 2026
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-10">
                Meta: 5 millones de árboles
              </h2>

              <div className="space-y-5">
                {[
                  { label: 'Árboles maderables a plantar', total: 900000 },
                  { label: 'Árboles frutales a plantar',   total: 137864 },
                  { label: 'Total árboles 2026',           total: 1037864 },
                  { label: 'Productores beneficiados',     total: 1000 },
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-white text-sm font-semibold">{p.label}</span>
                      <span className="text-white/60 text-sm font-bold">
                        {p.total.toLocaleString('es-HN')}
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-white/15 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '0%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                        className="h-full rounded-full bg-white/80"
                      />
                    </div>
                    <p className="text-white/40 text-xs mt-1">Año en curso — datos pendientes</p>
                  </motion.div>
                ))}
              </div>

              {/* Beneficios financieros */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-10 bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon d={ICONS.dollar} className="w-5 h-5 text-white/70" />
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest">
                    Beneficios a productores
                  </p>
                </div>
                <p className="text-5xl font-black text-white mb-4">$3,685,397</p>
                <div className="space-y-2">
                  {BENEFICIOS.map((b, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-white/60 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between text-xs text-white/80 mb-1">
                          <span>{b.label}</span>
                          <span className="font-bold">${b.monto.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="h-1 rounded-full bg-white/20 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${b.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                            className="h-full rounded-full bg-white/70"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Imagen lateral */}
            <div className="relative">
              <motion.div
                className="absolute -inset-4 rounded-full"
                style={{ backgroundColor: '#fff', opacity: 0.08, filter: 'blur(50px)', willChange: 'transform' }}
                animate={{ scale: [1, 1.1, 0.93, 1], x: [0, 20, -15, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="relative rounded-[36px] overflow-hidden shadow-2xl aspect-[3/4]"
                initial={{ opacity: 0, x: 60, rotate: 3 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, type: 'spring' }}
              >
                <img src={IMG.meta} alt="Bosques metas" className="w-full h-full object-cover" />
                <div className="absolute inset-0"
                     style={{ background: `linear-gradient(to top, ${COLOR}dd 0%, transparent 50%)` }} />

                {/* Floating badge */}
                <motion.div
                  className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, type: 'spring' }}
                >
                  <p className="text-3xl font-black" style={{ color: COLOR }}>57</p>
                  <p className="text-xs text-cafe-light font-semibold">colaboradores<br />en campo</p>
                </motion.div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex gap-2">
                    {[{ code: 'HN', name: 'Honduras' }, { code: 'PA', name: 'Panamá' }].map(z => (
                      <span key={z.code} className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1.5">
                        <span className="text-[9px] font-black bg-white/30 px-1 py-0.5 rounded">{z.code}</span>
                        {z.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AUDITORÍA DE CARBONO — imagen de fondo full ─────── */}
      <section className="relative py-32 overflow-hidden">
        {/* Imagen de fondo con overlay */}
        <div className="absolute inset-0">
          <img src={IMG.audit} alt="Auditoría" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0"
               style={{ background: `linear-gradient(135deg, ${COLOR}cc 0%, transparent 60%)` }} />
        </div>

        <LiquidBlob color={LIGHT} opacity={0.12} size={500} delay={1} className="top-0 left-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-white/60 text-sm font-bold uppercase tracking-widest">
                Sostenibilidad ambiental
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-6">
                Auditoría de Carbono 2026
              </h2>
              <p className="text-white/80 leading-relaxed mb-8 text-lg">
                El proyecto es auditado externamente para cuantificar la captura de carbono
                de los sistemas agroforestales, alineándose con estándares internacionales
                de descarbonización y agricultura regenerativa.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: ICONS.recycle, label: 'Captura de carbono verificada' },
                  { icon: ICONS.shield,  label: 'Estándares internacionales' },
                  { icon: ICONS.chart,   label: 'Monitoreo y evaluación' },
                  { icon: ICONS.tree,    label: 'Sistemas agroforestales' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                  >
                    <Icon d={s.icon} className="w-5 h-5 flex-shrink-0 text-white" />
                    <span className="text-white text-xs font-semibold leading-tight">{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Carbono Neutro logo card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-10 text-center border border-white/25 shadow-2xl">
                <motion.img
                  src="/imagenes/logos/Logos Generales/LOGO-AI-CARBONO-NEUTRO.png"
                  alt="Carbono Neutro"
                  className="h-28 w-auto mx-auto mb-6 object-contain drop-shadow-xl"
                  style={{ willChange: 'transform' }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <p className="text-7xl font-black text-white mb-2">57</p>
                <p className="text-white/80 text-lg">colaboradores en campo</p>

                <div className="mt-8 grid grid-cols-2 gap-3 text-left">
                  {[
                    { code: 'HN', label: 'Honduras', desc: 'Operaciones principales' },
                    { code: 'PA', label: 'Panamá',   desc: 'Extensión del programa' },
                  ].map(z => (
                    <div key={z.label} className="bg-white/15 rounded-2xl p-4">
                      <span className="inline-block text-xs font-black bg-white/25 text-white px-2 py-1 rounded mb-2">{z.code}</span>
                      <p className="font-black text-white">{z.label}</p>
                      <p className="text-white/60 text-xs mt-0.5">{z.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GALERÍA — imagen final ──────────────────────────── */}
      <section className="py-24 bg-[#F2EDE4] relative overflow-hidden">
        <LiquidBlob color={COLOR} opacity={0.08} size={500} className="-bottom-20 -right-20" />
        <LeafPattern color={COLOR} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
              El programa en imágenes
            </span>
            <h2 className="text-4xl font-black text-cafe mt-2">Galería de campo</h2>
          </motion.div>

          {/* Grid principal */}
          <div className="grid grid-cols-12 gap-4 mb-4">
            {/* Grande izquierda */}
            <motion.div
              className="col-span-12 md:col-span-7 rounded-3xl overflow-hidden shadow-xl aspect-[16/9] relative group"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img src={IMG.fin} alt="Bosques" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ background: `linear-gradient(to top, ${COLOR}99, transparent)` }} />
            </motion.div>

            {/* Columna derecha 2 imgs */}
            <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-4">
              {[IMG.g1, IMG.g2].map((src, i) => (
                <motion.div
                  key={i}
                  className="rounded-3xl overflow-hidden shadow-xl relative group"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.15 }}
                >
                  <img src={src} alt={`Bosques ${i + 2}`}
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" style={{ aspectRatio: '16/7' }} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fila inferior */}
          <div className="grid grid-cols-12 gap-4">
            <motion.div
              className="col-span-12 md:col-span-5 rounded-3xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <img src={IMG.g3} alt="Bosques galería" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>

            {/* Stat card decorativo */}
            <motion.div
              className="col-span-12 md:col-span-7 rounded-3xl p-8 text-white flex items-center gap-8"
              style={{ background: `linear-gradient(135deg, ${COLOR}, ${LIGHT})` }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="flex-1">
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-2">Hito 2026</p>
                <p className="text-6xl font-black mb-1">5M</p>
                <p className="text-white/80 text-lg">árboles — meta acumulada</p>
              </div>
              {/* SVG árbol decorativo */}
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-25 flex-shrink-0">
                <path d="M60 10 L90 70 H70 L80 110 H40 L50 70 H30 Z" fill="white" />
                <path d="M60 25 L85 75 H65 L73 110 H47 L55 75 H35 Z" fill="white" opacity="0.6" />
                <path d="M60 40 L80 80 H40 Z" fill="white" opacity="0.4" />
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white text-center relative overflow-hidden">
        <LiquidBlob color={COLOR} opacity={0.06} size={400} className="-bottom-20 left-1/2 -translate-x-1/2" />
        <motion.div {...fadeUp} className="relative max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black text-cafe mb-4">Conoce otros proyectos</h2>
          <p className="text-cafe-light mb-8">Cada programa transforma vidas en las comunidades caficultoras de Honduras.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn-primary">← Todos los proyectos</Link>
            <Link to="/proyectos/rs-gold" className="btn-dark">Siguiente: RS GOLD →</Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
