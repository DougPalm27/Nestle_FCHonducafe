import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Auto-discovers every JSON file under locales/<lang>/<namespace>.json.
// To add translations for a new page: drop a file at
// locales/es/miPagina.json (+ en/fr/pt) and use t() with ns: 'miPagina'.
// No changes needed here — the glob below picks it up automatically.
const modules = import.meta.glob('./locales/*/*.json', { eager: true })

const resources = {}
for (const path in modules) {
  const match = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/)
  if (!match) continue
  const [, lang, namespace] = match
  resources[lang] ??= {}
  resources[lang][namespace] = modules[path].default
}

export const SUPPORTED_LANGUAGES = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
]

export const LANGUAGE_STORAGE_KEY = 'nestle_fundacion_lang'

// No auto-detection here on purpose: the language is only ever set by the
// user, via LanguageGate (first visit) or LanguageSwitcher (later changes).
// Auto-detecting would write a guessed language to localStorage and make
// LanguageGate think the user already made a choice.
const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY)

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: storedLang || undefined,
    fallbackLng: 'es',
    supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),
    ns: Object.values(resources.es || {}).length ? Object.keys(resources.es) : ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  })

export default i18n
