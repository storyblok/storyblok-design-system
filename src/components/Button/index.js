import './button.scss'
import SbIcon from '../Icon'

const SbButton = {
  name: 'SbButton',

  props: {
    size: {
      type: String
    },
    label: {
      type: String,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'primary'
    },
    iconBefore: {
      type: String,
      default: null
    },
    iconAfter: {
      type: String,
      default: null
    },
    isFullWidth: {
      type: Boolean,
      default: false
    },
    isRounded: {
      type: Boolean,
      default: false
    },
    hasIconOnly: {
      type: Boolean,
      default: false
    }
  },

  render (h) {
    const renderIcon = (icon) => {
      return h(SbIcon, {
        props: {
          size: 'small',
          name: this.isLoading ? 'loading' : icon
        }
      })
    }

    const renderLabel = () => {
      return h('span', {
        attrs: {
          class: 'sb-button__label'
        }
      }, this.label)
    }

    const renderButton = (content) => {
      return h('button', {
        staticClass: `sb-button sb-button--${this.type}`,
        attrs: {
          disabled: this.isDisabled,
          'aria-disabled': this.isDisabled
        },
        class: {
          'sb-button--disabled': this.isDisabled,
          'sb-button--small': this.size === 'small',
          'sb-button--large': this.size === 'large',
          'sb-button--full': this.isFullWidth,
          'sb-button--rounded': this.isRounded,
          'sb-button--has-icon-only': this.hasIconOnly,
          'sb-button--has-icon-before': this.iconBefore,
          'sb-button--has-icon-after': this.iconAfter
        },
        on: {
          click: (!this.isDisabled || !this.isLoading ? $event => this.$emit('click', $event) : '')
        }
      }, content)
    }

    if (this.isLoading) {
      return renderButton([renderIcon('loading')])
    }

    const content = [
      this.iconBefore && renderIcon(this.iconBefore),
      this.label && renderLabel(),
      this.iconAfter && renderIcon(this.iconAfter)
    ]

    return renderButton(content)
  }
}

export default SbButton
