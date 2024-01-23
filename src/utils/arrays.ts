/**
 * @method flatten
 * @param  {Array} array
 * @param  {String} key
 * @return {Array}
 */
export const flatten = (array, key) => {
  let result = []

  array.forEach(function (a) {
    result.push(a)
    if (Array.isArray(a[key])) {
      result = result.concat(flatten(a[key], key))
    }
  })

  return result
}
