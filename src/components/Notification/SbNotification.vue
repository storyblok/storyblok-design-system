<template>
  <div :class="[staticClass, dynamicClass]">
    <SbIcon
      class="sb-notification--icon-container"
      :size="'small'"
      :name="icons[status]"
    ></SbIcon>
    <span v-if="title" class="sb-notification--title">
      {{ capitalizeText(title) }}</span
    >
    <div
      v-if="isExpandableAndExpanded && description"
      class="sb-notification--description"
    >
      {{ descriptionToRender }}
    </div>
    <div
      v-if="!isExpandable && description"
      class="sb-notification--description"
    >
      {{ descriptionToRender }}<slot></slot>
    </div>
    <button
      v-if="isExpandable"
      class="sb-notification--btn"
      @click="expandNotification()"
    >
      <SbIcon v-if="expanded" :size="'small'" :name="'chevron-up'"></SbIcon>
      <SbIcon v-if="!expanded" :size="'small'" :name="'chevron-down'"></SbIcon>
    </button>
    <div v-if="isExpandableAndExpanded && link" class="sb-notification--link">
      <a :href="link" target="_blank" :title="`Link to ${this.linkName}`">
        {{ linkText }}
        <SbIcon
          v-if="isFull && !isExpandable"
          :size="'small'"
          :name="'chevron-right'"
        ></SbIcon>
      </a>
    </div>
    <div v-if="link && !isExpandable" class="sb-notification--link">
      <a :href="link" target="_blank" :title="`Link to ${this.linkName}`">
        {{ linkText }}
        <SbIcon
          v-if="isFull && !isExpandable"
          :size="'small'"
          :name="'chevron-right'"
        ></SbIcon>
      </a>
    </div>
  </div>
</template>

<script>
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
      staticClass: `sb-notification sb-notification--${this.status}`,
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
    dynamicClass() {
      return {
        'sb-notification--expandable': this.expandle,
        'sb-notification--full': this.isFull,
        'sb-notification--content':
          !this.isFull &&
          !this.isExpandable &&
          (this.description || this.link || this.$slots.default),
        'sb-notification--full-content':
          this.isFull &&
          (this.description || this.link || this.$slots.default) &&
          !this.isExpandable,
      }
    },
    descriptionToRender() {
      return this.description
        ? capitalize(this.description)
        : this.$slots.default
    },
    linkText() {
      return this.linkName ? capitalize(this.linkName) : 'View Details'
    },
    isExpandableAndExpanded() {
      return this.isExpandable && this.expanded
    },
  },
  methods: {
    expandNotification() {
      this.expanded = !this.expanded
    },
    capitalizeText(text) {
      if (text) {
        return capitalize(text)
      }
    },
  },
}
</script>
