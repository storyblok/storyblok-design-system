import './avatar.scss'
import avatarFallback from '../../assets/icons/avatar-fallback.svg'
import { canUseDOM } from '../../utils'
import { availableSizes, getInitials, generateRandomColor } from './utils.js'

const SbAvatar = {
  name: 'SbAvatar',

  props: {
    name: {
      type: String
    },
    size: {
      type: String,
      validator (value) {
        return availableSizes.indexOf(value) !== -1
      }
    },
    showName: {
      type: Boolean,
      default: false
    },
    src: {
      type: String
    }
  },

  data: () => ({
    isImageLoaded: false
  }),

  methods: {
    loadImage (src) {
      if (!canUseDOM) {
        return
      }

      const image = new window.Image()
      image.src = src

      image.onload = () => {
        this.isImageLoaded = true
      }

      image.onError = () => {
        this.isImageLoaded = false
      }
    }
  },

  created () {
    if (process.browser) {
      this.loadImage(this.src)
    }
  },

  render (h) {
    const avatarProps = {
      staticClass: 'sb-avatar'
    }

    if (this.size) {
      avatarProps.staticClass += ` sb-avatar--${this.size}`
    }

    const renderAvatarImage = () => {
      if (this.isImageLoaded) {
        return h('img', {
          attrs: {
            alt: this.name,
            src: this.src
          }
        })
      }

      return h('img', {
        attrs: {
          alt: this.name,
          src: avatarFallback
        }
      })
    }

    const renderName = () => {
      return h('span', {
        staticClass: 'sb-avatar__text'
      }, this.name)
    }

    const renderAvatar = () => {
      if (this.$slots.default) {
        return this.$slots.default
      }

      if (this.src) {
        return h('div', {
          staticClass: 'sb-avatar__image',
          style: {
            backgroundColor: generateRandomColor()
          }
        }, [
          renderAvatarImage()
        ])
      }

      if (this.name) {
        return h('div', {
          staticClass: 'sb-avatar__initials',
          style: {
            backgroundColor: generateRandomColor()
          }
        }, [
          h('span', getInitials(this.name))
        ])
      }
    }

    const children = [
      renderAvatar()
    ]

    if (this.showName && this.name) {
      children.push(
        renderName()
      )
    }

    return h('div', avatarProps, children)
  }
}

export default SbAvatar
