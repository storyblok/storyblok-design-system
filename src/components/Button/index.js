import './button.scss'
import isLoading from '../../assets/icons/loading.svg'
import isCheck from '../../assets/icons/check.svg'

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
    const renderIcon = (icon) => {
      // Remove this function when the icons component is ready
      const icons = {
        check: isCheck,
        loading: isLoading
      }

      return h('img', {
        attrs: {
          class: 'sb-button--icon',
          alt: '',
          src: Object.keys(icons)[0] === icon ? icons.check : icons.loading
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
          disabled: this.isDisabled || this.isLoading,
          'aria-disabled': this.isDisabled || this.isLoading
        },
        class: {
          'sb-button--disabled': this.isDisabled,
          'sb-button--loading': this.isLoading,
          'sb-button--no-label': !this.label,
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
