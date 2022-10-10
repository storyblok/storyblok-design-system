<template>
  <li class="sb-breadcrumbs__item">
    ...
    <ul v-if="active" class="sb-breadcrumbs__dropdown">
      <SbBreadcrumbItem v-for="item in items" v-bind="item" :key="item.label" />
    </ul>
  </li>
</template>

<script>
import SbBreadcrumbItem from './BreadcrumbItem'

export default {
  name: 'SbBreadcrumbDropdown',
  components: {
    SbBreadcrumbItem,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    active: Boolean,
  },
}
</script>
