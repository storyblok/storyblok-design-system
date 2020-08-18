/**
 * @description capitalize the first letter that is passed as an argument
 * @method capitalize
 * @param  {string} text
 * @return {string}
 */
export const capitalize = (text) => {
  if (text === '' || text === undefined) {
    return ''
  }
  const initial = text.substring(0, 1).toUpperCase()
  return `${initial}${text.substring(1)}`
}

/**
 * @description capitalize all letter's after spaces that is passed as an argument
 * @method capitalizeAllAfterSpaces
 * @param  {string} text
 * @return {string}
 */
export const capitalizeAllAfterSpaces = (text) => {
  if (text === '' || text === undefined) {
    return ''
  }
  const data = text.split(' ').map(capitalize)

  return data.join(' ')
}
