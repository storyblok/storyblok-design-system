<template>
  <transition name="fade" @after-enter="openSlideover = true">
    <SbBlokUi v-if="openBlokUI" @click="openSlideover = false">
      <transition :name="returnAnimationName" @after-leave="handleCloseSlide">
        <div
          v-if="openSlideover"
          ref="blok"
          class="sb-slideover"
          :class="{ 'sb-slideover--left': orientation === 'left' }"
          @click.stop
        >
          <button
            class="sb-slideover__close-button"
            @click="openSlideover = false"
          >
            <SbIcon name="close" size="normal" color="primary-dark" />
          </button>

          <slot />
        </div>
      </transition>
    </SbBlokUi>
  </transition>
</template>

<script>
import SbBlokUi from '../BlockUI'
import SbIcon from '../Icon'
export default {
  name: 'SbSlideover',
  components: {
    SbIcon,
    SbBlokUi,
  },
  props: {
    isOpen: Boolean,
    orientation: {
      type: String,
      default: 'right',
    },
  },
  data() {
    return {
      openBlokUI: false || this.isOpen,
      openSlideover: false,
    }
  },
  computed: {
    returnAnimationName() {
      return this.orientation === 'right'
        ? 'slide-right-fade'
        : 'slide-left-fade'
    },
  },
  watch: {
    isOpen(state) {
      if (state) {
        this.handleOpenSlide()
      } else {
        this.handleCloseSlide()
      }
    },
  },
  methods: {
    /**
     * handler for close the component
     */
    handleCloseSlide() {
      if (this.openBlokUI) {
        this.openBlokUI = false
        this.$nextTick(() => {
          this.$emit('hide')
        })
      }
    },

    /**
     * handler for open the component
     */
    handleOpenSlide() {
      if (!this.openBlokUI) {
        this.openBlokUI = true
        this.$nextTick(() => {
          this.$emit('show')
        })
      }
    },
  },
}
</script>
