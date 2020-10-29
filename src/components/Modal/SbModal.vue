<template>
  <SbPortal
    ref="portalRef"
    :target="modalTarget"
  >
    <SbBlokUi v-if="open">
      <div
        class="sb-modal"
        :class="{'sb-modal__full-width' : fullWidth}"
        role="dialog"
        v-bind="{...$attrs}"
      >
        <button
          class="sb-modal__close-button"
          @click="handleCloseModal"
        >
          <SbIcon
            name="close"
            size="normal"
            color="primary-dark"
          />
        </button>
        <slot />
      </div>
    </SbBlokUi>
  </SbPortal>
</template>

<script>
import SbIcon from '../Icon'
import SbBlokUi from '../BlockUI'
import ClickOutside from '../../directives/click-outside'
import SbPortal from '../Portal'
import { randomString } from '../../utils'

export default {
  name: 'SbModal',

  components: {
    SbIcon,
    SbPortal,
    SbBlokUi
  },

  directives: {
    ClickOutside
  },

  props: {
    isOpenModal: Boolean,
    fullWidth: Boolean,
    modalTarget: {
      type: String,
      default: () => `#sb-portal-target-${randomString(4)}`
    }
  },

  data () {
    return {
      open: false || this.isOpenModal
    }
  },

  watch: {
    isOpenModal: function () {
      this.open = this.isOpenModal
    }
  },

  created () {
    this.createPortalInstance()
  },

  methods: {
    handleCloseModal () {
      this.open = false
      this.$emit('hide')
    },

    createPortalInstance () {
      if (this.$refs.portalRef) {
        this.$refs.portalRef.mountTarget()
      }
    }

  }
}
</script>

<style lang="scss">
  @import './modal.scss';
</style>
