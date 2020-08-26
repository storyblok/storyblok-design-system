import './group-button.scss'

const SbButtonGroup = {
  name: 'SbButtonGroup',
  functional: true,
  props: {
    size: {
      type: String
    },
    hasSpaces: {
      type: Boolean
    },
    type: {
      type: String
    }
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
