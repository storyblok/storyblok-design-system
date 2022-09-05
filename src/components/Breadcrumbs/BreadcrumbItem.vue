<template>
  <li
    v-tooltip="computedTooltip"
    class="sb-breadcrumbs__item"
    :class="activeClass"
    :aria-current="computedCurrent"
  >
    <SbBreadcrumbLink
      v-if="!isActive"
      :title="title"
      :href="href"
      :to="to"
      :as="as"
      :label="labelFormatted"
      v-on="$listeners"
    >
      <slot></slot>
    </SbBreadcrumbLink>
    <template v-else>
      <span class="sb-breadcrumbs__item-label">{{ labelFormatted }}</span>
      <slot></slot>
    </template>
  </li>
</template>

<script>
import { Tooltip } from '../../directives'
import SbBreadcrumbLink from './BreadcrumbLink'

export default {
  name: 'SbBreadcrumbItem',
  components: {
    SbBreadcrumbLink,
  },
  directives: {
    tooltip: Tooltip,
  },
  props: {
    as: {
      type: String,
      default: 'a',
    },
    label: {
      type: String,
      default: '',
    },

    title: String,
    target: String,
    isActive: Boolean,
    showFullLabel: Boolean,

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
    activeClass() {
      return {
        'sb-breadcrumbs__item--active': this.isActive,
      }
    },
    computedCurrent() {
      return this.isActive ? 'page' : null
    },
    computedTooltip() {
      if (!this.isTruncated) return ''
      return [
        {
          name: 'tooltip',
          value: {
            label: this.label,
            position: 'bottom',
          },
        },
      ]
    },
    isTruncated() {
      return !this.showFullLabel && this.label.length > 15
    },
    labelFormatted() {
      return this.isTruncated ? this.getLabelTruncated(this.label) : this.label
    },
  },

  methods: {
    getLabelTruncated(label) {
      return `${label.slice(0, 13)}...`
    },
  },
}
</script>

<style lang="scss">
.sb-breadcrumbs__item {
  display: inline-flex;
  color: $primary-text-color;
  font-size: $font-13;

  &--active {
    color: $color-primary-dark;
  }

  a {
    color: $primary-text-color;
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }
}
</style>
