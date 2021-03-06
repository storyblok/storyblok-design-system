import { includes, availableSizes } from '../../utils'

/**
 * @type {Array<string>}
 */
export const availableVariants = [
  'primary',
  'secondary',
  'ghost',
  'danger',
  'inverted-link',
  'primary-link',
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
  variant: {
    type: String,
    default: 'primary',
    validator: (type) => includes(availableVariants, type),
  },
  type: {
    type: String,
    default: null,
    validator: (type) => includes(availableButtonsTypes, type),
  },
}
