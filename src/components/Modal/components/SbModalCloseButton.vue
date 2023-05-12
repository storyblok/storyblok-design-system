<template>
  <button
    class="sb-modal__close-button"
    aria-label="Close Modal"
    @click="handleCloseModal"
  >
    <SbIcon name="x" color="primary-dark" />
  </button>
</template>

<script>
import SbIcon from '../../Icon'
export default {
  name: 'SbModalCloseButton',

  components: {
    SbIcon,
  },

  inject: ['modalContext'],

  computed: {
    context() {
      return this.modalContext()
    },
  },

  methods: {
    handleCloseModal() {
      this.context.closeModal()
    },
  },
}
</script>
