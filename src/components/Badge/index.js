import './badge.scss'
import badgeError from '../../assets/icons/badge-error.svg'
import { captalize } from './utils'

const SbBadge = {
  name: 'SbBadge',

  props: {
    status: {
      type: String,
      required: true
    },
    text: {
      type: String
    },
    icon: {
      type: Boolean,
      default: false
    },
    onlyIcon: {
      type: Boolean,
      default: false
    },
    isSmall: {
      type: Boolean,
      default: false
    }
  },

  render (h) {
    const badgeProps = {
      staticClass: 'sb-badge'
    }

    const renderIcon = () => {
      return h('img', {
        attrs: {
          src: badgeError,
          class: 'sb-badge--icon',
          alt: `${captalize(this.status)} icon`
        }
      })
    }

    if (this.status) {
      badgeProps.staticClass += ` sb-badge--${this.status}`
    }

    if (this.icon) {
      return h('span', {
        staticClass: badgeProps.staticClass + ' sb-badge--text-icon'
      }, [
        renderIcon(),
        captalize(this.status)
      ])
    }

    if (this.onlyIcon) {
      return h('span', {
        staticClass: badgeProps.staticClass + ' sb-badge--small'
      }, [
        renderIcon()
      ])
    }

    if (this.isSmall) {
      return h('span', {
        staticClass: badgeProps.staticClass + (this.text.length > 1 ? ' sb-badge--medium' : ' sb-badge--small')
      }, [
        captalize(this.text)
      ])
    }

    return h('span', {
      staticClass: badgeProps.staticClass
    }, captalize(this.status))
  }
}

export default SbBadge
