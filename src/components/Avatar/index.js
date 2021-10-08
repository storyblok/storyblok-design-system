import './avatar.scss'

import { canUseDOM, includes } from '../../utils'
import { isSizeValid, getInitials, generateRandomColor } from './utils.js'

import SbBadge from '../Badge'
import SbIcon from '../Icon'
import { Tooltip } from '../../directives'

const positionTypes = ['top', 'bottom']

/**
 * @vue/component
 *
 * SbAvatar component
 *
 * SbAvatar is a component to view user information or entity
 */
const SbAvatar = {
  name: 'SbAvatar',

  directives: {
    tooltip: Tooltip,
  },

  props: {
    bgColor: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    descriptionPosition: {
      type: String,
      default: 'top',
      validator: (position) => includes(positionTypes, position),
    },
    name: {
      type: String,
      default: null,
    },
    friendlyName: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
      validator: isSizeValid,
    },
    showName: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
    useTooltip: {
      type: Boolean,
      default: false,
    },
    tooltipVariant: {
      type: String,
      default: 'dark',
    },
  },

  data: () => ({
    isImageLoaded: false,
  }),

  computed: {
    backgroundColor() {
      const str = this.friendlyName ? this.friendlyName : this.name
      const saturation = 90
      const lightness = 30
      let hash = 0

      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
      }

      const h = hash % 360

      return 'hsl(' + h + ', ' + saturation + '%, ' + lightness + '%)'
    },
  },

  created() {
    if (process.browser && this.src) {
      this.loadImage(this.src)
    }
  },

  methods: {
    loadImage(src) {
      if (!canUseDOM) {
        return
      }

      const image = new window.Image()
      image.src = src

      image.onload = () => {
        this.isImageLoaded = true
      }

      image.onerror = () => {
        this.isImageLoaded = false
      }
    },
  },

  render(h) {
    const avatarProps = {
      staticClass: 'sb-avatar',
      on: {
        ...this.$listeners,
      },
    }

    if (this.size && this.size !== 'normal') {
      avatarProps.staticClass += ` sb-avatar--${this.size}`
    }

    const renderBadgeStatus = () => {
      return h(SbBadge, {
        props: {
          type: this.status,
          contract: true,
        },
      })
    }

    const renderAvatarImage = () => {
      if (this.$slots.default) {
        return this.$slots.default
      }

      if (this.isImageLoaded) {
        return h('img', {
          attrs: {
            alt: this.friendlyName ? this.friendlyName : this.name,
            src: this.src,
          },
        })
      }

      return h(SbIcon, {
        props: {
          name: 'avatar-fallback',
          size: 'large',
          color: this.bgColor || generateRandomColor(),
        },
      })
    }

    const renderName = () => {
      return h(
        'span',
        {
          staticClass: 'sb-avatar__text',
        },
        this.friendlyName ? this.friendlyName : this.name
      )
    }

    const renderDescription = () => {
      return h(
        'span',
        {
          staticClass: `sb-avatar__description sb-avatar__description--${this.descriptionPosition}`,
        },
        this.description
      )
    }

    const renderTextContainer = () => {
      const showDescription = this.showName && this.description
      const position = this.descriptionPosition

      return h(
        'div',
        {
          staticClass: 'sb-avatar__text-container',
        },
        [
          showDescription && position === 'top' && renderDescription(),
          renderName(),
          showDescription && position === 'bottom' && renderDescription(),
        ]
      )
    }

    const renderAvatar = () => {
      if (this.$slots.default || this.isImageLoaded) {
        return h(
          'div',
          {
            staticClass: 'sb-avatar__image',
            attrs: {
              ...(this.useTooltip && { tabindex: 0 }),
            },
          },
          [renderAvatarImage(), !!this.status && renderBadgeStatus()]
        )
      }

      if (this.name || this.friendlyName) {
        return h(
          'div',
          {
            staticClass: 'sb-avatar__initials',
            attrs: {
              ...(this.useTooltip && { tabindex: 0 }),
              style: 'background-color: ' + this.backgroundColor,
            },
          },
          [
            h(
              'span',
              getInitials(this.friendlyName ? this.friendlyName : this.name)
            ),
            !!this.status && renderBadgeStatus(),
          ]
        )
      }
    }

    if ((this.name || this.friendlyName) && this.useTooltip) {
      return [
        h(
          'div',
          {
            ...avatarProps,
            directives: [
              {
                name: 'tooltip',
                value: {
                  label: this.friendlyName ? this.friendlyName : this.name,
                  position: 'bottom',
                  variant: this.tooltipVariant,
                },
              },
            ],
          },
          [renderAvatar()]
        ),
      ]
    }

    const children = [renderAvatar()]

    if (this.showName && (this.name || this.friendlyName) && !this.useTooltip) {
      children.push(renderTextContainer())
    }

    return h('div', avatarProps, children)
  },
}

export default SbAvatar
