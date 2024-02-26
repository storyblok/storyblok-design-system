/**
 * @type {Array<string>}
 */
export const availableSizes = ['large', 'normal', 'small']

/**
 * @type {Array<string>}
 */
export const availableColors = [
  'white',
  'green',
  'yellow',
  'blue',
  'dark-blue',
  'gray',
  'teal',
]

/**
 * @type {Array<string>}
 */
export const availableColorsNoWhite = availableColors.filter(
  (color) => color !== 'white',
)

/**
 * @type {Array<string>}
 */
export const availableTextColors = availableColors.map(
  (color) => `text-${color}`,
)
