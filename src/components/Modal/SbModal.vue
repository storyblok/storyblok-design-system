<template>
  <SbPortal
    ref="portalRef"
    slim
    append
    unmount-on-destroy
    target-slim
    :target="modalTarget"
  >
    <SbBlokUi v-if="open" @mousedown="wrapClose">
      <div
        ref="modal"
        class="sb-modal"
        :class="{ 'sb-modal__full-width': fullWidth }"
        role="dialog"
        v-bind="{ ...$attrs }"
      >
        <button
          class="sb-modal__close-button"
          aria-label="Close Modal"
          @click="handleCloseModal"
        >
          <SbIcon name="close" size="normal" color="primary-dark" />
        </button>
        <slot />
      </div>
    </SbBlokUi>
  </SbPortal>
</template>

<script>
import SbIcon from '../Icon'
import SbBlokUi from '../BlockUI'
import SbPortal from '../Portal'
import { randomString } from '../../utils'

export default {
  name: 'SbModal',

  components: {
    SbIcon,
    SbPortal,
    SbBlokUi,
  },

  props: {
    isOpen: Boolean,
    escCloses: {
      type: Boolean,
      default: true,
    },
    fullWidth: Boolean,
    modalTarget: {
      type: String,
      default: () => `#sb-portal-target-${randomString(4)}`,
    },
  },

  data() {
    return {
      open: false || this.isOpen,
    }
  },

  watch: {
    isOpen(value) {
      if (value) {
        this.handleOpenModal()
      } else {
        this.handleCloseModal()
      }
    },
  },

  created() {
    this.$_createPortalInstance()
    this.handleCloseModalByPressingEsc()
  },

  methods: {
    /**
     * handler for closing the modal by pressing ESC on the keyboard
     */
    handleCloseModalByPressingEsc() {
      if (this.escCloses) {
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            this.handleCloseModal()
          }
        })
      }
    },
    /**
     * handler for close modal
     */
    handleCloseModal() {
      if (this.open) {
        this.open = false
        this.$nextTick(() => {
          this.$emit('hide')
        })
      }
    },

    /**
     * handler for open modal
     */
    handleOpenModal() {
      if (!this.open) {
        this.open = true
        this.$nextTick(() => {
          this.$emit('show')
        })
      }
    },

    wrapClose(event) {
      if (this.$refs.modal && !this.$refs.modal.contains(event.target)) {
        this.handleCloseModal(event)
      }
    },

    /**
     * function to create the portal instance
     */
    $_createPortalInstance() {
      if (this.$refs.portalRef) {
        this.$refs.portalRef.mountTarget()
      }
    },
  },
}
</script>
