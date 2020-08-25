import './button.scss'
import SbIcon from '../Icon'

const SbButton = {
  name: 'SbButton',

  props: {
    size: {
      type: String,
      default: 'default'
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
    status: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: null
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
        staticClass: `sb-button sb-button--${this.status}`,
        attrs: {
          disabled: this.isDisabled,
          'aria-disabled': this.isDisabled
        },
        class: {
          'sb-button--disabled': this.isDisabled,
          'sb-button--no-label': !this.label || this.isLoading,
          'sb-button--small': this.size === 'small',
          'sb-button--large': this.size === 'large'
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
