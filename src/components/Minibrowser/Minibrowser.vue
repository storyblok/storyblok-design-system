<template>
  <div
    class="sb-minibrowser"
    :class="{
      'sb-minibrowser--expanded': this.isExpanded
    }"
  >
    <SbMinibrowserSearch
      :value="searchInput"
      :placeholder="placeholder"
      @input="handleSearchInput"
    />

    <SbMinibrowserListContainer
      :items="internalItems"
      :navigation-items="navigationItems"
    />

    <p
      v-if="hasNotFilteredElements"
      class="sb-minibrowser__not-found"
    >
      {{ notFoundMessage }}
    </p>
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce'
import { toLowerCase } from '../../utils'

import SbMinibrowserSearch from './components/MinibrowserSearch'
import SbMinibrowserListContainer from './components/MinibrowserListContainer'

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

export default {
  name: 'SbMinibrowser',

  components: {
    SbMinibrowserSearch,
    SbMinibrowserListContainer
  },

  provide () {
    return {
      browserContext: () => this.browserContext
    }
  },

  props: {
    // states
    isExpanded: Boolean,
    isList: Boolean,

    // options
    filterDebounce: {
      type: Number,
      default: 300
    },
    filterMethod: {
      type: Function,
      default: null
    },
    lazyLoadMethod: {
      type: Function,
      default: null
    },
    notFoundMessage: {
      type: String,
      default: 'There are no elements'
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },

    // input properties
    placeholder: {
      type: String,
      default: 'Search content items'
    }
  },

  data: () => ({
    currentParentItem: null,
    filteredItems: [],
    isOnFilter: false,
    isOnLazyLoad: false,
    navigationItems: [],
    filterHandler: null,
    searchInput: ''
  }),

  computed: {
    browserContext () {
      return {
        // browser states
        isList: this.isList || false,

        // browser methods
        clearNavigation: this.clearNavigation,
        navigateTo: this.navigateTo,
        selectItem: this.selectItem
      }
    },

    internalItems () {
      if (this.isOnFilter) {
        return [...this.filteredItems]
      }

      if (this.currentParentItem) {
        return [...this.currentParentItem.items]
      }

      return [...this.options]
    },

    hasNotFilteredElements () {
      return this.isOnFilter && this.filteredItems.length === 0
    }
  },

  watch: {
    currentParentItem: '$_watchCurrentParent'
  },

  mounted () {
    this.$_registerFilter()
  },

  methods: {
    /**
     * clears navigationItems property to hide the breadcrumbs
     */
    clearNavigation () {
      this.currentParentItem = null
      this.navigationItems = []

      this.$emit('clear-navigation')
    },

    /**
     * handles input event in search input
     */
    handleSearchInput (event) {
      const value = event.target.value
      this.searchInput = value
      this.isOnFilter = true

      if (value && this.filterHandler) {
        this.filterHandler()
        return
      }

      this.filteredItems = []
      this.isOnFilter = false
    },

    /**
     * change the navigationItems and update the currentParentItem
     * property with the new item from index
     * @param {Number} index
     */
    navigateTo (index = 0) {
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
    selectItem (item) {
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
    $_registerFilter () {
      this.filterHandler = debounce(this.filterDebounce, () => {
        this.$_triggerFilter()
      })
    },

    /**
     * implement the filter logic
     */
    $_triggerFilter () {
      if (this.filterMethod) {
        this.filterMethod(this.searchInput, items => {
          this.filteredItems = [...items]
        })
        return
      }

      const options = flatOptions(this.options)
      const searchText = toLowerCase(this.searchInput)

      this.filteredItems = options.filter(item => {
        const label = toLowerCase(item.label || '')

        return label.indexOf(searchText) !== -1
      })
    },

    /**
     * watcher method to currentParentItem
     */
    $_watchCurrentParent (parentItem) {
      if (parentItem && typeof this.lazyLoadMethod === 'function') {
        this.$_triggerLazyLoad(parentItem)
      }
    },
    /**
     * trigger the lazy load logic
     */
    $_triggerLazyLoad (parentItem) {
      this.isOnLazyLoad = true

      this.lazyLoadMethod(parentItem, items => {
        this.currentParentItem.items = items
        this.isOnLazyLoad = false
      })
    }
  }
}
</script>
