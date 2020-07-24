/**
 * Wait for given ms
 *
 * @param {number} duration
 */
export const waitMs = (ms = 0) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
