<template>
  <div class="sb-modal-content" v-bind="{ ...$attrs }">
    <slot v-if="!modalContent" />
    <div v-else v-html="modalContent" />
  </div>
</template>

<script>
export default {
  name: 'SbModalContent',

  props: {
    modalContent: {
      type: [String],
      default: null,
    },
  },
}
</script>

<style lang="scss"></style>
