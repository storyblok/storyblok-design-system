import defaultLocale from './en.json'
import deLocale from './de.json'

const locales = {
  de: deLocale,
}

export default function getLocaleTranslation(locale, translationRef) {
  if (locale in locales) {
    console.log(locales[locale][translationRef])
    return locales[locale][translationRef] || translationRef
  }
  return defaultLocale[translationRef] || translationRef
}
