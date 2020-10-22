<template>
  <div class="sb-modal-header">
    <p class="sb-modal-header__title">
      {{ title }}
    </p>
    <slot />
  </div>
</template>

<script>

export default {
  name: 'SbModalHeader',

  props: {
    title: {
      type: String,
      default: null
    },
    align: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.sb-modal-header {
  width: 100%;

  &__title {
    font-size: $text-header;
    font-weight: $font-weight-bold;
  }
}
</style>
