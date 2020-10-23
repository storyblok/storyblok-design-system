<template>
  <SbPortal
    ref="portalRef"
    :target="modalTarget"
  >
    <div
      v-if="open"
      v-click-outside="handleCloseModal"
      class="sb-modal"
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
  </SbPortal>
</template>

<script>
import SbIcon from '../Icon'
import ClickOutside from '../../directives/click-outside'
import SbPortal from '../Portal'
import { randomString } from '../../utils'

export default {
  name: 'SbModal',

  components: {
    SbIcon,
    SbPortal
  },

  directives: {
    ClickOutside
  },

  props: {
    isOpenModal: {
      type: Boolean,
      required: true
    },
    modalTarget: {
      type: String,
      default: () => `#sb-portal-target-${randomString(4)}`
    }
  },

  data () {
    return {
      open: this.isOpenModal
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
.sb-modal {
  width: 100%;
  max-width: 620px;
  min-height: 199px;
  border-radius: 5px;
  background-color: $white;
  box-shadow: 0px 2px 17px 3px rgba(34, 42, 69, 0.07);
  display: block;
  margin: 0 auto;
  position: relative;

  &__close-button {
    float: right;
    margin-right: 20px;
    z-index: 1;
    margin-top: 20px;
    overflow: hidden;
    border: none;
    background-color: $white;
    cursor: pointer;
    padding: 0;
  }
}
</style>
