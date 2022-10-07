/**
 * @type {Array<string>}
 */
export const tagTypes = [
  'primary',
  'negative',
  'warning',
  'info',
  'light',
  'light-info',
  'success',
]

/**
 * @typedef {{
 * 'primary': string,
 * 'negative': string,
 * 'warning': string,
 * 'info': string,
 * 'light': string,
 * 'light-info': string,
 * 'success': string,
 * }}
 */
export let tagTypesMap = {}
for (const type of tagTypes) {
  tagTypesMap = { ...tagTypesMap, [type]: type }
}

export default { tagTypes, tagTypesMap }
