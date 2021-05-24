import { getRandomNumber } from './number'

/**
 * @method truncate
 * @param  {Number} letters max letters numbers
 * @param  {String} word    word to analyze
 * @return {String} truncated word
 */
export const truncate = (letters, word) => {
  if (word.length > letters) {
    return word.slice(0, letters) + '...'
  }

  return word
}

/**
 * @method randomString
 * @param  {Number} length
 * @return {String}
 */
export const randomString = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(getRandomNumber(0, chars.length))
  }

  return result
}

/**
 * @method toLowerCase
 * @param  {String}       text
 * @return {String}
 */
export const toLowerCase = (text = '') => {
  if (typeof text === 'string') {
    return text.toLowerCase()
  }

  return text
}

/**
 * @method isString
 * @param  {any} value
 * @return {Boolean}
 */
export const isString = (value) => typeof value === 'string'
