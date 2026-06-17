import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProjectHero from '../../components/ProjectHero'
import CounterStat from '../../components/CounterStat'

const COLOR  = '#E65100'
const ACCENT = '#BF360C'

const Icon = ({ d, className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
)

const ICONS = {
  family:  'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
  map:     'M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z',
  scale:   'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z',
  water:   'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z',
  bee:     'M12 3.75a.75.75 0 01.75.75v.75h.75a.75.75 0 010 1.5h-.75v.75a.75.75 0 01-1.5 0v-.75h-.75a.75.75 0 010-1.5h.75v-.75A.75.75 0 0112 3.75z M3 12a9 9 0 1118 0 9 9 0 01-18 0z M9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z',
  leaf:    'M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.209-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a1.125 1.125 0 001.307-.419l1.136-1.703a1.125 1.125 0 00.032-1.186 2.988 2.988 0 00-.848-1.024C15.97 4.99 14.02 4.5 12 4.5a7.5 7.5 0 00-5.885 2.69',
  check:   'M4.5 12.75l6 6 9-13.5',
  recycle: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99',
  pin:     'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
  sparkle: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z',
}

const METAS = [
  { label: '80% productores con nivel avanzado en Ag. Regenerativa (FAT)', pct: 100, done: true },
  { label: '80% productores con acopio desde inicio del año',               pct: 100, done: true },
  { label: '355 productores con asistencia técnica personalizada',           pct: 28,  done: false },
  { label: '80% productores con manejo nutricional (análisis de suelo)',     pct: 0,   done: false },
]

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6 },
}

