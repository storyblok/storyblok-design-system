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

  inject: ['activeTab'],

  props: {
    name: {
      type: [String, Number],
      required: true,
    },
  },

  render() {
    const isActive = this.activeTab() === this.name

    return h(
      'div',
      {
        ...this.$attrs,
        class: 'sb-tab-panel',
        role: 'tabpanel',
        tabindex: isActive ? 0 : -1,
        'aria-hidden': !isActive,
      },
      isActive ? this.$slots.default() : null,
    )
  },
}

/**
 * @vue/component
 *
 * SbTabPanels component
 *
 * SbTabPanels is a container to SbTabPanel component to perform a visualization of information by using the value property. It's good to use along with component.
 */
const SbTabPanels = {
  name: 'SbTabPanels',

  provide() {
    return {
      activeTab: () => this.modelValue,
    }
  },

  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
  },

  render() {
    return h(
      'div',
      {
        ...this.$attrs,
        class: 'sb-tab-panels',
      },
      this.$slots.default(),
    )
  },
}

export { SbTabPanels, SbTabPanel }
