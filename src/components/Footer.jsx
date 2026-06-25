import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const quickLinkKeys = [
  { key: 'inicio',    to: '/' },
  { key: 'impacto',   to: '/impacto' },
  { key: 'equipo',    to: '/equipo' },
  { key: 'contacto',  to: '/contacto' },
]

const projectLinkKeys = [
  { key: 'jovenesCaficultores',   to: '/proyectos/jovenes-caficultores' },
  { key: 'bosquesDelManana',      to: '/proyectos/bosques-del-manana' },
  { key: 'rsGold',                to: '/proyectos/rs-gold' },
  { key: 'derechosHumanos',       to: '/proyectos/derechos-humanos' },
  { key: 'incentivoCondicional',  to: '/proyectos/piloto-yoro' },
  { key: 'nespresso',             to: '/proyectos/nespresso-aaa' },
]

export default function Footer() {
  const { t } = useTranslation('footer')

  return (
    <footer className="bg-[#3E2723] text-white">
      {/* Top wave */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#F2EDE4"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <img
                src="/imagenes/logos/Logos Generales/LOGO FUNDACIÓN COHONDUCAFÉ NEGATIVO.webp"
                alt="Fundación COHONDUCAFÉ"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <span className="text-white/50 text-xs">{t('alliance')}</span>
              <img
                src="/imagenes/logos/Logos Generales/LOGO NESTLÉ POSITIVO.webp"
                alt="Nestlé"
                className="h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
              <img
                src="/imagenes/logos/Logos Generales/LOGO PLAN NESCAFÉ NEGATIVO.webp"
                alt="Plan Nescafé"
                className="h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-white/50 mb-4">
              {t('navigation')}
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinkKeys.map(l => (
                <li key={l.to}>
                  <Link to={l.to}
                    className="text-white/80 hover:text-white text-sm transition-colors duration-150 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracota opacity-0 group-hover:opacity-100 transition-opacity" />
                    {t(`links.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-white/50 mb-4">
              {t('projects')}
            </h3>
            <ul className="flex flex-col gap-2">
              {projectLinkKeys.map(l => (
                <li key={l.to}>
                  <Link to={l.to}
                    className="text-white/80 hover:text-white text-sm transition-colors duration-150 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracota opacity-0 group-hover:opacity-100 transition-opacity" />
                    {t(`projectLinks.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            {t('rights')}
          </p>
          <p className="text-white/40 text-sm">
            {t('withNestle')} <span className="text-white/60 font-semibold">Nestlé</span> — {t('honduras')}
          </p>
        </div>
      </div>
    </footer>
  )
}
