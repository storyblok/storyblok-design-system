import { includes, availableSizes } from '../../utils'

/**
 * @type {Array<string>}
 */
export const availableColorsPalette = [
  'primary',
  'secondary',
  'ghost',
  'danger',
]

/**
 * @type {Array<string>}
 */
export const availableButtonsTypes = ['button', 'submit', 'reset']

export const sharedProps = {
  size: {
    type: String,
    validator: (size) => includes(availableSizes, size),
  },
  colorPalette: {
    type: String,
    default: 'primary',
    validator: (type) => includes(availableColorsPalette, type),
  },
  type: {
    type: String,
    default: null,
    validator: (type) => includes(availableButtonsTypes, type),
  },
}
