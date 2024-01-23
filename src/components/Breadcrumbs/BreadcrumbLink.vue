<template>
  <component :is="as" v-bind="computedAttrs">
    <span v-if="label" class="sb-breadcrumbs__item-label">{{ label }}</span>
    <slot></slot>
  </component>
</template>

<script lang="ts">
export default {
  name: 'SbBreadcrumbLink',
  props: {
    as: {
      type: String,
      default: 'a',
    },
    label: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: '',
    },
    append: Boolean,
    disabled: Boolean,
    exact: Boolean,
    exactActiveClass: {
      type: String,
      default: '',
    },
    link: Boolean,
    href: {
      type: String,
      default: '',
    },
    to: {
      type: [String, Object],
      default: null,
    },
    replace: Boolean,
  },

  computed: {
    computedAttrs() {
      if (this.href) {
        return {
          title: this.title,
          href: this.href,
          target: this.target,
        }
      }

      return this.$props
    },
  },
}
</script>
