import { useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
}

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder: in a real app, POST to backend
    setSent(true)
  }

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden bg-terracota">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://picsum.photos/seed/contacthero/1600/600" alt=""
               className="w-full h-full object-cover ken-burns-img opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-terracota via-terracota/90 to-transparent" />
        </div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 blob-morph" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-36 w-full">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-white/15 border border-white/25 text-white text-xs font-bold
                       uppercase tracking-widest px-4 py-2 rounded-full mb-4"
          >
            Fundación COHONDUCAFÉ
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight"
          >
            Contáctanos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 text-white/75 text-xl max-w-2xl"
          >
            ¿Quieres saber más sobre nuestros proyectos o explorar una alianza?
            Escríbenos, estamos aquí para escucharte.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="#F2EDE4" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 L1440,0 L1440,60 Z" />
          </svg>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-24 bg-[#F2EDE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Contact Info */}
            <motion.div {...fadeUp}>
              <h2 className="text-3xl font-black text-cafe mb-8">Información de contacto</h2>

              <div className="space-y-6">
                {[
                  {
                    icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
                    title: 'Ubicación',
                    text: 'Honduras, Centroamérica\nOperaciones en Honduras y Panamá',
                  },
                  {
                    icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
                    title: 'Alcance',
                    text: 'Jóvenes Caficultores en 23 países\nOperaciones en 5 departamentos de Honduras',
                  },
                  {
                    icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
                    title: 'Alianzas',
                    text: 'En colaboración con Nestlé\nNescafé · Nespresso AAA · RS GOLD',
                  },
                  {
                    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
                    title: 'Proyectos',
                    text: '6 proyectos activos · 81 colaboradores\n63,212+ personas capacitadas',
                  },
                ].map((info, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#C0392B]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#C0392B" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={info.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-cafe">{info.title}</p>
                      <p className="text-cafe-light text-sm mt-0.5 whitespace-pre-line leading-relaxed">
                        {info.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Nestlé partners */}
              <div className="mt-10 p-6 bg-white rounded-3xl shadow-sm">
                <p className="text-cafe-light text-sm font-semibold uppercase tracking-widest mb-4">
                  En alianza con
                </p>
                <div className="flex items-center gap-6">
                  {['Nestlé', 'Nescafé', 'Nespresso'].map(b => (
                    <div key={b} className="bg-[#F2EDE4] rounded-xl px-4 py-3 text-center">
                      <p className="font-black text-cafe text-sm">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div {...fadeUp}>
              {sent ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center bg-white rounded-3xl p-12 shadow-md">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black text-cafe mb-2">¡Mensaje enviado!</h3>
                    <p className="text-cafe-light">
                      Gracias por contactarnos. Nos comunicaremos contigo pronto.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-6 btn-primary"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 shadow-md">
                  <h2 className="text-2xl font-black text-cafe mb-6">Envíanos un mensaje</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-cafe mb-1.5">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          value={form.nombre}
                          onChange={handleChange}
                          required
                          placeholder="Tu nombre"
                          className="w-full px-4 py-3 rounded-xl border border-[#E8DFD0] bg-[#F2EDE4]
                                     text-cafe placeholder-cafe-light/60 text-sm
                                     focus:outline-none focus:ring-2 focus:ring-terracota/30
                                     focus:border-terracota transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-cafe mb-1.5">
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="tu@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-[#E8DFD0] bg-[#F2EDE4]
                                     text-cafe placeholder-cafe-light/60 text-sm
                                     focus:outline-none focus:ring-2 focus:ring-terracota/30
                                     focus:border-terracota transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-cafe mb-1.5">Asunto</label>
                      <select
                        name="asunto"
                        value={form.asunto}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#E8DFD0] bg-[#F2EDE4]
                                   text-cafe text-sm
                                   focus:outline-none focus:ring-2 focus:ring-terracota/30
                                   focus:border-terracota transition-colors"
                      >
                        <option value="">Selecciona un asunto</option>
                        <option>Información general</option>
                        <option>Jóvenes Caficultores</option>
                        <option>Bosques del Mañana</option>
                        <option>RS GOLD</option>
                        <option>Derechos Humanos</option>
                        <option>Incentivo Condicional</option>
                        <option>Nespresso AAA</option>
                        <option>Alianza estratégica</option>
                        <option>Otro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-cafe mb-1.5">Mensaje</label>
                      <textarea
                        name="mensaje"
                        value={form.mensaje}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="¿En qué podemos ayudarte?"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8DFD0] bg-[#F2EDE4]
                                   text-cafe placeholder-cafe-light/60 text-sm resize-none
                                   focus:outline-none focus:ring-2 focus:ring-terracota/30
                                   focus:border-terracota transition-colors"
                      />
                    </div>

                    <button type="submit" className="w-full btn-primary justify-center py-4 text-base">
                      Enviar mensaje
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
