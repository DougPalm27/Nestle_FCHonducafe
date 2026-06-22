import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

/* ── Paletas de color ───────────────────────────────────── */
const PALETTES = [
  {
    id:      'cafe',
    name:    'Café Profundo',
    dot:     '#FF7043',
    bg:      'radial-gradient(ellipse at 55% 35%, #3b1f14 0%, #150a05 55%, #080401 100%)',
    glow1:   'radial-gradient(ellipse at 15% 85%, #1B5E2016 0%, transparent 55%)',
    glow2:   'radial-gradient(ellipse at 85% 20%, #B71C1C10 0%, transparent 50%)',
    title:   'linear-gradient(90deg, #FF7043, #FDD835, #8BC34A)',
  },
  {
    id:      'selva',
    name:    'Selva Nocturna',
    dot:     '#69F0AE',
    bg:      'radial-gradient(ellipse at 50% 40%, #0a2416 0%, #050f08 60%, #020604 100%)',
    glow1:   'radial-gradient(ellipse at 15% 85%, #69F0AE0e 0%, transparent 55%)',
    glow2:   'radial-gradient(ellipse at 85% 20%, #FFD74010 0%, transparent 50%)',
    title:   'linear-gradient(90deg, #69F0AE, #CCFF90, #FFD740)',
  },
  {
    id:      'pizarra',
    name:    'Pizarra & Oro',
    dot:     '#FFD54F',
    bg:      'radial-gradient(ellipse at 50% 35%, #1c1c24 0%, #0e0e14 55%, #06060a 100%)',
    glow1:   'radial-gradient(ellipse at 15% 85%, #5C6BC012 0%, transparent 55%)',
    glow2:   'radial-gradient(ellipse at 85% 20%, #FFD54F0e 0%, transparent 50%)',
    title:   'linear-gradient(90deg, #FFD54F, #FFAB40, #FF7043)',
  },
  {
    id:      'marina',
    name:    'Noche Marina',
    dot:     '#40C4FF',
    bg:      'radial-gradient(ellipse at 45% 40%, #0a1628 0%, #050c18 55%, #020508 100%)',
    glow1:   'radial-gradient(ellipse at 15% 85%, #40C4FF0e 0%, transparent 55%)',
    glow2:   'radial-gradient(ellipse at 85% 20%, #69F0AE0a 0%, transparent 50%)',
    title:   'linear-gradient(90deg, #40C4FF, #69F0AE, #EEFF41)',
  },
  {
    id:      'ceniza',
    name:    'Ceniza Volcánica',
    dot:     '#D7CCC8',
    bg:      'radial-gradient(ellipse at 50% 40%, #1a1208 0%, #0d0904 55%, #050402 100%)',
    glow1:   'radial-gradient(ellipse at 15% 85%, #4E342E12 0%, transparent 55%)',
    glow2:   'radial-gradient(ellipse at 85% 20%, #8D6E630a 0%, transparent 50%)',
    title:   'linear-gradient(90deg, #EFEBE9, #D7CCC8, #A1887F)',
  },
  {
    id:      'brasa',
    name:    'Brasa & Índigo',
    dot:     '#EA80FC',
    bg:      'radial-gradient(ellipse at 60% 35%, #1a0a20 0%, #0d0510 55%, #060208 100%)',
    glow1:   'radial-gradient(ellipse at 15% 85%, #6A1B9A12 0%, transparent 55%)',
    glow2:   'radial-gradient(ellipse at 85% 20%, #FF6D0010 0%, transparent 50%)',
    title:   'linear-gradient(90deg, #EA80FC, #FF6D00, #FFAB40)',
  },
  {
    id:      'crema',
    name:    'Crema Cafeto',
    dot:     '#C0392B',
    bg:      'radial-gradient(ellipse at 60% 30%, #F2EDE4 0%, #E8DFD0 50%, #D4C5B0 100%)',
    glow1:   'radial-gradient(ellipse at 15% 85%, #C0392B10 0%, transparent 55%)',
    glow2:   'radial-gradient(ellipse at 85% 20%, #F57F1710 0%, transparent 50%)',
    title:   'linear-gradient(90deg, #C0392B, #E65100, #F57F17)',
    dark:    true,
  },
  {
    id:      'lino',
    name:    'Lino & Verde',
    dot:     '#2E7D32',
    bg:      'radial-gradient(ellipse at 50% 35%, #F5F0E8 0%, #EAE4D6 50%, #D8CEBC 100%)',
    glow1:   'radial-gradient(ellipse at 15% 85%, #2E7D3214 0%, transparent 55%)',
    glow2:   'radial-gradient(ellipse at 85% 20%, #8BC34A10 0%, transparent 50%)',
    title:   'linear-gradient(90deg, #2E7D32, #558B2F, #8BC34A)',
    dark:    true,
  },
  {
    id:      'niebla',
    name:    'Niebla Andina',
    dot:     '#1565C0',
    bg:      'radial-gradient(ellipse at 50% 35%, #EEF2F7 0%, #DDE5EF 50%, #C8D5E4 100%)',
    glow1:   'radial-gradient(ellipse at 15% 85%, #1565C012 0%, transparent 55%)',
    glow2:   'radial-gradient(ellipse at 85% 20%, #00BCD410 0%, transparent 50%)',
    title:   'linear-gradient(90deg, #1565C0, #0288D1, #00BCD4)',
    dark:    true,
  },
  {
    id:      'pergamino',
    name:    'Pergamino',
    dot:     '#6D4C41',
    bg:      'radial-gradient(ellipse at 55% 30%, #FBF6EE 0%, #F0E8D8 50%, #E0D0B8 100%)',
    glow1:   'radial-gradient(ellipse at 15% 85%, #6D4C4112 0%, transparent 55%)',
    glow2:   'radial-gradient(ellipse at 85% 20%, #A1887F0e 0%, transparent 50%)',
    title:   'linear-gradient(90deg, #6D4C41, #8D6E63, #A1887F)',
    dark:    true,
  },
  {
    id:      'amanecer',
    name:    'Amanecer Cafeto',
    dot:     '#E65100',
    bg:      'radial-gradient(ellipse at 50% 35%, #FFF8F0 0%, #FDECD8 50%, #F8D5B0 100%)',
    glow1:   'radial-gradient(ellipse at 15% 85%, #E6510012 0%, transparent 55%)',
    glow2:   'radial-gradient(ellipse at 85% 20%, #FFB30010 0%, transparent 50%)',
    title:   'linear-gradient(90deg, #E65100, #F57F17, #FFB300)',
    dark:    true,
  },
  {
    id:      'menta',
    name:    'Cacao & Menta',
    dot:     '#1B5E20',
    bg:      'radial-gradient(ellipse at 50% 35%, #F0F7F0 0%, #DFF0E4 50%, #C8E6CC 100%)',
    glow1:   'radial-gradient(ellipse at 15% 85%, #1B5E2014 0%, transparent 55%)',
    glow2:   'radial-gradient(ellipse at 85% 20%, #C0392B0e 0%, transparent 50%)',
    title:   'linear-gradient(90deg, #1B5E20, #388E3C, #C0392B)',
    dark:    true,
  },
]

