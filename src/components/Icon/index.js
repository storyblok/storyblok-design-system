import { getSvgIcon, iconSizes } from './utils'

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
    }
  },

  render (h) {
    const iconDeff = getSvgIcon(this.name)
    const sizeClass = this.size ? `sb-icon--${this.size}` : null

    return h('svg', {
      staticClass: 'sb-icon',
      class: [sizeClass],
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
