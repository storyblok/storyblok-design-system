<template>
  <div>
    <SbModal :is-open="open" @hide="hide">
      <SbModalHeader :icon="returnIconName" :title="title" :align="align" />
      <SbModalContent>
        {{ message }}
      </SbModalContent>

      <div class="sb-modal__type--buttons">
        <SbButton
          data-testid="modal-type-cancel"
          variant="tertiary"
          :label="cancelButtonLabel"
          @click="handleCancelAction"
        />
        <SbButton
          data-testid="modal-type-confirm"
          :variant="isConfirmationType"
          :label="actionButtonLabel"
          @click="handleDispatchAction"
        />
      </div>
    </SbModal>
  </div>
</template>

<script>
import { SbModal, SbModalHeader, SbModalContent } from './index'
import SbButton from '../Button'

export default {
  name: 'SbModalType',

  components: {
    SbModal,
    SbModalHeader,
    SbModalContent,
    SbButton,
  },

  props: {
    actionButtonLabel: {
      type: String,
      default: null,
    },
    align: {
      type: String,
      default: null,
    },
    cancelButtonLabel: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
  },

  emits: ['cancel', 'confirm', 'hide'],

  data: () => ({
    open: false,
  }),

  computed: {
    returnIconName() {
      return this.type === 'confirmation'
        ? 'success-pictogram'
        : 'delete-pictogram'
    },

    isConfirmationType() {
      return this.type === 'confirmation' ? 'primary' : 'danger'
    },
  },

  methods: {
    show() {
      this.open = true
    },

    hide() {
      this.open = false
      this.$emit('hide')
    },

    handleCancelAction() {
      this.$emit('cancel')
    },

    handleDispatchAction() {
      this.$emit('confirm')
    },
  },
}
</script>
