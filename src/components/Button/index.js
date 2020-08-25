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
    icon: {
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
    const renderIcon = () => {
      return h(SbIcon, {
        props: {
          size: 'small',
          name: this.isLoading ? 'loading' : this.icon
        }
      })
    }

    const renderLabel = () => {
      if (this.label) {
        return h('span', {
          attrs: {
            class: 'sb-button--label'
          }
        }, this.label)
      }
      return ''
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
          'sb-button--has-icon-only': this.hasIconOnly
        },
        on: {
          click: (!this.isDisabled || !this.isLoading ? $event => this.$emit('click', $event) : '')
        }
      }, content)
    }

    const content = []

    if (this.icon) {
      content.push(renderIcon(this.icon))
    }

    if (this.isLoading) {
      return renderButton([renderIcon('loading')])
    }

    content.push(renderLabel())

    return renderButton(content)
  }
}

export default SbButton
