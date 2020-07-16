/**
 * @description check if it is possible to use the DOM API
 * @type boolean
 */
export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)
