<template>
  <SbModal
    :is-open-modal="open"
    :modal-target="modalTarget"
    @hide="hide"
  >
    <SbModalHeader
      v-if="title"
      :title="title"
      :icon="icon"
      :align="align"
    />
    <SbModalContent :modal-content="content" />
    <SbModalFooter
      v-if="footerContent"
      :footer="footerContent"
    />
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
    modalTarget: String,

    // modal-header
    title: String,
    icon: String,
    align: String,

    // modal-content
    content: String,

    // modal-footer
    footerContent: String
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
