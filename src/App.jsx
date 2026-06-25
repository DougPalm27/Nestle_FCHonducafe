import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LanguageGate from './components/LanguageGate'

// Pages
import Home from './pages/Home'
import Impacto from './pages/Impacto'
import Equipo from './pages/Equipo'
import Contacto from './pages/Contacto'

// Project pages
import JovenesCaficultores from './pages/projects/JovenesCaficultores'
import BosquesDelManana from './pages/projects/BosquesDelManana'
import RsGold from './pages/projects/RsGold'
import DerechosHumanos from './pages/projects/DerechosHumanos'
import IncentivoCondicional from './pages/projects/IncentivoCondicional'
import Nespresso from './pages/projects/Nespresso'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AppRoutes() {
  const location = useLocation()
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/impacto" element={<Impacto />} />
          <Route path="/equipo" element={<Equipo />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/proyectos/jovenes-caficultores" element={<JovenesCaficultores />} />
          <Route path="/proyectos/bosques-del-manana" element={<BosquesDelManana />} />
          <Route path="/proyectos/rs-gold" element={<RsGold />} />
          <Route path="/proyectos/derechos-humanos" element={<DerechosHumanos />} />
          <Route path="/proyectos/piloto-yoro" element={<IncentivoCondicional />} />
          <Route path="/proyectos/nespresso-aaa" element={<Nespresso />} />
          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {location.pathname !== '/' && <Footer />}
    </>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2EDE4] pt-20">
      <div className="text-center px-4">
        <p className="text-8xl font-black text-terracota mb-4">404</p>
        <h1 className="text-3xl font-black text-cafe mb-2">Página no encontrada</h1>
        <p className="text-cafe-light mb-8">La ruta que buscas no existe.</p>
        <a href="/" className="btn-primary">← Volver al inicio</a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageGate>
        <AppRoutes />
      </LanguageGate>
    </BrowserRouter>
  )
}
