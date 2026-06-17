import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Color por página interior ───────────────────────── */
const interiorColors = {
  '/impacto':  '#1B5E20',
  '/equipo':   '#3E2723',
  '/contacto': '#4E342E',
}

/* ── Mapa de proyectos ────────────────────────────────── */
const projects = [
  {
    label: 'Jóvenes Caficultores',
    to:    '/proyectos/jovenes-caficultores',
    color: '#2E7D32',
    logo:  '/imagenes/logos/Logos Generales/LOGO JÓVENES CAFICULTORES NEGATIVO.webp',
  },
  {
    label: 'Bosques del Mañana',
    to:    '/proyectos/bosques-del-manana',
    color: '#1B5E20',
    logo:  '/imagenes/logos/Logos Generales/LOGO BOSQUES DEL MAÑANA NEGATIVO.webp',
  },
  {
    label: 'RS GOLD',
    to:    '/proyectos/rs-gold',
    color: '#C0392B',
    logo:  null,
  },
  {
    label: 'Espacios Seguros',
    to:    '/proyectos/derechos-humanos',
    color: '#1565C0',
    logo:  '/imagenes/logos/Logos Generales/Logo_EspaciosSeguros.webp',
    logoWhite: true,
  },
  {
    label: 'Incentivo Condicional',
    to:    '/proyectos/piloto-yoro',
    color: '#E65100',
    logo:  null,
  },
  {
    label: 'Nespresso AAA',
    to:    '/proyectos/nespresso-aaa',
    color: '#F57F17',
    logo:  '/imagenes/logos/Logos Generales/LogoAAA_Since2003_White_RGB.webp',
  },
]

