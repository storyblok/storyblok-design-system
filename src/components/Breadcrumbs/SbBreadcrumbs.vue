<template>
  <nav class="sb-breadcrumbs" aria-label="breadcrumb" :class="activeClass">
    <template v-if="isLargerThanSixItems">
      <SbBreadcrumbItem v-bind="firstItem" />
      <SbBreadcrumbSeparator />
      <SbBreadcrumbDropdown :items="middleItems" :active="showDropdown" />
      <span @click="toggleDropdown">
        <SbBreadcrumbSeparator :active="showDropdown" />
      </span>
      <SbBreadcrumbItem v-bind="lastItem" />
    </template>

    <template v-else>
      <SbBreadcrumbItem v-for="item in items" v-bind="item" :key="item.label" />
    </template>

    <slot />
  </nav>
</template>

<script lang="ts">
import SbBreadcrumbItem from './BreadcrumbItem.vue'
import SbBreadcrumbSeparator from './BreadcrumbSeparator.vue'
import SbBreadcrumbDropdown from './BreadcrumbDropdown.vue'

export default {
  name: 'SbBreadcrumbs',
  components: {
    SbBreadcrumbItem,
    SbBreadcrumbSeparator,
    SbBreadcrumbDropdown,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    isLargeSection: Boolean,
  },

  data: () => ({
    showDropdown: false,
  }),

  computed: {
    activeClass() {
      return {
        'sb-breadcrumbs--large-section': this.isLargeSection,
      }
    },
    firstItem() {
      return this.items[0]
    },
    middleItems() {
      return this.items.slice(1, -1)
    },
    lastItem() {
      return this.items.slice(-1)[0]
    },
    isLargerThanSixItems() {
      return this.items.length > 6
    },
  },

  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
  },
}
</script>
