import './button.scss'
import loading from '../../assets/icons/loading.svg'
// import { captalize } from '../../utils/captalize'

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
    }
  },

  render (h) {
    const renderIcon = () => {
      return h('img', {
        attrs: {
          alt: 'Is loading',
          src: loading
        }
      })
    }

    const buttonProps = {
      staticClass: `sb-button sb-button--${this.status}`
    }

    if (this.size) {
      buttonProps.staticClass += ` sb-button--${this.size}`
    }

    if (this.isLoading) {
      return h('button', {
        staticClass: buttonProps.staticClass + ' sb-button--loading'
      }, [renderIcon()])
    }

    return h('button', {
      attrs: {
        class: buttonProps.staticClass + (this.isDisabled ? ' sb-button--disabled' : '')
      }
    }, [this.label])
  }
}

export default SbButton