/* ── Datos de proyectos ─────────────────────────────────── */
const PROJECTS = [
  {
    name:    'Jóvenes Caficultores',
    slug:    'jovenes-caficultores',
    color:   '#2E7D32',
    light:   '#81C784',
    tag:     'Educación & Juventud',
    image:   '/imagenes/inicio/03-proyectos/Inicio_JovenesCaficultores.webp',
    desc:    'Orientación vocacional, capacitación técnica y agro emprendimiento para jóvenes de comunidades caficultoras. Prevenimos la migración generando oportunidades reales en el campo.',
    impact:  [
      { label: 'Jóvenes capacitados', value: '4,771+' },
      { label: 'Países alcanzados',   value: '23'     },
      { label: 'Horas en vivo',       value: '1,600+' },
    ],
  },
  {
    name:    'Bosques del Mañana',
    slug:    'bosques-del-manana',
    color:   '#1B5E20',
    light:   '#A5D6A7',
    tag:     'Reforestación',
    image:   '/imagenes/inicio/03-proyectos/Inicio_Bosques.webp',
    desc:    'Reforestación estratégica con más de 4 millones de árboles integrados en sistemas agroforestales junto al cultivo de café. Restauramos ecosistemas y fortalecemos la resiliencia climática.',
    impact:  [
      { label: 'Árboles plantados',   value: '4M+'    },
      { label: 'Familias beneficiadas', value: '800+' },
      { label: 'Hectáreas',           value: '2,100'  },
    ],
  },
  {
    name:    'GHG & RS GOLD',
    slug:    'rs-gold',
    color:   '#B71C1C',
    light:   '#EF9A9A',
    tag:     'Agricultura Regenerativa',
    image:   '/imagenes/proyectos/rs-gold/Variedades_MLT_1.webp',
    desc:    'Garantizamos café responsable bajo agricultura regenerativa y resiliente en la cadena RS Gold de Nescafé. Captura de carbono, trazabilidad total y certificación 4C para 1,620 caficultores.',
    impact:  [
      { label: 'Caficultores',        value: '1,620'  },
      { label: 'Fincas georef.',      value: '1,620'  },
      { label: 'Estándar',            value: '4C'     },
    ],
  },
  {
    name:    'Espacios Seguros',
    slug:    'derechos-humanos',
    color:   '#1565C0',
    light:   '#90CAF9',
    tag:     'Impacto Social',
    image:   '/imagenes/inicio/03-proyectos/Inicio_EspaciosSeguros.webp',
    desc:    'Fortalecemos los derechos humanos y prevenimos el trabajo infantil en comunidades caficultoras de Honduras. Formamos líderes comunitarios y mejoramos la gobernanza local.',
    impact:  [
      { label: 'Comunidades',         value: '12+'    },
      { label: 'Líderes formados',    value: '61'     },
      { label: 'Niños protegidos',    value: '200+'   },
    ],
  },
  {
    name:    'Incentivo Condicional',
    slug:    'piloto-yoro',
    color:   '#E65100',
    light:   '#FFCC80',
    tag:     'Yoro, Honduras',
    image:   '/imagenes/inicio/03-proyectos/Incentivos_ImagenPrincipal.webp',
    desc:    'Programa piloto en Yoro que incentiva condicionalmente la transición de productores vulnerables hacia prácticas de agricultura regenerativa, mejorando suelos y medios de vida.',
    impact:  [
      { label: 'Productores',         value: '120+'   },
      { label: 'Municipios',          value: '3'      },
      { label: 'Año inicio',          value: '2024'   },
    ],
  },
  {
    name:    'Nespresso AAA',
    slug:    'nespresso-aaa',
    color:   '#F57F17',
    light:   '#FFE082',
    tag:     'Sostenibilidad AAA',
    image:   '/imagenes/proyectos/nespresso-aaa/Hero_Nespresso.webp',
    desc:    'Programa de sostenibilidad AAA en el Clúster COHONDUCAFÉ con enfoque en inclusividad, productividad y calidad de vida. Conecta a 421 productores de Copán y Ocotepeque con el mercado premium.',
    impact:  [
      { label: 'Productores AAA',     value: '421'    },
      { label: 'Regiones',            value: '2'      },
      { label: 'Enfoque',             value: 'Premium' },
    ],
  },
]

