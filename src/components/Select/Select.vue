<template>
  <div
    v-click-outside="wrapClose"
    class="sb-select"
    :class="{
      'sb-select--multiple': multiple,
      'sb-select--inline': inline,
    }"
    :aria-expanded="isOpen ? 'true' : 'false'"
  >
    <SbSelectInner
      ref="inner"
      :multiple="multiple"
      :inline="inline"
      :label="label"
      :value="value"
      :item-label="itemLabel"
      :item-value="itemValue"
      :left-icon="leftIcon"
      :use-avatars="useAvatars"
      :options="options"
      @click="handleSelectInnerClick"
      @clear-all-values="handleClearAllValues"
      @remove-item-value="handleRemoveItemValue"
    />

    <SbSelectList
      v-if="!useMinibrowser"
      ref="list"
      :value="value"
      :item-label="itemLabel"
      :item-value="itemValue"
      :options="options"
      :multiple="multiple"
      :filterable="filterable"
      :filter-placeholder="filterPlaceholder"
      :use-avatars="useAvatars"
      @emit-value="handleEmitValue"
    />

    <slot name="minibrowser" />
  </div>
</template>

<script>
import { ClickOutside } from '../../directives'
import { canUseDOM, includes } from '../../utils'
import SbSelectInner from './components/SelectInner'
import SbSelectList from './components/SelectList'

export default {
  name: 'SbSelect',

  directives: {
    ClickOutside,
  },

  components: {
    SbSelectInner,
    SbSelectList,
  },

  provide() {
    return {
      selectContext: () => this.selectContext,
    }
  },

  props: {
    // component props
    value: {
      type: [String, Number, Array],
      default: null,
    },
    multiple: Boolean,

    // inner props
    label: {
      type: String,
      default: '',
      required: true,
    },
    leftIcon: {
      type: String,
      default: null,
    },

    // list props
    options: {
      type: Array,
      default: () => [],
    },
    filterable: Boolean,
    filterPlaceholder: {
      type: String,
      default: 'Filter options',
    },
    inline: Boolean,
    useAvatars: Boolean,
    itemLabel: {
      type: String,
      default: 'label',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
  },

  data: () => ({
    isOpen: false,
    activeIndex: -1,
    listItems: [],
    innerElement: null,
  }),

  computed: {
    selectContext() {
      return {
        // controls elements
        activeIndex: this.activeIndex,
        listItems: this.listItems,

        // methods to control the menu state
        hideList: this.hideList,
        showList: this.showList,
        toggleMenu: this.toggleMenu,
        focusAtIndex: this.focusAtIndex,
        focusOnFirstItem: this.focusOnFirstItem,
        focusOnLastItem: this.focusOnLastItem,
      }
    },

    useMinibrowser() {
      return this.$slots.minibrowser && this.innerElement
    },
  },

  watch: {
    activeIndex(index) {
      if (index !== -1) {
        this.$nextTick(() => {
          this.listItems[this.activeIndex] &&
            this.listItems[this.activeIndex].focus()

          this.$_updateTabIndex(this.activeIndex)
        })

        return
      }

      this.$nextTick(() => {
        this.$_focusInner()

        this.$_resetTabIndex()
      })
    },
  },

  mounted() {
    this.$_loadListItems()

    this.$nextTick(() => {
      this.innerElement = this.$refs.inner.$el
    })
  },

  methods: {
    /**
     * shows the items list
     */
    showList() {
      this.isOpen = true
      this.$emit('show')

      if (this.filterable) {
        this.$nextTick(() => {
          canUseDOM && document.querySelector('input[type="search"]').focus()
        })
        return
      }

      this.activeIndex = 0
    },

    /**
     * handle when click-outside is activated and close the list
     */
    wrapClose() {
      this.hideList()
    },

    /**
     * hides the items list
     */
    hideList() {
      this.isOpen = false
      this.$emit('hide')
      this.activeIndex = -1
    },

    /**
     * shows or hides the items list according to internal state
     */
    handleSelectInnerClick() {
      if (this.isOpen) {
        this.hideList()
      } else {
        this.showList()
      }
    },

    /**
     * emits the input event to make this component compatible with v-model directive
     * @param {Array<String>|String} value
     */
    handleEmitValue(value) {
      // doesn't close the list
      if (this.multiple) {
        this.$emit('input', this.processMultipleValue(value))
        return
      }

      this.$emit('input', value)
      this.$_focusInner()
      this.isOpen = false
    },

    /**
     * returns the processed value to input event
     * @param {String} value
     */
    processMultipleValue(value) {
      if (includes(this.value, value)) {
        return this.value.filter((val) => val !== value)
      }

      return [...(this.value || []), value]
    },

    /**
     * emit an input event with the item from tag that was removed
     * @param {String} itemValue
     */
    handleRemoveItemValue(itemValue) {
      if (this.multiple) {
        this.$emit('input', this.processMultipleValue(itemValue))
        this.$_focusInner()
      }
    },

    /**
     * emit an input event to clear all selected values
     */
    handleClearAllValues() {
      if (this.multiple) {
        this.$emit('input', [])
        this.hideList()
        this.$_focusInner()
      }
    },

    /**
     * set focus to first list item
     */
    focusOnFirstItem() {
      this.showList()

      this.activeIndex = 0
    },

    /**
     * set focus to last list item
     */
    focusOnLastItem() {
      this.showList()

      this.activeIndex = this.listItems.length - 1
    },

    /**
     * set focus a specific list item index
     * @param {Number} index Position index of menu list item
     */
    focusAtIndex(index) {
      this.$_updateTabIndex(index)

      this.activeIndex = index
    },

    /**
     * updates tab index for list items
     * @param {Number} index Position index of menu list item
     */
    $_updateTabIndex(index) {
      if (this.listItems.length > 0) {
        const nodeAtIndex = this.listItems[index]

        this.listItems.forEach((node) => {
          if (node !== nodeAtIndex) {
            node.setAttribute('tabindex', -1)
          }
        })
        nodeAtIndex.setAttribute('tabindex', 0)
      }
    },

    /**
     * set all list items to tabindex -1
     */
    $_resetTabIndex() {
      if (this.listItems.length > 0) {
        this.listItems.forEach((node) => {
          node.setAttribute('tabindex', -1)
        })
      }
    },

    /**
     * set focus to trigger button element
     */
    $_focusInner() {
      canUseDOM && this.$refs.inner.$el.focus()
    },

    /**
     * get all list item elements
     */
    $_loadListItems() {
      if (!this.useMinibrowser) {
        const menuNode = canUseDOM && this.$refs.list.$el

        if (menuNode) {
          this.listItems = menuNode.querySelectorAll('li')
        }
      }
    },
  },
}
</script>
