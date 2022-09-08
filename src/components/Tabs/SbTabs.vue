<template>
  <ul
    class="sb-tabs"
    :class="{
      'sb-tabs--container': !isVertical && type === 'container',
      'sb-tabs--vertical': isVertical,
    }"
    role="tablist"
    v-bind="$attrs"
  >
    <SbTab
      v-for="tab in children"
      :key="tab.componentOptions.propsData.name"
      v-bind="tab.componentOptions.propsData"
      :activate="tab.componentOptions.propsData.name === value"
      @activate-tab="handleActiveTab"
      @keydown="handleKeyDown"
    />
    <SbTabAdd
      v-if="enableAddButton"
      :new-tab-label="newTabLabel"
      @click="createNewTab"
    />
  </ul>
</template>

<script>
import { cleanChildren } from '../../utils'
import { Tooltip } from '../../directives'

import { SbTab, SbTabAdd } from './components'

export default {
  name: 'SbTabs',

  components: {
    SbTab,
    SbTabAdd,
  },

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
      onAddTab: false,
    }
  },

  computed: {
    children() {
      return cleanChildren(this.$slots.default)
    },
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

  methods: {
    changeActiveTab(index) {
      this.$el.children[index].focus()

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
      return vnode.componentOptions.propsData.name
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
}
</script>
