import { isSizeValid } from '../Avatar/utils'

import './avatar-group.scss'

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

    return h('div', avatarGroupProps, [data])
  }
}

export default SbAvatarGroup
