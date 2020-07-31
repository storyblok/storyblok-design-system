import './notification.scss'
import { captalize } from '../../utils/captalize'

const SbNotification = {
  name: 'SbNotification',

  props: {
    status: {
      type: String,
      default: 'general'
    },
    title: {
      type: String,
      default: 'general'
    },
    description: {
      type: String
    },
    link: {
      type: String,
      default: null
    },
    linkName: {
      type: String,
      default: null
    },
    format: {
      type: String,
      default: null
    },
    short: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    close () {
      console.log('closing notification')
    }
  },

  render (h) {
    const notificationProps = {
      staticClass: 'sb-notification'
    }

    if (this.status) {
      notificationProps.staticClass += ` sb-notification--${this.status}`
    }

    if (!this.link) {
      notificationProps.staticClass += ' sb-notification--without-link'
    }

    if (this.short) {
      notificationProps.staticClass += ' sb-notification--short'
    }

    const renderIcon = () => {
      return h('span', {
        class: 'sb-notification--icon'
      }, 'X')
    }

    const renderTitle = () => {
      return h('span', {
        staticClass: 'sb-notification--title'
      }, captalize(this.title))
    }

    const renderDescription = () => {
      if (this.description === '') {
        return
      }
      return h('p', {
        staticClass: 'sb-notification--description'
      }, captalize(this.description))
    }

    const renderLink = () => {
      if (this.link) {
        return h('a', {
          attrs: {
            href: this.link,
            target: '_blank',
            class: 'sb-notification--link'
          }
        }, (this.linkName ? captalize(this.linkName) : 'View Details'))
      }
    }

    const renderCloseBtn = () => {
      if (!this.format || this.format !== 'banner') {
        return h('button', {
          attrs: {
            class: 'sb-notification--btn'
          },
          on: {
            click: this.close
          }
        }, 'X')
      }
    }

    const notificationBody = [
      h('div', {
        staticClass: 'sb-notification--header'
      }, [
        renderIcon(),
        renderCloseBtn()
      ]),
      h('div', {
        staticClass: 'sb-notification--content'
      }, [
        renderTitle(),
        renderDescription(),
        renderLink()
      ])
    ]

    const bannerBody = [
      h('div', {
        staticClass: 'sb-notification-banner--icon'
      }, [(this.short ? '' : renderIcon())]),
      h('div', {
        staticClass: 'sb-notification-banner--header'
      }, [
        renderTitle(),
        (this.short ? '' : renderDescription())
      ]),
      h('div', {
        staticClass: 'sb-notification-banner--link'
      }, [
        renderLink(),
        (this.short ? renderCloseBtn() : renderIcon())
      ])
    ]

    if (this.format === 'banner' || this.short) {
      return h('div', {
        staticClass: notificationProps.staticClass + ' sb-notification-banner'
      }, bannerBody)
    }

    return h('div', {
      staticClass: notificationProps.staticClass
    }, notificationBody)
  }
}

export default SbNotification
