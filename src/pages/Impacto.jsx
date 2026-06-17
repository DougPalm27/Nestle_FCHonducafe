import { motion } from 'framer-motion'
import CounterStat from '../components/CounterStat'
import ProgressBar from '../components/ProgressBar'
import ImpactoMapa from '../components/ImpactoMapa'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
}

export default function Impacto() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-[#1B5E20]">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://picsum.photos/seed/impactohero/1600/700" alt=""
               className="w-full h-full object-cover ken-burns-img opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20] via-[#1B5E20]/80 to-transparent" />
        </div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 blob-morph" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-40 w-full">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-white/20 border border-white/30 text-white text-xs font-bold
                       uppercase tracking-widest px-4 py-2 rounded-full mb-4"
          >
            Reporte de impacto 2026
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight"
          >
            Impacto Global
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 text-white/75 text-xl max-w-2xl"
          >
            Resultados concretos que transforman comunidades caficultoras
            de Honduras y toda Centroamérica.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="#F2EDE4" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 L1440,0 L1440,60 Z" />
          </svg>
        </div>
      </section>

      {/* Global numbers */}
      <section className="py-24 bg-[#F2EDE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-cafe">Nuestro impacto en cifras</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 81,        label: 'Colaboradores',        icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z', color: '#C0392B' },
              { value: 6,         label: 'Proyectos activos',    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    color: '#2E7D32' },
              { value: 63212,     label: 'Personas capacitadas', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',                                                                                                                                                                                                                                                                                                                                                                                                 color: '#1565C0' },
              { value: 4010362,   label: 'Árboles plantados',    icon: 'M12 3v16m0 0c-2.5 0-5-1.5-7-4m7 4c2.5 0 5-1.5 7-4M5 17c-1-2-1-4 0-6m14 0c1 2 1 4 0 6M8 11c0-2.209 1.791-4 4-4s4 1.791 4 4',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                color: '#1B5E20' },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-md text-center hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                     style={{ backgroundColor: `${s.color}15` }}>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke={s.color} strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </div>
                <CounterStat value={s.value} className="text-cafe" duration={2000} />
                <p className="text-cafe-light text-sm mt-2">{s.label}</p>
                <div className="mt-3 h-1 w-12 rounded-full mx-auto" style={{ backgroundColor: s.color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* By project */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="text-4xl font-black text-cafe">Impacto por proyecto</h2>
          </motion.div>
          <div className="space-y-4">
            {[
              { name: 'Jóvenes Caficultores',   people: 63212,  trees: 0,       color: '#2E7D32', colabs: 6 },
              { name: 'Bosques del Mañana',      people: 2718,   trees: 4010362, color: '#1B5E20', colabs: 57 },
              { name: 'RS GOLD',                 people: 1620,   trees: 0,       color: '#C0392B', colabs: 7 },
              { name: 'Derechos Humanos',        people: 450,    trees: 0,       color: '#1565C0', colabs: 1 },
              { name: 'Incentivo Condicional',   people: 355,    trees: 0,       color: '#E65100', colabs: 3 },
              { name: 'Nespresso AAA',           people: 421,    trees: 0,       color: '#F57F17', colabs: 5 },
            ].map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-[#F2EDE4] rounded-2xl p-5 flex items-center gap-5"
              >
                <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-cafe truncate">{p.name}</p>
                </div>
                <div className="flex items-center gap-8 text-right flex-shrink-0">
                  <div>
                    <p className="font-black text-cafe">{p.people.toLocaleString('es-HN')}</p>
                    <p className="text-xs text-cafe-light">personas capacitadas</p>
                  </div>
                  {p.trees > 0 && (
                    <div>
                      <p className="font-black text-cafe">{p.trees.toLocaleString('es-HN')}</p>
                      <p className="text-xs text-cafe-light">árboles</p>
                    </div>
                  )}
                  <div>
                    <p className="font-black" style={{ color: p.color }}>{p.colabs}</p>
                    <p className="text-xs text-cafe-light">colabs.</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries — interactive map */}
      <section className="py-24 bg-[#F2EDE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-4xl font-black text-cafe mb-4">Presencia en Centroamérica y más</h2>
            <p className="text-cafe-light text-lg">
              23 países alcanzan los cursos virtuales del programa
            </p>
          </motion.div>
          <motion.div {...fadeUp}>
            <ImpactoMapa />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
