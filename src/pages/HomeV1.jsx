import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CounterStat from '../components/CounterStat'
import ProjectCard from '../components/ProjectCard'

const PROJECTS = [
  {
    name: 'Jóvenes Caficultores',
    slug: 'jovenes-caficultores',
    color: '#2E7D32',
    description: 'Orientación, capacitación y agro emprendimiento para jóvenes. Evita la migración.',
    collaborators: 8,
    imageId: 'coffee1',
    icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  },
  {
    name: 'Bosques del Mañana',
    slug: 'bosques-del-manana',
    color: '#1B5E20',
    description: 'Reforestación con 4M+ árboles en sistemas agroforestales junto al café.',
    collaborators: 57,
    imageId: 'forest1',
    icon: 'M12 3v16m0 0c-2.5 0-5-1.5-7-4m7 4c2.5 0 5-1.5 7-4M5 17c-1-2-1-4 0-6m14 0c1 2 1 4 0 6M8 11c0-2.209 1.791-4 4-4s4 1.791 4 4',
  },
  {
    name: 'RS GOLD — Nescafé',
    slug: 'rs-gold',
    color: '#C0392B',
    description: 'Cadena de suministro de café responsable. Agricultura regenerativa y resiliente.',
    collaborators: 7,
    imageId: 'coffee2',
    icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
  },
  {
    name: 'Derechos Humanos',
    slug: 'derechos-humanos',
    color: '#1565C0',
    description: 'Fortalece derechos humanos y prevención del trabajo infantil en caficultura.',
    collaborators: 1,
    imageId: 'community1',
    icon: 'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z',
  },
  {
    name: 'Incentivo Condicional',
    slug: 'piloto-yoro',
    color: '#E65100',
    description: 'Transición a agricultura regenerativa en los productores más vulnerables de Yoro.',
    collaborators: 3,
    imageId: 'field1',
    icon: 'M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.209-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a1.125 1.125 0 001.307-.419l1.136-1.703a1.125 1.125 0 00.032-1.186 2.988 2.988 0 00-.848-1.024C15.97 4.99 14.02 4.5 12 4.5a7.5 7.5 0 00-5.885 2.69',
  },
  {
    name: 'Nespresso AAA',
    slug: 'nespresso-aaa',
    color: '#F57F17',
    description: 'Sostenibilidad y calidad en el Clúster COHONDUCAFÉ con inclusividad y productividad.',
    collaborators: 5,
    imageId: 'cafe1',
    icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
  },
]

const GLOBAL_STATS = [
  { value: 81,        suffix: '',   label: 'Colaboradores totales' },
  { value: 6,         suffix: '',   label: 'Proyectos activos' },
  { value: 63212,     suffix: '',   label: 'Personas capacitadas' },
  { value: 4010362,   suffix: '',   label: 'Árboles plantados' },
]

