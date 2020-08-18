import { getSvgIcon, iconSizes } from './utils'
import { availableColors } from '../../utils'

/**
 * SbIcon component
 *
 * SbIcon component is used for rendering icons.
 */
const SbIcon = {
  name: 'SbIcon',

  props: {
    name: String,
    size: {
      type: String,
      validator: (size) => iconSizes.indexOf(size) !== -1
    },
    role: {
      type: String,
      default: 'presentation'
    },
    color: {
      type: String,
      validator: (color) => availableColors.indexOf(color) !== -1
    }
  },

  render (h) {
    const iconDeff = getSvgIcon(this.name)
    const sizeClass = this.size ? `sb-icon--${this.size}` : null
    const colorClass = this.color ? `sb-icon--color-${this.color}` : null

    return h('svg', {
      staticClass: 'sb-icon',
      class: [sizeClass, colorClass],
      attrs: {
        role: this.role || 'presentation',
        viewBox: iconDeff.viewBox
      },
      domProps: {
        innerHTML: iconDeff.path
      }
    })
  }
}

export default SbIcon
