<template>
  <div :class="['sb-card', isLoading ? 'sb-card--loading' : '']">
    <slot></slot>
  </div>
</template>

<script>
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
  },
}
</script>
