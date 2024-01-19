<template>
  <div :class="computedClasses" @click.stop="expandNotification">
    <SbIcon
      class="sb-notification--icon-container"
      size="small"
      :name="iconStatus"
    />
    <span v-if="title" class="sb-notification--title">
      {{ capitalizedTitle }}
    </span>
    <div v-if="isDescriptionVisible" class="sb-notification--description">
      {{ descriptionToRender }}
      <slot></slot>
    </div>
    <button
      v-if="isExpandable"
      class="sb-notification--btn"
      @click.prevent.stop="expandNotification"
    >
      <SbIcon size="small" :name="chevronText" />
    </button>
    <div v-if="isLinkVisible" class="sb-notification--link">
      <a :href="link" target="_blank" :title="`Link to ${linkName}`">
        {{ linkText }}
        <SbIcon
          v-if="isFull && !isExpandable"
          size="small"
          name="chevron-right"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { capitalize } from '../../utils'
import SbIcon from '../Icon'

export default {
  name: 'SbNotification',
  components: { SbIcon },
  props: {
    status: {
      type: String,
      default: 'general',
    },
    title: {
      type: String,
      default: 'notification',
    },
    description: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
    linkName: {
      type: String,
      default: null,
    },
    isExpandable: {
      type: Boolean,
      default: false,
    },
    isFull: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      expanded: false,
      icons: {
        error: 'square-error',
        info: 'square-info',
        general: 'square-info',
        warning: 'square-warning',
        positive: 'square-success',
        negative: 'square-error',
      },
    }
  },
  computed: {
    computedClasses() {
      const hasContent = this.description || this.link || this.$slots.default
      const hasFullContent = this.isFull && !this.isExpandable && hasContent
      const isRegularContent = !this.isFull && !this.isExpandable && hasContent
      return [
        `sb-notification sb-notification--${this.status}`,
        {
          'sb-notification--expandable': this.isExpandable,
          'sb-notification--full': this.isFull,
          'sb-notification--content': isRegularContent,
          'sb-notification--full-content': hasFullContent,
        },
      ]
    },
    descriptionToRender() {
      return this.description ? capitalize(this.description) : ''
    },
    linkText() {
      return this.linkName ? capitalize(this.linkName) : 'View Details'
    },
    isExpandableAndExpanded() {
      return this.isExpandable && this.expanded
    },
    chevronText() {
      return this.expanded ? 'chevron-up' : 'chevron-down'
    },
    isDescriptionVisible() {
      return (
        (this.description || this.$slots.default) &&
        (this.isExpandableAndExpanded || !this.isExpandable)
      )
    },
    isLinkVisible() {
      return this.link && (this.isExpandableAndExpanded || !this.isExpandable)
    },
    capitalizedTitle() {
      return capitalize(this.title || '')
    },
    iconStatus() {
      return this.icons[this.status]
    },
  },
  methods: {
    expandNotification() {
      if (!this.isExpandable) return
      this.expanded = !this.expanded
    },
  },
}
</script>
