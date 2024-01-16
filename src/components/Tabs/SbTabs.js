import { SbTab, SbTabAdd } from './components'
import { Tooltip } from '../../directives'
import { h } from 'vue'

const SbTabs = {
  name: 'SbTabs',

  directives: {
    tooltip: Tooltip,
  },

  emits: ['update:modelValue', 'new-tab', 'keydown'],

  provide() {
    return {
      activeTab: () => this.modelValue,
      onKeyDown: this.handleKeyDown,
      onActivateTab: this.handleActiveTab,
    }
  },

  props: {
    orientation: {
      type: String,
      default: 'horizontal',
      validator: (val) => ['horizontal', 'vertical'].includes(val),
    },
    showAddButton: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: null,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    newTabLabel: {
      type: String,
      default: 'New tab',
    },
  },

  data() {
    return {
      additionalTabs: [],
      onAddTab: false,
    }
  },

  computed: {
    childrenCount() {
      return this.children?.length || 0
    },
    currentIndex() {
      return this.children.findIndex((child) => {
        return this.getTabNameFromNode(child) === this.modelValue
      })
    },
    enableAddButton() {
      return this.showAddButton && !this.onAddTab
    },
    isVertical() {
      return this.orientation === 'vertical'
    },
    children() {
      let children = this.$slots.default && this.$slots.default()
      const hasFirstNode = children && children.length > 0
      const isFirstNodeTab = children[0]?.type?.name === 'SbTab'
      if (!isFirstNodeTab && hasFirstNode && children[0].children?.length) {
        const isSecondNodeTab = children[0].children[0]?.type?.name === 'SbTab'
        if (isSecondNodeTab) {
          return children[0].children
        }
      }
      return children
    },
    childVNodes() {
      return this.$el ? this.$el.children : []
    },
  },

  methods: {
    changeActiveTab(index) {
      this.childVNodes[index].focus()

      const newTabName = this.getTabNameFromNode(this.children[index])
      this.triggerActiveTab(newTabName)
    },

    createNewTab(h) {
      this.onAddTab = true

      this.additionalTabs.push(
        h(SbTab, {
          class: 'sb-tab__new-tab',
          label: 'New tab',
          name: 'new-tab',
          showEditInput: true,
          onEditTab: this.handleEditTabOnCreate,
          onCancelEditTab: this.handleCancelEditTabOnCreate,
        }),
      )
    },

    getTabNameFromNode(vnode) {
      return vnode?.props?.name
    },

    triggerActiveTab(identifier) {
      this.$emit('update:modelValue', identifier)
    },

    handleEditTabOnCreate(content) {
      this.onAddTab = false
      this.additionalTabs = []
      this.$emit('new-tab', content)
    },

    handleCancelEditOnCreate() {
      this.onAddTab = false
      this.additionalTabs = []
    },

    handleActiveTab(identifier) {
      this.triggerActiveTab(identifier)
    },

    handleKeyDown(event) {
      const lastIndex = this.childrenCount - 1

      if (event.key === 'ArrowRight' && !this.isVertical) {
        const newIndex =
          this.currentIndex !== lastIndex ? this.currentIndex + 1 : 0

        this.changeActiveTab(newIndex)
      }

      if (event.key === 'ArrowLeft' && !this.isVertical) {
        const newIndex =
          this.currentIndex === 0 ? lastIndex : this.currentIndex - 1

        this.changeActiveTab(newIndex)
      }

      if (event.key === 'ArrowUp' && this.isVertical) {
        const newIndex =
          this.currentIndex === 0 ? lastIndex : this.currentIndex - 1

        this.changeActiveTab(newIndex)
      }

      if (event.key === 'ArrowDown' && this.isVertical) {
        const newIndex =
          this.currentIndex !== lastIndex ? this.currentIndex + 1 : 0

        this.changeActiveTab(newIndex)
      }

      if (event.key === 'Home') {
        this.changeActiveTab(0)
      }

      if (event.key === 'End') {
        this.changeActiveTab(lastIndex)
      }

      this.$emit('keydown', event)
    },
  },

  render() {
    const renderAddButton = () => {
      return h(SbTabAdd, {
        newTabLabel: this.newTabLabel,
        onClick: () => this.createNewTab(h),
      })
    }

    return h(
      'div',
      {
        ...this.$attrs,
        class: [
          'sb-tabs',
          {
            'sb-tabs--container': !this.isVertical && this.type === 'container',
            'sb-tabs--vertical': this.isVertical,
          },
        ],
        role: 'tablist',
      },
      [
        this.children,
        ...this.additionalTabs,
        this.enableAddButton && renderAddButton(),
      ],
    )
  },
}

export { SbTabs }

export default SbTabs