const COUNT  = PROJECTS.length
const ANGLE  = 360 / COUNT
const RADIUS = 280

/* ── Partículas ─────────────────────────────────────────── */
const PARTICLES = [
  { id:0,  type:'bean',  x:'5%',  y:'12%', size:26, delay:0,   dur:6.5 },
  { id:1,  type:'bean',  x:'91%', y:'18%', size:20, delay:1.2, dur:7   },
  { id:2,  type:'bean',  x:'3%',  y:'65%', size:30, delay:0.5, dur:8   },
  { id:3,  type:'bean',  x:'94%', y:'60%', size:22, delay:2,   dur:6.5 },
  { id:4,  type:'bean',  x:'48%', y:'3%',  size:18, delay:0.8, dur:9   },
  { id:5,  type:'leaf',  x:'16%', y:'7%',  size:34, delay:0.3, dur:8   },
  { id:6,  type:'leaf',  x:'80%', y:'84%', size:40, delay:1.5, dur:10  },
  { id:7,  type:'leaf',  x:'93%', y:'38%', size:28, delay:2.8, dur:7   },
  { id:8,  type:'leaf',  x:'1%',  y:'42%', size:36, delay:0.7, dur:9   },
  { id:9,  type:'spark', x:'34%', y:'10%', size:8,  delay:1,   dur:4   },
  { id:10, type:'spark', x:'67%', y:'93%', size:7,  delay:2.2, dur:5   },
  { id:11, type:'spark', x:'96%', y:'28%', size:10, delay:0.4, dur:3.5 },
]

