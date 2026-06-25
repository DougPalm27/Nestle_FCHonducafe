import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { SUPPORTED_LANGUAGES, LANGUAGE_STORAGE_KEY } from '../i18n'

export default function LanguageGate({ children }) {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(() => !localStorage.getItem(LANGUAGE_STORAGE_KEY))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleSelect = (code) => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, code)
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1B1410]/90 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeIn' } }}
          >
            <motion.div
              className="relative shadow-2xl max-w-2xl w-full p-20 text-center overflow-hidden bg-[length:400%_400%] animate-gradient-shift animate-blob-slow"
              style={{
                backgroundImage:
                  'linear-gradient(120deg, #1B120F, #3E2723, #5D4037, #795548, #5D4037, #3E2723, #1B120F)',
              }}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16, transition: { duration: 0.3, ease: 'easeIn' } }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <motion.h2
                className="text-4xl font-black text-white drop-shadow mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {t('languageGate.title')}
              </motion.h2>
              <motion.p
                className="text-lg text-white/85 drop-shadow mb-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.4 }}
              >
                {t('languageGate.subtitle')}
              </motion.p>
              <motion.div
                className="grid grid-cols-2 gap-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
                }}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/90 hover:bg-white shadow-md transition-colors font-semibold text-base text-cafe"
                    variants={{
                      hidden: { opacity: 0, y: 14, scale: 0.92 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
