<template>
  <div class="sb-modal-header">
    <h1 class="sb-modal-header__title">
      {{ title }}
    </h1>
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
    icon: {
      type: String,
      default: null
    },
    align: {
      type: String,
      default: 'center'
    }
  }
}
</script>

<style lang="scss">
.sb-modal-header {
  width: 100%;
  min-height: 65px;
  margin: 0;
  padding: 35px;
  box-sizing: border-box;

  &__title {
    font-size: $text-header;
    font-weight: $font-weight-bold;
    text-align: center;
  }
}
</style>
