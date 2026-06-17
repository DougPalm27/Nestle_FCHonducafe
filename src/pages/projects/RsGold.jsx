import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProjectHero from '../../components/ProjectHero'
import CounterStat from '../../components/CounterStat'

const COLOR = '#B71C1C'
const ACCENT = '#E53935'

const Icon = ({ d, className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
)

const ICONS = {
  family:   'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
  chart:    'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
  recycle:  'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99',
  coffee:   'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .28 2.716-1.103 2.716H4.9c-1.383 0-2.103-1.716-1.103-2.716L5 14.5',
  shield:   'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  pin:      'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
  globe:    'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
  beaker:   'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .28 2.716-1.103 2.716H4.9c-1.383 0-2.103-1.716-1.103-2.716L5 14.5',
  check:    'M4.5 12.75l6 6 9-13.5',
  clock:    'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
  dollar:   'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
}

const METAS = [
  { label: 'Entrega de incentivos',                          pct: 100, done: true  },
  { label: 'Actualización anual de unidades 4C',             pct: 100, done: true  },
  { label: '1,620 fincas georeferenciadas',                  pct: 100, done: true  },
  { label: 'Capacitar 1,620 productores',                    pct: 35,  done: false },
  { label: 'Proveer 8,000 ton de café verde/año',            pct: 19,  done: false },
  { label: 'Manejo nutricional basado en análisis de suelo', pct: 0,   done: false },
  { label: 'Descarbonización y Ag. Regenerativa (M&E 2025)', pct: 0,   done: false },
]

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6 },
}

