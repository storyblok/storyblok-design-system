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
      :clearable="clearable"
      :multiple="multiple"
      :inline="inline"
      :label="label"
      :value="value"
      :search-input="searchInput"
      :filterable="filterable"
      :item-label="itemLabel"
      :item-value="itemValue"
      :left-icon="leftIcon"
      :use-avatars="useAvatars"
      :options="options"
      :allow-create="allowCreate"
      @click="handleSelectInnerClick"
      @input="handleSearchInput"
      @emit-value="handleEmitValue"
      @close-list="hideList"
      @clear-all-values="handleClearAllValues"
      @remove-item-value="handleRemoveItemValue"
    />

    <SbSelectList
      v-if="!useMinibrowser"
      ref="list"
      :value="value"
      :search-input="searchInput"
      :item-label="itemLabel"
      :item-value="itemValue"
      :options="filteredOptions"
      :multiple="multiple"
      :use-avatars="useAvatars"
      :no-data-text="noDataText"
      :allow-create="allowCreate"
      @emit-value="handleEmitValue"
    />

    <slot name="minibrowser" />
  </div>
</template>

<script>
import { ClickOutside } from '../../directives'
import { canUseDOM, includes, toLowerCase, isString } from '../../utils'
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
    clearable: Boolean,
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
    allowCreate: Boolean,
    filterable: Boolean,
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
    noDataText: {
      type: String,
      default: 'Sorry, no result found.',
    },
  },

  data: () => ({
    isOpen: false,
    activeIndex: -1,
    listItems: [],
    innerElement: null,
    searchInput: '',
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

    selectedItem() {
      return this.options.find((option) => {
        return option[this.itemValue] === this.value
      })
    },

    useMinibrowser() {
      return this.$slots.minibrowser && this.innerElement
    },

    filteredOptions() {
      if (this.filterable && this.hasValueToSearch) {
        return this.transformedOptions.filter((opt) => {
          return includes(
            toLowerCase(opt[this.itemLabel]),
            toLowerCase(this.searchInput)
          )
        })
      }

      return this.transformedOptions
    },

    hasValueToSearch() {
      return this.searchInput && this.searchInput.length > 0
    },

    transformedOptions() {
      return this.options.map((opt) => {
        if (typeof opt === 'object') return opt
        return { [this.itemLabel]: opt, [this.itemValue]: opt }
      })
    },
  },

  watch: {
    activeIndex() {
      this.$_updateNavigation()
    },

    filteredOptions() {
      this.$nextTick(() => {
        this.$_loadListItems()
      })
    },
  },

  mounted() {
    if (this.allowCreate && (!this.filterable || !this.multiple)) {
      console.warn(
        `[SbSelect]: Note that for 'allow-create' to work, 'filterable' and 'multiple' must be true.`
      )
    } else if (this.filterable && this.inline) {
      console.warn(
        `[SbSelect]: Note that 'filterable' does not work when 'inline' is true.`
      )
    }

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
          canUseDOM &&
            this.$refs.inner.$el
              .querySelector('.sb-select-inner__input')
              .focus()
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

      this.$nextTick(() => {
        if (this.filterable && isString(this.value)) {
          this.populateSearchInput(this.value)
        }
      })
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

      this.populateSearchInput(value)
      this.$emit('input', value)
      this.$_focusInner()
      this.hideList()
    },

    /**
     * populates 'search input' variable depending on the type
     * @param {Array<String>|String} value
     */
    populateSearchInput(value) {
      if (this.inline || this.multiple) {
        this.searchInput = ''
      } else if (this.useAvatars && value) {
        this.$nextTick(() => {
          this.$nextTick(() => (this.searchInput = this.selectedItem.label))
        })
      } else {
        this.searchInput = value
      }
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
     * emit an input event to clear all selected values when multiple selection
     * or an empty string when single selection
     */
    handleClearAllValues() {
      if (this.multiple) {
        this.$emit('input', [])
        this.hideList()
        this.$_focusInner()
        return
      }

      this.searchInput = ''
      this.$emit('input', null)
      this.hideList()
      this.$_focusInner()
    },

    /**
     * set value emmited in search field
     */
    handleSearchInput(event) {
      this.searchInput = !isString(event) ? event.target.value : event
      if (this.searchInput && this.filterable) this.showList()
    },

    /**
     * set focus to first list item
     */
    focusOnFirstItem() {
      this.showList()

      this.activeIndex = 0
      this.$_updateNavigation()
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

    /**
     * force update navigation index
     */
    $_updateNavigation() {
      if (this.activeIndex !== -1) {
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
}
</script>
