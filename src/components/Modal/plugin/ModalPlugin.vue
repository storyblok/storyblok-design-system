<template>
  <SbModal
    :is-open-modal="open"
    :modal-target="modalTarget || '#root'"
    @hide="hide"
  >
    <SbModalHeader
      :title="title"
      :icon="icon"
      :align="align"
    />
    <SbModalContent :modal-content="content" />
    <SbModalFooter :footer="footerContent" />
  </SbModal>
</template>

<script>
import { SbModal, SbModalHeader, SbModalContent, SbModalFooter } from '../index'
export default {
  name: 'ModalPlugin',

  components: {
    SbModal,
    SbModalHeader,
    SbModalContent,
    SbModalFooter
  },

  props: {
    // modal
    modalTarget: {
      type: String,
      default: null
    },

    // modal-header
    align: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },

    // modal-content
    content: {
      type: String,
      default: null
    },

    // modal-footer
    footerContent: {
      type: String,
      default: null
    }
  },

  data: () => ({
    open: false
  }),

  methods: {
    show () {
      this.open = true
    },

    hide () {
      this.$emit('on-hide')
    }
  }
}
</script>

<style>

</style>
