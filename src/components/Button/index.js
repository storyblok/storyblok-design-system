import './button.scss'
import isLoading from '../../assets/icons/loading.svg'
import isCheck from '../../assets/icons/check.svg'

const SbButton = {
  name: 'SbButton',

  props: {
    size: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: 'Click'
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
      return h('span', {
        attrs: {
          class: 'sb-button--label'
        }
      }, this.label)
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
      staticClass: `sb-button sb-button--${this.status}`
    }

    const content = []

    if (this.size) {
      buttonProps.staticClass += ` sb-button--${this.size}`
    }

    if (this.icon) {
      content.push(renderIcon('check'))
    }

    if (this.isLoading) {
      return renderButton(buttonProps.staticClass + ' sb-button--loading', [renderIcon('loading')])
    }

    if (this.isDisabled) {
      buttonProps.staticClass += ' sb-button--disabled'
    }

    content.push(renderLabel())

    return renderButton(buttonProps.staticClass, content)
  }
}

export default SbButton
