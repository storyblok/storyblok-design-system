import './link-button.scss'
import SbIcon from '../Icon'

const SbLink = {
  name: 'SbLink',

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
    },
    iconBefore: {
      type: String,
      default: null
    },
    iconAfter: {
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
        staticClass: 'sb-link--label'
      }, this.label)
    }

    return h(this.as || 'a', {
      staticClass: `sb-link sb-link--${this.type}`,
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
