<template>
  <div
    class="sb-modal-content"
    v-bind="{...$attrs}"
  >
    <slot v-if="!modalContent" />
    <div
      v-else
      v-html="modalContent"
    />
  </div>
</template>

<script>
export default {
  name: 'SbModalContent',

  props: {
    modalContent: {
      type: [String],
      default: null
    }
  }
}
</script>

<style lang="scss">
.sb-modal-content {
  width: 100%;
  padding: 5px 0px 20px 0px;
  box-sizing: border-box;
  min-height: 30px;
  font-size: $font-size-default;
  color: $sb-dark-blue-75;
}
</style>
