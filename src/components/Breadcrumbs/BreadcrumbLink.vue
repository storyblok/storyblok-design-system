<template>
  <component :is="as" v-bind="computedAttrs">
    <span v-if="label" class="sb-breadcrumbs__item-label">{{ label }}</span>
    <slot></slot>
  </component>
</template>

<script>
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
    title: String,
    target: String,
    append: Boolean,
    disabled: Boolean,
    exact: Boolean,
    exactActiveClass: String,
    link: Boolean,
    href: String,
    to: [String, Object],
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
