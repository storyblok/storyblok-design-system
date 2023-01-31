<template>
  <SbModal :is-open="open" @hide="hide">
    <SbModalHeader :title="title" :icon="icon" :align="align" />
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
    SbModalFooter,
  },

  props: {
    // modal
    modalTarget: {
      type: String,
      default: null,
    },

    disabledTargetDefault: {
      type: Boolean,
      default: null,
    },

    // modal-header
    align: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },

    // modal-content
    content: {
      type: String,
      default: null,
    },

    // modal-footer
    footerContent: {
      type: String,
      default: null,
    },
  },

  emits: ['hide'],

  data: () => ({
    open: false,
  }),

  methods: {
    show() {
      this.open = true
    },

    hide() {
      this.$emit('hide')
    },
  },
}
</script>