function SeparadorX() {
  return (
    <span
      className="flex items-center justify-center select-none flex-shrink-0"
      style={{
        fontFamily: '"Great Vibes", cursive',
        fontSize: '2rem',
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 1,
        marginTop: '2px',
      }}
    >
      x
    </span>
  )
}

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  /* Detectar proyecto activo */
  const activeProject = projects.find(p => location.pathname.startsWith(p.to)) ?? null
  const interiorColor = !activeProject ? (interiorColors[location.pathname] ?? null) : null
  const activeColor   = activeProject?.color ?? interiorColor ?? null

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setDropdownOpen(false) }, [location])

  const isHome     = location.pathname === '/'
  const isProject  = location.pathname.startsWith('/proyectos/')
  const isColored  = !!activeColor   // proyectos + impacto + equipo + contacto

  const navBase = 'fixed top-0 left-0 right-0 z-50 transition-all duration-500'

  const navClass = (() => {
    if (isColored) return `${navBase} border-b border-white/15 ${scrolled ? 'shadow-2xl' : ''}`
    if (scrolled)  return `${navBase} bg-[#3E2723]/97 backdrop-blur-xl shadow-2xl border-b border-white/10`
    if (isHome)    return `${navBase} bg-gradient-to-b from-black/50 to-transparent`
    return `${navBase} bg-[#3E2723]/95 backdrop-blur-xl border-b border-white/10`
  })()

  const navStyle = isColored ? { backgroundColor: activeColor } : undefined

  const linkClass = ({ isActive }) => {
    if (isActive && isColored) {
      return 'text-sm font-semibold transition-colors duration-200 text-white underline underline-offset-4 decoration-white/60'
    }
    return `text-sm font-semibold transition-colors duration-200 ${
      isActive ? 'text-terracota' : 'text-white hover:text-white/80'
    }`
  }

  const ctaBtnClass = isColored
    ? 'text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 bg-white'
    : 'bg-terracota text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-terracota-dark transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5'

  const ctaBtnStyle = isColored ? { color: activeColor } : undefined

  return (
    <nav className={navClass} style={navStyle}>
      {/* ── Barra principal ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[100px] md:h-[104px]">

          {/* ── LOGOS (izquierda) ──────────────────────── */}
          <Link to="/" className="flex items-center gap-4 group flex-shrink-0">

            {/* Fundación COHONDUCAFÉ */}
            <motion.img
              src={
                (isColored || isHome || scrolled)
                  ? '/imagenes/logos/Logos Generales/LOGO FUNDACIÓN COHONDUCAFÉ NEGATIVO.webp'
                  : '/imagenes/logos/Logos Generales/LOGO FUNDACIÓN COHONDUCAFÉ COLOR.webp'
              }
              alt="Fundación COHONDUCAFÉ"
              className="h-[106px] w-auto object-contain group-hover:brightness-110 transition-all duration-200"
              initial={false}
              animate={{ opacity: 1 }}
            />

            {/* Separador × */}
            <span className="hidden sm:block"><SeparadorX /></span>

            {/* Nestlé */}
            <motion.img
              src="/imagenes/logos/Logos Generales/LOGO NESTLÉ POSITIVO.webp"
              alt="Nestlé"
              className="h-[80px] w-auto object-contain group-hover:brightness-110 transition-all duration-200 hidden sm:block"
              style={{ filter: 'brightness(0) invert(1)' }}
              initial={false}
              animate={{ opacity: 1 }}
            />

            {/* Separador × */}
            <span className="hidden sm:block"><SeparadorX /></span>

            {/* Plan Nescafé */}
            <motion.img
              src="/imagenes/logos/Logos Generales/LOGO PLAN NESCAFÉ NEGATIVO.webp"
              alt="Plan Nescafé"
              className="h-[80px] w-auto object-contain group-hover:brightness-110 transition-all duration-200 hidden sm:block"
              initial={false}
              animate={{ opacity: 1 }}
            />

            {/* Logo del proyecto activo (desktop) */}
            <AnimatePresence>
              {activeProject?.logo && (
                <motion.div
                  key={activeProject.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4 hidden sm:flex"
                >
                  <SeparadorX />
                  <img
                    src={activeProject.logo}
                    alt={activeProject.label}
                    className="h-[70px] w-auto object-contain transition-all duration-200"
                    style={activeProject.logoWhite ? { filter: 'brightness(0) invert(1)' } : undefined}
                  />
                </motion.div>
              )}
            </AnimatePresence>

          </Link>

          {/* ── Nav links (desktop) ────────────────────── */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={linkClass}>Inicio</NavLink>

            {/* Dropdown proyectos */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="text-sm font-semibold text-white hover:text-white/80 transition-colors duration-200
                           flex items-center gap-1.5"
                onClick={() => setDropdownOpen(v => !v)}
              >
                Proyectos
                <motion.svg
                  className="w-4 h-4"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0,  scale: 1    }}
                    exit={{    opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72
                               backdrop-blur-xl rounded-2xl shadow-2xl
                               border border-white/10 overflow-hidden py-2"
                    style={{
                      backgroundColor: activeColor ?? 'rgba(62,39,35,0.98)',
                    }}
                  >
                    {projects.map(p => (
                      <Link
                        key={p.to}
                        to={p.to}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/10
                                   transition-colors duration-150 group"
                      >
                        <span className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: p.color }} />
                        <span className="text-white text-sm font-medium group-hover:text-white/90 flex-1">
                          {p.label}
                        </span>
                        {p.logo && (
                          <img src={p.logo} alt="" className="h-5 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/impacto"   className={linkClass}>Impacto</NavLink>
            <NavLink to="/equipo"    className={linkClass}>Staff</NavLink>
            <NavLink to="/contacto"  className={linkClass}>Contacto</NavLink>
          </div>

          {/* ── CTA + hamburger ───────────────────────── */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Link to="/contacto" className={ctaBtnClass} style={ctaBtnStyle}>
                Contáctanos
              </Link>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Menú"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{    opacity: 0, height: 0    }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-white/15 overflow-hidden"
            style={isColored ? { backgroundColor: activeColor } : { backgroundColor: 'rgba(62,39,35,0.98)', backdropFilter: 'blur(16px)' }}
          >
            <div className="px-4 py-6 flex flex-col gap-1">

              {/* Logos en mobile */}
              <div className="flex items-center gap-3 pb-5 mb-3 border-b border-white/10 flex-wrap">
                <img
                  src="/imagenes/logos/Logos Generales/LOGO FUNDACIÓN COHONDUCAFÉ COLOR.webp"
                  alt="COHONDUCAFÉ" className="h-10 w-auto object-contain"
                />
                <SeparadorX />
                <img
                  src="/imagenes/logos/Logos Generales/LOGO NESTLÉ POSITIVO.webp"
                  alt="Nestlé" className="h-8 w-auto object-contain"
                />
                {/* Logo proyecto activo en mobile */}
                <AnimatePresence>
                  {activeProject?.logo && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{    opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <SeparadorX />
                      <img src={activeProject.logo} alt={activeProject.label}
                           className="h-8 w-auto object-contain"
                           style={activeProject.logoWhite ? { filter: 'brightness(0) invert(1)' } : undefined} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink to="/" end
                className="text-white font-semibold py-3 px-3 rounded-xl hover:bg-white/10 transition-colors">
                Inicio
              </NavLink>

              <div>
                <button
                  onClick={() => setDropdownOpen(v => !v)}
                  className="w-full text-left text-white font-semibold py-3 px-3 rounded-xl
                             hover:bg-white/10 transition-colors flex items-center justify-between"
                >
                  Proyectos
                  <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                       fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{    opacity: 0, height: 0    }}
                      className="pl-4 flex flex-col gap-1 overflow-hidden"
                    >
                      {projects.map(p => (
                        <Link key={p.to} to={p.to}
                          className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/10 transition-colors">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                          <span className="text-white/90 text-sm flex-1">{p.label}</span>
                          {p.logo && (
                            <img src={p.logo} alt="" className="h-5 w-auto object-contain opacity-60" />
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink to="/impacto"
                className="text-white font-semibold py-3 px-3 rounded-xl hover:bg-white/10 transition-colors">
                Impacto
              </NavLink>
              <NavLink to="/equipo"
                className="text-white font-semibold py-3 px-3 rounded-xl hover:bg-white/10 transition-colors">
                Staff
              </NavLink>
              <NavLink to="/contacto"
                className="text-white font-semibold py-3 px-3 rounded-xl hover:bg-white/10 transition-colors">
                Contacto
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
