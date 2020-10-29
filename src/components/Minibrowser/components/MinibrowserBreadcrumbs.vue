<template>
  <div class="sb-minibrowser__breadcrumbs">
    <SbBreadcrumbs>
      <SbBreadcrumbItem label="Global" @click="clearNavigation" />

      <SbBreadcrumbSeparator />

      <template v-for="(item, index) in breadcrumbItems">
        <SbBreadcrumbItem
          :key="index"
          :is-active="index === lastIndex"
          v-bind="item"
          @click="navigateTo($event, index)"
        />

        <SbBreadcrumbSeparator
          v-if="index < lastIndex"
          :key="`separator-${index}`"
        />
      </template>
    </SbBreadcrumbs>
  </div>
</template>

<script>
import {
  SbBreadcrumbs,
  SbBreadcrumbItem,
  SbBreadcrumbSeparator,
} from '../../Breadcrumbs'

export default {
  name: 'SbMinibrowserBreadcrumbs',
  components: {
    SbBreadcrumbs,
    SbBreadcrumbItem,
    SbBreadcrumbSeparator,
  },

  inject: ['browserContext'],

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    context() {
      return this.browserContext()
    },

    breadcrumbItems() {
      return this.items.map((navItem) => {
        return {
          label: navItem.label,
          href: navItem.label,
          title: navItem.label,
        }
      })
    },

    lastIndex() {
      return this.breadcrumbItems.length - 1
    },
  },

  methods: {
    /**
     * fires the clearNavigation method in the SbMinibrowser component
     */
    clearNavigation() {
      this.context.clearNavigation()
    },

    /**
     * fires the navigateTo method in the SbMinibrowser component
     * @param {Event} event
     * @param {Number} index
     */
    navigateTo(event, index = 0) {
      event.preventDefault()
      event.stopPropagation()
      this.context.navigateTo(index)
    },
  },
}
</script>
