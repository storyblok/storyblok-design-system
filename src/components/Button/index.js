import './button.scss'
import isLoading from '../../assets/icons/loading.svg'
import isCheck from '../../assets/icons/check.svg'
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
          alt: `Is ${icon}`,
          src: Object.keys(icons)[0] === icon ? icons.check : icons.loading
        }
      })
    }

    const renderLabel = () => {
      return h('span', this.label)
    }

    const buttonProps = {
      staticClass: `sb-button sb-button--${this.status}`
    }

    if (this.size) {
      buttonProps.staticClass += ` sb-button--${this.size}`
    }

    if (this.icon) {
      return h('button', {
        staticClass: buttonProps.staticClass + ' sb-button--icon'
      }, [
        renderIcon('check'),
        renderLabel()
      ])
    }

    if (this.isLoading) {
      return h('button', {
        staticClass: buttonProps.staticClass + ' sb-button--loading'
      }, [renderIcon('loading')])
    }

    return h('button', {
      attrs: {
        class: buttonProps.staticClass + (this.isDisabled ? ' sb-button--disabled' : '')
      }
    }, [this.label])
  }
}

export default SbButton
