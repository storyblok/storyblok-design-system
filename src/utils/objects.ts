/**
 * @method getPropertyValue
 * @param  {Object} object
 * @param  {String} keyPath
 * @return {any}
 */
export const getPropertyValue = (object, keyPath) => {
  keyPath = keyPath.replace(/\[(\w+)\]/g, '.$1')
  keyPath = keyPath.replace(/^\./, '')
  const a = keyPath.split('.')
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i]
    if (k in object) {
      object = object[k]
    } else {
      return
    }
  }
  return object
}
