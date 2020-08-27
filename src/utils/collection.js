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
  if (typeof iterable.indexOf === 'function') {
    return iterable.indexOf(value)
  }

  return false
}
