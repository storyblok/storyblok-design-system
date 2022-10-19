import './tab-panels.scss'
import { h } from 'vue'

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
      default: false,
    },
    name: {
      type: [String, Number],
      required: true,
    },
  },

  render() {
    const children = this.$slots.default ? this.$slots.default() : null

    return h(
      'div',
      {
        ...this.$attrs,
        class: 'sb-tab-panel',
        role: 'tabpanel',
        tabindex: this.activate ? 0 : -1,
        'aria-hidden': !this.activate,
      },
      children
    )
  },
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

  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
  },

  render() {
    const children = this.$slots.default ? this.$slots.default() : null

    const processChildren = () => {
      return children.map((element) => {
        const elementProps = element.props
        const elementId = elementProps.name

        return {
          ...element,
          props: {
            ...elementProps,
            activate: elementId === this.modelValue,
          },
        }
      })
    }

    return h(
      'div',
      {
        ...this.$attrs,
        class: 'sb-tab-panels',
      },
      processChildren()
    )
  },
}

export { SbTabPanels, SbTabPanel }
