import './group-button.scss'

const renderGroupButtons = (props, children, h) => {
  const data = children.map(element => {
    element.componentOptions.propsData = {
      ...element.componentOptions.propsData,
      ...props
    }

    return element
  })

  return h('div', {
    staticClass: 'sb-group-button'
  }, data)
}

const SbGroupButton = {
  name: 'SbGroupButton',
  functional: true,
  props: {
    size: {
      type: String,
      default: null
    }
  },

  render (h, context) {
    const { props, slots } = context
    const children = slots().default.filter(e => e.tag)

    return renderGroupButtons(props, children, h)
  }
}

export default SbGroupButton
