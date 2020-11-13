<template>
  <SbBlokUi v-if="open" @click="$_wrapClose">
    <div
      ref="blok"
      class="sb-slideover"
      :class="{ 'sb-slideover--open': open }"
    >
      <button class="sb-slideover__close-button" @click="handleCloseSlide">
        <SbIcon name="close" size="normal" color="primary-dark" />
      </button>

      <slot />
    </div>
  </SbBlokUi>
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
      open: false || this.isOpen,
    }
  },

  watch: {
    isOpen() {
      this.open = this.isOpen
    },
  },

  methods: {
    /**
     * handler for close the component
     */
    handleCloseSlide() {
      this.open = false
      this.$emit('hide')
    },

    /**
     * handler for close the component when click outside
     */
    $_wrapClose(e) {
      if (this.$refs.blok && !this.$refs.blok.contains(event.target)) {
        this.handleCloseSlide()
      }
    },
  },
}
</script>
