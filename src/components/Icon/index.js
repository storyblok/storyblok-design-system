import './icon.scss'

import { getSvgIcon, iconSizes } from './utils'
import { availableColors } from '../../utils'

/**
 * @vue/component
 *
 * SbIcon component
 *
 * SbIcon component is used for rendering icons.
 */
const SbIcon = {
  name: 'SbIcon',

  props: {
    color: {
      type: String,
      default: null,
      validator: (color) => availableColors.indexOf(color) !== -1,
    },
    name: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: 'presentation',
    },
    size: {
      type: String,
      default: null,
      validator: (size) => iconSizes.indexOf(size) !== -1,
    },
  },

  render(h) {
    const iconDeff = getSvgIcon(this.name)
    const sizeClass = this.size ? `sb-icon--${this.size}` : null
    const colorClass = this.color ? `sb-icon--color-${this.color}` : null

    return h('svg', {
      staticClass: 'sb-icon',
      class: [sizeClass, colorClass],
      attrs: {
        role: this.role || 'presentation',
        viewBox: iconDeff.viewBox,
      },
      domProps: {
        innerHTML: iconDeff.path,
      },
      on: {
        ...this.$listeners,
      },
    })
  },
}

export default SbIcon
