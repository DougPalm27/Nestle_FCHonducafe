import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
}

const I = {
  building:  'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z',
  graduate:  'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  tree:      'M12 3v16m0 0c-2.5 0-5-1.5-7-4m7 4c2.5 0 5-1.5 7-4M5 17c-1-2-1-4 0-6m14 0c1 2 1 4 0 6M8 11c0-2.209 1.791-4 4-4s4 1.791 4 4',
  coffee:    'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
  scale:     'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z',
  leaf:      'M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.209-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a1.125 1.125 0 001.307-.419l1.136-1.703a1.125 1.125 0 00.032-1.186 2.988 2.988 0 00-.848-1.024C15.97 4.99 14.02 4.5 12 4.5a7.5 7.5 0 00-5.885 2.69',
  star:      'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
}

const HERO_PHOTOS = [
  '/imagenes/proyectos/bosques-del-manana/bosques_01.webp',
  '/imagenes/proyectos/jovenes-caficultores/aulaMovil/galeria-01.webp',
  '/imagenes/proyectos/rs-gold/hero.webp',
  '/imagenes/proyectos/incentivo-condicional/apicultura_01.webp',
  '/imagenes/proyectos/derechos-humanos/_EAA4513.webp',
  '/imagenes/proyectos/nespresso-aaa/AsistenciasTecnicas/AsistenciasTecnicas.webp',
]

const AREAS_BASE = [
  { key: 'ghg',                  color: '#C0392B', icon: I.coffee,   colabs: 7 },
  { key: 'pilotoYoro',           color: '#E65100', icon: I.leaf,     colabs: 3 },
  { key: 'jovenesCaficultores',  color: '#2E7D32', icon: I.graduate, colabs: 5 },
  { key: 'recursosHumanos',      color: '#5D4037', icon: I.building, colabs: null },
  { key: 'bosquesDelManana',     color: '#1B5E20', icon: I.tree,     colabs: 60 },
  { key: 'derechosHumanos',      color: '#1565C0', icon: I.scale,    colabs: 1 },
  { key: 'nespresso',            color: '#F57F17', icon: I.star,     colabs: 5 },
]

