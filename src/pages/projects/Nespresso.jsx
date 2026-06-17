import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectHero from '../../components/ProjectHero'
import CounterStat from '../../components/CounterStat'

const COLOR  = '#E65100'
const GOLD   = '#F57F17'
const DARK   = '#BF360C'

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
    color: '#2E7D32',
    img: '/imagenes/proyectos/nespresso-aaa/espaciosSeguros/Niñez.jpg',
    items: [
      'Diversificación de ingresos para productoras (gallinas ponedoras)',
      'Revisión y adaptación de políticas — Debida Diligencia de DDHH',
      'Monitoreo de Trabajo Infantil en toda la cadena',
      'Entrega de 265 filtros de agua — Acceso a agua potable 2025',
      'Espacios Seguros: 47 niños y niñas atendidos (60% niñas)',
    ],
  },
  {
    id: 'productividad',
    icon: ICONS.chart,
    title: 'Productividad',
    color: GOLD,
    img: '/imagenes/proyectos/nespresso-aaa/AsistenciasTecnicas/AsistenciasTecnicas.jpeg',
    items: [
      'Nutrición del suelo con análisis de laboratorio',
      'Nutrición del cultivo y manejo de tejidos',
      'Monitoreo y control de plagas integrado',
      'Fincas Modelo demostrativas 2026',
      'Cumplimiento EUDR-ENVERITAS (normativa europea)',
      'Ciclo TASQ: Regenerativo, Inclusividad, Productividad, Calidad',
    ],
  },
  {
    id: 'calidad',
    icon: ICONS.star,
    title: 'Calidad',
    color: '#C0392B',
    img: '/imagenes/proyectos/nespresso-aaa/Trazabilidad/Trazabilidad1.jpg',
    imgPosition: 'bottom',
    items: [
      'Clasificación de fruto en cosecha — selección en origen',
      'Mejora de proceso de beneficio húmedo',
      'Almacenamiento y conservación óptima',
      'Implementación Trazabilidad Transparente — Open SC',
      'Entrega Premio AAA Cosecha 2024–2025',
      'Proyecto Cosecha Feliz 2025–2026',
    ],
  },
]

const ESPECIALES = [
  {
    icon: ICONS.child,
    title: 'Espacios Seguros',
    detail: '47 niños y niñas atendidos durante la cosecha. 60% niñas y 40% niños. Cooperativas COAEDCAL & APROCASAM periodo 25–26.',
    color: '#0D47A1',
    img: '/imagenes/proyectos/nespresso-aaa/espaciosSeguros/Niños2.jpeg',
  },
  {
    icon: ICONS.chicken,
    title: 'Diversificación de Ingresos',
    detail: '32 productoras con gallinas ponedoras. 97% destinan producción a venta, 23 productoras destinan más del 50% a venta.',
    color: GOLD,
    img: '/imagenes/proyectos/nespresso-aaa/diversificacion/Jaula 4 Gallinas.png',
  },
  {
    icon: ICONS.rain,
    title: 'Seguro Paramétrico',
    detail: '300 productores bajo seguro paramétrico (Fase II). Cobertura ante riesgos climáticos para las cooperativas.',
    color: '#1565C0',
  },
  {
    icon: ICONS.link,
    title: 'Trazabilidad Open SC',
    detail: 'Sistema de trazabilidad transparente implementado en toda la cadena de valor del clúster COHONDUCAFÉ.',
    color: '#1B5E20',
    img: '/imagenes/proyectos/nespresso-aaa/Trazabilidad/Trazabilidad2.jpg',
  },
  {
    icon: ICONS.star,
    title: 'Premios e Incentivos',
    detail: 'Entrega de premios e incentivos a productores destacados por calidad y sostenibilidad en el Clúster COHONDUCAFÉ.',
    color: '#C0392B',
    img: '/imagenes/proyectos/nespresso-aaa/premioso_o_incentivos/EntregaIncentivos.jpg',
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

  return (
    <div className="page-enter">
      <ProjectHero
        title="Nespresso AAA"
        subtitle="Programa de Sostenibilidad y Calidad"
        description="Programa AAA de sostenibilidad en el Clúster COHONDUCAFÉ, con enfoque en inclusividad, productividad y calidad de vida de 421 productores en Copán y Ocotepeque."
        color={COLOR}
        imageSrc="/imagenes/proyectos/nespresso-aaa/Hero_Nespresso.png"
        logo="/imagenes/logos/Logos Generales/LogoAAA_Since2003_White_RGB.png"
        tag="Sostenibilidad AAA"
        collaborators={5}
      />


      {/* ── 3 Ejes — tabs ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
              Estructura del programa
            </span>
            <h2 className="text-4xl font-black text-cafe mt-2">Los 3 ejes del AAA</h2>
            <p className="text-cafe-light mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              El modelo TASQ — Regenerativo, Inclusividad, Productividad y Calidad — articula
              todos los ejes del programa en un ciclo continuo de mejora.
            </p>
          </motion.div>

          {/* Tab selector */}
          <div className="flex gap-3 justify-center flex-wrap mb-10">
            {EJES.map(e => (
              <button
                key={e.id}
                onClick={() => setActiveEje(e.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 ${
                  activeEje === e.id ? 'text-white shadow-lg' : 'bg-[#F2EDE4] text-cafe hover:bg-gray-100'
                }`}
                style={activeEje === e.id ? { backgroundColor: e.color } : {}}
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
                  <div className="bg-white p-8 flex-1">
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
                          <span className="text-cafe text-sm leading-snug">{item}</span>
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
      <section className="py-24 bg-[#F2EDE4]">
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
              style={{ backgroundColor: `${COLOR}30` }}
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
                      className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-[#F2EDE4] z-10 items-center justify-center"
                      style={{ backgroundColor: p.color }}
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
      <section className="relative overflow-hidden" style={{ backgroundColor: COLOR }}>
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="/imagenes/proyectos/nespresso-aaa/Filtros de agua/EcoFiltros.jpeg"
            alt="Filtros de agua"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: `${COLOR}d0` }} />
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-black/10 translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-10 text-white"
          >
            <div className="w-24 h-24 rounded-3xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Icon d={ICONS.water} className="w-12 h-12 text-white" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-6xl font-black mb-2">265</p>
              <p className="text-2xl font-bold text-white/90">filtros de agua instalados</p>
              <p className="text-white/70 text-lg mt-2">
                Acceso a agua potable para familias productoras del clúster COHONDUCAFÉ,
                mejorando la salud y calidad de vida de las comunidades.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#F2EDE4] text-center">
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
