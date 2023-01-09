/**
 * @type {Array<string>}
 */
export const tagTypes = [
  'primary',
  'negative',
  'warning',
  'info',
  'light-grey',
  'dark-grey',
  'light-info',
  'success',
  'dark-ink',
]

/**
 * @typedef {{
 * 'primary': string,
 * 'negative': string,
 * 'warning': string,
 * 'info': string,
 * 'light-grey': string,
 * 'dark-grey': string,
 * 'light-info': string,
 * 'dark-ink': string,
 * 'success': string,
 * }}
 */
export let tagTypesMap = {}
for (const type of tagTypes) {
  tagTypesMap = { ...tagTypesMap, [type]: type }
}

export default { tagTypes, tagTypesMap }
