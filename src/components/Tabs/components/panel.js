export const SbTabPanels = {
  name: 'SbTabPanels',

  functional: true,

  value: {
    type: [String, Number],
    required: true
  },

  render (h, { slots, props }) {
    const children = slots().default.filter(e => e.tag) || []

    const processChilren = () => {
      return children.map(element => {
        const elementProps = element.componentOptions.propsData
        const elementId = elementProps.name

        element.componentOptions.propsData = {
          ...element.componentOptions.propsData,
          activate: elementId === props.value
        }

        return element
      })
    }

    return h('div', {
      staticClass: 'sb-tab-panels'
    }, processChilren())
  }
}

export const SbTabPanel = {
  name: 'SbTabPanel',
  props: {
    activate: {
      type: Boolean,
      default: false
    },
    name: {
      type: [String, Number],
      required: true
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'sb-tab-panel',
      attrs: {
        'aria-hidden': !this.activate + ''
      }
    }, this.$slots.default)
  }
}
