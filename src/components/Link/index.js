// other components
import SbIcon from '../Icon'

// styles
import './link-button.scss'

/**
 * @vue/component
 *
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
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    iconRight: {
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
      if (this.label) {
        return h('span', {
          staticClass: 'sb-link__label'
        }, this.label)
      }

      if (this.$slots.default) {
        return h('span', {
          staticClass: 'sb-link__label'
        }, this.$slots.default)
      }

      return null
    }

    const getProps = () => {
      const props = {}

      if (this.as !== 'a' && this.to) {
        props.to = this.to
      }

      return props
    }

    return h(this.as || 'a', {
      staticClass: 'sb-link',
      class: {
        'sb-button--has-icon': this.icon,
        'sb-button--has-icon-right': this.iconRight
      },
      attrs: getAttrs(),
      props: getProps()
    }, [
      this.icon && renderIcon(this.icon),
      renderLabel(),
      this.iconRight && renderIcon(this.iconRight)
    ])
  }
}

export default SbLink
