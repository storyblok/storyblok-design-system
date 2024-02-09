<template>
  <div class="sb-loading__placeholder" :style="createStyle" />
</template>
<script lang="ts">
export default {
  name: 'SbLoadingPlaceholder',
  props: {
    width: {
      type: String,
      required: true,
      default: null,
    },
    height: {
      type: String,
      required: true,
      default: null,
    },
  },
  computed: {
    createStyle() {
      return {
        width: this.width,
        height: this.height,
      }
    },
  },
}
</script>