function Particle({ p }) {
  if (p.type === 'bean') return (
    <motion.div className="absolute pointer-events-none" style={{ left:p.x, top:p.y }}
      animate={{ y:[0,-18,0], rotate:[0,25,0], opacity:[0.25,0.55,0.25] }}
      transition={{ duration:p.dur, delay:p.delay, repeat:Infinity, ease:'easeInOut' }}>
      <svg width={p.size} height={p.size*0.65} viewBox="0 0 40 26" fill="none">
        <ellipse cx="20" cy="13" rx="18" ry="11" fill="#6D4C41" opacity="0.9"/>
        <path d="M20 3 Q28 13 20 23 Q12 13 20 3Z" fill="#3E2723" opacity="0.55"/>
      </svg>
    </motion.div>
  )
  if (p.type === 'leaf') return (
    <motion.div className="absolute pointer-events-none" style={{ left:p.x, top:p.y }}
      animate={{ y:[0,-12,0], rotate:[-10,10,-10], opacity:[0.15,0.35,0.15] }}
      transition={{ duration:p.dur, delay:p.delay, repeat:Infinity, ease:'easeInOut' }}>
      <svg width={p.size} height={p.size} viewBox="0 0 40 40" fill="none">
        <path d="M20 4 C34 4 38 18 20 36 C2 18 6 4 20 4Z" fill="#2E7D32" opacity="0.7"/>
        <path d="M20 8 L20 34" stroke="#1B5E20" strokeWidth="1.5" opacity="0.4"/>
      </svg>
    </motion.div>
  )
  return (
    <motion.div className="absolute rounded-full pointer-events-none bg-white"
      style={{ left:p.x, top:p.y, width:p.size, height:p.size }}
      animate={{ scale:[0,1,0], opacity:[0,0.7,0] }}
      transition={{ duration:p.dur, delay:p.delay, repeat:Infinity, ease:'easeInOut' }}/>
  )
}

