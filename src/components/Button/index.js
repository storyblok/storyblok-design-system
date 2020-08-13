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
          alt: `Is ${icon}`,
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

    const renderButton = (classes, content) => {
      return h('button', {
        attrs: {
          class: classes,
          disabled: this.isDisabled || this.isLoading,
          'aria-disabled': this.isDisabled || this.isLoading
        },
        on: {
          click: (!this.isDisabled || !this.isLoading ? $event => this.$emit('click', $event) : '')
        }
      }, content)
    }

    const buttonProps = {
      staticClass: `sb-button sb-button--${this.status} sb-button--${this.size}`
    }

    const content = []

    if (this.icon) {
      content.push(renderIcon('check'))
    }

    if (this.isDisabled) {
      buttonProps.staticClass += ' sb-button--disabled'
    }

    if (this.isLoading) {
      return renderButton(buttonProps.staticClass + ' sb-button--loading', [renderIcon('loading')])
    }

    content.push(renderLabel())

    if (!this.label) {
      buttonProps.staticClass += ' sb-button--no-label'
    }

    return renderButton(buttonProps.staticClass, content)
  }
}

export default SbButton