function HeroSection() {
  const bgRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px) scale(1.15)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-terracota">

      {/* Parallax background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={bgRef}
          src="https://picsum.photos/seed/coffeehero/1600/900"
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-terracota via-terracota/90 to-[#8B1A1A]" />
      </div>

      {/* Animated blobs */}
      <div className="absolute top-16 right-12 w-96 h-96 bg-white/10 blob-morph" />
      <div className="absolute bottom-24 left-8 w-64 h-64 bg-white/5 blob-morph-2" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-[#8BC34A]/20 blob-morph" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm
                               border border-white/25 text-white text-xs font-bold
                               uppercase tracking-widest px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#8BC34A] animate-pulse" />
                6 Proyectos Activos · 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.0] tracking-tight"
            >
              Proyectos<br/>
              <span className="text-[#F2EDE4]/80">con Nestlé</span><br/>
              <span className="text-[#8BC34A]">2026</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 text-lg sm:text-xl text-white/75 leading-relaxed max-w-lg"
            >
              Fundación COHONDUCAFÉ — Transformando comunidades caficultoras de Honduras
              y Centroamérica con impacto social, ambiental y económico real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a href="#proyectos"
                className="bg-white text-terracota font-bold px-8 py-4 rounded-full
                           hover:bg-[#F2EDE4] transition-all duration-200 shadow-xl
                           hover:shadow-2xl hover:-translate-y-0.5 flex items-center gap-2">
                Conoce nuestros proyectos
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <Link to="/impacto"
                className="border-2 border-white/50 text-white font-bold px-8 py-4 rounded-full
                           hover:bg-white/10 transition-all duration-200 flex items-center gap-2">
                Ver impacto global
              </Link>
            </motion.div>
          </div>

          {/* Right side: quick stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            {GLOBAL_STATS.map((s, i) => (
              <div key={i} className="stat-card">
                <CounterStat
                  value={s.value}
                  suffix={s.suffix}
                  className="text-white"
                />
                <p className="mt-2 text-white/70 text-sm">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="#F2EDE4" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 C360,20 1080,60 1440,10 L1440,80 Z" />
        </svg>
      </div>
    </section>
  )
}

function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section ref={ref} className="py-24 bg-[#F2EDE4] relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
           style={{ backgroundImage: 'radial-gradient(#3E2723 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-terracota font-bold text-sm uppercase tracking-widest">
            Impacto Acumulado
          </span>
          <h2 className="section-title text-cafe mt-2">Números que transforman vidas</h2>
          <p className="section-subtitle text-cafe-light mt-4 mx-auto">
            Resultados reales medidos en comunidades caficultoras de Honduras y Centroamérica.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: 81,      suffix: '+', label: 'Colaboradores',      icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z', color: '#C0392B' },
            { value: 6,       suffix: '',  label: 'Proyectos activos',   icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              color: '#2E7D32' },
            { value: 63212,   suffix: '',  label: 'Personas capacitadas', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',                                                                                                                                                                                                                                                                                                                                                                                         color: '#1565C0' },
            { value: 4010362, suffix: '',  label: 'Árboles plantados',   icon: 'M12 3v16m0 0c-2.5 0-5-1.5-7-4m7 4c2.5 0 5-1.5 7-4M5 17c-1-2-1-4 0-6m14 0c1 2 1 4 0 6M8 11c0-2.209 1.791-4 4-4s4 1.791 4 4',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            color: '#1B5E20' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                   style={{ backgroundColor: `${s.color}15` }}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={s.color} strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </div>
              <CounterStat
                value={s.value}
                suffix={s.suffix}
                className=""
                duration={2200}
              />
              <p className="text-cafe-light text-sm mt-2 font-medium">{s.label}</p>
              <div className="mt-3 h-1 rounded-full mx-auto w-12" style={{ backgroundColor: s.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="proyectos" className="py-24 bg-crema relative overflow-hidden">
      {/* Diagonal top */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="#F2EDE4" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 L1440,60 L0,60 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-terracota font-bold text-sm uppercase tracking-widest">
            Portafolio 2026
          </span>
          <h2 className="section-title text-cafe mt-2">Nuestros 6 proyectos</h2>
          <p className="section-subtitle text-cafe-light mt-4 mx-auto">
            Cada proyecto es una apuesta por el futuro de las comunidades caficultoras
            de Honduras y Centroamérica.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ImpactTeaser() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://picsum.photos/seed/coffeemap/1600/600"
          alt=""
          className="w-full h-full object-cover ken-burns-img"
        />
        <div className="absolute inset-0 bg-[#3E2723]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#8BC34A] font-bold text-sm uppercase tracking-widest">
            Área de influencia
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">
            Presencia en toda Centroamérica
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Honduras, Nicaragua, Guatemala, El Salvador, Panamá, Colombia, Costa Rica,
            Perú, Bolivia, Venezuela, México y más de 23 países en cursos virtuales.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['Honduras', 'Nicaragua', 'Guatemala', 'El Salvador', 'Panamá', 'Colombia', 'Costa Rica', 'Perú', '+15 más'].map(c => (
              <span key={c} className="bg-white/10 backdrop-blur-sm border border-white/20
                                       text-white text-sm font-medium px-4 py-2 rounded-full">
                {c}
              </span>
            ))}
          </div>

          <Link to="/impacto"
            className="inline-flex items-center gap-2 bg-terracota text-white font-bold
                       px-8 py-4 rounded-full hover:bg-terracota-dark transition-all duration-200
                       shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
            Explorar impacto completo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="page-enter">
      <HeroSection />
      <StatsSection />
      <ProjectsSection />
      <ImpactTeaser />
    </div>
  )
}
