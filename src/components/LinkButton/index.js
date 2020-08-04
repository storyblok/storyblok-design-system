import './link-button.scss'

const SbLinkButton = {
  name: 'SbLinkButton',

  props: {
    label: {
      type: String,
      default: 'Click'
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
    const renderLink = () => {
      h('a', {
        attrs: {
          href: this.to,
          title: this.title,
          class: buttonProps.staticClass += ' sb-link-button--link' + (this.isDisabled ? ' sb-link-button--disabled' : '')
        }
      }, [this.label])
    }

    const buttonProps = {
      staticClass: `sb-link-button sb-link-button--${this.status}` + (this.isDisabled ? ' sb-link-button--disabled' : '')
    }

    return h('button', {
      attrs: {
        class: buttonProps.staticClass
      }
    }, [renderLink()])
  }
}

export default SbLinkButton
