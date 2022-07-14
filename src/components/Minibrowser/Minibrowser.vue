<template>
  <div
    class="sb-minibrowser"
    :class="{
      'sb-minibrowser--expanded': isExpanded,
      'sb-minibrowser--full-height': isFullHeight,
      'sb-minibrowser--borderless': isBorderless,
    }"
  >
    <SbMinibrowserSearch
      v-if="!hideSearch"
      :clear-search-label="clearSearchLabel"
      :value="searchInput"
      :placeholder="placeholder"
      @input="handleSearchInput"
      @keydown="handleSearchKeydown"
    />

    <div class="sb-minibrowser__list-container">
      <SbMinibrowserBreadcrumbs
        v-if="hasBreadcrumbs"
        :items="internalBreadcrumbs"
      />

      <template v-if="hasGroupedItems">
        <template v-for="(groupItem, index) in groupedItems">
          <SbMinibrowserList
            v-if="!$slots.list"
            :key="index"
            v-bind="groupItem"
          />

          <slot name="list" v-bind="groupItem" />
        </template>
      </template>

      <template v-if="hasOtherItems">
        <SbMinibrowserList v-if="!$slots.list" :items="otherItems" />

        <slot name="list" :items="otherItems" />
      </template>
    </div>

    <p v-if="hasNotFilteredElements" class="sb-minibrowser__not-found">
      {{ notFoundText }}
    </p>
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce'

import { flatten } from '../../utils'

import SbMinibrowserSearch from './components/MinibrowserSearch'
import SbMinibrowserList from './components/MinibrowserList'
import SbMinibrowserBreadcrumbs from './components/MinibrowserBreadcrumbs'

/**
 * SbMinibrowser is a visualization of a structure ‘hierarchy’. User can view and search content pages, folders etc.
 */
export default {
  name: 'SbMinibrowser',

  components: {
    SbMinibrowserSearch,
    SbMinibrowserList,
    SbMinibrowserBreadcrumbs,
  },

  provide() {
    return {
      browserContext: () => this.browserContext,
    }
  },

  props: {
    // states
    isExpanded: Boolean,
    isList: Boolean,
    isFullHeight: Boolean,
    isBorderless: Boolean,
    isLoading: Boolean,

    // options
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
    filterDebounce: {
      type: Number,
      default: 300,
    },
    notFoundPrefix: {
      type: String,
      default: 'No matches for',
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
    },

    // input properties
    clearSearchLabel: {
      type: String,
      default: 'Clear minibrowser search',
    },
    placeholder: {
      type: String,
      default: 'Search content items',
    },
    clearOnSelect: {
      type: Boolean,
      default: false,
    },
    hideSearch: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    filterHandler: null,
    searchInput: '',
  }),

  computed: {
    browserContext() {
      return {
        // browser states
        isList: this.isList || false,
        isLoading: this.isLoading || false,

        // browser methods
        clearNavigation: this.clearNavigation,
        navigateTo: this.navigateTo,
        selectItem: this.selectItem,
      }
    },

    internalItems() {
      return [...(this.options || [])]
    },

    hasNotFilteredElements() {
      return !this.isLoading && this.internalItems.length === 0
    },

    notFoundText() {
      return `${this.notFoundPrefix} "${this.searchInput}"`
    },

    groupedItems() {
      return this.internalItems.filter((item) => item.group)
    },

    hasGroupedItems() {
      return this.groupedItems.length > 0
    },

    otherItems() {
      return this.internalItems.filter((item) => !item.group)
    },

    hasOtherItems() {
      return this.otherItems.length > 0
    },

    hasBreadcrumbs() {
      return this.internalBreadcrumbs.length > 0
    },

    internalBreadcrumbs() {
      return [...(this.breadcrumbs || [])]
    },
  },

  created() {
    this.$_registerFilter()
  },

  methods: {
    /**
     * clears navigationItems property to hide the breadcrumbs
     */
    clearNavigation() {
      this.$emit('clear-navigation')
    },

    /**
     * handles input event in search input
     * @param {String} value
     */
    handleSearchInput(value) {
      this.searchInput = value

      this.filterHandler()
    },

    /**
     * handles keydown event in search input
     * @param {Event} event
     */
    handleSearchKeydown(event) {
      if (event.key === 'Escape') {
        this.$emit('close')
      } else if (event.key === 'Enter') {
        this.selectFilteredItem()
      }
    },

    /**
     * gets items, flatten and selects if only one is listed
     */
    selectFilteredItem() {
      let items = []

      // check if the groupedItems has only one element, and this element
      // has only one item in items array
      if (
        this.hasGroupedItems &&
        this.groupedItems.length === 1 &&
        this.groupedItems[0].items.length === 1
      ) {
        items = [...items, this.getDeepLeaf(this.groupedItems[0].items[0])]
      } else if (this.hasOtherItems && this.otherItems.length === 1) {
        items = [...items, ...this.otherItems]
      }

      const itemsFlatted = flatten(items, 'items')

      if (itemsFlatted.length === 1) {
        this.selectItem(itemsFlatted[0])
      }
    },

    /**
     * @method getDeepLeaf
     * @param {{items: array}} branchItem
     *
     * This method will only return the deep leaf with exactly one element
     */
    getDeepLeaf(branchItem) {
      if (branchItem.items.length === 0) {
        return branchItem
      }

      if (branchItem.items.length > 1) {
        return {}
      }

      return this.getDeepLeaf(branchItem.items[0])
    },

    /**
     * change the navigationItems and update the currentParentItem
     * property with the new item from index
     * @param {Number} index
     */
    navigateTo(index = 0) {
      this.$emit('navigate', index)
    },

    /**
     * emits the selected item and handle with item when it's a parent
     */
    selectItem(item) {
      if (this.clearOnSelect || item.isParent) {
        this.searchInput = ''
      }

      this.$emit('select-item', item)
    },

    /**
     * init the filterHandler with a triggerFilter debounced
     */
    $_registerFilter() {
      this.filterHandler = debounce(this.filterDebounce, () => {
        this.$_triggerFilter()
      })
    },

    /**
     * implement the filter logic
     */
    $_triggerFilter() {
      this.$emit('filter', { value: this.searchInput })
    },
  },
}
</script>
