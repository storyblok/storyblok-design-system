// styles
import './group-button.scss'

import { sharedProps } from '../Button/lib'

/**
 * @vue/component
 *
 * SbGroupButton component
 *
 * SbGroupButton is a component used to group buttons and links
 */
const SbGroupButton = {
  name: 'SbGroupButton',
  functional: true,
  props: {
    hasSpaces: {
      type: Boolean,
    },
    ...sharedProps,
  },

  render(h, context) {
    const { props, slots } = context
    const data = context.data || {}

    const children = slots().default.filter((e) => e.tag)

    const childrenData = children.map((element) => {
      element.componentOptions.propsData = {
        ...element.componentOptions.propsData,
        ...props,
      }

      return element
    })

    return h(
      'div',
      {
        staticClass: 'sb-group-button',
        class: {
          'sb-group-button--has-spaces': props.hasSpaces,
        },
        attrs: {
          ...(data.attrs || {}),
        },
      },
      childrenData
    )
  },
}

export default SbGroupButton
