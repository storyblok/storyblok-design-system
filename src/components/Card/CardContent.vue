<template>
  <div class="sb-card__content">
    <slot></slot>
    <div v-if="isLoading" class="sb-card__loading">
      <SbLoading size="x-large" color="primary" />
    </div>
  </div>
</template>

<script>
import SbLoading from '../Loading'
export default {
  name: 'SbCardContent',
  components: {
    SbLoading,
  },
  inject: ['cardContext'],
  computed: {
    context() {
      return this.cardContext()
    },
    isLoading() {
      return this.context.isLoading
    },
  },
}
</script>
