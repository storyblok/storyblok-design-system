<template>
  <div
    class="sb-modal-footer"
    v-on="$listeners"
  >
    <slot v-if="!footer" />
    <div
      v-else
      v-html="footer"
    />
  </div>
</template>

<script>
export default {
  name: 'SbModalFooter',

  props: {
    footer: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">

</style>
