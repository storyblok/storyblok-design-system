import './badge.scss'
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

    if (this.status) {
      badgeProps.staticClass += ` sb-badge--${this.status}`
    }

    // This function to render icons, Must be refactored to
    // return real svgs, at the moment it's an example based
    // on the font awesome

    const renderIcon = () => {
      return h('i', {
        staticClass: `fas fa-${this.status === 'success' ? 'times'
                      : this.status === 'info' ? 'info'
                      : this.status === 'warning' ? 'warning'
                      : 'error'}`
      })
    }

    if (this.icon) {
      return h('span', {
        staticClass: badgeProps.staticClass
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
        staticClass: badgeProps.staticClass + ' sb-badge--small'
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
