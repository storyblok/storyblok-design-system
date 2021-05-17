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
      :clear-search-label="clearSearchLabel"
      :value="searchInput"
      :placeholder="placeholder"
      @input="handleSearchInput"
    />

    <div class="sb-minibrowser__list-container">
      <SbMinibrowserBreadcrumbs
        v-if="hasBreadcrumbs"
        :items="internalBreadcrumbs"
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
      if (this.clearOnSelect) {
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
