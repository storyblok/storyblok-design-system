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
    title: {
      type: String,
      default: '',
    },
    isActive: Boolean,
    showFullLabel: Boolean,

    append: Boolean,
    disabled: Boolean,
    exact: Boolean,
    link: Boolean,
    href: {
      type: String,
      default: null,
    },
    to: {
      type: [String, Object],
      default: null,
    },
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
      return {
        label: this.label,
        position: 'bottom',
      }
    },
    isTruncated() {
      const MAX_LABEL_LENGTH = 15
      return !this.showFullLabel && this.label.length > MAX_LABEL_LENGTH
    },
    labelFormatted() {
      return this.isTruncated ? this.getLabelTruncated(this.label) : this.label
    },
  },

  methods: {
    getLabelTruncated(label) {
      const LABEL_TRUNCATE_LENGTH = 13
      return `${label.slice(0, LABEL_TRUNCATE_LENGTH)}...`
    },
  },
}
</script>
