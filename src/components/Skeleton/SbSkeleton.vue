<template>
  <PrimeSkeleton v-bind="props" :class="computedClasses" unstyled />
</template>

<script lang="ts" setup>
import PrimeSkeleton from 'primevue/skeleton'
import { computed } from 'vue'

const props = defineProps({
  shape: {
    type: String,
    default: 'rectangle',
  },
  size: {
    type: String,
    default: null,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '1rem',
  },
  borderRadius: {
    type: String,
    default: null,
  },
  animation: {
    type: String,
    default: 'wave',
  },
  pt: {
    type: Object,
    default: () => ({}),
  },
})

const computedClasses = computed(() => {
  return {
    'sb-skeleton': true,
    [`sb-skeleton--circle`]: props.shape === 'circle',
    [`sb-skeleton--none`]: props.animation === 'none',
  }
})
</script>

<style lang="scss" src="./skeleton.scss" />
