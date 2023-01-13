<template>
  <div class="sb-minibrowser__breadcrumbs">
    <SbBreadcrumbs>
      <SbBreadcrumbItem
        title="Back to root content directory"
        href="#"
        @click="clearNavigation"
      >
        <SbIcon name="home" />
      </SbBreadcrumbItem>

      <SbBreadcrumbSeparator />

      <template v-for="(item, index) in items" :key="index">
        <SbBreadcrumbItem
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

    lastIndex() {
      return this.items.length - 1
    },
  },

  methods: {
    /**
     * fires the clearNavigation method in the SbMinibrowser component
     */
    clearNavigation(event) {
      event.preventDefault()
      event.stopPropagation()
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
