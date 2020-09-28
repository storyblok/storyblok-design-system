import { SbTab, SbTabAdd } from './components'

import './tabs.scss'

/**
 * SbTabs component
 *
 * SbTabs is a container to SbTab component to perform a tab visualization.
 */
const SbTabs = {
  name: 'SbTabs',
  props: {
    showAddButton: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number]
    }
  },

  data () {
    return {
      isAddTab: false,
      additionalTabs: []
    }
  },

  computed: {
    enableAddButton () {
      return this.showAddButton && !this.isAddTab
    }
  },

  methods: {
    addNewTab (h) {
      this.isAddTab = true

      this.additionalTabs.push(
        h(SbTab, {
          props: {
            label: 'New tab',
            name: 'new-tab',
            showEditInput: true
          },
          on: {
            'edit-tab': this.onNewTab,
            'cancel-edit-tab': this.onCancelEditTab
          }
        })
      )
    },
    onNewTab (content) {
      this.isAddTab = false
      this.additionalTabs = []
      this.$emit('new-tab', content)
    },
    onCancelEditTab () {
      this.isAddTab = false
      this.additionalTabs = []
    },
    emitActivateTab (tabName) {
      this.$emit('input', tabName)
    }
  },

  render (h) {
    const children = this.$slots.default.filter(e => e.tag) || []

    const renderAddButton = () => {
      return h(SbTabAdd, {
        on: {
          click: () => this.addNewTab(h)
        }
      })
    }

    const processChilren = () => {
      return children.map(element => {
        const elementProps = element.componentOptions.propsData
        const elementId = elementProps.name

        element.componentOptions.propsData = {
          ...element.componentOptions.propsData,
          activate: elementId === this.value
        }

        element.componentOptions.listeners = {
          ...element.componentOptions.listeners,
          'activate-tab': this.emitActivateTab
        }

        return element
      })
    }
    const typeTab = this.type ? `sb-tabs--${this.type}` : null

    return h('ul', {
      staticClass: 'sb-tabs',
      attrs: {
        role: 'tablist'
      },
      class: [typeTab]
    },
    [
      processChilren(),
      ...this.additionalTabs,
      this.enableAddButton && renderAddButton()
    ])
  }
}

export {
  SbTabs,
  SbTab
}
