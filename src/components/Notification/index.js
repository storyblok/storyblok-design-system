import './notification.scss'
import { capitalize } from '../../utils'
import SbIcon from '../Icon'
import SbBadge from '../Badge'

// @vue/component
const SbNotification = {
  name: 'SbNotification',

  props: {
    status: {
      type: String,
      default: 'general',
    },
    title: {
      type: String,
      default: 'notification',
    },
    description: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
    linkName: {
      type: String,
      default: null,
    },
    isExpandable: {
      type: Boolean,
      default: false,
    },
    isFull: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      expandle: false,
    }
  },

  methods: {
    expandleNotification() {
      this.expandle = !this.expandle
    },
  },

  render(h) {
    const renderNotification = (content) => {
      return h(
        'div',
        {
          staticClass: `sb-notification sb-notification--${this.status}`,
          class: {
            'sb-notification--expandable': this.expandle,
            'sb-notification--full': this.isFull,
            'sb-notification--content':
              !this.isFull &&
              !this.isExpandable &&
              (this.description || this.link || this.$slots.default),
            'sb-notification--full-content':
              this.isFull &&
              (this.description || this.link || this.$slots.default) &&
              !this.isExpandable,
          },
        },
        content
      )
    }

    const renderStatusIcon = () => {
      return h(SbBadge, {
        staticClass: 'sb-notification--icon-container',
        props: {
          onlyIcon: true,
          type: this.status === 'general' ? 'info' : this.status,
        },
      })
    }

    const renderIcon = (icon) => {
      return h(SbIcon, {
        props: {
          size: 'small',
          name: icon,
        },
      })
    }

    const renderTitle = () => {
      if (this.title) {
        return h(
          'span',
          {
            staticClass: 'sb-notification--title',
          },
          capitalize(this.title)
        )
      }
      return null
    }

    const renderDescription = () => {
      if (this.description || this.$slots.default) {
        const toRender = this.description
          ? capitalize(this.description)
          : this.$slots.default
        return h(
          'div',
          {
            staticClass: 'sb-notification--description',
          },
          toRender
        )
      }
      return null
    }

    const renderLink = () => {
      if (this.link) {
        return h(
          'div',
          {
            staticClass: 'sb-notification--link',
          },
          [
            h(
              'a',
              {
                attrs: {
                  href: this.link,
                  target: '_blank',
                  title: `Link to ${this.linkName}`,
                },
              },
              [
                this.linkName ? capitalize(this.linkName) : 'View Details',
                this.isFull && !this.isExpandable
                  ? renderIcon('chevron-right')
                  : null,
              ]
            ),
          ]
        )
      }
      return null
    }

    const renderActionButton = (action = null) => {
      return h(
        'button',
        {
          attrs: {
            class: 'sb-notification--btn',
          },
          on: {
            click:
              action === 'close'
                ? ($event) => this.$emit('click', $event)
                : this.expandleNotification,
          },
        },
        [
          action === 'close'
            ? [renderIcon('close')]
            : this.expandle
            ? renderIcon('chevron-up')
            : renderIcon('chevron-down'),
        ]
      )
    }

    const discoverButtonToRender = () => {
      if (this.isExpandable) {
        return renderActionButton()
      }
      if (this.isFull && this.link) {
        return renderLink()
      }
    }

    if (this.isExpandable && !this.expandle) {
      const fitContent = [
        renderStatusIcon(),
        renderTitle(),
        discoverButtonToRender(),
      ]
      return renderNotification(fitContent)
    }

    const content = [
      renderStatusIcon(),
      renderTitle(),
      discoverButtonToRender(),
      renderDescription(),
      !this.isFull ? renderLink() : null,
      this.isFull && this.isExpandable ? renderLink() : null,
    ]

    return renderNotification(content)
  },
}

export default SbNotification
