<template>
  <div>
    <SbModal :is-open="open" @hide="hide">
      <SbModalHeader :icon="returnIconName" :title="title" :align="align" />
      <SbModalContent>
        {{ message }}
      </SbModalContent>

      <div>
        <SbButton
          variant="ghost"
          :label="cancelButtonLabel"
          @click="handleCancelAction"
        />
        <SbButton
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
