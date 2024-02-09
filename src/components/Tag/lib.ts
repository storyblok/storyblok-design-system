import type { TagTypes } from './types'

export const tagTypes: string[] = [
  'primary',
  'success',
  'negative',
  'warning',
  'info',
  'light-grey',
  'dark-grey',
  'dark-ink',
]

/**
 * @typedef {{
 * 'primary': string,
 * 'success': string,
 * 'negative': string,
 * 'warning': string,
 * 'info': string,
 * 'light-grey': string,
 * 'dark-grey': string,
 * 'dark-ink': string,
 * }}
 */
export let tagTypesMap = {}
for (const type of tagTypes) {
  tagTypesMap = { ...tagTypesMap, [type]: type }
}

export default { tagTypes, tagTypesMap }
