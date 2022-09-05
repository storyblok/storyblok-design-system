<template>
  <nav class="sb-breadcrumbs" aria-label="breadcrumb" :class="activeClass">
    <template v-if="items.length > 6">
      <SbBreadcrumbItem v-bind="items[0]" />
      <SbBreadcrumbSeparator />
      <SbBreadcrumbDropdown
        :items="items.slice(1, -1)"
        :active="showDropdown"
      />
      <span @click="toggleDropdown"
        ><SbBreadcrumbSeparator :active="showDropdown"
      /></span>
      <SbBreadcrumbItem v-bind="items.slice(-1)[0]" />
    </template>

    <template v-else>
      <SbBreadcrumbItem v-for="item in items" v-bind="item" :key="item.label" />
    </template>

    <slot />
  </nav>
</template>

<script>
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
  },

  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
  },
}
</script>
