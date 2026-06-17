import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function CardIcon({ d, color }) {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  )
}

export default function ProjectCard({ project, index }) {
  const { name, slug, color, description, collaborators, imageId, icon } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <Link to={`/proyectos/${slug}`} className="block h-full">
        <div className="card-project h-full flex flex-col group">
          {/* Image area */}
          <div className="relative h-44 rounded-2xl overflow-hidden mb-5 flex-shrink-0">
            <img
              src={`https://picsum.photos/seed/${imageId}/600/300`}
              alt={name}
              className="w-full h-full object-cover ken-burns-img"
              loading="lazy"
            />
            {/* Overlay */}
            <div
              className="absolute inset-0 opacity-60"
              style={{ background: `linear-gradient(135deg, ${color}cc 0%, transparent 70%)` }}
            />
            {/* Icon bubble */}
            <div
              className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center
                         text-xl shadow-lg"
              style={{ backgroundColor: color }}
            >
              <CardIcon d={icon} color={color} />
            </div>
            {/* Colabs badge */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm
                            rounded-full px-3 py-1 text-xs font-bold"
                 style={{ color }}>
              {collaborators} colaboradores
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-start gap-2 mb-2">
              <span className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: color }} />
              <h3 className="font-black text-cafe text-lg leading-tight">{name}</h3>
            </div>
            <p className="text-cafe-light text-sm leading-relaxed flex-1">{description}</p>

            {/* CTA */}
            <div className="mt-4 flex items-center gap-2 font-semibold text-sm"
                 style={{ color }}>
              <span>Ver proyecto</span>
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                   fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
