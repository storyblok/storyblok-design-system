import defaultLocale from './en.json'
import deLocale from './de.json'
import ptBrLocale from './pt-br.json'
import esLocale from './es.json'
import frLocale from './fr.json'
import itLocale from './it.json'
import jaLocale from './ja.json'
import plLocale from './pl.json'
import ruLocale from './ru.json'
import skLocale from './sk.json'
import svLocale from './sv.json'
import zhLocale from './zh.json'

const locales = {
  de: deLocale,
  'pt-br': ptBrLocale,
  es: esLocale,
  fr: frLocale,
  it: itLocale,
  ja: jaLocale,
  pl: plLocale,
  ru: ruLocale,
  sk: skLocale,
  sv: svLocale,
  zh: zhLocale,
}

export default function getLocaleTranslation(locale, translationRef) {
  if (locale in locales) {
    return locales[locale][translationRef] || translationRef
  }
  return defaultLocale[translationRef] || translationRef
}
