import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ProjectHero({
  title,
  subtitle,
  description,
  color,
  imageId,
  imageSrc,
  imagePosition = 'center',
  tag,
  collaborators,
  logo,
  logo2,
}) {
  const imgRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return
      const scrolled = window.scrollY
      imgRef.current.style.transform = `translateY(${scrolled * 0.35}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden">
      {/* Background image with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src={imageSrc || `https://picsum.photos/seed/${imageId}/1600/900`}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ objectPosition: imagePosition }}
          loading="eager"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${color}a0 0%, ${color}66 30%, ${color}22 60%, transparent 100%)`
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Decorative blob */}
      <div
        className="absolute top-20 right-10 w-72 h-72 blob-morph opacity-20"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute top-40 right-32 w-48 h-48 blob-morph-2 opacity-10"
        style={{ backgroundColor: '#fff' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-40 w-full">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white
                       text-sm font-medium transition-colors duration-200 group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
        </motion.div>

        {/* Logo del proyecto */}
        {logo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-5 flex items-center gap-5"
          >
            <img src={logo} alt={title} className="h-40 w-auto object-contain drop-shadow-xl" />
            {logo2 && (
              <img src={logo2} alt="" className="h-24 w-auto object-contain drop-shadow-xl" />
            )}
          </motion.div>
        )}

        {/* Tag */}
        {tag && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold
                             uppercase tracking-widest px-4 py-2 rounded-full border border-white/30">
              {tag}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight
                     tracking-tight max-w-4xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-3 text-xl sm:text-2xl font-semibold text-white/80"
          >
            {subtitle}
          </motion.p>
        )}

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-4 text-lg text-white/75 max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {/* Meta pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {collaborators !== undefined && (
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-full
                            px-4 py-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-white text-sm font-semibold">{collaborators} colaboradores</span>
            </div>
          )}
          <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-full
                          px-4 py-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-white text-sm font-semibold">Reporte 2026</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom diagonal cut */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="#F2EDE4" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 L1440,0 L1440,60 Z" />
        </svg>
      </div>
    </section>
  )
}
