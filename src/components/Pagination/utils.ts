/**
 * Build an array of SelectOptionObject
 *
 * @method buildSelectOptions
 * @param  {number} iterations how many items will be in array
 * @param  {[Function]} args a list of parameters for the factorySelectOption function
 * @return {Array<SelectOptionObject>}
 */
export const buildSelectOptions = (iterations, ...args) => {
  return [...Array(iterations).keys()].map((number) => {
    const value = number + 1
    return factorySelectOption(value, ...args)
  })
}

/**
 * The object to generate the options
 * @typedef {Object} SelectOptionObject
 * @property {(string | number)} value - option value
 * @property {(string | number)} label - option label
 * @property {string} ariaLabel - option aria-label string
 */

/**
 * @method factorySelectOption
 * @param  {any} value
 * @param  {Function} factoryAriaLabel function to use in ariaLabel property
 * @return {SelectOptionObject}
 */
export const factorySelectOption = (value, factoryAriaLabel) => {
  return {
    value: value,
    label: value,
    ariaLabel: factoryAriaLabel(value),
  }
}
