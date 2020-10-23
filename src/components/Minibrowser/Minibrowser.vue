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
  </div>
</template>

<script>
import SbMinibrowserSearch from './components/MinibrowserSearch'
import SbMinibrowserListContainer from './components/MinibrowserListContainer'

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
    navigationItems: [],
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
      if (this.currentParentItem) {
        return [...this.currentParentItem.items]
      }

      return [...this.options]
    }
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
      this.searchInput = event.target.value
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
    }
  }
}
</script>
