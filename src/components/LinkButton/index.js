import './link-button.scss'
import isLoading from '../../assets/icons/loading.svg'
import isCheck from '../../assets/icons/check.svg'

const SbLinkButton = {
  name: 'SbLinkButton',

  props: {
    label: {
      type: String,
      default: null
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
    },
    href: {
      type: String
    },
    as: {
      type: String,
      default: 'a'
    }
  },

  render (h) {
    const getAttrs = () => {
      const attrs = {
        title: this.title
      }

      if (this.isDisabled) {
        attrs.disabled = true
      }

      if (this.as === 'a') {
        attrs.href = this.href
      }

      return attrs
    }

    const renderIcon = (icon) => {
      const icons = {
        check: isCheck,
        loading: isLoading
      }

      return h('img', {
        attrs: {
          class: 'sb-link-button--icon',
          alt: '',
          src: Object.keys(icons)[0] === icon ? icons.check : icons.loading
        }
      })
    }

    const renderLabel = () => {
      return h('span', {
        staticClass: 'sb-link-button--label'
      }, this.label)
    }

    return h(this.as, {
      staticClass: `sb-link-button sb-link-button--${this.status}`,
      class: {
        'sb-link-button--disabled': this.isDisabled
      },
      attrs: getAttrs()
    }, [
      this.icon && renderIcon(),
      this.label && renderLabel()
    ])
  }
}

export default SbLinkButton
