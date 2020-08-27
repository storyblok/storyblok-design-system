// other components
import SbIcon from '../Icon'

// styles
import './link-button.scss'

/**
 * SbLink component
 *
 * SbLink is a component used primarly to navigation
 */
const SbLink = {
  name: 'SbLink',

  props: {
    as: {
      type: String,
      default: 'a'
    },
    label: {
      type: String,
      default: null
    },
    href: {
      type: String
    },
    iconBefore: {
      type: String,
      default: null
    },
    iconAfter: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    to: {
      type: String,
      default: null
    }
  },

  render (h) {
    const getAttrs = () => {
      const attrs = {}

      if (this.title) {
        attrs.title = this.title
      }

      if (this.as === 'a') {
        attrs.href = this.href
      }

      return attrs
    }

    const renderIcon = (icon) => {
      return h(SbIcon, {
        props: {
          size: 'small',
          name: icon
        }
      })
    }

    const renderLabel = () => {
      return h('span', {
        staticClass: 'sb-link__label'
      }, this.label)
    }

    return h(this.as || 'a', {
      staticClass: 'sb-link',
      class: {
        'sb-button--has-icon-before': this.iconBefore,
        'sb-button--has-icon-after': this.iconAfter
      },
      attrs: getAttrs()
    }, [
      this.iconBefore && renderIcon(this.iconBefore),
      this.label && renderLabel(),
      this.iconAfter && renderIcon(this.iconAfter)
    ])
  }
}

export default SbLink
