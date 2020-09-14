import { isSizeValid } from '../Avatar/utils'

import './avatar-group.scss'

import { truncate } from '../../utils'

export const MoreAvatars = {
  name: 'MoreAvatars',

  functional: true,

  render (h, { props, children }) {
    const data = children.map(element => {
      const elementProps = element.componentOptions.propsData

      if (elementProps.name) {
        elementProps.name = truncate(15, elementProps.name)
      }

      element.componentOptions.propsData = {
        ...element.componentOptions.propsData,
        ...props,
        showName: true
      }

      return element
    })

    return h('div', {
      staticClass: 'sb-avatar-group__avatars'
    }, data)
  }
}

export const MoreAvatar = {
  name: 'MoreAvatar',

  functional: true,

  props: {
    label: {
      type: String
    }
  },

  render (h, { props }) {
    return h('div', {
      staticClass: 'sb-avatar-group__more'
    }, props.label)
  }
}

/**
 * SbAvatarGroup component
 *
 * SbAvatarGroup is a component to group SbAvatar
 */
const SbAvatarGroup = {
  name: 'AvatarGroup',

  functional: true,

  props: {
    size: {
      type: String,
      validator: isSizeValid
    }
  },

  render (h, { slots, props }) {
    const children = slots().default.filter(e => e.tag)
    const avatarGroupProps = {
      staticClass: 'sb-avatar-group'
    }

    if (props.size) {
      avatarGroupProps.staticClass += ` sb-avatar-group--${props.size}`
    }

    const childrenCount = children.length
    const maxElements = 6

    const data = children.map((element, index) => {
      if (maxElements && index < maxElements) {
        element.componentOptions.propsData = {
          ...element.componentOptions.propsData,
          ...props
        }

        return element
      }

      if (maxElements && index === maxElements) {
        return h(MoreAvatar, {
          props: {
            size: props.size,
            label: `+${childrenCount - maxElements}`
          }
        })
      }
    })

    const moreAvatars = children.filter((_, index) => index >= maxElements)

    return h(
      'div',
      avatarGroupProps,
      [
        data,
        moreAvatars.length > 0 ? h(
          MoreAvatars,
          { props },
          [...moreAvatars]
        ) : null
      ]
    )
  }
}

export default SbAvatarGroup
