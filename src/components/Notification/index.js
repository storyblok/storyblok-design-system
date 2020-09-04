import './notification.scss'
import { captalize } from '../../utils/captalize'
import SbIcon from '../Icon'

const SbNotification = {
  name: 'SbNotification',

  props: {
    status: {
      type: String,
      default: 'general'
    },
    title: {
      type: String,
      default: 'notification'
    },
    description: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
    },
    linkName: {
      type: String,
      default: null
    },
    isBanner: {
      type: Boolean,
      default: false
    },
    isShort: {
      type: Boolean,
      default: false
    },
    isExpandable: {
      type: Boolean,
      default: false
    },
    isFull: {
      type: Boolean,
      default: false
    },
    notificationIcon: {
      type: String,
      default: null
    }
  },

  render (h) {
    const renderNotification = (content) => {
      return h('div', {
        staticClass: `sb-notification sb-notification--${this.status}`,
        class: {
          'sb-notification--banner': this.isBanner,
          'sb-notification--short': this.isShort,
          'sb-notification--expandable': this.isExpandable,
          'sb-notification--full': this.isFull
        }
      }, content)
    }

    const renderStatusIcon = () => {
      const typeOfStatusIcons = {
        general: 'info',
        success: 'checkmark',
        warning: 'warning',
        info: 'info',
        error: 'close'
      }

      return h('span', {
        staticClass: 'sb-notification--icon-container'
      }, [renderIcon(this.notificationIcon || typeOfStatusIcons[this.status], 'white')])
    }

    const renderIcon = (icon, colorName = null) => {
      return h(SbIcon, {
        props: {
          size: 'small',
          name: icon,
          color: colorName
        }
      })
    }

    const renderTitle = () => {
      if (this.title) {
        return h('span', {
          staticClass: 'sb-notification--title'
        }, captalize(this.title))
      }
      return null
    }

    const renderDescription = () => {
      if (this.description) {
        return h('div', {
          staticClass: 'sb-notification--description'
        }, captalize(this.description))
      }
      return null
    }

    const renderLink = () => {
      if (this.link) {
        return h('div', {
          staticClass: 'sb-notification--link'
        }, [
          h('a', {
            attrs: {
              href: this.link,
              target: '_blank',
              title: `Link to ${this.linkName}`
            }
          }, (this.linkName ? captalize(this.linkName) : 'View Details'),
          this.isFull ? renderIcon('chevron-right') : null)
        ])
      }
      return null
    }

    const renderCloseButton = () => {
      return h('button', {
        attrs: {
          class: 'sb-notification--btn'
        },
        on: {
          click: $event => this.$emit('click', $event)
        }
      }, [renderIcon('close')])
    }

    const renderExpandableButton = () => {
      if (this.isExpandable) {
        return h('button', {
          attrs: {
            class: 'sb-notification--expandle'
          }
        }, renderIcon('chevron-down'))
      }
      return null
    }

    const content = [
      renderStatusIcon(),
      renderTitle(),
      !(this.isFull || this.isExpandable) ? renderCloseButton() : null,
      renderDescription(),
      renderLink(),
      renderExpandableButton()
    ]

    return renderNotification(content)
  }
}

export default SbNotification
