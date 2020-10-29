<template>
  <SbPortal
    ref="portalRef"
    :target="modalTarget"
  >
    <SbBlokUi v-if="open">
      <div

        class="sb-modal"
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

  // v-click-outside="handleCloseModal"
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
  padding: 35px;
  box-sizing: border-box;
  animation: fadein .5s;

  &__close-button {
    float: right;
    z-index: 1;
    overflow: hidden;
    border: none;
    background-color: $white;
    cursor: pointer;
    padding: 0;
    margin-top: -20px;
    margin-right: -20px;
  }

  @keyframes fadein {
    from {
      opacity:0;
    }
    to {
      opacity:1;
    }
  }
}
</style>
