import defaultLocale from './en.json'
import deLocale from './de.json'
import ptBrLocale from './pt-br.json'

const locales = {
  de: deLocale,
  'pt-br': ptBrLocale,
}

export default function getLocaleTranslation(locale, translationRef) {
  if (locale in locales) {
    return locales[locale][translationRef] || translationRef
  }
  return defaultLocale[translationRef] || translationRef
}
