import './link-button.scss'
import isLoading from '../../assets/icons/loading.svg'
import isCheck from '../../assets/icons/check.svg'

const SbLinkButton = {
  name: 'SbLinkButton',

  props: {
    label: {
      type: String,
      default: 'Click'
    },
    to: {
      type: String,
      required: true,
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
    const renderLinkButton = () => {
      return h('button', {
        attrs: {
          class: buttonProps.staticClass
        }
      }, [renderIcon(this.icon), renderLink()])
    }

    const renderIcon = (icon) => {
      if (this.icon) {
        const icons = {
          check: isCheck,
          loading: isLoading
        }

        return h('img', {
          attrs: {
            class: 'sb-link-button--icon',
            alt: `Is ${icon}`,
            src: Object.keys(icons)[0] === icon ? icons.check : icons.loading
          }
        })
      }
      return ''
    }

    const renderLink = () => {
      if (this.to) {
        const link = h('a', {
          attrs: {
            href: this.to,
            title: this.title,
            class: buttonProps.staticClass += ' sb-link-button--link' + (this.isDisabled ? ' sb-link-button--disabled' : '')
          }
        }, this.label)

        return link
      }
    }

    const buttonProps = {
      staticClass: `sb-link-button sb-link-button--${this.status}` + (this.isDisabled ? ' sb-link-button--disabled' : '')
    }

    return renderLinkButton()
  }
}

export default SbLinkButton
