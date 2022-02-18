/**
 * @type {Array<string>}
 */
export const availableSizes = ['large', 'normal', 'small']

/**
 * @type {Array<string>}
 */
export const availableColors = [
  'primary',
  'primary-dark',
  'secondary',
  'positive',
  'negative',
  'warning',
  'white',
  'green',
  'yellow',
  'blue',
  'orange',
  'light',
  'light-gray',
]

/**
 * @type {Array<string>}
 */
export const availableColorsNoWhite = availableColors.filter(
  (color) => color !== 'white'
)

/**
 * @type {Array<string>}
 */
export const availableTextColors = availableColors.map(
  (color) => `text-${color}`
)
