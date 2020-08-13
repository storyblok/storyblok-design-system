import './badge.scss'
import badgeError from '../../assets/icons/badge-error.svg'

const SbBadge = {
  name: 'SbBadge',

  props: {
    status: {
      type: String,
      default: 'success'
    },
    text: {
      type: String,
      default: null
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
          alt: `${this.status} icon`
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
        this.text || this.status
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
        this.text
      ])
    }

    return h('span', {
      staticClass: badgeProps.staticClass
    }, this.text || this.status)
  }
}

export default SbBadge
