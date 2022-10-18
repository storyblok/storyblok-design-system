import { SbTab, SbTabAdd } from './components'
import { Tooltip } from '../../directives'

const SbTabs = {
  name: 'SbTabs',

  directives: {
    tooltip: Tooltip,
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
    value: {
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
      return this.children.length
    },
    currentIndex() {
      return this.children.findIndex((child) => {
        return this.getTabNameFromNode(child) === this.value
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
      this.children =
        this.$slots.default &&
        this.$slots.default().filter((child) => child.type.name)
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
          attrs: {
            class: 'sb-tab sb-tab__new-tab',
          },
          props: {
            label: 'New tab',
            name: 'new-tab',
            showEditInput: true,
          },
          on: {
            'edit-tab': this.handleEditTabOnCreate,
            'cancel-edit-tab': this.handleCancelEditOnCreate,
          },
        })
      )
    },

    getTabNameFromNode(vnode) {
      return vnode.props.name
    },

    triggerActiveTab(identifier) {
      this.$emit('input', identifier)
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

  render(h) {
    const children = this.$slots.default.filter((e) => e.tag) || []

    const renderAddButton = () => {
      return h(SbTabAdd, {
        props: {
          newTabLabel: this.newTabLabel,
        },
        on: {
          click: () => this.createNewTab(h),
        },
      })
    }

    const processChildren = () => {
      return children.map((element) => {
        const elementProps = element.props
        const elementId = elementProps.name

        element.props = {
          ...element.props,
          activate: elementId === this.value,
          onKeydown: this.handleKeyDown,
          onActivateTab: this.handleActiveTab,
        }

        return element
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
        attrs: {
          ...this.$attrs,
          role: 'tablist',
        },
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
