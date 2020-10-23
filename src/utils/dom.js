/**
 * @type {Array}
 */
export const focusableElList = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'embed',
  'iframe',
  'input:not([disabled])',
  'object',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '*[tabindex]:not([aria-disabled])',
  '*[contenteditable]'
]

/**
 * @description check if it is possible to use the DOM API
 * @type boolean
 */
export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

const focusableElSelector = focusableElList.join()

/**
 * Get a NodeList with all focusable nodes within a specific element
 * @param {HTMLElement} element HTML element to get focusable list of DOM nodes from.
 * @returns {NodeList} List of all focusable DOM nodes
 */
export function getFocusableElements (element) {
  const focusableEls = Array.from(element.querySelectorAll(focusableElSelector))

  // filter out elements with display: none

  return focusableEls.filter(
    focusableEl => window.getComputedStyle(focusableEl).display !== 'none'
  )
}
