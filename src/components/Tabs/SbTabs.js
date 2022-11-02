import { SbTab, SbTabAdd } from './components'
import { Tooltip } from '../../directives'
import { h } from 'vue'

const SbTabs = {
  name: 'SbTabs',

  directives: {
    tooltip: Tooltip,
  },

  emits: ['update:modelValue', 'new-tab', 'keydown'],

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
      children: [],
      childVNodes: [],
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
  },

  updated() {
    this.$nextTick(this.loadChildren)
  },

  mounted() {
    this.$nextTick(this.loadChildren)
  },

  methods: {
    loadChildren() {
      this.childVNodes = Object.assign({}, this.$el.children)
      console.log(this.$slots.default())
      this.children = this.$slots.default
        ? this.$slots.default() || this.$slots.default()[0]?.children
        : []
    },

    changeActiveTab(index) {
      this.childVNodes[index].focus()

      const newTabName = this.getTabNameFromNode(this.children[index])
      this.triggerActiveTab(newTabName)
    },

    createNewTab(h) {
      this.onAddTab = true

      this.additionalTabs.push(
        h(SbTab, {
          class: 'sb-tab sb-tab__new-tab',
          props: {
            label: 'New tab',
            name: 'new-tab',
            showEditInput: true,
            onEditTab: this.handleEditTabOnCreate,
            onCancelEditTab: this.handleCancelEditTabOnCreate,
          },
        })
      )
    },

    getTabNameFromNode(vnode) {
      return vnode.props.name
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
    const children = this.$slots.default
      ? this.$slots.default().length === 1
        ? this.$slots.default()[0]?.children
        : this.$slots.default()
      : []

    const renderAddButton = () => {
      return h(SbTabAdd, {
        newTabLabel: this.newTabLabel,
        onClick: () => this.createNewTab(h),
      })
    }

    const processChildren = () => {
      return children?.map((element) => {
        const elementProps = element.props
        const elementId = elementProps.name

        const newElement = {
          ...element,
          props: {
            ...elementProps,
            activate: elementId === this.modelValue,
            onKeydown: this.handleKeyDown,
            onActivateTab: this.handleActiveTab,
          },
        }

        return newElement
      })
    }

    return h(
      'div',
      {
        class: [
          'sb-tabs',
          {
            'sb-tabs--container': !this.isVertical && this.type === 'container',
            'sb-tabs--vertical': this.isVertical,
          },
        ],
        ...this.$attrs,
        role: 'tablist',
      },
      [
        processChildren(),
        ...this.additionalTabs,
        this.enableAddButton && renderAddButton(),
      ]
    )
  },
}

export { SbTabs }

export default SbTabs
