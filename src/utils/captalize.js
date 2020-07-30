/**
 * @description captalize the first letter that is passed as an argument
 * @method captalize
 * @param  {string} text
 * @return {string}
 */
export const captalize = (text) => {
  const initial = text.substring(0, 1).toUpperCase()
  return `${initial}${text.substring(1)}`
}
