import './tab-panels.scss'

/**
 * @vue/component
 *
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
        ...this.$attrs,
        role: 'tabpanel',
        tabindex: this.activate ? 0 : -1,
        'aria-hidden': !this.activate + ''
      }
    }, this.$slots.default)
  }
}

/**
 * @vue/component
 *
 * SbTabPanels component
 *
 * SbTabPanels is a container to SbTabPanel component to perform a visualization of information by using the value property. It's good to use along with SbTabs component.
 */
const SbTabPanels = {
  name: 'SbTabPanels',

  functional: true,

  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },

  render (h, { slots, props, data }) {
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
      staticClass: 'sb-tab-panels',
      attrs: {
        ...data.$attrs
      }
    }, processChilren())
  }
}

export {
  SbTabPanels,
  SbTabPanel
}