export default function RsGold() {
  return (
    <div className="page-enter">
      <ProjectHero
        title="GHG, Agricultura Regenerativa y Proyectos de Captura de Carbono Unidad RS Gold"
        subtitle="Nescafé Responsible Sourced Gold"
        description="Garantiza a la cadena de suministro RS Gold, café responsable bajo agricultura regenerativa y resiliente. 1,620 caficultores hacia la sostenibilidad certificada."
        color={COLOR}
        imageSrc="/imagenes/proyectos/rs-gold/hero.png"
        tag="Cadena de Suministro"
        collaborators={7}
      />

      {/* ── KPI Dashboard ── */}
      <section className="py-24 bg-[#F2EDE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
              Indicadores clave del proyecto
            </span>
            <h2 className="text-4xl font-black text-cafe mt-2">Impacto en la cadena</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: ICONS.family, value: 1620,  suffix: '',  label: 'Familias productoras',          sub: 'en la cadena 4C RS-GOLD' },
              { icon: ICONS.chart,  value: 30,    suffix: '%', label: 'Meta aumento productividad',    sub: 'en fincas para 2028' },
              { icon: ICONS.recycle,value: 17152, suffix: '',  label: 'TCO₂e a reducir',               sub: 'emisiones de carbono' },
              { icon: ICONS.coffee, value: 8000,  suffix: '',  label: 'Ton café verde/año',             sub: 'meta de producción' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                     style={{ backgroundColor: `${COLOR}12` }}>
                  <Icon d={s.icon} className="w-5 h-5" style={{ color: COLOR }} />
                </div>
                <CounterStat value={s.value} suffix={s.suffix} className="text-cafe" duration={2000} />
                <p className="text-cafe font-semibold text-sm mt-1">{s.label}</p>
                <p className="text-cafe-light text-xs mt-0.5">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Área de influencia ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
                Cobertura geográfica
              </span>
              <h2 className="text-4xl font-black text-cafe mt-2 mb-3">Departamentos de influencia</h2>
              <p className="text-cafe-light mb-8 leading-relaxed">
                El programa opera en los principales departamentos cafeteros de Honduras,
                cubriendo a 1,620 familias productoras integradas en la cadena RS GOLD.
              </p>

              <div className="space-y-3">
                {['Copán', 'Lempira', 'Comayagua', 'Yoro', 'Santa Bárbara'].map((d, i) => (
                  <motion.div
                    key={d}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 bg-[#F2EDE4] rounded-2xl px-5 py-3.5"
                  >
                    <Icon d={ICONS.pin} className="w-5 h-5 flex-shrink-0" style={{ color: COLOR }} />
                    <span className="font-semibold text-cafe">{d}</span>
                    <div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: COLOR }} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certification cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              {[
                {
                  icon: ICONS.shield,
                  title: 'Certificación 4C',
                  desc: 'Código Común de la Comunidad Cafetera — estándar base de sostenibilidad para caficultura responsable.',
                },
                {
                  icon: ICONS.recycle,
                  title: 'Agricultura Regenerativa',
                  desc: 'Prácticas que restauran la salud del suelo, aumentan la biodiversidad y reducen 17,152 TCO₂e de emisiones.',
                },
                {
                  icon: ICONS.globe,
                  title: 'Trazabilidad completa',
                  desc: '1,620 fincas georeferenciadas para garantizar transparencia total en la cadena de suministro de Nestlé.',
                },
              ].map((c, i) => (
                <div key={i}
                     className="flex gap-4 bg-[#F2EDE4] rounded-2xl p-5 border-l-4"
                     style={{ borderColor: COLOR }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ backgroundColor: `${COLOR}15` }}>
                    <Icon d={c.icon} className="w-5 h-5" style={{ color: COLOR }} />
                  </div>
                  <div>
                    <p className="font-black text-cafe">{c.title}</p>
                    <p className="text-cafe-light text-sm mt-0.5 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Metas y cumplimiento ── */}
      <section className="py-24 bg-[#F2EDE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
              Avance 2026
            </span>
            <h2 className="text-4xl font-black text-cafe mt-2">Cumplimiento de metas</h2>
          </motion.div>

          <div className="space-y-3 max-w-3xl">
            {METAS.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl p-5 flex items-center gap-5"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  m.done ? 'text-white' : 'bg-gray-100'
                }`} style={m.done ? { backgroundColor: COLOR } : {}}>
                  {m.done
                    ? <Icon d={ICONS.check} className="w-4 h-4 text-white" />
                    : <Icon d={ICONS.clock} className="w-4 h-4 text-cafe-light" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-cafe text-sm font-semibold truncate">{m.label}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: COLOR }}
                    />
                  </div>
                </div>
                <span className="font-black text-lg flex-shrink-0" style={{ color: m.done ? COLOR : '#9E9E9E' }}>
                  {m.pct}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MLT — Variedades de café ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeUp}>
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
                Investigación & Innovación
              </span>
              <h2 className="text-4xl font-black text-cafe mt-2 mb-4">
                Variedades MLT
              </h2>
              <p className="text-cafe-light leading-relaxed mb-6">
                El Proyecto de Evaluación de Variedades de Café — <strong>Multi-Location Trials</strong> —
                es un esfuerzo conjunto entre Nestlé y Fundación COHONDUCAFÉ para generar información
                confiable sobre nuevos híbridos de café bajo condiciones reales de producción en Honduras.
              </p>
              <div className="space-y-4">
                {[
                  { icon: ICONS.beaker, label: 'Caracterizar el crecimiento vegetativo de los materiales' },
                  { icon: ICONS.shield, label: 'Evaluar tolerancia a las principales enfermedades' },
                  { icon: ICONS.chart,  label: 'Registrar respuesta productiva durante todo el ciclo' },
                  { icon: ICONS.globe,  label: 'Analizar adaptación y estabilidad según la altitud' },
                ].map((obj, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                         style={{ backgroundColor: `${COLOR}12` }}>
                      <Icon d={obj.icon} className="w-4 h-4" style={{ color: COLOR }} />
                    </div>
                    <p className="text-cafe text-sm leading-relaxed pt-1">{obj.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Galería MLT */}
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="rounded-2xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={`/imagenes/proyectos/rs-gold/Variedades_MLT_${n}.png`}
                      alt={`Variedad MLT ${n}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>

              <div className="rounded-3xl p-8 text-white"
                   style={{ background: `linear-gradient(135deg, ${COLOR}, ${ACCENT})` }}>
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-6">
                  Pilares RS GOLD
                </p>
                <div className="space-y-6">
                  {[
                    { icon: ICONS.recycle, title: 'Agricultura Regenerativa', desc: 'Restauración del suelo, biodiversidad y reducción de emisiones de carbono.' },
                    { icon: ICONS.globe,   title: 'Trazabilidad',              desc: '1,620 fincas georeferenciadas con transparencia total en la cadena.' },
                    { icon: ICONS.dollar,  title: 'Incentivos condicionales',  desc: 'Recompensa el cumplimiento de buenas prácticas agrícolas y 4C.' },
                    { icon: ICONS.shield,  title: 'Evaluación de riesgos',     desc: 'Trabajo infantil, derechos humanos e inclusión social auditados.' },
                  ].map((p, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Icon d={p.icon} className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-black text-sm">{p.title}</p>
                        <p className="text-white/70 text-xs mt-0.5 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#F2EDE4] text-center">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn-primary">← Todos los proyectos</Link>
            <Link to="/proyectos/derechos-humanos" className="btn-dark">Siguiente: Derechos Humanos →</Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
