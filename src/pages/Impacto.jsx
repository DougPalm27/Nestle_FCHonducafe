import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ProgressBar from '../components/ProgressBar'
import ImpactoMapa from '../components/ImpactoMapa'
import { useState } from 'react'

const HERO_PHOTOS = [
  '/imagenes/proyectos/bosques-del-manana/bosques_01.webp',
  '/imagenes/proyectos/jovenes-caficultores/aulaMovil/galeria-01.webp',
  '/imagenes/proyectos/rs-gold/hero.webp',
  '/imagenes/proyectos/incentivo-condicional/apicultura_01.webp',
  '/imagenes/proyectos/derechos-humanos/_EAA4513.webp',
  '/imagenes/proyectos/nespresso-aaa/AsistenciasTecnicas/AsistenciasTecnicas.webp',
]

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
}

export default function Impacto() {
  const { t } = useTranslation('impacto')
  const [heroPhoto] = useState(() => HERO_PHOTOS[Math.floor(Math.random() * HERO_PHOTOS.length)])
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-[#1B5E20]">
        <div className="absolute inset-0 overflow-hidden">
          <img src={heroPhoto} alt=""
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
            {t('badge')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 text-white/75 text-xl max-w-2xl"
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

      {/* By project */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="text-4xl font-black text-cafe">{t('byProjectTitle')}</h2>
          </motion.div>
          <div className="space-y-4">
            {[
              { name: t('projects.jovenesCaficultores'),  people: 63212,  trees: 0,       color: '#2E7D32', colabs: 6 },
              { name: t('projects.bosquesDelManana'),      people: 2718,   trees: 4010362, color: '#1B5E20', colabs: 57 },
              { name: t('projects.rsGold'),                people: 1620,   trees: 0,       color: '#C0392B', colabs: 7 },
              { name: t('projects.derechosHumanos'),       people: 450,    trees: 0,       color: '#1565C0', colabs: 1 },
              { name: t('projects.incentivoCondicional'),  people: 355,    trees: 0,       color: '#E65100', colabs: 3 },
              { name: t('projects.nespresso'),             people: 421,    trees: 0,       color: '#F57F17', colabs: 5 },
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
                    <p className="text-xs text-cafe-light">{t('labels.personasCapacitadas')}</p>
                  </div>
                  {p.trees > 0 && (
                    <div>
                      <p className="font-black text-cafe">{p.trees.toLocaleString('es-HN')}</p>
                      <p className="text-xs text-cafe-light">{t('labels.arboles')}</p>
                    </div>
                  )}
                  <div>
                    <p className="font-black" style={{ color: p.color }}>{p.colabs}</p>
                    <p className="text-xs text-cafe-light">{t('labels.colabs')}</p>
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
            <h2 className="text-4xl font-black text-cafe mb-4">{t('countriesTitle')}</h2>
            <p className="text-cafe-light text-lg">
              {t('countriesSubtitle')}
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
