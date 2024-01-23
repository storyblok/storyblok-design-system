<template>
  <div class="sb-modal-footer" v-bind="$attrs">
    <slot v-if="!footer" />
    <div v-else v-html="sanitizedContent" />
  </div>
</template>

<script lang="ts">
import DOMPurify from 'dompurify'

export default {
  name: 'SbModalFooter',

  props: {
    footer: {
      type: String,
      default: null,
    },
  },

  computed: {
    sanitizedContent() {
      return DOMPurify.sanitize(this.footer)
    },
  },
}
</script>
