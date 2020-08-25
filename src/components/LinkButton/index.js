import './link-button.scss'
import SbIcon from '../Icon'

const SbLinkButton = {
  name: 'SbLinkButton',

  props: {
    label: {
      type: String,
      default: null
    },
    to: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: null
    },
    href: {
      type: String
    },
    as: {
      type: String,
      default: 'a'
    }
  },

  render (h) {
    const getAttrs = () => {
      const attrs = {
        title: this.title
      }

      if (this.isDisabled) {
        attrs.disabled = true
      }

      if (this.as === 'a') {
        attrs.href = this.href
      }

      return attrs
    }

    const renderIcon = () => {
      return h(SbIcon, {
        props: {
          size: 'small',
          name: this.icon
        }
      })
    }

    const renderLabel = () => {
      return h('span', {
        staticClass: 'sb-link-button--label'
      }, this.label)
    }

    return h(this.as || 'a', {
      staticClass: `sb-link-button sb-link-button--${this.type}`,
      class: {
        'sb-link-button--disabled': this.isDisabled
      },
      attrs: getAttrs()
    }, [
      this.icon && renderIcon(),
      this.label && renderLabel()
    ])
  }
}

export default SbLinkButton
