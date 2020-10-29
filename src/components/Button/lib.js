import { includes, availableSizes } from '../../utils'

/**
 * @type {Array<string>}
 */
export const availableTypes = ['primary', 'secondary', 'ghost', 'danger']

export const sharedProps = {
  size: {
    type: String,
    validator: (size) => includes(availableSizes, size),
  },
  type: {
    type: String,
    default: 'primary',
    validator: (type) => includes(availableTypes, type),
  },
}
