/**
 * @description captalize the first letter that is passed as an argument
 * @method captalize
 * @param  {string} text
 * @return {string}
 */
export const captalize = (text) => {
  if (text === '' || text === undefined) {
    return ''
  }
  const initial = text.substring(0, 1).toUpperCase()
  return `${initial}${text.substring(1)}`
}

/**
 * @description captalize all letter's after spaces that is passed as an argument
 * @method captalizeAllAfterSpaces
 * @param  {string} text
 * @return {string}
 */
export const captalizeAllAfterSpaces = (text) => {
  if (text === '' || text === undefined) {
    return ''
  }
  const data = text.split(' ').map(captalize)

  return data.join(' ')
}
