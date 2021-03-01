<template>
  <div
    class="sb-minibrowser"
    :class="{
      'sb-minibrowser--expanded': this.isExpanded,
      'sb-minibrowser--full-height': this.isFullHeight,
      'sb-minibrowser--borderless': this.isBorderless,
    }"
  >
    <SbMinibrowserSearch
      :value="searchInput"
      :placeholder="placeholder"
      @input="handleSearchInput"
    />

    <div class="sb-minibrowser__list-container">
      <SbMinibrowserBreadcrumbs
        v-if="hasBreadcrumbs"
        :items="navigationItems"
      />

      <template v-if="hasGroupedItems">
        <template v-for="(groupItem, index) in groupedItems">
          <SbMinibrowserList
            v-if="!$scopedSlots.list"
            :key="index"
            v-bind="groupItem"
          />

          <slot name="list" v-bind="groupItem" />
        </template>
      </template>

      <template v-if="hasOtherItems">
        <SbMinibrowserList v-if="!$scopedSlots.list" :items="otherItems" />

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
import { toLowerCase } from '../../utils'

import SbMinibrowserSearch from './components/MinibrowserSearch'
import SbMinibrowserList from './components/MinibrowserList'
import SbMinibrowserBreadcrumbs from './components/MinibrowserBreadcrumbs'

/**
 * @description return all items in the options array recursively
 * @method flatOptions
 * @param  {Array<Object>} items
 * @return {Array<Object>}
 */
const flatOptions = (items = []) => {
  return items.reduce((acc, item) => {
    if (item.items) {
      acc = acc.concat(flatOptions(item.items))
    } else {
      acc.push(item)
    }

    return acc
  }, [])
}

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
    filterDebounce: {
      type: Number,
      default: 300,
    },
    filterMethod: {
      type: Function,
      default: null,
    },
    lazyLoadMethod: {
      type: Function,
      default: null,
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
    placeholder: {
      type: String,
      default: 'Search content items',
    },
  },

  data: () => ({
    currentParentItem: null,
    filteredItems: [],
    isOnLoadingFilter: false,
    isOnLazyLoad: false,
    navigationItems: [],
    filterHandler: null,
    searchInput: '',
  }),

  computed: {
    browserContext() {
      return {
        // browser states
        isList: this.isList || false,
        isOnFilter: this.isOnFilter || false,
        isOnLazyLoad: this.isOnLazyLoad || false,
        isOnLoadingFilter: this.isOnLoadingFilter || false,
        isLoading: this.isLoading || false,

        // browser methods
        clearNavigation: this.clearNavigation,
        navigateTo: this.navigateTo,
        selectItem: this.selectItem,
      }
    },

    internalItems() {
      if (this.isOnFilter) {
        return [...this.filteredItems]
      }

      if (this.currentParentItem) {
        return [...this.currentParentItem.items]
      }

      return [...this.options]
    },

    isOnFilter() {
      return this.searchInput && this.searchInput.length > 0
    },

    hasNotFilteredElements() {
      return this.isOnFilter && this.filteredItems.length === 0
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
      return this.navigationItems.length > 0
    },
  },

  watch: {
    currentParentItem: '$_watchCurrentParent',
  },

  mounted() {
    this.$_registerFilter()
  },

  methods: {
    /**
     * clears navigationItems property to hide the breadcrumbs
     */
    clearNavigation() {
      this.currentParentItem = null
      this.navigationItems = []

      this.$emit('clear-navigation')
    },

    /**
     * handles input event in search input
     * @param {String} value
     */
    handleSearchInput(value) {
      this.searchInput = value
      this.isOnLoadingFilter = true

      if (this.filterHandler) {
        this.filterHandler()
        return
      }

      this.filteredItems = []
      this.isOnLoadingFilter = false
    },

    /**
     * change the navigationItems and update the currentParentItem
     * property with the new item from index
     * @param {Number} index
     */
    navigateTo(index = 0) {
      this.navigationItems = this.navigationItems.filter((_, itemIndex) => {
        return itemIndex <= index
      })

      const item = this.navigationItems[index]
      this.currentParentItem = item

      this.$emit('navigate', item)
    },

    /**
     * emits the selected item and handle with item when it's a parent
     */
    selectItem(item) {
      if (item.isParent) {
        this.currentParentItem = item
        this.navigationItems.push(item)

        this.$emit('select-item', item)
        this.$emit('navigate', item)
        return
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
      if (this.filterMethod) {
        this.filterMethod(this.searchInput, (items) => {
          this.filteredItems = [...items]
          this.isOnLoadingFilter = false
        })
        return
      }

      const options = flatOptions(this.options)
      const searchText = toLowerCase(this.searchInput)

      this.filteredItems = options.filter((item) => {
        const label = toLowerCase(item.label || '')

        return label.indexOf(searchText) !== -1
      })
      this.isOnLoadingFilter = false
    },

    /**
     * watcher method to currentParentItem
     */
    $_watchCurrentParent(parentItem) {
      if (parentItem && typeof this.lazyLoadMethod === 'function') {
        this.$_triggerLazyLoad(parentItem)
      }
    },
    /**
     * trigger the lazy load logic
     */
    $_triggerLazyLoad(parentItem) {
      this.isOnLazyLoad = true

      this.lazyLoadMethod(parentItem, (items) => {
        this.currentParentItem.items = items
        this.isOnLazyLoad = false
      })
    },
  },
}
</script>
