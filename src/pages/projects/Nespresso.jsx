import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const COLOR  = '#8B6B3D'   // bronce
const GOLD   = '#C8A96E'   // dorado
const DARK   = '#1A0E08'   // espresso
const BROWN  = '#2C1810'   // café
const SAND   = '#EDE4D8'   // arena
const CREAM  = '#F2EBE0'   // crema
const IVORY  = '#FAF7F2'   // marfil

const Icon = ({ d, className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
)

const ICONS = {
  globe:   'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
  chart:   'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
  star:    'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
  users:   'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
  shield:  'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  pin:     'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
  check:   'M4.5 12.75l6 6 9-13.5',
  water:   'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z',
  droplet: 'M12 2.69l5.66 6.93a8 8 0 11-11.32 0L12 2.69z',
  rain:    'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 00.985-7.37A5.25 5.25 0 0013.5 3H12a5.25 5.25 0 00-5.21 4.558A4.501 4.501 0 002.25 15z',
  chicken: 'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z',
  link:    'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244',
  child:   'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
  recycle: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99',
  map:     'M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z',
}

const EJES = [
  {
    id: 'inclusividad',
    icon: ICONS.globe,
    title: 'Inclusividad',
    color: '#5C7A4E',
    img: '/imagenes/proyectos/nespresso-aaa/espaciosSeguros/Niñez.webp',
    items: [
      { title: 'Diversificación de Ingresos', detail: '32 productoras AAA atendidas en 2025, con ampliación a 45 más para 2026 en Copán y Ocotepeque.' },
      { title: 'Debida Diligencia de DDHH', detail: 'Revisión y adaptación de políticas en toda la cadena de suministro del Clúster COHONDUCAFÉ.' },
      { title: 'Proyecto Cosecha Feliz', detail: 'Prevención de Trabajo Infantil mediante espacios seguros desde 2023. 47 niños atendidos en la cosecha 25–26.' },
      { title: 'Acceso a Agua Potable', detail: 'Entrega de 265 filtros de agua para caficultores y sus trabajadores.' },
      { title: 'Seguro Paramétrico', detail: 'Cobertura a 309 caficultores AAA en floración, llenado de fruto y cosecha.' },
    ],
  },
  {
    id: 'productividad',
    icon: ICONS.chart,
    title: 'Productividad',
    color: COLOR,
    img: '/imagenes/proyectos/nespresso-aaa/AsistenciasTecnicas/AsistenciasTecnicas.webp',
    items: [
      'Nutrición de suelo basado en análisis de laboratorio.',
      'Nutrición del cultivo y manejo de tejidos.',
      'Manejo Integrado de Plagas y Enfermedades.',
      'Fincas Modelo 2026.',
      'Cumplimiento de EUDR dentro del Clúster COHONDUCAFÉ por parte de los productores AAA.',
      'Desarrollo de Evaluaciones TASQ: Regenerativo, Inclusividad, Productividad y Calidad.',
    ],
  },
  {
    id: 'calidad',
    icon: ICONS.star,
    title: 'Calidad',
    color: DARK,
    img: '/imagenes/proyectos/nespresso-aaa/Trazabilidad/Trazabilidad1.webp',
    imgPosition: 'bottom',
    items: [
      'Clasificación de fruto en cosecha — selección en origen',
      'Mejora de proceso de beneficio húmedo',
      'Almacenamiento y conservación óptima',
      'Implementación Trazabilidad Transparente — Open SC',
      'Entrega Premio AAA Cosecha 2024–2025',
    ],
  },
]

const ESPECIALES = [
  {
    icon: ICONS.child,
    title: 'Espacios Seguros',
    detail: '47 niños y niñas atendidos durante la cosecha. 60% niñas y 40% niños. Cooperativas COAEDCAL & APROCASAM periodo 25–26.',
    color: DARK,
    img: '/imagenes/proyectos/nespresso-aaa/espaciosSeguros/Niños2.webp',
  },
  {
    icon: ICONS.chicken,
    title: 'Diversificación de Ingresos',
    detail: '32 productoras con gallinas ponedoras. 97% destinan producción a venta, 23 productoras destinan más del 50% a venta.',
    color: COLOR,
    img: '/imagenes/proyectos/nespresso-aaa/diversificacion/Jaula 4 Gallinas.webp',
  },
  {
    icon: ICONS.rain,
    title: 'Seguro Paramétrico',
    detail: '309 productores AAA atendidos con Seguro Paramétrico, para la cobertura de sus fincas ante riesgos climáticos a lo largo de los estadios del cultivo de café anualmente.',
    color: BROWN,
    img: '/imagenes/proyectos/nespresso-aaa/seguroParametrica/SeguroParametrico.webp',
  },
  {
    icon: ICONS.link,
    title: 'Trazabilidad Open SC',
    detail: 'Sistema de trazabilidad transparente implementado en toda la cadena de valor del clúster COHONDUCAFÉ.',
    color: DARK,
    img: '/imagenes/proyectos/nespresso-aaa/Trazabilidad/Trazabilidad2.webp',
  },
  {
    icon: ICONS.star,
    title: 'Premio AAA',
    detail: 'Entrega de premios e incentivos a productores destacados por calidad y sostenibilidad en el Clúster COHONDUCAFÉ.',
    color: COLOR,
    img: '/imagenes/proyectos/nespresso-aaa/premioso_o_incentivos/EntregaIncentivos.webp',
    imgPosition: '50% 30%',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6 },
}

export default function Nespresso() {
  const [activeEje, setActiveEje] = useState('inclusividad')
  const eje = EJES.find(e => e.id === activeEje)
  const heroImgRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (!heroImgRef.current) return
      heroImgRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="page-enter">
      {/* ── Hero institucional ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: DARK }}>

        {/* Fotografía de fondo, a pantalla completa */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={heroImgRef}
            src="/imagenes/proyectos/nespresso-aaa/Hero_Final.png"
            alt="Clúster Nespresso Cohonducafé"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
            loading="eager"
          />
          {/* Overlay degradado izquierda → derecha en tonos café/bronce */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(105deg, #2A1208 0%, #4A2412 30%, #8B6B3D33 65%, transparent 100%)' }}
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Contenido */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full py-32">
          <div className="max-w-2xl">

            {/* Volver al inicio */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white
                           text-sm font-medium transition-colors duration-200 group"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al inicio
              </Link>
            </motion.div>

            {/* Logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-5 mb-7"
            >
              <img
                src="/imagenes/logos/Logos Generales/LogoAAA_Since2003_White_RGB.webp"
                alt="Programa AAA"
                className="h-16 w-auto object-contain"
              />
              <div className="w-px h-10 bg-white/20" />
              <img
                src="/imagenes/logos/Logos Generales/Nespresso_Monogram_2021_CMYK_White_on_Black-removebg-preview.png"
                alt="Nespresso"
                className="h-10 w-auto object-contain"
              />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <span
                className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-bold
                           uppercase tracking-widest px-4 py-2 rounded-full border border-white/25"
              >
                Programa AAA™
              </span>
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-black text-white leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
            >
              Clúster Nespresso<br />Cohonducafé
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-5 text-xl font-semibold text-white/85"
            >
              Programa de Sostenibilidad y Calidad AAA<sup>TM</sup> de Nespresso
            </motion.p>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-4 text-base text-white/65 leading-relaxed max-w-xl"
            >
              Mediante la implementación del Programa AAA de Nespresso, se desarrollan los ejes
              estratégicos de Inclusividad, Agricultura Regenerativa y Calidad con{' '}
              <strong className="text-white font-bold">421 productores</strong> de los
              departamentos de Copán y Ocotepeque.
            </motion.p>

            {/* Botones CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <span
                className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full
                           shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                style={{ backgroundColor: GOLD, color: DARK }}
              >
                Ver reporte 2026
              </span>
              <a
                href="#ejes"
                className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full
                           border border-white/30 text-white hover:bg-white/10 hover:-translate-y-0.5
                           transition-all duration-200"
              >
                Conocer el programa
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>

            {/* Chips inferiores */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <div className="flex items-center gap-2 text-white/55 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                5 colaboradores
              </div>
              <span className="text-white/30">·</span>
              <div className="flex items-center gap-2 text-white/55 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Reporte 2026
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ── 3 Ejes — tabs ── */}
      <section id="ejes" className="py-24" style={{ backgroundColor: IVORY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
              Estructura del programa
            </span>
            <h2 className="text-4xl font-black text-cafe mt-2">Programa AAA</h2>
          </motion.div>

          {/* Tab selector */}
          <div className="flex gap-3 justify-center flex-wrap mb-10">
            {EJES.map(e => (
              <button
                key={e.id}
                onClick={() => setActiveEje(e.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 ${
                  activeEje === e.id ? 'text-white shadow-lg' : 'text-cafe hover:opacity-80'
                }`}
                style={activeEje === e.id ? { backgroundColor: e.color } : { backgroundColor: SAND }}
              >
                <Icon d={e.icon} className="w-4 h-4" />
                {e.title}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEje}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <div className="rounded-3xl overflow-hidden shadow-lg grid md:grid-cols-2">
                {/* Image column */}
                {eje.img && (
                  <div className="relative overflow-hidden md:order-last" style={{ minHeight: '320px' }}>
                    <img
                      src={eje.img}
                      alt={eje.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ objectPosition: eje.imgPosition || 'center' }}
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 60%, ${eje.color}88)` }} />
                  </div>
                )}

                {/* Text column */}
                <div className="flex flex-col">
                  <div className="p-6 text-white" style={{ backgroundColor: eje.color }}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                        <Icon d={eje.icon} className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-black">Eje {eje.title}</h3>
                    </div>
                  </div>
                  <div className="p-8 flex-1" style={{ backgroundColor: IVORY }}>
                    <ul className="space-y-3">
                      {eje.items.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                               style={{ backgroundColor: `${eje.color}20` }}>
                            <Icon d={ICONS.check} className="w-3 h-3" style={{ color: eje.color }} />
                          </div>
                          {typeof item === 'object' ? (
                            <span className="text-sm leading-snug">
                              <span className="block font-bold text-cafe">{item.title}</span>
                              <span className="block text-cafe-light mt-0.5">{item.detail}</span>
                            </span>
                          ) : (
                            <span className="text-cafe text-sm leading-snug">{item}</span>
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Proyectos especiales — Timeline ── */}
      <section className="py-24" style={{ backgroundColor: CREAM }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-16 text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
              Iniciativas complementarias
            </span>
            <h2 className="text-4xl font-black text-cafe mt-2">Proyectos especiales</h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Línea central — solo visible en md+ */}
            <div
              className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5"
              style={{ backgroundColor: GOLD }}
            />

            <div className="space-y-16">
              {ESPECIALES.map((p, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="relative grid md:grid-cols-2 gap-6 md:gap-0 items-center"
                  >
                    {/* Dot central */}
                    <div
                      className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full z-10 items-center justify-center"
                      style={{ backgroundColor: GOLD, border: `4px solid ${CREAM}` }}
                    />

                    {/* Imagen */}
                    <div className={`${isLeft ? 'md:pr-10' : 'md:order-last md:pl-10'}`}>
                      {p.img ? (
                        <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                          <img
                            src={p.img}
                            alt={p.title}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: p.imgPosition || 'center' }}
                          />
                          <div
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(to top, ${p.color}99 0%, transparent 50%)` }}
                          />
                        </div>
                      ) : (
                        <div
                          className="rounded-2xl aspect-[4/3] flex items-center justify-center"
                          style={{ backgroundColor: `${p.color}15` }}
                        >
                          <Icon d={p.icon} className="w-16 h-16" style={{ color: p.color, opacity: 0.4 }} />
                        </div>
                      )}
                    </div>

                    {/* Texto */}
                    <div className={`${isLeft ? 'md:pl-10' : 'md:pr-10'}`}>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${p.color}15` }}
                      >
                        <Icon d={p.icon} className="w-5 h-5" style={{ color: p.color }} />
                      </div>
                      <h3 className="text-2xl font-black text-cafe mb-3">{p.title}</h3>
                      <p className="text-cafe-light text-sm leading-relaxed">{p.detail}</p>
                      {/* Línea decorativa */}
                      <div className="mt-5 h-1 w-12 rounded-full" style={{ backgroundColor: p.color }} />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filtros de agua callout ── */}
      <section className="relative overflow-hidden py-24" style={{ backgroundColor: DARK }}>
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10" style={{ backgroundColor: GOLD }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: GOLD }}>
              Acceso a agua potable
            </span>
            <div className="flex items-end gap-3 mt-3 mb-4">
              <p className="text-7xl font-black leading-none" style={{ color: GOLD }}>265</p>
              <p className="text-2xl font-bold text-white/90 pb-1">filtros de agua<br />instalados</p>
            </div>
            <p className="text-white/65 text-lg leading-relaxed max-w-md">
              Acceso a agua potable para familias productoras del clúster COHONDUCAFÉ,
              mejorando la salud y calidad de vida de las comunidades.
            </p>
          </motion.div>

          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="/imagenes/proyectos/nespresso-aaa/Filtros de agua/EcoFiltros.webp"
                alt="Filtros de agua instalados"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${DARK}80 0%, transparent 45%)` }}
              />
            </div>

            {/* Badge flotante */}
            <div
              className="absolute -bottom-6 -left-6 w-28 h-28 rounded-2xl shadow-xl flex flex-col items-center justify-center"
              style={{ backgroundColor: GOLD }}
            >
              <Icon d={ICONS.droplet} className="w-7 h-7" style={{ color: DARK }} />
              <span className="mt-1 text-xs font-black uppercase tracking-wide" style={{ color: DARK }}>
                EcoFiltros
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 text-center" style={{ backgroundColor: IVORY }}>
        <motion.div {...fadeUp} className="max-w-2xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn-primary">← Todos los proyectos</Link>
            <Link to="/proyectos/jovenes-caficultores" className="btn-dark">Siguiente: Jóvenes Caficultores →</Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
