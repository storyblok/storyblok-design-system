<template>
  <div class="sb-block-ui" v-bind="$attrs" :class="computedClass">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'SbBlockUi',

  props: {
    inElement: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    computedClass() {
      return {
        'sb-block-ui--in-element': this.inElement,
        'sb-block-ui--full-width': this.fullWidth,
      }
    },
  },
}
</script>
