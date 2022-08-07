<template>
  <div class="sb-card__content">
    <slot></slot>
    <div v-if="cardContext().isLoading" class="sb-card__loading">
      <SbLoading color="primary" size="x-large" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SbCardContent',
  inject: ['cardContext'],
}
</script>
