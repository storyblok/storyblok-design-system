<template>
  <transition name="fade" @after-enter="openSlideover = true">
    <SbBlokUi v-if="openBlokUI" @click="openSlideover = false">
      <transition name="slide-fade" @after-leave="handleCloseSlide">
        <div v-if="openSlideover" ref="blok" class="sb-slideover" @click.stop>
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
  },
  data() {
    return {
      openBlokUI: false || this.isOpen,
      openSlideover: false,
    }
  },
  watch: {
    isOpen() {
      this.openBlokUI = this.isOpen
    },
  },
  methods: {
    /**
     * handler for close the component
     */
    handleCloseSlide() {
      this.openBlokUI = false
      this.$emit('hide')
    },
  },
}
</script>