export default function IncentivoCondicional() {
  return (
    <div className="page-enter">
      <ProjectHero
        title="Incentivo Condicional"
        subtitle="Acelerando la Agricultura Regenerativa"
        description="Incentivo condicional para la transición de agricultura convencional a prácticas regenerativas en productores más vulnerables de Yoro, Honduras."
        color={COLOR}
        imageSrc="/imagenes/proyectos/incentivo-condicional/hero.webp"
        tag="Agricultura Regenerativa"
        collaborators={3}
      />


      {/* ── Cifras del piloto ── */}
      <section className="py-24 bg-[#F2EDE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-16">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
              El piloto en números
            </span>
            <h2 className="text-4xl font-black text-cafe mt-2">Datos clave de Yoro</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: ICONS.family, value: 355,  label: 'Familias productoras', sub: 'en el piloto Yoro' },
              { icon: ICONS.map,    value: 690,  label: 'Hectáreas cultivadas', sub: 'con café' },
              { icon: ICONS.scale,  value: 1074, label: 'Toneladas métricas',   sub: 'potencial de producción' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                     style={{ backgroundColor: `${COLOR}15` }}>
                  <Icon d={s.icon} className="w-6 h-6" style={{ color: COLOR }} />
                </div>
                <CounterStat value={s.value} className="text-cafe" duration={1800} />
                <p className="font-semibold text-cafe text-sm mt-1">{s.label}</p>
                <p className="text-cafe-light text-xs mt-0.5">{s.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Municipios */}
          <motion.div {...fadeUp}>
            <div className="bg-white rounded-2xl p-6 flex flex-wrap items-center gap-4">
              <Icon d={ICONS.pin} className="w-5 h-5 flex-shrink-0" style={{ color: COLOR }} />
              <p className="font-bold text-cafe text-sm">Área de influencia:</p>
              {['Victoria', 'Yoro', 'Yorito'].map(m => (
                <span key={m} className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                      style={{ borderColor: COLOR, color: COLOR }}>
                  {m}
                </span>
              ))}
              <p className="text-cafe-light text-xs ml-auto italic max-w-xs text-right">
                "Acelerando la transición de agricultura convencional a agricultura regenerativa y resiliente"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Metas 2026 ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: COLOR }}>
              Avance 2026
            </span>
            <h2 className="text-4xl font-black text-cafe mt-2">Cumplimiento de metas</h2>
          </motion.div>

          <div className="max-w-2xl space-y-4">
            {METAS.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-[#F2EDE4] rounded-2xl p-5"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  m.done ? 'text-white' : 'bg-white'
                }`} style={m.done ? { backgroundColor: COLOR } : { border: `2px solid ${COLOR}40` }}>
                  <Icon d={ICONS.check} className={`w-4 h-4 ${m.done ? 'text-white' : 'text-transparent'}`} />
                </div>
                <div className="flex-1">
                  <p className="text-cafe text-sm font-semibold mb-2">{m.label}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-white overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: COLOR }}
                      />
                    </div>
                    <span className="text-sm font-black flex-shrink-0" style={{ color: m.done ? COLOR : '#9E9E9E' }}>
                      {m.pct}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ecolluvía ── */}
      <section className="py-24 bg-[#F2EDE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <div className="mb-4">
                <img src="/imagenes/logos/Logos Generales/LOGO ECOLLUVIA COLOR.png"
                     alt="Ecolluvía" className="h-20 w-auto object-contain drop-shadow-sm" />
              </div>
              <h2 className="text-4xl font-black text-cafe mb-4">Sistema Ecolluvía</h2>
              <p className="text-cafe-light leading-relaxed mb-6">
                Proyecto para elevar la calidad de vida de los productores mediante la instalación
                de sistemas de captura y aprovechamiento de agua de lluvia para diversas aplicaciones
                agrícolas y domésticas.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { value: '28',       label: 'Unidades recolectoras instaladas',  sub: '25 en Yoro · 3 en Comayagua' },
                  { value: '+223,400', label: 'Galones recolectados por año',       sub: 'por las 28 unidades' },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
                    <p className="text-3xl font-black mb-1" style={{ color: COLOR }}>{s.value}</p>
                    <p className="text-cafe font-semibold text-sm">{s.label}</p>
                    <p className="text-cafe-light text-xs mt-0.5">{s.sub}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <p className="text-cafe font-bold text-sm mb-3">Próximos pasos</p>
                <ul className="space-y-2">
                  {[
                    'Seguimiento técnico para asegurar funcionalidad',
                    'Expansión a más productores del área',
                    'Monitoreo de impacto en productividad',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                           style={{ backgroundColor: `${COLOR}20` }}>
                        <Icon d={ICONS.check} className="w-2.5 h-2.5" style={{ color: COLOR }} />
                      </div>
                      <span className="text-cafe-light text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              {/* Ambas imágenes lado a lado respetando proporciones reales */}
              <div className="grid grid-cols-2 gap-3 items-start">
                {/* Ecolluvia.png ≈ cuadrada 1:1 */}
                <div className="rounded-2xl overflow-hidden aspect-square shadow-md">
                  <img
                    src="/imagenes/proyectos/incentivo-condicional/Ecolluvia.webp"
                    alt="Sistema Ecolluvía"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Ecolluvia_2.png ≈ retrato 5:6 */}
                <div className="rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: '5/6' }}>
                  <img
                    src="/imagenes/proyectos/incentivo-condicional/Ecolluvia_2.webp"
                    alt="Sistema Ecolluvía instalación"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Estadísticas */}
              <div className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center">
                <div className="text-center flex-1">
                  <p className="text-2xl font-black" style={{ color: COLOR }}>25</p>
                  <p className="text-cafe-light text-xs mt-0.5">unidades en Yoro</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="text-center flex-1">
                  <p className="text-2xl font-black" style={{ color: COLOR }}>3</p>
                  <p className="text-cafe-light text-xs mt-0.5">unidades en Comayagua</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="text-center flex-1">
                  <p className="text-2xl font-black" style={{ color: COLOR }}>28</p>
                  <p className="text-cafe-light text-xs mt-0.5">total instaladas</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Apicultura ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Encabezado */}
          <motion.div {...fadeUp} className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black text-cafe">Apicultura Sostenible</h2>
                <p className="text-cafe-light mt-2 max-w-xl leading-relaxed">
                  Protección de las abejas <em>Apis mellifera</em> amenazadas por agroquímicos,
                  diversificando ingresos y mejorando la polinización del café.
                </p>
              </div>
              <img
                src="/imagenes/logos/Logos Generales/LOGOS GENERAL APICULTURA.png"
                alt="Apicultura"
                className="h-16 w-auto object-contain flex-shrink-0 self-center sm:self-end"
              />
            </div>
          </motion.div>

          {/* Estadísticas */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { v: '47',    label: 'Colmenas activas',              icon: ICONS.bee },
              { v: '826',   label: 'Botellas de miel producidas',   icon: ICONS.leaf },
              { v: '+102%', label: 'Incremento en cosecha 2024 vs 2023', icon: ICONS.sparkle },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-6 text-center"
                style={{ backgroundColor: `${COLOR}${i === 0 ? 'EE' : i === 1 ? '99' : '55'}` }}
              >
                <Icon d={s.icon} className="w-6 h-6 mx-auto mb-3 text-white" />
                <p className="text-3xl sm:text-4xl font-black text-white">{s.v}</p>
                <p className="text-white/80 text-xs mt-1 leading-tight">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Galería + info */}
          <div className="grid lg:grid-cols-5 gap-6">

            {/* Galería — ocupa 3 columnas */}
            <motion.div
              className="lg:col-span-3 flex flex-col gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Fila superior: 01 y 02 son retrato 3:4 — lado a lado */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <img src="/imagenes/proyectos/incentivo-condicional/apicultura_01.webp"
                       alt="Apicultura 1"
                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <img src="/imagenes/proyectos/incentivo-condicional/apicultura_02.webp"
                       alt="Apicultura 2"
                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              {/* Fila inferior: 03 cuadrada + 04 paisaje 3:2 */}
              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-2 rounded-2xl overflow-hidden aspect-square">
                  <img src="/imagenes/proyectos/incentivo-condicional/apicultura_03.webp"
                       alt="Apicultura 3"
                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="col-span-3 rounded-2xl overflow-hidden" style={{ aspectRatio: '3/2' }}>
                  <img src="/imagenes/proyectos/incentivo-condicional/apicultura_04.webp"
                       alt="Apicultura 4"
                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </motion.div>

            {/* Info — ocupa 2 columnas */}
            <motion.div {...fadeUp} className="lg:col-span-2 flex flex-col gap-4">

              <div className="bg-[#F2EDE4] rounded-2xl p-6 flex-1">
                <p className="font-bold text-cafe text-sm mb-4 flex items-center gap-2">
                  <Icon d={ICONS.check} className="w-4 h-4" style={{ color: COLOR }} />
                  Metas del proyecto
                </p>
                <ul className="space-y-3">
                  {[
                    '40 colmenas entregadas a 9 productores',
                    'Seguimiento técnico calendarizado 2023–2024',
                    'Recopilación de datos de cosecha',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: COLOR }} />
                      <span className="text-cafe-light text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F2EDE4] rounded-2xl p-6 flex-1">
                <p className="font-bold text-cafe text-sm mb-4 flex items-center gap-2">
                  <Icon d={ICONS.sparkle} className="w-4 h-4" style={{ color: COLOR }} />
                  Innovación en desarrollo
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {['Propóleo', 'Polen', 'Reinas', 'Subproductos'].map((item, i) => (
                    <div key={i} className="bg-white rounded-xl px-3 py-2.5 text-center">
                      <span className="text-cafe text-sm font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5 border-2" style={{ borderColor: `${COLOR}30` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COLOR }}>
                  Área de influencia
                </p>
                <div className="flex gap-2 flex-wrap">
                  {['Santa Bárbara', 'Comayagua'].map(z => (
                    <span key={z} className="text-sm font-semibold px-4 py-2 rounded-full text-white"
                          style={{ backgroundColor: COLOR }}>
                      {z}
                    </span>
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
            <Link to="/proyectos/nespresso-aaa" className="btn-dark">Siguiente: Nespresso AAA →</Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
