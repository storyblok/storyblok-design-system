// styles
import './group-button.scss'

import { sharedProps } from '../Button/lib'

/**
 * SbButtonGroup component
 *
 * SbButtonGroup is a component used to group buttons and links
 */
const SbButtonGroup = {
  name: 'SbButtonGroup',
  functional: true,
  props: {
    hasSpaces: {
      type: Boolean
    },
    ...sharedProps
  },

  render (h, context) {
    const { props, slots } = context
    const children = slots().default.filter(e => e.tag)

    const data = children.map(element => {
      element.componentOptions.propsData = {
        ...element.componentOptions.propsData,
        ...props
      }

      return element
    })

    return h('div', {
      staticClass: 'sb-group-button',
      class: {
        'sb-group-button--has-spaces': props.hasSpaces
      }
    }, data)
  }
}

export default SbButtonGroup
