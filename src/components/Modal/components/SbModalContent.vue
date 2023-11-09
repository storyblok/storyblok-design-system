<template>
  <div class="sb-modal-content" v-bind="$attrs">
    <slot v-if="!modalContent" />
    <div v-else v-html="sanitizedContent" />
  </div>
</template>

<script>
import DOMPurify from 'dompurify'

export default {
  name: 'SbModalContent',

  props: {
    modalContent: {
      type: [String],
      default: null,
    },
  },

  computed: {
    sanitizedContent() {
      return DOMPurify.sanitize(this.modalContent)
    },
  },
}
</script>
