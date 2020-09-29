import './tab-panels.scss'

/**
 * SbTabPanel component
 *
 * SbTabPanel is a component to show any information when it is visible.
 */
const SbTabPanel = {
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
        role: 'tabpanel',
        tabindex: this.activate ? 0 : -1,
        'aria-hidden': !this.activate + '',
        ...this.$attrs
      }
    }, this.$slots.default)
  }
}

/**
 * SbTabPanels component
 *
 * SbTabPanels is a container to SbTabPanel component to perform a visualization of information by using the value property. It's good to use along with SbTabs component.
 */
const SbTabPanels = {
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

export {
  SbTabPanels,
  SbTabPanel
}