/* ── Tarjeta minimalista ────────────────────────────────── */
function Card({ project: p, angle, isActive, onClick, onNavigate, wasDragging }) {
  return (
    <div
      onClick={() => { if (!wasDragging.current && !isActive) onClick() }}
      style={{
        position:       'absolute',
        transformStyle: 'preserve-3d',
        transform:      `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
        width:          160,
        marginLeft:     -80,
        marginTop:      -135,
        cursor:         'pointer',
        transition:     'opacity 0.5s, filter 0.5s',
        opacity:        isActive ? 1 : 0.55,
        filter:         isActive ? 'brightness(1)' : 'brightness(0.5) saturate(0.6)',
      }}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          boxShadow: isActive
            ? `0 0 32px ${p.color}70, 0 12px 40px rgba(0,0,0,0.7)`
            : '0 4px 20px rgba(0,0,0,0.4)',
          transition: 'box-shadow 0.5s',
          border: isActive ? `1px solid ${p.color}60` : '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Imagen — clic navega al proyecto */}
        <div
          className="relative h-[150px] overflow-hidden cursor-pointer"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); onNavigate(p.slug) }}
        >
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" draggable={false}
            style={{ transform: isActive ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.6s' }}/>
          <div className="absolute inset-0"
            style={{ background:`linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.85))` }}/>
          {/* Nombre */}
          <div className="absolute bottom-0 left-0 right-0 p-2.5">
            <p className="text-white font-bold text-[11px] leading-tight line-clamp-2">{p.name}</p>
          </div>
        </div>
        {/* Línea de color */}
        <div className="h-[3px]" style={{ backgroundColor: isActive ? p.color : 'rgba(255,255,255,0.1)', transition:'background-color 0.5s' }}/>
      </div>
    </div>
  )
}

/* ── Carrusel 3D ────────────────────────────────────────── */
function Carousel({ activeIdx, onRotate, onNavigate, wasDragging, isDragging, onDragStart, onDragMove, onDragEnd, rotY }) {
  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{ height:320, perspective:'900px', cursor: isDragging ? 'grabbing' : 'grab' }}
      onPointerDown={onDragStart}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
      onPointerLeave={onDragEnd}
    >
      {/* Sombra suelo */}
      <div className="absolute pointer-events-none" style={{
        bottom:10, left:'50%', transform:'translateX(-50%)',
        width:380, height:30,
        background:'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)',
        filter:'blur(10px)',
      }}/>

      <div style={{ transformStyle:'preserve-3d', transform:'rotateX(-10deg)' }}>
        <motion.div
          style={{ transformStyle:'preserve-3d', position:'relative', width:0, height:0 }}
          animate={{ rotateY: rotY }}
          transition={{ duration: isDragging ? 0 : 0.95, ease:[0.33,1,0.68,1] }}
        >
          {PROJECTS.map((p, i) => (
            <Card
              key={p.slug}
              project={p}
              angle={i * ANGLE}
              isActive={i === activeIdx}
              wasDragging={wasDragging}
              onNavigate={onNavigate}
              onClick={() => onRotate(i)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ── Panel informativo ──────────────────────────────────── */
function InfoPanel({ project: p }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={p.slug}
        initial={{ opacity:0, y:16 }}
        animate={{ opacity:1, y:0  }}
        exit={{    opacity:0, y:-12 }}
        transition={{ duration:0.4, ease:'easeOut' }}
        className="w-full max-w-3xl mx-auto"
      >
        <div
          className="rounded-3xl p-6 sm:p-8"
          style={{
            background:'rgba(255,255,255,0.04)',
            backdropFilter:'blur(20px)',
            border:`1px solid ${p.color}30`,
            boxShadow:`0 0 60px ${p.color}12`,
          }}
        >
          <div className="flex flex-col sm:flex-row gap-6">

            {/* Izquierda: nombre y categoría */}
            <div className="sm:w-56 flex-shrink-0">
              <span
                className="inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                style={{ backgroundColor:`${p.color}25`, color:p.light, border:`1px solid ${p.color}40` }}
              >
                {p.tag}
              </span>
              <h2 className="text-white font-black text-xl sm:text-2xl leading-tight mb-4">
                {p.name}
              </h2>
              <Link
                to={`/proyectos/${p.slug}`}
                className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:brightness-110"
                style={{ backgroundColor: p.color, color:'#fff' }}
              >
                Ver proyecto
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>

            {/* Separador vertical */}
            <div className="hidden sm:block w-px self-stretch" style={{ backgroundColor:`${p.color}30` }}/>

            {/* Derecha: descripción e impacto */}
            <div className="flex-1 flex flex-col gap-4">
              <p className="text-white/70 text-sm leading-relaxed">{p.desc}</p>

              {/* Métricas */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {p.impact.map((m, i) => (
                  <div key={i} className="rounded-2xl p-3 text-center"
                    style={{ backgroundColor:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
                    <p className="font-black text-lg" style={{ color: p.light }}>{m.value}</p>
                    <p className="text-white/45 text-[10px] font-medium mt-0.5 leading-tight">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Página principal ───────────────────────────────────── */
export default function Home() {
  const navigate = useNavigate()
  const [activeIdx,  setActiveIdx]  = useState(0)
  const [rotY,       setRotY]       = useState(0)
  const [paused,     setPaused]     = useState(false)
  const [dragging,   setDragging]   = useState(false)
  const [paletteIdx, setPaletteIdx] = useState(0)
  const [showPicker, setShowPicker] = useState(false)
  const palette    = PALETTES[paletteIdx]
  const dragStartX   = useRef(null)
  const dragStartRot = useRef(0)
  const wasDragging  = useRef(false)

  const goTo = useCallback((idx) => {
    setActiveIdx(idx)
    setRotY(-(idx * ANGLE))
  }, [])

  const next = useCallback(() => {
    setActiveIdx(a => {
      const n = (a + 1) % COUNT
      setRotY(-(n * ANGLE))
      return n
    })
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 3500)
    return () => clearInterval(t)
  }, [paused, next])

  const onDragStart = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    wasDragging.current  = false
    setDragging(false)
    setPaused(true)
    dragStartX.current   = e.clientX
    dragStartRot.current = rotY
  }
  const onDragMove = (e) => {
    if (dragStartX.current === null) return
    const dx = e.clientX - dragStartX.current
    if (Math.abs(dx) > 5) { wasDragging.current = true; setDragging(true) }
    setRotY(dragStartRot.current + dx * 0.3)
  }
  const onDragEnd = () => {
    if (dragStartX.current === null) return
    const snapped = Math.round(-rotY / ANGLE)
    const idx     = ((snapped % COUNT) + COUNT) % COUNT
    setRotY(-(idx * ANGLE))
    setActiveIdx(idx)
    dragStartX.current = null
    setTimeout(() => { wasDragging.current = false; setDragging(false); setPaused(false) }, 100)
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: palette.bg, transition: 'background 1.2s ease' }}
    >
      {/* Glows ambientales */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: palette.glow1, transition: 'background 1.2s ease' }}/>
      <div className="absolute inset-0 pointer-events-none" style={{ background: palette.glow2, transition: 'background 1.2s ease' }}/>
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)' }}/>

      {/* Partículas */}
      {PARTICLES.map(p => <Particle key={p.id} p={p}/>)}

      {/* ── Selector de paleta ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {showPicker && (
            <motion.div
              initial={{ opacity:0, y:8, scale:0.95 }}
              animate={{ opacity:1, y:0, scale:1 }}
              exit={{    opacity:0, y:8, scale:0.95 }}
              transition={{ duration:0.2 }}
              className="rounded-2xl p-3 flex flex-col gap-2"
              style={{ background:'rgba(0,0,0,0.75)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.1)' }}
            >
              {PALETTES.map((pal, i) => (
                <button
                  key={pal.id}
                  onClick={() => { setPaletteIdx(i); setShowPicker(false) }}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all duration-150 text-left"
                  style={{ background: paletteIdx === i ? 'rgba(255,255,255,0.12)' : 'transparent' }}
                >
                  <span className="w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-white/20"
                        style={{ backgroundColor: pal.dot }}/>
                  <span className="text-white/80 text-xs font-medium whitespace-nowrap">{pal.name}</span>
                  {paletteIdx === i && (
                    <span className="ml-auto text-white/40 text-[10px]">✓</span>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowPicker(v => !v)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: palette.dot,
            boxShadow: `0 0 16px ${palette.dot}60`,
          }}
          title="Cambiar paleta"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
          </svg>
        </button>
      </div>

      {/* Layout principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
        style={{ paddingTop:'104px', paddingBottom:'24px' }}>

        {/* ── Encabezado ── */}
        <motion.div className="text-center mb-6"
          initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.15 }}>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight"
              style={{ color: palette.dark ? '#1a0a05' : '#ffffff' }}>
            Proyectos<br/>
            con Nestlé
          </h1>
        </motion.div>

        {/* ── Carrusel 3D ── */}
        <motion.div className="w-full max-w-4xl"
          initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.9, delay:0.35, ease:'easeOut' }}>
          <Carousel
            activeIdx={activeIdx}
            rotY={rotY}
            isDragging={dragging}
            wasDragging={wasDragging}
            onRotate={(i) => { goTo(i); setPaused(true); setTimeout(()=>setPaused(false), 2500) }}
            onNavigate={(slug) => navigate(`/proyectos/${slug}`)}
            onDragStart={onDragStart}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
          />

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 -mt-2 mb-5">
            {PROJECTS.map((p, i) => (
              <button key={i}
                onClick={() => { goTo(i); setPaused(true); setTimeout(()=>setPaused(false),2500) }}
                style={{
                  height:6, borderRadius:99,
                  width: i === activeIdx ? 24 : 6,
                  backgroundColor: i === activeIdx ? p.color : 'rgba(255,255,255,0.18)',
                  transition:'all 0.35s',
                }}/>
            ))}
          </div>
        </motion.div>

        {/* ── Panel informativo ── */}
        <motion.div className="w-full max-w-4xl px-0"
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.55 }}>
          <InfoPanel project={PROJECTS[activeIdx]}/>
        </motion.div>

        {/* ── CTAs secundarios ── */}
        <motion.div className="flex flex-wrap gap-3 justify-center mt-5"
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ duration:0.6, delay:0.75 }}>
          <Link to="/impacto"
            className="bg-white/6 border border-white/15 backdrop-blur-sm text-white/80 font-semibold
                       px-5 py-2.5 rounded-full hover:bg-white/12 transition-all duration-200
                       flex items-center gap-2 text-xs uppercase tracking-widest">
            Impacto global
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
          <Link to="/contacto"
            className="bg-white/6 border border-white/15 backdrop-blur-sm text-white/80 font-semibold
                       px-5 py-2.5 rounded-full hover:bg-white/12 transition-all duration-200 text-xs uppercase tracking-widest">
            Contáctanos
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
