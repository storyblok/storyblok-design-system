/**
 * @method includes
 * @param  {Array|String} iterable
 * @param  {any} value
 * @return {Boolean}
 *
 * @examples
 * includes('abcde', 'ab') // true
 * includes([1, 2, 3, 4], 1) // true
 */
export const includes = (iterable, value) => {
  if (iterable?.indexOf) {
    return iterable?.indexOf(value) !== -1
  }

  return false
}

/**
 * @method  isArray
 * @param   {any} value
 * @returns {Boolean}
 */
export const isArray = (value) => Array.isArray(value)
