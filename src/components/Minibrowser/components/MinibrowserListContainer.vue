<template>
  <div class="sb-minibrowser__list-container">
    <SbMinibrowserBreadcrumbs v-if="hasBreadcrumbs" :items="navigationItems" />

    <template v-if="hasGroupItems">
      <SbMinibrowserList
        v-for="(groupItem, index) in groupItems"
        :key="index"
        v-bind="groupItem"
      />
    </template>

    <SbMinibrowserList v-if="hasOtherItems" :items="otherItems" />
  </div>
</template>

<script>
import SbMinibrowserBreadcrumbs from './MinibrowserBreadcrumbs'
import SbMinibrowserList from './MinibrowserList'

export default {
  name: 'SbMinibrowserListContainer',

  components: {
    SbMinibrowserList,
    SbMinibrowserBreadcrumbs,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    navigationItems: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    groupItems() {
      return this.items.filter((item) => item.group)
    },

    hasGroupItems() {
      return this.groupItems.length > 0
    },

    otherItems() {
      return this.items.filter((item) => !item.group)
    },

    hasOtherItems() {
      return this.otherItems.length > 0
    },

    hasBreadcrumbs() {
      return this.navigationItems.length > 0
    },
  },
}
</script>