/* Nodo principal del organigrama: colapsado solo muestra el nombre; al hacer click despliega los roles */
function OrgNode({ area, t, expanded, onToggle }) {
  const flat = area.groups.length === 1 && !area.groups[0].title

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white border-2 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300
                 w-[210px] text-left overflow-hidden"
      style={{ borderColor: area.color }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-2.5 px-4 py-3 cursor-pointer"
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
             style={{ backgroundColor: area.color }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d={area.icon} />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-black text-cafe text-sm leading-snug">{area.area}</h3>
          {area.colabs && (
            <p className="text-cafe-light text-[11px] mt-0.5">{area.colabs} {t('colaboradoresLabel')}</p>
          )}
        </div>
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke={area.color} strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Si el área no tiene subgrupos, los roles van directo en el nodo (solo si está expandido) */}
      <AnimatePresence>
        {flat && expanded && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="px-4 pb-3 space-y-1 border-t pt-2 mx-4 border-cafe/10 overflow-hidden"
          >
            {area.groups[0].items.map(item => (
              <li key={item} className="flex items-start gap-1.5">
                <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: area.color }} />
                <span className="text-cafe-light text-[11px] leading-snug">{item}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* Sub-nodo de un grupo (Área Técnica, Apoyo compartido, etc.) */
function OrgSubNode({ group, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-[#F2EDE4] border rounded-xl px-3.5 py-2.5 w-[180px] text-left"
      style={{ borderColor: `${color}40` }}
    >
      {group.title && (
        <p className="text-[10px] font-bold uppercase tracking-wide mb-1.5" style={{ color }}>
          {group.title}
        </p>
      )}
      <ul className="space-y-1">
        {group.items.map(item => (
          <li key={item} className="flex items-start gap-1.5">
            <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
            <span className="text-cafe-light text-[11px] leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Equipo() {
  const { t } = useTranslation('equipo')
  const AREAS = AREAS_BASE.map(a => ({
    ...a,
    area: t(`areas.${a.key}.name`),
    groups: t(`areas.${a.key}.groups`, { returnObjects: true }),
  }))

  const [expandedAreas, setExpandedAreas] = useState({})
  const toggleArea = key => setExpandedAreas(prev => ({ ...prev, [key]: !prev[key] }))
  const [heroPhoto] = useState(() => HERO_PHOTOS[Math.floor(Math.random() * HERO_PHOTOS.length)])

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden bg-[#3E2723]">
        <div className="absolute inset-0 overflow-hidden">
          <img src={heroPhoto} alt=""
               className="w-full h-full object-cover ken-burns-img opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723] to-transparent" />
        </div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 blob-morph" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-36 w-full">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-white/15 border border-white/25 text-white text-xs font-bold
                       uppercase tracking-widest px-4 py-2 rounded-full mb-4"
          >
            {t('badge')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight"
          >
            {t('title1')}<br/>{t('title2')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 text-white/70 text-xl max-w-2xl"
          >
            {t('subtitle')}
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="#F2EDE4" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 L1440,0 L1440,60 Z" />
          </svg>
        </div>
      </section>

      {/* Summary */}
      <section className="py-16 bg-[#F2EDE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { val: '82', label: t('summary.colaboradores'), color: '#C0392B', d: I.graduate },
              { val: '7',  label: t('summary.areas'),          color: '#1B5E20', d: I.building },
              { val: '5',  label: t('summary.departamentos'), color: '#1565C0', d: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative bg-white rounded-3xl p-8 text-center shadow-sm border border-cafe/5
                           overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: s.color }} />
                <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full opacity-[0.06]" style={{ backgroundColor: s.color }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 relative"
                     style={{ backgroundColor: `${s.color}15` }}>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke={s.color} strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.d} />
                  </svg>
                </div>
                <p className="font-black text-cafe text-4xl">{s.val}</p>
                <p className="text-cafe-light text-sm mt-1.5">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Organigrama */}
      <section className="py-24 bg-white">
        <div className="px-4 sm:px-6 lg:px-10">
          <motion.div {...fadeUp} className="mb-12 max-w-7xl mx-auto">
            <span className="text-terracota font-bold text-sm uppercase tracking-widest">{t('org.eyebrow')}</span>
            <h2 className="text-4xl font-black text-cafe mt-2">{t('org.title')}</h2>
          </motion.div>

          {/* Organigrama real con conectores, sin tarjetas, a todo el ancho */}
          <div className="overflow-x-auto pb-4">
            <ul className="org-tree min-w-fit w-full">
              <li>
                {/* Raíz: Fundación × Nestlé (mismos logos que el top nav) */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-cafe rounded-2xl px-9 py-5 shadow-md inline-flex items-center gap-5"
                >
                  <img
                    src="/imagenes/logos/Logos Generales/LOGO FUNDACIÓN COHONDUCAFÉ NEGATIVO.webp"
                    alt="Fundación COHONDUCAFÉ"
                    className="h-16 w-auto object-contain"
                  />
                  <span
                    className="select-none flex-shrink-0"
                    style={{ fontFamily: '"Great Vibes", cursive', fontSize: '2.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1 }}
                  >
                    x
                  </span>
                  <img
                    src="/imagenes/logos/Logos Generales/LOGO NESTLÉ POSITIVO.webp"
                    alt="Nestlé"
                    className="h-12 w-auto object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </motion.div>

                <ul>
                  {AREAS.map(area => {
                    const hasSubgroups = area.groups.length > 1 || area.groups[0].title
                    const isExpanded = !!expandedAreas[area.key]
                    return (
                      <li key={area.area}>
                        <OrgNode
                          area={area}
                          t={t}
                          expanded={isExpanded}
                          onToggle={() => toggleArea(area.key)}
                        />
                        {hasSubgroups && isExpanded && (
                          <ul>
                            {area.groups.map((group, gi) => (
                              <li key={gi}>
                                <OrgSubNode group={group} color={area.color} />
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
