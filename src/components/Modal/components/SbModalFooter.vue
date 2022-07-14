<template>
  <div class="sb-modal-footer" v-bind="$attrs">
    <slot v-if="!footer" />
    <div v-else v-html="footer" />
  </div>
</template>

<script>
export default {
  name: 'SbModalFooter',

  props: {
    footer: {
      type: String,
      default: null,
    },
  },
}
</script>
