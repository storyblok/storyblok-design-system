<template>
  <div class="sb-card" :class="activeClasses">
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'SbCard',
  provide() {
    return {
      cardContext: () => this.cardContext,
    }
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cardContext() {
      return {
        isLoading: this.isLoading,
      }
    },
    activeClasses() {
      return {
        'sb-card--loading': this.isLoading,
      }
    },
  },
}
</script>
