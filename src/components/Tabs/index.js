import { cleanChildren } from '../../utils'

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
    orientation: {
      type: String,
      default: 'horizontal',
      validator: val => ['horizontal', 'vertical'].includes(val)
    },
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
      children: [],
      childNodes: [],
      isAddTab: false,
      additionalTabs: []
    }
  },

  computed: {
    enableAddButton () {
      return this.showAddButton && !this.isAddTab
    },
    currentIndex () {
      return this.children.findIndex(child => {
        return this.getTabNameFromNode(child) === this.value
      })
    },
    childrenCount () {
      return this.children.length
    },
    isVertical () {
      return this.orientation === 'vertical'
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
    },
    onChangeTab (event) {
      const lastIndex = this.childrenCount - 1

      if (event.key === 'ArrowRight' && !this.isVertical) {
        const newIndex = this.currentIndex !== lastIndex
          ? this.currentIndex + 1
          : 0

        this.changeActiveTab(newIndex)
      }

      if (event.key === 'ArrowLeft' && !this.isVertical) {
        const newIndex = this.currentIndex === 0
          ? lastIndex
          : this.currentIndex - 1

        this.changeActiveTab(newIndex)
      }

      if (event.key === 'ArrowUp' && this.isVertical) {
        const newIndex = this.currentIndex === 0
          ? lastIndex
          : this.currentIndex - 1

        this.changeActiveTab(newIndex)
      }

      if (event.key === 'ArrowDown' && this.isVertical) {
        const newIndex = this.currentIndex !== lastIndex
          ? this.currentIndex + 1
          : 0

        this.changeActiveTab(newIndex)
      }

      this.$emit('keydown', event)
    },
    getTabNameFromNode (vnode) {
      return vnode.componentOptions.propsData.name
    },
    changeActiveTab (index) {
      this.childNodes[index].focus()

      const newTabName = this.getTabNameFromNode(this.children[index])
      this.emitActivateTab(newTabName)
    }
  },

  mounted () {
    this.$nextTick(() => {
      const children = this.$el.children
      this.childNodes = Object.assign({}, children)
      this.children = cleanChildren(this.$slots.default)
    })
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
          'activate-tab': this.emitActivateTab,
          'change-tab': this.onChangeTab
        }

        return element
      })
    }
    const typeTab = this.type ? `sb-tabs--${this.type}` : null

    return h('ul', {
      staticClass: 'sb-tabs',
      attrs: {
        role: 'tablist',
        ...this.$attrs
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
